import { expect, test } from '@playwright/test'

const routes = [
  '/om-oss',
  '/service-reparationer',
  '/felsokning',
  '/dackservice',
  '/kontakt',
] as const

for (const route of routes) {
  test(`Google reviews card fits ${route}`, async ({ page }, testInfo) => {
    await page.goto(route)
    await page.locator('main > section').first().waitFor()
    await page.evaluate(() => document.fonts.ready)

    const hero = page.locator('main > section').first()
    const card = hero.locator('.bb-reviews-card--hero-overlay')
    await expect(card).toHaveCount(1)
    await expect(card).toBeVisible()
    await expect(page.locator('main .bb-reviews-card')).toHaveCount(1)
    await expect(card).toHaveAttribute('href', /maps\.app\.goo\.gl/)
    await expect(card).toContainText('50 recensioner')

    const layout = await card.evaluate((element) => {
      const rect = element.getBoundingClientRect()
      const hero = element.closest('main > section')?.getBoundingClientRect()
      return {
        left: rect.left,
        right: rect.right,
        width: rect.width,
        heroBottom: hero?.bottom ?? 0,
        bottom: rect.bottom,
        viewportWidth: document.documentElement.clientWidth,
        documentWidth: document.documentElement.scrollWidth,
      }
    })
    expect(layout.left).toBeGreaterThanOrEqual(0)
    expect(layout.right).toBeLessThanOrEqual(layout.viewportWidth)
    expect(layout.bottom).toBeLessThanOrEqual(layout.heroBottom)
    expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth)

    const reviewColor = await card.locator('.bb-reviews-card__text').evaluate((element) =>
      getComputedStyle(element).color,
    )
    expect(reviewColor).toBe('rgb(255, 255, 255)')

    await card.scrollIntoViewIfNeeded()
    await page.evaluate(() => window.scrollTo(0, 0))
    await hero.screenshot({
      path: testInfo.outputPath(`reviews-${route.slice(1)}-${testInfo.project.name}.png`),
    })
  })
}
