---
id: yohan-studio-browser-audit-2026-07-13
date: 2026-07-13
target: https://yohanstudio.co
method: Playwright Chromium, axe-core, npm audit, source review
tags: [operations, maintenance, security, network, performance, accessibility]
---

# 요한 스튜디오 브라우저 운영 감사

## 결론

프로덕션 핵심 6개 경로와 내부 링크 29개는 모두 HTTP 200이며, 브라우저 콘솔 오류와 4xx/5xx 리소스 응답은 없었다. 빌드와 린트도 오류 없이 통과했다. 기본 가용성과 배포 상태는 양호하다.

즉시 조치가 필요한 항목은 다음 3개다.

1. `next@16.2.4`가 2026년 5월 공개된 High 취약점 영향 범위에 포함된다. 최소 `16.2.6` 이상으로 올려야 한다.
2. 모든 HTML 응답에 CSP, `X-Content-Type-Options`, frame 제한, `Referrer-Policy`, `Permissions-Policy`가 없다.
3. `/blog`가 초기 빈 Suspense fallback 뒤 목록을 삽입하여 CLS 0.4368 desktop, 0.4718 mobile을 발생시킨다.

## 검증 범위

- 경로: `/`, `/services`, `/showroom`, `/blog`, `/diagnosis`, `/store`
- 뷰포트: 1440×900, 390×844
- 브라우저: Playwright Chromium, service worker 차단
- 링크: 수집된 동일 origin 링크 29개
- 접근성: axe-core serious/critical
- 운영 검증: `npm.cmd run build`, `npm.cmd run lint`, `npm.cmd run qa:test`
- 보안 검증: 응답 헤더, API 입력 검증, Stripe 웹훅 서명, rate limit, `npm audit --omit=dev`

Chrome DevTools MCP가 연결되지 않아 DevTools trace, TBT, INP, 네트워크 dependency insight는 측정하지 못했다. 아래 성능 값은 synthetic warm-cache 관측이며 실제 사용자 필드 데이터가 아니다.

## 브라우저 결과

| 경로 | 상태 | Desktop LCP | Mobile LCP | Desktop CLS | Mobile CLS | 심각 접근성 노드 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 200 | 404ms | 336ms | 0.0091 | 0.1045 | 53 |
| `/services` | 200 | 220ms | 216ms | 0 | 0.0010 | 3 |
| `/showroom` | 200 | 156ms | 168ms | 0.0667 | 0 | 19 |
| `/blog` | 200 | 216ms | 120ms | **0.4054** | **0.4718** | 10 |
| `/diagnosis` | 200 | 148ms | 152ms | 0.0217 | 0.0309 | 0 |
| `/store` | 200 | 184ms | 424ms | 0.0025 | 0.0010 | 9 |

- canonical 홈 cold load 전송량은 약 532KB, mobile 약 494KB였다.
- 나머지 경로는 동일 브라우저 컨텍스트의 공통 자산 캐시를 사용해 17KB부터 106KB를 전송했다.
- 모든 경로에서 문서 폭과 viewport 폭이 같아 모바일 가로 스크롤은 없었다.
- 홈의 marquee 자식은 컨테이너 밖에 위치하지만 문서 폭을 늘리지 않는 의도된 애니메이션이다.
- 홈 Google Analytics 1건과 스토어 RSC prefetch 2~3건이 `ERR_ABORTED`로 기록됐으나 4xx/5xx 응답은 없었다. 페이지 이동 또는 브라우저 우선순위 취소 성격이며 기능 오류로 분류하지 않았다.

## 우선순위

### P0 보안 패치

`npm audit` 결과 프로덕션 의존성은 High 3, Moderate 3, Low 4였다. High 3건은 `next`와 이를 포함하는 직접 의존성에서 파생된다.

