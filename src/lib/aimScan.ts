// src/lib/aimScan.ts
import { AREAS, SCAN_QUESTIONS, PER_AREA, type Area } from "@/data/aimScanQuestions"

export const MAX_PER_QUESTION = 5
export const MAX_PER_AREA = MAX_PER_QUESTION * PER_AREA // 15
export const MAX_TOTAL = MAX_PER_AREA * AREAS.length // 105

export type Answers = Record<string, number>

export type AreaScores = Record<Area, number>

export type ScanResult = {
  total: number
  percent: number
  byArea: AreaScores
  byAreaPercent: Record<Area, number>
  level: 1 | 2 | 3 | 4 | 5
  top3Problems: Area[]
  recommendedOrder: Area[]
}

export const LEVEL_DEFINITIONS: Record<
  1 | 2 | 3 | 4 | 5,
  { name: string; range: string; desc: string }
> = {
  1: { name: "Lv.1 흩어짐", range: "0–20%", desc: "방향과 시스템이 둘 다 비어 있다. Direction 먼저." },
  2: { name: "Lv.2 시작", range: "21–40%", desc: "한두 축은 잡혔지만 루프가 없다. 우선순위를 1~3개로 좁혀라." },
  3: { name: "Lv.3 조립", range: "41–60%", desc: "축은 있다. 영역 간 연결고리(자동화·회고)가 다음 과제." },
  4: { name: "Lv.4 운영", range: "61–80%", desc: "체계가 돈다. 약한 영역을 분기 단위로 보완하라." },
  5: { name: "Lv.5 확장", range: "81–100%", desc: "체계가 너를 복제한다. 위임·확장 단계." },
}

export function getLevel(percent: number): 1 | 2 | 3 | 4 | 5 {
  if (percent <= 20) return 1
  if (percent <= 40) return 2
  if (percent <= 60) return 3
  if (percent <= 80) return 4
  return 5
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n))
}

export function calculateScores(answers: Answers): ScanResult {
  const byArea = Object.fromEntries(AREAS.map((a) => [a, 0])) as AreaScores

  for (const q of SCAN_QUESTIONS) {
    const raw = answers[q.id]
    const v = typeof raw === "number" && Number.isFinite(raw) ? clamp(raw, 0, MAX_PER_QUESTION) : 0
    byArea[q.area] += v
  }

  const byAreaPercent = Object.fromEntries(
    AREAS.map((a) => [a, Math.round((byArea[a] / MAX_PER_AREA) * 100)]),
  ) as Record<Area, number>

  const total = AREAS.reduce((sum, a) => sum + byArea[a], 0)
  const percent = Math.round((total / MAX_TOTAL) * 100)
  const level = getLevel(percent)

  const ordered = [...AREAS].sort((a, b) => byArea[a] - byArea[b])
  const top3Problems = ordered.slice(0, 3)
  const recommendedOrder = ordered

  return { total, percent, byArea, byAreaPercent, level, top3Problems, recommendedOrder }
}

export function isAllAnswered(answers: Answers): boolean {
  return SCAN_QUESTIONS.every((q) => typeof answers[q.id] === "number")
}
