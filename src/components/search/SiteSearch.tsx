"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent } from "react"
import { useRouter } from "next/navigation"

import { SearchResult } from "@/components/search/SearchResult"
import { createSearchIndex, type SearchDocument } from "@/lib/search"

const MAX_RESULTS = 12

const backdrop: CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(10, 10, 10, 0.55)",
  backdropFilter: "blur(2px)",
  zIndex: 100,
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  padding: "10vh 16px 16px",
}

const panel: CSSProperties = {
  width: "min(640px, 100%)",
  background: "var(--bg)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow-lg)",
  display: "flex",
  flexDirection: "column",
  maxHeight: "70vh",
}

const inputRow: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "16px 18px",
  borderBottom: "var(--border-w) solid var(--line)",
}

const prompt: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 700,
  color: "var(--accent)",
  letterSpacing: "0.08em",
}

const inputStyle: CSSProperties = {
  flex: 1,
  background: "transparent",
  border: "none",
  outline: "none",
  color: "var(--ink)",
  fontSize: "16px",
  fontFamily: "var(--font-sans)",
  caretColor: "var(--accent)",
  padding: 0,
}

const closeHint: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "10px",
  color: "var(--muted)",
  border: "1px solid var(--line)",
  padding: "2px 6px",
  letterSpacing: "0.06em",
}

const list: CSSProperties = {
  flex: 1,
  overflowY: "auto",
}

const emptyMsg: CSSProperties = {
  padding: "32px 18px",
  textAlign: "center",
  color: "var(--muted)",
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
}

const footer: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "10px",
  padding: "10px 16px",
  borderTop: "1px solid var(--line)",
  fontFamily: "var(--font-mono)",
  fontSize: "10px",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--muted)",
}

// Controlled: 부모(SiteSearchMount)가 open + close 를 소유.
// docs 는 첫 마운트 시 /api/search-docs 에서 페치 — 초기 HTML/번들에 직렬화하지 않음.
type SiteSearchProps = {
  open: boolean
  onClose: () => void
}

export function SiteSearch({ open, onClose }: SiteSearchProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)
  const [docs, setDocs] = useState<SearchDocument[] | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // 첫 마운트 시 1회 페치. Fuse 인덱스 빌드도 docs 확보 후 지연.
  useEffect(() => {
    let cancelled = false
    fetch("/api/search-docs", { cache: "force-cache" })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json() as Promise<{ docs: SearchDocument[] }>
      })
      .then((payload) => {
        if (!cancelled) setDocs(payload.docs)
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setLoadError(err instanceof Error ? err.message : "load failed")
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  const fuse = useMemo(() => (docs ? createSearchIndex(docs) : null), [docs])

  const results = useMemo(() => {
    if (!docs) return []
    const q = query.trim()
    if (q.length < 2 || !fuse) return docs.slice(0, MAX_RESULTS)
    return fuse.search(q).slice(0, MAX_RESULTS).map((r) => r.item)
  }, [fuse, query, docs])

  const close = useCallback(() => {
    setQuery("")
    setActive(0)
    onClose()
  }, [onClose])

  const select = useCallback(
    (doc: SearchDocument) => {
      router.push(doc.url)
      close()
    },
    [router, close],
  )

  // Escape close (Cmd+K 토글은 SiteSearchMount 에서 처리).
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        close()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, close])

  // Focus input + lock body scroll when open
  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => inputRef.current?.focus(), 0)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      clearTimeout(t)
      document.body.style.overflow = prev
    }
  }, [open])

  // Reset highlighted row when result list shrinks.
  // 렌더 중 setState 패턴 (https://react.dev/reference/react/useState#storing-information-from-previous-renders)
  // → react-hooks/set-state-in-effect 회피.
  if (active >= results.length && active !== 0) {
    setActive(0)
  }

  const onInputKey = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((i) => (results.length === 0 ? 0 : (i + 1) % results.length))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((i) => (results.length === 0 ? 0 : (i - 1 + results.length) % results.length))
    } else if (e.key === "Enter") {
      e.preventDefault()
      const doc = results[active]
      if (doc) select(doc)
    }
  }

  if (!open) return null

  return (
    <div
      style={backdrop}
      role="dialog"
      aria-modal="true"
      aria-label="사이트 검색"
      onClick={(e) => {
        if (e.target === e.currentTarget) close()
      }}
    >
      <div style={panel} onClick={(e) => e.stopPropagation()}>
        <div style={inputRow}>
          <span style={prompt}>{">"}</span>
          <input
            ref={inputRef}
            style={inputStyle}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            onKeyDown={onInputKey}
            placeholder="블로그·쇼룸·서비스 검색…"
            aria-label="검색어 입력"
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="button"
            onClick={close}
            style={{ ...closeHint, cursor: "pointer", background: "transparent" }}
            aria-label="검색 닫기"
          >
            ESC
          </button>
        </div>

        <div style={list}>
          {docs === null && loadError === null ? (
            <div style={emptyMsg}>검색 인덱스 불러오는 중…</div>
          ) : loadError !== null ? (
            <div style={emptyMsg}>검색 데이터 로드 실패: {loadError}</div>
          ) : results.length === 0 ? (
            <div style={emptyMsg}>검색 결과가 없습니다.</div>
          ) : (
            results.map((doc, i) => (
              <SearchResult
                key={doc.id}
                doc={doc}
                active={i === active}
                onSelect={() => select(doc)}
                onHover={() => setActive(i)}
              />
            ))
          )}
        </div>

        <div style={footer}>
          <span>↑↓ 이동 · ↵ 열기 · ESC 닫기</span>
          <span>{results.length} HITS</span>
        </div>
      </div>
    </div>
  )
}
