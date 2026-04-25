---
id: yohan-studio-ssot
date: 2026-04-25
tags: [ssot, yohan-studio, phase-1]
---

# SSOT — 요한 스튜디오

> Single Source of Truth. 이 문서가 프로젝트의 유일한 맥락 기준이다.

## 프로젝트 정의

요한 스튜디오는 백요한의 풀스택 개인 플랫폼이다.
랜딩 + 블로그 + 포트폴리오 + 노션 템플릿/자동화 도구 판매 스토어.

## 기술 스택

- Framework: Next.js 16 (App Router), 소스: `src/app/`
- Language: TypeScript (strict)
- Styling: Tailwind CSS 4 + `src/styles/tokens.css` (CSS Variables, Editorial × Soft Brutalism v2)
- Blog: MDX (next-mdx-remote/rsc) — Phase 2부터
- DB: Supabase (PostgreSQL) — Phase 3부터
- Payment: Stripe 또는 토스페이먼츠 — Phase 3부터 (사업자 여부에 따라 결정)
- Automation: n8n — Phase 4부터
- SEO: next-sitemap, @vercel/og, JSON-LD — Phase 2부터
- Hosting: Vercel
- VCS: GitHub

## 폰트 (v2)

- 본문: Pretendard Variable — `globals.css` 상단 `@import` (CDN)
- 모노 라벨: JetBrains Mono — `next/font/google` → `--font-jetbrains-mono`, `globals.css`에서 `--font-mono`에 연결
- Phase 1 랜딩은 v2 디자인 킷 기준. 로컬 Pretendard woff2·Inter 전환은 이후 정리 가능

## 디자인 토큰 (v2 — `tokens.css`)

Phase 1 기본 테마: 페이퍼 톤 라이트. 다크는 `[data-theme="dark"]` 플레이스홀더만 정의.

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

1. Phase 1 (4/25~5/2): 랜딩 + 포트폴리오 → v1 배포
2. Phase 2 (5/3~5/16): 블로그 + SEO
3. Phase 3 (5/17~5/30): 스토어 + 결제 + DB
4. Phase 4 (5/31~6/13): 자동화 + 콘텐츠

## 현재 Phase: 1

범위: 단일 랜딩(`/`)+`/portfolio`, 섹션 컴포넌트(Hero, Portfolio, About, Featured, Contact), Header/Footer, `tokens.css` 기반 UI  
랜딩 내 블로그·스토어 카드는 **정적 플레이스홀더** (Phase 2~3에서 실데이터·결제 연동)

금지: API Routes, DB, 실결제, MDX 블로그 파이프라인, 외부 API 호출  
연락처: `mailto:` 기반 제출(클라이언트 폼 → 메일 클라이언트)

## 결제 수단 참고

- Stripe: 한국에서 사업자 등록 필요 (개인사업자 OK)
- 토스페이먼츠: 사업자 없이도 일부 기능 사용 가능
- Phase 3 시작 전까지 사업자 등록 여부 결정할 것

## 변경 이력

- 2026-04-24: 초기 설계서 작성, Phase 1 시작
- 2026-04-25: Claude Design v2 반영 — Editorial/Brutalist 토큰, `src/app`+섹션 TSX 구조
