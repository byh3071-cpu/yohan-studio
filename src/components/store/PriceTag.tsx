import type { CSSProperties } from "react"

type Size = "sm" | "md" | "lg"

const sizes: Record<Size, { fontSize: string; padding: string }> = {
  sm: { fontSize: "13px", padding: "4px 8px" },
  md: { fontSize: "16px", padding: "6px 12px" },
  lg: { fontSize: "22px", padding: "8px 14px" },
}

const base: CSSProperties = {
  display: "inline-flex",
  alignItems: "baseline",
  gap: "4px",
  fontFamily: "var(--font-en)",
  fontWeight: 700,
  letterSpacing: "-0.01em",
  color: "var(--ink)",
  background: "var(--bg)",
  border: "var(--border-w) solid var(--line)",
}

const currencySym: CSSProperties = {
  fontSize: "0.8em",
  fontWeight: 600,
  color: "var(--muted)",
}

const symbolFor = (currency: string) => {
  switch (currency.toUpperCase()) {
    case "KRW":
      return "₩"
    case "USD":
      return "$"
    case "EUR":
      return "€"
    case "JPY":
      return "¥"
    default:
      return currency.toUpperCase() + " "
  }
}

const formatAmount = (cents: number, currency: string) => {
  const isJpyKrw = currency.toUpperCase() === "KRW" || currency.toUpperCase() === "JPY"
  const amount = isJpyKrw ? cents : cents / 100
  return new Intl.NumberFormat("ko-KR", {
    minimumFractionDigits: isJpyKrw ? 0 : 2,
    maximumFractionDigits: isJpyKrw ? 0 : 2,
  }).format(amount)
}

export function PriceTag({
  priceCents,
  currency = "KRW",
  size = "md",
  tbd = false,
}: {
  priceCents: number
  currency?: string
  size?: Size
  tbd?: boolean
}) {
  if (tbd) {
    return (
      <span style={{ ...base, ...sizes[size] }} aria-label="가격 공개 예정">
        <strong style={{ fontSize: "0.72em", letterSpacing: "0.04em" }}>가격 공개 예정</strong>
      </span>
    )
  }
  const isFree = priceCents === 0
  return (
    <span style={{ ...base, ...sizes[size] }} aria-label={`가격 ${priceCents} ${currency}`}>
      {isFree ? (
        <strong>FREE</strong>
      ) : (
        <>
          <span style={currencySym}>{symbolFor(currency)}</span>
          <strong>{formatAmount(priceCents, currency)}</strong>
        </>
      )}
    </span>
  )
}
