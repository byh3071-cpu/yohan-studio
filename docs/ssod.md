# SSOT — 요한 스튜디오

> Single Source of Truth. 이 문서가 프로젝트의 유일한 맥락 기준이다.

## 프로젝트 정의

요한 스튜디오는 백요한의 풀스택 개인 플랫폼이다.
랜딩 + 블로그 + 포트폴리오 + 노션 템플릿/자동화 도구 판매 스토어.

## 기술 스택

- Framework: Next.js 16 (App Router)
- Language: TypeScript (strict)
- Styling: Tailwind CSS + CSS Variables
- Blog: MDX (next-mdx-remote/rsc) — Phase 2부터
- DB: Supabase (PostgreSQL) — Phase 3부터
- Payment: Stripe 또는 토스페이먼츠 — Phase 3부터 (사업자 여부에 따라 결정)
- Automation: n8n — Phase 4부터
- SEO: next-sitemap, @vercel/og, JSON-LD — Phase 2부터
- Hosting: Vercel
- VCS: GitHub

## 폰트

- 한글: Pretendard (로컬 파일, next/font/local, src/styles/fonts/)
- 영문: Inter (next/font/google)
- 코드: JetBrains Mono (next/font/google)

## 디자인 토큰

primary: #60A5FA (dark) / #2563EB (light)
bg: #0F172A / #FFFFFF
surface: #1E293B / #F8FAFC
text: #F1F5F9 / #0F172A
muted: #94A3B8 / #64748B
accent: #F59E0B / #D97706

## 4단계 로드맵

1. Phase 1 (4/25~5/2): 랜딩 + 포트폴리오 → v1 배포
2. Phase 2 (5/3~5/16): 블로그 + SEO
3. Phase 3 (5/17~5/30): 스토어 + 결제 + DB
4. Phase 4 (5/31~6/13): 자동화 + 콘텐츠

## 현재 Phase: 1

범위: 랜딩 페이지 + 포트폴리오 페이지 + 디자인 시스템 + Vercel 배포
금지: API Routes, DB, 결제, 블로그 시스템

## 결제 수단 참고

- Stripe: 한국에서 사업자 등록 필요 (개인사업자 OK)
- 토스페이먼츠: 사업자 없이도 일부 기능 사용 가능
- Phase 3 시작 전까지 사업자 등록 여부 결정할 것

## 변경 이력

- 2026-04-24: 초기 설계서 작성, Phase 1 시작

