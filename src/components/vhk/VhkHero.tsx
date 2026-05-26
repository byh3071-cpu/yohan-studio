import type { CSSProperties } from "react"
import { TerminalBlock } from "./TerminalBlock"
import { VHK_INSTALL_CMD, VHK_LINKS } from "@/data/vhk"

const section: CSSProperties = {
  background: "var(--bg)",
  padding: "80px 24px 120px",
  borderBottom: "var(--border-w) solid var(--line)",
}

const inner: CSSProperties = {
  maxWidth: "var(--max-w)",
  margin: "0 auto",
  width: "100%",
}

const left: CSSProperties = { paddingTop: "8px" }

const eyebrow: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: "36px",
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
}

const eyeMark: CSSProperties = {
  display: "inline-block",
  width: "20px",
  height: "8px",
  background: "var(--accent)",
}

const title: CSSProperties = {
  fontSize: "clamp(40px, 7vw, 88px)",
  fontWeight: 800,
  lineHeight: 0.96,
  letterSpacing: "-0.04em",
  color: "var(--ink)",
  marginBottom: "20px",
}

const accentMark: CSSProperties = { color: "var(--accent)", display: "inline" }

const serifEm: CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontStyle: "italic",
  fontWeight: 600,
}

const tagline: CSSProperties = {
  fontSize: "18px",
  fontWeight: 700,
  color: "var(--ink)",
  marginBottom: "12px",
  letterSpacing: "-0.01em",
}

const sub: CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.65,
  color: "var(--ink-2)",
  maxWidth: "480px",
  marginBottom: "36px",
  borderLeft: "3px solid var(--line)",
  paddingLeft: "18px",
}

const ctaRow: CSSProperties = { display: "flex", gap: "12px", flexWrap: "wrap" }

const btnPrimary: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "14px 22px",
  fontSize: "14px",
  fontWeight: 700,
  background: "var(--accent)",
  color: "var(--accent-ink)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow)",
  textDecoration: "none",
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

export function VhkHero() {
  return (
    <section id="hero" style={section}>
      <div
        className="mx-auto grid w-full grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(340px,440px)] md:items-start"
        style={inner}
      >
        <div className="hero-main" style={left}>
          <div style={eyebrow}>
            <span style={eyeMark} />
            01 / VHK — VIBE HARNESS KIT
          </div>
          <h1 style={title}>
            VHK<span style={accentMark}>.</span>
            <br />
            Your AI Coding
            <br />
            <span style={serifEm}>Context</span>, Everywhere
            <span style={accentMark}>.</span>
          </h1>
          <p style={tagline}>AI 코딩, 이것만 설치하면 시작.</p>
          <p style={sub}>
            Cursor · Claude · Copilot — IDE를 바꿔도 프로젝트의 맥락은
            <br />
            그대로 따라온다. 32개 명령어, 하나의 CLI.
          </p>
          <div style={ctaRow}>
            <a
              href={VHK_LINKS.github}
              target="_blank"
              rel="noreferrer noopener"
              style={btnPrimary}
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
            <a
              href={VHK_LINKS.disquiet}
              target="_blank"
              rel="noreferrer noopener"
              style={btnGhost}
            >
              디스콰이엇
            </a>
          </div>
        </div>

        <aside className="hero-meta">
          <TerminalBlock
            command={VHK_INSTALL_CMD}
            successLines={[
              "",
              "✓ installed",
              "→ run `vhk init` to start.",
            ]}
          />
        </aside>
      </div>
    </section>
  )
}
