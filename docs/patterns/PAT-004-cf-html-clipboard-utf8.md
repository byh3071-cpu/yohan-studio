---
id: PAT-004
패턴명: PowerShell 5.1 HTML 클립보드 한글 전멸 — CF_HTML UTF-8 수동 빌드로 우회
카테고리: env
증상: "Set-Clipboard -AsHtml로 넣은 HTML을 브라우저 에디터(네이버 SmartEditor 등)에 붙여넣으면 서식은 살아있는데 한글이 전부 �(mojibake)로 깨짐. 영문·숫자는 정상."
원인: "Windows PowerShell 5.1의 Set-Clipboard -AsHtml이 CF_HTML 페이로드를 시스템 ANSI(CP949)로 인코딩해 클립보드에 넣음. CF_HTML 규격은 UTF-8 바이트 기준 오프셋을 요구하는데, 수신측(Chromium)은 UTF-8로 해석하므로 비ASCII 문자가 전멸."
해결: "CF_HTML 헤더(StartHTML/EndHTML/StartFragment/EndFragment)를 UTF-8 바이트 길이로 직접 계산해 페이로드를 만들고, WinForms DataObject에 'HTML Format'으로 MemoryStream(UTF-8 바이트)을 실어 Clipboard.SetDataObject. 스크립트: scripts/Set-ClipboardHtmlUtf8.ps1 (yohan-studio). 헤더 오프셋은 10자리 zero-pad 고정폭으로 선계산."
적용조건: "Windows PowerShell 5.1에서 비ASCII 텍스트를 HTML 서식으로 클립보드에 넣을 때 전부. PowerShell 7은 -AsHtml 자체가 제거돼 동일 스크립트가 그대로 유효."
출처프로젝트: yohan-studio
태그: [powershell, clipboard, cf-html, encoding, windows, naver]
발견일: 2026-07-13
출처DevLog: "[2026-07-13] [결정] 콘텐츠 OS 수동→반자동 승급"
---

# PAT-004 — PowerShell 5.1 HTML 클립보드 한글 전멸

## 증상
- `Set-Clipboard -Value $html -AsHtml` → 브라우저 리치 에디터에 Ctrl+V
- 구조(굵게·인용·리스트·구분선)는 정상 유지, **한글만 전부 �**
- 영문·숫자·URL 정상이라 "에디터 문제"로 오판하기 쉬움

## 원인
PS 5.1 `Set-Clipboard -AsHtml`은 CF_HTML 페이로드를 ANSI로 인코딩한다.
CF_HTML 규격의 오프셋(StartHTML 등)은 바이트 단위고 수신측은 UTF-8로 읽으므로,
멀티바이트 문자가 있는 순간 오프셋·디코딩이 같이 깨진다.

## 해결
UTF-8 바이트 기준으로 CF_HTML을 직접 조립:

1. 헤더 템플릿을 10자리 zero-pad 고정폭으로 잡아 길이 선계산
2. `[Text.Encoding]::UTF8.GetByteCount()`로 각 구간 오프셋 산출
3. `DataObject.SetData("HTML Format", MemoryStream(UTF8 bytes))` → `Clipboard.SetDataObject($do, $true)`
4. 평문 폴백(`DataFormats.UnicodeText`)도 같은 DataObject에 동봉

실전 스크립트: `scripts/Set-ClipboardHtmlUtf8.ps1` — 네이버 SmartEditor 새니타이저 실험 18/18 서식 생존 + 한글 정상 확인 (2026-07-13).

## 함께 발견된 인접 사실
- SmartEditor는 합성 `ClipboardEvent('paste')`를 무시(isTrusted 체크) → 자동화는 네이티브 Ctrl+V(playwright 키 입력)로만 가능
- 콘솔에 출력되는 한글 mojibake는 표시 문제일 수 있음(PAT-003) — 클립보드 바이트와 콘솔 인코딩을 혼동하지 말 것
