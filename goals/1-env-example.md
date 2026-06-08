---
vhk_format: 1
type: goal
id: 1
title: T1 .env.example 생성
status: DONE
priority: P0
branch: chore/env-example
notion: https://app.notion.com/p/a63c941c90b84e198e1d2d00f7218daf
completed: 2026-06-08
---

# Goal 1: T1 `.env.example`

루트에 `.env.example` — 코드에서 쓰는 env 키 전부 (값/시크릿 없음, 주석만).

## 포함 키 (T0 grep으로 보강)

- Supabase: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- Stripe: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- Site: `NEXT_PUBLIC_SITE_URL`
- AI: `GOOGLE_GENERATIVE_AI_API_KEY`, `GOOGLE_TTS_API_KEY`
- Resend: `RESEND_API_KEY`, `RESEND_FROM_ADDRESS`, `CONTACT_NOTIFY_TO`
- 기타: `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GSC_VERIFICATION`, `NEXT_PUBLIC_NAVER_SITE_VERIFICATION`, `NEXT_PUBLIC_CONTACT_FORM_URL`

## Completion Check

- [ ] `.env.example` 생성, 각 키에 사용처 주석
- [ ] `.gitignore`에 `.env*` 무시 확인
- [ ] `npm run build` + `npm run lint` 통과
- [ ] PR 본문에 Vercel 등록 키 목록
