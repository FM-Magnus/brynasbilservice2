import { expect, test, type Page } from '@playwright/test'

// The shared gallery strip (components/ui/GalleryDockStrip.tsx) scrolls when a
// mouse hovers the outer fifth of the track. Touch keeps its native swipe, and
// reduced motion turns the hover scrolling off.

async function openStrip(page: Page, route: string) {
  await page.goto(route)
  const track = page.locator('.bb-gallery-dock__track')
  await expect(track).toBeVisible()
  await expect(page.locator('.bb-gallery-dock__item').first()).toBeVisible()
  await track.scrollIntoViewIfNeeded()
  await page.evaluate(() => { document.querySelector('.bb-gallery-dock__track')!.scrollLeft = 0 })
  const box = (await track.boundingBox())!
  return { track, box }
}

const scrollLeft = (page: Page) =>
  page.evaluate(() => document.querySelector<HTMLElement>('.bb-gallery-dock__track')!.scrollLeft)

for (const route of ['/', '/om-oss']) {
  test.describe(`hover scrolling on ${route}`, () => {
    test.beforeEach(async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'desktop-1440', 'mouse behaviour, checked once at desktop width')
      // The suite runs with reduced motion by default (playwright.config.ts).
      await page.emulateMedia({ reducedMotion: 'no-preference' })
    })

    test('the right edge scrolls forward, the middle holds still, the left edge scrolls back', async ({ page }) => {
      const { box } = await openStrip(page, route)
      const y = box.y + box.height / 2

      // Right edge: moves on its own.
      await page.mouse.move(box.x + box.width / 2, y)
      await page.mouse.move(box.x + box.width - 6, y)
      await expect.poll(() => scrollLeft(page), { timeout: 3000 }).toBeGreaterThan(150)

      // Middle: stops and stays put.
      await page.mouse.move(box.x + box.width / 2, y)
      await page.waitForTimeout(150)
      const held = await scrollLeft(page)
      await page.waitForTimeout(500)
      expect(Math.abs((await scrollLeft(page)) - held)).toBeLessThanOrEqual(2)

      // Left edge: comes back.
      await page.mouse.move(box.x + 6, y)
      await expect.poll(() => scrollLeft(page), { timeout: 3000 }).toBeLessThan(held - 100)
    })

    test('it stops when the mouse leaves the row and at the end of the row', async ({ page }) => {
      const { box } = await openStrip(page, route)
      const y = box.y + box.height / 2

      await page.mouse.move(box.x + box.width - 6, y)
      await expect.poll(() => scrollLeft(page), { timeout: 3000 }).toBeGreaterThan(100)
      await page.mouse.move(box.x + box.width / 2, box.y - 80) // out of the strip
      await page.waitForTimeout(150)
      const left = await scrollLeft(page)
      await page.waitForTimeout(500)
      expect(Math.abs((await scrollLeft(page)) - left)).toBeLessThanOrEqual(2)

      // Keep hovering the right edge: it reaches the end and does not run past it.
      await page.mouse.move(box.x + box.width - 6, y)
      const max = await page.evaluate(() => {
        const track = document.querySelector<HTMLElement>('.bb-gallery-dock__track')!
        return track.scrollWidth - track.clientWidth
      })
      await expect.poll(() => scrollLeft(page), { timeout: 15000 }).toBeGreaterThanOrEqual(max - 2)
    })

    test('touch pointers do not start edge scrolling', async ({ page }) => {
      const { box } = await openStrip(page, route)
      await page.evaluate(({ x, y }) => {
        const track = document.querySelector('.bb-gallery-dock__track')!
        track.dispatchEvent(new PointerEvent('pointermove', { pointerType: 'touch', clientX: x, clientY: y, bubbles: true }))
      }, { x: box.x + box.width - 6, y: box.y + box.height / 2 })
      await page.waitForTimeout(600)
      expect(await scrollLeft(page)).toBeLessThanOrEqual(2)
    })
  })
}

test('reduced motion turns hover scrolling off', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1440', 'mouse behaviour, checked once at desktop width')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const { box } = await openStrip(page, '/')
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
  await page.mouse.move(box.x + box.width - 6, box.y + box.height / 2)
  await page.waitForTimeout(700)
  expect(await scrollLeft(page)).toBeLessThanOrEqual(2)
})
