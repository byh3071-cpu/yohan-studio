"use client"

import { useCallback, useMemo } from "react"
import type { CSSProperties } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { BlogRowCard } from "@/components/blog/BlogRowCard"
import type { BlogPostMeta } from "@/lib/blog"

type Props = { posts: BlogPostMeta[] }

// Compose a new querystring with one key changed (or cleared when value is null/empty).
function withParam(current: URLSearchParams, key: string, value: string | null): string {
  const next = new URLSearchParams(current)
  if (value && value.length > 0) next.set(key, value)
  else next.delete(key)
  const s = next.toString()
  return s ? `?${s}` : ""
}

export function TagFilter({ posts }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const query = searchParams.get("q") ?? ""
  const activeTag = searchParams.get("tag")

  const allTags = useMemo(() => {
    const set = new Set<string>()
    for (const p of posts) for (const t of p.tags) set.add(t)
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

  const onQueryChange = useCallback(
    (next: string) => {
      const qs = withParam(searchParams, "q", next || null)
      router.replace(`${pathname}${qs}`, { scroll: false })
    },
    [pathname, router, searchParams],
  )

  const onTagClick = useCallback(
    (tag: string | null) => {
      const next = activeTag === tag ? null : tag
      const qs = withParam(searchParams, "tag", next)
      router.replace(`${pathname}${qs}`, { scroll: false })
    },
    [activeTag, pathname, router, searchParams],
  )

  const toolbar: CSSProperties = {
    marginBottom: "32px",
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
    border: "var(--border-w) solid var(--line)",
    borderRadius: 0,
    color: "var(--ink)",
    outline: "none",
  }
  const tagRow: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  }
  const list: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  }
  const empty: CSSProperties = {
    border: "var(--border-w) solid var(--line)",
    boxShadow: "var(--shadow-sm)",
    padding: "32px 24px",
    fontFamily: "var(--font-mono)",
    fontSize: "13px",
    color: "var(--muted)",
    background: "var(--surface)",
    textAlign: "center",
  }

  function tagStyle(t: string | null): CSSProperties {
    const active = t === activeTag
    return {
      fontSize: "11px",
      fontWeight: 600,
      fontFamily: "var(--font-mono)",
      padding: "5px 12px",
      border: "1px solid var(--line)",
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
          placeholder="글 검색…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          style={inputStyle}
          aria-label="블로그 글 검색"
        />
        {allTags.length > 0 && (
          <div style={tagRow}>
            <button
              type="button"
              onClick={() => onTagClick(null)}
              style={tagStyle(null)}
            >
              전체
            </button>
            {allTags.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onTagClick(t)}
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
        <div style={list}>
          {filtered.map((post) => (
            <BlogRowCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
