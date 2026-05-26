import type { CSSProperties } from "react"
import { VhkHeroCtas } from "./VhkHeroCtas"
import { VhkHeroDemo } from "./VhkHeroDemo"

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
  fontFamily: "var(--font-sans)",
  fontSize: "clamp(40px, 7vw, 88px)",
  fontWeight: 800,
  fontStyle: "normal",
  lineHeight: 0.96,
  letterSpacing: "-0.04em",
  color: "var(--ink)",
  marginBottom: "20px",
}

const accentMark: CSSProperties = { color: "var(--accent)", display: "inline" }

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
  maxWidth: "520px",
  marginBottom: "16px",
  borderLeft: "3px solid var(--line)",
  paddingLeft: "18px",
}

const workflow: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "13px",
  lineHeight: 1.6,
  color: "var(--ink-2)",
  maxWidth: "520px",
  marginBottom: "28px",
  padding: "12px 14px",
  background: "var(--surface)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow-sm)",
}

const workflowAccent: CSSProperties = { color: "var(--accent)", fontWeight: 700 }

const cliNote: CSSProperties = {
  fontSize: "14px",
  color: "var(--muted)",
  marginBottom: "20px",
  maxWidth: "520px",
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
            Context, Everywhere
            <span style={accentMark}>.</span>
          </h1>
          <p style={tagline}>바이브코딩 풀사이클 CLI — IDE 위 운영·컨텍스트 레이어.</p>
          <p style={sub}>
            Cursor · Claude · Codex — IDE를 바꿔도 프로젝트 맥락은 그대로.
            30개+ 명령어, 하나의 CLI.
          </p>
          <p style={workflow}>
            아이디어부터:{" "}
            <span style={workflowAccent}>vhk gate</span>
            {" → GO 판정 후 "}
            <span style={workflowAccent}>vhk init</span>
          </p>
          <p style={cliNote}>
            명령을 외우지 않아도 된다. 설치 후{" "}
            <code style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>vhk</code>
            만 치면 메뉴가 열린다.
          </p>
          <VhkHeroCtas />
        </div>

        <aside className="hero-meta">
          <VhkHeroDemo />
        </aside>
      </div>
    </section>
  )
}
