---
vhk_format: 1
type: goal
id: 3
title: T3 /portfolio → /showroom 301 + 데이터 정리
status: DONE
priority: P0
branch: feat/portfolio-to-showroom-redirect
notion: https://app.notion.com/p/a63c941c90b84e198e1d2d00f7218daf
completed: 2026-06-08
---

# Goal 3: T3 Portfolio → Showroom

## 작업

- [ ] `next.config.ts` redirects: `/portfolio` → `/showroom` (permanent)
- [ ] `src/app/portfolio` 제거 (T0 import 확인 후)
- [ ] `portfolioProjects.ts` 미참조 시 제거, showroom 데이터 일원화
- [ ] sitemap에서 `/portfolio` 제거

## Completion Check

- [ ] `npm run build` + `npm run lint`
- [ ] 로컬 `/portfolio` → `/showroom` 확인
- [ ] 보호 파일 미수정 (layout, globals, /blog)
