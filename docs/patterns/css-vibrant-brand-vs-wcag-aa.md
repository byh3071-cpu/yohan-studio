---
패턴명: CSS/Vibrant 브랜드 색 + WCAG AA — dual token으로 우회
카테고리: css
발견일: 2026-05-23
출처프로젝트: Yohan Studio (Phase 2 / QA agent MVP 후속)
출처DevLog: docs/log/2026-05-23.md, docs/adr/ADR-003-accent-text-token-and-a11y-tradeoff.md
태그: [css, a11y, WCAG, design-tokens, branding, axe-core]
---

## 증상

axe-core / Lighthouse / WAVE 등 자동 a11y 검사에서 `color-contrast` 위반 다발 발생. 추적해 보면 위반 노드의 foreground 색이 거의 전부 브랜드 accent 색(고채도 오렌지/노랑/라임/핑크/파스텔 등) 한 가지로 수렴. 위반은 light bg(흰색/베이지/연한 회색) 위에서만 발생하고, 다크 bg 위에서는 같은 색이 잘 통과한다.

대표 케이스:

- 헤더의 `// LABEL` 모노 라벨 (오렌지 텍스트, cream bg)
- 본문 인라인 강조 단어 ("복제", "확장" 등을 accent 색으로 하이라이트)
- 가격/숫자 강조 ("01" "21" 같은 큰 숫자도 axe 4.5 임계점 미달)
- 링크/CTA 텍스트 색

## 원인

WCAG 2.1 AA의 임계점:

- 일반 텍스트: contrast ratio **4.5:1**
- 큰 텍스트(≥18pt 또는 14pt bold ≈ ≥18.66px 또는 ≥14px bold): **3:1**

WCAG contrast ratio는 두 색의 **상대 luminance** 비율이다. 고채도(saturated) 색은 RGB 채널이 중간 영역에 모이는 경향 → 상대 luminance도 중간(0.2~0.4). light bg의 luminance(0.8~0.95)와 비율이 충분히 벌어지지 못한다.

수치 예 — `#ff5c28` (vibrant orange):

- 상대 luminance ≈ 0.290
- `#f4f1ea` (cream bg, luminance 0.882) 위 ratio = **2.73**
- `#ffffff` (순백, luminance 1.0) 위 ratio = **3.09**

즉 **흰색 위에서도 일반 텍스트 AA(4.5) 불가능**. 큰 텍스트 AA(3.0)도 cream/베이지 bg에서는 통과 불가.

다크 bg에서는 `#ff5c28` on `#0a0a0a` = ratio 6.42 → 같은 색이 손쉽게 통과. **bg 명도가 텍스트 색보다 더 멀리 떨어져야 하는데 vibrant 색은 light bg와의 luminance gap이 구조적으로 좁다.**

이건 색을 살짝 darker로 바꿔서 해결되는 문제가 아니다 — 색의 **채도를 포기**해야 하기 때문에 브랜드 정체성과 직접 충돌한다.

## 해결

**Dual token 패턴**으로 분리:

```css
@theme {
  /* 불변 — 브랜드 정체성 */
  --color-accent: #ff5c28;
  /* 텍스트 컨텍스트 전용 — light bg에서 AA 통과 가능한 darker variant */
  --color-accent-text: #cc4818;  /* 채도 유지 + 명도↓ */
  /* 또는 더 보수적: #b3370b (AA-normal 완전 통과) */
}

[data-theme="dark"], @media (prefers-color-scheme: dark) {
  /* 다크 bg에서는 원본이 충분히 통과 → text token도 vibrant로 복귀 */
  --color-accent-text: #ff5c28;
}
```

사용 규칙:

| 컨텍스트 | 토큰 |
|---|---|
| 라이트 bg 위 텍스트 | `var(--accent-text)` |
| 다크 bg 위 텍스트 (Footer, 코드블록 등) | `var(--accent)` 그대로 |
| 버튼/badge 배경 | `var(--accent)` |
| 보더/일러스트 | `var(--accent)` |

리팩토링 절차:

1. axe-core로 위반 노드 디테일 캡처해 정확한 fg/bg 색쌍 + 사용처 셀렉터 확인
2. WCAG ratio 계산기로 후보 `--accent-text` 값 탐색 (모든 light surface에서 AA 통과하는 최대 밝기)
3. 정규식 sweep: `color:\s*["']var\(--accent\)["']` → `var(--accent-text)`
4. 다크 bg 컨텍스트 컴포넌트(예: Footer, CodeBlock)는 sweep에서 제외 또는 후속 revert
5. QA 재실행 → 잔여 위반 확인

## 적용조건

- light cream/white/연한 회색 bg를 사이트 기본으로 사용
- vibrant 고채도 브랜드 색(오렌지/노랑/네온/파스텔)을 텍스트 색으로도 사용
- WCAG AA(또는 그 이상) 요구
- 다크 모드를 지원해 두 모드 모두 동일 텍스트 색을 쓰는 사이트

조건 불일치:

- bg가 이미 어두우면 적용 불필요
- 브랜드 색이 이미 luminance 낮은 톤(navy, deep teal 등)이면 토큰 분리 없이 통과 가능
- vibrant 브랜드 색을 절대로 텍스트로 안 쓰는 디자인 시스템이면 적용 불필요

## 트레이드오프

- darker variant는 본질적으로 채도가 낮아 보임. 같은 화면에서 vibrant 버튼 + chestnut 라벨 조합은 통일감 손실 위험
- 작은 텍스트(≤14px non-bold)는 `--accent-text`가 AA-normal까지 통과해도, 같은 토큰이 큰 텍스트만 쓰일 때는 시각적으로 너무 어두워 보일 수 있음 → 컨텍스트별 추가 분기 검토
- 다크 badge 래핑(`bg:#0a0a0a; color:vibrant`)이 대안. 시각적 강조 + ratio 회복 동시. 단, 라벨이 박스화돼 디자인 톤 바뀜

## 참고

- WCAG 2.1 SC 1.4.3 Contrast (Minimum): https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
- axe-core color-contrast rule: https://dequeuniversity.com/rules/axe/4.11/color-contrast
- Yohan Studio ADR-003 (브랜드 vs AA 결정 기록): `docs/adr/ADR-003-accent-text-token-and-a11y-tradeoff.md`
