# Next Task

_수동 갱신 2026-06-25 (라이브 가동 세션 종료) — 핵심 기능 라이브 검증 완료._

```
STATUS: 라이브 핵심 기능 작동 확인. /store · 결제(checkout→webhook→DB) · Supabase 연결 ✅.
        PR #14~#20 머지 완료. 코드/인프라 모두 라이브 준비됨(현재 Stripe test 모드).
재진입: docs/log/2026-06-25.md (라이브 가동 + /store 트러블슈팅 상세)

NEXT(사람):
  1. [실판매] Stripe test→live 전환:
       - Stripe live에서 webhook 재생성 → whsec_(live)
       - Vercel STRIPE_SECRET_KEY · STRIPE_WEBHOOK_SECRET 를 live 값으로 교체 → Redeploy
  2. [검증] 나머지 E2E:
       - /contact 폼 제출 → 메일 수신 + studio_contacts row
       - /diagnosis 완주 → 결과 저장
       - GA4 DebugView 이벤트 확인
  3. [선택] env 보강:
       - RESEND_FROM_ADDRESS (resend.com 도메인 검증 후 noreply@yohanstudio.co)
       - SENTRY_ORG · SENTRY_PROJECT · SENTRY_AUTH_TOKEN (소스맵 업로드)
       - .env.example 에 Sentry 4키 추가 (권한상 사람만 가능)
  4. [위생] 원격 브랜치 12개 정리 (폐기 여부 확인 필요)

BLOCKER: 없음. test 모드로 전 기능 작동 확인. 실판매만 live 전환 대기.
```
