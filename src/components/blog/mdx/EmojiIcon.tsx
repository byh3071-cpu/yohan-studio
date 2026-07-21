import { BRAND_EMOJI, EMOJI_ACCENT, type EmojiConcept } from "@/data/emojiSet"

interface Props {
  /** 브랜드 이모지 개념 키 (result·question·idea·success·fail·tool·launch·security·warning·learn·bug·ai·growth·time·summer·winter·spring·autumn) */
  concept: EmojiConcept
  /** 크기 — 기본 1.25em (16px 본문 옆에서 1em·1.1em은 시각적으로 작아 광학 보정) */
  size?: number | string
  className?: string
}

/**
 * 요한스튜디오 브랜드 이모지 — 오렌지 단색 실루엣.
 * 라이트/다크 무관하게 오렌지 고정(요한 확정 2026-07-21).
 * 외부 채널(네이버)은 같은 형태의 `<개념>-solid.png`를 쓴다 — 거긴 SVG·style이 안 먹는다.
 */
export function EmojiIcon({ concept, size = "1.25em", className }: Props) {
  const icon = BRAND_EMOJI[concept]
  if (!icon) return null
  return (
    <svg
      viewBox={icon.viewBox}
      width={size}
      height={size}
      fill={EMOJI_ACCENT}
      role="img"
      aria-label={icon.label}
      className={className}
      style={{
        verticalAlign: "-0.17em",
        display: "inline-block",
        flexShrink: 0,
        // 텍스트 앞에 붙는 게 기본 용법 — 붙어버리지 않게 최소 여백
        marginRight: "0.28em",
      }}
    >
      {icon.paths.map((d, i) => (
        // 기성 세트는 nonzero로 그려져 있어 전역 evenodd를 걸면 형태가 깨진다.
        // 구멍을 evenodd로 뚫는 아이콘(자체 제작분)만 개별 지정한다.
        <path key={i} d={d} fillRule={icon.fillRule} />
      ))}
    </svg>
  )
}
