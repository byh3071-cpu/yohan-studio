#!/usr/bin/env node
// 요한스튜디오 블로그 → 네이버 블로그용 섹션 스크린샷
//
// 사용법:
//   node scripts/capture-blog-screenshots.mjs
//   URL=http://localhost:3050/blog/snapcontext-v013-store-journey node scripts/capture-blog-screenshots.mjs
//
// 출력: docs/store/naver-blog/01~05*.png (1280px wide, 2x DPR)

import { chromium } from '@playwright/test'
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const OUT_DIR = resolve(ROOT, 'docs/store/naver-blog')

const URL = process.env.URL ?? 'https://yohanstudio.co/blog/snapcontext-v013-store-journey'
const PAD = 16 // 섹션 위/아래 여유 픽셀

mkdirSync(OUT_DIR, { recursive: true })

/** @typedef {{ name: string, kind: 'range' | 'locator' | 'top', topText?: string, topSelector?: string, bottomText?: string, locator?: string }} Section */

/** @type {Section[]} */
const sections = [
  // 글로벌 nav 제외하고 article(블로그 본문) top 부터 캡처
  { name: '01-hero', kind: 'range', topSelector: 'article', bottomText: '한눈에 보기' },
  { name: '02-stats', kind: 'range', topText: '한눈에 보기', bottomText: '왜 만들었나' },
  { name: '03-diagram', kind: 'locator', locator: '[aria-label="4개 아이디어가 SnapContext로 합류"]' },
  { name: '04-timeline', kind: 'range', topText: '타임라인', bottomText: '핵심 기술 결정 3가지' },
  { name: '05-features', kind: 'range', topText: '최종 결과물', bottomText: '숫자로 보는 여정' },
]

// 페이지 절대 좌표(스크롤과 무관)로 heading 의 top Y 반환.
// boundingBox() 는 viewport-relative 라 직전에 scrollIntoView 가 일어났다면 어긋난다.
async function getHeadingTopY(page, text) {
  return await page.evaluate((needle) => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3'))
    // 본문 영역만 (TOC 사이드바의 a 링크는 제외하기 위해 heading 만 사용)
    const el = headings.find((h) => (h.textContent ?? '').trim().includes(needle))
    if (!el) throw new Error(`heading not found: ${needle}`)
    const rect = el.getBoundingClientRect()
    return rect.top + window.scrollY
  }, text)
}

async function clipShot(page, outPath, clip) {
  const x = Math.max(0, Math.floor(clip.x))
  const y = Math.max(0, Math.floor(clip.y))
  const width = Math.max(1, Math.ceil(clip.width))
  const height = Math.max(1, Math.ceil(clip.height))
  await page.screenshot({ path: outPath, fullPage: true, clip: { x, y, width, height } })
}

;(async () => {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
    colorScheme: 'light',
    locale: 'ko-KR',
  })

  // 페이지가 로드되기 전에 라이트 모드 강제
  await context.addInitScript(() => {
    try {
      localStorage.setItem('yohan-theme', 'light')
    } catch {}
    document.documentElement.setAttribute('data-theme', 'light')
  })

  const page = await context.newPage()

  console.log(`open ${URL}`)
  // Next dev 의 HMR 웹소켓 때문에 networkidle 은 영원히 안 잡힘 → load 사용
  await page.goto(URL, { waitUntil: 'load', timeout: 120_000 })

  // 라이트 모드 재확인 + 애니메이션 차단 + 캡처 방해 요소 숨김
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light')
    const style = document.createElement('style')
    style.textContent = `
      *,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
      /* 우측 TOC 사이드바 — 본문 폭만 캡처하기 위해 숨김 */
      nav.post-toc{display:none!important}
      /* Next dev 오류/HMR 토스트 오버레이 */
      nextjs-portal{display:none!important}
      [data-nextjs-toast]{display:none!important}
      /* post-shell 이 grid 라면 본문이 전체 폭 차지하도록 */
      .post-shell{grid-template-columns:1fr!important;display:block!important}
    `
    document.head.appendChild(style)
  })

  // lazy-load 이미지 강제 로드
  await page.evaluate(async () => {
    const imgs = Array.from(document.querySelectorAll('img'))
    await Promise.all(
      imgs.map((img) => {
        img.loading = 'eager'
        if (img.complete && img.naturalWidth > 0) return Promise.resolve()
        return new Promise((res) => {
          img.addEventListener('load', () => res(null), { once: true })
          img.addEventListener('error', () => res(null), { once: true })
        })
      }),
    )
  })

  // 폰트/레이아웃 안정화
  await page.evaluate(() => document.fonts?.ready)
  await page.waitForTimeout(500)

  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight)

  for (const sec of sections) {
    const outPath = resolve(OUT_DIR, `${sec.name}.png`)
    try {
      if (sec.kind === 'locator') {
        const loc = page.locator(sec.locator)
        await loc.first().scrollIntoViewIfNeeded()
        await page.waitForTimeout(100)
        await loc.first().screenshot({ path: outPath })
      } else if (sec.kind === 'top') {
        const bottomY = await getHeadingTopY(page, sec.bottomText)
        await clipShot(page, outPath, {
          x: 0,
          y: 0,
          width: 1280,
          height: bottomY - PAD,
        })
      } else {
        const topY = sec.topSelector
          ? await page.evaluate((sel) => {
              const el = document.querySelector(sel)
              if (!el) throw new Error(`selector not found: ${sel}`)
              const rect = el.getBoundingClientRect()
              return rect.top + window.scrollY
            }, sec.topSelector)
          : await getHeadingTopY(page, sec.topText)
        const bottomY = sec.bottomText
          ? await getHeadingTopY(page, sec.bottomText)
          : pageHeight
        await clipShot(page, outPath, {
          x: 0,
          y: topY - PAD,
          width: 1280,
          height: bottomY - topY + PAD * 2,
        })
      }
      console.log(`✓ ${sec.name}.png`)
    } catch (err) {
      console.error(`✗ ${sec.name}: ${err.message}`)
    }
  }

  await browser.close()
  console.log(`\ndone → ${OUT_DIR}`)
})().catch((err) => {
  console.error(err)
  process.exit(1)
})
