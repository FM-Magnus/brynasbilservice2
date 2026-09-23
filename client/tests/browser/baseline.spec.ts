/**
 * The in-repo visual authority.
 *
 * The seven locked mockups this project was designed against live outside the
 * repository and are not present on any machine that has checked it out (see
 * docs/archive/AGENT_HANDOFF.md). Without them there is nothing to compare a change
 * against, so this file makes the repository its own reference: it records
 * what every public route actually renders, as committed snapshots.
 *
 * Deliberately not pixel screenshots. Those would add tens of megabytes to the
 * repository and would fail on any font-rendering difference between machines,
 * which makes them useless as a shared baseline. What is captured instead:
 *
 *   - the rendered text of the page, which catches copy and content changes
 *   - a computed-style fingerprint of the shell and the shared primitives —
 *     header, footer, h1, .bb-btn, body — which is where the canonical design
 *     tokens actually land, and which would have caught the undefined-token
 *     defects that silently removed borders from ten guide pages
 *
 * Updating a snapshot is how you approve an intended visual change:
 *     npm --prefix client run test:browser -- --update-snapshots
 * A diff you did not intend is a regression. Read it before you update it.
 */
import { expect, test } from '@playwright/test'

const ROUTES = [
  '/', '/om-oss', '/galleri', '/service-reparationer', '/biltjanster', '/felsokning',
  '/oljebyte', '/kamrem', '/koppling', '/bromssystem', '/bilbatteri', '/stodampare-fjadrar',
  '/hjullagerbyte', '/avgassystem', '/drivaxel-drivknutar', '/styrning-kulleder',
  '/dackservice', '/ac-service', '/bargning', '/kontakt', '/bilar-till-salu',
]

/**
 * Where the canonical tokens are supposed to surface. The first group is the
 * shell and the shared primitives, present on every route. The second is the
 * two family parents — the surfaces Phase 2 will scale out, and the ones that
 * currently reference tokens that are not defined. A selector that is absent
 * on a given route records "(not present)", which is itself worth locking: it
 * changes if a page stops mounting the shell.
 */
const PROBES = [
  'body', '.public-header', 'h1', '.bb-btn', '.bb-footer', 'footer',
  '.service-guide__importance', '.service-guide__service-card',
  '.bilservice__image-slot', '.bb-card--glass', '.bb-promo-card',
]

const PROPERTIES = [
  'font-family', 'font-size', 'font-weight', 'line-height', 'color', 'background-color',
  'border-top-width', 'border-top-style', 'border-top-color', 'border-top-left-radius',
  'box-shadow', 'display', 'min-height',
]

const slug = (route: string) => (route === '/' ? 'start' : route.replace(/^\//, '').replace(/\//g, '-'))

for (const route of ROUTES) {
  test(`baseline: ${route}`, async ({ page }, testInfo) => {
    await page.goto(route)
    await page.waitForLoadState('networkidle')
    // Every public route is lazy-loaded, and networkidle can fire while React
    // is still resolving the Suspense boundary. Without these waits the probe
    // can run against an unmounted page and record "(not present)" for the
    // whole shell, which then gets committed as the baseline.
    await page.locator('.public-header').first().waitFor({ state: 'attached' })
    await page.locator('h1').first().waitFor({ state: 'attached' })
    await page.locator('footer').first().waitFor({ state: 'attached' })
    await page.evaluate(() => document.fonts.ready)

    const fingerprint = await page.evaluate(
      ([probes, properties]) => {
        const lines: string[] = []
        for (const selector of probes) {
          const el = document.querySelector(selector)
          if (!el) {
            lines.push(`${selector}: (not present)`)
            continue
          }
          const cs = getComputedStyle(el)
          lines.push(selector)
          for (const prop of properties) lines.push(`  ${prop}: ${cs.getPropertyValue(prop)}`)
        }
        return lines.join('\n')
      },
      [PROBES, PROPERTIES] as const,
    )

    expect(fingerprint).toMatchSnapshot(`${slug(route)}.styles.txt`)

    // Text does not vary by viewport in a way worth storing three times over;
    // capture it once, on the widest project.
    if (testInfo.project.name === 'desktop-1440') {
      const text = await page.evaluate(() => document.body.innerText.trim())
      expect(text).toMatchSnapshot(`${slug(route)}.text.txt`)
    }
  })
}
