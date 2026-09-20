import { expect, test } from '@playwright/test'
import { BUSINESS } from '../../src/data/business'

test('felsökning & diagnostik page renders without horizontal overflow across breakpoints', async ({ page }, testInfo) => {
  await page.goto('/felsokning')
  await page.waitForLoadState('networkidle')
  await page.evaluate(() => document.fonts.ready)

  // Verify H1 is visible and contains expected text
  const h1 = page.getByRole('heading', { level: 1 })
  await expect(h1).toBeVisible()
  await expect(h1).toContainText('Felsökning &')
  await expect(h1).toContainText('Diagnostik')

  // Verify horizontal overflow is strictly 0px
  const hasHorizontalOverflow = await page.evaluate(() => {
    const doc = document.documentElement
    return doc.scrollWidth > doc.clientWidth
  })
  expect(hasHorizontalOverflow).toBe(false)

  // Verify key Bilservice family sections exist
  await expect(page.locator('.bb-hero')).toBeVisible()
  await expect(page.locator('.bilservice__code-readout')).toBeVisible()
  await expect(page.locator('.bilservice__card-grid-3')).toBeVisible()
  await expect(page.locator('.bilservice__symptom-grid')).toBeVisible()
  await expect(page.locator('.bilservice__stat-grid')).toBeVisible()
  await expect(page.locator('.bilservice__service-card')).toBeVisible()
  await expect(page.locator('.bb-process-grid')).toBeVisible()
  await expect(page.locator('.bb-card--trust')).toBeVisible()

  // Verify call link exists with correct tel URI
  const callBtn = page.locator(`.bb-hero__actions a[href="${BUSINESS.phone.href}"]`).first()
  await expect(callBtn).toBeVisible()

  // Verify interactive symptom selection
  const firstSymptom = page.locator('.bilservice__symptom-card').first()
  await firstSymptom.click()
  await expect(page.locator('.bilservice__recommendation')).toBeVisible()
  await expect(page.locator('.bilservice__recommendation')).toContainText('Vi föreslår:')

  // Verify booking modal opens from hero button
  const bookBtn = page.locator('.bb-hero__actions button').first()
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
    path: testInfo.outputPath(`felsokning-${testInfo.project.name}.png`),
    fullPage: true,
  })
})
