"use client"

import type { CSSProperties } from "react"
import { useTheme } from "@/components/layout/ThemeProvider"

const glyph: CSSProperties = {
  fontSize: "16px",
  lineHeight: 1,
}

export function ThemeToggle() {
  const { theme, toggle, hydrated } = useTheme()
  // Before hydration, render a neutral placeholder. Server + client first paint
  // are guaranteed identical; the real glyph/label appears after we've synced
  // from <html data-theme>, so no hydration mismatch is possible.
  if (!hydrated) {
    return (
      <button
        type="button"
        className="site-header-icon-btn"
        aria-hidden
        tabIndex={-1}
        style={{ cursor: "default" }}
      >
        <span aria-hidden style={glyph}>
          ·
        </span>
      </button>
    )
  }
  const isDark = theme === "dark"
  const label = isDark ? "라이트모드로 전환" : "다크모드로 전환"
  return (
    <button
      type="button"
      className="site-header-icon-btn"
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      <span aria-hidden style={glyph}>
        {isDark ? "☀" : "☾"}
      </span>
    </button>
  )
}
