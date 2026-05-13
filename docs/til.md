# Today I Learned

> 한 줄씩 추가. 출처 세션은 `(YYYY-MM-DD)` 또는 `(YYYY-MM-DD #N)` 표기.

## 2026-05-13

- `useSyncExternalStore` 는 React state 만이 아니라 **DOM attribute**, **localStorage**, **window 객체** 등 외부 소스를 단일 소스로 구독하는 정식 API다. `subscribe` + `getSnapshot` + `getServerSnapshot` 3개 함수로 SSR/CSR 양쪽 hydration 안전. (세션 3)
- React `useEffect` 안의 setState는 cascading render 를 일으켜 `react-hooks/set-state-in-effect` 룰의 차단 대상. 콜백(observer/timer/event)에서의 setState는 외부 이벤트 응답이라 허용. effect **본문 동기 호출**만 룰에 걸린다. (세션 3)
- prop 변경 시 자식 state 를 초기화하는 패턴은 `useEffect`가 아니라 **render 중 setState + prev-prop 비교**가 React 공식 가이드. `if (current !== prev) { setPrev(current); setChildState(initial) }`. 같은 컴포넌트에서 호출 시 React 가 commit 전에 자동 batch. (세션 3)
- `next/image` 의 `priority` 속성은 LCP(Largest Contentful Paint) 후보 이미지에 명시해야 자동 `loading="eager"` + `fetchpriority="high"` 가 적용된다. 카드 리스트의 첫 카드(`index === 1`)에만 거는 게 표준 패턴. (세션 3)
- 외부에 배포된 데모/포트폴리오 페이지에 **실명 등 개인정보**가 노출돼 있으면, 익명화 재배포 전까지 포트폴리오 카드 demo URL 을 즉시 제거하는 게 안전. 코드 주석에 사유와 복원 조건을 남겨야 다음 세션에서 실수로 재등록하지 않는다. (세션 3)
- JSX 자식에 `// 텍스트` 가 그대로 노출되면 `react/jsx-no-comment-textnodes` 룰이 차단 — `{`\`// ${value}\``}` 또는 `{"// 텍스트"}` 로 텍스트노드임을 명시. (세션 3)
- ES2019 부터 `try { ... } catch { ... }` (binding 생략) 가능 — unused 변수 경고 회피용으로 `catch (e)` → `catch` 로 단순화. (세션 3)
