import type { CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import type { BlogPostMeta } from "@/lib/blog"

type BlogPostCardProps = {
  post: BlogPostMeta
  index: number
}

export function BlogPostCard({ post, index }: BlogPostCardProps) {
  const card: CSSProperties = {
    background: "var(--bg)",
    border: "var(--border-w) solid var(--line)",
    boxShadow: "var(--shadow)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    height: "100%",
  }
  const thumb: CSSProperties = {
    height: "160px",
    background: "var(--surface-2)",
    borderBottom: "var(--border-w) solid var(--line)",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    fontWeight: 600,
    color: "var(--muted)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  }
  const thumbNum: CSSProperties = {
    position: "absolute",
    top: "10px",
    left: "12px",
    fontSize: "11px",
    fontWeight: 500,
    fontFamily: "var(--font-en)",
    color: "var(--muted)",
    letterSpacing: "0.04em",
  }
  const body: CSSProperties = {
    padding: "20px 22px 22px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    flex: 1,
  }
  const top: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingBottom: "12px",
    borderBottom: "1px solid var(--line)",
  }
  const cat: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    fontWeight: 600,
    color: "var(--accent-text)",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  }
  const dt: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    fontWeight: 600,
    color: "var(--muted)",
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
    border: "1px solid var(--line)",
    color: "var(--ink)",
    letterSpacing: "0.03em",
    textTransform: "uppercase",
  }
  const cta: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    fontWeight: 700,
    marginTop: "8px",
    color: "var(--accent-text)",
    letterSpacing: "0.04em",
  }

  const href = `/blog/${post.slug}`
  const isLocalThumb = post.thumbnail?.startsWith("/")

  return (
    <article style={card}>
      <Link href={href} style={{ display: "block", color: "inherit" }} aria-label={post.title}>
        <div style={thumb}>
          <span style={thumbNum}>POST {String(index).padStart(2, "0")}</span>
          {post.thumbnail && isLocalThumb ? (
            <Image
              src={post.thumbnail}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              priority={index === 1}
              style={{ objectFit: "cover" }}
            />
          ) : post.thumbnail && !isLocalThumb ? (
            // Remote URLs: opt out of next/image (domains not configured).
            // eslint-disable-next-line @next/next/no-img-element -- external thumbnail URL
            <img
              src={post.thumbnail}
              alt=""
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            "THUMBNAIL · OPTIONAL"
          )}
        </div>
      </Link>
      <div style={body}>
        <div style={top}>
          <span style={cat}>{post.category}</span>
          <span style={dt}>{post.date}</span>
        </div>
        <Link href={href} style={{ color: "inherit" }}>
          <h2 style={ttl}>{post.title}</h2>
        </Link>
        <p style={exc}>{post.description}</p>
        <div style={tagsRow}>
          {post.tags.map((t) => (
            <span key={t} style={tag}>
              {t}
            </span>
          ))}
        </div>
        <Link href={href} style={cta}>
          READ →
        </Link>
      </div>
    </article>
  )
}
