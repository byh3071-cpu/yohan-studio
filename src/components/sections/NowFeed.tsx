import type { CSSProperties } from "react"
import Link from "next/link"
import { getNowFeed, NOW_KIND_LABELS } from "@/lib/nowFeed"

const section: CSSProperties = {
  background: "var(--bg)",
  padding: "96px 24px",
  borderBottom: "var(--border-w) solid var(--line)",
}

const inner: CSSProperties = {
  maxWidth: "var(--max-w)",
  margin: "0 auto",
}

const head: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  marginBottom: "48px",
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
  fontSize: "clamp(32px, 5vw, 52px)",
  fontWeight: 800,
  lineHeight: 1.05,
  letterSpacing: "-0.03em",
  color: "var(--ink)",
}

const accent: CSSProperties = { color: "var(--accent)" }

const lead: CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.65,
  color: "var(--ink-2)",
  maxWidth: "540px",
}

const row: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "96px 20px minmax(0, 1fr)",
}

const dateCell: CSSProperties = {
  textAlign: "right",
  paddingRight: "14px",
  paddingTop: "2px",
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  color: "var(--muted)",
  whiteSpace: "nowrap",
}

// 세로 레일 — 각 행의 가운데 칼럼 왼쪽 보더가 이어져 하나의 타임라인 선이 된다.
const railCell: CSSProperties = {
  position: "relative",
  borderLeft: "var(--border-w) solid var(--line)",
}

const marker: CSSProperties = {
  position: "absolute",
  left: "-6px",
  top: "6px",
  width: "10px",
  height: "10px",
  background: "var(--accent)",
  border: "1px solid var(--line)",
}

const content: CSSProperties = {
  paddingLeft: "18px",
  paddingBottom: "30px",
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  alignItems: "flex-start",
}

const kindChip: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  padding: "1px 8px",
  border: "1px solid var(--line)",
  background: "var(--surface)",
  color: "var(--ink-2)",
}

const itemTitle: CSSProperties = {
  fontSize: "15px",
  fontWeight: 700,
  lineHeight: 1.5,
  color: "var(--ink)",
}

const allLink: CSSProperties = {
  display: "inline-block",
  marginTop: "8px",
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.06em",
  color: "var(--accent)",
}

export async function NowFeed() {
  const items = await getNowFeed()
  if (items.length === 0) return null

  return (
    <section style={section}>
      <div style={inner}>
        <div style={head}>
          <div style={eyebrow}>{"// NOW — 최근 움직임"}</div>
          <h2 style={title}>
            지금 움직이는 것들<span style={accent}>.</span>
          </h2>
          <p style={lead}>
            제품 릴리즈, 새 글, 배움의 기록이 생기는 대로 여기 쌓입니다. 손으로 고르지
            않고, 실제 작업 데이터에서 그대로 가져옵니다.
          </p>
        </div>

        <div>
          {items.map((item, i) => (
            <div key={`${item.kind}-${item.href}-${item.date}`} style={row}>
              <div style={dateCell}>{item.date}</div>
              <div
                style={
                  i === items.length - 1
                    ? { ...railCell, borderLeftColor: "transparent" }
                    : railCell
                }
              >
                <span style={marker} aria-hidden />
              </div>
              <div style={i === items.length - 1 ? { ...content, paddingBottom: 0 } : content}>
                <span style={kindChip}>{NOW_KIND_LABELS[item.kind]}</span>
                <Link href={item.href} style={itemTitle}>
                  {item.title}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <Link href="/updates" style={allLink}>
          업데이트 전체 보기 →
        </Link>
      </div>
    </section>
  )
}
