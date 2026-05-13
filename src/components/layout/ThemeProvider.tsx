"use client"

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react"

export type Theme = "light" | "dark"
export const THEME_STORAGE_KEY = "yohan-theme"

type ThemeCtx = {
  theme: Theme
  hydrated: boolean
  toggle: () => void
  setTheme: (t: Theme) => void
}

const Ctx = createContext<ThemeCtx | null>(null)

function subscribeDomTheme(callback: () => void) {
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  })
  return () => observer.disconnect()
}

function getDomTheme(): Theme {
  const attr = document.documentElement.getAttribute("data-theme")
  return attr === "dark" ? "dark" : "light"
}

function getServerTheme(): Theme {
  return "light"
}

// hydrated 플래그도 외부 스토어 패턴으로 처리 — 서버에선 false, 클라이언트 첫 커밋에서 true로 풀린다.
// 값이 한 번만 바뀌면 되므로 subscribe는 noop.
const noopSubscribe = () => () => {}
const getHydratedClient = () => true
const getHydratedServer = () => false

export function ThemeProvider({ children }: { children: ReactNode }) {
  // DOM `data-theme`을 외부 스토어로 구독한다. theme-init.js가 first paint 전에 세팅한 값이 자동 반영되고
  // useEffect 안에서 setState를 호출하지 않으므로 react-hooks/set-state-in-effect 룰을 회피한다.
  const theme = useSyncExternalStore(subscribeDomTheme, getDomTheme, getServerTheme)
  const hydrated = useSyncExternalStore(noopSubscribe, getHydratedClient, getHydratedServer)

  const setTheme = useCallback((t: Theme) => {
    document.documentElement.setAttribute("data-theme", t)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, t)
    } catch {
      /* private mode / disabled storage — ignore */
    }
  }, [])

  const toggle = useCallback(() => {
    setTheme(getDomTheme() === "dark" ? "light" : "dark")
  }, [setTheme])

  return <Ctx.Provider value={{ theme, hydrated, toggle, setTheme }}>{children}</Ctx.Provider>
}

export function useTheme(): ThemeCtx {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>")
  return ctx
}
