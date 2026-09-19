import { expect, test } from '@playwright/test'

test('bilar till salu renders on its own island without horizontal overflow', async ({ page }, testInfo) => {
  await page.goto('/bilar-till-salu')
  await page.waitForLoadState('networkidle')
  await page.evaluate(() => document.fonts.ready)

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Bilar till salu')

  const hasHorizontalOverflow = await page.evaluate(() => {
    const doc = document.documentElement
    return doc.scrollWidth > doc.clientWidth
  })
  expect(hasHorizontalOverflow).toBe(false)

  // Public shell and page island
  await expect(page.locator('.public-header')).toBeVisible()
  await expect(page.locator('.bilartillsalu-page__hero')).toBeVisible()
  await expect(page.locator('.bb-trust-row__item')).toHaveCount(3)
  await expect(page.locator('.bb-card--trust')).toBeVisible()

  // No legacy selectors from index.css may appear on this page
  await expect(page.locator('[class*="cars-page"], [class*="car-card"], .cars-grid')).toHaveCount(0)

  // Active vehicle with four spec badges and a 16:10 main viewer
  const vehicle = page.locator('.bilartillsalu-page__vehicle').first()
  await expect(vehicle.getByRole('heading', { level: 3 })).toHaveText('Peugeot 307 CC 2.0')
  await expect(vehicle.locator('.bilartillsalu-page__spec dt')).toHaveText(['Årsmodell', 'Miltal', 'Drivmedel', 'Växellåda'])
  const viewerBox = await vehicle.locator('.bilartillsalu-page__viewer').boundingBox()
  expect(viewerBox).not.toBeNull()
  expect(Math.abs(viewerBox!.width / viewerBox!.height - 1.6)).toBeLessThan(0.02)

  // Thumbnails switch the main image
  const mainImg = vehicle.locator('.bilartillsalu-page__viewer img')
  const thumbs = vehicle.locator('.bilartillsalu-page__thumb')
  await expect(thumbs).toHaveCount(3)
  await expect(thumbs.nth(0)).toHaveAttribute('aria-pressed', 'true')
  await thumbs.nth(2).click()
  await expect(thumbs.nth(2)).toHaveAttribute('aria-pressed', 'true')
  await expect(thumbs.nth(0)).toHaveAttribute('aria-pressed', 'false')
  await expect(mainImg).toHaveAttribute('src', /wheel-closeup/)

  // Phone link
  await expect(page.locator('.bilartillsalu-page__hero-call')).toHaveAttribute('href', 'tel:+46705533395')

  // Vehicle inquiry opens the booking modal with a prefilled comment
  await vehicle.locator('.bilartillsalu-page__inquiry-btn').click()
  const modal = page.locator('[role="dialog"]')
  await expect(modal).toBeVisible()
  await expect(page.locator('#booking-comment')).toHaveValue('Gäller förfrågan om Peugeot 307 CC 2.0 (2006)')
  await page.keyboard.press('Escape')
  await expect(modal).toBeHidden()

  // Generic booking starts with an empty comment
  await page.locator('.bilartillsalu-page__hero-book').click()
  await expect(modal).toBeVisible()
  await expect(page.locator('#booking-comment')).toHaveValue('')
  await page.keyboard.press('Escape')

  await page.screenshot({ path: testInfo.outputPath('bilar-till-salu.png'), fullPage: true })
})
