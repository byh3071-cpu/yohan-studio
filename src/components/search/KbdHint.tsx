"use client"

import type { CSSProperties } from "react"
import { useEffect, useState } from "react"

const hint: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  color: "var(--ink)",
  border: "1.5px solid var(--line)",
  padding: "8px 12px",
  background: "var(--bg)",
  letterSpacing: "0.04em",
  boxShadow: "var(--shadow-sm)",
  whiteSpace: "nowrap",
}

function detectMac(): boolean {
  if (typeof navigator === "undefined") return false
  // userAgentData.platform is the modern source; fall back to platform/userAgent strings.
  const uaPlatform =
    (navigator as Navigator & { userAgentData?: { platform?: string } })
      .userAgentData?.platform ?? ""
  const haystack = `${uaPlatform} ${navigator.platform ?? ""} ${navigator.userAgent ?? ""}`
  return /mac|iphone|ipad|ipod/i.test(haystack)
}

export function KbdHint({ suffix = "사이트 검색" }: { suffix?: string }) {
  // Render the cross-platform label until we know — avoids hydration mismatch on Mac/Windows split.
  const [label, setLabel] = useState<string>("Ctrl + K")

  useEffect(() => {
    setLabel(detectMac() ? "⌘ + K" : "Ctrl + K")
  }, [])

  return (
    <div style={hint} aria-label={`${label} ${suffix}`}>
      {label} · {suffix}
    </div>
  )
}
