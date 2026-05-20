"use client"

import { useMemo, useState } from "react"
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
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" })
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
        if (ready) setSubmitted(true)
      }}
    >
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
