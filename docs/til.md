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
- 공개 라우트를 추가하면 구현 파일만 만들지 말고 **sitemap, `llms.txt`, 아키텍처 라우트 표**를 같은 작업 단위에서 동기화해야 검색/AEO/문서 정합성이 깨지지 않는다. (세션 5)
- Notion MCP `create_pages` 입력은 Notion UI 속성 타입보다 **커넥터 schema validation 메시지**가 우선이다. `multi_select`라도 현재 커넥터가 string을 요구하면 JSON 문자열 형태로 전달해야 한다. (세션 5)

## 2026-05-13 (세션 4 — Claude Design v2 풀스택 변환)

- **Tailwind v4는 CSS-first 설계**: `tailwind.config.ts` 없이 `@theme { --color-bg: ... }` 디렉티브가 표준. `--color-*` 등록 시 자동으로 `bg-*`/`text-*`/`border-*` 유틸 + CSS 변수 양쪽 emit. v3 config.ts는 legacy 호환 모드일 뿐. (세션 4)
- **React 19 + Next.js 16에서 inline script는 `next/script strategy="beforeInteractive"` 사용**: 컴포넌트 트리 안의 `<script>` 태그는 "Encountered a script tag" 워닝 + hydration 사이클에 끌려간다. head로 hoist되어 body 파싱 전 실행되는 next/script만 안전. (세션 4)
- **`prefers-color-scheme` + `[data-theme]` 우선순위 패턴**: `@media (prefers-color-scheme: dark) :root:not([data-theme="light"])` 구문으로 "사용자가 명시 `light` 락하지 않은 한 시스템 다크 따름" + 별도 `[data-theme="dark"]` 블록으로 명시 override. 두 블록의 토큰 값이 동일하면 OK. (세션 4)
- **Tailwind v4 `md:` prefix = 768px**: 디자인 spec이 720일 때 globals.css 미디어쿼리도 767로 동기화하지 않으면 721-767 구간에서 Hero는 1컬럼인데 `.hero-meta { order: -1 }` 가 적용 안 되는 갭이 생긴다. spec 픽셀 정합화 우선. (세션 4)
- **flex/grid row 안 한글 두 글자 라벨은 강제 줄바꿈 위험**: `whiteSpace: normal` 기본값에서 컨테이너가 좁아지면 "역할", "스택" 같은 라벨이 세로로 갈라진다. `whiteSpace: nowrap` + `flexShrink: 0` 둘 다 필요. (세션 4)
- **`<html data-theme="dark">` 자식에 같은 attribute를 강제하면 sub-scope에서만 다크 토큰 활성** — 예: Footer만 항상 검정 톤. 다만 더 깔끔한 건 `--footer-bg`/`--footer-text` 같은 별도 토큰을 라이트/다크 양쪽에서 정의하는 분리 방식. attribute 강제는 자식 컴포넌트가 토큰 변화에 반응 못 함. (세션 4)
- **MDX 펜스 ```\`\`\`lang``` 의 lang regex는 `[\w+#-]+` 패턴**: `\w+` 만 쓰면 `objective-c`/`c++`/`f#` 같은 lang에서 잘림. `className="language-x"` 에서 추출할 때 하이픈/플러스/샵 명시. (세션 4)
- **`useSearchParams` 사용 컴포넌트는 `<Suspense>` 경계 필수**: Next.js 16 빌드에서 dynamic rendering 강제 또는 build error. 부모(서버 컴포넌트)에서 `<Suspense fallback={null}>` 로 감싸면 `/blog` 가 정적 prerender 유지 + URL 쿼리 sync 모두 가능. (세션 4)
- **`router.replace(url, { scroll: false })` 패턴**: 필터/검색 상태를 URL 쿼리로 sync할 때, scroll 점프 없이 URL만 업데이트. browser history도 push 아닌 replace라 뒤로 가기 폭증 안 함. (세션 4)
- **IntersectionObserver `entries` 콜백은 "변한 항목"만 받음**: 현재 화면에 보이는 전체가 아님. ToC active heading 추적 시 `entries.filter(isIntersecting)` 만 보면 빠른 스크롤에서 active dot이 튄다. 별도 visible Set을 유지하는 패턴이 안정. (세션 4 / Codex 리뷰)

## 2026-05-20 (세션 5 — Phase 2 AI'm OS Edition / subagent-driven 실행)

- **`writing-plans` 스킬은 task 단위 commit + 인라인 코드 블록 필수**: 계획에 "Similar to Task N" 같은 참조를 두면 subagent 가 디스패치 순서대로 안 읽힐 때 fail. 같은 코드라도 매 task 별로 인라인 풀-쓰기. (세션 5)
- **`subagent-driven-development` 의 spec+quality 리뷰는 mechanical paste 태스크에서 비용 대비 효과 낮음**: 33 task × 3 reviewer = 99 agent 호출. 코드 블록이 plan 에 통째 박혀 있을 때는 "did paste copy correctly?" 만 검증하면 됨. 한 reviewer 로 combined 가능 (skill 약간 deviate). (세션 5)
- **`useSearchParams` 사용 컴포넌트 `<Suspense>` 누락 시 Next 16 build error**: server page 에서 `<Suspense fallback={null}><Client /></Suspense>` 로 감싸야 정적 prerender 유지. (세션 5, Plan 011 Showroom)
- **`Record<Area, string>` 인덱싱 시 callback param 에 `(a: string)` 명시하면 strict mode 가 widen 으로 잡거나 통과시키지만 안정성 잃음**: `.map((a, i) =>` 형태로 implicit Area 추론 유지. `(a: string, i: number)` 추가는 spec deviation. (세션 5, Plan 012 ResultPanel)
- **`.env.example` 도 프로젝트 `.gitignore` `.env*` 패턴에 매칭되어 무 트래킹**: 환경 변수 의존하는 feature 출시 시 `.env.example` 커밋 가정 금지. 별도 핸드오프 문서나 README 변경으로 키 전달. (세션 5, Plan 013 NEXT_PUBLIC_CONTACT_FORM_URL)
- **subagent 가 `git stash apply` 실행하면 사용자 WIP 가 working tree 로 빠져나옴**: review subagent 에 git 권한 줄 때 stash/branch 조작 명시 금지. 발견 시 `git restore .` 로 working tree 복원 (stash 는 살아있음). (세션 5)
- **subagent 디스패치 중 사용자가 branch 를 reorg 하면 commit 이 의도치 않은 브랜치에 떨어진다**: 매 implementer 디스패치 전 `git branch --show-current` 확인 + prompt 안에 "must be on X branch, else BLOCKED" 가드 삽입. cherry-pick 으로 복귀 가능하지만 사전 방지가 안전. (세션 5)
- **SVG 레이더 차트는 외부 라이브러리 없이 `axisPoint(i, n, r) = [CX + r·cos(θ), CY + r·sin(θ)], θ = 2π·i/n - π/2` 패턴으로 30줄 안에 그릴 수 있다**: recharts/d3 의존성 추가 전에 polygon points 직접 계산 검토. (세션 5, ScoreRadar)
