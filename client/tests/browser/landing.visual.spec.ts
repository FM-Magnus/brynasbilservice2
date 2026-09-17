import { expect, test } from '@playwright/test'

test('landing page renders without horizontal overflow', async ({ page }, testInfo) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.evaluate(() => document.fonts.ready)

  await page.screenshot({
    path: testInfo.outputPath('landing-viewport-hero.png'),
  })

  const heroBottom = page.locator('.landing-v2__hero-bottom')
  if (await heroBottom.isVisible()) {
    await heroBottom.screenshot({
      path: testInfo.outputPath('landing-reviews.png'),
    })
  }

  const contactSection = page.locator('.landing-v2__contact-section')
  if (await contactSection.isVisible()) {
    await contactSection.screenshot({
      path: testInfo.outputPath('landing-contact.png'),
    })
  }

  await page.screenshot({
    path: testInfo.outputPath('landing-full-page.png'),
    fullPage: true,
  })

  if (testInfo.project.name === 'desktop-1440') {
    const servicesTrigger = page.getByRole('button', { name: 'Biltjänster' })
    await servicesTrigger.click()
    await expect(servicesTrigger).toHaveAttribute('aria-expanded', 'true')
    const firstServiceLink = page.getByRole('link', { name: 'Våra tjänster' })
    await expect(firstServiceLink).toBeVisible()
    await servicesTrigger.press('ArrowDown')
    await expect(firstServiceLink).toBeFocused()
    await page.keyboard.press('Escape')
    await expect(servicesTrigger).toHaveAttribute('aria-expanded', 'false')
    await expect(servicesTrigger).toBeFocused()
  } else {
    const mobileToggle = page.getByRole('button', { name: 'Öppna meny' })
    const mobileNavigation = page.locator('#public-mobile-navigation')
    await expect(mobileNavigation).toBeHidden()
    await mobileToggle.click()
    await expect(mobileNavigation).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(mobileNavigation).toBeHidden()
    await expect(mobileToggle).toBeFocused()
  }

  const overflow = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }))

  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth)
})
