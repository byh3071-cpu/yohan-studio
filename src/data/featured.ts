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

export const featuredProducts: FeaturedProduct[] = [
  { name: "요한 OS 노션 템플릿", desc: "개인 운영 시스템 풀 패키지", price: "₩29,000" },
  { name: "카페사이 OS", desc: "GAS 기반 카페 자동화 시스템", price: "₩49,000" },
  { name: "AI 프롬프트 킷", desc: "Cursor + Claude 실전 프롬프트 모음", price: "₩19,000" },
]
