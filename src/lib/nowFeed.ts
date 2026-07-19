import { getPublishedPosts } from "@/lib/blog"
import { getAllShowroomProjects } from "@/lib/showroom"
import { getLearningLogIndex } from "@/lib/notion"
import { getPublishedUpdates, PRODUCTS } from "@/lib/updates"

// 홈 "Now" 활동 피드 — 손으로 쓰는 콘텐츠가 아니라 기존 데이터 소스의 자동 집계.
// 새 소스는 어댑터 함수 하나 추가로 편입한다 (후보: 스토어 상품·오픈소스·디자인 히스토리).

export type NowItemKind = "release" | "post" | "showroom" | "learning"

export type NowItem = {
  kind: NowItemKind
  date: string // YYYY-MM-DD
  title: string
  href: string
}

export const NOW_KIND_LABELS: Record<NowItemKind, string> = {
  release: "릴리즈",
  post: "글",
  showroom: "쇼룸",
  learning: "배움",
}

const FEED_LIMIT = 7

function releaseItems(): NowItem[] {
  return getPublishedUpdates().map((u) => ({
    kind: "release",
    date: u.date,
    title: `${PRODUCTS[u.product]} v${u.version} — ${u.title}`,
    href: "/updates",
  }))
}

function postItems(): NowItem[] {
  return getPublishedPosts().map((p) => ({
    kind: "post",
    date: p.date,
    title: p.title,
    href: `/blog/${p.slug}`,
  }))
}

function showroomItems(): NowItem[] {
  return getAllShowroomProjects().map((p) => ({
    kind: "showroom",
    date: p.dateCreated,
    title: p.title,
    href: `/showroom/${p.slug}`,
  }))
}

// Notion 소스 — 키 부재·장애 시 getLearningLogIndex가 빈 배열을 반환하므로 피드는 조용히 축소된다.
// 노션 제목의 "[YYYY-MM-DD] " 접두는 피드 날짜 칼럼과 중복이라 걷어낸다.
async function learningItems(): Promise<NowItem[]> {
  const index = await getLearningLogIndex()
  return index.map((l) => ({
    kind: "learning",
    date: l.created.slice(0, 10),
    title: l.title.replace(/^\[\d{4}-\d{2}-\d{2}\]\s*/, ""),
    href: `/learning-log/${l.id}`,
  }))
}

export async function getNowFeed(): Promise<NowItem[]> {
  const items = [
    ...releaseItems(),
    ...postItems(),
    ...showroomItems(),
    ...(await learningItems()),
  ]
  return items
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
    .slice(0, FEED_LIMIT)
}
