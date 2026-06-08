---
id: t5-e2e-report
date: 2026-06-08
target: https://yohan-studio.vercel.app
method: playwright MCP (production)
local_changes_not_deployed: true
---

# T5 배포 E2E 검증 리포트

## 요약

| 라우트 | 판정 | 비고 |
| --- | --- | --- |
| `/store` | **WARN** | h1·200 OK. Supabase env 미설정 → "상품 목록을 불러오지 못했습니다" (탭/카드 없음) |
| `/diagnosis` | **PASS** | h1, 21문항 radiogroup, 진행률 0/21 렌더 |
| `/showroom` | **PASS** | 6 PROJECTS, Featured 배너, 카테고리 필터 |
| `/showroom/yohan-os` | **PASS** | slug 상세 200, h1 "요한 OS" |
| 챗봇 FAB | **PASS** | `/api/chat` 200, 한국어 응답 + TTS 버튼 |
| `/portfolio` (배포본) | **FAIL** | 301 미배포 — 레거시 포트폴리오 페이지 그대로 (Goal 3 로컬 완료, redeploy 대기) |

## 상세

### `/store`

- HTTP 200, `h1` "스토어."
- **WARN**: `NEXT_PUBLIC_SUPABASE_*` Vercel 미등록으로 fetch error UI. placeholder 탭 데모 미노출(에러 분기).
- **적대적**: env 세팅 전 스토어 퍼널은 dead end — Phase 3 라이브 블로커와 일치.

### `/diagnosis`

- HTTP 200, `h1` "1인 기업 자가진단."
- 7영역 radiogroup 21문항 DOM 확인.
- 전체 21문항 완료 → 결과 패널 E2E는 이번 세션에서 미실행 (스모크 범위).

### `/showroom`

- HTTP 200, 카드 6+, Featured 3건, 필터 group 존재.
- `요한 OS` → `/showroom/yohan-os` 네비게이션 PASS.

### 챗봇

- FAB 열기 → 질문 "쇼룸이 뭐야?" → `POST /api/chat` **200**
- 응답: 쇼룸 설명 + `/showroom` 링크 (503 아님 — **프로덕션에 Gemini 키 설정됨**)

### 콘솔 / 네트워크

- 페이지 JS console error: **0건** (store/diagnosis/showroom/home)
- GA collect `ERR_ABORTED`: navigation 중 beacon — 무시 가능
- showroom slug: preload 경고 1건 (non-blocking)

### 배포본 vs 로컬 diff (적대적)

| 항목 | 프로덕션 | 로컬 (Goal 3+) |
| --- | --- | --- |
| Footer 포트폴리오 링크 | `/portfolio` | `/showroom` 쇼룸 |
| `/portfolio` redirect | 없음 | 301 → `/showroom` |
| Playwright QA | 없음 | `npm run qa:test` 6 routes PASS |

## 분리 제안 (별도 Goal/PR)

1. Vercel env + Supabase 마이그레이션 (사람) → store WARN 해소
2. master merge + redeploy → portfolio FAIL 해소
3. diagnosis 21문항 end-to-end 자동화 (Goal 4 확장)

## PASS/WARN/FAIL 집계

- PASS: 4
- WARN: 1
- FAIL: 1 (배포 지연 — 코드 수정 아님)
