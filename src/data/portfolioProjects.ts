export type PortfolioProject = {
  title: string
  desc: string
  tags: string[]
  year: string
}

export const portfolioProjects: PortfolioProject[] = [
  {
    title: "요한 프로필 카드",
    desc: "Cursor 바이브코딩으로 만든 인터랙티브 프로필 카드.",
    tags: ["Next", "Tailwind"],
    year: "2026",
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
  },
  {
    title: "플렉시블",
    desc: "자리 랜덤 배치 앱. 처음 만든 Cursor 결과물.",
    tags: ["Cursor", "MVP"],
    year: "2026",
  },
  {
    title: "노션 커스텀 대시보드",
    desc: "Cursor → Vercel 배포 → 노션 임베드.",
    tags: ["Notion", "Vercel"],
    year: "2026",
  },
  {
    title: "포커스 피드",
    desc: "집중을 위한 피드 큐레이션 도구.",
    tags: ["Vibe"],
    year: "2026",
  },
]
