"use client"

import type { CSSProperties } from "react"
import { useEffect, useState } from "react"

const button: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "6px 10px 6px 12px",
  marginLeft: "4px",
  fontSize: "13px",
  fontWeight: 600,
  fontFamily: "var(--font-mono)",
  color: "var(--ink)",
  background: "var(--bg)",
  border: "1.5px solid var(--line)",
  borderRadius: 0,
  whiteSpace: "nowrap",
  cursor: "pointer",
  lineHeight: 1,
}

const kbd: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  color: "var(--muted)",
  border: "1px solid var(--line)",
  padding: "2px 5px",
  letterSpacing: "0.04em",
  background: "var(--surface)",
}

function detectMac(): boolean {
  if (typeof navigator === "undefined") return false
  const uaPlatform =
    (navigator as Navigator & { userAgentData?: { platform?: string } })
      .userAgentData?.platform ?? ""
  const haystack = `${uaPlatform} ${navigator.platform ?? ""} ${navigator.userAgent ?? ""}`
  return /mac|iphone|ipad|ipod/i.test(haystack)
}

export function SearchTriggerButton({ compact = false }: { compact?: boolean }) {
  // SSR-safe default — assume non-mac until detection runs.
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    setIsMac(detectMac())
  }, [])

  function trigger() {
    // SiteSearch listens for Cmd+K / Ctrl+K on window; dispatch a synthetic event
    // so we don't need to expose its internal state.
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true }),
    )
  }

  const label = isMac ? "⌘ K" : "Ctrl K"

  return (
    <button
      type="button"
      onClick={trigger}
      style={button}
      aria-label="사이트 검색 열기"
      title="사이트 검색"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="7" cy="7" r="4.5" />
        <line x1="10.5" y1="10.5" x2="14" y2="14" />
      </svg>
      {!compact && <span style={kbd}>{label}</span>}
    </button>
  )
}
