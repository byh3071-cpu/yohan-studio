export const VHK_INSTALL_CMD = "npm i -g @byh3071/vhk"

export const VHK_LINKS = {
  github: "https://github.com/byh3071-cpu/vhk",
  npm: "https://www.npmjs.com/package/@byh3071/vhk",
  disquiet: "https://disquiet.io/@byh3071",
} as const

export type VhkPain = {
  num: string
  emoji: string
  heading: string
  text: string
}

export const vhkPains: VhkPain[] = [
  {
    num: "01",
    emoji: "😩",
    heading: ".cursorrules 재작성",
    text: "Cursor에서 Windsurf, Zed로 옮길 때마다 룰 파일을 처음부터 다시 짠다.",
  },
  {
    num: "02",
    emoji: "😩",
    heading: "CLAUDE.md 다시 세팅",
    text: "Claude Code로 갈아탔는데 프로젝트 운영 규칙을 또 처음부터 적는다.",
  },
  {
    num: "03",
    emoji: "😩",
    heading: "프로젝트 컨텍스트 재설명",
    text: "새 세션마다 \"이 프로젝트는 ~~ 이고 ~~ 하는 거야\"를 반복한다.",
  },
  {
    num: "04",
    emoji: "😩",
    heading: "세션 기록 망각",
    text: "지난 세션에서 뭘 결정했는지, 어디까지 했는지 기억나지 않는다.",
  },
]

export type VhkCommand = {
  name: string
  symbol: string
  desc: string
}

export const vhkCommands: VhkCommand[] = [
  { name: "gate", symbol: "🚦", desc: "아이디어 검증 (GO/다듬기)" },
  { name: "init", symbol: "🚀", desc: "프로젝트 세팅 원클릭" },
  { name: "sync", symbol: "🔄", desc: "RULES.md → IDE 규칙 동기화" },
  { name: "recap", symbol: "🧠", desc: "Git 변경 → docs/log/ 세션 로그" },
  { name: "check", symbol: "✅", desc: "RULES.md 규칙 린트" },
  { name: "ship", symbol: "📦", desc: "출하 전 체크 · 회고 · build-log" },
  { name: "secure", symbol: "🔒", desc: "보안 스캔" },
  { name: "context", symbol: "📋", desc: ".vhk/context.md 생성" },
  { name: "memory", symbol: "💾", desc: ".vhk/memory.json 결정 기록" },
  { name: "goal", symbol: "🎯", desc: "Goal 단계별 미션 (init/list/next/check/done)" },
  { name: "blocker", symbol: "🚧", desc: "블로커 기록 + HARD_STOP\n트립와이어" },
  { name: "learn", symbol: "📚", desc: "교훈 기록\n(docs/state/learnings.md)" },
  { name: "resume", symbol: "▶️", desc: "HARD_STOP 해제\n(--confirm 필수)" },
]

/** v1.0.x — Spec 섹션 디렉토리 트리 (README 정합) */
export type VhkHeroDemoStep = {
  label: string
  command: string
  output: string[]
}

/** Hero 터미널 데모 시나리오 (gate → init → sync 루프) */
export const vhkHeroDemoSteps: VhkHeroDemoStep[] = [
  {
    label: "install",
    command: VHK_INSTALL_CMD,
    output: ["", "added 1 package in 2s", "✓ @byh3071/vhk@1.0.2"],
  },
  {
    label: "gate",
    command: "vhk gate",
    output: ["", "🚦 아이디어 검증 · 퀵 5문항", "✓ GO — 지금 만들어도 됩니다"],
  },
  {
    label: "init",
    command: "vhk init",
    output: ["", "🚀 프로젝트 초기화", "✓ CLAUDE.md · .cursorrules · docs/"],
  },
  {
    label: "sync",
    command: "vhk sync",
    output: [
      "",
      "🔄 RULES.md → IDE 규칙",
      "✓ .cursorrules · CLAUDE.md · AGENTS.md",
    ],
  },
]

