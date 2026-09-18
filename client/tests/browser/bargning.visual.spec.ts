import { expect, test } from '@playwright/test'

test('bargning page renders without horizontal overflow across breakpoints', async ({ page }, testInfo) => {
  await page.goto('/bargning')
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

  // Verify all 8 sections exist
  await expect(page.locator('.bargning-page__hero')).toBeVisible()
  await expect(page.locator('.bargning-page__quick-steps')).toBeVisible()
  await expect(page.locator('.bargning-page__showcase')).toBeVisible()
  await expect(page.locator('.bargning-page__scenarios')).toBeVisible()
  await expect(page.locator('.bargning-page__process')).toBeVisible()
  await expect(page.locator('.bargning-page__workshop-intake')).toBeVisible()
  await expect(page.locator('.bargning-page__cars-banner')).toBeVisible()
  await expect(page.locator('.bargning-page__cta')).toBeVisible()

  // Verify emergency call link exists with correct tel URI
  const heroCallBtn = page.locator('.bargning-page__hero-phone-btn')
  await expect(heroCallBtn).toHaveAttribute('href', 'tel:0705533395')

  // Verify booking modal opens from hero button
  const bookBtn = page.locator('.bargning-page__hero-book-btn')
  await bookBtn.click()
  const modal = page.getByRole('dialog', { name: 'Boka tid' }).or(page.locator('[role="dialog"]'))
  await expect(modal).toBeVisible()

  // Close modal with Escape
  await page.keyboard.press('Escape')

  // Scroll down to ensure all media is loaded
  await page.evaluate(async () => {
    window.scrollTo(0, document.body.scrollHeight)
    await new Promise((r) => setTimeout(r, 300))
    window.scrollTo(0, 0)
    await new Promise((r) => setTimeout(r, 200))
  })

  // Temporarily set header to absolute for pristine fullPage screenshot stitching
  await page.evaluate(() => {
    const header = document.querySelector('.public-header')
    if (header) {
      (header as HTMLElement).style.position = 'absolute'
    }
  })

  // Capture full page screenshot
  await page.screenshot({
    path: testInfo.outputPath(`bargning-${testInfo.project.name}.png`),
    fullPage: true,
  })
})
