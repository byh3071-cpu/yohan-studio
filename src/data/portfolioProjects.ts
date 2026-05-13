export type PortfolioProject = {
  title: string
  desc: string
  tags: string[]
  year: string
  github?: string
  demo?: string
}

export const portfolioProjects: PortfolioProject[] = [
  {
    title: "요한 프로필 카드",
    desc: "Cursor 바이브코딩으로 만든 인터랙티브 프로필 카드.",
    tags: ["Next", "Tailwind"],
    year: "2026",
    demo: "https://yohan-profile-card.vercel.app",
  },
  {
    title: "사전 뷰어",
    desc: "검증 우선 AI 용어 사전. Astro Starlight 정적 사이트.",
    tags: ["Astro", "MDX"],
    year: "2026",
  },
  {
    title: "요한 OS",
    desc: "노션 기반 개인 운영 시스템. 실행 로그·리소스 DB·회고.",
    tags: ["Notion"],
    year: "2026",
  },
  {
    title: "카페사이 OS",
    desc: "Google Apps Script 기반 카페 운영 자동화 시스템.",
    tags: ["GAS", "Auto"],
    year: "2026",
  },
  {
    title: "요한 스튜디오",
    desc: "이 웹사이트 자체. 블로그·포트폴리오·스토어 거점.",
    tags: ["Next", "TS"],
    year: "2026",
    demo: "https://yohan-studio.vercel.app",
  },
  {
    // 데모 URL(flexible-nine.vercel.app)에 실제 카페 근무자 명단이 노출되어 있어
    // 익명화 재배포 전까지는 demo 링크를 비워둔다.
    title: "플렉시블",
    desc: "자리 랜덤 배치 앱. 처음 만든 Cursor 결과물.",
    tags: ["Cursor", "MVP"],
    year: "2026",
  },
  {
    title: "노션 커스텀 대시보드",
    desc: "Cursor → Vercel 배포 → 노션 임베드. 여러 레이어가 한 배포에 모여 임베드별로 분리.",
    tags: ["Notion", "Vercel"],
    year: "2026",
    demo: "https://notion-uiux.vercel.app",
  },
  {
    title: "포커스 피드",
    desc: "유튜브 요약 기반 집중 피드 큐레이션 도구.",
    tags: ["Vibe"],
    year: "2026",
    demo: "https://youtube-summary-lac.vercel.app",
  },
]
