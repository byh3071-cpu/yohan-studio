import type { QaRoute } from "./types"

export const QA_ROUTES: QaRoute[] = [
  {
    path: "/",
    name: "Home",
    goal: "랜딩이 정상 렌더되고 주요 섹션/내비가 노출되는지 확인",
  },
  {
    path: "/blog",
    name: "Blog",
    goal: "발행된 MDX 글 목록이 카드/링크로 렌더되고 검색 input이 동작하는지 확인",
  },
  {
    path: "/showroom",
    name: "Showroom",
    goal: "프로젝트 쇼룸이 렌더되고 카드/필터가 노출되는지 확인",
  },
  {
    path: "/diagnosis",
    name: "Diagnosis",
    goal: "AI'm Scan 진단 폼이 렌더되는지 확인",
  },
  {
    path: "/services",
    name: "Services",
    goal: "서비스 카드/CTA가 정상 노출되는지 확인",
  },
  {
    path: "/design",
    name: "Design",
    goal: "디자인 시스템/로드맵 페이지가 렌더되는지 확인",
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    goal: "기존 /portfolio 라우트의 현재 상태 점검 (향후 /showroom 리다이렉트 대상)",
  },
]