export const VHK_SPEC_TREE_V1 = `// v1.3 — 프로젝트 루트
RULES.md                  ← 마스터 규칙 (vhk sync 소스)
CLAUDE.md                 ← Claude Code
AGENTS.md                 ← Codex / 범용 에이전트
.cursorrules               ← Cursor
docs/
├── log/                   ← vhk recap 세션 로그
├── adr/
├── troubleshooting/
└── state/
    ├── next-task.md       ← vhk goal next 산출 (SoT)
    ├── blockers.md        ← vhk blocker (3건 → HARD_STOP)
    └── learnings.md       ← vhk learn

// v1.3 — goals/ + scripts/ (자율 하네스)
goals/
├── _meta.md
├── 0-mcp-full-coverage.md
├── 1-goal-command.md
└── 2-agent-loop.md
scripts/
├── check-meta.sh
├── check-goal-0.sh
├── check-goal-1.sh
└── check-goal-2.sh

// v1.3 — .vhk/
.vhk/
├── HARD_STOP              ← 트립와이어 (gitignored)
├── context.md             ← vhk context
├── memory.json            ← vhk memory
├── brief.md               ← vhk brief
└── refs.json              ← vhk ref`

/** v0.4 ~ v1.3 — minor 단위 진화 타임라인 (실제 git tag 날짜 기준) */
export type VhkVersion = {
  version: string
  date: string
  tag: string
  headline: string
  bullets: string[]
  github: string
  current?: boolean
}

const RELEASES_BASE = `${VHK_LINKS.github}/releases`

export const vhkEvolution: VhkVersion[] = [
  {
    version: "v0.4",
    date: "2026-05-23",
    tag: "시작",
    headline: "메뉴에서 골라 쓰는 CLI + 한국어 지원",
    github: RELEASES_BASE,
    bullets: [
      "vhk 만 치면 메뉴가 열린다 — 다음 작업을 골라서 시작",
      "한국어 별칭: vhk 검증 · vhk 시작 · vhk 정리",
      "자연어 입력: \"프로젝트 만들고 싶어\" → vhk 시작 자동 실행",
      "doctor — Node·Git·npm 환경 점검",
      "ship — 배포 전 체크리스트 + 회고",
    ],
  },
  {
    version: "v0.5",
    date: "2026-05-23",
    tag: "저장",
    headline: "저장·되돌리기·비교 — 깃 작업을 한 줄로",
    github: RELEASES_BASE,
    bullets: [
      "save — 저장 + 커밋 + 푸시를 한 번에",
      "undo — 되돌리기 1~5단계, 원격 푸시 전 경고",
      "diff — 뭐가 바뀌었는지 요약 + 브랜치 비교",
      "save/init/recap 전 .env 보안 경고",
    ],
  },
  {
    version: "v0.6",
    date: "2026-05-24",
    tag: "연결",
    headline: "커서에서 바로 쓰는 MCP 8가지 도구",
    github: `${RELEASES_BASE}/tag/v0.6.0`,
    bullets: [
      "vhk mcp — 커서가 직접 vhk 명령을 부르는 서버 시작",
      "vhk mcp-init — 커서 설정 파일(.cursor/mcp.json) 자동 생성",
      "8개 기본 도구: save · undo · status · diff · ship · doctor · check · recap",
      "보안: 모든 명령을 안전한 방식으로 호출 (셸 주입 차단)",
    ],
  },
  {
    version: "v0.7",
    date: "2026-05-24",
    tag: "배포",
    headline: "배포·환경변수·퍼블리시 자동화",
    github: `${RELEASES_BASE}/tag/v0.7.0`,
    bullets: [
      "deploy — Vercel·Netlify·Cloudflare 자동 감지 후 배포",
      "env — .env → .env.example 동기화 + .gitignore 자동 등록",
      "env-check — 빠뜨린 환경변수 검사",
      "publish — 버전 올리기 + 빌드 + 테스트 + npm 출시 + 깃 태그",
    ],
  },
  {
    version: "v0.8",
    date: "2026-05-24",
    tag: "디자인",
    headline: "테마·팔레트·레퍼런스 관리",
    github: `${RELEASES_BASE}/tag/v0.8.0`,
    bullets: [
      "design — 컬러 팔레트 4종(Minimal·Vibrant·Corporate·Pastel) → tokens.css 생성",
      "theme — 다크·라이트 모드 CSS + 토글 함수 자동 생성",
      "ref — 참고 사이트 URL 모아두고 브라우저로 열기",
    ],
  },
  {
    version: "v0.9",
    date: "2026-05-24",
    tag: "품질",
    headline: "하네스·보안 점검·마이그레이션",
    github: `${RELEASES_BASE}/tag/v0.9.1`,
    bullets: [
      "harness — lint · 타입 검사 · 테스트 · 빌드를 한 번에 실행",
      "audit — npm 보안 취약점 검사, 위험 발견 시 자동 수정 옵션",
      "migrate — npm·yarn·pnpm 패키지 매니저 전환",
      "update — VHK 자체를 최신 버전으로 셀프 업데이트",
    ],
  },
  {
    version: "v1.0",
    date: "2026-05-24",
    tag: "안정",
    headline: "공개 버전 — 맥락·기억·브리프",
    github: `${RELEASES_BASE}/tag/v1.0.0`,
    bullets: [
      "공개 API 안정성 약속 — 명령어 · 인자 · .vhk/ 포맷은 v2.0까지 안 바뀜",
      "context — 디렉토리 트리 + 기술 스택 + 명령 목록 → .vhk/context.md",
      "memory — .vhk/memory.json 에 결정 사항 누적 저장",
      "brief — 깃 상태 + 메모리 + 레퍼런스 통합 보고서",
      "MCP 도구 8 → 24개로 확장",
    ],
  },
  {
    version: "v1.3",
    date: "2026-05-28",
    tag: "자율",
    headline: "목표 체계 + 자율 루프 + 비상 정지",
    current: true,
    github: `${RELEASES_BASE}/tag/v1.3.0`,
    bullets: [
      "goal — 목표를 init·list·next·check·done 으로 단계별 관리",
      "자율 루프 — goal next → 작업 → check → done. 실패 3회면 자동 블로커 기록",
      "blocker 3건 누적 → .vhk/HARD_STOP 비상 정지 (자동 해제 안 됨)",
      "learn — 교훈을 docs/state/learnings.md 에 누적 (별도 SoT)",
      "resume --confirm — 사람이 직접 확인해야만 HARD_STOP 해제",
    ],
  },
]

