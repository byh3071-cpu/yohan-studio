import type { CSSProperties } from "react"

const section: CSSProperties = {
  background: "var(--surface)",
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

const layout: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "40px",
  alignItems: "start",
}

const tree: CSSProperties = {
  background: "#0A0A0A",
  border: "1.5px solid var(--line)",
  boxShadow: "var(--shadow)",
  fontFamily: "var(--font-mono)",
  fontSize: "13px",
  lineHeight: 1.8,
  color: "#F4F1EA",
  padding: "24px 26px",
  overflowX: "auto",
  whiteSpace: "pre",
}

const treeLabel: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: "12px",
}

const fileBox: CSSProperties = {
  background: "var(--bg)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow-sm)",
  padding: "20px 22px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
}

const fileBoxAccent: CSSProperties = {
  ...fileBox,
  borderColor: "var(--accent)",
  boxShadow: "4px 4px 0 var(--accent)",
}

const fileName: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "14px",
  fontWeight: 700,
  color: "var(--ink)",
}

const fileNote: CSSProperties = {
  fontSize: "12px",
  lineHeight: 1.5,
  color: "var(--muted)",
}

const arrowWrap: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "8px 0",
}

const stack: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
}

const punchline: CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontStyle: "italic",
  fontSize: "20px",
  lineHeight: 1.5,
  color: "var(--ink)",
  marginTop: "40px",
  paddingTop: "32px",
  borderTop: "var(--border-w) solid var(--line)",
  maxWidth: "640px",
}

const tree3Cols: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "16px",
  alignItems: "stretch",
}

export function VhkSpec() {
  return (
    <section style={section}>
      <div style={inner}>
        <div style={head}>
          <div style={eyebrow}>{"// 04 — .VHK/ SPEC"}</div>
          <h2 style={title}>
            .vhk/ — AI 코딩 컨텍스트의{" "}
            <span style={accent}>새로운 표준</span>.
          </h2>
          <p style={lead}>
            프로젝트 루트에 .vhk/ 하나면, 어떤 AI 도구를 쓰든 맥락이 따라온다.
            규칙을 한 번 작성하면, VHK가 IDE별로 변환한다.
          </p>
        </div>

        <div className="vhk-spec-grid" style={layout}>
          <div>
            <div style={treeLabel}>{"// 디렉토리 구조"}</div>
            <pre style={tree}>
{`.vhk/
├── rules/
│   ├── universal.md       ← 마스터 규칙 (한 번 작성)
│   ├── .cursorrules       ← Cursor용 (자동 생성)
│   └── CLAUDE.md          ← Claude용 (자동 생성)
├── context/
│   └── project.md         ← 프로젝트 정의
├── memory/
│   └── decisions.md       ← 결정사항 기록
└── prompts/               ← 재사용 프롬프트`}
            </pre>
          </div>

          <div>
            <div style={treeLabel}>{"// 변환 흐름"}</div>
            <div className="vhk-spec-flow" style={tree3Cols}>
              <article style={fileBoxAccent}>
                <span style={fileName}>universal.md</span>
                <span style={fileNote}>
                  한 번 작성하는 마스터 규칙.
                  <br />
                  프로젝트 톤, 코딩 컨벤션, 회피 항목.
                </span>
              </article>

              <div className="vhk-arrow" style={arrowWrap} aria-hidden="true">
                <svg
                  width="64"
                  height="24"
                  viewBox="0 0 64 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2"
                    y1="12"
                    x2="54"
                    y2="12"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <polyline
                    points="46,4 56,12 46,20"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>

              <div style={stack}>
                <article style={fileBox}>
                  <span style={fileName}>.cursorrules</span>
                  <span style={fileNote}>Cursor 전용 포맷으로 자동 변환.</span>
                </article>
                <article style={fileBox}>
                  <span style={fileName}>CLAUDE.md</span>
                  <span style={fileNote}>Claude Code 전용 운영 규칙으로 변환.</span>
                </article>
                <article style={fileBox}>
                  <span style={fileName}>AGENTS.md · …</span>
                  <span style={fileNote}>Codex · Windsurf · Zed 등 추가 어댑터.</span>
                </article>
              </div>
            </div>
          </div>
        </div>

        <p style={punchline}>
          코드에 Git이 있듯,
          <br />
          <span style={{ color: "var(--accent)", fontStyle: "normal", fontWeight: 700, fontFamily: "var(--font-sans)" }}>
            AI 코딩 컨텍스트에도 표준이 필요하다.
          </span>
        </p>
      </div>
    </section>
  )
}
