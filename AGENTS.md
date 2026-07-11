<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Git 워크플로우 (모든 에이전트 공통 — 2026-07-12부터 강제)

- **master 직푸시 금지.** 브랜치 보호가 걸려 있어 직푸시는 GitHub이 거부한다(`protected branch hook declined`). 관리자 토큰도 예외 없음.
- 모든 변경은 **브랜치 → PR → CI `build` 체크 green → squash 머지**. 브랜치명은 `feat/…`, `fix/…`, `docs/…`, `ci/…`.
- 오토머지 사용 가능: `gh pr merge <n> --squash --auto` — build green이면 자동 머지되고 브랜치는 자동 삭제된다.
- 커밋·PR에 AI 흔적 금지: `Co-Authored-By: Claude/Codex`, `🤖 Generated` 등 트레일러·문구 넣지 않는다. 메시지는 한국어 명사형 한 줄 + 필요할 때만 "왜" 1~3줄.
- 작업 시작 전 `git fetch` + master 최신화 필수 — 같은 디렉토리에서 복수 세션이 작업하므로 로컬 master가 낡았을 수 있다.
- 독립 서브프로젝트를 추가하면 즉시 `tsconfig.json` exclude에 등록한다 (standalone/ 타입에러로 배포 3연속 실패했던 사례).

## 블로그 발행

- 웹 블로그의 기준 원본은 `src/content/blog/*.mdx`다.
- 네이버 블로그용 평문은 `docs/content/naver/<slug>.txt`에 함께 만든다.
- 새 글 작성, 노션 초안 변환, 네이버 원고 생성 시 `skills/yohan-dual-blog/SKILL.md`를 따른다.
- 네이버 원고는 MDX 자동 변환본을 그대로 발행하지 말고 문단, 이미지 위치, 링크 중복을 다시 편집한다.
