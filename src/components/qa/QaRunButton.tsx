"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition, type CSSProperties } from "react"

type RunResponse = {
  ok: boolean
  exitCode?: number | null
  timedOut?: boolean
  durationMs?: number
  stdoutTail?: string
  stderrTail?: string
  error?: string
}

export function QaRunButton() {
  const router = useRouter()
  const [isRunning, setIsRunning] = useState(false)
  const [isRefreshing, startTransition] = useTransition()
  const [result, setResult] = useState<RunResponse | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const busy = isRunning || isRefreshing

  const run = async () => {
    setIsRunning(true)
    setResult(null)
    setErrorMessage(null)
    try {
      const res = await fetch("/api/qa/run", {
        method: "POST",
        headers: { "content-type": "application/json" },
        cache: "no-store",
      })
      const data = (await res.json()) as RunResponse
      setResult(data)
      if (data.ok) {
        startTransition(() => router.refresh())
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : String(err))
    } finally {
      setIsRunning(false)
    }
  }

  const wrap: CSSProperties = {
    background: "var(--surface)",
    border: "var(--border-w) solid var(--line)",
    boxShadow: "var(--shadow-brutal)",
    padding: "20px",
    marginBottom: "40px",
  }
  const row: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  }
  const eyebrow: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--muted)",
    marginBottom: "10px",
  }
  const button: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: "12px 20px",
    background: busy ? "var(--surface-2)" : "var(--accent)",
    color: busy ? "var(--muted)" : "var(--accent-ink)",
    border: "1.5px solid var(--ink)",
    boxShadow: busy ? "none" : "var(--shadow-brutal-sm)",
    cursor: busy ? "not-allowed" : "pointer",
    transform: busy ? "translate(2px, 2px)" : "none",
    transition: "transform 80ms ease-out, box-shadow 80ms ease-out",
  }
  const note: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    color: "var(--muted)",
    lineHeight: 1.6,
  }
  const status = (color: string): CSSProperties => ({
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    color,
    fontWeight: 600,
  })
  const logBox: CSSProperties = {
    marginTop: "16px",
    background: "var(--bg)",
    border: "1px solid var(--line)",
    padding: "12px 14px",
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    color: "var(--ink-2)",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    maxHeight: "260px",
    overflow: "auto",
  }

  let statusEl: React.ReactNode = null
  if (isRunning) {
    statusEl = <span style={status("var(--accent)")}>실행 중… (최대 5분)</span>
  } else if (isRefreshing) {
    statusEl = <span style={status("var(--accent)")}>리포트 새로 로딩…</span>
  } else if (errorMessage) {
    statusEl = <span style={status("#D62828")}>요청 실패: {errorMessage}</span>
  } else if (result?.ok) {
    statusEl = (
      <span style={status("var(--ink)")}>
        ✓ 완료 — exit {result.exitCode}, {Math.round((result.durationMs ?? 0) / 100) / 10}s
      </span>
    )
  } else if (result && !result.ok) {
    const why = result.timedOut
      ? "TIMEOUT"
      : result.error
        ? `ERROR: ${result.error}`
        : `exit ${result.exitCode}`
    statusEl = <span style={status("#D62828")}>FAIL — {why}</span>
  }

  return (
    <div style={wrap}>
      <div style={eyebrow}>{"// RUN QA (DEV ONLY)"}</div>
      <div style={row}>
        <button onClick={run} disabled={busy} style={button} type="button">
          {isRunning ? "RUNNING…" : "▶  RUN QA"}
        </button>
        <span style={note}>
          서버에서 <code>npm run qa:test</code>를 spawn 합니다. 35~60초 소요.
          <br />
          이 버튼은 dev + localhost 접속에서만 동작합니다. prod에서는 API가 404 응답.
        </span>
        <span style={{ marginLeft: "auto" }}>{statusEl}</span>
      </div>
      {result && !result.ok && (result.stderrTail || result.stdoutTail) && (
        <pre style={logBox}>
          {result.stderrTail || result.stdoutTail}
        </pre>
      )}
    </div>
  )
}
