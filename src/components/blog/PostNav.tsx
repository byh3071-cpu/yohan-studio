import type { CSSProperties } from "react"
import Link from "next/link"
import type { BlogPostMeta } from "@/lib/blog"

type PostNavProps = {
  prev: BlogPostMeta | null
  next: BlogPostMeta | null
}

const wrap: CSSProperties = {
  marginTop: "64px",
  paddingTop: "32px",
  borderTop: "var(--border-w) solid var(--line)",
  display: "grid",
  // 데스크탑 기본 2열, 모바일 1열은 globals.css의 .post-nav 미디어쿼리에서 처리
  gridTemplateColumns: "1fr 1fr",
  gap: "16px",
}

const cardBase: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  padding: "20px 22px",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow-sm)",
  background: "var(--bg)",
  color: "inherit",
  minWidth: 0,
  transition: "transform 120ms ease, box-shadow 120ms ease",
}

const stub: CSSProperties = {
  fontFamily: "var(--font-en)",
  fontSize: "11px",
  fontWeight: 500,
  color: "var(--muted)",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
}

const ttl: CSSProperties = {
  fontSize: "16px",
  fontWeight: 700,
  lineHeight: 1.3,
  letterSpacing: "-0.01em",
  color: "var(--ink)",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
}

const dateStyle: CSSProperties = {
  fontFamily: "var(--font-en)",
  fontSize: "11px",
  fontWeight: 500,
  color: "var(--accent-text)",
  letterSpacing: "0.04em",
}

const empty: CSSProperties = {
  ...cardBase,
  border: "1px dashed var(--line-soft)",
  boxShadow: "none",
  cursor: "default",
  pointerEvents: "none",
  background: "transparent",
  opacity: 0.5,
}

export function PostNav({ prev, next }: PostNavProps) {
  return (
    <nav className="post-nav" style={wrap} aria-label="이전/다음 글">
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="post-nav-card"
          style={{ ...cardBase, alignItems: "flex-start", textAlign: "left" }}
        >
          <span style={stub}>{"← PREV"}</span>
          <span style={dateStyle}>{prev.date}</span>
          <span style={ttl}>{prev.title}</span>
        </Link>
      ) : (
        <div style={{ ...empty, alignItems: "flex-start" }} aria-hidden>
          <span style={stub}>{"← PREV"}</span>
          <span style={{ ...ttl, color: "var(--muted)" }}>처음 글입니다</span>
        </div>
      )}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="post-nav-card"
          style={{ ...cardBase, alignItems: "flex-end", textAlign: "right" }}
        >
          <span style={stub}>{"NEXT →"}</span>
          <span style={dateStyle}>{next.date}</span>
          <span style={ttl}>{next.title}</span>
        </Link>
      ) : (
        <div style={{ ...empty, alignItems: "flex-end" }} aria-hidden>
          <span style={stub}>{"NEXT →"}</span>
          <span style={{ ...ttl, color: "var(--muted)" }}>마지막 글입니다</span>
        </div>
      )}
    </nav>
  )
}
