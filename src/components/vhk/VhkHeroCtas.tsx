"use client"

import type { CSSProperties } from "react"
import { CopyButton } from "./CopyButton"
import { VHK_INSTALL_CMD, VHK_LINKS } from "@/data/vhk"

const row: CSSProperties = { display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }

const btnPrimaryWrap: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px 14px",
  background: "var(--accent)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow)",
}

const installCmd: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "13px",
  fontWeight: 700,
  color: "var(--accent-ink)",
  whiteSpace: "nowrap",
}

const btnGhost: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "14px 22px",
  fontSize: "14px",
  fontWeight: 700,
  background: "var(--bg)",
  color: "var(--ink)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow-sm)",
  textDecoration: "none",
  whiteSpace: "nowrap",
}

export function VhkHeroCtas() {
  return (
    <div style={row}>
      <div style={btnPrimaryWrap}>
        <span style={installCmd}>{VHK_INSTALL_CMD}</span>
        <CopyButton
          text={VHK_INSTALL_CMD}
          label="설치 복사"
          style={{
            background: "var(--bg)",
            color: "var(--ink)",
            borderColor: "var(--line)",
          }}
        />
      </div>
      <a
        href={VHK_LINKS.github}
        target="_blank"
        rel="noreferrer noopener"
        style={btnGhost}
      >
        GitHub →
      </a>
      <a
        href={VHK_LINKS.npm}
        target="_blank"
        rel="noreferrer noopener"
        style={btnGhost}
      >
        npm
      </a>
    </div>
  )
}
