import type { CSSProperties } from "react"
import Link from "next/link"

import { NewsletterForm } from "@/components/layout/NewsletterForm"

const footer: CSSProperties = {
  background: "var(--footer-bg)",
  color: "var(--footer-text)",
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
  color: "var(--footer-muted)",
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
  borderBottom: "1px solid var(--footer-line)",
}

const link: CSSProperties = {
  display: "block",
  fontSize: "14px",
  fontWeight: 500,
  color: "var(--footer-text)",
  marginBottom: "10px",
}

const bottom: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: "24px",
  borderTop: "1px solid var(--footer-line)",
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  color: "var(--footer-muted)",
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
            <Link href="/learning-log" style={link}>
              러닝로그
            </Link>
            <Link href="/showroom" style={link}>
              쇼룸
            </Link>
            <Link href="/vhk" style={link}>
              VHK
            </Link>
            <Link href="/store" style={link}>
              스토어
            </Link>
          </div>
          <div>
            <div style={colTitle}>{"// CONNECT"}</div>
            <Link href="/contact" style={link}>
              문의하기
            </Link>
            <a href="mailto:byh3071@gmail.com" style={link}>
              byh3071@gmail.com
            </a>
            <a
              href="https://github.com/byh3071-cpu"
              style={{
                ...link,
                fontFamily: "var(--font-en)",
                fontWeight: 400,
                textTransform: "uppercase",
              }}
            >
              GitHub
            </a>
          </div>
          <div>
            <div style={colTitle}>{"// NEWSLETTER"}</div>
            <p
              style={{
                fontSize: "13px",
                color: "var(--footer-muted)",
                lineHeight: 1.55,
                marginBottom: "12px",
              }}
            >
              새 글·실험·자료를 메일로 보내드립니다.
            </p>
            <NewsletterForm />
          </div>
        </div>
        <div style={bottom}>
          <div>© 2026 YOHAN STUDIO · 요한</div>
          <div style={{ fontFamily: "var(--font-en)", fontWeight: 400 }}>
            BUILT WITH NEXT.JS + CURSOR
          </div>
        </div>
      </div>
    </footer>
  )
}
