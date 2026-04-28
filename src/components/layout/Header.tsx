import type { CSSProperties } from "react"
import { Suspense } from "react"
import Link from "next/link"
import { SiteHeaderNav } from "@/components/layout/SiteHeaderNav"

const headerStyle: CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 50,
  background: "var(--bg)",
  borderBottom: "var(--border-w) solid var(--ink)",
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
  fontSize: "20px",
  fontWeight: 800,
  letterSpacing: "-0.03em",
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
        <Suspense fallback={null}>
          <SiteHeaderNav />
        </Suspense>
      </div>
    </header>
  )
}
