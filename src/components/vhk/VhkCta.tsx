import type { CSSProperties } from "react"
import { CopyButton } from "./CopyButton"
import { VHK_INSTALL_CMD, VHK_LINKS } from "@/data/vhk"

const section: CSSProperties = {
  background: "#0A0A0A",
  color: "#F4F1EA",
  padding: "96px 24px",
  borderBottom: "var(--border-w) solid var(--line)",
}

const inner: CSSProperties = { maxWidth: "var(--max-w)", margin: "0 auto" }

const eyebrow: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#968D7E",
  marginBottom: "16px",
}

const title: CSSProperties = {
  fontSize: "clamp(32px, 5.5vw, 64px)",
  fontWeight: 800,
  lineHeight: 1.05,
  letterSpacing: "-0.03em",
  color: "#F4F1EA",
  marginBottom: "16px",
}

const accent: CSSProperties = { color: "#FF5C28" }

const lead: CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.65,
  color: "#DCD7CB",
  maxWidth: "540px",
  marginBottom: "40px",
}

const cmdBox: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  background: "#141414",
  border: "1.5px solid #1F1F1F",
  padding: "20px 24px",
  fontFamily: "var(--font-mono)",
  fontSize: "17px",
  fontWeight: 600,
  color: "#F4F1EA",
  boxShadow: "6px 6px 0 #FF5C28",
  marginBottom: "40px",
  flexWrap: "wrap",
  maxWidth: "640px",
}

const prompt: CSSProperties = { color: "#FF5C28" }

const cmdText: CSSProperties = { flex: 1, minWidth: 0, overflow: "auto", whiteSpace: "pre" }

const ctaRow: CSSProperties = { display: "flex", gap: "12px", flexWrap: "wrap" }

const btnPrimary: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "14px 22px",
  fontSize: "14px",
  fontWeight: 700,
  background: "#FF5C28",
  color: "#0A0A0A",
  border: "1.5px solid #FF5C28",
  textDecoration: "none",
  whiteSpace: "nowrap",
}

const btnGhost: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "14px 22px",
  fontSize: "14px",
  fontWeight: 700,
  background: "transparent",
  color: "#F4F1EA",
  border: "1.5px solid #968D7E",
  textDecoration: "none",
  whiteSpace: "nowrap",
}

const help: CSSProperties = {
  marginTop: "32px",
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  letterSpacing: "0.06em",
  color: "#968D7E",
}

export function VhkCta() {
  return (
    <section style={section}>
      <div style={inner}>
        <div style={eyebrow}>{"// 06 — INSTALL"}</div>
        <h2 style={title}>
          지금 <span style={accent}>시작</span>하세요.
        </h2>
        <p style={lead}>
          npm 한 줄이면 끝. 설치 후{" "}
          <code style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>vhk</code>
          만 치면 메뉴가 열린다. 아이디어부터{" "}
          <code style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>vhk gate</code>
          , 통과 후{" "}
          <code style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>vhk init</code>
          .
        </p>

        <div style={cmdBox}>
          <span style={prompt}>$</span>
          <span style={cmdText}>{VHK_INSTALL_CMD}</span>
          <CopyButton
            text={VHK_INSTALL_CMD}
            style={{
              background: "transparent",
              color: "#F4F1EA",
              borderColor: "#1F1F1F",
            }}
          />
        </div>

        <div style={ctaRow}>
          <a
            href={VHK_LINKS.github}
            target="_blank"
            rel="noreferrer noopener"
            style={btnPrimary}
          >
            ⭐ GitHub에서 스타 →
          </a>
          <a
            href={VHK_LINKS.npm}
            target="_blank"
            rel="noreferrer noopener"
            style={btnGhost}
          >
            npm
          </a>
          <a
            href={VHK_LINKS.disquiet}
            target="_blank"
            rel="noreferrer noopener"
            style={btnGhost}
          >
            디스콰이엇
          </a>
        </div>

        <p style={help}>
          💬 피드백은 GitHub Issues 또는 디스콰이엇 메이커 페이지로.
        </p>
      </div>
    </section>
  )
}
