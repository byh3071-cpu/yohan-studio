#!/usr/bin/env node
// NotionUIUX cover — 실제 위젯 PNG (DPR 4 source) + soft brutalist 디자인

import { chromium } from "@playwright/test"
import { writeFileSync, readFileSync, mkdirSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "..")
const ASSETS_DIR = resolve(ROOT, "public/showroom/notion-uiux")
const OUT_PATH = resolve(ASSETS_DIR, "cover.png")
const TMP_HTML = resolve(ROOT, ".tmp-cover.html")

mkdirSync(ASSETS_DIR, { recursive: true })

function toDataUrl(filename) {
  const buf = readFileSync(resolve(ASSETS_DIR, filename))
  return `data:image/png;base64,${buf.toString("base64")}`
}

const calendarSrc = toDataUrl("calendar.png")
const todoSrc = toDataUrl("todo.png")
const financeSrc = toDataUrl("finance.png")

// 위젯 박스 크기 — 소스 (3200×2800 등)에 비해 충분히 큰 표시 영역
// 표시 크기 × cover DPR 3 = 1620×1380 (calendar), 1020×1080 (todo) 등
// 소스가 표시 크기의 2배 이상이라 다운스케일 품질 양호
const COVER_DPR = 3

const html = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8"/>
<style>
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css');
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 1600px; height: 900px; }
  body {
    font-family: 'Pretendard', sans-serif;
    background: #F4F1EA;
    overflow: hidden;
    position: relative;
    -webkit-font-smoothing: antialiased;
  }

  body::before {
    content: '';
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, #0A0A0A 1.5px, transparent 1.5px);
    background-size: 24px 24px;
    opacity: 0.07;
    pointer-events: none;
  }

  .frame {
    position: absolute;
    inset: 32px;
    border: 4px solid #0A0A0A;
    display: grid;
    grid-template-columns: 1fr 1.1fr;
    gap: 48px;
    padding: 60px 56px 60px 68px;
    align-items: center;
  }

  .copy { display: flex; flex-direction: column; gap: 28px; }

  .eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px; font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #0A0A0A;
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }
  .eyebrow .dash { width: 28px; height: 4px; background: #FF5C28; }

  .title {
    font-size: 108px;
    line-height: 0.95;
    font-weight: 900;
    letter-spacing: -0.045em;
    color: #0A0A0A;
  }
  .title .accent { color: #FF5C28; }

  .lead {
    font-size: 23px;
    line-height: 1.5;
    font-weight: 500;
    color: #2B2723;
    max-width: 540px;
    border-left: 4px solid #0A0A0A;
    padding-left: 18px;
  }

  .badges { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 4px; }
  .badge {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px; font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 10px 16px;
    border: 2.5px solid #0A0A0A;
    background: #F4F1EA;
    color: #0A0A0A;
    box-shadow: 4px 4px 0 #0A0A0A;
  }
  .badge.accent { background: #FF5C28; color: #0A0A0A; }

  .stage {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 680px;
  }

  .widget {
    position: absolute;
    background: #fff;
    border: 3px solid #0A0A0A;
    box-shadow: 10px 10px 0 #0A0A0A;
    overflow: hidden;
    transform-origin: center;
  }
  .widget img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }

  /* 더 큰 표시 박스 → 소스 다운스케일 비율 낮춤 → 선명도 ↑ */
  .w-cal {
    width: 540px; height: 460px;
    top: 50%; left: 50%;
    transform: translate(-50%, -52%) rotate(-3deg);
    z-index: 3;
  }
  .w-todo {
    width: 320px; height: 360px;
    top: 6px; left: -16px;
    transform: rotate(-7deg);
    z-index: 2;
  }
  .w-fin {
    width: 340px; height: 300px;
    bottom: 4px; right: -8px;
    transform: rotate(6deg);
    z-index: 2;
  }

  .deco {
    position: absolute;
    width: 580px; height: 500px;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%) rotate(2deg);
    border: 3px solid #0A0A0A;
    background: #FF5C28;
    z-index: 1;
  }

  .meta {
    position: absolute;
    bottom: 36px; right: 48px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px; font-weight: 700;
    letter-spacing: 0.1em;
    color: #6B6357;
    text-transform: uppercase;
  }
</style>
</head>
<body>
  <div class="frame">
    <div class="copy">
      <div class="eyebrow"><span class="dash"></span> Yohan Studio · Showroom</div>
      <h1 class="title">Notion<span class="accent">.</span>UIUX</h1>
      <p class="lead">노션에 임베드하는 픽셀·네온 톤 위젯 10종.<br/>노션 대시보드를 본인 취향대로.</p>
      <div class="badges">
        <span class="badge accent">10 WIDGETS</span>
        <span class="badge">OPEN SOURCE</span>
        <span class="badge">OFFLINE READY</span>
      </div>
    </div>
    <div class="stage">
      <div class="deco"></div>
      <div class="widget w-todo"><img src="${todoSrc}" alt=""/></div>
      <div class="widget w-cal"><img src="${calendarSrc}" alt=""/></div>
      <div class="widget w-fin"><img src="${financeSrc}" alt=""/></div>
    </div>
  </div>
  <div class="meta">github.com/byh3071-cpu/NotionUIUX</div>
</body>
</html>`

writeFileSync(TMP_HTML, html)

const browser = await chromium.launch({ headless: true })
const ctx = await browser.newContext({
  viewport: { width: 1600, height: 900 },
  deviceScaleFactor: COVER_DPR,
})
const page = await ctx.newPage()
try {
  await page.goto(`file://${TMP_HTML.replace(/\\/g, "/")}`, {
    waitUntil: "networkidle",
    timeout: 30000,
  })
  await page.waitForTimeout(1500)
  await page.screenshot({ path: OUT_PATH, fullPage: false })
  console.log(`✓ cover.png saved → ${OUT_PATH}`)
} finally {
  await browser.close()
}
