import { expect, test } from '@playwright/test'

// Heroes with a photo slideshow on desktop and one static photo on phones. Narrowing the
// window while the second desktop photo is showing used to leave no photo active
// (the slide index pointed past the single phone slide), so the hero went blank.
const routes = ['/', '/kontakt', '/bargning', '/om-oss']

for (const route of routes) {
  test(`${route} keeps a hero photo when the window is narrowed to phone width`, async ({ page }) => {
    // The suite emulates reduced motion, which stops the slideshow; turn it on for this test.
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(route)
    const slides = page.locator('.bb-hero__slide')
    await expect(slides).toHaveCount(2)
    // Wait for the slideshow to reach its second photo.
    await expect(slides.nth(1)).toHaveClass(/is-active/, { timeout: 15000 })

    await page.setViewportSize({ width: 390, height: 844 })
    await expect(slides).toHaveCount(1)
    await expect(slides.first()).toHaveClass(/is-active/)
  })
}
