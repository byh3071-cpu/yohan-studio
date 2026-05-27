import type { CSSProperties } from "react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "결제 완료 — Yohan Studio",
  robots: { index: false, follow: false },
}

type PageProps = { searchParams: Promise<{ session_id?: string }> }

const section: CSSProperties = {
  background: "var(--bg)",
  padding: "120px 24px",
  borderBottom: "var(--border-w) solid var(--line)",
}

const inner: CSSProperties = {
  maxWidth: "640px",
  margin: "0 auto",
  textAlign: "center",
}

const card: CSSProperties = {
  background: "var(--bg)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow)",
  padding: "48px 32px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  alignItems: "center",
}

const badge: CSSProperties = {
  background: "var(--accent)",
  color: "var(--accent-ink)",
  padding: "4px 12px",
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
}

const title: CSSProperties = {
  fontSize: "32px",
  fontWeight: 800,
  letterSpacing: "-0.02em",
  margin: 0,
  color: "var(--ink)",
}

const desc: CSSProperties = {
  fontSize: "15px",
  lineHeight: 1.6,
  color: "var(--ink-2)",
  margin: 0,
}

const session: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  color: "var(--muted)",
  wordBreak: "break-all",
  padding: "8px 12px",
  border: "1px dashed var(--muted-2, var(--muted))",
}

const link: CSSProperties = {
  background: "var(--ink)",
  color: "var(--bg)",
  padding: "12px 22px",
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  textDecoration: "none",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow)",
}

export default async function CheckoutSuccessPage({ searchParams }: PageProps) {
  const { session_id } = await searchParams
  return (
    <section style={section}>
      <div style={inner}>
        <div style={card}>
          <span style={badge}>결제 완료</span>
          <h1 style={title}>구매가 완료되었습니다.</h1>
          <p style={desc}>
            영수증과 다운로드 안내를 메일로 발송했습니다.
            <br />
            도착이 늦으면 스팸함을 확인하거나 문의 페이지로 연락주세요.
          </p>
          {session_id && <code style={session}>session_id: {session_id}</code>}
          <Link href="/store" style={link}>
            스토어로 돌아가기 →
          </Link>
        </div>
      </div>
    </section>
  )
}
