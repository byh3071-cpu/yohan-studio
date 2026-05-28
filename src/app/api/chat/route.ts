import { google } from "@ai-sdk/google"
import {
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai"

import { CHAT_SYSTEM_PROMPT } from "@/lib/chatContext"

export const runtime = "nodejs"
export const maxDuration = 30

export async function POST(req: Request) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return new Response(
      JSON.stringify({ error: "GOOGLE_GENERATIVE_AI_API_KEY not configured" }),
      { status: 500, headers: { "content-type": "application/json" } }
    )
  }

  const { messages }: { messages: UIMessage[] } = await req.json()
  const modelMessages = await convertToModelMessages(messages)

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system: CHAT_SYSTEM_PROMPT,
    messages: modelMessages,
  })

  return result.toUIMessageStreamResponse()
}
