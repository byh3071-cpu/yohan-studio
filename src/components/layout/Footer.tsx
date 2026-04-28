import type { CSSProperties } from "react"
import Link from "next/link"

const footer: CSSProperties = {
  background: "var(--ink)",
  color: "var(--bg)",
  padding: "64px 24px 32px",
}

const inner: CSSProperties = { maxWidth: "var(--max-w)", margin: "0 auto" }

const top: CSSProperties = { marginBottom: "56px" }

const brand: CSSProperties = {
  fontSize: "32px",
  fontWeight: 800,
  letterSpacing: "-0.03em",
  marginBottom: "14px",
}

const dot: CSSProperties = {
  display: "inline-block",
  width: "12px",
  height: "12px",
  background: "var(--accent)",
  marginLeft: "4px",
  verticalAlign: "middle",
}

const tagline: CSSProperties = {
  fontSize: "14px",
  lineHeight: 1.7,
  color: "var(--muted-2)",
  maxWidth: "300px",
}

const colTitle: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--accent)",
  marginBottom: "18px",
  paddingBottom: "8px",
  borderBottom: "1px solid var(--muted)",
}

const link: CSSProperties = {
  display: "block",
  fontSize: "14px",
  fontWeight: 500,
  color: "var(--bg)",
  marginBottom: "10px",
}

const bottom: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: "24px",
  borderTop: "1px solid var(--muted)",
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  color: "var(--muted-2)",
  letterSpacing: "0.05em",
  flexWrap: "wrap",
  gap: "12px",
}

export function Footer() {
  return (
    <footer style={footer}>
      <div style={inner}>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]" style={top}>
          <div>
            <div style={brand}>
              YOHAN<span style={dot} /> STUDIO
            </div>
            <p style={tagline}>
              바리스타에서 바이브코더로.
              <br />
              AI로 만드는 1인 기업.
            </p>
          </div>
          <div>
            <div style={colTitle}>{"// SITE"}</div>
            <Link href="/" style={link}>
              홈
            </Link>
            <Link href="/blog" style={link}>
              블로그
            </Link>
            <Link href="/portfolio" style={link}>
              포트폴리오
            </Link>
            <Link href="/#store" style={link}>
              스토어
            </Link>
          </div>
          <div>
            <div style={colTitle}>{"// CONNECT"}</div>
            <a href="mailto:byh3071@gmail.com" style={link}>
              byh3071@gmail.com
            </a>
            <a href="https://github.com/byh3071-cpu" style={link}>
              GitHub
            </a>
          </div>
          <div>
            <div style={colTitle}>{"// META"}</div>
            <div style={{ ...link, color: "var(--muted-2)" }}>v2.0 · Phase 1</div>
            <div style={{ ...link, color: "var(--muted-2)" }}>2026.04</div>
            <div style={{ ...link, color: "var(--muted-2)" }}>서울 / KR</div>
          </div>
        </div>
        <div style={bottom}>
          <div>© 2026 YOHAN STUDIO · 백요한</div>
          <div>BUILT WITH NEXT.JS + CURSOR</div>
        </div>
      </div>
    </footer>
  )
}
