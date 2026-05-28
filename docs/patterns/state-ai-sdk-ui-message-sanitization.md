---
pattern: AI SDK UIMessage 서버 검증 과도화로 인한 대화 실패
category: state
tags:
  - ai-sdk
  - chat
  - validation
  - error-handling
discovered: 2026-05-29
source_project: Yohan Studio
source_devlog: notion-devlog:yohan-studio-chat-message-sanitize-2026-05-29
---

# 패턴명
AI SDK UIMessage 서버 검증 과도화로 인한 대화 실패

# 카테고리
state

# 증상
AI SDK `useChat` 기반 챗봇에서 첫 응답 이후 후속 질문을 보내면 API가 `400 Invalid messages`를 반환한다.
프론트에는 오류 메시지가 말풍선 아래에 노출되고, 대화가 더 이상 이어지지 않는다.

# 원인
서버 라우트가 `UIMessage.parts`의 모든 part를 `type: "text"`로 강제 검증했다.
하지만 AI SDK의 assistant 메시지는 스트리밍/도구/추론/파일/소스 등 텍스트 외 part를 포함할 수 있다.
이 상태를 그대로 차단하면 정상 대화 히스토리도 악성 입력처럼 거부된다.

# 해결
클라이언트가 보낸 메시지를 그대로 신뢰하지 말고, 서버에서 허용할 텍스트만 재구성한다.

- `system` role은 서버 system prompt만 사용하고 클라이언트 입력에서는 차단한다.
- `user`/`assistant` 메시지의 text part만 추출한다.
- 빈 사용자 메시지와 길이 제한 초과 메시지는 거부한다.
- 모델 호출에는 sanitization 이후의 `UIMessage[]`만 전달한다.

# 적용조건
AI SDK `useChat` 또는 유사한 UI 메시지 스트림을 API 라우트로 전달하고, 서버에서 메시지 히스토리를 재검증하는 구조.

# 출처프로젝트
Yohan Studio

# 태그
ai-sdk, chat, validation, error-handling

# 발견일
2026-05-29

# 출처DevLog
notion-devlog:yohan-studio-chat-message-sanitize-2026-05-29
