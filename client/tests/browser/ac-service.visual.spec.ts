import { expect, test } from '@playwright/test'
import { BUSINESS } from '../../src/data/business'

test('AC-service & klimatrengöring page renders without horizontal overflow across breakpoints', async ({ page }, testInfo) => {
  await page.goto('/ac-service')
  await page.waitForLoadState('networkidle')
  await page.evaluate(() => document.fonts.ready)

  // Verify H1 is visible and contains expected text
  const h1 = page.getByRole('heading', { level: 1 })
  await expect(h1).toBeVisible()
  await expect(h1).toContainText('AC-service &')
  await expect(h1).toContainText('Klimatrengöring')

  // Verify horizontal overflow is strictly 0px
  const hasHorizontalOverflow = await page.evaluate(() => {
    const doc = document.documentElement
    return doc.scrollWidth > doc.clientWidth
  })
  expect(hasHorizontalOverflow).toBe(false)

  // AC keeps the shared full-bleed hero without a registration form.
  const hero = page.locator('.bilservice__ac-hero')
  await expect(hero).toBeVisible()
  await expect(hero.locator('.bb-hero__media img')).toBeVisible()
  await expect(page.locator('.bilservice__ac-booking-card')).toHaveCount(0)
  await expect(hero.locator('input')).toHaveCount(0)
  await expect(hero.locator('.bb-hero__actions')).toBeVisible()
  await expect(page.locator('.bilservice__card-grid-3').first()).toBeVisible()
  await expect(page.locator('.bilservice__symptom-grid')).toBeVisible()
  await expect(page.locator('.bilservice__price-grid')).toBeVisible()
  await expect(page.locator('.bb-process-grid')).toBeVisible()
  await expect(page.locator('.bilservice__service-card')).toBeVisible()
  await expect(page.locator('.bb-card--trust').first()).toBeVisible()

  // Verify the hero retains its phone action with the correct tel URI.
  const callBtn = page.locator(`.bilservice__ac-hero a[href="${BUSINESS.phone.href}"]`)
  await expect(callBtn).toBeVisible()

  // Verify pricing cards exist (3 cards)
  const priceCards = page.locator('.bilservice__price-card')
  await expect(priceCards).toHaveCount(3)

  // Test interactive symptom selection
  const symptomBtn = page.locator('.bilservice__symptom-card').first()
  await symptomBtn.click()
  await expect(page.locator('.bilservice__recommendation')).toBeVisible()

  // Verify booking modal opens from the hero CTA.
  const bookBtn = page.locator('.bilservice__ac-hero .bb-hero__actions button').first()
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
    path: testInfo.outputPath(`ac-service-${testInfo.project.name}.png`),
    fullPage: true,
  })
})
