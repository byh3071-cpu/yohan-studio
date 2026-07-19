import type { CSSProperties } from "react"
import type { UpdateType } from "@/lib/updatesShared"

// 유형별 시각 위계: NEW(액센트 채움) > SECURITY(잉크 반전) > IMPROVED·FIXED(테두리).
// 다크모드는 --ink/--bg 토큰이 스스로 뒤집혀서 별도 분기 불필요.
const badgeColors: Record<UpdateType, CSSProperties> = {
  NEW: { background: "var(--accent)", color: "var(--accent-ink)" },
  SECURITY: { background: "var(--ink)", color: "var(--bg)" },
  IMPROVED: { background: "var(--bg)", color: "var(--ink)" },
  FIXED: { background: "var(--bg)", color: "var(--ink)" },
}

export function UpdateTypeBadge({ type }: { type: UpdateType }) {
  const style: CSSProperties = {
    display: "inline-block",
    fontSize: "10px",
    fontWeight: 700,
    fontFamily: "var(--font-mono)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: "2px 8px",
    border: "1px solid var(--line)",
    ...badgeColors[type],
  }
  return <span style={style}>{type}</span>
}
