import { google } from "@ai-sdk/google"
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

function isValidMessage(m: unknown): m is UIMessage {
  if (!m || typeof m !== "object") return false
  const obj = m as Record<string, unknown>
  if (typeof obj.id !== "string") return false
  if (obj.role !== "user" && obj.role !== "assistant" && obj.role !== "system") return false
  if (!Array.isArray(obj.parts)) return false
  let totalLen = 0
  for (const p of obj.parts) {
    if (p && typeof p === "object" && "text" in p) {
      const text = (p as { text: unknown }).text
      if (typeof text === "string") {
        totalLen += text.length
        if (totalLen > MAX_MESSAGE_CHARS) return false
      }
    }
  }
  return true
}

function isValidMessages(arr: unknown): arr is UIMessage[] {
  if (!Array.isArray(arr)) return false
  if (arr.length === 0 || arr.length > MAX_MESSAGES) return false
  return arr.every(isValidMessage)
}

export async function POST(req: Request) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return jsonError(500, "GOOGLE_GENERATIVE_AI_API_KEY not configured")
  }

  const key = getClientKey(req)
  if (!checkRateLimit(key)) {
    return jsonError(429, "Too many requests", { "retry-after": "60" })
  }

  const contentLength = Number(req.headers.get("content-length") ?? "0")
  if (contentLength > MAX_BODY_BYTES) {
    return jsonError(413, "Payload too large")
  }

  let parsed: unknown
  try {
    parsed = await req.json()
  } catch {
    return jsonError(400, "Invalid JSON")
  }

  if (!parsed || typeof parsed !== "object" || !("messages" in parsed)) {
    return jsonError(400, "Invalid body")
  }
  const { messages } = parsed as { messages: unknown }
  if (!isValidMessages(messages)) {
    return jsonError(400, "Invalid messages")
  }

  try {
    const modelMessages = await convertToModelMessages(messages)
    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: CHAT_SYSTEM_PROMPT,
      messages: modelMessages,
      abortSignal: req.signal,
      onError: ({ error }) => {
        console.error("[/api/chat] stream error:", error)
      },
    })
    return result.toUIMessageStreamResponse()
  } catch (err) {
    console.error("[/api/chat] error:", err)
    return jsonError(502, "AI 응답 생성 실패")
  }
}
