---
pattern: Gemini preview 모델 alias 폐기로 인한 API generateContent 실패
category: build
discovered: 2026-05-28
source_project: yohan-studio
source_devlog: docs/log/2026-05-28.md
tags: [gemini, google-generative-ai, model-deprecation, api, ai-sdk]
---

# 패턴 — Gemini preview 모델 alias 폐기

## 증상

Gemini API 호출 시 다음 오류 발생:

```
models/gemini-2.5-flash-preview-05-20 is not found for API version v1beta,
or is not supported for generateContent. Call ModelService.ListModels to see
the list of available models and their supported methods.
```

- 코드는 변경 없음, 모델 알 수 없는 시점에 깨짐
- 모델명에 `-preview-MM-DD` 같은 날짜 suffix가 있음

## 원인

Google은 Gemini 모델을 두 단계로 출시한다:

1. **Preview alias**: `gemini-X.Y-flash-preview-YYYY-MM-DD` — 베타 단계, 일정 기간 유지
2. **Stable alias**: `gemini-X.Y-flash` — 정식 출시 후 preview alias 폐기

preview alias는 stable이 출시되면 **별도 공지 없이 retire**될 수 있다. 안정 채널을 쓰지 않으면 어느 날 API 호출이 통째로 실패한다.

## 해결

모델명을 stable로 교체:

```diff
- model: google("gemini-2.5-flash-preview-05-20"),
+ model: google("gemini-2.5-flash"),
```

### 가용 모델 조회 (확인용)

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models?key=$GEMINI_API_KEY"
```

### env로 외부화 (재발 방지)

```ts
model: google(process.env.GEMINI_MODEL ?? "gemini-2.5-flash"),
```

`.env.local`:
```
GEMINI_MODEL=gemini-2.5-flash
```

이렇게 하면 향후 모델 교체 시 코드 수정 없이 env만 갱신.

## 적용 조건

- Vercel AI SDK (`@ai-sdk/google`) 또는 Google Generative AI SDK 사용
- 모델 ID에 `-preview-`, `-experimental-`, `-exp-`, `-rc-` 등 비안정 채널 suffix 포함
- 챗봇·LLM 호출이 production에서 갑자기 실패하는 경우

## 일반화 — preview 모델 운영 원칙

다른 LLM 벤더에도 적용 가능한 원칙:

| 벤더 | 안정 alias 예시 | 회피할 패턴 |
|---|---|---|
| Google Gemini | `gemini-2.5-flash`, `gemini-2.5-pro` | `*-preview-MM-DD`, `*-exp-MM-DD` |
| OpenAI | `gpt-4o`, `gpt-4o-mini` | `gpt-4o-2024-05-13` 같은 날짜 snapshot은 retire 가능 |
| Anthropic | `claude-opus-4-7` (latest alias) | `claude-3-5-sonnet-20240620` 등 dated snapshot |

**원칙:** production에는 stable/latest alias만 쓰고, A/B 테스트나 일시 평가에만 dated snapshot 사용.

## 빠른 진단 체크리스트

`models/X is not found` 또는 `is not supported for generateContent` 오류 발생 시:

1. 모델 ID에 `preview` / `exp` / 날짜 suffix가 있는가? → 폐기 가능성 1순위
2. 벤더 가용 모델 리스트 API로 확인
3. stable alias로 교체 후 dev 서버 재시작
4. env로 외부화하여 재발 방지
