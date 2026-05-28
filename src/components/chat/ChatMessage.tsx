"use client"

import type { UIMessage } from "ai"

type Props = {
  message: UIMessage
}

function extractText(message: UIMessage): string {
  return message.parts
    .filter((part): part is { type: "text"; text: string; state?: "streaming" | "done" } =>
      part.type === "text"
    )
    .map((part) => part.text)
    .join("")
}

export function ChatMessage({ message }: Props) {
  const text = extractText(message)
  const isUser = message.role === "user"

  if (!text) return null

  return (
    <div
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className="max-w-[85%] whitespace-pre-wrap break-words border-[1.5px] px-3 py-2 text-sm leading-relaxed"
        style={{
          background: isUser ? "var(--accent)" : "var(--surface-2)",
          color: isUser ? "var(--accent-ink)" : "var(--ink)",
          borderColor: "var(--line)",
          boxShadow: "var(--shadow-sm)",
          borderRadius: 0,
        }}
      >
        {text}
      </div>
    </div>
  )
}
