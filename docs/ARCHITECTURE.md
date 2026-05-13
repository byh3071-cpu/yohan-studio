# ARCHITECTURE — yohan-studio

## 전체 구조

​
[FRONTEND]                    [BACKEND]                    [DATA]
Next.js 16 (App Router)       API Routes (Phase 3)         Supabase (Phase 3)
TypeScript + Tailwind         Stripe webhook               PostgreSQL
MDX 블로그 (Phase 2)
[AUTOMATION]                  [SEO]                        [HOSTING]
n8n (Phase 4)                 next-sitemap                 Vercel
멀티채널 배포                 @vercel/og                   GitHub
JSON-LD + GSC + GA

## 기술 스택

| 레이어 | 도구 | Phase |
|---|---|---|
| 프레임워크 | Next.js 16 (App Router) | 1 |
| 언어 | TypeScript (strict) | 1 |
| 스타일링 | Tailwind CSS + CSS Variables | 1 |
| 블로그 | MDX (next-mdx-remote/rsc) | 2 |
| DB | Supabase (PostgreSQL) | 3 |
| 결제 | Stripe | 3 |
| 자동화 | n8n | 4 |
| SEO | next-sitemap + @vercel/og + JSON-LD | 2 |
| 호스팅 | Vercel | 1 |

## 페이지 라우트

| 경로 | 내용 | Phase |
|---|---|---|
| `/` | 랜딩 (Hero + About + Featured + Contact) | 1 ✅ |
| `/portfolio` | 포트폴리오 갤러리 | 1 ✅ |
| `/blog` | 블로그 목록 (태그 필터 + 검색) | 2 |
| `/blog/[slug]` | 블로그 상세 (MDX) | 2 |
| `/store` | 스토어 목록 | 3 |
| `/store/[id]` | 상품 상세 | 3 |

## 컴포넌트 구조

​
src/components/
├── ui/           # Button, Card, Badge, Input, ThemeToggle
├── layout/       # Header, Footer, Navigation
├── sections/     # Hero, About, FeaturedPosts, FeaturedProducts, Contact
├── blog/         # BlogCard, BlogContent, TagFilter (Phase 2)
├── portfolio/    # PortfolioCard, PortfolioGrid
└── store/        # ProductCard, CheckoutButton, PriceTag (Phase 3)

## DB 스키마 (Phase 3)

- **products**: id, name, slug, description, category, price, stripe_price_id, download_url
- **purchases**: id, product_id → products, email, stripe_session_id, amount
- **blog_views**: slug, view_count
- **subscribers**: id, email
- **contacts**: id, name, email, message

## 폰트

| 폰트 | 용도 | 로딩 |
|---|---|---|
| Pretendard | 한글 본문/제목 | next/font/local (woff2) |
| Inter | 영문 강조 | next/font/google |
| JetBrains Mono | 코드 | next/font/google |

## 디자인 시스템

### v2 (Editorial × Soft Brutalism) — 현재 적용 (Phase 2~)

- 라이트(기본): bg #F4F1EA, text #0A0A0A, primary #FF5C28
- 다크: bg #0A0A0A, text #F4F1EA, primary #FF5C28
- `rounded-none`, border `1.5px solid var(--line)`, hard shadow `4px 4px 0` (브루탈 오프셋)
- 그라디언트 없음, 페이퍼 톤 라이트 + 모노 라벨 강조

### v1 (Slate+Blue) — 폐기

Phase 1 초기 프로토타입에서만 사용. 2026-04-25 Claude Design v2 마이그레이션과 함께 제거됨.
