import type { CSSProperties } from "react"

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

const nav: CSSProperties = { display: "flex", alignItems: "center", gap: "4px", flexWrap: "wrap", justifyContent: "flex-end" }

const link: CSSProperties = {
  padding: "8px 14px",
  fontSize: "14px",
  fontWeight: 600,
  color: "var(--ink)",
  borderLeft: "1px solid transparent",
  whiteSpace: "nowrap",
}

const linkActive: CSSProperties = { ...link, borderLeft: "2px solid var(--accent)" }

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

const links: { label: string; href: string; active?: boolean }[] = [
  { label: "홈", href: "#hero", active: true },
  { label: "블로그", href: "#blog" },
  { label: "포트폴리오", href: "#portfolio" },
  { label: "스토어", href: "#store" },
]

export function Header() {
  return (
    <header style={headerStyle}>
      <div style={inner}>
        <a href="#hero" style={logo}>
          <span>YOHAN</span>
          <span style={dot} />
          <span style={{ marginLeft: 8 }}>STUDIO</span>
        </a>
        <nav style={nav} aria-label="주요 메뉴">
          {links.map((l) => (
            <a key={l.label} href={l.href} style={l.active ? linkActive : link}>
              {l.label}
            </a>
          ))}
          <a href="#contact" style={{ ...cta, marginLeft: 12 }}>
            CONTACT →
          </a>
        </nav>
      </div>
    </header>
  )
}
