"use client"

import type { CSSProperties } from "react"
import { useSyncExternalStore } from "react"

import { SITE_SEARCH_OPEN_EVENT } from "@/lib/siteSearchEvents"

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

const noopSubscribe = () => () => {}

export function SearchTriggerButton({ compact = false }: { compact?: boolean }) {
  // SSR + 첫 클라이언트 렌더는 false → hydration mismatch 없음.
  // post-hydration commit에서 실제 플랫폼 값으로 재렌더.
  const isMac = useSyncExternalStore(noopSubscribe, detectMac, () => false)

  function trigger() {
    window.dispatchEvent(new CustomEvent(SITE_SEARCH_OPEN_EVENT))
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
