---

## id: design-claude-cursor-workflow
date: 2026-04-25
tags: [design, claude, cursor, workflow]

# Claude Design → Cursor 연동 워크플로우

Claude Design 산출물을 이 프로젝트에 넣을 때의 실전 규칙이다.

## 실전 추천


| 저장할 것         | 위치                           | 이유                             |
| ------------- | ---------------------------- | ------------------------------ |
| 스크린샷 (전체 페이지) | `docs/design/`               | Cursor에 붙이며 "이렇게 맞춰줘" 레퍼런스로 사용 |
| 생성 코드 (있을 때)  | `src/components/` 등 실제 코드 트리 | 컴포넌트 코드를 그대로 재사용·리팩터           |


## 실제 워크플로우

1. Claude Design에 **Copy code** / **Export**가 있으면 코드를 복사한다.
2. 코드가 있으면 Cursor에 **"이 코드 기준으로 컴포넌트 나눠줘"**처럼 요청한다.
3. 시각 목업만 있고 코드가 없으면: 스크린샷을 `docs/design/`에 저장한 뒤, 채팅에 이미지를 붙이고 **"이 디자인대로 구현해줘"**라고 한다.

## 스크린샷 파일명 예시

검색·구분이 쉽게 짧은 영문 케밥/스네이크 스타일을 쓴다.

- `landing-hero.png`
- `landing-about.png`
- `landing-full.png`
- `portfolio-grid.png`
- `header-footer.png`
- `mobile-375.png`

## 한 줄 요약

**코드가 나오면 코드 우선, 없으면 스크린샷. 둘 다 있으면 둘 다 저장한다.**

## v2 → Next.js 이관 규칙 (요약)

Claude Design에서 받은 React 코드를 이 레포에 넣을 때:

| 규칙 | 설명 |
|------|------|
| 확장자 | `.jsx` → `.tsx`, 타입은 `React.CSSProperties` 등으로 명시 |
| 파일명 | `V2` 접두사 제거 (`Hero.tsx`, `Header.tsx` …) |
| 클라이언트 | `"use client"`는 `useState`·폼·브라우저 API 등 **필요할 때만** |
| 스타일 | 인라인 스타일 유지 가능 + 반응형은 Tailwind 보조 클래스 병행 |
| 토큰 | 색·보더는 `src/styles/tokens.css`의 CSS Variables (`var(--ink)` …) |
| 배치 | 섹션은 `src/components/sections/`, 레이아웃은 `layout/`, 포트폴리오 그리드는 `portfolio/` |
| 데이터 | 반복 카드 문구는 `src/data/*.ts`로 분리해 Phase 2에서 교체 용이하게 |

원본 UI 킷은 보관용으로 `src/components/ui_kits/`에 둘 수 있으나, **라우트에서 import하는 단일 소스는 위 구조**로 통일한다.