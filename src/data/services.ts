export type Service = {
  slug: "scan-report" | "os-template" | "os-build"
  name: string
  tagline: string
  audience: string
  deliverables: string[]
  priceRange: string
  priceMin: number
  priceMax: number
  durationDays: string
  ctaLabel: string
  featured?: boolean
}

export const services: Service[] = [
  {
    slug: "scan-report",
    name: "A'Im Scan Report",
    tagline: "21문항 진단 결과를 깊이 분석한 1:1 리포트.",
    audience: "A'Im Scan을 풀었지만 '뭘 먼저 손대야 할지'가 막힌 1인 기업가.",
    deliverables: [
      "영역별 진단 결과 분석 PDF (8~12p)",
      "TOP3 약점에 대한 30일 실행 처방",
      "추천 도구·템플릿·레퍼런스 목록",
      "30분 음성 코멘트 (선택)",
    ],
    priceRange: "49,000 ~ 99,000원",
    priceMin: 49000,
    priceMax: 99000,
    durationDays: "3~5영업일",
    ctaLabel: "리포트 신청",
  },
  {
    slug: "os-template",
    name: "A'Im OS Template",
    tagline: "1인 기업 운영체계 노션 템플릿 풀 패키지.",
    audience: "처음부터 다시 만들 시간이 없는데 검증된 구조가 필요한 사람.",
    deliverables: [
      "Decision DB · Resource DB · Weekly Review 템플릿",
      "AI 프롬프트 라이브러리 (Cursor / Claude / GPT)",
      "셋업 가이드 영상 (20분)",
      "업데이트 평생 권한",
    ],
    priceRange: "19,000 ~ 49,000원",
    priceMin: 19000,
    priceMax: 49000,
    durationDays: "즉시",
    ctaLabel: "템플릿 받기",
    featured: true,
  },
  {
    slug: "os-build",
    name: "A'Im OS Build",
    tagline: "1인 기업 OS를 함께 설계·구축하는 코칭 프로그램.",
    audience: "리포트·템플릿만으론 부족하고 직접 같이 만들 파트너가 필요한 사람.",
    deliverables: [
      "킥오프 90분 + 주간 1:1 60분 × 4회",
      "맞춤형 Notion OS + 자동화 구축",
      "AI 워크플로우 1~3개 셋업",
      "끝난 후 30일 슬랙 Q&A 액세스",
    ],
    priceRange: "290,000 ~ 590,000원",
    priceMin: 290000,
    priceMax: 590000,
    durationDays: "4주",
    ctaLabel: "프로그램 문의",
  },
]
