---
id: prd-yohan-studio
date: 2026-05-20
tags: [prd, yohan-studio, product, phase-2]
source: https://www.notion.so/PRD-Yohan-Studio-e07d17fd19d248f3a0be946ff50ef414
---

# PRD — Yohan Studio (요한 스튜디오 제품 요구사항 정의서)

> Notion 원본: [PRD — Yohan Studio](https://www.notion.so/PRD-Yohan-Studio-e07d17fd19d248f3a0be946ff50ef414)  
> 마지막 동기화: 2026-05-20 (Notion MCP export 기반)

---

# Part 1: 제품 전체 정의

## 1. 제품 비전

### 한 줄 정의

> **요한 스튜디오는 AI 시대의 1인 기업가를 위한 First Platform이다.**  
> "생각을 시스템으로, 시스템을 사업으로 바꾸는 AI 운영체계."

### 문제 정의

AI 도구는 넓어졌지만, 1인 기업가/프리랜서는:

- 도구를 알아도 **운영 체계로 엮지 못함**
- 콘텐츠·자동화·브랜딩·수익화가 **파편화**되어 있음
- "나는 지금 어느 단계인가?"를 모름

### 해결 방향

요한 스튜디오가 **진단 → 설계 → 구축 → 운영** 전 과정을 돕는 플랫폼이 된다:

1. **진단** (AI'm Scan): 현재 수준 측정
2. **콘텐츠** (블로그 + 쇼룸): 지식·사례 전시
3. **서비스** (컨설팅/구축/교육): 실제 전환
4. **스토어** (템플릿/도구): 셀프서브 자산

---

## 2. 타겟 유저

| 페르소나 | 설명 | 핵심 니즈 |
|----------|------|-----------|
| **AI 입문 1인 기업가** | AI 도구는 써봤지만 체계 없음 | 진단 + 로드맵 + 시스템 구축 |
| **바이브코더/프리랜서** | 코드는 치지만 사업 운영 미숙 | 운영 체계 템플릿 + 컨설팅 |
| **스타트업 리더** | 팀 없이 AI로 도는 초기 사업 | 소수 정예 서비스 + 교육 |

---

## 3. 성공 지표 (KPI)

### 런칭 지표 (Phase 2 완료 시)

| 지표 | 목표 | 측정 방법 |
|------|------|-----------|
| 월간 방문자 | 500+ UV | GA |
| AI'm Scan 완료율 | 30%+ (진입 대비) | 클라이언트 이벤트 |
| 서비스 문의 | 월 5건+ | 폼 제출 |
| AEO 인용 | Perplexity/ChatGPT에서 1회+ 인용 | 수동 검증 |
| 빌드 성공률 | 100% | CI/CD |

### 성장 지표 (Phase 3~4)

| 지표 | 목표 | 측정 방법 |
|------|------|-----------|
| 스토어 구매 전환 | 월 10건+ | Stripe |
| 뉴스레터 구독 | 200+ | Supabase |
| 콘텐츠 자동 발행 | 주 3회+ | n8n 로그 |

---

## 4. 제품 완성 기준 (전체)

### 완성의 정의

요한 스튜디오가 "완성"되려면 아래 조건을 모두 충족해야 한다:

| 레이어 | 완성 기준 | Phase |
|--------|-----------|-------|
| **콘텐츠** | 블로그 10편+, 쇼룸 5+프로젝트, 서비스 3개 명시 | 2 |
| **진단** | AI'm Scan 완성 + 결과 저장/공유 | 2~3 |
| **전환** | 서비스 문의 폼 동작 + Stripe 결제 연동 | 3 |
| **스토어** | 디지털 상품 1개+ 판매 가능 | 3 |
| **자동화** | n8n 콘텐츠 발행 + 뉴스레터 + SNS 자동화 | 4 |
| **SEO/AEO** | 검색엔진 + AI 답변엔진 인덱싱 완료 | 2~4 |
| **인프라** | Vercel + Supabase + Stripe + n8n 안정 운영 | 3~4 |
| **모니터링** | GA + GSC + 에러 트래킹 + 업타임 알림 | 3~4 |

---

## 5. 시스템 아키텍처

### 기술 스택 (전 Phase)

| 레이어 | 도구 | Phase | 역할 |
|--------|------|-------|------|
| 프레임워크 | Next.js 16 (App Router) | 1 | SSR/SSG, 라우팅 |
| 언어 | TypeScript (strict) | 1 | 타입 안전성 |
| 스타일링 | Tailwind CSS 4 + CSS Variables | 1 | v2 디자인 시스템 |
| 블로그 | MDX (next-mdx-remote/rsc) | 2 | 정적 콘텐츠 |
| SEO | next-sitemap + @vercel/og + JSON-LD | 2 | 검색/AEO |
| DB | Supabase (PostgreSQL) | 3 | 사용자/주문/진단결과 |
| 결제 | Stripe | 3 | 스토어 결제 |
| 자동화 | n8n | 4 | 콘텐츠 발행/뉴스레터 |
| 호스팅 | Vercel | 1 | 배포 + Edge |
| 모니터링 | GA + GSC + Vercel Analytics | 2 | 트래킹 |

### 아키텍처 다이어그램

```
[사용자 브라우저]
    │
    ▼
[Vercel Edge / CDN]
    │
    ▼
[Next.js 16 App Router]
    ├── Static Pages (SSG): /, /blog, /showroom, /services, /design
    ├── Client Pages (CSR): /diagnosis (폼 상태)
    ├── API Routes (Phase 3): /api/checkout, /api/newsletter
    └── OG Image Route: /api/og
    │
    ├── [Supabase] (Phase 3) ── PostgreSQL + Auth + Storage
    ├── [Stripe] (Phase 3) ── Checkout + Webhooks
    └── [n8n] (Phase 4) ── 콘텐츠 자동화 + SNS + 뉴스레터
```

---

## 6. 인프라 & 운영

### 배포 파이프라인

| 단계 | 도구 | 설명 |
|------|------|------|
| 코드 | GitHub (main 브랜치) | 단일 브랜치 + PR 리뷰 |
| 빌드 | `npm run build` | TypeScript strict + Next.js |
| 검증 | Codex 리뷰 + Playwright | 코드 품질 + UI 검증 |
| 배포 | Vercel (auto-deploy on push) | main 푸시 시 자동 배포 |
| 도메인 | [yohan-studio.vercel.app](https://yohan-studio.vercel.app) → 커스텀 도메인 (Phase 3) | |

### 환경 변수

| 변수 | 용도 | Phase |
|------|------|-------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics | 2 |
| `NEXT_PUBLIC_CONTACT_FORM_URL` | 외부 문의 폼 | 2 |
| `SUPABASE_URL` / `SUPABASE_ANON_KEY` | DB 연결 | 3 |
| `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` | 결제 | 3 |
| `N8N_WEBHOOK_URL` | 자동화 | 4 |

### 유지보수 전략

| 항목 | 방법 | 주기 |
|------|------|------|
| 의존성 업데이트 | `npm audit` · Dependabot | 주간 |
| 콘텐츠 발행 | MDX 블로그 추가 + n8n 자동 SNS | 주 2~3회 |
| SEO 모니터링 | GSC + GA 대시보드 확인 | 주간 |
| 에러 모니터링 | Vercel 로그 + 알림 (Phase 3) | 상시 |
| 디자인 시스템 | 토큰 정합 검증 (다크모드 포함) | 매 릴리즈 |
| Dev Log | Notion DB 자동 기록 (notion-mcp) | 매 세션 |

---

## 7. 자동화 전략

### Phase 2 (현재)

| 자동화 | 방법 | 상태 |
|--------|------|------|
| 빌드/배포 | Vercel auto-deploy | 동작 중 |
| SEO | next-sitemap 자동 생성 | 동작 중 |
| OG 이미지 | @vercel/og 동적 생성 | 동작 중 |
| Dev Log | notion-mcp 자동 주입 | 동작 중 |
| 코드 리뷰 | Codex 역검증 | 동작 중 |

### Phase 3 (계획)

| 자동화 | 방법 |
|--------|------|
| 사용자 인증 | Supabase Auth |
| 결제 웹훅 | Stripe Webhook → Supabase |
| 이메일 알림 | Supabase Edge Function |
| 진단 결과 저장 | Supabase PostgreSQL |

### Phase 4 (계획)

| 자동화 | 방법 |
|--------|------|
| 콘텐츠 발행 | n8n → MDX 생성 → GitHub PR |
| SNS 포스팅 | n8n → Twitter/LinkedIn API |
| 뉴스레터 | n8n → Supabase 구독자 → 이메일 |
| 분석 리포트 | n8n → GA API → Notion DB |

---

## 8. 로드맵 & 마일스톤

| Phase | 기간 | 마일스톤 | 상태 |
|-------|------|----------|------|
| **1** | ~4/25 | 랜딩 + 포트폴리오 Vercel 배포 | 완료 |
| **2a** | 4/26~5/13 | 블로그 + SEO + 다크모드 + AEO (①~⑬) | 완료 |
| **2b** | 5/20~ | AI'm OS 확장 (⑭~⑰) | 진행 중 |
| **3** | TBD | Supabase + Stripe + 스토어 + 뉴스레터 | 대기 |
| **4** | TBD | n8n 자동화 + 멀티채널 발행 | 대기 |
| **운영** | 상시 | 콘텐츠 발행 + 유지보수 + 모니터링 | 대기 |

---

## 9. 비기능 요구사항

| 항목 | 기준 | 비고 |
|------|------|------|
| **성능** | LCP < 2.5s, FID < 100ms, CLS < 0.1 | Core Web Vitals |
| **접근성** | WCAG 2.1 AA 기본 준수 | 색상 대비, 키보드 네비 |
| **보안** | env var 시크릿 분리, HTTPS 전용 | Vercel 기본 |
| **브라우저** | Chrome/Safari/Edge/Firefox 최신 2버전 | 모바일 Safari 포함 |
| **반응형** | 375px ~ 1440px+ | 모바일 퍼스트 |
| **i18n** | 한국어 우선, 영어 병기 (UI 레이블) | Phase 3+ 다국어 검토 |
| **다크모드** | 라이트/다크 완전 지원, 시스템 설정 존중 | Phase 2 완료 |

---

## 10. 디자인 시스템 요약

| 요소 | 스펙 |
|------|------|
| 테마 | Editorial × Soft Brutalism |
| 라이트 bg | `#F4F1EA` |
| 다크 bg | `#0A0A0A` |
| Primary | `#FF5C28` |
| 모서리 | rounded-none |
| 보더 | 1.5px solid var(--ink) |
| 그림자 | 4px 4px 0 var(--ink) (hard shadow) |
| 그라디언트 | 없음 |
| 폰트 | Pretendard(한글) + Inter(영문) + JetBrains Mono(코드) |
| 토큰 기준 | `src/app/globals.css` `@theme` (레거시 `tokens.css`는 흡수됨) |

---

## 11. 개발 운영 체계

### 삼중 패널 (Antigravity IDE)

| 도구 | 역할 |
|------|------|
| Claude Code CLI | 메인 구현 (subagent 패턴) |
| Cursor Composer 2.5 | 스타일 튜닝, 콘텐츠/카피, 소규모 리팩터 |
| Codex | 빌드/테스트/리뷰 (읽기 전용) |

### 검증 루프

Claude Code 구현 → `npm run build` → `npm test` → Codex 리뷰 → Playwright UI 검증 → 최종 build → notion-mcp Dev Log

### 기록 체계

| 기록 | 위치 | 담당 |
|------|------|------|
| 작업 로그 | `docs/log/` | Claude Code |
| 기술 결정 | `docs/adr/` | Claude Code |
| 에러 해결 | `docs/troubleshooting/` | Claude Code |
| Dev Log DB | Notion (notion-mcp) | Claude Code |
| 커밋 메시지 | git | 전체 |

---

## 12. 네비게이션 구조

### 헤더 (데스크톱)

```
[Yohan Studio]   Blog   Showroom   Diagnosis   Services   Store   [☰] [🌙]
```

- Phase 2: Store 숨김 (5개)
- Phase 3: Store 활성화 (6개)

### 햄버거 메뉴 (모바일 + ☰ 클릭)

```
Blog
Showroom
Diagnosis
Services
Store          ← Phase 3
──────────
Design         ← 보조 페이지
```

핵심 퍼널 페이지는 상단, 보조 페이지는 구분선 아래.

### Footer (3컬럼)

```
── 콘텐츠 ──        ── 서비스 ──        ── 연결 ──
   Blog               Showroom            GitHub
   Design             Diagnosis           Email
                      Services            LinkedIn
                      Store (Phase 3)
```

### Phase별 헤더 변화

```
Phase 2: Blog  Showroom  Diagnosis  Services  [☰] [🌙]
Phase 3: Blog  Showroom  Diagnosis  Services  Store  [☰] [🌙]
```

### 네비 설계 원칙

- **Design은 햄버거 안으로**: 보조 페이지 (AI 디자인 진화 스토리)
- **퍼널 동선 우선**: Blog(유입) → Showroom(신뢰) → Diagnosis(니즈 확인) → Services/Store(전환)
- **모바일**: 기존 햄버거 드롭다운에 리스트 추가

---

# Part 2: Phase 2b 피처 스펙 (⑭~⑰)

## 문서 정보

| 항목 | 값 |
|------|-----|
| 프로젝트 | Yohan Studio |
| Phase | 2 (블로그+SEO+AI'm OS 확장) |
| 범위 | ⑭ /showroom, ⑮ /diagnosis, ⑯ /services, ⑰ Home 리뉴얼 |
| 작성일 | 2026-05-20 |
| 상태 | Draft → 요한 검수 후 Approved |
| 의존 순서 | ⑭ → ⑮ → ⑯ → ⑰ (⑰은 ⑭/⑯ 데이터 의존) |

---

## 1. 배경 & 목적

### 왜 지금?

Phase 2 블로그+SEO(①~⑬) 완료. 현재 사이트는 **"바이브코더의 포트폴리오"** 수준.  
AI'm OS 확장으로 **"AI 시대 1인 기업가를 위한 First Platform"**으로 포지셔닝 전환.

### 목표

1. **쇼룸**: 프로젝트를 체계적으로 전시 → 신뢰도 + 전환
2. **진단**: 방문자가 자기 AI 운영 수준을 측정 → 리드 생성 + 서비스 연결
3. **서비스**: 실제 제공 가능한 서비스 명시 → 비즈니스 전환
4. **홈 리뉴얼**: 위 3개를 아우르는 브랜드 랜딩 → 첫인상 전환

### Phase 2 제약

- Supabase/DB, Stripe/결제, API Routes(OG 제외), n8n **금지**
- 진단 결과 서버 저장, 예약/결제 기능 **금지**
- 정적 데이터(`src/data/`), 클라이언트 사이드 로직, 외부 폼 URL(env var) **허용**

---

## 2. ⑭ /showroom — 프로젝트 쇼룸

### 개요

기존 `/portfolio`를 확장·리브랜딩. 프로젝트를 카테고리별로 탐색 + Featured 하이라이트.

### 요구사항

| ID | 요구사항 | 우선순위 |
|----|----------|----------|
| S-01 | 프로젝트 카드 최소 5개 표시 | P0 |
| S-02 | 카테고리 필터 (전체 / Web / AI / Automation 등) | P0 |
| S-03 | Featured 프로젝트 배너 (상단 하이라이트) | P0 |
| S-04 | 카드: 썸네일 + 제목 + 한 줄 설명 + 태그 + 링크 | P0 |
| S-05 | `/portfolio` → `/showroom` 301 redirect | P0 |
| S-06 | 반응형: 모바일 1열 → md 2열 → lg 3열 | P0 |
| S-07 | 다크모드 토큰 정합 | P0 |
| S-08 | HowTo JSON-LD (프로젝트 빌드 과정) | P1 |
| S-09 | OG 이미지 (showroom용) | P1 |

### 데이터 구조

```typescript
// src/types/project.ts
interface ShowroomProject {
  id: string
  title: string
  description: string
  category: "web" | "ai" | "automation" | "design"
  tags: string[]
  thumbnail: string
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  date: string // YYYY-MM-DD
  stack: string[]
}
```

### 컴포넌트 트리

```
/showroom (page.tsx — Server Component)
├── FeaturedBanner (featured=true 프로젝트)
├── CategoryFilter ("use client" — URL 쿼리 연동)
└── ProjectGrid
    └── ProjectCard × N
```

### 파일 목록

| 파일 | 역할 |
|------|------|
| `src/app/showroom/page.tsx` | 라우트 페이지 (SC) |
| `src/app/portfolio/page.tsx` | 301 redirect to /showroom |
| `src/components/showroom/ProjectCard.tsx` | 카드 컴포넌트 |
| `src/components/showroom/ProjectGrid.tsx` | 그리드 레이아웃 |
| `src/components/showroom/FeaturedBanner.tsx` | Featured 하이라이트 |
| `src/components/showroom/CategoryFilter.tsx` | 카테고리 필터 (CC) |
| `src/data/projects.ts` | 정적 프로젝트 데이터 |
| `src/types/project.ts` | ShowroomProject 타입 |

### 완료 기준

- [ ] 프로젝트 5개 이상 렌더링
- [ ] 카테고리 필터 동작 (URL 쿼리 반영)
- [ ] Featured 배너 표시
- [ ] `/portfolio` → `/showroom` redirect 동작
- [ ] 다크모드 정합 통과
- [ ] `npm run build` 성공
- [ ] 모바일/데스크톱 반응형 확인

---

## 3. ⑮ /diagnosis — AI'm Scan v0.1

### 개요

방문자가 7개 영역 × 3문항 = 21문항에 답하면 AI 운영 수준 점수 + 5단계 레벨 + 레이더 차트를 받는 자가진단 도구.

### 요구사항

| ID | 요구사항 | 우선순위 |
|----|----------|----------|
| D-01 | 7개 영역 정의 (전략/콘텐츠/자동화/데이터/도구/브랜딩/수익화) | P0 |
| D-02 | 영역당 3문항, 총 21문항 | P0 |
| D-03 | 문항당 5점 Likert 척도 | P0 |
| D-04 | 결과: 총점 + 영역별 점수 + 5단계 레벨 | P0 |
| D-05 | 레이더 차트 (7축) | P0 |
| D-06 | TOP 3 강점/약점 영역 표시 | P0 |
| D-07 | 결과 페이지에서 /services CTA 연결 | P1 |
| D-08 | 클라이언트 사이드 전체 처리 (서버 저장 X) | P0 |
| D-09 | FAQ JSON-LD ("AI 운영 진단이란?") | P1 |
| D-10 | OG 이미지 (diagnosis용) | P1 |

### 레벨 체계

| 레벨 | 점수 범위 | 이름 | 설명 |
|------|-----------|------|------|
| 1 | 21~36 | Starter | AI 도입 초기 단계 |
| 2 | 37~52 | Explorer | 부분 활용 중 |
| 3 | 53~68 | Builder | 체계 구축 중 |
| 4 | 69~84 | Operator | 운영 자동화 단계 |
| 5 | 85~105 | Architect | AI 운영체계 완성 |

### 7개 영역

| # | 영역 | 키워드 |
|---|------|--------|
| 1 | 전략 (Strategy) | 비전, 목표, 로드맵 |
| 2 | 콘텐츠 (Content) | 블로그, SNS, 뉴스레터 |
| 3 | 자동화 (Automation) | 워크플로우, n8n, 반복작업 |
| 4 | 데이터 (Data) | 분석, 트래킹, 의사결정 |
| 5 | 도구 (Tools) | AI 도구 스택, 프롬프트 |
| 6 | 브랜딩 (Branding) | 정체성, 포지셔닝, 일관성 |
| 7 | 수익화 (Monetization) | 수익 모델, 전환, 가격 |

### 데이터 구조

```typescript
// src/types/diagnosis.ts
interface Area {
  id: string
  name: string
  nameEn: string
  icon: string
  questions: Question[]
}

interface Question {
  id: string
  text: string
  areaId: string
}

interface ScanResult {
  totalScore: number
  maxScore: number // 105
  level: 1 | 2 | 3 | 4 | 5
  levelName: string
  areaScores: { areaId: string; score: number; max: number }[]
  topStrengths: string[]
  topWeaknesses: string[]
}
```

### 컴포넌트 트리

```
/diagnosis (page.tsx — Server Component)
└── DiagnosisForm ("use client" — 상태 관리)
    ├── ProgressBar (현재 영역/전체)
    ├── DiagnosisQuestion × 3 (현재 영역 문항)
    └── DiagnosisResult (제출 후 표시)
        ├── ScoreRadar (7축 레이더 차트)
        ├── LevelBadge (레벨 뱃지)
        ├── AreaBreakdown (영역별 점수)
        └── ServiceCTA → /services 링크
```

### 파일 목록

| 파일 | 역할 |
|------|------|
| `src/app/diagnosis/page.tsx` | 라우트 페이지 (SC) |
| `src/components/diagnosis/DiagnosisForm.tsx` | 폼 + 상태관리 (CC) |
| `src/components/diagnosis/DiagnosisQuestion.tsx` | 개별 문항 |
| `src/components/diagnosis/DiagnosisResult.tsx` | 결과 화면 |
| `src/components/diagnosis/ScoreRadar.tsx` | 레이더 차트 (CC) |
| `src/components/diagnosis/LevelBadge.tsx` | 레벨 뱃지 |
| `src/data/diagnosisQuestions.ts` | 21문항 데이터 |
| `src/types/diagnosis.ts` | Area, Question, ScanResult 타입 |

### 완료 기준

- [ ] 21문항 모두 렌더링 + 응답 가능
- [ ] 결과: 총점 + 레벨 + 레이더 차트 표시
- [ ] TOP 3 강점/약점 표시
- [ ] 서버 저장 없음 (클라이언트 전용)
- [ ] 다크모드 정합
- [ ] 모바일 반응형
- [ ] `npm run build` 성공

---

## 4. ⑯ /services — 서비스 페이지

### 개요

AI 운영체계 구축 관련 서비스 3개를 카드 형태로 제시 + 외부 폼 CTA.

### 요구사항

| ID | 요구사항 | 우선순위 |
|----|----------|----------|
| V-01 | 서비스 카드 3개 (컨설팅/구축/교육 등) | P0 |
| V-02 | 각 카드: 제목 + 설명 + 포함 항목 + CTA 버튼 | P0 |
| V-03 | CTA → 외부 폼 URL (`NEXT_PUBLIC_CONTACT_FORM_URL`) | P0 |
| V-04 | Service JSON-LD (구조화 데이터) | P1 |
| V-05 | OG 이미지 (services용) | P1 |
| V-06 | 반응형: 모바일 1열 → md 3열 | P0 |
| V-07 | 다크모드 토큰 정합 | P0 |

### 데이터 구조

```typescript
// src/types/service.ts
interface Service {
  id: string
  title: string
  description: string
  icon: string
  includes: string[]
  ctaText: string
  ctaUrl: string
  highlighted?: boolean
}
```

### 컴포넌트 트리

```
/services (page.tsx — Server Component)
├── ServicesHero (페이지 헤더)
└── ServiceGrid
    └── ServiceCard × 3
        └── CTA 버튼 → 외부 폼
```

### 파일 목록

| 파일 | 역할 |
|------|------|
| `src/app/services/page.tsx` | 라우트 페이지 (SC) |
| `src/components/services/ServiceCard.tsx` | 서비스 카드 |
| `src/components/services/ServiceGrid.tsx` | 그리드 레이아웃 |
| `src/data/services.ts` | 서비스 3개 데이터 |
| `src/types/service.ts` | Service 타입 |

### 완료 기준

- [ ] 서비스 3개 카드 렌더링
- [ ] CTA → 외부 폼 연결 동작
- [ ] 다크모드 정합
- [ ] 모바일 반응형
- [ ] `npm run build` 성공

---

## 5. ⑰ Home 리뉴얼

### 개요

기존 랜딩을 AI 1인 기업 OS 포지셔닝에 맞게 리뉴얼. ⑭/⑯ 데이터를 Featured로 노출.

### 요구사항

| ID | 요구사항 | 우선순위 |
|----|----------|----------|
| H-01 | Hero 섹션: AI 운영체계 메시지 (기존 에디토리얼 톤 유지) | P0 |
| H-02 | Philosophy/About 섹션 | P0 |
| H-03 | Featured 프로젝트 섹션 (⑭ projects.ts에서 featured=true) | P0 |
| H-04 | AI'm Scan CTA 섹션 (⑮ /diagnosis 유도) | P0 |
| H-05 | 서비스 하이라이트 섹션 (⑯ services.ts) | P0 |
| H-06 | 블로그 최신글 섹션 | P1 |
| H-07 | Contact/CTA 섹션 | P0 |
| H-08 | 섹션 순서: Hero → Philosophy → Showroom → Scan → Services → Blog → Contact | P0 |
| H-09 | 기존 Hero 에디토리얼 요소 보존 (Serif italic, ISSUE 라인, marquee) | P0 |
| H-10 | 다크모드 + 반응형 | P0 |

### 섹션 구성

```
Home (page.tsx)
├── Hero (기존 강화 — AI OS 메시지)
├── Philosophy (브랜드 철학)
├── FeaturedShowroom (projects.ts featured 카드)
├── ScanCTA (진단 유도 배너)
├── ServicesHighlight (서비스 3개 미리보기)
├── LatestBlog (최신 블로그 3개)
└── Contact (기존 유지)
```

### 완료 기준

- [ ] 6개 이상 섹션 렌더링
- [ ] Featured 프로젝트 동적 로드 (projects.ts)
- [ ] 서비스 미리보기 동적 로드 (services.ts)
- [ ] AI'm Scan CTA → /diagnosis 링크
- [ ] 기존 Hero 에디토리얼 요소 유지
- [ ] 다크모드 + 반응형
- [ ] `npm run build` 성공

---

## 6. 타입 정합 매트릭스

| 타입 | 정의 위치 | 사용 위치 |
|------|-----------|-----------|
| `ShowroomProject` | `src/types/project.ts` | ⑭ showroom, ⑰ Home FeaturedShowroom |
| `Area`, `Question`, `ScanResult` | `src/types/diagnosis.ts` | ⑮ diagnosis |
| `Service` | `src/types/service.ts` | ⑯ services, ⑰ Home ServicesHighlight |

→ ⑰은 ⑭/⑯의 타입과 데이터에 의존. **반드시 ⑭→⑮→⑯→⑰ 순서 실행.**

---

## 7. 공통 체크리스트 (모든 라우트)

- [ ] v2 디자인 토큰 사용 (헥스 하드코딩 금지)
- [ ] 다크모드 `data-theme="dark"` 정합
- [ ] 모바일 퍼스트 반응형 (375px → sm → md → lg)
- [ ] 브루탈리즘: rounded-none, hard shadow, 1.5px border
- [ ] sitemap에 신규 경로 추가
- [ ] Header/Footer 네비 링크 추가
- [ ] OG 이미지 생성
- [ ] JSON-LD 구조화 데이터
- [ ] 007~010 기존 파일 훼손 없음
- [ ] `npm run build` 성공
- [ ] Codex 리뷰 통과

---

## 8. 실행 계획

| 순서 | 작업 | 주 담당 | 보조 | 산출물 |
|------|------|---------|------|--------|
| 1 | ⑭ /showroom | Claude Code CLI | Cursor (스타일) | 라우트 + 컴포넌트 + 데이터 |
| 2 | ⑮ /diagnosis | Claude Code CLI | Cursor (문항 톤) | 라우트 + 폼 + 차트 |
| 3 | ⑯ /services | Claude Code CLI | Cursor (카피) | 라우트 + 카드 + CTA |
| 4 | ⑰ Home 리뉴얼 | Claude Code CLI | Cursor (레이아웃) | page.tsx 리뉴얼 |
| 각 단계 후 | 빌드 + 리뷰 | Codex | — | 빌드 통과 확인 |

---

## 9. 레포 파일 위치

이 문서는 Notion PRD를 `docs/PRD.md`로 동기화한 단일 출처이다.  
구현 상세·세션 플랜은 `docs/superpowers/plans/` 및 [docs/ssod.md](ssod.md)와 함께 참고한다.

### 구현 drift 메모 (2026-05-20)

레포 `feat/aim-os-edition` 구현과 PRD 원문이 일부 다를 수 있다. 정합 시 PRD 우선 검수 후 코드 또는 PRD 중 하나를 갱신한다.

| 항목 | PRD | 현재 구현(참고) |
|------|-----|-----------------|
| 쇼룸 데이터 파일 | `projects.ts` | `showroomProjects.ts` |
| 진단 영역 7종 | Strategy/Content/Automation… | Direction/Strategy/Structure… (aimScan) |
| 카테고리 | web/ai/automation/design | Vibe Coding, Notion OS, … |
| portfolio redirect | S-05 P0 | 미적용 가능 — [docs/decisions/showroom-vs-portfolio.md](decisions/showroom-vs-portfolio.md) |
