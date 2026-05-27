"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type { CSSProperties } from "react"
import {
  AREAS,
  AREA_LABELS_KO,
  AREA_DESC,
  SCAN_QUESTIONS,
  type Area,
} from "@/data/aimScanQuestions"
import { calculateScores, isAllAnswered, MAX_PER_QUESTION, type Answers } from "@/lib/aimScan"
import { ResultPanel } from "./ResultPanel"

const DRAFT_KEY = "aimscan-draft-v1"
const DRAFT_MAX_AGE_DAYS = 7

type Draft = { answers: Answers; savedAt: number }

function loadDraft(): Answers | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Draft
    if (!parsed || typeof parsed !== "object") return null
    const ageMs = Date.now() - (parsed.savedAt ?? 0)
    if (ageMs > DRAFT_MAX_AGE_DAYS * 24 * 60 * 60 * 1000) {
      window.localStorage.removeItem(DRAFT_KEY)
      return null
    }
    // 키가 SCAN_QUESTIONS 안에 있는 것만 살림 + number 값만
    const valid: Answers = {}
    for (const q of SCAN_QUESTIONS) {
      const v = parsed.answers?.[q.id]
      if (typeof v === "number" && Number.isFinite(v)) valid[q.id] = v
    }
    return Object.keys(valid).length > 0 ? valid : null
  } catch {
    return null
  }
}

function saveDraft(answers: Answers) {
  if (typeof window === "undefined") return
  try {
    const draft: Draft = { answers, savedAt: Date.now() }
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
  } catch {
    // localStorage full 등 — 무음
  }
}

function clearDraft() {
  if (typeof window === "undefined") return
  try {
    window.localStorage.removeItem(DRAFT_KEY)
  } catch {
    // noop
  }
}

const form: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "40px",
}

const progressWrap: CSSProperties = {
  position: "sticky",
  top: "0",
  background: "var(--bg)",
  paddingBottom: "8px",
  paddingTop: "8px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--muted)",
  zIndex: 5,
  borderBottom: "1px solid var(--line)",
}

const progressBar: CSSProperties = {
  flex: 1,
  height: "4px",
  background: "var(--surface-2)",
  border: "1px solid var(--line)",
  position: "relative",
}

const fieldset: CSSProperties = {
  border: "var(--border-w) solid var(--line)",
  padding: "24px 28px",
  background: "var(--bg)",
  boxShadow: "var(--shadow-sm)",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}

const legend: CSSProperties = {
  fontSize: "20px",
  fontWeight: 800,
  letterSpacing: "-0.02em",
  color: "var(--ink)",
  padding: "0 8px",
  background: "var(--bg)",
}

const areaDesc: CSSProperties = {
  fontSize: "13px",
  lineHeight: 1.55,
  color: "var(--ink-2)",
  paddingBottom: "12px",
  borderBottom: "1px dashed var(--muted-2)",
}

const qRow: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  gap: "16px",
  alignItems: "center",
  paddingTop: "12px",
  borderTop: "1px dashed var(--muted-2)",
}

const qText: CSSProperties = {
  fontSize: "14px",
  lineHeight: 1.55,
  color: "var(--ink)",
}

const radioRow: CSSProperties = {
  display: "flex",
  gap: "4px",
}

const radioLabel: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "32px",
  height: "32px",
  border: "1.5px solid var(--line)",
  background: "var(--bg)",
  color: "var(--ink)",
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 700,
  cursor: "pointer",
}

const radioLabelActive: CSSProperties = {
  ...radioLabel,
  background: "var(--accent)",
  color: "var(--accent-ink)",
  boxShadow: "var(--shadow-sm)",
}

const radioInput: CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
}

const submitRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
  paddingTop: "16px",
  borderTop: "var(--border-w) solid var(--line)",
}

const btnPrimary: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "16px 26px",
  fontSize: "15px",
  fontWeight: 700,
  background: "var(--accent)",
  color: "var(--accent-ink)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow)",
  cursor: "pointer",
}

const btnDisabled: CSSProperties = {
  ...btnPrimary,
  background: "var(--surface-2)",
  color: "var(--muted)",
  cursor: "not-allowed",
  boxShadow: "var(--shadow-sm)",
}

const btnGhost: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "16px 26px",
  fontSize: "15px",
  fontWeight: 700,
  background: "var(--bg)",
  color: "var(--ink)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow-sm)",
  cursor: "pointer",
}

const restoredBanner: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "12px",
  padding: "12px 16px",
  background: "var(--surface)",
  border: "1.5px solid var(--line)",
  boxShadow: "var(--shadow-sm)",
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.04em",
  color: "var(--ink)",
}

