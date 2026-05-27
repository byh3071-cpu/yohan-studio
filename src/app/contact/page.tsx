import type { CSSProperties } from "react"
import type { Metadata } from "next"
import { Suspense } from "react"

import { ContactForm } from "@/components/contact/ContactForm"

export const metadata: Metadata = {
  title: "Contact — Yohan Studio",
  description:
    "협업 · 견적 · 강연 · 잡담 무엇이든. 영업일 기준 48시간 안에 회신드립니다.",
  alternates: { canonical: "/contact" },
}

const section: CSSProperties = {
  background: "var(--bg)",
  padding: "96px 24px",
  borderBottom: "var(--border-w) solid var(--line)",
}

const inner: CSSProperties = { maxWidth: "640px", margin: "0 auto" }

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
  fontSize: "clamp(36px, 5vw, 56px)",
  fontWeight: 800,
  lineHeight: 1,
  letterSpacing: "-0.03em",
  color: "var(--ink)",
  marginBottom: "12px",
}

const accent: CSSProperties = { color: "var(--accent)" }

const sub: CSSProperties = {
  fontSize: "15px",
  color: "var(--ink-2)",
  marginBottom: "40px",
  borderLeft: "3px solid var(--line)",
  paddingLeft: "14px",
}

const fallback: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "13px",
  color: "var(--muted)",
}

export default function ContactPage() {
  return (
    <section style={section}>
      <div style={inner}>
        <div style={eyebrow}>{"// CONTACT — 문의하기"}</div>
        <h1 style={title}>
          연락하기<span style={accent}>.</span>
        </h1>
        <p style={sub}>협업 · 견적 · 강연 · 피드백 · 잡담. 영업일 기준 48시간 안에 회신드립니다.</p>
        <Suspense fallback={<div style={fallback}>로딩 중입니다...</div>}>
          <ContactForm />
        </Suspense>
      </div>
    </section>
  )
}
