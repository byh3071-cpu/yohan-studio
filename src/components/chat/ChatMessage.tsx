"use client"

import type { UIMessage } from "ai"

import { useTTS } from "@/hooks/useTTS"

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

function TTSButton({ text }: { text: string }) {
  const { state, play, stop } = useTTS()

  const handleClick = () => {
    if (state === "playing") {
      stop()
      return
    }
    if (state === "loading") return
    void play(text)
  }

  const isPlaying = state === "playing"
  const isLoading = state === "loading"
  const isError = state === "error"

  const label =
    state === "playing" ? "음성 정지"
    : state === "loading" ? "음성 로딩 중"
    : state === "error" ? "재생 실패 — 다시 시도"
    : "음성 재생"

  return (
    <div className="mt-2 flex items-center justify-end gap-2">
      {isError && (
        <span
          className="text-xs"
          style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
          role="status"
        >
          재생 실패
        </span>
      )}
      <button
        type="button"
        onClick={handleClick}
        aria-label={label}
        title={label}
        disabled={isLoading}
        className={`inline-flex h-6 w-6 items-center justify-center border-[1.5px] text-sm leading-none transition-opacity hover:text-(--accent) ${
          isPlaying ? "animate-pulse" : ""
        }`}
        style={{
          background: "transparent",
          color: isPlaying ? "var(--accent)" : "var(--ink)",
          borderColor: "var(--line)",
          borderRadius: 0,
          padding: "4px",
          cursor: isLoading ? "wait" : "pointer",
        }}
      >
        {isLoading ? (
          <span
            aria-hidden="true"
            className="block h-3 w-3 animate-spin border-[1.5px] border-current border-t-transparent rounded-full"
          />
        ) : isPlaying ? (
          "🔇"
        ) : (
          "🔊"
        )}
      </button>
    </div>
  )
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
        <div>{text}</div>
        {!isUser && <TTSButton text={text} />}
      </div>
    </div>
  )
}
