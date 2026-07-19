---
status: Accepted
date: 2026-07-19
deciders: 백요한, Claude Code
session: 2026-07-19 SnapContext 0.3.0 발행 + 업데이트 소식 시스템 구축
---

# ADR-004 — /updates 제품 릴리즈 노트 섹션 (이원화 운영 + MDX per release)

## 맥락

SnapContext가 0.1.3 → 0.3.0으로 계속 진화하는데, 스토어 '새 소식'처럼 사이트에서 업데이트를 전달할 지속 구조가 없었다. 릴리즈 소식은 블로그 글로만 산발 소화(0.1.3 제출기, 0.2.0 공유 글). 작은 패치를 기록할 곳이 없고, 매 릴리즈마다 글을 쓰는 건 지속 불가능.

경쟁·벤치마킹 리서치(Linear·Vercel·Raycast·Arc·Framer·GitHub·Keep a Changelog) 결론:

- SaaS는 날짜 중심(Linear·Vercel), **설치형/버전 있는 제품은 버전 헤더 중심(Raycast·Arc)** — 브라우저 확장·CLI는 후자가 정합.
- 업계 표준 2단 체계: **체인지로그 = 전수 기록(짧게, 중립), 블로그 = 큰 릴리즈만 스토리** (Notion·Intercom 방식).
- 인디 규모 데이터 관리 표준: **MDX 파일 per release** — 기존 블로그 파이프라인·다크모드 재사용.

디자인 시안 5종(버전 헤더/카드 스택/좌측 레일/컴팩트 피드/제품 허브)을 실데이터+사이트 토큰으로 HTML 제작, 요한이 **#1 버전 헤더 타임라인** 선택. #3 좌측 레일은 홈 "Now" 활동 피드로 재사용 결정(별도 PR).

## 결정

1. **라우트**: `/updates`, 헤더 primaryEntries("블로그" 다음) + 푸터 + sitemap + siteConfig.pages + corePages 노출.
2. **운영 모델(이원화)**: 모든 릴리즈 → `src/content/updates/{product}-{semver}.mdx` 항목(불릿 3~10줄, 5분 작업). 큰 릴리즈만 블로그 글 승격 후 `blogSlug`로 상호 링크.
3. **스키마**: frontmatter = product(화이트리스트: snapcontext·vhk) / version / date(YYYY-MM-DD 검증) / title / types(NEW·IMPROVED·FIXED·SECURITY 화이트리스트) / blogSlug? / published(게이트). 파서는 blog.ts 패턴 복제(gray-matter + compileMDX, 필수 누락 시 제외).
4. **범용 구조**: 제품 필터 칩은 `PRODUCTS` 상수에서 파생 — 새 제품은 상수 1줄 + MDX 파일로 편입.
5. **정렬**: date 내림차순, 동일 date는 semver-aware version 비교(문자열 비교의 0.10.0 < 0.2.0 오류 방지).
6. **클라이언트 경계**: fs 의존 lib(updates.ts)와 클라이언트 안전 상수(updatesShared.ts) 분리 — "use client" 컴포넌트가 런타임 값 import 시 fs가 클라이언트 번들에 딸려가는 빌드 실패 방지.

## 대안 (기각)

- **블로그 단일(태그로 릴리즈 구분)**: 작은 패치가 글 강제 또는 미기록 — 전수 기록 불가.
- **업데이트 섹션 단일(블로그 없음)**: SEO·유통(네이버 등 8채널) 자산이 안 생김.
- **단일 changelog.json**: 관리 파일 1개로 단순하나 이미지·긴 본문 확장 불가, MDX 파이프라인 재사용 포기.
- **전용 CMS(Canny·Beamer 등)**: 1인 규모+자체 사이트 보유 상황에 과함, 외부 의존.

## 결과

- PR #65: lib + 백필 5건(SnapContext 0.1.3/0.2.0/0.3.0, VHK 0.3.0/2.11.0 — changelog·npm 레지스트리 실측 대조) + UI 3컴포넌트 + 페이지 + 노출 5곳.
- 검증: tsc·lint·build·playwright(다크모드·모바일·1024px 경계·필터·빈 상태·draft 게이트) + 적대 리뷰 반영 4건(aria-pressed, 제목 h2 승격, MDX 실패 격리, date 검증).
- 후속: 홈 "Now" 활동 피드(PR2), 0.3.0 블로그 글 발행 후 blogSlug 연결(PR3), updates 전용 RSS는 v2 백로그.
