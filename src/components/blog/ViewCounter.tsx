"use client"

import type { CSSProperties } from "react"
import { useEffect, useState } from "react"

import { supabase } from "@/lib/supabase"

type Props = { slug: string }

const wrap: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.05em",
  color: "var(--muted)",
}

const dot: CSSProperties = {
  display: "inline-block",
  width: "6px",
  height: "6px",
  background: "var(--accent)",
  borderRadius: 0,
}

export function ViewCounter({ slug }: Props) {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    const storageKey = `studio_view:${slug}`
    const alreadyCounted = typeof window !== "undefined" && sessionStorage.getItem(storageKey)

    async function run() {
      try {
        if (alreadyCounted) {
          const { data, error } = await supabase
            .from("studio_blog_views")
            .select("view_count")
            .eq("slug", slug)
            .maybeSingle()
          if (!cancelled && !error && data) setCount(Number(data.view_count))
          return
        }
        const { data, error } = await supabase.rpc("studio_increment_blog_view", { p_slug: slug })
        if (cancelled) return
        if (!error && data !== null && data !== undefined) {
          setCount(Number(data))
          sessionStorage.setItem(storageKey, "1")
        }
      } catch {
        // silent — counter is non-critical
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [slug])

  if (count === null) return null
  return (
    <span style={wrap} aria-label={`조회수 ${count}회`}>
      <span style={dot} />
      VIEWS {count.toLocaleString()}
    </span>
  )
}
