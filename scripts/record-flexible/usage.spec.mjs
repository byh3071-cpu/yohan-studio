// 원본 익명판 실사용 시나리오:
// 탭 전환 → 결석 처리 → 자리 잠금 → 자리 섞기 → 결과 → 재셔플
import { test } from "@playwright/test"

test("데모 실사용 흐름 녹화", async ({ page }) => {
  const hold = (ms) => page.waitForTimeout(ms)
  const smoothTo = async (selector, block = "center") => {
    await page.evaluate(
      ([sel, blk]) => {
        document.querySelector(sel)?.scrollIntoView({ behavior: "smooth", block: blk })
      },
      [selector, block],
    )
    await hold(1100)
  }

  await page.goto("/", { waitUntil: "networkidle" })
  await hold(1600)

  // 카페팀 출퇴근표 탭 잠깐 → 자리 배치 탭
  await page.locator('.tab-btn[data-tab="schedule"]').click()
  await hold(1400)
  await page.locator('.tab-btn[data-tab="seat"]').click()
  await hold(1000)

  // 출석 현황 — 참여자 03 결석 처리 (명단: 백요한, 01, 02, 03 → index 3)
  await smoothTo("#rosterList", "start")
  const roster = page.locator("#rosterList .switch")
  await roster.nth(3).click()
  await hold(1100)

  // 좌석 맵 — 숫자 자리 5번 잠금(사용 안 함)
  await smoothTo(".seat-wrapper", "center")
  await page.locator("#s5").click()
  await hold(1100)

  // 자리 섞기 → 좌석 맵에 결과
  await page.locator("#btnMix").click()
  await hold(600)
  await smoothTo(".seat-wrapper", "center")
  await hold(2300)

  // 한 번 더 — 랜덤성 시연
  await page.locator("#btnMix").click()
  await hold(600)
  await smoothTo(".seat-wrapper", "center")
  await hold(2500)
})
