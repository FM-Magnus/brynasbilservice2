import { expect, test } from '@playwright/test'
import { PUBLIC_ROUTES } from './routes'

// Every public route with a hero. Galleri and Biltjänster have compact heroes but
// still sit under the fixed header, so they are part of the clearance check.
const ROUTES = PUBLIC_ROUTES

const HEADER_WIDTHS = [1024, 1280, 1320, 1321, 1366, 1440, 1600, 1920]

test('--bb-header-height matches the real header edge at every width', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1440', 'width matrix runs once, on the desktop project')
  await page.goto('/koppling')
  await page.waitForLoadState('networkidle')

  for (const width of HEADER_WIDTHS) {
    await page.setViewportSize({ width, height: 900 })
    // Layout catches up with the new width a frame or two later; measuring straight away
    // can read the previous width's header (seen as a flake, e.g. 121.6px at 1600 wide).
    await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))))
    const { token, edge } = await page.evaluate(() => {
      // Resolve the custom property to pixels by measuring an element that uses it.
      const probe = document.createElement('div')
      probe.style.cssText = 'position:absolute;visibility:hidden;height:var(--bb-header-height)'
      document.body.append(probe)
      const token = probe.getBoundingClientRect().height
      probe.remove()
      const header = document.querySelector('.public-header') as HTMLElement
      return { token, edge: header.getBoundingClientRect().bottom }
    })
    // The token is what heroes clear; if PublicHeader.css changes without it, text
    // would slide under (or float far from) the header.
    expect(Math.abs(token - edge), `header edge ${edge}px vs --bb-header-height ${token}px at ${width}px wide`).toBeLessThan(1)
  }
})

test('every hero text clears the fixed header', async ({ page }) => {
  for (const route of ROUTES) {
    await page.goto(route)
    await page.waitForLoadState('networkidle')
    const { h1Top, headerBottom, overflow } = await page.evaluate(() => ({
      h1Top: (document.querySelector('h1') as HTMLElement).getBoundingClientRect().top + window.scrollY,
      headerBottom: (document.querySelector('.public-header') as HTMLElement).getBoundingClientRect().bottom,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    }))
    expect(h1Top - headerBottom, `${route}: H1 must start at least 24px below the header`).toBeGreaterThanOrEqual(24)
    expect(overflow, `${route}: horizontal overflow`).toBe(false)
  }
})