- 현재: `next@16.2.4`
- 영향: `next >=16.0.0 <16.2.6`
- 패치: `16.2.6`
- 공식 근거: [GitHub GHSA-26hh-7cqf-hhc6](https://github.com/advisories/GHSA-26hh-7cqf-hhc6), [Next.js 보안 권고 목록](https://github.com/vercel/next.js/security/advisories)

이 프로젝트에는 `middleware.ts` 또는 `proxy.ts`가 없어 해당 인증 우회 경로의 직접 사용 가능성은 낮다. 그러나 같은 버전 범위에 RSC DoS, Image Optimization DoS, RSC cache poisoning 등 다수 권고가 함께 있으므로 버전 패치를 미루면 안 된다.

### P0 기본 보안 헤더

| 헤더 | 현재 |
| --- | --- |
| `Strict-Transport-Security` | `max-age=63072000` |
| `Content-Security-Policy` | 없음 |
| `X-Content-Type-Options` | 없음 |
| `X-Frame-Options` 또는 CSP `frame-ancestors` | 없음 |
| `Referrer-Policy` | 없음 |
| `Permissions-Policy` | 없음 |

`next.config.ts`의 `headers()`에서 전역 기본값을 정의하고, GA, Sentry, Supabase, Stripe, Google TTS/AI 요청 origin을 실제 네트워크 목록과 대조해 CSP를 단계적으로 적용해야 한다. 먼저 `Content-Security-Policy-Report-Only`로 배포해 차단 로그를 확인하는 편이 안전하다.

### P1 비용 및 남용 방지

- `/api/chat`: 20회/분, 64KB, 메시지 30개 제한이 있으나 서버리스 인스턴스별 메모리 `Map`이다.
- `/api/tts`: 30회/분, 16KB, 텍스트 2,000자 제한이 있으나 동일한 인스턴스 메모리 방식이다.
- `/api/contact`: 길이 검증과 HTML escaping은 있으나 rate limit과 봇 검증이 없다.
- `/api/checkout`: 상품과 가격을 서버 DB에서 조회하고 공식 origin을 고정하는 점은 좋지만 세션 생성 rate limit은 없다.
- `/api/webhook`: Stripe signature를 raw body로 검증한다.

Vercel 다중 인스턴스에서 공유되는 KV/Redis rate limit을 비용 API에 적용하고, 문의 폼에는 Turnstile을 추가한다. 결제 세션 생성은 짧은 TTL의 IP/product 단위 제한 또는 idempotency 전략을 추가한다.

### P1 블로그 CLS

`src/app/blog/page.tsx`의 `<Suspense fallback={null}>` 때문에 서버 초기 렌더에서 글 목록 높이가 0이다. hydration 후 `TagFilter`가 삽입되면서 첫 화면의 footer가 화면 밖으로 이동한다.

- Desktop 주요 shift: footer 제거 형태, 기여도 0.4269
- Mobile 주요 shift: footer 제거 형태, 기여도 0.4716

서버에서 목록 골격을 렌더하거나, 실제 목록 높이에 가까운 fallback/min-height를 확보하거나, URL 검색 파라미터 의존 부분만 작은 client boundary로 분리해야 한다.

### P1 색상 대비

axe-core serious 위반은 모두 `color-contrast`였다. 대표 원인은 `#ff5c28` accent와 `#f4f1ea` 또는 `#eeeae0` 배경 조합이다.

- 작은 텍스트 대비: 약 2.56~2.73:1, 요구 4.5:1
- 홈 48px accent 텍스트 대비: 2.56:1, 큰 텍스트 요구 3:1
- 영향: 홈 53, 쇼룸 19, 블로그 10, 스토어 9, 서비스 3개 노드
- 진단 페이지: serious/critical 0

accent 자체를 더 어둡게 조정하거나, 작은 라벨과 링크는 `--ink` 계열을 사용하고 accent는 배경·아이콘·두꺼운 큰 텍스트로 제한해야 한다.

### P2 운영 및 유지보수

- `npm.cmd run build`: 성공, 48개 정적 페이지 생성, TypeScript 통과
- `npm.cmd run lint`: 오류 0, 경고 10. `scripts/check-goal-0.mjs`, `scripts/check-goal-5.mjs`의 미사용 변수다.
- Sentry: client, server, edge 초기화와 주요 API 예외 캡처가 구현돼 있다. 운영 DSN과 알림 규칙 활성 여부는 브라우저만으로 확인할 수 없다.
- 캐시: HTML은 `public, max-age=0, must-revalidate`; 홈과 store는 빌드상 1분 revalidate다.
- 레거시 배포 URL `https://yohan-studio.vercel.app`은 canonical로 리디렉션된다. 문서와 외부 링크는 `https://yohanstudio.co`로 통일한다.

## 회귀 테스트 상태

`npm.cmd run qa:test`는 `playwright clear-cache` 뒤 테스트 시작 로그 없이 244초 동안 멈춰 시간 초과됐다. 코드 기능 실패 판정은 아니지만 CI 회귀 검증의 신뢰성을 떨어뜨리는 유지보수 문제다. 동일 증상의 기존 문서 `docs/troubleshooting/002-playwright-silent-crash-transform-cache.md`가 있으므로 새 패턴은 만들지 않았다.

감사 스크립트는 다음처럼 다시 실행할 수 있다.

```powershell
node scripts\audit-production.mjs https://yohanstudio.co --summary
node scripts\audit-production.mjs https://yohanstudio.co --mobile --summary
node scripts\audit-production.mjs https://yohanstudio.co --route=/blog --mobile --summary
```

## 권장 실행 순서

1. Next.js와 연동 패키지를 패치하고 build, lint, 프로덕션 smoke 재검증
2. 전역 보안 헤더를 Report-Only부터 적용
3. 공유 저장소 기반 rate limit과 문의 Turnstile 적용
4. 블로그 Suspense fallback 수정 후 CLS 재측정
5. accent 대비 토큰과 사용처 수정 후 axe 재검증
6. Playwright 무출력 재현을 별도 테스트 브랜치에서 해결하고 CI gate 복구

