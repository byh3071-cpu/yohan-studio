---
status: Accepted
date: 2026-05-13
deciders: 백요한, Claude Code
session: 2026-05-13 세션 2 (Claude Design v2 풀스택 변환)
---

# ADR-002 — 다크모드 아키텍처 (theme-init + useSyncExternalStore)

## 맥락

`design/v2/tokens.css` + `theme-init.js` 스펙이 요구하는 다크모드 시스템:

- 우선순위: **URL `?theme=` → localStorage → `prefers-color-scheme` → light**
- **FOUC 없음**: 첫 paint부터 올바른 테마 색
- **SSR/CSR hydration 일치**: Next.js 16 App Router + React 19 strict mode 환경
- 토글 버튼: ☾/☀ 글리프 + 모든 자식 컴포넌트에 자동 반영

Next.js 16 + React 19에서 첫 시도(`<script dangerouslySetInnerHTML>` + `useEffect mount sync`)는 두 가지 에러 동시 발생:

1. **Console Error**: "Encountered a script tag while rendering React component. Scripts inside React components are never executed when rendering on the client." (React 19 워닝)
2. **Hydration mismatch**: 서버는 `light` 가정으로 ThemeToggle을 ☾ + "다크모드로 전환" 렌더, 클라이언트는 init script가 셋팅한 `data-theme="dark"` 읽어 ☀ + "라이트모드로 전환" → 마크업 불일치

## 결정

3-레이어 분리 아키텍처:

### Layer 1 — `theme-init` 인라인 스크립트 (`next/script beforeInteractive`)

```ts
// src/app/layout.tsx
const THEME_INIT_SCRIPT = `
try {
  var params = new URLSearchParams(location.search);
  var fromUrl = params.get('theme');
  var fromUrlValid = (fromUrl === 'dark' || fromUrl === 'light') ? fromUrl : null;
  var stored = localStorage.getItem('yohan-theme');
  var storedValid = (stored === 'dark' || stored === 'light') ? stored : null;
  var fromSys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  var theme = fromUrlValid || storedValid || fromSys;
  document.documentElement.setAttribute('data-theme', theme);
  if (fromUrlValid) localStorage.setItem('yohan-theme', fromUrlValid);
} catch (e) {}
`

<Script id="theme-init" strategy="beforeInteractive">{THEME_INIT_SCRIPT}</Script>
```

`strategy="beforeInteractive"` 가 head로 hoist해서 React 렌더 트리 밖에서 body 파싱 전 실행. FOUC 차단.

### Layer 2 — `ThemeProvider` (`useSyncExternalStore` + MutationObserver)

```ts
// 서버 스냅샷 = 항상 'light'. SSR HTML과 클라이언트 hydration 첫 렌더 일치.
const theme = useSyncExternalStore(subscribeDomTheme, getDomTheme, getServerTheme)
```

- `subscribeDomTheme`: MutationObserver로 `<html data-theme>` 변경 구독
- `getDomTheme`: `document.documentElement.getAttribute('data-theme')` 읽음
- `getServerTheme`: 항상 `'light'` 반환
- React state 대신 DOM을 단일 진실 소스로 사용 → setState in effect 없음

### Layer 3 — `ThemeToggle` (`hydrated` 가드)

```tsx
if (!hydrated) {
  return <button aria-hidden tabIndex={-1} style={{ ...base, cursor: "default" }}>·</button>
}
// 진짜 글리프/aria-label 렌더
```

서버 + 클라이언트 첫 렌더 모두 placeholder → hydration 일치. mount 후 진짜 토글 표시.

## 대안

| 대안 | 기각 사유 |
|---|---|
| (A) `useState(() => readInitial())` lazy initializer | 서버에선 document 없어 'light' 반환, 클라이언트는 'dark' → mismatch |
| (B) `useState('light')` + `useEffect mount sync` | 첫 paint에 ☾로 잠시 보이다가 ☀로 깜빡임 (1프레임 flash) |
| (C) `dangerouslySetInnerHTML` 인라인 script | React 19 워닝, hydration 사이클에 끌려감 |
| (D) `next-themes` 패키지 | 외부 의존성 추가, URL `?theme=` 우선순위 커스텀 어려움 |
| (E) cookie + middleware로 서버에서 theme 결정 | App Router에서 RSC가 cookie 읽고 `<html data-theme>` 렌더 가능하지만, prefers-color-scheme 자동 따라가기 어려움 (서버는 시스템 모름) |

## 결과

- ✅ FOUC 없음: body 파싱 전 `data-theme` 셋팅 → CSS variable이 첫 paint부터 다크 톤
- ✅ Hydration 일치: 서버/클라이언트 첫 렌더가 모두 placeholder/light 가정 → mismatch 0건
- ✅ MutationObserver 구독: DevTools에서 직접 `data-theme` 바꿔도 자동 반영. 미래에 외부 스크립트가 테마 바꿔도 동기화.
- ✅ URL `?theme=` 우선순위: 공유 가능 링크 + LS 영구 저장. 시스템 다크 fallback도 유지.
- ⚠️ `useSyncExternalStore` 도입으로 학습 비용 +1. React 18+ 표준 API라 호환성 안전.
- 📝 [src/components/layout/ThemeProvider.tsx](../../src/components/layout/ThemeProvider.tsx), [layout.tsx](../../src/app/layout.tsx#L11-L25), [docs/troubleshooting/001-hydration-mismatch-and-script-warning.md](../troubleshooting/001-hydration-mismatch-and-script-warning.md)
