---
id: vhk-landing-dual-review
date: 2026-05-26
tags: [vhk, review, codex, landing, qa]
---

# VHK 랜딩 2단 리뷰 — 1차(제품) · 2차(기술)

> **대상**: Yohan Studio `/vhk` (Vibe Harness Kit 마케팅 랜딩)  
> **SSOT(제품 진실)**: `../vhk-cli/README.md` · npm `@byh3071/vhk` v1.0.x  
> **브랜드 SSOT**: 루트 `yohan-context.md` · `src/app/globals.css` (Editorial × Soft Brutalism)

## 사용법

| 순서 | 에이전트 | 할 일 |
|------|----------|--------|
| 1 | **Claude / Cursor (Composer)** | 아래 **「1차 프롬프트」** 전체 붙여넣기 |
| 2 | **Codex (우측 패널)** | 1차 결과를 붙인 뒤 **「2차 프롬프트」** 붙여넣기 |
| 3 | 사람 | P0만 머지 전 수정, P1은 이슈/백로그 |

**검증 전 준비**

```bash
cd Yohan-Studio
npm run dev
# http://localhost:3050/vhk  (Focus Feed가 :3000 사용 — Yohan Studio는 :3050)
```

**리뷰 범위 파일**

- `src/app/vhk/page.tsx`, `opengraph-image.tsx`
- `src/components/vhk/*`
- `src/data/vhk.ts`
- `src/app/sitemap.ts` (`/vhk` 항목)
- `src/components/layout/SiteHeaderNav.tsx`, `Footer.tsx` (링크)

**금지**

- 1차: CSS 리팩터·a11y 속성 제안만 하고 끝내기 (→ 2차로 넘김)
- 2차: 카피·포지셔닝 전면 재작 (→ 1차 범위)
- 양쪽 동시에 같은 파일 수정

---

## 1차 프롬프트 (Claude / Cursor — 제품·카피·구조)

아래 블록을 **그대로** 복사해 에이전트에 붙여넣는다.

