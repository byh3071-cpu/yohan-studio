#!/usr/bin/env node
import { execSync, spawn } from 'node:child_process'
import fs from 'node:fs'

const port = process.env.PORT ?? '3050'

function sh(cmd) {
  try {
    execSync(cmd, { stdio: 'pipe' })
    return true
  } catch {
    return false
  }
}

function killPortWin32(p) {
  const out = execSync(`netstat -ano | findstr :${p}`, { encoding: 'utf8' })
  const pids = new Set()
  for (const line of out.split(/\r?\n/)) {
    if (!line.includes('LISTENING')) continue
    const parts = line.trim().split(/\s+/)
    const pid = parts[parts.length - 1]
    if (pid && pid !== '0') pids.add(pid)
  }
  for (const pid of pids) {
    sh(`taskkill /PID ${pid} /F`)
    console.log(`freed port ${p} (pid ${pid})`)
  }
}

function killPortUnix(p) {
  sh(`lsof -ti :${p} | xargs kill -9 2>/dev/null`)
}

fs.rmSync('.next', { recursive: true, force: true })
console.log('removed .next')

if (process.platform === 'win32') {
  try {
    killPortWin32(port)
  } catch {
    /* port already free */
  }
} else {
  killPortUnix(port)
}

const child = spawn('npx', ['next', 'dev', '-p', port], {
  stdio: 'inherit',
  shell: true,
})

child.on('exit', (code) => process.exit(code ?? 0))
