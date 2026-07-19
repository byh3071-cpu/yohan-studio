// 클라이언트 컴포넌트(UpdatesFeed 등)도 쓰는 상수·타입.
// updates.ts(fs 의존)와 분리해 클라이언트 번들에 node 모듈이 딸려가지 않게 한다.

// 제품 화이트리스트. 표시명·필터 칩이 전부 여기서 파생된다.
export const PRODUCTS = {
  snapcontext: "SnapContext",
  vhk: "VHK",
} as const

export type ProductId = keyof typeof PRODUCTS

export const UPDATE_TYPES = ["NEW", "IMPROVED", "FIXED", "SECURITY"] as const

export type UpdateType = (typeof UPDATE_TYPES)[number]

export type UpdateFrontmatter = {
  product: ProductId
  version: string
  date: string
  title: string
  types: UpdateType[]
  blogSlug?: string
  published: boolean
}

export type UpdateEntryMeta = UpdateFrontmatter & { slug: string }
