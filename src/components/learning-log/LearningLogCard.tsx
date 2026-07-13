import type { CSSProperties } from "react"
import Link from "next/link"

import type { LearningLogSummary } from "@/types/learningLog"

const card: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "22px 26px",
  background: "var(--bg)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow-sm)",
  textDecoration: "none",
  color: "inherit",
  transition: "transform 120ms ease, box-shadow 120ms ease",
}

const dateText: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 600,
  color: "var(--accent)",
  letterSpacing: "0.05em",
}

const title: CSSProperties = {
  fontSize: "19px",
  fontWeight: 800,
  letterSpacing: "-0.02em",
  lineHeight: 1.3,
  color: "var(--ink)",
}

export function LearningLogCard({ item }: { item: LearningLogSummary }) {
  const edited = new Date(item.lastEdited).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  return (
    <Link href={`/learning-log/${item.id}`} className="post-card" style={card}>
      <span style={dateText}>최종 수정 {edited}</span>
      <h2 style={title}>{item.title}</h2>
    </Link>
  )
}
