// src/data/showroomProjects.ts

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

export type ShowroomProject = {
  slug: string
  title: string
  category: ShowroomCategory
  summary: string
  stack: string[]
  year: string
  /** 빌드로그·회고용 (기본 패턴). valueProps가 있으면 무시됨. */
  problem?: string
  solution?: string
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
}

export const showroomProjects: ShowroomProject[] = [
  {
    slug: "yohan-os",
    title: "요한 OS",
    category: "Notion OS",
    summary: "노션 기반 1인 운영체계. 실행 로그·리소스 DB·회고 루프.",
    problem: "할 일·자료·회고가 도구마다 흩어져 매주 같은 결정을 다시 했다.",
    solution: "Notion 하나에 Decision DB + Resource DB + Weekly Review를 묶고 템플릿화.",
    stack: ["Notion", "Templates"],
    learned: "도구가 아니라 의사결정 루프가 시스템이다. 입력 양식을 좁히면 회고가 쉬워진다.",
    year: "2026",
    featured: true,
  },
  {
    slug: "cafesi-os",
    title: "카페사이 OS",
    category: "Automation",
    summary: "Google Apps Script 기반 카페 운영 자동화.",
    problem: "매일 같은 시트 정리·근무표·재고 알림을 손으로 처리했다.",
    solution: "GAS로 시트 정리·Slack 알림·근무표 자동 배포 파이프라인 구축.",
    stack: ["GAS", "Sheets", "Slack"],
    learned: "자동화 대상은 시간이 아니라 '반복하는 결정'을 찾아야 한다.",
    year: "2026",
  },
  {
    slug: "yohan-profile-card",
    title: "요한 프로필 카드",
    category: "Vibe Coding",
    summary: "Cursor 바이브코딩으로 만든 인터랙티브 프로필 카드.",
    problem: "이력서가 PDF 한 장으론 사람을 보여주지 못했다.",
    solution: "Next + Tailwind로 인터랙티브 카드 1개 — 30분 안에 MVP 배포.",
    stack: ["Next", "Tailwind"],
    learned: "Vibe Coding은 '스펙을 줄이고 첫 화면을 빨리 띄우기' 게임이다.",
    year: "2026",
    demo: "https://yohan-profile-card.vercel.app",
  },
  {
    slug: "focus-feed",
    title: "포커스 피드",
    category: "AI Workflow",
    summary: "유튜브 요약 기반 집중 피드 큐레이션.",
    problem: "유튜브 알고리즘이 집중을 흩었다. 요약본만 보고 결정하고 싶었다.",
    solution: "Whisper + LLM 요약 → 정적 피드 — 시청 전에 본문 5줄로 결정.",
    stack: ["LLM", "Whisper", "Next"],
    learned: "AI는 콘텐츠 생성보다 '필터'에 쓸 때 일상 효과가 크다.",
    year: "2026",
    demo: "https://youtube-summary-lac.vercel.app",
  },
  {
    slug: "notion-custom-dashboard",
    title: "NotionUIUX",
    category: "Widget",
    summary: "노션에 임베드하는 픽셀·네온 톤 위젯 10종. 노션 대시보드를 본인 취향대로.",
    stack: ["Notion", "Vercel", "HTML", "JS"],
    year: "2026",
    valueProps: [
      "시계·캘린더·투두·메모·가계부·포모도로 등 일상 도구 10종",
      "픽셀과 네온 톤으로 노션 다크모드에 자연스럽게 어울림",
      "offline 모드 지원 — 데이터는 본인 브라우저에만 저장",
      "오픈소스 — 복제·포크해서 본인 취향대로 자유롭게 수정",
    ],
    audience: "노션 대시보드를 더 풍성하게 만들고 싶은 사람",
    featured: true,
    github: "https://github.com/byh3071-cpu/NotionUIUX",
    demo: "https://jealous-quilt-e0c.notion.site/36d540cd1ae18008824ef8c1610a2845",
    image: "/showroom/notion-uiux/cover.png",
    imageAlt: "NotionUIUX 위젯 미리보기",
  },
  {
    slug: "yohan-studio",
    title: "요한 스튜디오",
    category: "Build Log",
    summary: "이 웹사이트 자체. 블로그·포트폴리오·스토어·진단의 거점.",
    problem: "AI 시대 1인 기업가의 활동을 한 도메인에 묶을 거점이 없었다.",
    solution: "Next 16 + MDX + Vercel — Phase 1 랜딩 → 2 블로그/SEO → 3 결제.",
    stack: ["Next", "TS", "MDX"],
    learned: "공개된 빌드로그 자체가 자산이다. 만들면서 쓰고, 쓰면서 팔린다.",
    year: "2026",
    featured: true,
    demo: "https://yohan-studio.vercel.app",
  },
]
