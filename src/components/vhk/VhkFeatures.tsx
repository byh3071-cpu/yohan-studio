import type { CSSProperties } from "react"
import { vhkCommands } from "@/data/vhk"

const section: CSSProperties = {
  background: "var(--bg)",
  padding: "96px 24px",
  borderBottom: "var(--border-w) solid var(--line)",
}

const inner: CSSProperties = { maxWidth: "var(--max-w)", margin: "0 auto" }

const head: CSSProperties = {
  paddingBottom: "32px",
  marginBottom: "40px",
  borderBottom: "var(--border-w) solid var(--line)",
}

const eyebrow: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: "12px",
}

const title: CSSProperties = {
  fontSize: "clamp(28px, 4.5vw, 48px)",
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: "-0.03em",
  color: "var(--ink)",
  marginBottom: "12px",
}

const accent: CSSProperties = { color: "var(--accent)" }

const lead: CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.65,
  color: "var(--ink-2)",
  maxWidth: "640px",
}

const grid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "16px",
  marginBottom: "48px",
}

const card: CSSProperties = {
  background: "var(--surface)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow-sm)",
  padding: "20px 22px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}

const cmdLine: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "14px",
  fontWeight: 700,
  color: "var(--ink)",
  display: "flex",
  alignItems: "center",
  gap: "8px",
}

const cmdPrompt: CSSProperties = {
  color: "var(--accent)",
}

const cmdSymbol: CSSProperties = {
  fontSize: "18px",
  marginRight: "2px",
}

const desc: CSSProperties = {
  fontSize: "13px",
  lineHeight: 1.55,
  color: "var(--ink-2)",
}

const entryGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "16px",
}

const entryCard: CSSProperties = {
  background: "var(--bg)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow)",
  padding: "24px 26px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}

const entryLabel: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--muted)",
}

const entryHead: CSSProperties = {
  fontSize: "16px",
  fontWeight: 700,
  color: "var(--ink)",
  lineHeight: 1.4,
}

const entryCmd: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "13px",
  fontWeight: 700,
  color: "var(--accent)",
  background: "#0A0A0A",
  padding: "8px 10px",
  display: "inline-block",
  width: "fit-content",
}

export function VhkFeatures() {
  return (
    <section style={section}>
      <div style={inner}>
        <div style={head}>
          <div style={eyebrow}>{"// 03 — FEATURES"}</div>
          <h2 style={title}>
            32개 명령어, <span style={accent}>하나의 CLI</span>.
          </h2>
          <p style={lead}>
            처음 깔면 `init` 하나로 시작. 이미 쓰고 있다면 `sync`로 IDE 간 규칙 동기화.
            나머지는 필요할 때 꺼내 쓴다.
          </p>
        </div>

        <div style={grid}>
          {vhkCommands.map((c) => (
            <article key={c.name} style={card}>
              <div style={cmdLine}>
                <span style={cmdSymbol}>{c.symbol}</span>
                <span style={cmdPrompt}>$</span>
                <span>vhk {c.name}</span>
              </div>
              <p style={desc}>{c.desc}</p>
            </article>
          ))}
        </div>

        <div style={entryGrid}>
          <article style={entryCard}>
            <span style={entryLabel}>{"// 처음이라면"}</span>
            <h3 style={entryHead}>바이브코딩 입문자 — 한 줄로 시작</h3>
            <code style={entryCmd}>vhk init</code>
            <p style={desc}>
              프로젝트 루트에 `.vhk/` 디렉토리와 기본 규칙 파일을 생성한다.
              IDE에 맞춰 자동 적용까지.
            </p>
          </article>
          <article style={entryCard}>
            <span style={entryLabel}>{"// 이미 쓰고 있다면"}</span>
            <h3 style={entryHead}>IDE 간 규칙을 한 곳에서</h3>
            <code style={entryCmd}>vhk sync</code>
            <p style={desc}>
              universal.md 하나만 관리하면 .cursorrules, CLAUDE.md, AGENTS.md를
              자동으로 동기화한다.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
