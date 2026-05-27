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

export type ShowroomFaqItem = {
  question: string
  answer: string
}

export type ShowroomProject = {
  slug: string
  title: string
  category: ShowroomCategory
  summary: string
  stack: string[]
  year: string
  dateCreated: string
  keywords: string[]
  /** 빌드로그·회고용 (기본 패턴). valueProps가 있으면 무시됨. */
  problem?: string
  solution?: string
  /** 상세 페이지 "결과" 섹션. 없으면 learned 사용. */
  result?: string
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
  faq?: ShowroomFaqItem[]
  relatedPosts?: string[]
}

export const showroomProjects: ShowroomProject[] = [
  {
    slug: "yohan-os",
    title: "요한 OS",
    category: "Notion OS",
    summary: "노션 기반 1인 운영체계. 실행 로그·리소스 DB·회고 루프.",
    problem: "할 일·자료·회고가 도구마다 흩어져 매주 같은 결정을 다시 했다.",
    solution: "Notion 하나에 Decision DB + Resource DB + Weekly Review를 묶고 템플릿화.",
    result: "주간 회고·의사결정 로그가 한 워크스페이스에 고정되어 반복 결정 시간이 줄었다.",
    stack: ["Notion", "Templates"],
    learned: "도구가 아니라 의사결정 루프가 시스템이다. 입력 양식을 좁히면 회고가 쉬워진다.",
    year: "2026",
    dateCreated: "2026-02-01",
    keywords: ["Notion", "1인 기업", "운영체계", "템플릿", "회고"],
    featured: true,
    relatedPosts: ["ai-brand-launch-story"],
    faq: [
      {
        question: "Notion 무료 플랜에서도 쓸 수 있나요?",
        answer:
          "핵심 DB·템플릿은 무료 플랜에서도 동작합니다. 자동화·연동이 많아지면 유료 플랜을 검토하면 됩니다.",
      },
      {
        question: "템플릿을 그대로 복제할 수 있나요?",
        answer:
          "구조는 공개 빌드로그에 정리되어 있습니다. 본인 워크스페이스에 맞게 필드명·뷰만 조정해 쓰면 됩니다.",
      },
    ],
  },
  {
    slug: "cafesi-os",
    title: "카페사이 OS",
    category: "Automation",
    summary: "Google Apps Script 기반 카페 운영 자동화.",
    problem: "매일 같은 시트 정리·근무표·재고 알림을 손으로 처리했다.",
    solution: "GAS로 시트 정리·Slack 알림·근무표 자동 배포 파이프라인 구축.",
    result: "반복 시트 작업이 트리거 기반으로 넘어가 일일 운영 시간이 줄었다.",
    stack: ["GAS", "Sheets", "Slack"],
    learned: "자동화 대상은 시간이 아니라 '반복하는 결정'을 찾아야 한다.",
    year: "2026",
    dateCreated: "2026-01-15",
    keywords: ["Google Apps Script", "자동화", "카페", "Slack", "Sheets"],
    faq: [
      {
        question: "Slack 없이도 동작하나요?",
        answer: "알림 채널만 바꾸면 이메일·시트 코멘트 등으로 대체할 수 있습니다.",
      },
    ],
  },
  {
    slug: "yohan-profile-card",
    title: "요한 프로필 카드",
    category: "Vibe Coding",
    summary: "Cursor 바이브코딩으로 만든 인터랙티브 프로필 카드.",
    problem: "이력서가 PDF 한 장으론 사람을 보여주지 못했다.",
    solution: "Next + Tailwind로 인터랙티브 카드 1개 — 30분 안에 MVP 배포.",
    result: "링크 하나로 모바일·데스크톱에서 동일한 인터랙션 프로필을 공유할 수 있다.",
    stack: ["Next", "Tailwind"],
    learned: "Vibe Coding은 '스펙을 줄이고 첫 화면을 빨리 띄우기' 게임이다.",
    year: "2026",
    dateCreated: "2026-03-10",
    keywords: ["Vibe Coding", "Next.js", "Tailwind", "포트폴리오", "Cursor"],
    demo: "https://yohan-profile-card.vercel.app",
    relatedPosts: ["vibe-coding-2hr-deploy"],
    faq: [
      {
        question: "소스 코드가 공개되어 있나요?",
        answer: "MVP는 배포 URL로 공유하며, 구조는 쇼룸·블로그 빌드로그에 정리합니다.",
      },
    ],
  },
  {
    slug: "focus-feed",
    title: "포커스 피드",
    category: "AI Workflow",
    summary: "유튜브 요약 기반 집중 피드 큐레이션.",
    problem: "유튜브 알고리즘이 집중을 흩었다. 요약본만 보고 결정하고 싶었다.",
    solution: "Whisper + LLM 요약 → 정적 피드 — 시청 전에 본문 5줄로 결정.",
    result: "시청 전 요약으로 '볼지 말지'를 먼저 결정하는 습관이 생겼다.",
    stack: ["LLM", "Whisper", "Next"],
    learned: "AI는 콘텐츠 생성보다 '필터'에 쓸 때 일상 효과가 크다.",
    year: "2026",
    dateCreated: "2026-04-01",
    keywords: ["AI", "Whisper", "요약", "유튜브", "Next.js"],
    demo: "https://youtube-summary-lac.vercel.app",
    faq: [
      {
        question: "실시간 스트리밍을 지원하나요?",
        answer: "v0는 업로드·URL 기반 배치 요약에 초점을 맞췄습니다.",
      },
    ],
  },
  {
    slug: "notion-uiux",
    title: "NotionUIUX",
    category: "Widget",
    summary: "노션에 임베드하는 픽셀·네온 톤 위젯 10종. 노션 대시보드를 본인 취향대로.",
    problem: "노션 기본 블록만으로는 대시보드가 단조롭고, 오프라인·커스텀 UI가 어렵다.",
    solution:
      "시계·캘린더·투두·메모·가계부·포모도로 등 10종 HTML 위젯을 Vercel에 호스팅하고 Notion embed로 연결.",
    result: "픽셀·네온 톤 대시보드와 offline 모드로 노션 안에서 일상 도구를 한 화면에 모았다.",
    stack: ["Notion", "Vercel", "HTML", "JS"],
    year: "2026",
    dateCreated: "2026-04-20",
    keywords: ["Notion", "Widget", "Embed", "오픈소스", "대시보드", "Vercel"],
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
    imageAlt: "NotionUIUX 위젯 미리보기 — 픽셀·네온 톤 노션 대시보드",
    relatedPosts: ["snapcontext-v013-store-journey", "ai-brand-launch-story"],
    faq: [
      {
        question: "노션에 어떻게 넣나요?",
        answer:
          "각 위젯의 embed URL을 복사해 Notion 페이지에 /embed 블록으로 붙이면 됩니다. manifest에 URL이 정리되어 있습니다.",
      },
      {
        question: "데이터는 어디에 저장되나요?",
        answer:
          "offline 모드는 브라우저 로컬 스토리지에만 저장합니다. 서버에 개인 데이터를 올리지 않습니다.",
      },
      {
        question: "상업적으로 사용해도 되나요?",
        answer: "저장소 LICENSE를 확인하세요. 오픈소스이며 포크·수정이 가능합니다.",
      },
    ],
  },
  {
    slug: "yohan-studio",
    title: "요한 스튜디오",
    category: "Build Log",
    summary: "이 웹사이트 자체. 블로그·포트폴리오·스토어·진단의 거점.",
    problem: "AI 시대 1인 기업가의 활동을 한 도메인에 묶을 거점이 없었다.",
    solution: "Next 16 + MDX + Vercel — Phase 1 랜딩 → 2 블로그/SEO → 3 결제.",
    result: "블로그·쇼룸·진단·스토어가 한 도메인에서 SEO/AEO 친화적으로 연결된다.",
    stack: ["Next", "TS", "MDX"],
    learned: "공개된 빌드로그 자체가 자산이다. 만들면서 쓰고, 쓰면서 팔린다.",
    year: "2026",
    dateCreated: "2026-05-01",
    keywords: ["Next.js", "MDX", "SEO", "1인 기업", "바이브코딩", "Vercel"],
    featured: true,
    demo: "https://yohan-studio.vercel.app",
    relatedPosts: ["ai-brand-launch-story", "vibe-coding-2hr-deploy", "hello-world"],
    faq: [
      {
        question: "이 사이트도 쇼룸에 올라가 있나요?",
        answer: "네. 메타 프로젝트로 빌드 과정·스택·Phase 로드맵을 이 페이지에서 확인할 수 있습니다.",
      },
    ],
  },
]
