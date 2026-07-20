// 요한스튜디오 브랜드 이모지 세트 (SoT)
// 유니코드 내장 이모지 대체 — 브랜드 톤(오렌지 #FF5C28) 커스텀 아이콘.
//
// 렌더 방식 2종:
//  - solid: 오렌지 단색 실루엣 (웹 본문·제목용 — 사이트 오렌지 accent와 절제되게 어울림)
//  - chip:  오렌지 원 + 디테일(라이트=검정/다크=흰) (네이버·외부 채널 — 흰 배경서 브랜드 각인)
//
// 아이콘 출처·라이선스 (상업·수정·재배포·공개 안전 — 감사용 기록):
export const EMOJI_LICENSE = {
  source: "Material Symbols (Google)",
  license: "Apache-2.0",
  url: "https://github.com/google/material-design-icons",
  note: "Apache-2.0 — 상업·수정·재배포 허용, 저작자표시 불요. Iconify(api.iconify.design)로 취득.",
} as const

export const EMOJI_ACCENT = "#FF5C28" as const

export interface BrandEmoji {
  /** 개념 키 (본문·마커에서 참조) */
  concept: string
  /** 한국어 라벨 */
  label: string
  /** 폴백 유니코드 (커스텀 미지원 환경) */
  unicode: string
  /** 출처 아이콘 ID (Iconify) */
  iconify: string
  /** SVG viewBox */
  viewBox: string
  /** SVG path d 목록 (단색 렌더용) */
  paths: string[]
}

export const BRAND_EMOJI = {
  result: {
    concept: "result",
    label: "결과",
    unicode: "📊",
    iconify: "material-symbols:bar-chart-4-bars",
    viewBox: "0 0 24 24",
    paths: ["M2 21v-2h20v2zm1-3v-7h3v7zm5 0V6h3v12zm5 0V9h3v9zm5 0V3h3v15z"],
  },
  question: {
    concept: "question",
    label: "질문",
    unicode: "❓",
    iconify: "material-symbols:help",
    viewBox: "0 0 24 24",
    paths: ["M12.838 17.638q.362-.363.362-.888t-.362-.888t-.888-.362t-.887.363t-.363.887t.363.888t.887.362t.888-.363M11.05 14.15h1.85q0-.825.188-1.3t1.062-1.3q.65-.65 1.025-1.238T15.55 8.9q0-1.4-1.025-2.15T12.1 6q-1.425 0-2.312.75T8.55 8.55l1.65.65q.125-.45.563-.975T12.1 7.7q.8 0 1.2.438t.4.962q0 .5-.3.938t-.75.812q-1.1.975-1.35 1.475t-.25 1.825M12 22q-2.075 0-3.9-.787t-3.175-2.138T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"],
  },
  idea: {
    concept: "idea",
    label: "아이디어",
    unicode: "💡",
    iconify: "material-symbols:lightbulb",
    viewBox: "0 0 24 24",
    paths: ["M10.588 21.413Q10 20.825 10 20h4q0 .825-.587 1.413T12 22t-1.412-.587M8 19v-2h8v2zm.25-3q-1.725-1.025-2.738-2.75T4.5 9.5q0-3.125 2.188-5.312T12 2t5.313 2.188T19.5 9.5q0 2.025-1.012 3.75T15.75 16z"],
  },
  success: {
    concept: "success",
    label: "성공",
    unicode: "✅",
    iconify: "material-symbols:task-alt",
    viewBox: "0 0 24 24",
    paths: ["M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2q1.625 0 3.075.475T17.75 3.8L16.3 5.275q-.95-.6-2.025-.937T12 4Q8.675 4 6.337 6.338T4 12t2.338 5.663T12 20t5.663-2.337T20 12q0-.45-.05-.9t-.15-.875L21.425 8.6q.275.8.425 1.65T22 12q0 2.075-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m-1.4-5.4l-4.25-4.25l1.4-1.4l2.85 2.85l10-10.025l1.4 1.4z"],
  },
  fail: {
    concept: "fail",
    label: "실패",
    unicode: "💥",
    iconify: "material-symbols:cancel",
    viewBox: "0 0 24 24",
    paths: ["m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"],
  },
  tool: {
    concept: "tool",
    label: "도구",
    unicode: "🛠️",
    iconify: "material-symbols:settings",
    viewBox: "0 0 24 24",
    paths: ["m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zm2.8-6.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5"],
  },
  launch: {
    concept: "launch",
    label: "출시",
    unicode: "🚀",
    iconify: "material-symbols:rocket",
    viewBox: "0 0 24 24",
    paths: ["M4 22v-5.925q0-.5.238-.95T4.9 14.4l1.1-.725q.175 2.1.55 3.575t1.175 3.275zm5.225-2q-.875-1.65-1.3-3.5T7.5 12.675q0-3.125 1.238-5.887T12 2.6q2.025 1.425 3.263 4.188t1.237 5.887q0 1.95-.425 3.788T14.775 20zm4.188-7.587Q14 11.825 14 11t-.587-1.412T12 9t-1.412.588T10 11t.588 1.413T12 13t1.413-.587M20 22l-3.725-1.475q.8-1.8 1.175-3.275t.55-3.575l1.1.725q.425.275.663.725t.237.95z"],
  },
  security: {
    concept: "security",
    label: "보안",
    unicode: "🛡️",
    iconify: "material-symbols:lock",
    viewBox: "0 0 24 24",
    paths: ["M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm7.413-5.587Q14 15.825 14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17t1.413-.587M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6z"],
  },
} satisfies Record<string, BrandEmoji>

export type EmojiConcept = keyof typeof BRAND_EMOJI

export const EMOJI_CONCEPTS = Object.keys(BRAND_EMOJI) as EmojiConcept[]
