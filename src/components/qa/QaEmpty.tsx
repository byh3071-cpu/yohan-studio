import type { CSSProperties } from "react"

export function QaEmpty() {
  const card: CSSProperties = {
    background: "var(--surface)",
    border: "var(--border-w) solid var(--line)",
    boxShadow: "var(--shadow-brutal)",
    padding: "32px",
    maxWidth: "640px",
    margin: "0 auto",
  }
  const eyebrow: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--muted)",
    marginBottom: "12px",
  }
  const title: CSSProperties = {
    fontSize: "24px",
    fontWeight: 800,
    color: "var(--ink)",
    marginBottom: "12px",
    lineHeight: 1.2,
  }
  const desc: CSSProperties = {
    fontSize: "14px",
    color: "var(--ink-2)",
    lineHeight: 1.7,
    marginBottom: "20px",
  }
  const code: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "13px",
    background: "var(--bg)",
    border: "1px solid var(--line)",
    padding: "10px 12px",
    display: "block",
  }

  return (
    <div style={card}>
      <div style={eyebrow}>{"// QA REPORT NOT FOUND"}</div>
      <h2 style={title}>리포트가 아직 생성되지 않았습니다.</h2>
      <p style={desc}>
        로컬에서 <code>npm run qa:test</code>를 실행하면{" "}
        <code>qa-artifacts/report.summary.json</code>이 생성됩니다. 그 다음 이 페이지를 새로
        고치면 결과가 표시됩니다.
      </p>
      <code style={code}>{"$ npm run qa:install   # 최초 1회"}</code>
      <div style={{ height: 6 }} />
      <code style={code}>{"$ npm run qa:test      # raw + summary 자동 생성"}</code>
    </div>
  )
}
