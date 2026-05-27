import type { CSSProperties } from "react"
import { VHK_SPEC_TREE_V1 } from "@/data/vhk"

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

const badge: CSSProperties = {
  display: "inline-block",
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--accent-ink)",
  background: "var(--accent)",
  padding: "4px 10px",
  marginBottom: "12px",
  border: "var(--border-w) solid var(--line)",
}

const lead: CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.65,
  color: "var(--ink-2)",
  maxWidth: "640px",
}

const layout: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr)",
  gap: "40px",
  alignItems: "start",
  minWidth: 0,
}

const tree: CSSProperties = {
  background: "var(--ink)",
  border: "1.5px solid var(--line)",
  boxShadow: "var(--shadow)",
  fontFamily: "var(--font-mono)",
  fontSize: "13px",
  lineHeight: 1.8,
  color: "var(--bg)",
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
  gridTemplateColumns: "minmax(0, 1fr)",
  gap: "16px",
  alignItems: "stretch",
  minWidth: 0,
}

export function VhkSpec() {
  return (
    <section style={section}>
      <div style={inner}>
        <div style={head}>
          <div style={eyebrow}>{"// 04 — PROJECT + .VHK/"}</div>
          <span style={badge}>v1.0 현재</span>
          <h2 style={title}>
            프로젝트 루트 + <span style={accent}>.vhk/</span> 구조.
          </h2>
          <p style={lead}>
            v1.0.x 기준 실제 산출물. RULES.md를 한 곳에서 쓰고, VHK가 IDE별 규칙 파일로
            동기화한다. Layer 2~4 비전은 아래 로드맵 섹션.
          </p>
        </div>

        <div className="vhk-spec-grid" style={layout}>
          <div>
            <div style={treeLabel}>{"// 디렉토리 구조 (README 정합)"}</div>
            <pre style={tree}>{VHK_SPEC_TREE_V1}</pre>
          </div>

          <div>
            <div style={treeLabel}>{"// vhk sync 변환 흐름"}</div>
            <div className="vhk-spec-flow" style={tree3Cols}>
              <article style={fileBoxAccent}>
                <span style={fileName}>RULES.md</span>
                <span style={fileNote}>
                  마스터 규칙 — 프로젝트 톤, 코딩 컨벤션, 회피 항목.
                  <br />
                  vhk sync의 단일 소스.
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
                  <span style={fileNote}>Cursor용으로 자동 동기화.</span>
                </article>
                <article style={fileBox}>
                  <span style={fileName}>CLAUDE.md</span>
                  <span style={fileNote}>Claude Code 운영 규칙으로 동기화.</span>
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
          배포는{" "}
          <span style={{ fontFamily: "var(--font-mono)", fontStyle: "normal", fontWeight: 700, color: "var(--accent)" }}>
            vhk deploy
          </span>
          /{" "}
          <span style={{ fontFamily: "var(--font-mono)", fontStyle: "normal", fontWeight: 700, color: "var(--accent)" }}>
            publish
          </span>
          . 출하 전 점검은{" "}
          <span style={{ fontFamily: "var(--font-mono)", fontStyle: "normal", fontWeight: 700, color: "var(--accent)" }}>
            vhk ship
          </span>
          .
        </p>
      </div>
    </section>
  )
}
