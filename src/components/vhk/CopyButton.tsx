"use client"

import type { CSSProperties } from "react"
import { useState } from "react"

type Props = {
  text: string
  label?: string
  style?: CSSProperties
  ariaLabel?: string
}

const base: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  padding: "6px 12px",
  border: "1.5px solid var(--line)",
  background: "var(--bg)",
  color: "var(--ink)",
  cursor: "pointer",
  whiteSpace: "nowrap",
  transition: "background 120ms ease, color 120ms ease",
}

export function CopyButton({ text, label = "복사", style, ariaLabel }: Props) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      // Older browsers / insecure contexts — silently no-op.
      // User can still select-and-copy the visible command.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={ariaLabel ?? `${text} 복사`}
      style={{
        ...base,
        ...(copied
          ? { background: "var(--accent)", color: "var(--accent-ink)", borderColor: "var(--accent)" }
          : {}),
        ...style,
      }}
    >
      {copied ? "복사됨 ✓" : label}
    </button>
  )
}
