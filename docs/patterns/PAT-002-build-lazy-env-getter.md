---
id: PAT-002
패턴명: 모듈 top-level env 검사 throw 금지 → lazy getter
카테고리: build
발견일: 2026-05-26
출처프로젝트: Yohan Studio
출처DevLog: https://app.notion.com/36c9740ab07281c89443c188bd0a1fa1
태그: [build, env, Next.js, ISR]
---

## 증상

Next.js 빌드의 page-data 단계가 **라우트를 import만 해도** 죽는다. env가 누락된 환경에서 프리렌더/ISR 페이지가 빌드 시점에 실패.

## 원인

- 모듈 **top-level에서 env를 검사하고 throw**하면, 라우트가 import되는 순간(빌드 정적분석 포함) 평가되어 빌드가 통째로 죽는다.
- **ISR(`revalidate>0`) 페이지는 빌드 시점에 외부 호출**을 수행 — env/네트워크 누락 시 프리렌더 실패.

## 해결

1. env 검사를 **getter 함수 내부에서 lazy 평가**한다. 모듈 로드 시점이 아니라 실제 사용 시점에 검사.
   ```ts
   // ❌ top-level throw — import만으로 빌드 죽음
   const KEY = process.env.STRIPE_KEY!; if (!KEY) throw new Error("...");
   // ✅ lazy getter — 호출 시점 검사
   function stripeKey() { const k = process.env.STRIPE_KEY; if (!k) throw new Error("..."); return k; }
   ```
2. ISR/빌드시 외부호출은 **try/catch로 graceful fallback** — env/네트워크 누락이 프리렌더를 깨지 않게.

## 적용 조건

- Next.js(특히 App Router)에서 모듈 스코프 env 의존 코드
- ISR(`revalidate>0`) 또는 빌드 시점 외부 API 호출이 있는 페이지
- 결제/외부 SDK 초기화(Stripe·Supabase 등)를 모듈 top-level에 두는 경우
