---
id: t6-home-adversarial
date: 2026-06-08
goal: 6
---

# Goal 6 적대적 검증 — Home ⑰

## 전제 재검증 (T0)

| 항목 | T0 판정 | 조치 |
| --- | --- | --- |
| Home 미니멀/stub | **아님** — 9섹션 이미 존재 | 전면 리라이트 **불필요** (goal 전제 미충족 → no-op 아님) |
| ⑰ 포지셔닝 | Hero h1 "AI 시대의 1인 기업 운영체계" | ✅ 이미 충족 |
| ⑰ Featured | `Featured.tsx` orphan | **갭** → `page.tsx`에 배치 |

## 구현 (최소 정확 diff)

- `src/app/page.tsx`: `<Featured />` 추가 (ShowroomPreview ↔ ScanIntro 사이)
- layout.tsx / globals.css: **미수정**

## 퍼널 CTA 적대적 체크

| 퍼널 | Home 섹션 | 링크 |
| --- | --- | --- |
| Showroom | ShowroomPreview | `/showroom` |
| Diagnosis | ScanIntro | `/diagnosis` |
| Services | ServicesPreview | `/services` |
| Store | Featured (store grid) | `/store` |
| Blog | Featured (blog grid) | `/blog` |

## 잔여 리스크

- `featuredProducts` 가격은 정적 placeholder — 실제 Supabase 상품과 불일치 가능 (스토어 env 후 재동기화)
- Hero CTA는 Diagnosis+Services만 — Showroom/Store는 하위 섹션으로 유도 (의도적 계층)

## 판정

**Goal 6 완료 조건 충족** — ⑰의 유일한 코드 갭(Featured) 해소.
