"use client"

import dynamic from "next/dynamic"
import { useState } from "react"

// 클릭 전까지 ChatWidget(useChat + AI SDK + ChatMessage)을 번들에서 분리.
const ChatWidget = dynamic(
  () => import("@/components/chat/ChatWidget").then((m) => m.ChatWidget),
  { ssr: false },
)

export function ChatWidgetMount() {
  const [loaded, setLoaded] = useState(false)

  if (loaded) return <ChatWidget defaultOpen />

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      aria-label="챗봇 열기"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center border-[1.5px] text-2xl transition-transform hover:-translate-y-0.5 active:translate-y-0"
      style={{
        background: "var(--accent)",
        color: "var(--accent-ink)",
        borderColor: "var(--line)",
        boxShadow: "var(--shadow)",
        borderRadius: 0,
      }}
    >
      💬
    </button>
  )
}
