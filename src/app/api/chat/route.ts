import { google } from "@ai-sdk/google"
import * as Sentry from "@sentry/nextjs"
import {
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai"

import { CHAT_SYSTEM_PROMPT } from "@/lib/chatContext"

export const runtime = "nodejs"
export const maxDuration = 30

// In-memory rate limit. Single-instance only — Edge/multi-region 환경에서는 KV/Redis로 교체.
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 20
const MAX_MESSAGES = 30
const MAX_MESSAGE_CHARS = 4_000
const MAX_BODY_BYTES = 64 * 1024

type Bucket = { count: number; resetAt: number }
const buckets = new Map<string, Bucket>()

function getClientKey(req: Request): string {
  const xff = req.headers.get("x-forwarded-for")
  const real = req.headers.get("x-real-ip")
  const raw = xff?.split(",")[0]?.trim() || real || "anonymous"
  return raw.slice(0, 128)
}

function checkRateLimit(key: string): boolean {
  const now = Date.now()
  const b = buckets.get(key)
  if (!b || b.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }
  if (b.count >= RATE_LIMIT_MAX) return false
  b.count++
  return true
}

function jsonError(status: number, error: string, extraHeaders?: Record<string, string>) {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: { "content-type": "application/json", ...extraHeaders },
  })
}

async function readBoundedBody(req: Request): Promise<string | null> {
  const contentLength = Number(req.headers.get("content-length") ?? "0")
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return null
  }

  if (!req.body) return ""

  const reader = req.body.getReader()
  const decoder = new TextDecoder()
  let received = 0
  let body = ""

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    if (!value) continue

    received += value.byteLength
    if (received > MAX_BODY_BYTES) {
      await reader.cancel().catch(() => undefined)
      return null
    }
    body += decoder.decode(value, { stream: true })
  }

  body += decoder.decode()
  return body
}

function extractMessageText(obj: Record<string, unknown>): string | null {
  if (Array.isArray(obj.parts)) {
    return obj.parts
      .map((part) => {
        if (!part || typeof part !== "object") return ""
        const p = part as Record<string, unknown>
        return p.type === "text" && typeof p.text === "string" ? p.text : ""
      })
      .join("")
  }

  return typeof obj.content === "string" ? obj.content : null
}

function sanitizeMessages(arr: unknown): UIMessage[] | null {
  if (!Array.isArray(arr)) return null
  if (arr.length === 0 || arr.length > MAX_MESSAGES) return null

  const messages: UIMessage[] = []

  for (const [index, item] of arr.entries()) {
    if (!item || typeof item !== "object") return null

    const obj = item as Record<string, unknown>
    if (obj.role !== "user" && obj.role !== "assistant") return null

    const text = extractMessageText(obj)
    if (text === null) return null
    if (text.length > MAX_MESSAGE_CHARS) return null
    if (obj.role === "user" && text.trim().length === 0) return null
    if (text.trim().length === 0) continue

    messages.push({
      id: typeof obj.id === "string" ? obj.id : `message-${index}`,
      role: obj.role,
      parts: [{ type: "text", text }],
    })
  }

  return messages.some((message) => message.role === "user") ? messages : null
}

export async function POST(req: Request) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return jsonError(500, "GOOGLE_GENERATIVE_AI_API_KEY not configured")
  }

  const key = getClientKey(req)
  if (!checkRateLimit(key)) {
    return jsonError(429, "Too many requests", { "retry-after": "60" })
  }

  let parsed: unknown
  try {
    const body = await readBoundedBody(req)
    if (body === null) {
      return jsonError(413, "Payload too large")
    }
    parsed = JSON.parse(body)
  } catch {
    return jsonError(400, "Invalid JSON")
  }

  if (!parsed || typeof parsed !== "object" || !("messages" in parsed)) {
    return jsonError(400, "Invalid body")
  }
  const { messages } = parsed as { messages: unknown }
  const safeMessages = sanitizeMessages(messages)
  if (!safeMessages) {
    return jsonError(400, "Invalid messages")
  }

  try {
    const modelMessages = await convertToModelMessages(safeMessages)
    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: CHAT_SYSTEM_PROMPT,
      messages: modelMessages,
      abortSignal: req.signal,
      onError: ({ error }) => {
        console.error("[/api/chat] stream error:", error)
        Sentry.captureException(error)
      },
    })
    return result.toUIMessageStreamResponse()
  } catch (err) {
    console.error("[/api/chat] error:", err)
    Sentry.captureException(err)
    return jsonError(502, "AI 응답 생성 실패")
  }
}
