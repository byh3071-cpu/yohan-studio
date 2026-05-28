"use client"

import { useChat } from "@ai-sdk/react"
import { useEffect, useRef, useState, type FormEvent } from "react"

import { ChatMessage } from "./ChatMessage"

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const panelRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const { messages, sendMessage, status, error, stop } = useChat()

  const isBusy = status === "submitted" || status === "streaming"

  useEffect(() => {
    if (!open) return

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    function onClick(e: MouseEvent) {
      const target = e.target as Node
      if (panelRef.current?.contains(target)) return
      if (buttonRef.current?.contains(target)) return
      setOpen(false)
    }

    document.addEventListener("keydown", onKey)
    document.addEventListener("mousedown", onClick)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("mousedown", onClick)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, open])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const text = input.trim()
    if (!text || isBusy) return
    setInput("")
    sendMessage({ text })
  }

  return (
    <>
      {/* Floating button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "챗봇 닫기" : "챗봇 열기"}
        aria-expanded={open}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center border-[1.5px] text-2xl transition-transform hover:-translate-y-0.5 active:translate-y-0"
        style={{
          background: "var(--accent)",
          color: "var(--accent-ink)",
          borderColor: "var(--line)",
          boxShadow: "var(--shadow)",
          borderRadius: 0,
        }}
      >
        {open ? "×" : "💬"}
      </button>

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="요한 스튜디오 챗봇"
          className="fixed bottom-24 right-6 z-50 flex w-[min(380px,calc(100vw-32px))] flex-col border-[1.5px]"
          style={{
            background: "var(--surface)",
            color: "var(--ink)",
            borderColor: "var(--line)",
            boxShadow: "var(--shadow)",
            borderRadius: 0,
            height: "min(560px, calc(100vh - 140px))",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between border-b-[1.5px] px-4 py-3"
            style={{ borderColor: "var(--line)" }}
          >
            <div>
              <div className="text-sm font-bold">요한 스튜디오 챗봇</div>
              <div
                className="text-xs"
                style={{ color: "var(--muted)" }}
              >
                사이트·서비스 무엇이든 물어보세요
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="닫기"
              className="border-[1.5px] px-2 py-0.5 text-sm"
              style={{
                background: "var(--bg)",
                color: "var(--ink)",
                borderColor: "var(--line)",
                borderRadius: 0,
              }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.length === 0 && (
              <div
                className="text-sm leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                안녕하세요. 요한 스튜디오 챗봇입니다.
                <br />
                /blog, /showroom, /store, /vhk 등 사이트 정보를 물어보세요.
              </div>
            )}
            {messages.map((m) => (
              <ChatMessage key={m.id} message={m} />
            ))}
            {error && (
              <div
                className="border-[1.5px] px-3 py-2 text-xs"
                style={{
                  background: "var(--surface-2)",
                  color: "var(--ink)",
                  borderColor: "var(--line)",
                  borderRadius: 0,
                }}
              >
                오류: {error.message}
              </div>
            )}
            {isBusy && (
              <div
                className="text-xs"
                style={{ color: "var(--muted)" }}
              >
                응답 생성 중…
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 border-t-[1.5px] p-3"
            style={{ borderColor: "var(--line)" }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="메시지를 입력하세요…"
              disabled={isBusy}
              className="flex-1 border-[1.5px] bg-transparent px-3 py-2 text-sm outline-none disabled:opacity-60"
              style={{
                background: "var(--bg)",
                color: "var(--ink)",
                borderColor: "var(--line)",
                borderRadius: 0,
              }}
            />
            {isBusy ? (
              <button
                type="button"
                onClick={() => stop()}
                className="border-[1.5px] px-3 py-2 text-sm font-semibold"
                style={{
                  background: "var(--bg)",
                  color: "var(--ink)",
                  borderColor: "var(--line)",
                  borderRadius: 0,
                }}
              >
                중단
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                className="border-[1.5px] px-3 py-2 text-sm font-semibold transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                style={{
                  background: "var(--accent)",
                  color: "var(--accent-ink)",
                  borderColor: "var(--line)",
                  borderRadius: 0,
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                전송
              </button>
            )}
          </form>
        </div>
      )}
    </>
  )
}
