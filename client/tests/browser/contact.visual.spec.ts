import { expect, test } from '@playwright/test'

test('contact page renders without horizontal overflow across breakpoints', async ({ page }, testInfo) => {
  await page.goto('/kontakt')
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

  // Verify sections exist
  await expect(page.locator('.kontakt-page__hero')).toBeVisible()
  await expect(page.locator('.kontakt-page__card--dark')).toBeVisible()
  await expect(page.locator('.kontakt-page__form-card')).toBeVisible()
  await expect(page.locator('.kontakt-page__find')).toBeVisible()
  await expect(page.locator('.kontakt-page__focus')).toBeVisible()
  await expect(page.locator('.kontakt-page__closing')).toBeVisible()

  // Verify booking modal opens from hero button
  const bookBtn = page.locator('.kontakt-page__hero button').first()
  await bookBtn.click()
  const modal = page.getByRole('dialog', { name: 'Boka tid' }).or(page.locator('[role="dialog"]'))
  await expect(modal).toBeVisible()
  await page.keyboard.press('Escape')

  // Scroll to ensure all content is loaded
  await page.evaluate(async () => {
    window.scrollTo(0, document.body.scrollHeight)
    await new Promise((r) => setTimeout(r, 300))
    window.scrollTo(0, 0)
    await new Promise((r) => setTimeout(r, 200))
  })

  // Capture full page screenshot
  await page.screenshot({
    path: testInfo.outputPath(`contact-${testInfo.project.name}.png`),
    fullPage: true,
  })
})
