"use client"

import type { CSSProperties } from "react"
import { useCallback, useEffect, useState } from "react"
import { CopyButton } from "./CopyButton"
import {
  VHK_INSTALL_CMD,
  vhkHeroDemoSteps,
  type VhkHeroDemoStep,
} from "@/data/vhk"

const TYPE_MS = 42
const OUTPUT_LINE_MS = 320
const HOLD_MS = 2400
const REDUCED_STEP_MS = 3800

const shell: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  background: "#0A0A0A",
  border: "1.5px solid var(--line)",
  boxShadow: "var(--shadow)",
  fontFamily: "var(--font-mono)",
  color: "#F4F1EA",
}

const header: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
  padding: "10px 14px",
  borderBottom: "1px solid #1F1F1F",
  flexWrap: "wrap",
}

const dotsRow: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
}

const dot = (color: string): CSSProperties => ({
  width: "10px",
  height: "10px",
  background: color,
  borderRadius: 0,
})

const titleStyle: CSSProperties = {
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#968D7E",
  flex: 1,
  minWidth: "120px",
}

const stepRow: CSSProperties = {
  display: "flex",
  gap: "6px",
  flexWrap: "wrap",
}

const stepPill = (active: boolean): CSSProperties => ({
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  padding: "3px 8px",
  border: `1.5px solid ${active ? "#FF5C28" : "#1F1F1F"}`,
  background: active ? "#FF5C28" : "transparent",
  color: active ? "#0A0A0A" : "#968D7E",
})

const body: CSSProperties = {
  padding: "20px 18px 22px",
  fontSize: "14px",
  lineHeight: 1.7,
  minHeight: "168px",
  maxHeight: "220px",
  overflowY: "auto",
  whiteSpace: "pre",
}

const promptStyle: CSSProperties = {
  color: "#FF5C28",
  marginRight: "8px",
}

const outputStyle: CSSProperties = {
  color: "#94A3B8",
  marginTop: "2px",
}

const demoCaption: CSSProperties = {
  fontSize: "10px",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#968D7E",
  marginTop: "10px",
  paddingTop: "10px",
  borderTop: "1px solid #1F1F1F",
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

type DemoBodyProps = {
  step: VhkHeroDemoStep
  stepIndex: number
  typed: string
  outputVisible: number
}

function DemoBody({ step, stepIndex, typed, outputVisible }: DemoBodyProps) {
  const showCaret = typed.length < step.command.length

  return (
    <div style={body} aria-live="polite" aria-atomic="true">
      <div>
        <span style={promptStyle}>$</span>
        <span>{typed}</span>
        {showCaret && (
          <span className="vhk-caret" aria-hidden="true">
            _
          </span>
        )}
      </div>
      {step.output.slice(0, outputVisible).map((line, i) => (
        <div key={`${stepIndex}-${i}`} style={outputStyle}>
          {line || "\u00a0"}
        </div>
      ))}
      <p style={demoCaption}>데모 시나리오 · 실제 출력과 다를 수 있음</p>
    </div>
  )
}

type AnimatedDemoBodyProps = {
  step: VhkHeroDemoStep
  stepIndex: number
  onStepComplete: () => void
}

function AnimatedDemoBody({
  step,
  stepIndex,
  onStepComplete,
}: AnimatedDemoBodyProps) {
  const [typed, setTyped] = useState("")
  const [outputVisible, setOutputVisible] = useState(0)

  useEffect(() => {
    let cancelled = false
    const timers: number[] = []
    const schedule = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        if (!cancelled) fn()
      }, ms)
      timers.push(id)
    }

    let charIndex = 0
    const typeTimer = window.setInterval(() => {
      if (cancelled) return
      charIndex += 1
      setTyped(step.command.slice(0, charIndex))
      if (charIndex >= step.command.length) {
        window.clearInterval(typeTimer)
        let lineIndex = 0
        const showLine = () => {
          if (cancelled) return
          lineIndex += 1
          setOutputVisible(lineIndex)
          if (lineIndex < step.output.length) {
            schedule(showLine, OUTPUT_LINE_MS)
          } else {
            schedule(onStepComplete, HOLD_MS)
          }
        }
        schedule(showLine, OUTPUT_LINE_MS)
      }
    }, TYPE_MS)

    return () => {
      cancelled = true
      window.clearInterval(typeTimer)
      timers.forEach((id) => window.clearTimeout(id))
    }
  }, [step, onStepComplete])

  return (
    <DemoBody
      step={step}
      stepIndex={stepIndex}
      typed={typed}
      outputVisible={outputVisible}
    />
  )
}

export function VhkHeroDemo() {
  const [reduced] = useState(prefersReducedMotion)
  const [stepIndex, setStepIndex] = useState(0)
  const step = vhkHeroDemoSteps[stepIndex]

  const advanceStep = useCallback(() => {
    setStepIndex((i) => (i + 1) % vhkHeroDemoSteps.length)
  }, [])

  useEffect(() => {
    if (!reduced) return
    const id = window.setTimeout(advanceStep, REDUCED_STEP_MS)
    return () => window.clearTimeout(id)
  }, [reduced, stepIndex, advanceStep])

  return (
    <div style={shell} aria-label="VHK CLI 데모 — 설치부터 gate, init, sync까지">
      <div style={header}>
        <div style={dotsRow}>
          <span style={dot("#FF5C28")} />
          <span style={dot("#968D7E")} />
          <span style={dot("#1F1F1F")} />
        </div>
        <span style={titleStyle}>vhk@studio:~ — demo</span>
        <div style={stepRow} aria-hidden="true">
          {vhkHeroDemoSteps.map((s, i) => (
            <span key={s.label} style={stepPill(i === stepIndex)}>
              {s.label}
            </span>
          ))}
        </div>
        <CopyButton
          text={VHK_INSTALL_CMD}
          label="복사"
          ariaLabel="npm 설치 명령 복사"
          style={{
            background: "transparent",
            color: "#F4F1EA",
            borderColor: "#1F1F1F",
          }}
        />
      </div>
      {reduced ? (
        <DemoBody
          step={step}
          stepIndex={stepIndex}
          typed={step.command}
          outputVisible={step.output.length}
        />
      ) : (
        <AnimatedDemoBody
          key={stepIndex}
          step={step}
          stepIndex={stepIndex}
          onStepComplete={advanceStep}
        />
      )}
    </div>
  )
}
