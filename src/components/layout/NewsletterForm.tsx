"use client"

import type { CSSProperties, FormEvent } from "react"
import { useState } from "react"

import { supabase } from "@/lib/supabase"

type Status = "idle" | "submitting" | "ok" | "dup" | "error"

const wrap: CSSProperties = { display: "flex", flexDirection: "column", gap: "8px" }

const row: CSSProperties = { display: "flex", gap: "6px", flexWrap: "wrap" }

const input: CSSProperties = {
  flex: "1 1 200px",
  minWidth: 0,
  padding: "10px 12px",
  fontSize: "13px",
  fontFamily: "var(--font-sans)",
  background: "var(--bg)",
  color: "var(--ink)",
  border: "1.5px solid var(--footer-line)",
  borderRadius: 0,
  outline: "none",
}

const btn: CSSProperties = {
  padding: "10px 16px",
  fontSize: "12px",
  fontWeight: 700,
  fontFamily: "var(--font-mono)",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  background: "var(--accent)",
  color: "var(--accent-ink)",
  border: "1.5px solid var(--footer-line)",
  cursor: "pointer",
  borderRadius: 0,
  whiteSpace: "nowrap",
}

const msg: CSSProperties = {
  fontSize: "12px",
  fontFamily: "var(--font-mono)",
  color: "var(--footer-muted)",
  letterSpacing: "0.03em",
}

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [errMsg, setErrMsg] = useState<string>("")

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const value = email.trim()
    if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStatus("error")
      setErrMsg("이메일 형식을 확인해주세요.")
      return
    }
    setStatus("submitting")
    setErrMsg("")

    const { error } = await supabase
      .from("studio_subscribers")
      .insert({ email: value, source: "footer" })

    if (error) {
      if (error.code === "23505") {
        setStatus("dup")
        return
      }
      setStatus("error")
      setErrMsg(`구독에 실패했습니다: ${error.message}`)
      return
    }
    setStatus("ok")
    setEmail("")
  }

  if (status === "ok") {
    return <div style={msg}>{"// 구독 완료. 새 글이 나오면 메일로 보내드립니다."}</div>
  }
  if (status === "dup") {
    return <div style={msg}>{"// 이미 구독 중인 이메일입니다."}</div>
  }

  return (
    <form onSubmit={onSubmit} style={wrap} noValidate>
      <div style={row}>
        <input
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
          aria-label="뉴스레터 이메일"
          maxLength={320}
          required
        />
        <button type="submit" style={btn} disabled={status === "submitting"}>
          {status === "submitting" ? "..." : "구독"}
        </button>
      </div>
      {status === "error" && errMsg ? <div style={msg}>{errMsg}</div> : null}
    </form>
  )
}
