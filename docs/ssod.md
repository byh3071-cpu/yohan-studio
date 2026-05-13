---
id: yohan-studio-ssot
date: 2026-05-13
tags: [ssot, yohan-studio, phase-2]
---

# SSOT — 요한 스튜디오

> Single Source of Truth. 이 문서가 프로젝트의 유일한 맥락 기준이다.

## 프로젝트 정의

요한 스튜디오는 백요한의 풀스택 개인 플랫폼이다.
랜딩 + 블로그 + 포트폴리오 + 노션 템플릿/자동화 도구 판매 스토어.

## 기술 스택

- Framework: Next.js 16 (App Router), 소스: `src/app/`
- Language: TypeScript (strict)
- Styling: Tailwind CSS 4 + `src/app/globals.css` `@theme` 블록 (Editorial × Soft Brutalism v2)
- Blog: MDX (next-mdx-remote/rsc) — Phase 2 적용 중
- DB: Supabase (PostgreSQL) — Phase 3부터
- Payment: Stripe 또는 토스페이먼츠 — Phase 3부터 (사업자 여부에 따라 결정)
- Automation: n8n — Phase 4부터
- SEO: next-sitemap, @vercel/og, JSON-LD — Phase 2 적용 중
- Hosting: Vercel
- VCS: GitHub

## 폰트 (v2)

- 본문: Pretendard — `next/font/local` (woff2, `src/styles/fonts/`) → `--font-sans`
- 영문 강조: Inter — `next/font/google` → `--font-en` (Phase 2 ⑥에서 적용 지점 확장 중)
- 모노 라벨: JetBrains Mono — `next/font/google` → `--font-mono`

## 디자인 토큰 (v2 — `globals.css @theme`)

기본 테마: 페이퍼 톤 라이트. 다크는 `[data-theme="dark"]` 분기에서 `ink`/`bg` 등을 반전.

| 토큰 | 라이트(기본) | 용도 |
|------|----------------|------|
| `--bg` | `#F4F1EA` | 배경 |
| `--surface` / `--surface-2` | `#EEEAE0` / `#E5E0D2` | 블록·썸네일 |
| `--ink` / `--ink-2` | `#0A0A0A` / `#2B2723` | 본문·보조 |
| `--muted` / `--muted-2` | `#6B6357` / `#968D7E` | 캡션 |
| `--accent` | `#FF5C28` | CTA·강조 마크 |
| `--border-w` | `1.5px` | 하드 보더 |
| `--shadow` / `--shadow-sm` | 오프셋 솔리드 | 브루탈 섀도 |

(레거시 블루/슬레이트 팔레트 문서는 폐기. 구현은 위 CSS 변수를 따른다.)

## 4단계 로드맵

1. Phase 1 (4/25~5/2): 랜딩 + 포트폴리오 → v1 배포 ✅
2. Phase 2 (5/3~5/16): 블로그 + SEO (진행 중)
3. Phase 3 (5/17~5/30): 스토어 + 결제 + DB
4. Phase 4 (5/31~6/13): 자동화 + 콘텐츠

## 현재 Phase: 2

범위: `/blog`(목록·태그 필터·검색) + `/blog/[slug]`(MDX 렌더링·TOC), SEO 파이프라인(`sitemap.xml`, `robots.txt`, JSON-LD, OG 이미지 `@vercel/og`), GA + Search Console, 다크모드 토글, v2 Editorial × Soft Brutalism 디자인.

허용:

- MDX 콘텐츠 파이프라인 (`src/content/blog/*.mdx`, `next-mdx-remote/rsc`)
- 정적 SEO 자산 — `next-sitemap`, `robots.txt`, JSON-LD, `@vercel/og`
- GA `gtag` + GSC 메타태그
- 다크모드 토글 (`ThemeProvider` + `ThemeToggle`)
- 블로그 클라이언트 카운터(localStorage 등 사용자 로컬 한정)

금지: Supabase/DB 연결, Stripe·결제, API Routes(블로그 OG 외), n8n 웹훅, 외부 API 호출(GA/GSC 스크립트 제외)  
연락처: `mailto:` 기반 제출(클라이언트 폼 → 메일 클라이언트)

## 결제 수단 참고

- Stripe: 한국에서 사업자 등록 필요 (개인사업자 OK)
- 토스페이먼츠: 사업자 없이도 일부 기능 사용 가능
- Phase 3 시작 전까지 사업자 등록 여부 결정할 것

## 변경 이력

- 2026-04-24: 초기 설계서 작성, Phase 1 시작
- 2026-04-25: Claude Design v2 반영 — Editorial/Brutalist 토큰, `src/app`+섹션 TSX 구조
- 2026-05-13: Phase 2 진입 — MDX 블로그·SEO·GA·다크모드 도입, `tokens.css` → `globals.css @theme` 통합