/** v2.0+ — 메이저 시리즈 카드 (minor 누적되면 시리즈로 묶는다) */
export type VhkSeries = {
  label: string
  version: string
  range: string
  headline: string
  desc: string
  future?: boolean
}

export const vhkSeries: VhkSeries[] = [
  {
    label: "v1 시리즈 · 종료됨",
    version: "v1.x",
    range: "v1.0 출시 → v1.3 (2026-05-24 ~ 2026-05-28)",
    headline: "맥락 + 자율 하네스",
    desc: "공개 API 약속 + 맥락·기억·브리프 3종 + 목표 체계 + 자율 루프. 14 → 35 명령어, MCP 8 → 24 도구.",
  },
  {
    label: "v2 시리즈 · 계획",
    version: "v2.x",
    range: "2026 하반기",
    headline: "스스로 배우는 맥락 (Layer 2)",
    desc: "맥락이 스스로 진화한다. 세션마다 학습 → 규칙 갱신. 자세한 비전은 아래 로드맵 섹션.",
    future: true,
  },
]

export type VhkRoadmapPhase = {
  phase: string
  title: string
  desc: string
  state: "지금" | "다음" | "그 다음" | "최종"
  color: string
}

export const vhkRoadmap: VhkRoadmapPhase[] = [
  {
    phase: "Layer 1",
    title: "포터빌리티",
    desc: "컨텍스트를 옮긴다 — 어떤 IDE를 쓰든 .vhk/ 하나로 따라온다. goals 체계 + 자율 루프로 AI 에이전트가 스스로 목표를 추적하고, MCP 24 tool 로 IDE 내에서 직접 호출한다.",
    state: "지금",
    color: "#22C55E",
  },
  {
    phase: "Layer 2",
    title: "인텔리전스",
    desc: "컨텍스트가 스스로 진화한다 — 세션마다 학습해 규칙을 갱신.",
    state: "다음",
    color: "#3B82F6",
  },
  {
    phase: "Layer 3",
    title: "플랫폼",
    desc: "컨텍스트를 공유하고 거래한다 — 팀, 커뮤니티, 마켓플레이스.",
    state: "그 다음",
    color: "#A855F7",
  },
  {
    phase: "Layer 4",
    title: "프로토콜",
    desc: ".vhk가 AI 코딩 컨텍스트의 업계 표준이 된다.",
    state: "최종",
    color: "#FACC15",
  },
]

