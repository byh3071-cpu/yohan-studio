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
  faq?: ShowroomFaqItem[]
  relatedPosts?: string[]
}
