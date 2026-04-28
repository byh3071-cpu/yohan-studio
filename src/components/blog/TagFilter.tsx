"use client"

import { useMemo, useState } from "react"
import type { CSSProperties } from "react"
import type { BlogPostMeta } from "@/lib/blog"
import { BlogPostCard } from "@/components/blog/BlogPostCard"

type Props = { posts: BlogPostMeta[] }

export function TagFilter({ posts }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [query, setQuery] = useState("")

  const allTags = useMemo(() => {
    const set = new Set<string>()
    for (const p of posts) {
      for (const t of p.tags) set.add(t)
    }
    return Array.from(set).sort()
  }, [posts])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts.filter((p) => {
      const matchesQuery =
        q === "" ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      const matchesTag = activeTag === null || p.tags.includes(activeTag)
      return matchesQuery && matchesTag
    })
  }, [posts, query, activeTag])

  const toolbar: CSSProperties = {
    marginBottom: "28px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  }
  const inputStyle: CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    fontSize: "14px",
    fontFamily: "var(--font-sans)",
    background: "var(--bg)",
    border: "1px solid var(--ink)",
    borderRadius: 0,
    color: "var(--ink)",
    outline: "none",
  }
  const tagRow: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  }
  const grid: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
  }
  const empty: CSSProperties = {
    border: "var(--border-w) solid var(--ink)",
    boxShadow: "var(--shadow-sm)",
    padding: "32px 24px",
    fontFamily: "var(--font-mono)",
    fontSize: "13px",
    color: "var(--muted)",
    background: "var(--surface)",
  }

  function tagStyle(t: string): CSSProperties {
    const active = t === activeTag
    return {
      fontSize: "11px",
      fontWeight: 600,
      fontFamily: "var(--font-mono)",
      padding: "4px 10px",
      border: "1px solid var(--ink)",
      background: active ? "var(--accent)" : "var(--bg)",
      color: active ? "var(--accent-ink)" : "var(--ink)",
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      cursor: "pointer",
    }
  }

  return (
    <div>
      <div style={toolbar}>
        <input
          type="search"
          placeholder="글 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={inputStyle}
        />
        {allTags.length > 0 && (
          <div style={tagRow}>
            <button
              onClick={() => setActiveTag(null)}
              style={tagStyle("")}
              data-active={activeTag === null}
            >
              전체
            </button>
            {allTags.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTag(activeTag === t ? null : t)}
                style={tagStyle(t)}
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <p style={empty}>검색 결과가 없습니다.</p>
      ) : (
        <div style={grid}>
          {filtered.map((post, i) => (
            <BlogPostCard key={post.slug} post={post} index={i + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
