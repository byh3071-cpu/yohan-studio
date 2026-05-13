import type { CSSProperties, ReactElement, ReactNode } from "react"
import { isValidElement } from "react"

type Props = {
  children?: ReactNode
  // Overrides when used directly as <CodeBlock lang="tsx" file="app/page.tsx">...</CodeBlock>
  lang?: string
  file?: string
}

type CodeChildProps = {
  className?: string
  children?: ReactNode
}

function extractLang(child: ReactNode): string {
  if (!isValidElement(child)) return ""
  const className = (child as ReactElement<CodeChildProps>).props.className ?? ""
  // Allow hyphen/plus/sharp so objective-c / c++ / f# 같은 lang도 정확히 잡힘.
  const match = /language-([\w+#-]+)/.exec(className)
  return match?.[1] ?? ""
}

const wrap: CSSProperties = {
  margin: "1.75rem 0",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow)",
  background: "#0a0a0a",
  overflow: "hidden",
}
const header: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px",
  padding: "10px 16px",
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#94a3b8",
  borderBottom: "1px solid #1f1f1f",
  background: "#0a0a0a",
}
const langTag: CSSProperties = { color: "var(--accent)" }
const fileTag: CSSProperties = { color: "#94a3b8", textTransform: "none", letterSpacing: 0 }
const pre: CSSProperties = {
  margin: 0,
  padding: "1.1rem 1.25rem",
  overflowX: "auto",
  fontFamily: "var(--font-mono)",
  fontSize: "0.85rem",
  lineHeight: 1.6,
  background: "#0a0a0a",
  color: "#f4f1ea",
  border: 0,
  boxShadow: "none",
}

export function CodeBlock({ children, lang: langProp, file }: Props) {
  const lang = langProp ?? extractLang(children)
  // When used as <pre>, children is <code>...</code>. When used as JSX with raw text,
  // wrap so the <pre> always contains a <code> for semantic correctness.
  const inner = isValidElement(children) ? children : <code>{children}</code>
  const hasHeader = Boolean(lang || file)
  return (
    <div style={wrap}>
      {hasHeader ? (
        <div style={header}>
          {lang ? <span style={langTag}>{`// ${lang}`}</span> : <span />}
          {file ? <span style={fileTag}>{file}</span> : null}
        </div>
      ) : null}
      <pre style={pre}>{inner}</pre>
    </div>
  )
}
