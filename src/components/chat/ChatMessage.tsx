"use client"

import type { ReactElement } from "react"
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

// 마크다운 링크 [텍스트](/경로 | https://…)만 앵커로 변환한다. 그 외 텍스트는 그대로.
// 내부 경로는 단일 슬래시만 허용 — //host 형태(프로토콜 상대 URL)는 내부로 위장 가능해 매칭 제외.
const MD_LINK_RE = /\[([^\]\n]+)\]\((\/(?!\/)[^\s)]*|https?:\/\/[^\s)]+)\)/g

function renderWithLinks(text: string) {
  const nodes: (string | ReactElement)[] = []
  let last = 0
  for (const m of text.matchAll(MD_LINK_RE)) {
    const [full, label, href] = m
    const idx = m.index ?? 0
    if (idx > last) nodes.push(text.slice(last, idx))
    const external = href.startsWith("http")
    nodes.push(
      <a
        key={`${idx}-${href}`}
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        style={{ color: "var(--accent)", textDecoration: "underline", fontWeight: 600 }}
      >
        {label}
      </a>,
    )
    last = idx + full.length
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
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
        className="max-w-[85%] whitespace-pre-wrap wrap-break-word border-[1.5px] px-3 py-2 text-sm leading-relaxed"
        style={{
          background: isUser ? "var(--accent)" : "var(--surface-2)",
          color: isUser ? "var(--accent-ink)" : "var(--ink)",
          borderColor: "var(--line)",
          boxShadow: "var(--shadow-sm)",
          borderRadius: 0,
        }}
      >
        <div>{isUser ? text : renderWithLinks(text)}</div>
        {!isUser && <TTSButton text={text} />}
      </div>
    </div>
  )
}
