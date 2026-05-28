// src/data/opensourceItems.ts

export const OPEN_SOURCE_BADGES = ["Free", "Open Source", "npm"] as const
export type OpenSourceBadge = (typeof OPEN_SOURCE_BADGES)[number]

export type OpenSourceItem = {
  slug: string
  title: string
  category: string
  summary: string
  badges: OpenSourceBadge[]
  valueProps: string[]
  stack: string[]
  year: string
  dateCreated: string
  keywords: string[]
  github?: string
  npm?: string
  demo?: string
  download?: string
}

export const opensourceItems: OpenSourceItem[] = [
  {
    slug: "notion-uiux-widgets",
    title: "NotionUIUX 위젯 10종",
    category: "Widget",
    summary:
      "노션에 임베드하는 픽셀·네온 톤 위젯 10종. 시계·캘린더·투두·메모·가계부·포모도로 등 일상 도구를 한 화면에.",
    badges: ["Free", "Open Source"],
    valueProps: [
      "시계·캘린더·투두·메모·가계부·포모도로 등 일상 도구 10종",
      "픽셀과 네온 톤으로 노션 다크모드에 자연스럽게 어울림",
      "offline 모드 지원 — 데이터는 본인 브라우저에만 저장",
      "오픈소스 — 복제·포크해서 본인 취향대로 자유롭게 수정",
    ],
    stack: ["Notion", "HTML", "JS", "Vercel"],
    year: "2026",
    dateCreated: "2026-04-20",
    keywords: ["Notion", "Widget", "Embed", "오픈소스", "대시보드"],
    github: "https://github.com/byh3071-cpu/notion-uiux-widgets",
    demo: "https://jealous-quilt-e0c.notion.site/36d540cd1ae18008824ef8c1610a2845",
  },
  {
    slug: "vhk-cli",
    title: "VHK CLI",
    category: "CLI",
    summary:
      "바이브 스타터 키트 — Next.js 16 + TypeScript + Tailwind 베이스를 한 명령으로 부트스트랩하는 오픈소스 CLI.",
    badges: ["Free", "Open Source", "npm"],
    valueProps: [
      "한 명령으로 Next.js 16 + TS + Tailwind 스택 부팅",
      "Editorial × Soft Brutalism 토큰·컴포넌트 프리셋 내장",
      "npx로 즉시 실행 — 글로벌 설치 불필요",
      "MIT 라이선스 — 상업·개인 프로젝트 모두 사용 가능",
    ],
    stack: ["Node", "TypeScript", "npm"],
    year: "2026",
    dateCreated: "2026-05-10",
    keywords: ["CLI", "npm", "Next.js", "스타터", "바이브코딩", "오픈소스"],
    github: "https://github.com/byh3071-cpu/vibe-starter-kit",
    npm: "https://www.npmjs.com/package/@byh3071/vhk",
  },
  {
    slug: "notion-mini-templates",
    title: "노션 미니 템플릿",
    category: "Template",
    summary:
      "1인 기업가의 주간 회고·할 일·자료 정리를 위한 미니 노션 템플릿 모음. 복제 즉시 사용 가능.",
    badges: ["Free"],
    valueProps: [
      "주간 회고·할 일·자료 정리 등 1인 운영 핵심 템플릿",
      "Notion 무료 플랜에서도 그대로 동작",
      "복제 즉시 사용 — 별도 설정·연동 불필요",
      "필드·뷰는 본인 워크플로우에 맞게 자유롭게 변형",
    ],
    stack: ["Notion", "Templates"],
    year: "2026",
    dateCreated: "2026-05-15",
    keywords: ["Notion", "Template", "1인 기업", "회고", "오픈소스"],
    download: "https://yohan-studio.vercel.app/open-source",
  },
]
