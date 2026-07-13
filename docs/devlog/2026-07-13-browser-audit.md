# 2026-07-13 요한 스튜디오 브라우저 감사

## 작업 내용

- 프로덕션 핵심 6경로와 desktop/mobile 브라우저 검증
- 동일 origin 내부 링크 29개 상태 검사
- 응답 보안 헤더, API 입력 제한, 웹훅 서명, rate limit 점검
- 접근성 대비, LCP, CLS, 네트워크 실패 수집
- build, lint, Playwright QA, 프로덕션 의존성 감사

## 결과

- 모든 핵심 경로와 내부 링크 HTTP 200
- Next.js `16.2.4` High 보안 권고 영향 확인, 패치 버전 `16.2.6`
- CSP 등 기본 보안 헤더 5종 부재
- `/blog` CLS desktop 0.4368, mobile 0.4718
- 색상 대비 serious 위반 94개 노드
- build 성공, lint error 0/warning 10
- 기존 `qa:test`는 244초 무출력 timeout 재현

## 교훈

- 초기 HTML에서 큰 client component를 `Suspense fallback={null}`로 비우면 footer가 첫 화면에 배치된 뒤 hydration 시 밀려나 큰 CLS를 만든다. 실제 높이를 예약하는 fallback 또는 서버 렌더 목록이 필요하다.
- synthetic 성능 감사에서는 리디렉션 도메인과 canonical 도메인을 분리해야 TTFB를 잘못 해석하지 않는다.
- `npm audit` 집계만 보지 말고 프레임워크의 영향 범위와 패치 버전을 공식 보안 권고에서 교차 확인해야 한다.

## 역전파

- Playwright 무출력 문제는 기존 `docs/troubleshooting/002-playwright-silent-crash-transform-cache.md`와 중복되어 새 패턴을 만들지 않았다.
- Suspense 빈 fallback CLS는 `docs/patterns/ux-suspense-empty-fallback-cls.md`로 반영했다.

## 상세 보고서

- `docs/reviews/yohan-studio-browser-audit-2026-07-13.md`

