import type { CSSProperties } from "react"
import { LEVEL_DEFINITIONS } from "@/lib/aimScan"

const wrap: CSSProperties = {
  display: "inline-flex",
  flexDirection: "column",
  gap: "8px",
  padding: "18px 22px",
  background: "var(--accent)",
  color: "var(--accent-ink)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow)",
}

const lvl: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
}

const name: CSSProperties = {
  fontSize: "26px",
  fontWeight: 800,
  letterSpacing: "-0.02em",
  lineHeight: 1.1,
}

const desc: CSSProperties = {
  fontSize: "13px",
  lineHeight: 1.55,
  maxWidth: "320px",
}

export function LevelBadge({ level }: { level: 1 | 2 | 3 | 4 | 5 }) {
  const def = LEVEL_DEFINITIONS[level]
  return (
    <div style={wrap}>
      <span style={lvl}>{def.range}</span>
      <strong style={name}>{def.name}</strong>
      <p style={desc}>{def.desc}</p>
    </div>
  )
}
