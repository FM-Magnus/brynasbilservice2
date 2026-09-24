import { expect, test, type Page } from '@playwright/test'

const routes = [
  ['Landing', '/', '.bb-hero'],
  ['Om oss', '/om-oss', '.omoss-page__hero'],
  ['Felsökning', '/felsokning', '#felsokning'],
  ['Däckservice', '/dackservice', '#dackservice'],
  ['AC-service', '/ac-service', '.bilservice__ac-hero'],
  ['Bärgning', '/bargning', '.bargning-page__hero'],
  ['Kontakt', '/kontakt', '.kontakt-page__hero'],
] as const

async function measureAll(page: Page) {
  const measurements: Array<{ name: string; height: number; viewportWidth: number }> = []

  for (const [name, route, selector] of routes) {
    await page.goto(route)
    await page.locator(selector).waitFor({ state: 'visible' })
    await page.evaluate(() => document.fonts.ready)
    const result = await page.locator(selector).evaluate((hero) => ({
      height: Math.round(hero.getBoundingClientRect().height),
      viewportWidth: window.innerWidth,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    }))
    expect(result.overflow, `${name} has horizontal overflow`).toBe(false)
    measurements.push({ name, height: result.height, viewportWidth: result.viewportWidth })
  }
  return measurements
}

function expectMatched(measurements: Awaited<ReturnType<typeof measureAll>>) {
  const reference = measurements.find(({ name }) => name === 'Däckservice')!
  for (const measurement of measurements) {
    expect(
      Math.abs(measurement.height - reference.height),
      `${measurement.name} hero (${measurement.height}px) should match Däckservice (${reference.height}px) at ${reference.viewportWidth}px`,
    ).toBeLessThanOrEqual(1)
  }
}

// All seven heroes read --bb-hero-matched-height (design-tokens.css).
test('requested landing and service pages use the Däckservice hero height', async ({ page }) => {
  expectMatched(await measureAll(page))
})

// Between the three project widths the heroes must still match. Below 360px
// Felsökning, Kontakt and Däckservice outgrow the shared mobile height.
test('hero heights also match between the project widths', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1440', 'viewport sweep runs once')
  for (const width of [360, 375, 414, 430, 600, 700, 900, 1024, 1120, 1121, 1280, 1680]) {
    await page.setViewportSize({ width, height: 900 })
    expectMatched(await measureAll(page))
  }
})
