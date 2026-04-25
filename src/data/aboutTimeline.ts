export type AboutTimelineItem = {
  date: string
  title: string
  desc: string
  active: boolean
}

export const aboutTimeline: AboutTimelineItem[] = [
  {
    date: "2025.04 — 2026.04",
    title: "카페사이 근무",
    desc: "서울 관악지역자활센터 청년 사업단 카페팀에서 바리스타로 일했다.",
    active: false,
  },
  {
    date: "2026.04",
    title: "카페 레이브 근무",
    desc: "자활센터 인턴 사업단 카페로 옮겨 계속 커피를 내리는 중.",
    active: false,
  },
  {
    date: "2025.12 — 현재",
    title: "AI · 노션 · 자동화 독학",
    desc: "노션으로 생각을 정리하고, AI 도구로 반복을 자동화하기 시작했다.",
    active: false,
  },
  {
    date: "2025.12",
    title: "도파민 러너 첫 MVP",
    desc: "HTML5로 만든 첫 바이브코딩 결과물. 작고 단순한 게임.",
    active: false,
  },
  {
    date: "2026.01",
    title: "Cursor 첫 MVP — 플렉시블",
    desc: "자리 랜덤 배치 앱. 처음 만든 Cursor 바이브코딩 결과물.",
    active: false,
  },
  {
    date: "2026.02",
    title: "노션 커스텀 대시보드",
    desc: "Cursor로 만들고 Vercel에 배포 → 노션에 임베드.",
    active: false,
  },
  {
    date: "2026.04 — 현재",
    title: "요한 스튜디오 + 요한 OS 구축",
    desc: "블로그·포트폴리오·스토어 거점, 그리고 개인 운영 시스템 동시 구축 중.",
    active: true,
  },
]
