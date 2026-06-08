---
vhk_format: 1
type: goal
id: 0
title: T0 정찰/감사 (코드 수정 금지)
status: DONE
priority: P0
branch: none
notion: https://app.notion.com/p/a63c941c90b84e198e1d2d00f7218daf
completed: 2026-06-08
---

# Goal 0: T0 정찰/감사

**SoT:** [Cursor 전달 핸드오프 — 요한 스튜디오 정리 & Phase 3 마감](https://app.notion.com/p/a63c941c90b84e198e1d2d00f7218daf)

역할: 코드베이스 현재 상태를 audit 하고 표로 보고만. **커밋·파일 수정 금지.**

## 확인 항목

- [ ] `src/app` 각 라우트 완성도 (blog, design, diagnosis, services, showroom, store, open-source, vhk, contact, portfolio, `/`)
- [ ] `src/app/page.tsx` (Home) 섹션 구성 — Featured/포지셔닝 여부
- [ ] `portfolio` + `portfolioProjects.ts` import 추적
- [ ] `src/data/projects.ts` export 내용
- [ ] `process.env.*` 전체 grep 목록화
- [ ] `next.config.ts` redirects() 존재 여부
- [ ] `package.json` test/qa 스크립트 현황

## 산출물

- [ ] `docs/state/t0-audit.md` 작성 (7항목 표/리스트 + T1~T7 조정 의견 3줄)

## Completion Check

- audit 리포트 파일 존재
- 코드 변경 없음 (`git diff` clean)
