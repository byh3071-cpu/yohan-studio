export type FeaturedBlog = {
  date: string
  title: string
  excerpt: string
  tags: string[]
}

export type FeaturedProduct = {
  name: string
  desc: string
  price: string
}

export const featuredBlogs: FeaturedBlog[] = [
  {
    date: "2026.04.10",
    title: "Cursor 30분으로 MVP 만든 후기",
    excerpt: "처음엔 반신반의했다. AI가 정말로 코드를 짜줄 수 있을까...",
    tags: ["Cursor", "Vibe"],
  },
  {
    date: "2026.03.22",
    title: "GAS로 카페 자동화한 방법",
    excerpt: "매일 반복하던 일을 자동화하는 데 걸린 시간은 이틀이었다.",
    tags: ["GAS", "Auto"],
  },
  {
    date: "2026.02.15",
    title: "노션으로 1인 기업 운영하기",
    excerpt: "생각을 정리하는 도구가 시스템이 됐다. 요한 OS 소개.",
    tags: ["Notion", "System"],
  },
]

export const featuredProducts: FeaturedProduct[] = [
  { name: "요한 OS 노션 템플릿", desc: "개인 운영 시스템 풀 패키지", price: "₩29,000" },
  { name: "카페사이 OS", desc: "GAS 기반 카페 자동화 시스템", price: "₩49,000" },
  { name: "AI 프롬프트 킷", desc: "Cursor + Claude 실전 프롬프트 모음", price: "₩19,000" },
]
