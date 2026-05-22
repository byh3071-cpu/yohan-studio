import { spawn } from "node:child_process"
import { NextResponse, type NextRequest } from "next/server"

export const dynamic = "force-dynamic"

const TIMEOUT_MS = 5 * 60_000
const LOG_TAIL_BYTES = 8_000

type RunResult = {
  exitCode: number | null
  stdout: string
  stderr: string
  timedOut: boolean
}

function isLocalhostHost(host: string | null): boolean {
  if (!host) return false
  const bare = host.split(":")[0]
  return bare === "localhost" || bare === "127.0.0.1" || bare === "::1" || bare === "[::1]"
}

function tail(s: string, max: number): string {
  return s.length > max ? "...(truncated)\n" + s.slice(-max) : s
}

function runQa(): Promise<RunResult> {
  return new Promise((resolve, reject) => {
    const isWin = process.platform === "win32"
    const cmd = isWin ? "npm.cmd" : "npm"
    const child = spawn(cmd, ["run", "qa:test"], {
      cwd: process.cwd(),
      env: process.env,
      shell: false,
      windowsHide: true,
    })

    let stdout = ""
    let stderr = ""
    let timedOut = false

    const timer = setTimeout(() => {
      timedOut = true
      child.kill("SIGTERM")
    }, TIMEOUT_MS)

    child.stdout.on("data", (chunk: Buffer) => {
      stdout += chunk.toString("utf8")
    })
    child.stderr.on("data", (chunk: Buffer) => {
      stderr += chunk.toString("utf8")
    })
    child.on("error", (err) => {
      clearTimeout(timer)
      reject(err)
    })
    child.on("close", (code) => {
      clearTimeout(timer)
      resolve({ exitCode: code, stdout, stderr, timedOut })
    })
  })
}

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "disabled in production" }, { status: 404 })
  }
  if (!isLocalhostHost(request.headers.get("host"))) {
    return NextResponse.json({ error: "localhost only" }, { status: 403 })
  }

  const startedAt = Date.now()
  try {
    const result = await runQa()
    const durationMs = Date.now() - startedAt
    return NextResponse.json({
      ok: result.exitCode === 0 && !result.timedOut,
      exitCode: result.exitCode,
      timedOut: result.timedOut,
      durationMs,
      stdoutTail: tail(result.stdout, LOG_TAIL_BYTES),
      stderrTail: tail(result.stderr, LOG_TAIL_BYTES),
    })
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : String(err),
        durationMs: Date.now() - startedAt,
      },
      { status: 500 },
    )
  }
}
