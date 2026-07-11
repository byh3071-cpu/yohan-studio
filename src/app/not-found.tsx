import type { CSSProperties } from "react"
import Link from "next/link"

const section: CSSProperties = {
  background: "var(--bg)",
  padding: "140px 24px 160px",
  borderBottom: "var(--border-w) solid var(--line)",
}

const inner: CSSProperties = {
  maxWidth: "var(--max-w)",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "28px",
}

const eyebrow: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--muted)",
}

const title: CSSProperties = {
  fontSize: "clamp(64px, 12vw, 160px)",
  fontWeight: 800,
  lineHeight: 0.95,
  letterSpacing: "-0.04em",
  color: "var(--ink)",
  margin: 0,
}

const accentMark: CSSProperties = { color: "var(--accent)" }

const desc: CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.65,
  color: "var(--ink-2)",
  margin: 0,
  maxWidth: "560px",
}

const links: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
  marginTop: "8px",
}

const primary: CSSProperties = {
  background: "var(--accent)",
  color: "var(--accent-ink)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow)",
  padding: "14px 22px",
  fontSize: "14px",
  fontWeight: 800,
  fontFamily: "var(--font-mono)",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  textDecoration: "none",
}

const secondary: CSSProperties = {
  background: "var(--bg)",
  color: "var(--ink)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow-sm)",
  padding: "14px 22px",
  fontSize: "14px",
  fontWeight: 700,
  fontFamily: "var(--font-mono)",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  textDecoration: "none",
}

export default function NotFound() {
  return (
    <section style={section}>
      <div style={inner}>
        <span style={eyebrow}>{"// 404 — PAGE NOT FOUND"}</span>
        <h1 style={title}>
          없는 페이지<span style={accentMark}>.</span>
        </h1>
        <p style={desc}>
          주소가 바뀌었거나 삭제된 페이지다. 아래 동선으로 돌아가면 된다.
        </p>
        <div style={links}>
          <Link href="/" style={primary}>
            홈으로 →
          </Link>
          <Link href="/blog" style={secondary}>
            블로그
          </Link>
          <Link href="/showroom" style={secondary}>
            쇼룸
          </Link>
        </div>
      </div>
    </section>
  )
}
