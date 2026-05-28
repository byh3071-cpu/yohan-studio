"use client"

import Link from "next/link"
import type { CSSProperties, MouseEvent } from "react"

import type { SearchDocument } from "@/lib/search"

const item: CSSProperties = {
  display: "block",
  textDecoration: "none",
  color: "var(--ink)",
  padding: "14px 16px",
  borderBottom: "1px solid var(--line)",
  background: "var(--bg)",
  cursor: "pointer",
}

const itemActive: CSSProperties = {
  background: "var(--accent)",
  color: "var(--accent-ink)",
}

const top: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  marginBottom: "4px",
}

const badge: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "10px",
  fontWeight: 800,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  padding: "2px 6px",
  border: "1px solid currentColor",
}

const title: CSSProperties = {
  fontSize: "15px",
  fontWeight: 700,
  lineHeight: 1.3,
  margin: 0,
  letterSpacing: "-0.01em",
}

const desc: CSSProperties = {
  fontSize: "12px",
  lineHeight: 1.5,
  margin: "4px 0 0",
  color: "var(--muted)",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
}

const descActive: CSSProperties = { ...desc, color: "var(--accent-ink)" }

export function SearchResult({
  doc,
  active,
  onSelect,
  onHover,
}: {
  doc: SearchDocument
  active: boolean
  onSelect: () => void
  onHover: () => void
}) {
  const style: CSSProperties = active ? { ...item, ...itemActive } : item

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // 부모 모달이 onSelect를 통해 라우팅·닫기 처리
    e.preventDefault()
    onSelect()
  }

  return (
    <Link
      href={doc.url}
      style={style}
      onMouseEnter={onHover}
      onClick={handleClick}
      data-search-kind={doc.kind}
    >
      <div style={top}>
        <h4 style={title}>{doc.title}</h4>
        <span style={badge}>{doc.badge}</span>
      </div>
      {doc.description && <p style={active ? descActive : desc}>{doc.description}</p>}
    </Link>
  )
}
