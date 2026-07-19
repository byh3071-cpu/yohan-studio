import type { CSSProperties, ReactNode } from "react"
import Link from "next/link"
import { PRODUCTS, type UpdateEntryMeta } from "@/lib/updatesShared"
import { UpdateTypeBadge } from "@/components/updates/UpdateTypeBadge"

type Props = {
  meta: UpdateEntryMeta
  content: ReactNode
}

export function UpdateEntry({ meta, content }: Props) {
  const article: CSSProperties = {
    border: "var(--border-w) solid var(--line)",
    boxShadow: "var(--shadow)",
    background: "var(--bg)",
  }
  const head: CSSProperties = {
    display: "flex",
    alignItems: "baseline",
    flexWrap: "wrap",
    gap: "10px 14px",
    padding: "16px 22px",
    borderBottom: "var(--border-w) solid var(--line)",
    background: "var(--surface)",
  }
  const productLabel: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "var(--muted)",
  }
  const version: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "20px",
    fontWeight: 800,
    letterSpacing: "-0.01em",
    color: "var(--ink)",
  }
  const versionAccent: CSSProperties = { color: "var(--accent)" }
  const date: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    color: "var(--muted)",
  }
  const badges: CSSProperties = { display: "flex", gap: "6px", flexWrap: "wrap" }
  const title: CSSProperties = {
    width: "100%",
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: 1.4,
    color: "var(--ink)",
  }
  const body: CSSProperties = { padding: "20px 22px" }
  const blogLink: CSSProperties = {
    display: "inline-block",
    marginTop: "16px",
    padding: "8px 14px",
    border: "1px solid var(--line)",
    boxShadow: "var(--shadow-sm)",
    background: "var(--surface)",
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "0.04em",
    color: "var(--ink)",
  }
  const arrow: CSSProperties = { color: "var(--accent)", fontWeight: 800 }

  return (
    <article style={article}>
      <header style={head}>
        <span style={productLabel}>{PRODUCTS[meta.product]}</span>
        {/* 릴리즈 제목이 heading — 버전 번호는 시각적으로 크지만 의미상 보조 라벨(스크린리더 heading 탐색 기준). */}
        <span style={version}>
          <span style={versionAccent}>v</span>
          {meta.version}
        </span>
        <time dateTime={meta.date} style={date}>
          {meta.date}
        </time>
        <span style={badges}>
          {meta.types.map((t) => (
            <UpdateTypeBadge key={t} type={t} />
          ))}
        </span>
        <h2 style={title}>{meta.title}</h2>
      </header>
      <div style={body}>
        <div className="mdx-content">{content}</div>
        {meta.blogSlug && (
          <Link href={`/blog/${meta.blogSlug}`} style={blogLink}>
            자세한 이야기 <span style={arrow}>→</span>
          </Link>
        )}
      </div>
    </article>
  )
}
