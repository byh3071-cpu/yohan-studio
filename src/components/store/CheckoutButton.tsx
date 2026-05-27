"use client"

import { useState, type CSSProperties } from "react"

const wrap: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
}

const button: CSSProperties = {
  background: "var(--accent)",
  color: "var(--accent-ink)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow)",
  padding: "14px 22px",
  fontSize: "15px",
  fontWeight: 800,
  fontFamily: "var(--font-mono)",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  cursor: "pointer",
  width: "100%",
  transition: "transform 80ms ease, box-shadow 80ms ease",
}

const buttonDisabled: CSSProperties = {
  ...button,
  background: "var(--surface-2, #e5e0d2)",
  color: "var(--muted)",
  cursor: "not-allowed",
  boxShadow: "var(--shadow-sm)",
}

const hint: CSSProperties = {
  fontSize: "11px",
  color: "var(--muted)",
  fontFamily: "var(--font-mono)",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
}

const errorText: CSSProperties = {
  fontSize: "12px",
  color: "var(--accent)",
  fontFamily: "var(--font-mono)",
}

export function CheckoutButton({
  productId,
  productName,
  active,
}: {
  productId: string
  productName: string
  active: boolean
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!active) {
    return (
      <div style={wrap}>
        <button type="button" style={buttonDisabled} disabled>
          품절 / 비활성
        </button>
        <span style={hint}>현재 구매 불가</span>
      </div>
    )
  }

  const onClick = async () => {
    setError(null)
    setLoading(true)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      })
      const json = (await res.json()) as { url?: string; error?: string }
      if (!res.ok || !json.url) {
        throw new Error(json.error || `Checkout 실패 (${res.status})`)
      }
      window.location.href = json.url
    } catch (e) {
      setError(e instanceof Error ? e.message : "결제 시작 실패")
      setLoading(false)
    }
  }

  return (
    <div style={wrap}>
      <button
        type="button"
        style={button}
        onClick={onClick}
        disabled={loading}
        onMouseDown={(e) => (e.currentTarget.style.transform = "translate(2px, 2px)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "translate(0, 0)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "translate(0, 0)")}
      >
        {loading ? "처리 중…" : "지금 구매하기 →"}
      </button>
      <span style={hint}>Stripe 결제 (Phase 3 연결 예정)</span>
      {error && <span style={errorText}>{error}</span>}
    </div>
  )
}
