"use client"

import type { CSSProperties } from "react"
import { useTheme } from "@/components/layout/ThemeProvider"

const base: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "36px",
  height: "36px",
  marginLeft: "8px",
  fontSize: "16px",
  lineHeight: 1,
  background: "var(--bg)",
  color: "var(--ink)",
  border: "var(--border-w) solid var(--line)",
  cursor: "pointer",
  borderRadius: 0,
}

export function ThemeToggle() {
  const { theme, toggle, hydrated } = useTheme()
  // Before hydration, render a neutral placeholder. Server + client first paint
  // are guaranteed identical; the real glyph/label appears after we've synced
  // from <html data-theme>, so no hydration mismatch is possible.
  if (!hydrated) {
    return (
      <button type="button" aria-hidden tabIndex={-1} style={{ ...base, cursor: "default" }}>
        <span aria-hidden>·</span>
      </button>
    )
  }
  const isDark = theme === "dark"
  const label = isDark ? "라이트모드로 전환" : "다크모드로 전환"
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      style={base}
    >
      <span aria-hidden>{isDark ? "☀" : "☾"}</span>
    </button>
  )
}
