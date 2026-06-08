---
vhk_format: 1
type: goal
id: 5
title: T5 배포 preview E2E 검증 (playwright MCP)
status: DONE
priority: P1
branch: none
notion: https://app.notion.com/p/a63c941c90b84e198e1d2d00f7218daf
completed: 2026-06-08
---

# Goal 5: T5 Preview E2E

검증 작업 — 코드 수정 최소. playwright MCP 사용.

## 점검

- [ ] `/store` — 카드, All/Free/Paid 탭
- [ ] `/diagnosis` — 문항 → 결과/레벨
- [ ] `/showroom` — 카드 + 상세 slug
- [ ] 챗봇 FAB → 응답 (503 한국어 에러도 정상)
- [ ] 콘솔/네트워크 에러 수집

## 산출물

- [ ] `docs/state/t5-e2e-report.md` — 라우트별 PASS/WARN/FAIL

## Completion Check

- E2E 리포트 작성 완료
- 코드 버그는 별도 Goal로 분리 제안만
