# CLAUDE.md — yohan-studio

> 먼저 루트의 `AGENTS.md`를 공통 프로젝트 규칙으로 따른다.
> 이 파일은 Claude Code 전용 운영 규칙 + 현재 상태를 담는다.

## 프로젝트 개요

요한 스튜디오: 백요한의 개인 풀스택 플랫폼 (랜딩 + 블로그 + 포트폴리오 + 스토어)
바이브코딩으로 구축하는 1인 브랜드 웹사이트.
배포: <https://yohan-studio.vercel.app>

## 운영 체제: Antigravity IDE 듀얼 패널

- **Claude Code (좌)**: 메인 구현, 큰 리팩터링, UI/상태 흐름 수정
- **Codex (우)**: 코드 리뷰, 역검증, 빌드/테스트 확인, 버그 탐색
- 같은 파일 동시 수정 금지. 병렬 작업 필요 시 `git worktree` 사용.
- Codex 컨텍스트 20~30% 유지. 90% 근접 시 `/compact` 또는 `/fork`로 분리.

## MCP 개발 인프라

| MCP | 전송 | 용도 |
|---|---|---|
| playwright | stdio | 격리 Chromium UI 검증 — 클릭/스크린샷/콘솔 |
| playwright-extension | stdio | 로그인 세션 필요 화면 (Notion/GitHub 등) |
| context7 | HTTP | 최신 라이브러리 API 문서 실시간 조회 |
| notion-mcp | stdio | Notion Dev Log DB 직접 주입 |

⚠️ MCP "Connected" ≠ "Authenticated". 첫 API 호출로 검증 필수.
⚠️ CLI 인자에 시크릿 금지. env-var 상속 패턴 사용.

## 권장 검증 루프

1. Claude Code 구현 → 2. `npm run build` → 3. `npm test` → 4. Codex 리뷰/역검증 → 5. playwright UI 검증 → 6. 최종 build 통과 → 7. notion-mcp로 Dev Log 기록

---

## 현재 Phase: 2 (블로그 + SEO)

Phase 1 완료 (4/25): 랜딩 + 포트폴리오 Vercel 배포 완료.

### Phase 2 작업 큐

| # | 작업 | 상태 |
|---|---|---|
| ① | v2 디자인 마이그레이션 (Slate→Editorial) | ✅ 완료 |
| ② | MDX 블로그 시스템 — /blog, /blog/[slug] | ✅ 완료 |
| ③ | BlogCard + TagFilter + 검색 | ✅ 완료 |
| ④ | SEO — sitemap, robots, OG, JSON-LD, @vercel/og | ✅ 완료 |
| ⑤ | GA + Search Console | ✅ 완료 |
| ⑥ | Inter 폰트 적용 지점 | ✅ 완료 |
| ⑦ | /blog/[slug] 본문 디자인 | ✅ 완료 |
| ⑧ | 다크모드 시스템 (ThemeProvider + spec 토큰 정합) | ✅ 완료 |
| ⑨ | /blog 목록 BlogRowCard + URL 쿼리 + hover | ✅ 완료 |
| ⑩ | /design 라우트 (진화 + AI 분업 + 로드맵) | ✅ 완료 |

---

## 기술 스택

| 레이어 | 도구 | Phase |
|---|---|---|
| 프레임워크 | Next.js 16 (App Router) | 1 |
| 언어 | TypeScript (strict) | 1 |
| 스타일링 | Tailwind CSS + CSS Variables | 1 |
| 블로그 | MDX (next-mdx-remote/rsc) | 2 |
| DB | Supabase (PostgreSQL) | 3 |
| 결제 | Stripe | 3 |
| 자동화 | n8n | 4 |
| SEO | next-sitemap + @vercel/og + JSON-LD | 2 |
| 호스팅 | Vercel | 1 |

## 디자인 시스템 — v2 (Editorial × Soft Brutalism)

- **라이트 (기본)**: bg #F4F1EA, text #0A0A0A, primary #FF5C28
- **다크모드**: bg #0A0A0A, text #F1F5F9, primary #FF5C28
- **모서리**: rounded-none
- **보더**: 1.5px solid #000
- **그림자**: 4px 0 0 #000 (hard shadow)
- **그라디언트**: 없음
- **모바일 퍼스트**: 375px → sm → md → lg

### 컬러 토큰

> 정합 기준: [src/app/globals.css](src/app/globals.css) `@theme` 블록. 토큰 이름은 v4 네임스페이스(`--color-*`)에 맞춰 `bg-bg`, `text-ink`, `bg-accent` 등 Tailwind 유틸로도 노출된다. 컴포넌트는 alias `var(--bg)`, `var(--ink)` 도 사용 가능.

| 토큰 | 라이트 | 다크 |
|---|---|---|
| bg | #F4F1EA | #0A0A0A |
| surface | #EEEAE0 | #141414 |
| surface-2 | #E5E0D2 | #1F1F1F |
| ink (text) | #0A0A0A | #F4F1EA |
| ink-2 | #2B2723 | #DCD7CB |
| muted | #6B6357 | #968D7E |
| muted-2 | #968D7E | #6B6357 |
| accent (primary) | #FF5C28 | #FF5C28 |
| accent-ink | #0A0A0A | #0A0A0A |
| border | #0A0A0A | #F4F1EA |

