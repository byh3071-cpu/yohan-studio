---
status: Accepted
date: 2026-05-23
deciders: 백요한, Claude Code
session: 2026-05-23 세션 (QA agent MVP + a11y 후속)
---

# ADR-003 — `--accent-text` 토큰 신설과 브랜드 vs WCAG AA 트레이드오프

## 맥락

QA agent MVP (Playwright + axe-core) 첫 실행 결과:

- `a11y:color-contrast` 위반: **162 노드** (14 라우트 × desktop/mobile)
- 위반 색쌍: 100%가 브랜드 오렌지 `--color-accent: #ff5c28`을 텍스트 색으로 사용한 경우
  - 44 nodes: `#ff5c28` on `#f4f1ea` (bg) → ratio **2.73**
  - 10 nodes: `#ff5c28` on `#eeeae0` (surface) → ratio **2.56**
  - 잔여: `#ff5c28` on `#e5e0d2` (surface-2)
- WCAG 2.1 AA: 일반 텍스트 4.5:1, 큰 텍스트(≥18pt 또는 14pt bold) 3:1

### 물리적 한계

`#ff5c28`의 상대 luminance ≈ 0.290.
순백 `#ffffff` 대비에서도 ratio = `(1.0 + 0.05) / (0.290 + 0.05)` = **3.09**.

- 일반 텍스트 AA(4.5) → **흰색 위에서도 불가능**
- 큰 텍스트 AA(3.0) → 흰색에서 겨우 통과, cream `#f4f1ea`에서는 2.73 → 실패

즉 **vibrant brand orange를 light cream bg 위 텍스트로 쓰는 한 어떤 텍스트 크기도 AA를 통과하지 못함**.

### 후보 검토

| 값 | bg 위 ratio | surface | surface-2 | 비주얼 |
|---|---|---|---|---|
| `#ff5c28` (현 brand) | 2.73 | 2.56 | 2.42 | 가장 vibrant, 전 surface AA 불가 |
| `#cc4818` (chestnut) | **4.13** | 3.88 | 3.55 | brand-leaning, AA-large 통과 |
| `#b3370b` (burnt) | 5.37 | 5.04 | 4.59 | AA-normal 완전 통과, 칙칙 |
| `#9e2e08` | 6.54 | 6.14 | 5.62 | 매우 짙음, brown 톤 |

손검증 결과:
- `#b3370b` → "톤 다운으로 통일감 부족, 칙칙" 피드백
- `#cc4818` → brand vibrancy 유지하면서 AA-large 임계점 진입

## 결정

**`--color-accent`는 브랜드 정체성 보존, `--color-accent-text`를 신설해 텍스트 컨텍스트에만 darker variant 적용. 라이트 모드 한정.**

### 토큰 구조

```css
@theme {
  --color-accent: #ff5c28;        /* 버튼 bg, 보더, 일러스트 (불변) */
  --color-accent-ink: #0a0a0a;    /* accent bg 위 텍스트 */
  --color-accent-text: #cc4818;   /* 라이트 bg 위 텍스트 전용 */
}

[data-theme="dark"], @media (prefers-color-scheme: dark) {
  --color-accent-text: #ff5c28;   /* 다크 bg는 6.42 통과 → 원본 유지 */
}
```

### 사용 규칙

- **`color: var(--accent)`** → 다크 surface 위 텍스트에만 (Footer.tsx, CodeBlock.tsx)
- **`color: var(--accent-text)`** → 라이트 surface 위 텍스트 (전 페이지 라벨/강조/링크)
- **`background: var(--accent)`** → 버튼, 배지 (불변)

### 적용 범위

라이트 bg에서 `color: var(--accent)` 인라인 스타일 사용처 28개 컴포넌트/페이지를 `var(--accent-text)`로 swap. `globals.css`의 `.mdx-content a`도 동일 처리.

## 트레이드오프 (수용)

- `#cc4818` ratio 4.13 → axe는 **AA-normal(4.5) 미달로 여전히 fail** 마크
- 144 노드 잔여 (대부분 11~12px 모노 라벨)
- 큰 글자(≥18.66px) AA-large 3:1 통과
- **vibrant 브랜드 정체성이 strict AA보다 우선**한다는 디자인 결정

### 잔여 노드 분류

| 텍스트 크기 | AA-large 통과 | AA-normal 통과 |
|---|---|---|
| ≥18.66px 또는 ≥14px bold | ✅ | ❌ |
| <18.66px regular / <14px bold | ❌ | ❌ |

11px 모노 라벨 (`// 01 — 철학` 등) 다수가 후자. 향후 사용자 피드백/접근성 요구에 따라:

1. 다크 badge 래핑 (`<span style="background:#0a0a0a;color:#ff5c28">…</span>`) → ratio 6.42 통과
2. 라벨 weight/size 상향 (≥14px bold) + `--accent-text` `#cc4818` 유지 → AA-large 통과
3. 색 폐기, `--ink-2` (#2b2723) 사용 → AA-normal 완전 통과, 오렌지 정체성 약화

세 경로 모두 별도 PR 후보. 현 ADR은 결정만 기록.

## 대안 (기각)

### A. `--color-accent` 자체를 darker로 변경

- `#cc4818`로 토큰 1줄 수정. 모든 사용처 자동 적용
- **기각 사유**: 버튼 bg가 함께 어두워지면서 `accent-ink(#0a0a0a)` 위 대비도 4.25로 감소 (현재 6.42). 버튼 클릭 가독성 손실 + 브랜드 시그니처 색 자체 손실

### B. 전부 원복 + axe 룰 ignore

- `--accent`를 그대로 두고 QA agent에서 `color-contrast`를 skip rule 처리
- **기각 사유**: a11y 신호 자체를 숨김. 자기기만. 다른 진짜 위반도 같이 묻힐 위험

### C. bg 색을 더 밝게 (예: 순백 `#ffffff`)

- accent ratio 2.73 → 3.09 (큰 글자 AA 겨우 통과)
- **기각 사유**: cream `#f4f1ea`는 editorial 아이덴티티 핵심. 흰색은 톤 잃음. 게다가 일반 텍스트 AA는 여전히 불가

### D. 다크 badge 래핑을 전 사이트에 적용

- accent 라벨을 모두 `bg:#0a0a0a; color:#ff5c28` 박스로 변환
- ratio 6.42 통과, 브랜드 오렌지 유지
- **기각 사유**: 전 페이지 시각 톤 변경 (라벨이 검은 박스로 박힘). editorial 가벼움 손실. 별도 디자인 결정으로 분리

## 결과

- `src/app/globals.css`: `--color-accent-text` 추가 (light=#cc4818, dark=#ff5c28), `.mdx-content a` 토큰 교체
- `src/app/**` + `src/components/**` 28개 파일: `color: "var(--accent)"` → `"var(--accent-text)"` sweep
- `src/components/layout/Footer.tsx`, `src/components/blog/mdx/CodeBlock.tsx`: 다크 bg 컨텍스트로 미변경
- `tests/qa.spec.ts` + `src/lib/qa/types.ts`: axe 위반 노드 디테일(target/html/failureSummary) top 5 캡처 추가
- QA contrast 노드: **162 → 144** (작은 라벨은 의도적으로 잔여)

### 후속 작업 후보 (별도 PR)

- `missing_h1` 2건: `/portfolio` 두 viewport에 h1 추가
- 11px 모노 라벨의 다크 badge 래핑 (디자인 검토 후)
- `store_link_present` 14건: Phase 3 `/store` 라우트 출시 시 자동 해소
