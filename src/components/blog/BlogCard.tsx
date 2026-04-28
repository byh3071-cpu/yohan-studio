import type { CSSProperties } from "react"
import Link from "next/link"
import type { FeaturedBlog } from "@/data/featured"

type Props = FeaturedBlog & { idx: number; slug?: string }

export function BlogCard({ idx, date, title, excerpt, tags, slug }: Props) {
  const card: CSSProperties = {
    background: "var(--bg)",
    border: "var(--border-w) solid var(--ink)",
    boxShadow: "var(--shadow)",
    padding: "20px 22px 22px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  }
  const top: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingBottom: "12px",
    borderBottom: "1px solid var(--ink)",
  }
  const num: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    fontWeight: 600,
    color: "var(--muted)",
    letterSpacing: "0.05em",
  }
  const dt: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    fontWeight: 600,
    color: "var(--accent)",
    letterSpacing: "0.05em",
  }
  const ttl: CSSProperties = {
    fontSize: "20px",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: "var(--ink)",
    lineHeight: 1.2,
    marginTop: "4px",
  }
  const exc: CSSProperties = {
    fontSize: "14px",
    lineHeight: 1.6,
    color: "var(--ink-2)",
    flex: 1,
  }
  const tagsRow: CSSProperties = {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
    marginTop: "6px",
  }
  const tag: CSSProperties = {
    fontSize: "11px",
    fontWeight: 600,
    fontFamily: "var(--font-mono)",
    padding: "3px 8px",
    border: "1px solid var(--ink)",
    color: "var(--ink)",
    letterSpacing: "0.03em",
    textTransform: "uppercase",
  }

  const inner = (
    <article style={card}>
      <div style={top}>
        <span style={num}>POST {String(idx).padStart(2, "0")}</span>
        <span style={dt}>{date}</span>
      </div>
      <h3 style={ttl}>{title}</h3>
      <p style={exc}>{excerpt}</p>
      <div style={tagsRow}>
        {tags.map((t) => (
          <span key={t} style={tag}>
            {t}
          </span>
        ))}
      </div>
    </article>
  )

  if (slug) {
    return (
      <Link href={`/blog/${slug}`} style={{ color: "inherit" }}>
        {inner}
      </Link>
    )
  }
  return inner
}