> 그림자: `--shadow-brutal-sm` = `2px 2px 0 ink`, `--shadow-brutal` = `4px 4px 0 ink`, `--shadow-brutal-lg` = `6px 6px 0 ink`. 다크모드에선 ink 값이 반전된다.

### 타이포그래피

| 용도 | 폰트 | 로딩 |
|---|---|---|
| 한글 본문/제목 | Pretendard | next/font/local (woff2, src/styles/fonts/) |
| 영문 강조 | Inter | next/font/google |
| 코드 | JetBrains Mono | next/font/google |

## 코딩 규칙

- TypeScript strict mode, no `any`
- Server Component 우선, `"use client"` 최소한
- 컴포넌트: PascalCase.tsx, 유틸: camelCase.ts
- 경로: `src/components/{ui,layout,sections,blog,portfolio,store}/`
- MDX 콘텐츠: `src/content/blog/*.mdx`
- MDX 프론트매터: title, description, date, tags, category, thumbnail, published

## Phase 2 허용

✅ MDX 블로그 (src/content/blog/) | next-sitemap, robots.txt | @vercel/og | JSON-LD | GA gtag, GSC 메타태그 | 다크모드 토글 | 블로그 클라이언트 카운터

## Phase 2 금지

❌ Supabase/DB 연결 | Stripe/결제 | API Routes | n8n 웹훅 | 외부 API 호출 (GA/GSC 스크립트 제외)

---

## 📁 docs/ 폴더 구조

​
docs/
├── SSOT.md              # 프로젝트 전체 맥락 + 로드맵
├── ARCHITECTURE.md      # 풀스택 구조도 + 컴포넌트 트리 + DB 스키마
├── adr/                 # 아키텍처 결정 기록
│   └── ADR-001-제목.md  # 포맷: 맥락 → 결정 → 대안 → 결과
├── log/                 # 세션별 작업 로그
│   └── YYYY-MM-DD.md    # 날짜 / 작업 내용 / 변경 파일 / 이슈
├── troubleshooting/     # 에러 해결 기록
│   └── 001-증상.md      # 증상 → 원인 → 해결 → 교훈
├── changelog.md          # 스키마/API 변경 이력
└── til.md               # Today I Learned (한 줄씩 추가)

---

## 🔄 기록 자동화 규칙

### 작업 로그 (docs/log/)

- 세션 종료 또는 주요 기능 완성 시 `docs/log/YYYY-MM-DD.md` 생성
- 포맷: 날짜 / 작업 내용 / 변경 파일 / 이슈 메모

### ADR (docs/adr/)

- 새 기술/라이브러리/API/DB 선택 시 `docs/adr/ADR-{번호}-{제목}.md` 생성
- 포맷: 맥락 → 결정 → 대안 → 결과
- 상태: Proposed → Accepted → Deprecated → Superseded

### 트러블슈팅 (docs/troubleshooting/)

- 에러 해결 완료 시 `docs/troubleshooting/{번호}-{증상}.md` 생성
- 포맷: 증상 → 원인 → 해결 → 교훈

### Dev Log DB (Notion — notion-mcp)

- DB: 바이브코딩 Dev Log
- 프로젝트: "Yohan Studio"
- 세션 종료 시 자동으로 세션로그 생성

| 상황 | 유형 | 기록 내용 |
|---|---|---|
| 세션 종료 | 세션로그 | 작업 요약 + 변경 파일 + 결과 |
| 기술 결정 | ADR | docs/adr/ 파일 + Dev Log ADR 항목 |
| 에러 해결 | 에러 | docs/troubleshooting/ + Dev Log 에러 항목 |
| 새로 배움 | TIL | docs/til.md + Dev Log TIL 항목 |

### 준수율 보완

AI 자동 기록 (80~90%) + 세션 끝 "빠진 거 없어?" 확인 (10~20%) = 거의 100%

---

## 🔮 Phase 3~4 미리보기

| Phase | 기간 | 내용 |
|---|---|---|
| 3 | 5/17~5/30 | Supabase + Stripe 결제 + 스토어 + 뉴스레터 |
| 4 | 5/31~6/13 | n8n 멀티채널 자동 배포 + 콘텐츠 발행 |

---

## /done 커맨드

사용자가 `/done` 또는 세션 종료 요청 시 아래 블록만 출력:

### 📋 세션 요약

- **날짜**: YYYY-MM-DD
- **작업**: (한 줄 요약)
- **변경 파일**: (`git status --short` 기준)
- **커밋**: (`git log --oneline -1`)
- **다음 액션**: (1~3개)
- **이슈/블로커**: (있으면)

---

## 현재 상태 (마지막 갱신: 2026-05-13)

- **Phase**: 2 (블로그 + SEO) — 5/7 완료, ⑥⑦ 진행 중
- **완료**: v2 디자인 마이그레이션 / MDX 블로그 / BlogCard·TagFilter·검색 / SEO 파이프라인 / GA·GSC
- **다음 작업**: ⑥ Inter 폰트 적용 지점 점검 → ⑦ `/blog/[slug]` 본문 디자인 (Claude Design)
- **블로커**: 없음
- **참고**: Notion > 바이브코딩 Dev Log DB에 "Yohan Studio" 프로젝트 옵션 등록 필요

> 자동 패치 금지 — 사람 확인 후 갱신.
