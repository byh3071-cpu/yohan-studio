// src/data/aimScanQuestions.ts

export const AREAS = [
  "Direction",
  "Strategy",
  "Structure",
  "Monetize",
  "Prompt",
  "Design",
  "Decision",
] as const

export type Area = (typeof AREAS)[number]

export const AREA_LABELS_KO: Record<Area, string> = {
  Direction: "방향 (Direction)",
  Strategy: "전략 (Strategy)",
  Structure: "구조 (Structure)",
  Monetize: "수익화 (Monetize)",
  Prompt: "프롬프트 (Prompt)",
  Design: "디자인 (Design)",
  Decision: "의사결정 (Decision)",
}

export const AREA_DESC: Record<Area, string> = {
  Direction: "내가 누구를 위해 무엇을 만드는지 한 문장으로 말할 수 있는가.",
  Strategy: "다음 3개월의 우선순위가 1~3개로 좁혀져 있는가.",
  Structure: "할 일·자료·회고가 한 시스템 안에 묶여 있는가.",
  Monetize: "현재 수익 가설이 1개 이상 검증되었는가.",
  Prompt: "AI에게 일을 시키는 일관된 프롬프트 패턴이 있는가.",
  Design: "결과물에 일관된 시각·언어 톤이 있는가.",
  Decision: "주간 단위로 결정·재결정 루프가 돌아가는가.",
}

export type ScanQuestion = {
  id: string
  area: Area
  text: string
}

export const SCAN_QUESTIONS: ScanQuestion[] = [
  { id: "direction-1", area: "Direction", text: "내가 도와주는 사람 한 명을 구체적으로 말할 수 있다." },
  { id: "direction-2", area: "Direction", text: "내 제품/서비스가 해결하는 문제를 한 문장으로 쓸 수 있다." },
  { id: "direction-3", area: "Direction", text: "내가 안 만들 것의 리스트가 있다." },
  { id: "strategy-1", area: "Strategy", text: "이번 분기에 집중할 1~3가지 목표가 적혀 있다." },
  { id: "strategy-2", area: "Strategy", text: "매주 무엇을 멈출지 결정한다." },
  { id: "strategy-3", area: "Strategy", text: "성공/실패 신호를 사전에 정의했다." },
  { id: "structure-1", area: "Structure", text: "할 일·자료·회고가 한 도구 안에 모여 있다." },
  { id: "structure-2", area: "Structure", text: "반복 작업은 템플릿/자동화로 처리한다." },
  { id: "structure-3", area: "Structure", text: "회고 → 다음 주 계획 루프가 자동으로 돈다." },
  { id: "monetize-1", area: "Monetize", text: "유료 고객이 한 명 이상 있다 (또는 명확한 1번 고객)." },
  { id: "monetize-2", area: "Monetize", text: "가격 책정 근거를 설명할 수 있다." },
  { id: "monetize-3", area: "Monetize", text: "다음 수익 가설이 글로 적혀 있다." },
  { id: "prompt-1", area: "Prompt", text: "AI에게 일을 시킬 때 쓰는 표준 프롬프트가 있다." },
  { id: "prompt-2", area: "Prompt", text: "AI 결과물을 검수하는 체크리스트가 있다." },
  { id: "prompt-3", area: "Prompt", text: "프롬프트를 버전 관리한다 (히스토리 보존)." },
  { id: "design-1", area: "Design", text: "내 브랜드의 컬러·폰트가 정의돼 있다." },
  { id: "design-2", area: "Design", text: "결과물에 일관된 언어 톤이 있다." },
  { id: "design-3", area: "Design", text: "디자인 시스템 또는 템플릿이 있다." },
  { id: "decision-1", area: "Decision", text: "주간 단위 결정 회의 또는 의식이 있다." },
  { id: "decision-2", area: "Decision", text: "결정 로그를 남긴다." },
  { id: "decision-3", area: "Decision", text: "한 달 전 결정을 재검토한다." },
]

export const TOTAL_QUESTIONS = SCAN_QUESTIONS.length
export const PER_AREA = 3
