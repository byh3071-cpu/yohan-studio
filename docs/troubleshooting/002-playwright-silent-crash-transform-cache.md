# 002 — Playwright `qa:test` 무출력 즉시 종료 (0xC0000409)

날짜: 2026-07-12

## 증상

- `npm run qa:test` 실행 시 스크립트 헤더만 출력하고 테스트가 전혀 실행되지 않은 채 종료.
- Git Bash에서는 exit code 127, PowerShell에서는 `-1073740791`(0xC0000409, STATUS_STACK_BUFFER_OVERRUN).
- 에러 메시지·리포트 전혀 없음. `playwright --version`, `require('@playwright/test')`는 정상.
- 직전 세션(Codex)에서 첫 실행은 정상(7 passed)이었고, 이후부터 재현율 100%로 실패.

## 원인

Playwright 변환 캐시(`%LOCALAPPDATA%\Temp\playwright-transform-cache`)와 스펙 파일의
V8 code cache 충돌. **스펙/설정 파일을 수정한 뒤 이전 캐시가 남아 있으면 결정적으로 크래시**한다
(이 환경: Node 24.13.0 + @playwright/test 1.60.0, Windows 11).

재현으로 확인한 패턴:

- 파일 수정 후 첫 실행(이전 캐시 잔존) → 100% 크래시
- `clear-cache` 직후 → 100% 정상 (같은 파일, 같은 내용)
- 동일 내용을 캐시 키가 다른 폴더에 복사 → 100% 정상

당초 "강제 종료로 인한 1회성 손상"으로 추정했으나, 정상 종료 후에도 파일을 수정하면
재발하는 것을 확인했다. 파일이 바뀔 때마다 발생하는 구조적 문제다.

## 해결

```bash
npx playwright clear-cache
```

즉시 8/8 통과. 재발 방지로 `package.json`의 `qa:test`를
`playwright clear-cache && playwright test`로 변경했다(스펙 1개라 재컴파일 비용 무시 가능).

## 교훈

- Playwright가 **무출력으로 즉시 죽으면** 코드·포트 문제보다 먼저 `clear-cache`를 시도한다.
- 이 환경에서는 스펙 파일을 수정할 때마다 재발하므로 qa:test에 clear-cache가 선행돼야 한다.
- 0xC0000409(STATUS_STACK_BUFFER_OVERRUN)는 V8 code cache 문제의 전형적 신호.
- 부차 발견: 포트 3050에 응답 없는 좀비 `node` 프로세스가 남아 있으면 Playwright webServer(reuseExistingServer)가 무한 대기한다. `Get-NetTCPConnection -LocalPort 3050`으로 확인 후 정리.
