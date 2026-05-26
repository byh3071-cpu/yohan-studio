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
]

export type VhkProductRole = {
  product: string
  layer: string
  role: string
}

export const vhkProductRoles: VhkProductRole[] = [
  { product: "SnapContext", layer: "브라우저 확장", role: "웹 컨텍스트 캡처" },
  { product: "VHK CLI", layer: "프로젝트 CLI", role: "AI 코딩 컨텍스트 하네스" },
  { product: "Yohan Studio", layer: "사이트/OS", role: "스튜디오 허브 · 블로그" },
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

export const VHK_SPEC_TREE_V1 = `// v1.0 — 프로젝트 루트
RULES.md                  ← 마스터 규칙 (vhk sync 소스)
CLAUDE.md                 ← Claude Code
.cursorrules               ← Cursor
docs/
├── log/                   ← vhk recap 세션 로그
├── adr/
└── troubleshooting/

// v1.0 — .vhk/
.vhk/
├── context.md             ← vhk context
├── memory.json            ← vhk memory
├── brief.md               ← vhk brief
└── refs.json              ← vhk ref`

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
    desc: "컨텍스트를 옮긴다 — 어떤 IDE를 쓰든 .vhk/ 하나로 따라온다.",
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

