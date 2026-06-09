# Yohan Studio 블로그 이중 발행 시스템

## 기준

웹 MDX가 사실, 수치, 링크, 이미지 경로의 기준 원본이다. 네이버 글은 같은 내용을 독립된 평문으로 다시 편집한다.

| 채널 | 파일 | 역할 |
|---|---|---|
| Yohan Studio | `src/content/blog/<slug>.mdx` | 검색, 내부 링크, 코드, 구조화된 이미지가 포함된 원본 |
| 네이버 블로그 | `docs/content/naver/<slug>.txt` | 노뚝이가 네이버 편집기에 복사하고 이미지를 배치하는 원고 |
| 작성 규칙 | `skills/yohan-dual-blog/SKILL.md` | 두 원고를 함께 작성·검수하는 절차 |

## 새 글 작성

1. `skills/yohan-dual-blog/assets/web-post.mdx`로 웹 초안을 만든다.
2. 수치, 명령어, 실제 이미지와 내부 링크를 검증한다.
3. `skills/yohan-dual-blog/assets/naver-post.txt` 구조로 네이버 원고를 만든다.
4. 두 글의 버전, 테스트 개수, 날짜, 링크가 일치하는지 확인한다.
5. 웹은 `pnpm build`, 네이버는 평문 미리보기로 문단과 이미지 위치를 확인한다.

## 기존 MDX에서 네이버 초안 만들기

```powershell
pnpm blog:naver -- vhk-npm-cli-launch
```

생성 파일:

```text
docs/content/naver/vhk-npm-cli-launch.txt
```

자동 변환기는 frontmatter와 MDX 문법을 제거하고 이미지 위치를 표시한다. 자동 생성된 문장은 발행본이 아니다. 짧은 문단, 기술 용어 설명, 링크 중복, 이미지 앞 설명을 사람이 다시 다듬어야 한다.

## 노뚝이 발행 순서

1. `docs/content/naver/<slug>.txt`에서 제목을 네이버 제목 칸에 붙인다.
2. `본문` 아래 내용을 붙인다.
3. `[이미지 삽입: ...]` 위치에 실제 이미지를 넣고 표시자는 지운다.
4. 원문·npm·GitHub 링크가 실제로 열리는지 확인한다.
5. 마지막 해시태그 5~8개를 등록한다.
6. 발행 후 네이버 URL을 웹 글이나 Dev Log에 기록한다.

## 품질 기준

- 결과가 첫 5줄 안에 나온다.
- 성공뿐 아니라 실제 실패, 원인, 해결이 있다.
- 이미지는 앞 문장의 증거이며 핵심 글자가 선명하다.
- 같은 수치와 링크가 채널마다 달라지지 않는다.
- 반복 CTA와 과도한 감정 표현을 줄인다.
- 질문형 제목 바로 아래에 답부터 쓴다.
