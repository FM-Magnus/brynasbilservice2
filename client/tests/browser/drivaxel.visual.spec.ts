import { expect, test } from '@playwright/test'
import { BUSINESS } from '../../src/data/business'

test('drivaxel och drivknutar page renders without horizontal overflow across breakpoints', async ({ page }, testInfo) => {
  await page.goto('/drivaxel-drivknutar')
  await page.waitForLoadState('networkidle')
  await page.evaluate(() => document.fonts.ready)

  // Verify H1 is visible and contains expected text
  const h1 = page.getByRole('heading', { level: 1 })
  await expect(h1).toBeVisible()
  await expect(h1).toContainText('Drivaxel & drivknutar')

  // Verify horizontal overflow is strictly 0px
  const hasHorizontalOverflow = await page.evaluate(() => {
    const doc = document.documentElement
    return doc.scrollWidth > doc.clientWidth
  })
  expect(hasHorizontalOverflow).toBe(false)

  // Verify key guide sections exist
  await expect(page.locator('.service-guide__hero')).toBeVisible()
  await expect(page.locator('.service-guide__component-grid')).toBeVisible()
  await expect(page.locator('.service-guide__importance-grid')).toBeVisible()
  await expect(page.locator('.service-guide__symptom-list')).toBeVisible()
  await expect(page.locator('.service-guide__service-checklist')).toBeVisible()
  await expect(page.locator('.service-guide__info-grid')).toBeVisible()
  await expect(page.locator('.service-guide__process-steps')).toBeVisible()
  await expect(page.locator('.service-guide__closing')).toBeVisible()

  // Verify call link exists with correct tel URI
  const callBtn = page.locator(`.service-guide__actions a[href="${BUSINESS.phone.href}"]`).first()
  await expect(callBtn).toBeVisible()

  // Verify booking modal opens from hero button
  const bookBtn = page.locator('.service-guide__actions button').first()
  await bookBtn.click()
  const modal = page.getByRole('dialog').or(page.locator('[role="dialog"]'))
  await expect(modal).toBeVisible()

  // Close modal with Escape
  await page.keyboard.press('Escape')

  // Scroll down to ensure all media is loaded
  await page.evaluate(async () => {
    window.scrollTo(0, document.body.scrollHeight)
    await new Promise((r) => setTimeout(r, 200))
    window.scrollTo(0, 0)
    await new Promise((r) => setTimeout(r, 100))
  })

  // Capture full page screenshot
  await page.screenshot({
    path: testInfo.outputPath(`drivaxel-${testInfo.project.name}.png`),
    fullPage: true,
  })
})
