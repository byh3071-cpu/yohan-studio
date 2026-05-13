---
패턴명: react-hooks/set-state-in-effect 해결 — 외부 스토어/렌더 시점 setState 분리
카테고리: state
발견일: 2026-05-13
출처프로젝트: Yohan Studio (Phase 2 린트 클린업)
출처DevLog: docs/log/2026-05-13.md (세션 3)
태그: [react, react-19, eslint, react-hooks, hydration, ssr]
---

## 증상

ESLint 룰 `react-hooks/set-state-in-effect` 가 `useEffect` 본문에서 `setState`를 동기 호출하는 코드를 에러로 차단:

> Calling setState synchronously within an effect body causes cascading renders that can hurt performance.

룰 자체는 [React 공식 You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) 가이드를 따른다. React 18 이상의 새 lint preset(`eslint-plugin-react-hooks` 5.x+)에 포함.

대표 케이스 3종:

1. **마운트 후 DOM 읽어 상태 sync** — 테마/언어/스크롤 위치 초기화
2. **마운트 후 외부 데이터 수집해 리스트 채움** — TOC, breadcrumbs, dynamic anchors
3. **prop 변경 시 자식 상태 리셋** — pathname 바뀌면 모달/메뉴 닫기

## 원인

`useEffect`는 외부 시스템과 React state를 **동기화**하기 위한 hook이다. setState로 다시 React 내부로 신호를 흘리면:

- 첫 렌더 → effect 실행 → setState → 두 번째 렌더 (cascading render)
- Concurrent rendering에서 첫 렌더가 버려질 수 있음 (불필요한 작업)
- 진짜 외부 이벤트와 React state의 책임 경계가 흐려짐

가이드는 "render 중에 계산할 수 있으면 계산해라" 또는 "외부 스토어면 `useSyncExternalStore`를 써라".

## 해결

### 케이스 A — DOM/외부 값을 단일 소스로 구독 → `useSyncExternalStore`

**문제 코드:**

```tsx
const [theme, setTheme] = useState<Theme>("light")
useEffect(() => {
  const attr = document.documentElement.getAttribute("data-theme")
  if (attr === "dark" || attr === "light") setTheme(attr) // ❌ flagged
}, [])
```

**해결:**

```tsx
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  })
  return () => observer.disconnect()
}
function getSnapshot(): Theme {
  const attr = document.documentElement.getAttribute("data-theme")
  return attr === "dark" ? "dark" : "light"
}
function getServerSnapshot(): Theme {
  return "light" // SSR fallback
}

const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
```

핵심:

- `getServerSnapshot` 으로 SSR/CSR 첫 렌더를 같은 값으로 고정 → hydration mismatch 회피
- `getSnapshot` 은 render 중에 호출되므로 **mutation 금지** (값만 반환)
- 외부 값이 바뀌면 `subscribe` 콜백 → React가 다시 `getSnapshot` 호출 → 자동 re-render

### 케이스 B — DOM 스캔 결과 캐싱 (idempotent mutation 허용)

스캔 중 DOM에 id를 부여해야 하면 멱등(idempotent)으로 만들고 `WeakMap` 캐시:

```tsx
const cache = new WeakMap<Element, TocItem[]>()

function getSnapshot(): TocItem[] {
  const article = document.querySelector(".mdx-content")
  if (!article) return EMPTY
  const cached = cache.get(article)
  if (cached) return cached

  const collected: TocItem[] = []
  for (const el of article.querySelectorAll<HTMLHeadingElement>("h2, h3")) {
    const id = el.id || slugify(el.textContent ?? "")
    el.id = id // 멱등: 이미 같은 id면 no-op
    collected.push({ id, ... })
  }
  cache.set(article, collected)
  return collected
}
```

`subscribe`의 `MutationObserver` 콜백에서 `cache.delete(article)` 후 callback() 호출하면 DOM 변경 시 새로 스캔.

### 케이스 C — prop 변경 시 자식 state 리셋 → render 중 setState

**문제 코드:**

```tsx
useEffect(() => {
  setOpen(false) // ❌ flagged
}, [pathname])
```

**해결:**

```tsx
const [open, setOpen] = useState(false)
const [prevPath, setPrevPath] = useState(pathname)

if (pathname !== prevPath) {
  setPrevPath(pathname)
  setOpen(false) // ✅ render 중 setState — React가 자동 batch
}
```

핵심:

- React는 render 중 같은 컴포넌트에 대한 setState는 즉시 처리하고 commit 전에 통합 → cascading render 아님
- 공식 가이드: [Adjusting some state when a prop changes](https://react.dev/learn/you-might-not-need-an-effect#adjusting-state-when-a-prop-changes)
- 단, **다른 컴포넌트**의 setState는 render 중 호출 금지

### 부가 — 이벤트 콜백에서의 setState는 OK

```tsx
useEffect(() => {
  const io = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting) setActiveId(entries[0].target.id) // ✅ 콜백이라 OK
  })
  // ...
}, [])
```

룰은 effect **본문(body)** 의 동기 setState만 차단. observer/timer/event listener 등의 콜백 setState는 외부 이벤트 응답이라 의도된 사용.

## 적용 조건

- React 18+ (`useSyncExternalStore` 사용 시)
- `eslint-plugin-react-hooks` 5.x+ 또는 동급 룰 적용 프로젝트
- SSR/CSR 동시 운영 시 `getServerSnapshot` 필수
- DOM mutation을 `getSnapshot` 안에서 한다면 반드시 **멱등성** 확보

## 안티패턴

- `// eslint-disable-next-line react-hooks/set-state-in-effect` 로 회피 — 룰이 가리키는 cascading render 비용은 여전히 발생
- `setHydrated(true)` 같은 "마운트 플래그" 도 룰에 걸리면 동일하게 `useSyncExternalStore(noopSubscribe, () => true, () => false)` 패턴으로 교체

## 참고

- React 공식: <https://react.dev/learn/you-might-not-need-an-effect>
- `useSyncExternalStore` API: <https://react.dev/reference/react/useSyncExternalStore>
- 본 패턴 적용 커밋: `9dbc4f2` (Yohan Studio, `chore: react-hooks/set-state-in-effect 및 JSX 텍스트노드 린트 정리`)
