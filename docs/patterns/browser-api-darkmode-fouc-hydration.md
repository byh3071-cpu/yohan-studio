---
pattern: 다크모드 FOUC 방지 + SSR Hydration 안전 (Next.js App Router + React 19)
category: browser-api
discovered: 2026-05-13
source_project: yohan-studio
source_devlog: docs/log/2026-05-13.md (세션 2 — Claude Design v2 풀스택 변환)
source_adr: docs/adr/ADR-002-dark-mode-architecture.md
source_troubleshooting: docs/troubleshooting/001-hydration-mismatch-and-script-warning.md
tags: [next.js, react-19, dark-mode, ssr, hydration, fouc, theme]
---

# 패턴 — 다크모드 FOUC 방지 + SSR Hydration 안전

## 증상

다크모드를 가진 Next.js App Router (또는 다른 SSR 프레임워크) 앱에서 동시에 만족하기 어려운 3가지:

1. **FOUC (Flash of Unstyled Content)**: 첫 paint에서 라이트 → 다크로 깜빡임
2. **SSR/CSR hydration mismatch**: 서버 마크업 ↔ 클라이언트 첫 렌더 불일치
3. **외부 변경 자동 감지**: DevTools에서 `data-theme` 변경, 시스템 다크모드 토글 등

## 원인

- 서버는 사용자의 localStorage / `prefers-color-scheme` / URL 파라미터를 알 수 없음 → 어떤 테마를 가정할지 모름
- 클라이언트는 첫 paint에 빈 `<html>` 받으면 라이트 가정 → CSS 변수 변경 시 깜빡임
- React 컴포넌트 트리 안의 `<script>` 태그는 hydration 사이클에 끌려가 React 19 워닝 발생
- 클라이언트 전용 상태(localStorage)를 useState lazy initializer로 읽으면 SSR과 다른 값 → mismatch

## 해결 — 3-Layer 아키텍처

### Layer 1: theme-init 인라인 스크립트 (`next/script beforeInteractive`)

body 파싱 전에 실행되어 `<html data-theme>` 속성 셋팅. CSS variable이 첫 paint부터 올바른 톤.

```tsx
// app/layout.tsx
import Script from "next/script"

const THEME_INIT_SCRIPT = `
try {
  var params = new URLSearchParams(location.search);
  var fromUrl = params.get('theme');
  var fromUrlValid = (fromUrl === 'dark' || fromUrl === 'light') ? fromUrl : null;
  var stored = localStorage.getItem('app-theme');
  var storedValid = (stored === 'dark' || stored === 'light') ? stored : null;
  var fromSys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  var theme = fromUrlValid || storedValid || fromSys;
  document.documentElement.setAttribute('data-theme', theme);
  if (fromUrlValid) localStorage.setItem('app-theme', fromUrlValid);
} catch (e) {}
`

// in root layout body:
<Script id="theme-init" strategy="beforeInteractive">{THEME_INIT_SCRIPT}</Script>
```

핵심: `strategy="beforeInteractive"` 가 head로 hoist → React 트리 밖에서 실행 → 워닝 없음.

### Layer 2: ThemeProvider (`useSyncExternalStore` + MutationObserver)

DOM의 `data-theme` 을 단일 진실 소스로 구독. React state는 메모리에 두 번째 진실을 두지 않음.

```tsx
"use client"
import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react"

type Theme = "light" | "dark"

function subscribeDomTheme(callback: () => void) {
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] })
  return () => observer.disconnect()
}
function getDomTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light"
}
function getServerTheme(): Theme {
  return "light"  // SSR 가정값 고정
}

const Ctx = createContext<{ theme: Theme; toggle: () => void } | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribeDomTheme, getDomTheme, getServerTheme)
  const toggle = () => {
    const next = getDomTheme() === "dark" ? "light" : "dark"
    document.documentElement.setAttribute("data-theme", next)
    try { localStorage.setItem("app-theme", next) } catch {}
  }
  return <Ctx.Provider value={{ theme, toggle }}>{children}</Ctx.Provider>
}
```

핵심: `getServerTheme` 가 항상 `'light'` 반환 → SSR HTML과 클라이언트 첫 hydration 모두 light 가정 → mismatch 0건. mount 후 store가 자동으로 DOM 실제 값 반영.

### Layer 3: 토글 버튼 hydrated 가드 (선택)

서버 마크업과 첫 클라이언트 렌더가 모두 light 가정이라, ☾ 글리프로 시작 → mount 후 ☀로 바뀌면 1프레임 깜빡임. 시각적 깜빡임도 싫으면 placeholder 패턴:

```tsx
"use client"
import { useEffect, useState } from "react"
import { useTheme } from "./ThemeProvider"

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  if (!hydrated) {
    return <button aria-hidden style={btnStyle}>·</button>
  }
  const isDark = theme === "dark"
  return (
    <button onClick={toggle} aria-label={isDark ? "라이트로" : "다크로"} style={btnStyle}>
      {isDark ? "☀" : "☾"}
    </button>
  )
}
```

### CSS — 두 가지 트리거 동시 지원

```css
:root {
  --bg: #ffffff;
  --ink: #0a0a0a;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #0a0a0a;
    --ink: #ffffff;
  }
}

[data-theme="dark"] {
  --bg: #0a0a0a;
  --ink: #ffffff;
}
```

- 시스템 다크 + 사용자 미설정 → 첫 `@media` 매치 → 자동 다크
- 사용자가 `?theme=light` 또는 토글로 light 락 → 첫 블록 매치 실패 → 라이트
- 사용자가 dark 명시 → `[data-theme="dark"]` 매치 → 다크 (specificity로 `@media` 이김)

`<html suppressHydrationWarning>` 명시 — `<html data-theme>` 가 서버는 비어있고 init script가 채우는 의도된 mismatch.

## 적용 조건

- ✅ Next.js App Router (Next.js 13+, 16 검증)
- ✅ React 18+ (`useSyncExternalStore` 요구)
- ✅ CSS 변수 기반 디자인 토큰
- ⚠️ Pages Router도 적용 가능하나 `_document.js` + `next/script` 통합 패턴이 약간 다름
- ⚠️ `cookies-based` 서버 분기가 필요한 경우(예: 인증 + 사용자별 영구 저장)는 미들웨어 + RSC 경로 추가 검토 필요

## 검증 체크리스트

- [ ] dev에서 새로고침 시 깜빡임 없는지
- [ ] DevTools Console에 hydration / script tag 워닝 없는지
- [ ] DevTools에서 `<html data-theme>` 직접 수동 변경 시 UI 자동 반영되는지
- [ ] 시스템 다크모드 토글 시 (사용자 미설정 상태) 자동 전환되는지
- [ ] `?theme=dark` URL 접근 시 localStorage 저장 + 다음 방문에도 유지되는지
- [ ] 시크릿 모드 / localStorage 비활성 환경에서 에러 없이 시스템 fallback 작동하는지

## 안티패턴 (피할 것)

- ❌ `useState(() => readBrowser())` lazy init — SSR/CSR mismatch
- ❌ `<script dangerouslySetInnerHTML>` 컴포넌트 트리 안 — React 19 워닝
- ❌ `useState('light') + useEffect mount sync` — 첫 paint 깜빡임
- ❌ React state만 사용하고 DOM은 안 쓰기 — 외부 변경(DevTools) 미감지
- ❌ `suppressHydrationWarning` 을 자식 노드에 광범위 적용 — 진짜 mismatch 버그 가림
