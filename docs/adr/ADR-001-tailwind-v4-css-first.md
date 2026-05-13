---
status: Accepted
date: 2026-05-13
deciders: 백요한, Claude Code
session: 2026-05-13 세션 2 (Claude Design v2 풀스택 변환)
---

# ADR-001 — Tailwind v4 CSS-first 채택, tailwind.config.ts 안 만듦

## 맥락

Phase 2 시작 시점에 v2 디자인 토큰 시스템을 어떻게 통합할지 결정 필요. 프로젝트는 이미 `tailwindcss@^4` + `@tailwindcss/postcss@^4` 의존성 보유 (`package.json`), 다만 `tailwind.config.ts`는 부재. 사용자 메시지 첫 요청에는 "globals.css + tokens.css + tailwind.config.ts → v2 토큰 적용"이라고 명시되어 있어서 v3 패턴 가정.

검토 시점에 확인한 사실:

- Tailwind v4 (4.2.4)는 **CSS-first 설계**. `@import "tailwindcss"` 가 `@layer theme, base, components, utilities` 를 자동 등록하고, `@theme` 디렉티브가 사용자 정의 토큰을 받아 **Tailwind 유틸 + CSS 변수 양쪽으로 동시 emit**.
- v4 네임스페이스 규칙: `--color-*` → `bg-*`/`text-*`/`border-*` 자동 생성, `--font-*` → `font-*`, `--text-*` → `text-*` 사이즈, `--shadow-*` → `shadow-*` 등.
- `tailwind.config.ts`/`.js`는 v4에서 **레거시 호환 모드**로만 지원되며, CSS-first가 표준 권장.

## 결정

**`tailwind.config.ts`를 만들지 않고, `src/app/globals.css` 의 `@theme { ... }` 디렉티브에 모든 디자인 토큰을 등록한다.**

구체적 구현:

1. `@theme` 블록에 `--color-bg`, `--color-ink`, `--color-accent`, `--color-line`, `--color-shadow-ink`, `--color-footer-*`, `--font-sans/en/mono/serif`, `--text-*`, `--shadow-brutal*` 등 모든 토큰 등록
2. `:root` alias 블록에 `--bg`, `--ink`, `--line`, `--shadow` 같은 짧은 이름을 `var(--color-*)`로 매핑 — 기존 컴포넌트의 inline style `style={{ background: "var(--bg)" }}` 호환 유지
3. 다크모드는 `@media (prefers-color-scheme: dark) :root:not([data-theme="light"])` + `[data-theme="dark"]` 두 블록에서 `--color-*` override

## 대안

| 대안 | 사유 / 기각 사유 |
|---|---|
| (A) `tailwind.config.ts` 작성 (v3 호환 모드) | v4 표준 패턴이 아니라 미래 마이그레이션 부담. 토큰을 두 곳(.ts + globals.css)에 정의해야 해서 정합성 위험. 사용자 권장 옵션에서 "비권장"으로 명시. |
| (B) `src/styles/tokens.css` 유지 + globals.css에서 import | 토큰이 2개 파일로 흩어져 정합화 부담. v4 `@theme` 의 Tailwind 유틸 자동 emit 혜택 못 받음. |
| (C) Tailwind 유틸 없이 순수 CSS 변수만 | Phase 3 이후 Tailwind 유틸 사용 증가 예상. 미래 옵션 닫음. |

## 결과

- ✅ `globals.css` 단일 파일에 모든 디자인 시스템 표현 — 컴포넌트는 `var(--ink)` 또는 `text-ink` Tailwind 유틸 어느 쪽이든 사용 가능
- ✅ `src/styles/tokens.css` 삭제 → 중복 정의 제거
- ✅ v4 표준 권장 패턴이라 향후 4.x 업그레이드 호환성 보장
- ⚠️ 컴포넌트 inline style에서 `var(--ink)` 직접 호출이 많은 상태가 유지됨 — 점진적으로 Tailwind 유틸로 마이그레이션 가능하지만 강제 안 함
- 📝 [CLAUDE.md](../../CLAUDE.md) 컬러 토큰 표가 `@theme` 블록을 정합 기준으로 명시
