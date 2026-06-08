---
id: vercel-env-keys
date: 2026-06-08
goal: 1
---

# Vercel 환경변수 등록 체크리스트 (Goal 1)

PR 본문·대시보드 설정용. 값은 Vercel Settings → Environment Variables에 등록.

| Key | Required | Scope |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | ✅ | Production: `https://yohan-studio.vercel.app` |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase (Focus Feed shared) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anon |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Server only |
| `STRIPE_SECRET_KEY` | ✅ | Stripe test/live |
| `STRIPE_WEBHOOK_SECRET` | ✅ | `/api/webhook` endpoint |
| `GOOGLE_GENERATIVE_AI_API_KEY` | ✅ | Chatbot |
| `GOOGLE_TTS_API_KEY` | optional | TTS |
| `RESEND_API_KEY` | ✅ | Contact form |
| `RESEND_FROM_ADDRESS` | optional | Default in code |
| `CONTACT_NOTIFY_TO` | optional | Default in code |
| `NEXT_PUBLIC_GA_ID` | optional | Analytics |
| `NEXT_PUBLIC_GSC_VERIFICATION` | optional | Search Console |
| `NEXT_PUBLIC_NAVER_SITE_VERIFICATION` | optional | Naver |
| `NEXT_PUBLIC_CONTACT_FORM_URL` | optional | Services CTA |

**미사용:** `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — 서버 Checkout Session 패턴.

등록 후 **Redeploy** 필수.
