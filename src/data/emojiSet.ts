// 요한스튜디오 브랜드 이모지 세트 — 유니코드 내장 이모지 대체.
//
// 데이터 SoT는 `emojiSet.json`이다. 웹(EmojiIcon)과 PNG 생성기(scripts/gen-emoji.mjs)가
// 같은 파일을 읽는다 — 예전처럼 매핑을 양쪽에 이중으로 두면 한쪽만 바뀌는 사고가 난다.
//
// 색: 웹·외부 채널 모두 오렌지 #FF5C28 고정 (요한 확정 2026-07-21).
// 렌더: 웹은 이 파일의 path로 SVG 직접 렌더, 외부 채널(네이버)은 `<개념>-solid.png`.
//       네이버는 인라인 style을 제거하고 이미지를 baseline에 고정하므로 SVG를 못 쓴다.
import data from "./emojiSet.json"

export const EMOJI_ACCENT = data.accent

/** 아이콘 출처·라이선스 (감사용 기록) */
export const EMOJI_LICENSE = data.licenses

export interface BrandEmoji {
  /** 개념 키 (본문·마커에서 참조) */
  concept: string
  /** 한국어 라벨 */
  label: string
  /** 대응 유니코드 이모지 — 원고(.md)에는 이걸 쓰고 변환기가 치환한다 */
  unicode: string
  /** 출처 (아이콘 세트 ID 또는 자체 제작 표기) */
  source: string
  /** SVG viewBox */
  viewBox: string
  /** SVG path d 목록 */
  paths: string[]
  /**
   * 구멍(눈·입 등)을 evenodd로 뚫는 아이콘만 지정.
   * 기성 세트는 nonzero 기준으로 그려져 있어 전역 적용하면 오히려 형태가 깨진다.
   */
  fillRule?: "evenodd"
}

// JSON import는 fillRule을 넓은 string으로 추론한다 — 리터럴 유니온으로 좁힌다.
export const BRAND_EMOJI = data.emoji as unknown as Record<string, BrandEmoji>

export type EmojiConcept = keyof typeof data.emoji

export const EMOJI_CONCEPTS = Object.keys(BRAND_EMOJI) as EmojiConcept[]

/** 유니코드 → 개념 키 (변환기·마이그레이션용) */
export const UNICODE_TO_CONCEPT: Record<string, EmojiConcept> = Object.fromEntries(
  EMOJI_CONCEPTS.map((k) => [BRAND_EMOJI[k].unicode, k]),
) as Record<string, EmojiConcept>
