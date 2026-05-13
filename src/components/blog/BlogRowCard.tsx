import type { CSSProperties } from "react"
import Link from "next/link"
import type { BlogPostMeta } from "@/lib/blog"

type Props = { post: BlogPostMeta }

const card: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "160px 1fr 220px",
  gap: "32px",
  alignItems: "start",
  padding: "24px 26px",
  background: "var(--bg)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow-sm)",
  textDecoration: "none",
  color: "inherit",
  transition: "transform 120ms ease, box-shadow 120ms ease",
}

const dateCol: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.05em",
}
const dateText: CSSProperties = { color: "var(--accent)" }
const catText: CSSProperties = {
  color: "var(--muted)",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
}

const main: CSSProperties = { minWidth: 0 }
const title: CSSProperties = {
  fontSize: "20px",
  fontWeight: 800,
  letterSpacing: "-0.02em",
  lineHeight: 1.25,
  color: "var(--ink)",
  marginBottom: "8px",
}
const desc: CSSProperties = {
  fontSize: "14px",
  lineHeight: 1.6,
  color: "var(--ink-2)",
}

const tagsCol: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "6px",
  justifyContent: "flex-end",
  alignItems: "flex-start",
}
const tag: CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  fontFamily: "var(--font-mono)",
  padding: "3px 8px",
  border: "1px solid var(--line)",
  color: "var(--ink)",
  letterSpacing: "0.03em",
  textTransform: "uppercase",
}

export function BlogRowCard({ post }: Props) {
  return (
    <Link href={`/blog/${post.slug}`} className="post-card" style={card}>
      <div style={dateCol}>
        <span style={dateText}>{post.date}</span>
        {post.category ? <span style={catText}>{post.category}</span> : null}
      </div>
      <div style={main}>
        <h2 style={title}>{post.title}</h2>
        <p style={desc}>{post.description}</p>
      </div>
      <div className="post-tags" style={tagsCol}>
        {post.tags.map((t) => (
          <span key={t} style={tag}>
            {t}
          </span>
        ))}
      </div>
    </Link>
  )
}
