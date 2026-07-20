import { BRAND_EMOJI, EMOJI_ACCENT, type EmojiConcept } from "@/data/emojiSet"

interface Props {
  /** 브랜드 이모지 개념 키 (result·question·idea·success·fail·tool·launch·security) */
  concept: EmojiConcept
  /** 크기 — 기본 1em(텍스트 높이에 맞춤) */
  size?: number | string
  className?: string
}

/**
 * 요한스튜디오 브랜드 이모지 (웹 solid) — 오렌지 단색 실루엣.
 * 사이트 오렌지 accent와 절제되게 어울리고, 라이트/다크 무관하게 오렌지 고정.
 * 본문 제목·카드 제목 등 텍스트 옆 인라인 사용. 외부 채널(네이버)은 chip PNG를 별도 사용.
 */
export function EmojiIcon({ concept, size = "1em", className }: Props) {
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
      style={{ verticalAlign: "-0.15em", display: "inline-block", flexShrink: 0 }}
    >
      {icon.paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  )
}
