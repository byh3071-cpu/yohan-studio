---
name: yohan-dual-blog
description: Yohan Studio의 블로그 글을 웹 MDX와 네이버 블로그용 평문으로 함께 작성하고 검수한다. src/content/blog의 새 글 작성, 기존 글 개편, 노션 초안 변환, 네이버 복붙 원고 생성, 이미지 설명·SEO·AEO·내부 링크 점검이 필요할 때 사용한다.
---

# Yohan Dual Blog

한 주제를 웹과 네이버에 그대로 복제하지 말고, 사실은 공유하되 읽는 방식에 맞게 두 원고를 만든다.

## 작업 순서

1. `src/content/blog/*.mdx`, `src/lib/blog.ts`, `BlogImage.tsx`를 열어 현재 필드와 컴포넌트를 확인한다.
2. 원본 초안에서 주장, 수치, 명령어, 링크, 이미지 증거를 먼저 분리한다.
3. `references/content-model.md`의 공통 구조로 글의 뼈대를 잡는다.
4. 웹 글은 `assets/web-post.mdx`와 `references/channel-rules.md`의 MDX 규칙을 적용한다.
5. 네이버 글 구조는 `references/naver-structure.md`(고정/유연/진솔 슬롯·문체 -다·이모지 팔레트·주제변형)를 따른다. 산출물은 `docs/content/naver/<slug>.md`(라이트 마크다운).
6. 기존 MDX가 있으면 아래로 초안을 만들고 `naver-structure.md` 규칙대로 편집한다: 문체 -다 통일 · 문단 1~3문장 분절 · 영어/기술 용어 첫 등장 시 한국어 풀이 · 계절 인사 1줄(선택) · 이모지 팔레트(의미 기반, 섹션당 0~1) · `[여기 네 말: …]` 진솔 슬롯은 비워둠(사람이 직접) · 주제변형(제품/빌드로그 vs 회고/후기).

```powershell
pnpm blog:naver -- <slug>        # MDX → docs/content/naver/<slug>.md (형식 보존 초안)
# ← 여기서 naver-structure.md 규칙대로 .md 를 편집 →
pnpm blog:naver:html -- <slug>   # .md → docs/content/naver/<slug>.html (붙여넣기 도구)
```

7. `.html`을 브라우저에서 열고 [본문 복사] → 네이버 글쓰기(SmartEditor ONE)에 Ctrl+V. 굵게·소제목·리스트·링크·이모지는 유지된다. 인용블록·구분선·스티커·이미지는 네이티브 버튼 또는 수동으로 넣는다.
8. 이미지마다 본문과 캡션에서 세 질문에 답하는지 확인한다 — 무엇을 캡처했나 / 독자가 어디를 봐야 하나 / 앞 문장의 어떤 주장을 증명하나. 섹션 캡처는 `scripts/capture-blog-screenshots.mjs`(글별 섹션 설정 필요).
9. 웹 MDX는 `pnpm build`로 렌더를 확인하고, 가능하면 실제 페이지도 브라우저로 확인한다.

## 필수 원칙

- 웹 MDX를 사실, 수치, 링크, 이미지 경로의 기준 원본으로 삼는다.
- 네이버 원고는 자동 변환 결과를 그대로 발행하지 않는다.
- 제목은 과장보다 대상, 문제, 결과를 구체적으로 쓴다.
- 글 첫 부분에서 독자가 얻을 결과를 먼저 말한다.
- `한눈에 요약`은 한국어 2~3문장으로 쓴다.
- 질문형 H2는 2~4개만 자연스럽게 사용하고, 바로 다음 문장에서 답한다.
- 직접 실행한 결과, 실제 수치, 실제 화면을 주장 가까이에 배치한다.
- 일반 MDX에서 지원하지 않는 표, Mermaid, 임의 JSX를 넣지 않는다.
- 로컬 `BlogImage`는 기본 16:9이므로 2400x1350 또는 1600x900 이미지를 우선한다.
- 내부 링크는 실제 존재하는 슬러그만 사용한다.
- 네이버 `.md`는 라이트 마크다운(##·**·>·-·링크)만 쓰고, frontmatter·MDX 태그·코드 펜스·임의 JSX는 남기지 않는다.
- 동일한 외부 링크와 CTA를 반복하지 않는다.
- 발행 전 `references/channel-rules.md`의 체크리스트를 모두 확인한다.

## 참고 자료

- 공통 글 구조: `references/content-model.md`
- 웹·네이버 채널 규칙: `references/channel-rules.md`
- 참고 글에서 가져온 패턴: `references/reference-patterns.md`
- 웹 MDX 템플릿: `assets/web-post.mdx`
- 네이버 글 구조 스펙(슬롯·문체·이모지·주제변형): `references/naver-structure.md`
- 네이버 평문 템플릿: `assets/naver-post.txt`
- MDX → 네이버 마크다운 변환기: `scripts/mdx-to-naver.mjs`
- 네이버 마크다운 → 붙여넣기 HTML: `scripts/naver-to-html.mjs`
