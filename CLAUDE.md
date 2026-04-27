@AGENTS.md

# CLAUDE.md — yohan-studio

## 프로젝트 개요
요한 스튜디오: 백요한의 개인 풀스택 플랫폼 (랜딩 + 블로그 + 포트폴리오 + 스토어)
바이브코딩으로 구축하는 1인 브랜드 웹사이트.
배포: https://yohan-studio.vercel.app

## 현재 Phase: 2 (블로그 + SEO)
Phase 1 완료 (4/25): 랜딩 + 포트폴리오 배포 완료.
Phase 2 목표: 검색엔진에서 발견되는 콘텐츠 허브 구축.

## Phase 2 범위 (티켓 007~010)
- 007: MDX 블로그 시스템 구축 (/blog, /blog/[slug])
- 008: 블로그 카드 + 태그 필터 + 검색
- 009: SEO 설정 (sitemap, robots.txt, OG tags, JSON-LD)
- 010: Google Analytics + Search Console 연동

## 기술 스택
- Next.js 16 (App Router) + TypeScript (strict), 앱 디렉터리: `src/app/`
- Tailwind CSS 4 + `src/styles/tokens.css` (CSS Variables — v2 Editorial × Soft Brutalism)
- 블로그: MDX (next-mdx-remote/rsc), 소스: `content/blog/*.mdx`
- Pretendard Variable: `src/app/globals.css` 최상단 CDN `@import`
- Inter: `next/font/google` → 영문 본문 보조
- JetBrains Mono: `next/font/google` → `--font-mono` (코드 블록)
- SEO: next-sitemap + @vercel/og + JSON-LD
- Vercel 배포

## 디자인 시스템 — v2 (Editorial × Soft Brutalism)
- 기본: 라이트 페이퍼 톤 (`tokens.css` `:root`). 다크는 `[data-theme="dark"]`로 토글 연동 (Phase 2에서 구현).
- 모바일 퍼스트: 좁은 화면 1열 → `md:` 이상 다열
- 색·보더·섀도우는 **헥스 하드코딩 지양** → `var(--ink)`, `var(--accent)` 등 토큰 사용
- 브루탈리즘: `--radius: 0`, 오프셋 솔리드 섀도우, 하드 보더

## 컬러 토큰 (`tokens.css`)

| 토큰 | 라이트 | 다크 | 용도 |
|------|--------|------|------|
| `--bg` | `#F4F1EA` | `#0A0A0A` | 배경 |
| `--surface` | `#FFFFFF` | `#1E293B` | 카드·블록 |
| `--ink` | `#0A0A0A` | `#F1F5F9` | 본문 |
| `--muted` | `#64748B` | `#94A3B8` | 캡션·보조 |
| `--accent` | `#FF5C28` | `#FF5C28` | CTA·강조 |
| `--border-w` | `1.5px` | `1.5px` | 하드 보더 |
| `--success` | `#34D399` | `#34D399` | 성공 상태 |
| `--error` | `#F87171` | `#F87171` | 오류 상태 |

## 코딩 규칙
- TypeScript strict mode, `any` 금지
- Server Component 우선, `"use client"`는 인터랙션이 있는 컴포넌트만
- 컴포넌트: `PascalCase.tsx`, 유틸·데이터: `camelCase.ts`
- 컴포넌트 경로: `src/components/{ui,layout,sections,blog,portfolio}/`
- 페이지: `src/app/` 아래 App Router 구조
- 정적 카피·목록: `src/data/` 단일 소스
- MDX 메타데이터: frontmatter (`title`, `date`, `tags`, `description`, `thumbnail`)
- 색·보더·섀도우는 항상 CSS 변수 사용 (`var(--accent)` 등)

## Phase 2 허용 사항
- ✅ MDX 블로그 시스템 (`content/blog/*.mdx`)
- ✅ next-sitemap, robots.txt
- ✅ OG tags (`@vercel/og` 이미지 자동 생성)
- ✅ JSON-LD 구조화 데이터
- ✅ Google Analytics (gtag.js) + Search Console 메타 태그
- ✅ 다크모드 토글 (`[data-theme="dark"]` 연동)
- ✅ 블로그 조회수: 클라이언트 카운터만 (DB 없이)

## Phase 2 금지 사항
- ❌ Supabase/DB 연결 (Phase 3)
- ❌ Stripe/결제 로직 (Phase 3)
- ❌ API Routes 생성 (Phase 3)
- ❌ n8n 웹훅 (Phase 4)
- ❌ 외부 API 호출

## 폴더 구조 (Phase 2 추가분)
```
src/
├── app/
│   ├── blog/
│   │   ├── page.tsx          # 블로그 목록 (태그 필터 + 검색)
│   │   └── [slug]/
│   │       └── page.tsx      # 블로그 상세 (MDX 렌더링)
│   ├── sitemap.ts            # 동적 sitemap 생성
│   └── robots.ts             # robots.txt
├── components/
│   └── blog/
│       ├── BlogCard.tsx
│       ├── BlogContent.tsx
│       └── TagFilter.tsx
├── content/
│   └── blog/                 # MDX 블로그 글
│       ├── vibe-coding-2hr-deploy.mdx
│       └── ...
├── lib/
│   ├── mdx.ts                # MDX 유틸리티 (글 목록, 메타데이터 파싱)
│   └── seo.ts                # SEO 헬퍼 (메타태그, JSON-LD 생성)
next-sitemap.config.js
```

## 참고 문서
- `docs/ssod.md`: 프로젝트 전체 맥락 + 로드맵 (SSOT)
- `yohan-context.md`: 요한 소개 + 브랜드 톤 + SNS
- `docs/design/claude-design-workflow.md`: Claude Design → Cursor 연동 + TS 변환 규칙
