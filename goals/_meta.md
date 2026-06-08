---
vhk_format: 1
type: meta
project: Yohan-Studio
version: v0.1
notion_handoff: https://app.notion.com/p/a63c941c90b84e198e1d2d00f7218daf
---

# Common Gates

1. `npm run build` — Next.js 프로덕션 빌드
2. `npm run lint` — ESLint

> 유닛 테스트 러너 없음 (vitest/jest 미도입). E2E는 T4+ `qa:test` 또는 playwright MCP.

## Forbidden Actions (전역)

- `src/app/layout.tsx` · `src/app/globals.css`(@theme) · `/blog` 파이프라인 · 다크모드 시스템 · SEO 파이프라인(sitemap/robots/JSON-LD) **최소 수정**
- 예외: sitemap 새 경로, redirect, Header/Footer 네비 링크 추가
- 시크릿·API 키를 코드/CLI 인자에 하드코딩
- `master` 직접 푸시 — 항상 브랜치 + PR
- 한 PR에 여러 Goal(Tn) 섞기 — **1 작업 = 1 브랜치 = 1 PR**
- `/blog` 관련 파일 수정 (Codex 병렬 작업 충돌 방지)

## Goal 파일 스키마 (필독 — VHK-021)

`vhk goal list/next/check/done` 는 `goals/*.md`(이 `_meta.md` 제외) 중 아래
frontmatter 를 만족하는 파일만 goal 로 인식한다.

| 필드 | 필수 | 값 |
| --- | --- | --- |
| `type` | ✅ | `goal` |
| `id` | ✅ | 숫자만 (`0`, `1` …) |
| `status` | ✅ | `NOT_STARTED` \| `IN_PROGRESS` \| `DONE` \| `BLOCKED` |
| `priority` | 권장 | `P0` \| `P1` \| `P2` |
| `title` | 권장 | 한 줄 제목 |

게이트 스크립트는 `vhk goal sync` 로 `scripts/check-goal-<id>.mjs` 를 백필한다.
