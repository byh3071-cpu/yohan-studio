---
name: goal
description: >-
  VHK goal 워크플로 — 한 번에 목표 하나, 게이트 통과 전 완료 거부. Use when the user
  invokes /goal, asks for the next task, goal check/done, or wants Claude Code /
  Codex style single-goal agent loops (vhk goal next → work → check → done).
disable-model-invocation: true
---

# /goal — VHK Goal Loop

Claude Code·Codex·Cursor가 **같은 SoT**로 협업하도록 VHK CLI를 컨트롤러로 쓴다.
파일만 읽는 Cursor 전용 루프(B)는 게이트를 우회할 수 있어 **보조 읽기**로만 쓴다.

## Parse

`/goal [subcommand] [args]`

| 입력 | 동작 |
| --- | --- |
| `/goal` | 현재 상태 요약 (list + active goal 파일) |
| `/goal init` | `vhk goal init` — goals/ + docs/state/ 스캐폴딩 |
| `/goal list` | `vhk goal list` |
| `/goal next` | `vhk goal next` → active goal 작업 시작 |
| `/goal check` | `vhk goal check` (옵션: `--id N`) |
| `/goal done` | `vhk goal done` (옵션: `--id N`) — **게이트 통과 시에만** DONE |
| `/goal sync` | `vhk goal sync` — check-goal 스크립트 백필 |
| `/goal drift` | `vhk goal drift` — status↔코드 불일치 점검 |
| `/goal loop` | 자율 루프 1사이클 (아래) |
| 빈/알 수 없음 | Usage 출력 |

## Preconditions (매 사이클)

1. `.vhk/HARD_STOP` 존재 시 **모든 자동화 중단**. `vhk resume --confirm`은 사용자만.
2. `goals/` 없으면 `vhk goal init` 제안 후 중단.
3. `vhk` 미설치 시: `npm i -g @byh3071/vhk` 안내.

## Core Loop (권장 — A)

**1 PR = 1 goal.** 에이전트는 한 번에 active goal 하나만 진행한다.

```
vhk goal next
  → docs/state/next-task.md 갱신 (SoT)
  → goals/<id>-*.md 본문 + scripts/check-goal-<id>.mjs 읽기
  → 구현 (scope 최소)
vhk goal check
  → 실패 시 수정 후 재시도 (거짓 완료 금지)
vhk goal done
  → 게이트 재검증 → 통과 시 status=DONE
  → 다음: vhk goal next
```

### Read path (B — CLI가 쓴 결과만 신뢰)

`vhk goal next` **이후**에만 읽기:

- `docs/state/next-task.md` — 현재 작업 포인터
- `goals/<id>-*.md` — 체크리스트·완료 조건
- `goals/_meta.md` — 공통 게이트·금지 행동
- `docs/state/blockers.md` — 활성 블로커

`next-task.md`만 보고 CLI 없이 status를 바꾸지 않는다.

## /goal (status)

1. `vhk goal list` 실행.
2. active goal이 있으면 해당 `goals/*.md` + `docs/state/next-task.md` 읽기.
3. 요약 출력:

```markdown
## Goal 상태
- Active: Goal {id} — {title} ({status})
- 게이트: scripts/check-goal-{id}.mjs
- Blockers: {n}건 (3건 시 HARD_STOP)
- 다음 액션: {한 줄}
```

## /goal next

1. `vhk goal next` 실행.
2. 실패/빈 목록이면 init 또는 새 goal 파일 추가 안내.
3. `docs/state/next-task.md` + active `goals/<id>-*.md` 읽기.
4. goal 본문의 체크리스트를 이번 턴 scope로 고정하고 작업 시작.
5. **다른 goal·무관 리팩터 금지** (goals/_meta.md Forbidden 준수).

## /goal check

1. `vhk goal check` (또는 `--id N`) 실행.
2. exit 0 → 게이트 통과 보고.
3. exit ≠ 0 → 실패 로그 요약 + 수정 후 재실행. `vhk goal done` 호출 금지.

## /goal done

1. 사용자가 명시적으로 완료를 요청했을 때만.
2. `vhk goal done` 실행 — **CLI가 게이트를 다시 돌린다**.
3. 통과 시에만 DONE. 실패 시 원인 수정 후 `/goal check`부터.
4. 통과 후 `vhk goal next` 제안 (다음 goal 있으면).

## /goal loop

한 턴에서 자율 1사이클:

1. HARD_STOP · goals/ 확인
2. `vhk goal next` (이미 IN_PROGRESS면 skip)
3. active goal 구현
4. `vhk goal check` — 실패 시 수정 루프 (최대 3회, 이후 `vhk blocker "..."` 기록 제안)
5. check 통과 + 사용자가 loop 완료를 원하면 `vhk goal done`
6. 짧은 결과 보고 (변경 파일, 게이트 결과, 다음 goal)

## MCP (선택)

VHK MCP(`vhk`)가 연결돼 있으면:

- `status` — 브랜치·변경 요약
- `check` — 프로젝트 구조 점검

goal 전이(next/check/done)는 **shell `vhk goal …`** 이 SoT. MCP로 status를 대체하지 않는다.

## 금지

- 게이트 실패 상태에서 goal frontmatter를 수동으로 `DONE` 변경
- `vhk goal check` 없이 "완료했습니다" 선언
- active goal과 무관한 대규모 변경
- HARD_STOP 무시하고 자동화 계속
- Windows에서 `.sh` 게이트만 두기 — `vhk goal sync`로 `.mjs` 사용

## 새 goal 추가 (요약)

1. `goals/<id>-<slug>.md` — frontmatter `type: goal`, 숫자 `id`, `status: NOT_STARTED`
2. 본문에 완료 조건·체크리스트
3. `vhk goal sync` → `scripts/check-goal-<id>.mjs` 생성/보완
4. goal 고유 검증은 스크립트 하단에 추가

스키마 전체: `goals/_meta.md` (init 후 생성).

## Examples

**시작**
```
/goal init
/goal next
```

**작업 중 점검**
```
/goal check
```

**완료**
```
/goal done
```

**자율 1사이클**
```
/goal loop
```
