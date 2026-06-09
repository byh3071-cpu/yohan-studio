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
5. 네이버 글은 `assets/naver-post.txt`와 네이버 규칙을 적용해 `docs/content/naver/<slug>.txt`에 둔다.
6. 기존 MDX가 있으면 다음 명령으로 평문 초안을 만든 뒤 사람이 읽는 문장으로 다시 편집한다.

```powershell
pnpm blog:naver -- <slug>
```

7. 이미지마다 본문과 캡션에서 다음 세 질문에 답하는지 확인한다.
   - 무엇을 캡처한 이미지인가?
   - 독자가 어디를 봐야 하는가?
   - 앞 문장의 어떤 주장을 증명하는가?
8. `pnpm build`로 MDX 렌더를 확인하고, 가능하면 실제 블로그 페이지도 브라우저로 확인한다.

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
- 네이버 글에는 frontmatter, MDX 태그, 코드 펜스, 내부 경로를 남기지 않는다.
- 동일한 외부 링크와 CTA를 반복하지 않는다.
- 발행 전 `references/channel-rules.md`의 체크리스트를 모두 확인한다.

## 참고 자료

- 공통 글 구조: `references/content-model.md`
- 웹·네이버 채널 규칙: `references/channel-rules.md`
- 참고 글에서 가져온 패턴: `references/reference-patterns.md`
- 웹 MDX 템플릿: `assets/web-post.mdx`
- 네이버 평문 템플릿: `assets/naver-post.txt`
- MDX 평문 변환기: `scripts/mdx-to-naver.mjs`
