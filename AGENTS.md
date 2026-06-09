<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## 블로그 발행

- 웹 블로그의 기준 원본은 `src/content/blog/*.mdx`다.
- 네이버 블로그용 평문은 `docs/content/naver/<slug>.txt`에 함께 만든다.
- 새 글 작성, 노션 초안 변환, 네이버 원고 생성 시 `skills/yohan-dual-blog/SKILL.md`를 따른다.
- 네이버 원고는 MDX 자동 변환본을 그대로 발행하지 말고 문단, 이미지 위치, 링크 중복을 다시 편집한다.
