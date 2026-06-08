---
vhk_format: 1
type: goal
id: 4
title: T4 Playwright QA 하네스 도입
status: DONE
priority: P1
branch: test/playwright-qa-harness
notion: https://app.notion.com/p/a63c941c90b84e198e1d2d00f7218daf
completed: 2026-06-08
---

# Goal 4: T4 Playwright QA

옵션 A: PR #2 rebase·머지. 옵션 B: 최소 `qa.spec.ts` 신규.

## 대상 라우트

`/`, `/blog`, `/showroom`, `/diagnosis`, `/services`, `/store`

## Completion Check

- [ ] `qa:test` 스크립트 + playwright.config (webServer `next dev -p 3050`)
- [ ] `npm run qa:install` 후 `qa:test` 통과 (또는 알려진 실패 문서화)
- [ ] `npm run build` + `npm run lint`
- [ ] 앱 소스 수정 없음 (테스트/설정만)
