import type { CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import type { BlogPostMeta } from "@/lib/blog"
import type { ShowroomProject } from "@/data/showroomProjects"
import { getPostMeta } from "@/lib/blog"
import { getShowroomProject } from "@/lib/showroom"

const section: CSSProperties = {
  marginTop: "56px",
  paddingTop: "32px",
  borderTop: "var(--border-w) solid var(--line)",
}

const heading: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: "20px",
}

const grid: CSSProperties = {
  display: "grid",
  gap: "16px",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
}

const card: CSSProperties = {
  display: "block",
  textDecoration: "none",
  color: "inherit",
  background: "var(--surface)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow-sm)",
  padding: "18px 20px",
}

const cardTitle: CSSProperties = {
  fontSize: "18px",
  fontWeight: 800,
  letterSpacing: "-0.02em",
  color: "var(--ink)",
  marginBottom: "8px",
  lineHeight: 1.2,
}

const cardDesc: CSSProperties = {
  fontSize: "13px",
  lineHeight: 1.55,
  color: "var(--ink-2)",
}

const thumb: CSSProperties = {
  position: "relative",
  aspectRatio: "16 / 9",
  margin: "-18px -20px 14px",
  borderBottom: "var(--border-w) solid var(--line)",
  background: "var(--surface-2)",
  overflow: "hidden",
}

export function RelatedShowroomProjects({ slugs }: { slugs: string[] }) {
  const projects = slugs
    .map((s) => getShowroomProject(s))
    .filter((p): p is ShowroomProject => p !== undefined)

  if (projects.length === 0) return null

  return (
    <section style={section} aria-labelledby="related-showroom-heading">
      <h2 id="related-showroom-heading" style={heading}>
        관련 프로젝트
      </h2>
      <div style={grid}>
        {projects.map((p) => (
          <Link key={p.slug} href={`/showroom/${p.slug}`} style={card}>
            {p.image && (
              <div style={thumb}>
                <Image
                  src={p.image}
                  alt={p.imageAlt ?? p.title}
                  fill
                  sizes="280px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
            <div style={cardTitle}>{p.title}</div>
            <p style={cardDesc}>{p.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function RelatedBlogPosts({ slugs }: { slugs: string[] }) {
  const posts = slugs
    .map((s) => getPostMeta(s))
    .filter((p): p is BlogPostMeta => p !== null && p.published)

  if (posts.length === 0) return null

  return (
    <section style={section} aria-labelledby="related-blog-heading">
      <h2 id="related-blog-heading" style={heading}>
        관련 블로그 글
      </h2>
      <div style={grid}>
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} style={card}>
            {p.thumbnail?.startsWith("/") && (
              <div style={thumb}>
                <Image
                  src={p.thumbnail}
                  alt={`${p.title} 썸네일`}
                  fill
                  sizes="280px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
            <div style={cardTitle}>{p.title}</div>
            <p style={cardDesc}>{p.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
