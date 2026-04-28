#!/usr/bin/env node
import { execSync } from 'node:child_process'

function sh(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8', maxBuffer: 2 * 1024 * 1024 }).trimEnd()
  } catch {
    return '(command failed — run from repo root with git available)'
  }
}

function localYmd() {
  const t = new Date()
  const y = t.getFullYear()
  const m = String(t.getMonth() + 1).padStart(2, '0')
  const d = String(t.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const today = localYmd()
const log = sh('git log --oneline -5')
const stat = sh('git diff --stat')
const st = sh('git status --short')
const branch = sh('git rev-parse --abbrev-ref HEAD')
const head = sh('git rev-parse --short HEAD')

console.log(`Paste into /done or Notion (facts only; you still run /done in the agent for the full block).

### Git snapshot (${today})
- **branch**: ${branch}
- **HEAD**: ${head}

**git log -5**
\`\`\`
${log}
\`\`\`

**git diff --stat** (uncommitted vs index/worktree)
\`\`\`
${stat || '(no diff)'}
\`\`\`

**git status --short**
\`\`\`
${st || '(clean)'}
\`\`\`
`)
