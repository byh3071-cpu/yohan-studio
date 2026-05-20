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
  problem: string
  solution: string
  stack: string[]
  learned: string
  year: string
  featured?: boolean
  github?: string
  demo?: string
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
    title: "노션 커스텀 대시보드",
    category: "Widget",
    summary: "Cursor → Vercel → Notion 임베드. 한 배포에 여러 위젯 레이어.",
    problem: "Notion 기본 위젯은 한정적이고 외부 임베드는 분산 관리가 번거롭다.",
    solution: "단일 Next 앱에 라우트별 위젯을 두고 임베드 URL 하나로 묶었다.",
    stack: ["Notion", "Vercel", "Next"],
    learned: "도메인 하나·앱 하나가 관리 비용을 가장 많이 절약한다.",
    year: "2026",
    demo: "https://notion-uiux.vercel.app",
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
