---
id: yohan-studio-changelog
date: 2026-05-26
tags: [changelog, phase-3, store, stripe, supabase]
---

# Changelog

All notable changes to Yohan Studio. Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- VHK Goal 워크플로 (`goals/`, `.cursor/skills/goal/`, `vhk goal *`)
- Playwright E2E 하네스 (`playwright.config.ts`, `tests/qa.spec.ts`, `npm run qa:test`)
- `@axe-core/playwright` a11y 스모크 (serious/critical, color-contrast 제외)
- `docs/state/t0-audit.md`, `t5-e2e-report.md`, `vercel-env-keys.md`

### Changed

- `CLAUDE.md` / `README.md` — Phase 3 실제 상태 동기화
- `.env.example` — 키별 `Used by:` 주석
- Home: `Featured` 섹션 배치 (⑰)
- `/portfolio` → `/showroom` 301 redirect; 레거시 portfolio 라우트·데이터 제거
- Footer: 포트폴리오 → 쇼룸 링크

### Fixed

- Goal 3 후 `.next` stale 타입 캐시로 build 실패 — clean rebuild로 해소

### Removed

- `src/data/portfolioProjects.ts`, `src/data/projects.ts` (deprecated stub)
- `src/components/portfolio/`, `src/app/portfolio/`
- `featuredBlogs` 정적 배열 (실제 `getPublishedPosts()` 사용)

---

## [2026-05-26] — Header nav + store link fixes

### Changed

- 헤더: 스토어 링크 `/store`, 햄버거 브레이크포인트(1024px), 데스크톱에서도 ☰(디자인 보조 메뉴)
- 햄버거·테마 토글 동일 36×36 아이콘 버튼 (`.site-header-icon-btn`)
- 홈 Featured 스토어 블록 → `/store` CTA

---

## [2026-05-26] — Phase 3: Store + Supabase + Stripe

> Commit: `ab34e9f` — `feat: Phase 3 - Supabase store + Stripe checkout`

### Added

- **Supabase (`studio_` prefix, Focus Feed 프로젝트 공유)**
  - `supabase/migrations/001_studio_initial.sql` — `studio_products`, `studio_purchases`, `studio_subscriptions`, `studio_diagnosis_results`, `studio_newsletter_subscribers` + RLS
  - `supabase/migrations/002_studio_product_types_extend.sql` — `product_type`에 `course`, `ebook` 확장
  - `src/lib/supabase.ts` (anon), `src/lib/supabase-server.ts` (service_role, server-only)
  - `src/types/database.ts` — Supabase 타입 + Relationships
- **스토어 UI**
  - `/store` 목록, `/store/[id]` 상세, `/store/checkout/success` 완료 페이지
  - `ProductCard`, `PriceTag`, `CheckoutButton`
- **Stripe**
  - `POST /api/checkout` — Checkout Session 생성 (`stripe_price_id` 또는 `price_data` fallback)
  - `POST /api/webhook` — 서명 검증, `checkout.session.completed` / `payment_failed` / `refunded` 처리
  - `src/lib/stripe.ts`
- **시드·데모**
  - `scripts/seed.ts` — 테스트 상품 3건 idempotent upsert (service_role)
  - `docs/demo/supabase-integration-demo.html` — Supabase 통합 설명용 데모 페이지
- **의존성** — `@supabase/supabase-js`, `stripe` (`package.json`)

### Changed

- 헤더·푸터: `/#store` → `/store`
- `CLAUDE.md` — Phase 3 허용 범위 (Supabase, Stripe, API Routes, 공유 DB 규칙) 반영

### Fixed

- `/vhk` Spec 섹션 — 모바일 375px 가로 overflow (`VhkSpec.tsx` 그리드 `minmax(0, 1fr)`)

### Notes / 블로커

- 마이그레이션은 Supabase Dashboard SQL Editor 또는 `supabase db push`로 적용 필요
- 로컬 결제 테스트: `stripe listen --forward-to localhost:3050/api/webhook`
- env: `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_*`, `NEXT_PUBLIC_SITE_URL` 등

---

## [2026-05-26] — /vhk 랜딩 P0 + 히어로 데모

> Commit: `87763f7` — `feat(vhk): P0 copy alignment, hero demo, and product roles`

### Added

- `/vhk` P0 카피·구조 (README v1.0.x 정합): Hero CTA, `vhk gate` 워크플로, `RULES.md` Spec/sync, 역할 표(`VhkRoles`), Hero 터미널 데모(`VhkHeroDemo`)
- `docs/reviews/vhk-landing-dual-review.md` — 1차·2차 리뷰 프롬프트

### Changed

- `public/llms.txt` — VHK 랜딩 URL 추가

---

## Earlier

- Phase 2 AI'm OS (`/showroom`, `/diagnosis`, `/services`, Home 리뉴얼) — see `docs/log/2026-05-20.md`
- Phase 1 랜딩 + 포트폴리오 배포 — 2026-04~05
