import type { CSSProperties } from "react"
import Image from "next/image"

type Props = {
  src: string
  alt?: string
  caption?: string
  width?: number
  height?: number
}

const figure: CSSProperties = { margin: "2rem 0" }
const wrapBase: CSSProperties = {
  position: "relative",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow)",
  background: "var(--surface-2)",
  overflow: "hidden",
}
const caption: CSSProperties = {
  marginTop: "0.75rem",
  fontFamily: "var(--font-mono)",
  fontSize: "0.75rem",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--muted)",
  textAlign: "center",
}

export function BlogImage({ src, alt = "", caption: cap, width, height }: Props) {
  const isLocal = src.startsWith("/")
  const wrap: CSSProperties = isLocal && !(width && height)
    ? { ...wrapBase, aspectRatio: "16 / 9" }
    : wrapBase

  return (
    <figure style={figure}>
      <div style={wrap}>
        {isLocal && width && height ? (
          <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 800px) 100vw, 680px" />
        ) : isLocal ? (
          <Image src={src} alt={alt} fill sizes="(max-width: 800px) 100vw, 680px" style={{ objectFit: "cover" }} />
        ) : (
          // External URL: opt out of next/image (domains not configured).
          // eslint-disable-next-line @next/next/no-img-element -- external image URL
          <img src={src} alt={alt} style={{ width: "100%", height: "auto", display: "block" }} />
        )}
      </div>
      {cap ? <figcaption style={caption}>{cap}</figcaption> : null}
    </figure>
  )
}
