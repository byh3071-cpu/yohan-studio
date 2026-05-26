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
  { name: "init", symbol: "🚀", desc: "프로젝트 세팅 원클릭" },
  { name: "sync", symbol: "🔄", desc: "규칙 파일 동기화" },
  { name: "recap", symbol: "🧠", desc: "세션 기록 자동 생성" },
  { name: "check", symbol: "✅", desc: "프로젝트 품질 체크" },
  { name: "ship", symbol: "📦", desc: "배포 준비 자동화" },
  { name: "secure", symbol: "🔒", desc: "보안 스캔" },
  { name: "context", symbol: "📋", desc: "프로젝트 맥락 관리" },
  { name: "memory", symbol: "💾", desc: "결정사항 기록" },
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

export type VhkSpecNode = {
  path: string
  desc: string
}

export const vhkSpecTree: VhkSpecNode[] = [
  { path: "rules/universal.md", desc: "마스터 규칙 (한 번 작성)" },
  { path: "rules/.cursorrules", desc: "Cursor용 (자동 생성)" },
  { path: "rules/CLAUDE.md", desc: "Claude용 (자동 생성)" },
  { path: "context/project.md", desc: "프로젝트 정의" },
  { path: "memory/decisions.md", desc: "결정사항 기록" },
  { path: "prompts/", desc: "재사용 프롬프트" },
]
