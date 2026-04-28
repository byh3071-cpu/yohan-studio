"use client"

import type { CSSProperties } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const nav: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "4px",
  flexWrap: "wrap",
  justifyContent: "flex-end",
}

const linkBase: CSSProperties = {
  padding: "8px 14px",
  fontSize: "14px",
  fontWeight: 600,
  color: "var(--ink)",
  borderLeft: "1px solid transparent",
  whiteSpace: "nowrap",
}

const cta: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "8px 14px",
  fontSize: "13px",
  fontWeight: 700,
  background: "var(--accent)",
  color: "var(--accent-ink)",
  border: "var(--border-w) solid var(--ink)",
  boxShadow: "var(--shadow-sm)",
  whiteSpace: "nowrap",
}

const entries: { label: string; href: string; match: (p: string) => boolean }[] = [
  { label: "홈", href: "/", match: (p) => p === "/" },
  { label: "블로그", href: "/blog", match: (p) => p === "/blog" || p.startsWith("/blog/") },
  { label: "포트폴리오", href: "/portfolio", match: (p) => p === "/portfolio" },
  { label: "스토어", href: "/#store", match: () => false },
]

export function SiteHeaderNav() {
  const pathname = usePathname() ?? "/"

  return (
    <nav style={nav} aria-label="주요 메뉴">
      {entries.map((e) => {
        const active = e.match(pathname)
        const link: CSSProperties = active
          ? { ...linkBase, borderLeft: "2px solid var(--accent)" }
          : linkBase
        return (
          <Link key={e.label} href={e.href} style={link}>
            {e.label}
          </Link>
        )
      })}
      <Link href="/#contact" style={{ ...cta, marginLeft: 12 }}>
        CONTACT →
      </Link>
    </nav>
  )
}
