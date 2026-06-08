---
id: t0-audit
date: 2026-06-08
source: https://app.notion.com/p/a63c941c90b84e198e1d2d00f7218daf
---

# T0 정찰/감사 리포트

실물 확인 기준: 로컬 `master` 워킹트리, `npm` 패키지 매니저.

## 1. 라우트 완성도 (`src/app`)

| 라우트 | 상태 | 한 줄 |
| --- | --- | --- |
| `/` (Home) | ✅ 실데이터 | Hero·Philosophy·Problem·ShowroomPreview·ScanIntro·ServicesPreview·About·Faq·Contact (9섹션) |
| `/blog` | ✅ 실데이터 | MDX `getPublishedPosts`, TagFilter, `[slug]` 동적 |
| `/design` | ✅ 실데이터 | v1→v2 진화표·AI 분업·로드맵 (483줄) |
| `/diagnosis` | ✅ 실데이터 | `DiagnosisForm` + 21문항 데이터 연동 |
| `/services` | ✅ 실데이터 | `services.ts` + PricingSection + JSON-LD |
| `/showroom` | ✅ 실데이터 | `showroomProjects` + FeaturedBanner + ProjectGrid + `[slug]` |
| `/store` | ✅ 실데이터 | Supabase `studio_products` fetch, StoreTabs, checkout/success |
| `/open-source` | ✅ 실데이터 | `opensourceItems` 그리드 + SEO metadata |
| `/vhk` | ✅ 실데이터 | VHK 랜딩 전 섹션 (Hero~Cta) |
| `/contact` | ✅ 실데이터 | Resend `ContactForm` |
| `/portfolio` | ⚠️ 레거시 | `Portfolio` 컴포넌트 + `portfolioProjects.ts` — `/showroom`과 병존 |

## 2. Home (`src/app/page.tsx`)

| 섹션 | 컴포넌트 | 비고 |
| --- | --- | --- |
| Hero | `Hero` | 에디토리얼 포지셔닝 |
| Philosophy | `Philosophy` | |
| Problem | `ProblemSection` | |
| Showroom | `ShowroomPreview` | featured 6카드 프리뷰 (Showroom 퍼널) |
| Scan | `ScanIntro` | Diagnosis 퍼널 |
| Services | `ServicesPreview` | |
| About | `About` | |
| FAQ | `Faq` | |
| Contact | `Contact` | |

- `Featured` 섹션(`src/components/sections/Featured.tsx`)은 **Home에 미사용** — `featured.ts`는 존재하나 orphan.
- Notion 핸드오프의 "793B 미니멀 Home" 설명은 **stale** — 현재 Home은 이미 퍼널형 리뉴얼에 가깝다.

## 3. portfolio 추적

| 참조 위치 | 내용 |
| --- | --- |
| `src/app/portfolio/page.tsx` | `/portfolio` 라우트 살아있음 |
| `src/components/portfolio/Portfolio.tsx` | `portfolioProjects` import·렌더 |
| `src/data/portfolioProjects.ts` | 10개 프로젝트 정적 데이터 |
| `src/components/layout/Footer.tsx` | `/portfolio` 링크 |
| `src/app/sitemap.ts` | `/portfolio` URL 엔트리 |
| `next.config.ts` redirects | `/portfolio` → `/showroom` **없음** (showroom slug redirect 1건만) |

`projects.ts`는 `@deprecated` re-export stub → `showroomProjects` alias만 제공, **src에서 import 0건**.

## 4. `src/data/projects.ts`

```ts
export { SHOWROOM_CATEGORIES, showroomProjects, type ShowroomCategory, type ShowroomProject } from "./showroomProjects"
```

SEO 티켓용 레거시 alias. 실사용은 `showroomProjects.ts` 직접 import.

## 5. `process.env.*` (앱·라이브러리)

| 변수 | 사용처 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `siteUrl.ts`, metadata |
| `NEXT_PUBLIC_GSC_VERIFICATION` | `layout.tsx` |
| `NEXT_PUBLIC_NAVER_SITE_VERIFICATION` | `layout.tsx` |
| `NEXT_PUBLIC_GA_ID` | `layout.tsx` GoogleAnalytics |
| `NEXT_PUBLIC_CONTACT_FORM_URL` | `services/page.tsx` |
| `GOOGLE_GENERATIVE_AI_API_KEY` | `api/chat/route.ts` |
| `GOOGLE_TTS_API_KEY` | `lib/tts.ts` |
| `NEXT_PUBLIC_SUPABASE_URL` | `supabase.ts`, `supabase-server.ts`, `seed.ts` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `supabase.ts` |
| `SUPABASE_SERVICE_ROLE_KEY` | `supabase-server.ts`, `seed.ts` |
| `STRIPE_SECRET_KEY` | `lib/stripe.ts` |
| `STRIPE_WEBHOOK_SECRET` | `api/webhook/route.ts` |
| `RESEND_API_KEY` | `lib/resend.ts` |
| `RESEND_FROM_ADDRESS` | `lib/resend.ts` (optional) |
| `CONTACT_NOTIFY_TO` | `lib/resend.ts` (optional) |

**미사용 (Notion 목록 대비):** `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — 코드베이스에 참조 없음 (서버 Checkout 세션 패턴).

## 6. `next.config.ts` redirects

```ts
redirects() → [{ source: "/showroom/notion-custom-dashboard", destination: "/showroom/notion-uiux", permanent: true }]
```

`/portfolio` → `/showroom` redirect **미적용**.

## 7. `package.json` scripts (test/qa)

| 스크립트 | 존재 | 비고 |
| --- | --- | --- |
| `build` | ✅ | `next build` |
| `lint` | ✅ | `eslint` |
| `qa:install` | ✅ | playwright chromium |
| `qa:test` | ❌ | 없음 — T4 대상 |
| `test` / `test:run` | ❌ | vitest/jest 없음 |

---

## T1~T7 조정 의견 (3줄)

1. **T1 스킵 또는 축소** — `.env.example` 이미 존재(37줄, 주요 키 문서화됨). `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` 미사용 확인만 PR에 명시하면 됨.
2. **T6 Home 리뉴얼 스킵 권장** — Home은 9섹션 퍼널 구조로 이미 구현됨. orphan `Featured.tsx` 정리는 T7에서 처리.
3. **T3·T4 우선순위 상향** — portfolio/showroom 이중 노출 + sitemap/Footer 정리가 배포 전 UX 일관성에 직결. QA 하네스(T4)는 env 미설정 배포 검증(T5) 전제.
