#!/usr/bin/env node
// NotionUIUX 위젯 스크린샷 캡처
//
// 사용법:
//   node scripts/capture-notion-uiux-widgets.mjs
//   GIF=1 node scripts/capture-notion-uiux-widgets.mjs   # todo + clock GIF도 캡처
//
// 출력:
//   public/showroom/notion-uiux/{widget}.png   (10장)
//   public/showroom/notion-uiux/notion-page.png  (cover용 노션 페이지 전체)
//   public/showroom/notion-uiux/{widget}.gif    (GIF=1일 때만, todo/clock)

import { chromium } from "@playwright/test"
import { mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs"
import { dirname, resolve, join } from "node:path"
import { fileURLToPath } from "node:url"
import { spawnSync } from "node:child_process"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "..")
const OUT_DIR = resolve(ROOT, "public/showroom/notion-uiux")
const TMP_DIR = resolve(ROOT, ".tmp-gif")

mkdirSync(OUT_DIR, { recursive: true })

const DEMO_BASE = "https://notion-uiux-demo.vercel.app"
const NOTION_PUBLIC_URL =
  "https://jealous-quilt-e0c.notion.site/36d540cd1ae18008824ef8c1610a2845"

const widgets = [
  { name: "calendar", w: 800, h: 700, label: "캘린더" },
  { name: "clock", w: 600, h: 400, label: "시계" },
  { name: "todo", w: 600, h: 700, label: "투두" },
  { name: "todo2", w: 600, h: 700, label: "투두 v2" },
  { name: "schedule", w: 800, h: 700, label: "스케줄러" },
  { name: "memo", w: 600, h: 500, label: "메모" },
  { name: "finance", w: 700, h: 600, label: "가계부" },
  { name: "pomodoro", w: 500, h: 500, label: "포모도로" },
  { name: "project", w: 900, h: 700, label: "프로젝트 칸반" },
  { name: "investment", w: 800, h: 600, label: "투자 대시보드" },
]

async function captureWidget(browser, widget) {
  const url = `${DEMO_BASE}/embed/${widget.name}?mode=light&offline=1`
  const context = await browser.newContext({
    viewport: { width: widget.w, height: widget.h },
    deviceScaleFactor: 2,
  })
  const page = await context.newPage()
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 })
    await page.waitForTimeout(800)
    const outPath = join(OUT_DIR, `${widget.name}.png`)
    await page.screenshot({ path: outPath, fullPage: false })
    console.log(`✓ ${widget.name} (${widget.label}) → ${outPath}`)
  } catch (err) {
    console.error(`✗ ${widget.name}: ${err.message}`)
  } finally {
    await context.close()
  }
}

async function captureNotionPage(browser) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1.5,
  })
  const page = await context.newPage()
  try {
    await page.goto(NOTION_PUBLIC_URL, { waitUntil: "domcontentloaded", timeout: 60000 })
    // 노션은 client-side rendering이라 페이지 본문이 점진적으로 채워짐
    await page.waitForSelector('.notion-page-content, [class*="page-content"], main', {
      timeout: 30000,
    }).catch(() => {})
    await page.waitForTimeout(6000)
    const outPath = join(OUT_DIR, "notion-page.png")
    await page.screenshot({ path: outPath, fullPage: true })
    console.log(`✓ notion-page → ${outPath}`)
  } catch (err) {
    console.error(`✗ notion-page: ${err.message}`)
  } finally {
    await context.close()
  }
}

async function captureGif(browser, widget, durationSec = 6, fps = 10) {
  if (existsSync(TMP_DIR)) rmSync(TMP_DIR, { recursive: true, force: true })
  mkdirSync(TMP_DIR, { recursive: true })

  const url = `${DEMO_BASE}/embed/${widget.name}?mode=light&offline=1`
  const context = await browser.newContext({
    viewport: { width: widget.w, height: widget.h },
    deviceScaleFactor: 1,
  })
  const page = await context.newPage()
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 })
    await page.waitForTimeout(500)

    const totalFrames = durationSec * fps
    const interval = 1000 / fps
    for (let i = 0; i < totalFrames; i++) {
      const framePath = join(TMP_DIR, `frame-${String(i).padStart(4, "0")}.png`)
      await page.screenshot({ path: framePath })
      await page.waitForTimeout(interval)
    }
    console.log(`  captured ${totalFrames} frames for ${widget.name}`)

    const outPath = join(OUT_DIR, `${widget.name}.gif`)
    const result = spawnSync(
      "ffmpeg",
      [
        "-y",
        "-framerate",
        String(fps),
        "-i",
        join(TMP_DIR, "frame-%04d.png"),
        "-vf",
        `fps=${fps},scale=${widget.w}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`,
        "-loop",
        "0",
        outPath,
      ],
      { encoding: "utf8" },
    )
    if (result.status !== 0) {
      console.error(`✗ ffmpeg ${widget.name}: ${result.stderr}`)
    } else {
      console.log(`✓ ${widget.name}.gif → ${outPath}`)
    }
  } catch (err) {
    console.error(`✗ gif ${widget.name}: ${err.message}`)
  } finally {
    await context.close()
    if (existsSync(TMP_DIR)) rmSync(TMP_DIR, { recursive: true, force: true })
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  try {
    console.log("=== widget PNG 캡처 ===")
    for (const w of widgets) {
      await captureWidget(browser, w)
    }

    console.log("\n=== notion-page cover 캡처 ===")
    await captureNotionPage(browser)

    if (process.env.GIF === "1") {
      console.log("\n=== GIF 캡처 (todo + clock) ===")
      const gifTargets = widgets.filter((w) => ["todo", "clock"].includes(w.name))
      for (const w of gifTargets) {
        await captureGif(browser, w)
      }
    }

    const manifest = {
      generatedAt: new Date().toISOString(),
      demoBase: DEMO_BASE,
      notionPublicUrl: NOTION_PUBLIC_URL,
      widgets: widgets.map((w) => ({
        slug: w.name,
        label: w.label,
        png: `/showroom/notion-uiux/${w.name}.png`,
        gif: ["todo", "clock"].includes(w.name) && process.env.GIF === "1"
          ? `/showroom/notion-uiux/${w.name}.gif`
          : null,
        embedUrl: `${DEMO_BASE}/embed/${w.name}?mode=light&offline=1`,
      })),
      notionPagePng: "/showroom/notion-uiux/notion-page.png",
    }
    writeFileSync(join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2))
    console.log("\n✓ manifest.json 저장")
  } finally {
    await browser.close()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