const restoredActions: CSSProperties = { display: "inline-flex", gap: "8px" }

const bannerBtnGhost: CSSProperties = {
  padding: "6px 12px",
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  background: "var(--bg)",
  color: "var(--ink)",
  border: "1.5px solid var(--line)",
  cursor: "pointer",
}

const bannerBtnAccent: CSSProperties = {
  ...bannerBtnGhost,
  background: "var(--accent)",
  color: "var(--accent-ink)",
}

function QuestionRow({
  qid,
  text,
  value,
  onChange,
}: {
  qid: string
  text: string
  value: number | undefined
  onChange: (v: number) => void
}) {
  return (
    <div style={qRow}>
      <p style={qText}>{text}</p>
      <div style={radioRow} role="radiogroup" aria-label={text}>
        {Array.from({ length: MAX_PER_QUESTION + 1 }, (_, n) => (
          <label key={n} style={value === n ? radioLabelActive : radioLabel}>
            <input
              type="radio"
              name={qid}
              value={n}
              checked={value === n}
              onChange={() => onChange(n)}
              style={radioInput}
            />
            {n}
          </label>
        ))}
      </div>
    </div>
  )
}

export function DiagnosisForm() {
  const [answers, setAnswers] = useState<Answers>({})
  const [submitted, setSubmitted] = useState(false)
  const [restored, setRestored] = useState(false)
  const hydratedRef = useRef(false)

  // 마운트 시 1회만 draft 복원
  useEffect(() => {
    if (hydratedRef.current) return
    hydratedRef.current = true
    const draft = loadDraft()
    if (draft && Object.keys(draft).length > 0) {
      setAnswers(draft)
      setRestored(true)
    }
  }, [])

  // answers 변경 시 draft 저장 (submitted 후엔 저장 안 함)
  useEffect(() => {
    if (!hydratedRef.current) return
    if (submitted) return
    if (Object.keys(answers).length === 0) return
    saveDraft(answers)
  }, [answers, submitted])

  const ready = isAllAnswered(answers)
  const result = useMemo(() => (submitted ? calculateScores(answers) : null), [submitted, answers])

  const answeredCount = Object.values(answers).filter((v) => typeof v === "number").length
  const total = SCAN_QUESTIONS.length
  const pct = Math.round((answeredCount / total) * 100)

  const set = (id: string, v: number) =>
    setAnswers((prev) => ({ ...prev, [id]: v }))

  const reset = () => {
    setAnswers({})
    setSubmitted(false)
    setRestored(false)
    clearDraft()
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmit = () => {
    setSubmitted(true)
    clearDraft()
  }

  const dismissRestoredBanner = () => {
    setRestored(false)
  }

  const startOver = () => {
    setAnswers({})
    setRestored(false)
    clearDraft()
  }

  if (result) {
    return (
      <div style={form}>
        <ResultPanel result={result} />
        <div style={submitRow}>
          <button type="button" onClick={reset} style={btnGhost}>
            다시 진단하기 ↺
          </button>
        </div>
      </div>
    )
  }

  return (
    <form
      style={form}
      onSubmit={(e) => {
        e.preventDefault()
        if (ready) handleSubmit()
      }}
    >
      {restored && (
        <div style={restoredBanner} role="status">
          <span>이전에 입력하던 답을 불러왔습니다 ({answeredCount}/{total}).</span>
          <span style={restoredActions}>
            <button type="button" onClick={dismissRestoredBanner} style={bannerBtnGhost}>
              계속 풀기
            </button>
            <button type="button" onClick={startOver} style={bannerBtnAccent}>
              처음부터
            </button>
          </span>
        </div>
      )}

      <div style={progressWrap}>
        <span>{answeredCount}/{total}</span>
        <div style={progressBar} aria-hidden>
          <div
            style={{
              position: "absolute",
              inset: 0,
              width: `${pct}%`,
              background: "var(--accent)",
            }}
          />
        </div>
        <span>{pct}%</span>
      </div>

      {AREAS.map((area: Area) => (
        <fieldset key={area} style={fieldset}>
          <legend style={legend}>{AREA_LABELS_KO[area]}</legend>
          <p style={areaDesc}>{AREA_DESC[area]}</p>
          {SCAN_QUESTIONS.filter((q) => q.area === area).map((q) => (
            <QuestionRow
              key={q.id}
              qid={q.id}
              text={q.text}
              value={answers[q.id]}
              onChange={(v) => set(q.id, v)}
            />
          ))}
        </fieldset>
      ))}

      <div style={submitRow}>
        <button type="submit" style={ready ? btnPrimary : btnDisabled} disabled={!ready}>
          결과 보기 →
        </button>
      </div>
    </form>
  )
}
