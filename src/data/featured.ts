export type FeaturedBlog = {
  date: string
  title: string
  excerpt: string
  tags: string[]
}

// 스토어 상품은 studio_products(DB)가 단일 소스다 — 하드코딩 금지 (2026-07-12 홈/스토어 불일치 사고 후 결정).
