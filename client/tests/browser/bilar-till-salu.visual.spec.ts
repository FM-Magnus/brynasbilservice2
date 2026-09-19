import { expect, test } from '@playwright/test'

test('bilar till salu renders on its own island without horizontal overflow', async ({ page }, testInfo) => {
  const consoleProblems: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error' || message.type() === 'warning') consoleProblems.push(message.text())
  })
  // Accumulate CLS from the first paint, before any page script runs.
  await page.addInitScript(() => {
    const w = window as unknown as { __cls: number }
    w.__cls = 0
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as unknown as Array<{ value: number; hadRecentInput: boolean }>) {
        if (!entry.hadRecentInput) w.__cls += entry.value
      }
    }).observe({ type: 'layout-shift', buffered: true })
  })

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

  // Responsive images on the main viewer
  const viewerImg = vehicle.locator('.bilartillsalu-page__viewer img')
  await expect(viewerImg).toHaveAttribute('srcset', /640w.*1920w/)
  await expect(viewerImg).toHaveAttribute('sizes', /.+/)

  // Hero vehicle panel: data-driven, desktop only
  const heroPanel = page.locator('a.bilartillsalu-page__hero-feature')
  const isDesktop = testInfo.project.name === 'desktop-1440'
  if (isDesktop) {
    await expect(heroPanel).toBeVisible()
    await expect(heroPanel).toHaveAttribute('href', '#vehicle-peugeot-307-cc-2-0-2006')
    await expect(heroPanel).toContainText('39 900 kr')
    await expect(heroPanel.locator('img')).toHaveAttribute('fetchpriority', 'high')
  } else {
    await expect(heroPanel).toBeHidden()
  }

  // Equal-width thumbnails; full-width stacked actions
  const thumbWidths = await vehicle.locator('.bilartillsalu-page__thumb').evaluateAll((els) => els.map((el) => el.getBoundingClientRect().width))
  expect(Math.max(...thumbWidths) - Math.min(...thumbWidths)).toBeLessThanOrEqual(1)
  const detailsWidth = await vehicle.locator('.bilartillsalu-page__details').evaluate((el) => el.clientWidth - parseFloat(getComputedStyle(el).paddingLeft) - parseFloat(getComputedStyle(el).paddingRight))
  for (const button of await vehicle.locator('.bilartillsalu-page__vehicle-actions .bb-btn').all()) {
    const box = await button.boundingBox()
    expect(Math.abs(box!.width - detailsWidth)).toBeLessThanOrEqual(2)
  }

  // CLS after load and one full scroll
  await page.evaluate(async () => {
    for (let y = 0; y <= document.documentElement.scrollHeight; y += 300) {
      window.scrollTo(0, y)
      await new Promise((resolve) => setTimeout(resolve, 50))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(300)
  const cls = await page.evaluate(() => (window as unknown as { __cls: number }).__cls)
  expect(cls).toBeLessThan(0.02)

  // Clean console on load. Checked before the booking modal opens: the modal
  // fetches /api/services, which has no backend in this dev-only test run.
  expect(consoleProblems).toEqual([])

  // Hero panel jumps to the card with the title clear of the sticky header
  if (isDesktop) {
    await heroPanel.click()
    await page.waitForTimeout(600)
    const headerBottom = await page.locator('.public-header').evaluate((el) => el.getBoundingClientRect().bottom)
    const titleTop = await vehicle.getByRole('heading', { level: 3 }).evaluate((el) => el.getBoundingClientRect().top)
    expect(titleTop).toBeGreaterThan(headerBottom)
    await page.evaluate(() => window.scrollTo(0, 0))
  }

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