```markdown
# 역할
너는 Yohan Studio의 **1차 리뷰어**(제품·카피·퍼널·브랜드)다.
코드 품질·a11y·성능은 **언급만** 하고 상세는 2차(Codex)에 넘긴다.

# 대상
- 라우트: `/vhk` (VHK — Vibe Harness Kit 랜딩)
- 레포: Yohan-Studio
- 제품 SSOT: 형제 폴더 `vhk-cli/README.md` 및 https://www.npmjs.com/package/@byh3071/vhk

# 해야 할 일
1. `src/data/vhk.ts`와 각 `src/components/vhk/*.tsx`, `src/app/vhk/page.tsx`를 읽는다.
2. (가능하면) 로컬 `/vhk` 또는 배포 URL을 브라우저/Playwright로 본다.
3. `vhk-cli/README.md`와 **랜딩 문구·커맨드 목록·워크플로**가 일치하는지 대조한다.
4. 아래 체크리스트로만 평가한다. 수정 PR은 만들지 말고 **리뷰 리포트만** 출력한다.

# 체크리스트

## A. 포지셔닝 (5점 만점 각 항목, 코멘트 필수)
- [ ] 5초 안에 "VHK가 뭔지" (CLI? IDE? 템플릿?) 이해되는가
- [ ] Cursor/Claude **대체가 아니라** "운영·컨텍스트·하네스" 레이어라는 게 분명한가
- [ ] SnapContext(캡처 확장) · Yohan Studio(플랫폼) · `vhk gate`(아이디어 검증)와 역할이 겹치지 않는가
- [ ] Layer 2~4 로드맵이 **미래 약속**임을 오해하지 않게 썼는가

## B. 퍼널 & CTA
- [ ] Hero → Pain → Features → Spec → Roadmap → CTA 흐름이 논리적인가
- [ ] Primary CTA = `npm i -g @byh3071/vhk` 가 눈에 들어오는가
- [ ] Secondary (GitHub / npm / Disquiet) 링크가 살아 있고 역할이 분명한가
- [ ] 설치 후 **다음 한 걸음** (`vhk` 또는 `vhk gate` / `vhk init`)이 안내되는가

## C. 제품 진실성 (허위·과장 금지)
- [ ] `vhkCommands` 8개가 README 실제 커맨드와 맞는가 (누락·오타·미구현)
- [ ] `.vhk/` 스펙 트리(`vhkSpecTree`)가 **지금 v1.0.x에서 하는 일**과 맞는가, 아니면 비전인가 — 혼동 소지 표시
- [ ] "자동 생성" "어떤 IDE든" 등 **현재 동작 vs 로드맵** 구분이 필요한 문장 목록
- [ ] `vhk ship` vs README의 `ship`/`deploy`/`publish` 용어 일관성

## D. VHK Gate / 5대 기준 (제품 철학)
- [ ] Pain 4개가 실제 타겟(바이브코더 1인)의 아픔과 맞는가
- [ ] (선택) `vhk gate` 퀵 5문항(문제 한 문장 · 핵심 1기능 · 커뮤니티 3곳 · 3일 코어 · 트윗 1줄)과 랜딩 메시지가 같은 언어를 쓰는가
- [ ] 독푸딩(한 가지에 집중) · 시행횟수(빠른 실행) · 요한의 업(자산화) 관점에서 과한 약속 없는가

## E. 브랜드 & 톤 (yohan-context.md)
- [ ] 직설·실무·1인칭 톤과 맞는가 (과한 마케팅 슬로건 X)
- [ ] Editorial × Soft Brutalism: accent #FF5C28, hard shadow, 라운드 없음 — 사이트 다른 페이지와 이질감 없는가
- [ ] 한국어/영어 혼용(OG description 등) 의도가 명확한가

## F. SEO / AEO (내용만, 구현은 2차)
- [ ] title·description이 검색 의도("바이브코딩 CLI", "cursorrules" 등)를 커버하는가
- [ ] SoftwareApplication JSON-LD 내용이 페이지와 모순 없는가
- [ ] llms.txt / 사이트 전체 내러티브와 VHK 소개가 충돌하지 않는가

# 출력 형식 (반드시 준수)

## 요약
- 한 줄 판정: **출시 가능 / 수정 후 출시 / 보류**
- 강점 3개 (불릿)
- 블로커(P0) 개수

## P0 — 머지/배포 전 필수 (최대 7개)
| # | 영역 | 문제 | 권장 수정 (카피/구조) |
|---|------|------|---------------------|

## P1 — 다음 스프린트
| # | 영역 | 문제 | 권장 수정 |
|---|------|------|-----------|

## P2 — 의견
- 자유 형식, 짧게

## 2차에 넘길 항목
- 1차에서 발견했지만 기술 검증이 필요한 것만 bullet (예: "CopyButton 클립보드 Safari")

## 제품 진실성 대조표
| 랜딩 주장 | README/실제 | 일치? | 조치 |
|-----------|-------------|-------|------|

코드 패치·커밋은 하지 마라. 리포트만 출력한다.
```

---

## 2차 프롬프트 (Codex — 구현·품질·검증)

1차 리뷰 **전체 출력**을 맨 위에 붙인 뒤, 아래 블록을 이어 붙인다.

```markdown
# 역할
너는 **2차 리뷰어**(구현·접근성·성능·SEO 기술·빌드)다.
1차에서 온 P0/P1 중 **기술으로 검증·수정 가능한 것**을 우선 처리한다.
카피·포지셔닝 재작성은 1차 리포트 범위를 넘지 마라 — 이슈로만 남겨라.

# 대상
- 동일: Yohan-Studio `/vhk` 및 관련 파일 (위 1차 범위)
- 1차 리포트: (여기에 1차 전체 붙여넣기)

# 해야 할 일
1. 1차의 「2차에 넘길 항목」+ P0/P1 중 기술 항목을 읽는다.
2. `src/components/vhk/*`, `src/app/vhk/*`, `CopyButton.tsx`, `TerminalBlock.tsx`를 정독한다.
3. 아래 명령을 실행하고 결과를 리포트에 인용한다:
   - `npm run build`
   - (있다면) `npm run lint` 또는 `npx tsc --noEmit`
4. `/vhk` 를 375px · 1280px 뷰포트로 손검증하거나 Playwright로 스크린샷 2장.
5. **리뷰 리포트 + (P0만) 최소 diff 제안**을 출력한다. P0 수정은 1~3파일·국소 변경만.

# 체크리스트

## G. Next.js / App Router
- [ ] `page.tsx` Server Component 적절성 (`"use client"` 최소화)
- [ ] `metadata` · `opengraph-image.tsx` · canonical `/vhk` 일관성
- [ ] `dangerouslySetInnerHTML` JSON-LD 이스케이프 안전
- [ ] `sitemap.ts`에 `/vhk` priority/changefreq 적절

## H. 컴포넌트 구현
- [ ] 인라인 `CSSProperties` 중복 — 유지보수 리스크만 표시 (대규모 리팩터 금지)
- [ ] `CopyButton`: clipboard API, 권한 거부, HTTPS, 피드백 UI
- [ ] `TerminalBlock`: overflow, 모바일 가로 스크롤, 선택 가능 텍스트
- [ ] 외부 링크: `rel="noopener noreferrer"`, `target="_blank"` 일관성
- [ ] 하드코드 색 (`#0A0A0A` 등) vs CSS 변수 — 다크모드 토글 시 `/vhk` 깨짐 여부

## I. 접근성 (WCAG 실무)
- [ ] heading 계층 (h1 1개, 섹션 h2)
- [ ] 인터랙티브 요소 focus ring / 키보드
- [ ] 이모지 장식만으로 정보 전달하지 않는지
- [ ] 대비 (특히 CTA 다크 섹션 `#968D7E` on `#0A0A0A`)

## J. 반응형 · UX
- [ ] 375px: Hero 타이틀 줄바꿈, CTA 스택, Spec 트리 overflow
- [ ] 1280px: 그리드·여백 깨짐 없음
- [ ] 헤더 nav에 VHK 추가로 모바일 햄버거 overflow

## K. 성능
- [ ] 불필요 client bundle (전 페이지 client화 여부)
- [ ] OG image 동적 생성 빌드 시간·캐시
- [ ] LCP 후보 (Hero 텍스트 vs 터미널 블록)

## L. 보안
- [ ] 사용자 입력 없음 확인
- [ ] 외부 URL만 링크 (vhk.ts `VHK_LINKS`)

## M. 1차 교차 검증
- [ ] 1차 P0 중 **기술로 반박/확인** 가능한 항목 각각 ✅/❌
- [ ] 1차에서 놓친 구현 버그만 추가 (중복 코멘트 금지)

# 출력 형식

## 빌드·검증 로그
\`\`\`
(npm run build / lint 요약 — 실패 시 전체 에러)
\`\`\`

## 2차 요약
- 한 줄: **머지 가능 / P0 수정 필요**
- 1차 판정 대비 변경 여부

## P0 — 코드·설정 (수정 제안 포함)
| # | 파일:라인 | 문제 | 수정 방향 |
|---|-----------|------|-----------|

## P1 — 기술 부채
(bullet)

## 1차 대비
| 1차 # | 2차 결과 | 비고 |
|-------|----------|------|

## 스크린샷 (선택)
- mobile / desktop 이슈 1줄씩

P0 수정 시 unified diff 또는 파일별 before/after만 제시. 4파일 이상 변경은 P1으로 강등하고 이유를 적어라.
```

---

## 결과 합치기 (사람용)

| 심각도 | 1차 | 2차 | 머지 규칙 |
|--------|-----|-----|-----------|
| P0 | 카피·거짓·퍼널 | 빌드·a11y·버그 | **둘 중 하나라도 P0면 배포 전 해결** |
| P1 | 구조·톤 | 리팩터·성능 | 스프린트 백로그 |
| P2 | 의견 | 의견 | 무시 가능 |

**충돌 시**: 제품 진실성(1차) > 구현 편의(2차). 로드맵 문구는 "Coming" 라벨로 1차가 결정.

---

## 빠른 붙여넣기 (한 줄 지시)

**1차 (Cursor 좌)**  
> `docs/reviews/vhk-landing-dual-review.md`의 「1차 프롬프트」 블록대로 `/vhk` 제품 리뷰만 해줘.

**2차 (Codex 우)**  
> 1차 리포트 붙임. `docs/reviews/vhk-landing-dual-review.md`의 「2차 프롬프트」대로 기술 리뷰 + build 실행. P0만 최소 diff.

---

## 변경 이력

| 날짜 | 내용 |
|------|------|
| 2026-05-26 | 초안 — `/vhk` 랜딩 2단 리뷰 프롬프트 |
