import type { Metadata } from "next"
import type { CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PostNav } from "@/components/blog/PostNav"
import { TableOfContents } from "@/components/blog/TableOfContents"
import { compileBlogPost, getAdjacentPosts, getPublishedPosts, getPostMeta } from "@/lib/blog"

type PageProps = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getPublishedPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const meta = getPostMeta(slug)
  if (!meta || !meta.published) {
    return { title: "글을 찾을 수 없음" }
  }
  const ogImages = meta.thumbnail
    ? [{ url: meta.thumbnail, alt: meta.title }]
    : undefined

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "article",
      publishedTime: meta.date,
      tags: meta.tags,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const compiled = await compileBlogPost(slug)
  if (!compiled || !compiled.meta.published) notFound()

  const { meta, content } = compiled
  const { prev, next } = getAdjacentPosts(slug)
  const isLocalThumb = meta.thumbnail?.startsWith("/")

  const section: CSSProperties = {
    background: "var(--bg)",
    padding: "32px 24px 96px",
    borderBottom: "var(--border-w) solid var(--line)",
  }
  const main: CSSProperties = { minWidth: 0 }
  const back: CSSProperties = {
    display: "inline-block",
    marginBottom: "28px",
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "0.06em",
    color: "var(--accent)",
  }
  const hero: CSSProperties = {
    marginBottom: "40px",
    paddingBottom: "32px",
    borderBottom: "var(--border-w) solid var(--line)",
  }
  const row: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px 20px",
    alignItems: "center",
    marginBottom: "16px",
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "0.05em",
  }
  const cat: CSSProperties = { color: "var(--accent)", textTransform: "uppercase" }
  const dateStyle: CSSProperties = {
    color: "var(--accent)",
    fontFamily: "var(--font-en)",
    fontWeight: 500,
    letterSpacing: "0.04em",
  }
  const h1: CSSProperties = {
    fontSize: "clamp(28px, 3.6vw, 46px)",
    fontWeight: 800,
    letterSpacing: "-0.03em",
    lineHeight: 1.15,
    marginBottom: "16px",
    color: "var(--ink)",
    maxWidth: "100%",
  }
  const desc: CSSProperties = {
    fontSize: "17px",
    lineHeight: 1.65,
    color: "var(--ink-2)",
  }
  const tagsRow: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "20px",
  }
  const tag: CSSProperties = {
    fontSize: "11px",
    fontWeight: 600,
    fontFamily: "var(--font-mono)",
    padding: "4px 10px",
    border: "1px solid var(--line)",
    color: "var(--ink)",
    letterSpacing: "0.03em",
    textTransform: "uppercase",
  }
  const thumbWrap: CSSProperties = {
    marginTop: "28px",
    position: "relative",
    aspectRatio: "16 / 9",
    border: "var(--border-w) solid var(--line)",
    boxShadow: "var(--shadow)",
    background: "var(--surface-2)",
    overflow: "hidden",
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    author: { "@type": "Person", name: "백요한" },
    publisher: { "@type": "Organization", name: "요한 스튜디오" },
  }

  return (
    <article style={section}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="post-shell">
        <div style={main}>
          <Link href="/blog" style={back}>
            ← BLOG INDEX
          </Link>
          <header style={hero}>
            <div style={row}>
              <span style={cat}>{meta.category}</span>
              <span style={dateStyle}>{meta.date}</span>
            </div>
            <h1 style={h1}>{meta.title}</h1>
            <p style={desc}>{meta.description}</p>
            <div style={tagsRow}>
              {meta.tags.map((t) => (
                <span key={t} style={tag}>
                  {t}
                </span>
              ))}
            </div>
            {meta.thumbnail && isLocalThumb ? (
              <div style={thumbWrap}>
                <Image
                  src={meta.thumbnail}
                  alt=""
                  fill
                  sizes="(max-width: 800px) 100vw, 680px"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            ) : meta.thumbnail && !isLocalThumb ? (
              <div style={thumbWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element -- external thumbnail URL */}
                <img
                  src={meta.thumbnail}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            ) : null}
          </header>
          <div className="mdx-content">{content}</div>
          <PostNav prev={prev} next={next} />
        </div>
        <TableOfContents />
      </div>
    </article>
  )
}
