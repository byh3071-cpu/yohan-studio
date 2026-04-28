@AGENTS.md

## /done command

When the user runs `/done` or asks to end the session with a handoff summary:

1. Use repo + conversation to fill the block. For **변경 파일** and **커밋**, use current git state (e.g. `git status --short`, `git diff --stat`, latest `git log --oneline` as needed). Do not ask the user to run a terminal script first.
2. Output **only** the following block (fill every line; use "없음" or "N/A" if empty):

### 📋 세션 요약

- **날짜**: YYYY-MM-DD (local calendar day)
- **작업**: (한 줄 요약)
- **변경 파일**: (목록)
- **커밋**: (해시 or 메시지)
- **다음 액션**: (1~3개)
- **이슈/블로커**: (있으면)

Purpose: user pastes this into Notion EXECUTION LOG (semi-automated workflow until git-push automation is wired).

Optional (no agent): `npm run session:context` prints the same git facts for copy-paste.

---

## 현재 상태 (노뚝이 — 마지막 갱신: 2026-04-29)

- **Phase**: 2 완료, 블로그 글 작성 단계
- **다음 작업**: vibe-coding-2hr-deploy.mdx 배치 + 썸네일 이미지
- **블로커**: 없음
- **참고**: docs/session-notes/2026-04-29.md

> 이 섹션은 노뚝이(Notion AI)가 정리한 내용을 사람이 붙여넣는다.
> 자동 패치 금지 — 반드시 사람 확인 후 갱신.

Long-form session history: append-only files under `docs/session-notes/` (one file per day, optional).
