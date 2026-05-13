"use client"

import type { CSSProperties, FormEvent } from "react"
import { useState } from "react"

const CONTACT_EMAIL = "byh3071@gmail.com"

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [focus, setFocus] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  const section: CSSProperties = {
    background: "var(--bg)",
    padding: "96px 24px",
    borderBottom: "1.5px solid var(--line)",
  }
  const inner: CSSProperties = { maxWidth: "640px", margin: "0 auto" }
  const eyebrow: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--muted)",
    marginBottom: "12px",
  }
  const title: CSSProperties = {
    fontSize: "clamp(36px, 5vw, 56px)",
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: "-0.03em",
    color: "var(--ink)",
    marginBottom: "12px",
  }
  const accent: CSSProperties = { color: "var(--accent)" }
  const sub: CSSProperties = {
    fontSize: "15px",
    color: "var(--ink-2)",
    marginBottom: "40px",
    borderLeft: "3px solid var(--line)",
    paddingLeft: "14px",
  }

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

  function inputBase(k: string): CSSProperties {
    return {
      width: "100%",
      padding: "14px 16px",
      fontSize: "15px",
      fontFamily: "var(--font-sans)",
      background: "var(--bg)",
      border: "1.5px solid var(--line)",
      color: "var(--ink)",
      outline: "none",
      borderRadius: 0,
      boxShadow: focus === k ? "4px 4px 0 var(--shadow-color)" : "0 0 0 var(--shadow-color)",
      transform: focus === k ? "translate(-2px, -2px)" : "translate(0, 0)",
      transition: "transform 80ms ease, box-shadow 80ms ease",
    }
  }

  const btn: CSSProperties = {
    width: "100%",
    padding: "16px 26px",
    fontSize: "15px",
    fontWeight: 700,
    fontFamily: "var(--font-sans)",
    background: "var(--accent)",
    color: "var(--ink)",
    border: "1.5px solid var(--line)",
    boxShadow: "4px 4px 0 var(--shadow-color)",
    cursor: "pointer",
    borderRadius: 0,
  }
  const sns: CSSProperties = {
    display: "flex",
    gap: "10px",
    marginTop: "32px",
    justifyContent: "center",
  }
  const snsBtn: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    fontWeight: 700,
    padding: "8px 14px",
    border: "1.5px solid var(--line)",
    background: "var(--bg)",
    color: "var(--ink)",
    textDecoration: "none",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    boxShadow: "2px 2px 0 var(--shadow-color)",
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent(`[요한 스튜디오] ${form.name || "문의"}`)
    const body = encodeURIComponent(
      [form.email && `회신 받을 주소: ${form.email}`, "", form.message].filter(Boolean).join("\n"),
    )
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section id="contact" style={section}>
      <div style={inner}>
        <div style={eyebrow}>{"// 06 — contact"}</div>
        <h2 style={title}>
          연락하기<span style={accent}>.</span>
        </h2>
        <p style={sub}>협업, 질문, 피드백 무엇이든 환영한다.</p>

        {sent ? (
          <div
            style={{
              background: "var(--accent)",
              border: "1.5px solid var(--line)",
              boxShadow: "4px 4px 0 var(--shadow-color)",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              {"// MESSAGE SENT"}
            </div>
            <div style={{ fontSize: "18px", fontWeight: 800 }}>메일 앱이 열렸다. 빠르게 답장할게.</div>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <div style={fld}>
              <label style={lab} htmlFor="contact-name">
                {"// 이름"}
              </label>
              <input
                id="contact-name"
                style={inputBase("name")}
                type="text"
                placeholder="백요한"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                onFocus={() => setFocus("name")}
                onBlur={() => setFocus(null)}
              />
            </div>
            <div style={fld}>
              <label style={lab} htmlFor="contact-email">
                {"// 이메일"}
              </label>
              <input
                id="contact-email"
                style={inputBase("email")}
                type="email"
                placeholder="hello@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onFocus={() => setFocus("email")}
                onBlur={() => setFocus(null)}
              />
            </div>
            <div style={fld}>
              <label style={lab} htmlFor="contact-message">
                {"// 메시지"}
              </label>
              <textarea
                id="contact-message"
                style={{ ...inputBase("message"), resize: "vertical", minHeight: "140px" }}
                placeholder="협업 문의, 피드백, 잡담 무엇이든..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                onFocus={() => setFocus("message")}
                onBlur={() => setFocus(null)}
              />
            </div>
            <button type="submit" style={btn}>
              보내기 →
            </button>
          </form>
        )}

        <div style={sns}>
          <a href={`mailto:${CONTACT_EMAIL}`} style={snsBtn}>
            EMAIL
          </a>
          <a href="https://github.com/byh3071-cpu" style={snsBtn}>
            GITHUB
          </a>
        </div>
      </div>
    </section>
  )
}
