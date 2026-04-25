import type { CSSProperties } from "react"

const section: CSSProperties = {
  background: "var(--bg)",
  padding: "80px 24px 120px",
  borderBottom: "var(--border-w) solid var(--ink)",
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
  display: "flex",
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
  marginBottom: "32px",
}

const accentMark: CSSProperties = { color: "var(--accent)", display: "inline" }

const sub: CSSProperties = {
  fontSize: "17px",
  lineHeight: 1.65,
  color: "var(--ink-2)",
  maxWidth: "480px",
  marginBottom: "40px",
  borderLeft: "3px solid var(--ink)",
  paddingLeft: "18px",
}

const ctaRow: CSSProperties = { display: "flex", gap: "14px", flexWrap: "wrap" }

const btnPrimary: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "16px 26px",
  fontSize: "15px",
  fontWeight: 700,
  background: "var(--accent)",
  color: "var(--accent-ink)",
  border: "var(--border-w) solid var(--ink)",
  boxShadow: "var(--shadow)",
  textDecoration: "none",
  whiteSpace: "nowrap",
}

const btnGhost: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "16px 26px",
  fontSize: "15px",
  fontWeight: 700,
  background: "var(--bg)",
  color: "var(--ink)",
  border: "var(--border-w) solid var(--ink)",
  boxShadow: "var(--shadow-sm)",
  textDecoration: "none",
  whiteSpace: "nowrap",
}

const meta: CSSProperties = {
  background: "var(--surface)",
  border: "var(--border-w) solid var(--ink)",
  boxShadow: "var(--shadow)",
  padding: "24px",
}

const metaTitle: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: "20px",
  paddingBottom: "14px",
  borderBottom: "1px solid var(--ink)",
}

const metaRow: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  padding: "10px 0",
  borderBottom: "1px dashed var(--muted-2)",
}

const metaKey: CSSProperties = {
  fontSize: "12px",
  fontFamily: "var(--font-mono)",
  color: "var(--muted)",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
}

const metaVal: CSSProperties = {
  fontSize: "14px",
  fontWeight: 600,
  color: "var(--ink)",
  whiteSpace: "nowrap",
}

export function Hero() {
  return (
    <section id="hero" style={section}>
      <div
        className="mx-auto grid w-full grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr] md:items-start"
        style={inner}
      >
        <div style={left}>
          <div style={eyebrow}>
            <span style={eyeMark} />
            01 / 바이브코더 · 1인 기업
          </div>
          <h1 style={title}>
            바리스타<span style={accentMark}>,</span>
            <br />
            그리고
            <br />
            바이브<span style={accentMark}>코더</span>.
          </h1>
          <p style={sub}>
            카페에서 일하면서 AI와 자동화에 빠졌다. 코드를 직접 짜는 대신 AI에게 시키고, 시스템을 설계하고, 결과물을 만든다.
          </p>
          <div style={ctaRow}>
            <a href="#portfolio" style={btnPrimary}>
              포트폴리오 보기 →
            </a>
            <a href="#blog" style={btnGhost}>
              블로그 읽기
            </a>
          </div>
        </div>

        <aside style={meta}>
          <div style={metaTitle}>// 메타데이터</div>
          <div style={{ ...metaRow, paddingTop: 0 }}>
            <span style={metaKey}>이름</span>
            <span style={metaVal}>백요한</span>
          </div>
          <div style={metaRow}>
            <span style={metaKey}>역할</span>
            <span style={metaVal}>바리스타 + 코더</span>
          </div>
          <div style={metaRow}>
            <span style={metaKey}>위치</span>
            <span style={metaVal}>서울 관악</span>
          </div>
          <div style={metaRow}>
            <span style={metaKey}>스택</span>
            <span style={metaVal}>Cursor · Notion</span>
          </div>
          <div style={{ ...metaRow, borderBottom: "none", paddingBottom: 0 }}>
            <span style={metaKey}>상태</span>
            <span style={{ ...metaVal, display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  background: "var(--accent)",
                  display: "inline-block",
                }}
              />
              구축 중
            </span>
          </div>
        </aside>
      </div>
    </section>
  )
}
