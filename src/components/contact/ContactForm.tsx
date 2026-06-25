"use client"

import type { CSSProperties, FormEvent } from "react"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { trackEvent } from "@/lib/analytics"

const LEAD_SOURCE = "contact_page"


type Status = "idle" | "submitting" | "sent" | "error"

const fld: CSSProperties = { marginBottom: "20px" }

const lab: CSSProperties = {
  display: "block",
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 700,
  color: "var(--ink)",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  marginBottom: "8px",
}

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  fontSize: "15px",
  fontFamily: "var(--font-sans)",
  background: "var(--bg)",
  border: "1.5px solid var(--line)",
  color: "var(--ink)",
  outline: "none",
  borderRadius: 0,
}

const btn: CSSProperties = {
  width: "100%",
  padding: "16px 26px",
  fontSize: "15px",
  fontWeight: 700,
  fontFamily: "var(--font-sans)",
  background: "var(--accent)",
  color: "var(--accent-ink)",
  border: "1.5px solid var(--line)",
  boxShadow: "4px 4px 0 var(--shadow-color)",
  cursor: "pointer",
  borderRadius: 0,
}

const errBox: CSSProperties = {
  background: "var(--surface)",
  border: "1.5px solid var(--line)",
  padding: "12px 14px",
  marginBottom: "16px",
  fontSize: "13px",
  color: "var(--ink)",
  fontFamily: "var(--font-mono)",
}

const successBox: CSSProperties = {
  background: "var(--accent)",
  color: "var(--accent-ink)",
  border: "1.5px solid var(--line)",
  boxShadow: "4px 4px 0 var(--shadow-color)",
  padding: "24px",
  textAlign: "center",
}

export function ContactForm() {
  const sp = useSearchParams()

  // lazy initializer 로 마운트 시점 쿼리스트링만 반영.
  // 마운트 후 URL 변경은 사용자가 이미 입력 중일 수 있어 덮어쓰지 않는다.
  const [form, setForm] = useState(() => ({
    name: "",
    email: "",
    phone: "",
    subject: sp.get("service")
      ? `[서비스 문의] ${sp.get("service")}`
      : sp.get("subject") ?? "",
    message: "",
  }))
  const [status, setStatus] = useState<Status>("idle")
  const [errMsg, setErrMsg] = useState<string>("")

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setErrMsg("")

    const name = form.name.trim()
    const email = form.email.trim()
    const message = form.message.trim()

    if (!name || !email || !message) {
      setStatus("error")
      setErrMsg("이름·이메일·메시지는 필수 입력 항목입니다.")
      return
    }
    if (message.length > 5000) {
      setStatus("error")
      setErrMsg("메시지는 5000자 이하로 작성해주세요.")
      return
    }

    setStatus("submitting")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: form.phone.trim(),
          subject: form.subject.trim(),
          message,
          source: LEAD_SOURCE,
        }),
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (!res.ok || !data.ok) {
        trackEvent("form_error")
        setStatus("error")
        setErrMsg(data.error ?? "전송에 실패했습니다. 잠시 후 다시 시도해주세요.")
        return
      }
      trackEvent("generate_lead", { source: LEAD_SOURCE })
      setStatus("sent")
      setForm({ name: "", email: "", phone: "", subject: "", message: "" })
    } catch (err) {
      trackEvent("form_error")
      setStatus("error")
      setErrMsg(
        `네트워크 오류가 발생했습니다: ${err instanceof Error ? err.message : "unknown"}`,
      )
    }
  }

  if (status === "sent") {
    return (
      <div style={successBox}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "6px",
          }}
        >
          {"// MESSAGE RECEIVED"}
        </div>
        <div style={{ fontSize: "18px", fontWeight: 800 }}>
          문의 접수 완료. 48시간 안에 회신드립니다.
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      {status === "error" && errMsg ? <div style={errBox}>{errMsg}</div> : null}

      <div style={fld}>
        <label style={lab} htmlFor="contact-name">
          {"// 이름 *"}
        </label>
        <input
          id="contact-name"
          style={inputStyle}
          type="text"
          placeholder="요한"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          maxLength={80}
        />
      </div>

      <div style={fld}>
        <label style={lab} htmlFor="contact-email">
          {"// 이메일 *"}
        </label>
        <input
          id="contact-email"
          style={inputStyle}
          type="email"
          placeholder="hello@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          maxLength={320}
        />
      </div>

      <div style={fld}>
        <label style={lab} htmlFor="contact-phone">
          {"// 연락처 (선택)"}
        </label>
        <input
          id="contact-phone"
          style={inputStyle}
          type="tel"
          placeholder="010-0000-0000"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          maxLength={40}
        />
      </div>

      <div style={fld}>
        <label style={lab} htmlFor="contact-subject">
          {"// 제목 (선택)"}
        </label>
        <input
          id="contact-subject"
          style={inputStyle}
          type="text"
          placeholder="협업 / 견적 / 잡담"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          maxLength={120}
        />
      </div>

      <div style={fld}>
        <label style={lab} htmlFor="contact-message">
          {"// 메시지 *"}
        </label>
        <textarea
          id="contact-message"
          style={{ ...inputStyle, resize: "vertical", minHeight: "180px" }}
          placeholder="무엇을 만들고 싶은가? 일정·예산·범위 자유롭게."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          maxLength={5000}
        />
      </div>

      <button type="submit" style={btn} disabled={status === "submitting"}>
        {status === "submitting" ? "전송 중..." : "보내기 →"}
      </button>
    </form>
  )
}
