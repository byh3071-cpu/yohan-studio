---
id: pr1-decision
date: 2026-06-08
pr: https://github.com/byh3071-cpu/Yohan-Studio/pull/1
---

# PR #1 결정 — docs(track-b)

## 내용

docs-only: content SSOT, QA checklists, `showroom-vs-portfolio` 결정 문서 (2026-05-20).

## 적대적 검토

| 관점 | 평가 |
| --- | --- |
| showroom URL 결정 | **Goal 3에서 코드로 확정** — `/portfolio` 301 → `/showroom`, 레거시 삭제 |
| QA 체크리스트 | Goal 4 `tests/qa.spec.ts`로 대체·확장됨 |
| content SSOT | 일부 유용하나 18일 stale, 현재 라우트/Phase 3 상태와 불일치 위험 |

## 결정

**Close 권장** (사람 확인 후 `gh pr close 1 -c "..."`)

- 머지 시 충돌·중복 문서 유지보수 비용 > 가치
- `docs/decisions/showroom-vs-portfolio.md` 핵심만 필요하면 Goal 3 완료 상태를 `docs/adr/` 또는 `docs/log/2026-06-08.md`에 이미 반영

## PR #2

Playwright QA MVP — **Goal 4 Option B로 신규 하네스 완료**. PR #2는 **close 권장** (앱 소스 대량 변경 포함, master와 괴리).
