"use client"

import type { CSSProperties } from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const linkBase: CSSProperties = {
  padding: "8px 14px",
  fontSize: "14px",
  fontWeight: 600,
  color: "var(--ink)",
  borderLeft: "1px solid transparent",
  whiteSpace: "nowrap",
}

// Layout (display/flex/gap) lives in globals.css so breakpoints can switch
// primary links and the hamburger panel without inline-style specificity issues.
const hamburgerBtn: CSSProperties = {
  background: "transparent",
  border: "var(--border-w) solid var(--line)",
  width: "36px",
  height: "36px",
  padding: 0,
  marginRight: "4px",
}

const hamburgerBar: CSSProperties = {
  display: "block",
  width: "16px",
  height: "1.5px",
  background: "var(--ink)",
}

type NavEntry = { label: string; href: string; match: (p: string) => boolean }

const primaryEntries: NavEntry[] = [
  { label: "블로그", href: "/blog", match: (p) => p === "/blog" || p.startsWith("/blog/") },
  { label: "쇼룸", href: "/showroom", match: (p) => p === "/showroom" },
  { label: "진단", href: "/diagnosis", match: (p) => p === "/diagnosis" },
  { label: "서비스", href: "/services", match: (p) => p === "/services" },
  { label: "스토어", href: "/#store", match: () => false },
]

const auxiliaryEntries: NavEntry[] = [
  { label: "디자인", href: "/design", match: (p) => p === "/design" },
]

export function SiteHeaderNav() {
  const pathname = usePathname() ?? "/"
  const [open, setOpen] = useState(false)
  const [prevPath, setPrevPath] = useState(pathname)

  // 라우트 변경 시 자동으로 메뉴 닫기. React 공식 가이드의 "render 중 setState로 props 동기화" 패턴이라
  // useEffect 안의 setState로 처리할 때 발생하는 react-hooks/set-state-in-effect 경고를 피한다.
  if (pathname !== prevPath) {
    setPrevPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <>
      <nav className="site-header-primary" aria-label="주요 메뉴">
        {primaryEntries.map((e) => {
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
      </nav>
      <button
        type="button"
        className="nav-hamburger"
        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={open}
        aria-controls="site-header-menu"
        onClick={() => setOpen((v) => !v)}
        style={hamburgerBtn}
      >
        <span style={hamburgerBar} />
        <span style={hamburgerBar} />
        <span style={hamburgerBar} />
      </button>
      <nav
        id="site-header-menu"
        className={`site-header-menu${open ? " is-open" : ""}`}
        aria-label="전체 메뉴"
      >
        <div className="site-header-menu-group">
          {primaryEntries.map((e) => {
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
        </div>
        <div className="site-header-menu-divider" role="separator" />
        <div className="site-header-menu-group">
          {auxiliaryEntries.map((e) => {
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
        </div>
      </nav>
    </>
  )
}
