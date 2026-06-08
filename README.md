# Yohan Studio

AI 시대 1인 기업가를 위한 First Platform — 바이브코딩으로 구축하는 AI 운영체계 웹 플랫폼.

- **배포**: [https://yohan-studio.vercel.app](https://yohan-studio.vercel.app)
- **스택**: Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind v4 · MDX · Supabase · Stripe

## 라우트

| 경로 | 설명 |
| --- | --- |
| `/` | Home — Hero, 퍼널 프리뷰(Showroom/Diagnosis/Services) |
| `/blog`, `/blog/[slug]` | MDX 블로그 |
| `/showroom`, `/showroom/[slug]` | 프로젝트 쇼룸 |
| `/diagnosis` | A'Im Scan 자가진단 (21문항) |
| `/services` | 서비스 3종 + 문의 CTA |
| `/store`, `/store/[id]` | Supabase 상품 + Stripe Checkout |
| `/open-source` | 오픈소스·무료 리소스 |
| `/vhk` | VHK CLI 랜딩 |
| `/design` | 디자인 시스템 히스토리 |
| `/contact` | 문의 폼 (Resend) |

## 시작하기

```bash
npm install
cp .env.example .env.local   # 값 채우기 — docs/state/vercel-env-keys.md 참고
npm run dev                  # http://localhost:3050
```

## 스크립트

| 명령 | 용도 |
| --- | --- |
| `npm run dev` | 개발 서버 (포트 3050) |
| `npm run build` | 프로덕션 빌드 |
| `npm run lint` | ESLint |
| `npm run qa:install` | Playwright Chromium 설치 |
| `npm run qa:test` | E2E 스모크 (Goal 4+) |

## 환경변수

`.env.example` 및 `docs/state/vercel-env-keys.md` 참고. 시크릿은 코드에 넣지 않는다.

## Goal 워크플로 (VHK)

```bash
vhk goal list
vhk goal next
vhk goal check
vhk goal done
```

상세: `.cursor/skills/goal/SKILL.md` · Notion 핸드오프 `goals/_meta.md`

## 문서

- `CLAUDE.md` — 운영 규칙 + 현재 상태
- `docs/state/` — next-task, audit, E2E 리포트
- `goals/` — Phase 3 마감 작업 큐 (T0~T7)
