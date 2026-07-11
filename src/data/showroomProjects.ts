// src/data/showroomProjects.ts
//
// 쇼룸 도메인의 타입·상수만 보관한다. 실제 데이터(projects)는
// src/content/showroom/*.mdx 에 있고, src/lib/showroom.ts 가 파싱한다.
// (blog.ts ↔ src/content/blog 와 동일한 파일 기반 패턴)

export const SHOWROOM_CATEGORIES = [
  "Vibe Coding",
  "Notion OS",
  "Automation",
  "AI Workflow",
  "Widget",
  "Build Log",
  "Creative",
] as const

export type ShowroomCategory = (typeof SHOWROOM_CATEGORIES)[number]

export const SHOWROOM_KINDS = [
  "case-study",
  "product",
  "open-source",
  "build-log",
] as const
export type ShowroomKind = (typeof SHOWROOM_KINDS)[number]

export const SHOWROOM_STATUSES = [
  "operating",
  "shipped",
  "prototype",
  "archived",
] as const
export type ShowroomStatus = (typeof SHOWROOM_STATUSES)[number]

export const SHOWROOM_TIERS = ["flagship", "standard", "legacy"] as const
export type ShowroomTier = (typeof SHOWROOM_TIERS)[number]

export type ShowroomMetric = {
  label: string
  before?: string
  after: string
  basis: string
  verified: boolean
}

export type ShowroomDecision = {
  choice: string
  reason: string
  alternatives: string[]
  tradeoff: string
}

export type ShowroomEvidence = {
  type: "image" | "demo" | "source" | "document"
  label: string
  href?: string
  note?: string
}

export type ShowroomFaqItem = {
  question: string
  answer: string
}

export type ShowroomProject = {
  slug: string
  title: string
  category: ShowroomCategory
  summary: string
  stack: string[]
  year: string
  dateCreated: string
  keywords: string[]
  /** 빌드로그·회고용 (기본 패턴). valueProps가 있으면 무시됨. */
  problem?: string
  solution?: string
  /** 상세 페이지 "결과" 섹션. 없으면 learned 사용. */
  result?: string
  learned?: string
  /** 제품·서비스용 핵심 가치 bullet 리스트. 있으면 problem/solution/learned 대신 렌더. */
  valueProps?: string[]
  /** 누구를 위한 것 (선택, valueProps와 같이 씀). */
  audience?: string
  featured?: boolean
  github?: string
  demo?: string
  image?: string
  imageAlt?: string
  /** 히어로 데모 영상(mp4). image는 poster로 사용된다. */
  video?: string
  faq?: ShowroomFaqItem[]
  relatedPosts?: string[]
  /** 확장 사례 타입. 기존 항목은 legacy 기본값으로 파싱한다. */
  kind?: ShowroomKind
  status?: ShowroomStatus
  tier?: ShowroomTier
  role?: string
  duration?: string
  context?: string
  privacyNote?: string
  constraints?: string[]
  verification?: string[]
  limitations?: string[]
  nextSteps?: string[]
  metrics?: ShowroomMetric[]
  decisions?: ShowroomDecision[]
  evidence?: ShowroomEvidence[]
}
