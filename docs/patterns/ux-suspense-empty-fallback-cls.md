# Suspense 빈 fallback CLS

- 패턴명: Suspense 빈 fallback CLS
- 카테고리: ux
- 증상: 초기 화면에 footer 또는 후속 섹션이 보였다가 hydration 직후 아래로 크게 밀리며 CLS가 급증한다.
- 원인: 큰 client component를 `Suspense fallback={null}`로 감싸 서버 초기 HTML에서 해당 영역 높이가 0이 된다.
- 해결: 서버에서 안정적인 목록 골격을 렌더하거나 실제 콘텐츠 높이에 가까운 fallback 또는 `min-height`를 예약한다. URL 상태가 필요한 부분만 작은 client boundary로 분리하는 방법도 유효하다.
- 적용조건: App Router, streaming SSR, hydration 시 큰 목록이나 패널이 삽입되는 화면
- 출처프로젝트: yohan-studio
- 태그: suspense, hydration, cls, footer, layout-shift
- 발견일: 2026-07-13
- 출처DevLog: `docs/devlog/2026-07-13-browser-audit.md`
