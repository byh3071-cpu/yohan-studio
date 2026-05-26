"use client"

import type { CSSProperties } from "react"
import { useEffect, useRef, useState } from "react"
import { CopyButton } from "./CopyButton"

type Props = {
  command: string
  prompt?: string
  label?: string
  successLines?: string[]
  /** 타이핑 속도(ms per char). 기본 60ms. */
  speed?: number
  /** true면 SSR 첫 페인트부터 완성형 표시 (스크롤 트리거 없이 즉시 보여줄 때) */
  instant?: boolean
}

const shell: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  background: "#0A0A0A",
  border: "1.5px solid var(--line)",
  boxShadow: "var(--shadow)",
  fontFamily: "var(--font-mono)",
  color: "#F4F1EA",
}

const header: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 14px",
  borderBottom: "1px solid #1F1F1F",
}

const dotsRow: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
}

const dot = (color: string): CSSProperties => ({
  width: "10px",
  height: "10px",
  background: color,
  borderRadius: 0,
})

const titleStyle: CSSProperties = {
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#968D7E",
}

const body: CSSProperties = {
  padding: "20px 18px 22px",
  fontSize: "14px",
  lineHeight: 1.7,
  minHeight: "120px",
  whiteSpace: "pre",
  overflowX: "auto",
}

const promptStyle: CSSProperties = {
  color: "#FF5C28",
  marginRight: "8px",
}

const successStyle: CSSProperties = {
  color: "#94A3B8",
  marginTop: "2px",
}

function shouldSkipAnimation(instant: boolean): boolean {
  if (instant) return true
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function TerminalBlock({
  command,
  prompt = "$",
  label = "vhk@studio:~",
  successLines = [],
  speed = 60,
  instant = false,
}: Props) {
  const [skipAnimation] = useState(() => shouldSkipAnimation(instant))
  const [typed, setTyped] = useState(skipAnimation ? command : "")
  const [done, setDone] = useState(skipAnimation)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (skipAnimation) return
    let i = 0
    timerRef.current = window.setInterval(() => {
      i += 1
      setTyped(command.slice(0, i))
      if (i >= command.length) {
        if (timerRef.current) window.clearInterval(timerRef.current)
        setDone(true)
      }
    }, speed)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [command, speed, skipAnimation])

  return (
    <div style={shell}>
      <div style={header}>
        <div style={dotsRow}>
          <span style={dot("#FF5C28")} />
          <span style={dot("#968D7E")} />
          <span style={dot("#1F1F1F")} />
        </div>
        <span style={titleStyle}>{label}</span>
        <CopyButton
          text={command}
          style={{
            background: "transparent",
            color: "#F4F1EA",
            borderColor: "#1F1F1F",
          }}
        />
      </div>
      <div style={body} aria-live="polite">
        <div>
          <span style={promptStyle}>{prompt}</span>
          <span>{typed}</span>
          <span className="vhk-caret" aria-hidden="true">
            _
          </span>
        </div>
        {done &&
          successLines.map((line, i) => (
            <div key={i} style={successStyle}>
              {line}
            </div>
          ))}
      </div>
    </div>
  )
}
