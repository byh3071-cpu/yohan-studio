"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export type TTSState = "idle" | "loading" | "playing" | "error"

// Module-scope: 동시에 하나만 재생. 새 play 가 들어오면 직전 인스턴스의 stop 호출.
let activeToken: symbol | null = null
let activeStopFn: (() => void) | null = null

export function useTTS() {
  // 인스턴스 식별용 안정 토큰. useCallback 내부 자기참조 없이 비교 가능.
  const [token] = useState<symbol>(() => Symbol("tts"))
  const [state, setState] = useState<TTSState>("idle")
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const cacheRef = useRef<Map<string, string>>(new Map())
  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const stop = useCallback(() => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
    setState("idle")
    if (activeToken === token) {
      activeToken = null
      activeStopFn = null
    }
  }, [token])

  const play = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed) return

      if (activeToken !== null && activeToken !== token && activeStopFn) {
        activeStopFn()
      }
      if (errorTimerRef.current) {
        clearTimeout(errorTimerRef.current)
        errorTimerRef.current = null
      }

      let url = cacheRef.current.get(trimmed) ?? null

      if (!url) {
        setState("loading")
        try {
          const res = await fetch("/api/tts", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ text: trimmed }),
          })
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          const buf = await res.arrayBuffer()
          const blob = new Blob([buf], { type: "audio/mpeg" })
          url = URL.createObjectURL(blob)
          cacheRef.current.set(trimmed, url)
        } catch (err) {
          console.error("[useTTS] fetch error:", err)
          setState("error")
          errorTimerRef.current = setTimeout(() => setState("idle"), 3000)
          return
        }
      }

      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }

      const audio = new Audio(url)
      audioRef.current = audio
      activeToken = token
      activeStopFn = stop

      audio.onended = () => {
        setState("idle")
        if (activeToken === token) {
          activeToken = null
          activeStopFn = null
        }
      }
      audio.onerror = () => {
        setState("error")
        errorTimerRef.current = setTimeout(() => setState("idle"), 3000)
        if (activeToken === token) {
          activeToken = null
          activeStopFn = null
        }
      }

      try {
        await audio.play()
        setState("playing")
      } catch (err) {
        console.error("[useTTS] play error:", err)
        setState("error")
        errorTimerRef.current = setTimeout(() => setState("idle"), 3000)
        if (activeToken === token) {
          activeToken = null
          activeStopFn = null
        }
      }
    },
    [token, stop],
  )

  useEffect(() => {
    const cache = cacheRef.current
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
        audioRef.current = null
      }
      cache.forEach((url) => URL.revokeObjectURL(url))
      cache.clear()
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current)
      if (activeToken === token) {
        activeToken = null
        activeStopFn = null
      }
    }
  }, [token])

  return { state, play, stop }
}
