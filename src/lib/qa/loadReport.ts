import fs from "node:fs/promises"
import path from "node:path"
import type { QaReport, QaSummaryReport } from "./types"

const ARTIFACTS_DIR = path.join(process.cwd(), "qa-artifacts")
const RAW_PATH = path.join(ARTIFACTS_DIR, "report.raw.json")
const SUMMARY_PATH = path.join(ARTIFACTS_DIR, "report.summary.json")

async function readJson<T>(filePath: string): Promise<T | null> {
  try {
    const content = await fs.readFile(filePath, "utf8")
    return JSON.parse(content) as T
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null
    throw err
  }
}

export async function loadRawReport(): Promise<QaReport | null> {
  return readJson<QaReport>(RAW_PATH)
}

export async function loadSummaryReport(): Promise<QaSummaryReport | null> {
  return readJson<QaSummaryReport>(SUMMARY_PATH)
}
