import type { CSSProperties } from "react"
import Link from "next/link"
import { SiteHeaderNav } from "@/components/layout/SiteHeaderNav"
import { ThemeToggle } from "@/components/layout/ThemeToggle"

const headerStyle: CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 50,
  background: "var(--bg)",
  borderBottom: "var(--border-w) solid var(--line)",
  height: "64px",
  display: "flex",
  alignItems: "center",
  padding: "0 var(--gutter)",
}

const inner: CSSProperties = {
  width: "100%",
  maxWidth: "var(--max-w)",
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}

const logo: CSSProperties = {
  fontFamily: "var(--font-en)",
  fontSize: "20px",
  fontWeight: 700,
  letterSpacing: "0.025em",
  color: "var(--ink)",
  whiteSpace: "nowrap",
  display: "inline-flex",
  alignItems: "center",
}

const dot: CSSProperties = {
  display: "inline-block",
  width: "10px",
  height: "10px",
  background: "var(--accent)",
  marginLeft: "4px",
  verticalAlign: "middle",
}

export function Header() {
  return (
    <header style={headerStyle}>
      <div style={inner}>
        <Link href="/" style={logo}>
          <span>YOHAN</span>
          <span style={dot} />
          <span style={{ marginLeft: 8 }}>STUDIO</span>
        </Link>
        <div
          className="site-header-actions"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", minWidth: 0 }}
        >
          <SiteHeaderNav />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
