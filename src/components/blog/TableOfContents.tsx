"use client"

import type { CSSProperties } from "react"
import { useEffect, useState, useSyncExternalStore } from "react"

type TocItem = { id: string; text: string; level: 2 | 3 }
const EMPTY_ITEMS: TocItem[] = []

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w가-힣\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

// 같은 article DOM에 대한 결과를 캐싱해 useSyncExternalStore가 안정된 참조를 반환하도록 한다.
// MutationObserver가 DOM 변화를 감지하면 캐시를 무효화한다.
const tocCache = new WeakMap<Element, TocItem[]>()

function getTocSnapshot(): TocItem[] {
  if (typeof document === "undefined") return EMPTY_ITEMS
  const article = document.querySelector(".mdx-content")
  if (!article) return EMPTY_ITEMS
  const cached = tocCache.get(article)
  if (cached) return cached

  const headings = Array.from(article.querySelectorAll<HTMLHeadingElement>("h2, h3"))
  const collected: TocItem[] = []
  const usedIds = new Set<string>()
  for (const el of headings) {
    const text = el.textContent?.trim() ?? ""
    if (!text) continue
    let id = el.id || slugify(text)
    let n = 2
    while (usedIds.has(id)) {
      id = `${slugify(text)}-${n++}`
    }
    usedIds.add(id)
    // id 부여는 멱등(idempotent)이라 strict mode의 더블 렌더에도 안전.
    el.id = id
    collected.push({ id, text, level: el.tagName === "H2" ? 2 : 3 })
  }
  tocCache.set(article, collected)
  return collected
}

function subscribeToc(callback: () => void): () => void {
  const article = document.querySelector(".mdx-content")
  if (!article) return () => {}
  const observer = new MutationObserver(() => {
    tocCache.delete(article)
    callback()
  })
  observer.observe(article, { childList: true, subtree: true, characterData: true })
  return () => observer.disconnect()
}

function getTocServerSnapshot(): TocItem[] {
  return EMPTY_ITEMS
}

const nav: CSSProperties = {
  position: "sticky",
  top: "88px",
  alignSelf: "start",
  width: "220px",
  maxHeight: "calc(100vh - 120px)",
  overflowY: "auto",
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
}
const title: CSSProperties = {
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: "16px",
  paddingBottom: "10px",
  borderBottom: "1px solid var(--line)",
}
const list: CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "8px",
}

function liStyle(level: 2 | 3): CSSProperties {
  return {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    paddingLeft: level === 3 ? "14px" : "0",
  }
}
function dotStyle(active: boolean): CSSProperties {
  return {
    display: "inline-block",
    width: active ? "8px" : "5px",
    height: active ? "8px" : "5px",
    background: active ? "var(--accent)" : "var(--muted-2)",
    flexShrink: 0,
    transition: "all 120ms ease",
  }
}
function linkStyle(active: boolean): CSSProperties {
  return {
    fontWeight: active ? 700 : 500,
    color: active ? "var(--ink)" : "var(--muted)",
    textDecoration: "none",
    lineHeight: 1.45,
    transition: "color 120ms ease",
  }
}

export function TableOfContents() {
  const items = useSyncExternalStore(subscribeToc, getTocSnapshot, getTocServerSnapshot)
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    if (items.length === 0) return
    const article = document.querySelector(".mdx-content")
    if (!article) return
    const headings = Array.from(article.querySelectorAll<HTMLHeadingElement>("h2, h3"))
    const io = new IntersectionObserver(
      (entries) => {
        // 콜백에서의 setState는 외부 이벤트 응답이라 react-hooks/set-state-in-effect 위반이 아니다.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: "-88px 0px -70% 0px", threshold: 0 },
    )
    for (const el of headings) io.observe(el)
    return () => io.disconnect()
  }, [items])

  if (items.length === 0) return null
  return (
    <nav className="post-toc" style={nav} aria-label="이 글의 목차">
      <div style={title}>{"// CONTENTS"}</div>
      <ul style={list}>
        {items.map((it) => (
          <li key={it.id} style={liStyle(it.level)}>
            <span style={dotStyle(activeId === it.id)} aria-hidden />
            <a href={`#${it.id}`} style={linkStyle(activeId === it.id)}>
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
