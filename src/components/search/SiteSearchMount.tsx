"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

import { SITE_SEARCH_OPEN_EVENT } from "@/lib/siteSearchEvents"

// SiteSearch + Fuse.js + 검색 docs 페치 로직을 첫 트리거(Cmd+K 또는 커스텀 이벤트)
// 발생 전까지 클라이언트 번들에서 분리한다. ssr:false 로 초기 HTML 에도 안 들어간다.
const SiteSearchPanel = dynamic(
  () => import("@/components/search/SiteSearch").then((m) => m.SiteSearch),
  { ssr: false },
)

export function SiteSearchMount() {
  const [shouldLoad, setShouldLoad] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isToggle = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k"
      if (!isToggle) return
      e.preventDefault()
      setShouldLoad(true)
      setOpen((v) => !v)
    }
    const onOpenRequest = () => {
      setShouldLoad(true)
      setOpen(true)
    }
    window.addEventListener("keydown", onKey)
    window.addEventListener(SITE_SEARCH_OPEN_EVENT, onOpenRequest)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener(SITE_SEARCH_OPEN_EVENT, onOpenRequest)
    }
  }, [])

  if (!shouldLoad) return null
  return <SiteSearchPanel open={open} onClose={() => setOpen(false)} />
}
