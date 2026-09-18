import { expect, test } from '@playwright/test'

test('om-oss page renders without horizontal overflow across breakpoints', async ({ page }, testInfo) => {
  await page.goto('/om-oss')
  await page.waitForLoadState('networkidle')
  await page.evaluate(() => document.fonts.ready)

  // Verify H1 is visible
  const h1 = page.getByRole('heading', { level: 1 })
  await expect(h1).toBeVisible()

  // Verify horizontal overflow is strictly 0px
  const hasHorizontalOverflow = await page.evaluate(() => {
    const doc = document.documentElement
    return doc.scrollWidth > doc.clientWidth
  })
  expect(hasHorizontalOverflow).toBe(false)

  // Verify key sections exist
  await expect(page.locator('.omoss-page__hero')).toBeVisible()
  await expect(page.locator('.omoss-page__trust-strip')).toBeVisible()
  await expect(page.locator('.omoss-page__story')).toBeVisible()
  await expect(page.locator('.omoss-page__principles')).toBeVisible()
  await expect(page.locator('.omoss-page__process')).toBeVisible()
  await expect(page.locator('.omoss-page__gallery-preview')).toBeVisible()
  await expect(page.locator('.omoss-page__cta')).toBeVisible()

  // Verify booking modal opens from hero button
  const bookBtn = page.locator('.omoss-page__hero-actions button').first()
  await bookBtn.click()
  const modal = page.getByRole('dialog', { name: 'Boka tid' }).or(page.locator('[role="dialog"]'))
  await expect(modal).toBeVisible()

  // Close modal with Escape or close button
  await page.keyboard.press('Escape')

  // Scroll down to ensure all media is loaded
  await page.evaluate(async () => {
    window.scrollTo(0, document.body.scrollHeight)
    await new Promise((r) => setTimeout(r, 300))
    window.scrollTo(0, 0)
    await new Promise((r) => setTimeout(r, 200))
  })

  // Capture full page screenshot
  await page.screenshot({
    path: testInfo.outputPath(`om-oss-${testInfo.project.name}.png`),
    fullPage: true,
  })
})
