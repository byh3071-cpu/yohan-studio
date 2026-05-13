---
date: 2026-05-13
stack: Next.js 16.2.4 (Turbopack), React 19.2.4, TypeScript strict
session: 2026-05-13 세션 2 (Claude Design v2 풀스택 변환)
severity: high (콘솔 에러 + UX 깜빡임)
---

# TS-001 — React 19 hydration mismatch + script tag warning (다크모드 첫 구현)

## 증상

다크모드 ThemeProvider 첫 구현 후 dev 모드에서 두 에러 동시 발생:

### 에러 1 — Console Error

```
Encountered a script tag while rendering React component. Scripts inside
React components are never executed when rendering on the client. Consider
using template tag instead.
  src/app/layout.tsx (61:9) @ RootLayout
  >  <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
```

### 에러 2 — Hydration Failed

```
Hydration failed because the server rendered text didn't match the client.
<button
+  aria-label="라이트모드로 전환"
-  aria-label="다크모드로 전환"
   ...
>
  <span aria-hidden>
+    ☀
-    ☾
```

ThemeToggle에서 글리프/aria-label이 서버 ↔ 클라이언트 불일치.

## 원인

### 원인 1 — `<script dangerouslySetInnerHTML>` 가 React 트리 안에 위치

React 19부터 inline script element를 컴포넌트 렌더 결과로 두면, 클라이언트 hydration/re-render 시 script가 실행되지 않는다는 경고를 던진다 (React 17까지는 silent). 우리 케이스는 SSR HTML에 inline script가 들어가서 body 파싱 전 한 번만 실행되면 충분했지만, React 19 워닝 룰은 트리 안의 script 자체를 비권장.

### 원인 2 — ThemeProvider 초기 state의 SSR/CSR 분기

```ts
function readInitial(): Theme {
  if (typeof document === "undefined") return "light"     // 서버
  const attr = document.documentElement.getAttribute("data-theme")
  if (attr === "dark" || attr === "light") return attr   // 클라이언트
  // ...
}
const [theme, setThemeState] = useState<Theme>(readInitial)
```

- **서버 렌더**: `document` 없음 → `'light'` 반환 → SSR HTML은 light 가정으로 ThemeToggle 렌더 (☾)
- **클라이언트 hydration**: theme-init script가 이미 `data-theme="dark"` 셋팅한 상태 → `readInitial`이 `'dark'` 반환 → React는 ☀로 렌더하려 함
- React가 서버 마크업(☾)과 클라이언트 첫 렌더(☀)를 비교 → mismatch.

## 해결

3가지 변경을 동시에 적용:

### 변경 1 — `next/script beforeInteractive`로 head hoist

```tsx
// src/app/layout.tsx
import Script from "next/script"

<Script id="theme-init" strategy="beforeInteractive">
  {THEME_INIT_SCRIPT}
</Script>
```

Next.js가 head에 inline 삽입 → React 컴포넌트 트리 밖 → 워닝 사라짐.

### 변경 2 — ThemeProvider useState 초기값을 항상 light 고정

```ts
const [theme, setThemeState] = useState<Theme>("light")    // 서버/클라 모두 동일
const [hydrated, setHydrated] = useState(false)

useEffect(() => {
  const attr = document.documentElement.getAttribute("data-theme")
  if (attr === "dark" || attr === "light") setThemeState(attr)
  setHydrated(true)
}, [])
```

서버 SSR과 클라이언트 첫 렌더가 모두 `'light'` 가정 → mismatch 0건. mount 후 DOM에서 sync.

(추가 강화: 이후 `useSyncExternalStore` + MutationObserver 패턴으로 리팩토링. ADR-002 참고)

### 변경 3 — ThemeToggle에 hydrated 가드

```tsx
if (!hydrated) {
  return <button aria-hidden style={{ ...base, cursor: "default" }}>·</button>
}
return <button aria-label={isDark ? "라이트모드로 전환" : "다크모드로 전환"}>
  <span aria-hidden>{isDark ? "☀" : "☾"}</span>
</button>
```

hydration 완료 전엔 placeholder만 렌더 → 글리프/aria 불일치 원천 차단.

추가로 `<html suppressHydrationWarning>` 명시 — `<html data-theme>` 속성이 서버는 빈 채로, 클라이언트는 init script가 셋팅하는 패턴이라 React가 이 한 노드의 mismatch는 경고 안 하게.

## 교훈

1. **React 19에서 inline script는 `next/script beforeInteractive` 사용**. `<script>{js}</script>` 또는 `<script dangerouslySetInnerHTML>` 패턴 모두 hydration 사이클에 끌려 워닝 대상.
2. **클라이언트에서만 결정되는 상태(localStorage, system pref, URL)는 SSR 가정값으로 첫 렌더 통일**. mount 후 sync하는 게 React 표준 패턴. lazy initializer `useState(() => readBrowser())` 는 SSR에서 fallback을 반환하는 만큼 클라이언트도 같은 fallback으로 시작해야 mismatch 없음.
3. **DOM attribute를 단일 진실 소스로 쓰는 패턴**: `useSyncExternalStore` + MutationObserver 조합이 hydration 안전 + 외부 변경(DevTools, 다른 스크립트) 자동 감지의 최적 형태. React state 두 곳(메모리 + DOM) 동기화 부담 없음.
4. **`suppressHydrationWarning`은 `<html>`/`<body>` 같은 root에서 의도적 mismatch만 허용**. 자식 노드엔 영향 없음. 남발하면 진짜 버그를 가린다.

## 출처 / 관련 문서

- [ADR-002 다크모드 아키텍처](../adr/ADR-002-dark-mode-architecture.md)
- [src/app/layout.tsx](../../src/app/layout.tsx)
- [src/components/layout/ThemeProvider.tsx](../../src/components/layout/ThemeProvider.tsx)
- [src/components/layout/ThemeToggle.tsx](../../src/components/layout/ThemeToggle.tsx)
- 패턴 사전: `docs/patterns/browser-api-darkmode-fouc-hydration.md`
