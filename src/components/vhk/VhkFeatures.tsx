import type { CSSProperties } from "react"
import { vhkCommands, VHK_LINKS } from "@/data/vhk"

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

const readmeLink: CSSProperties = {
  color: "var(--accent)",
  fontWeight: 700,
  textDecoration: "underline",
  textUnderlineOffset: "3px",
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
  background: "var(--ink)",
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
            35개 명령어, <span style={accent}>하나의 CLI</span>.
          </h2>
          <p style={lead}>
            권장 순서:{" "}
            <code style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>vhk gate</code>
            {" → "}
            <code style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>vhk init</code>
            {" → 개발 → "}
            <code style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>vhk sync</code>
            . Cursor·Claude Desktop 에서는 MCP 서버로 24개 tool 을 채팅에서 직접 호출.
            아래는 자주 쓰는 핵심 13개 —{" "}
            <a href={VHK_LINKS.npm} target="_blank" rel="noreferrer noopener" style={readmeLink}>
              전체 명령은 README
            </a>
            .
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
            <span style={entryLabel}>{"// 아이디어부터"}</span>
            <h3 style={entryHead}>검증 후 시작</h3>
            <code style={entryCmd}>vhk gate</code>
            <p style={desc}>
              퀵 5문항으로 GO/다듬기 판정. 기획이 끝났다면{" "}
              <code style={{ fontFamily: "var(--font-mono)" }}>vhk init --skip-gate</code>
              .
            </p>
          </article>
          <article style={entryCard}>
            <span style={entryLabel}>{"// 처음이라면"}</span>
            <h3 style={entryHead}>프로젝트 하네스 생성</h3>
            <code style={entryCmd}>vhk init</code>
            <p style={desc}>
              CLAUDE.md, .cursorrules, docs/ 구조를 만든다. 이후{" "}
              <code style={{ fontFamily: "var(--font-mono)" }}>vhk sync</code>
              로 IDE 규칙을 맞춘다.
            </p>
          </article>
          <article style={entryCard}>
            <span style={entryLabel}>{"// 이미 쓰고 있다면"}</span>
            <h3 style={entryHead}>IDE 간 규칙을 한 곳에서</h3>
            <code style={entryCmd}>vhk sync</code>
            <p style={desc}>
              RULES.md 하나만 관리하면 .cursorrules, CLAUDE.md, AGENTS.md를
              자동으로 동기화한다.
            </p>
          </article>
          <article style={entryCard}>
            <span style={entryLabel}>{"// Cursor·Claude Desktop"}</span>
            <h3 style={entryHead}>MCP 서버로 24개 tool 호출</h3>
            <code style={entryCmd}>vhk mcp-init</code>
            <p style={desc}>
              {".cursor/mcp.json 자동 생성 → 재시작 한 번이면 채팅에서 "}
              <code style={{ fontFamily: "var(--font-mono)" }}>vhk status</code>
              {" / save / goal / 24개 도구를 자연어로 호출."}
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
