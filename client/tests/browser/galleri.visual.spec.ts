import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test, type Page } from '@playwright/test'
import { GALLERY_EXTENSIONS, naturalCompare, resolveCaption, slugFromFilename, type GalleryCaption } from '../../src/data/galleryHelpers'

// Expected gallery derived from the folder itself — never hardcoded — so the
// suite stays green when Magnus adds or removes photos.
// Playwright loads specs as CommonJS in this package, so __dirname is available.
const folder = join(__dirname, '../../src/assets/galleri')
const captions = JSON.parse(readFileSync(join(folder, 'bildtexter.json'), 'utf8')) as Record<string, GalleryCaption>
const expected = readdirSync(folder)
  .filter((name) => GALLERY_EXTENSIONS.test(name))
  .sort(naturalCompare)
  .map(slugFromFilename)
  .filter((slug, index, all) => slug && all.indexOf(slug) === index)
  .map((slug) => ({ slug, ...resolveCaption(slug, captions) }))
const N = expected.length
const pad = (value: number) => String(value).padStart(Math.max(2, String(N).length), '0')

test.describe('galleri helpers', () => {
  test('slugs, natural order and caption fallback', () => {
    expect(slugFromFilename('010-Servicegång mot kontor.JPG')).toBe('servicegang-mot-kontor')
    expect(slugFromFilename('Däck_Hotell 2.webp')).toBe('dack-hotell-2')
    expect(['10-b.jpg', '2-a.jpg'].sort(naturalCompare)).toEqual(['2-a.jpg', '10-b.jpg'])
    expect(resolveCaption('test-bild', {})).toEqual({
      title: 'Test bild',
      description: '',
      category: 'Verkstad',
      alt: 'Bild från Brynäs Bilservice verkstad: Test bild',
    })
    expect(resolveCaption('a', { a: { titel: 'T', beskrivning: 'B', kategori: 'K', alt: 'A' } })).toEqual({
      title: 'T', description: 'B', category: 'K', alt: 'A',
    })
  })
})

const counter = (page: Page) => page.locator('.galleri-page__counter')
const stageBox = async (page: Page) => (await page.locator('.galleri-page__stage').boundingBox())!

test('galleri: folder-driven viewer on its own island', async ({ page }, testInfo) => {
  expect(N).toBeGreaterThan(1)
  const consoleProblems: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error' || message.type() === 'warning') consoleProblems.push(message.text())
  })
  await page.addInitScript(() => {
    const w = window as unknown as { __cls: number }
    w.__cls = 0
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as unknown as Array<{ value: number; hadRecentInput: boolean }>) {
        if (!entry.hadRecentInput) w.__cls += entry.value
      }
    }).observe({ type: 'layout-shift', buffered: true })
  })

  await page.goto('/galleri')
  await page.waitForLoadState('networkidle')
  await page.evaluate(() => document.fonts.ready)

  // Shell, heading, overflow
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Bilder från')
  await expect(page.locator('.public-header')).toBeVisible()
  await expect(page.locator('.public-footer, footer').first()).toBeAttached()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)

  // No legacy index.css selectors, no Tailwind utilities
  await expect(page.locator('[class*="about-page"], [class*="gallery-viewer"], .section-eyebrow, .container')).toHaveCount(0)
  const tailwind = await page.locator('main').evaluate((main) =>
    [...main.querySelectorAll('[class]')].filter((el) => /(^|\s)(w-4|h-4|text-teal-400)(\s|$)/.test(el.getAttribute('class') ?? '')).length,
  )
  expect(tailwind).toBe(0)

  // Thumbnails match the folder, in order
  const thumbs = page.locator('.galleri-page__thumb')
  await expect(thumbs).toHaveCount(N)
  const labels = await thumbs.evaluateAll((els) => els.map((el) => el.getAttribute('aria-label')))
  expect(labels).toEqual(expected.map((image, index) => `Visa bild ${index + 1} av ${N}: ${image.title}`))
  await expect(thumbs.first()).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('.galleri-page__title')).toHaveText(expected[0].title)

  // Main image attributes; lazy thumbnails
  const mainImg = page.locator('.galleri-page__stage-img')
  await expect(mainImg).toHaveAttribute('srcset', /\d+w/)
  await expect(mainImg).toHaveAttribute('sizes', /.+/)
  await expect(mainImg).toHaveAttribute('width', /\d+/)
  await expect(mainImg).toHaveAttribute('height', /\d+/)
  await expect(mainImg).toHaveAttribute('fetchpriority', 'high')
  expect(await thumbs.evaluateAll((els) => els.every((el) => el.querySelector('img')?.getAttribute('loading') === 'lazy'))).toBe(true)

  const initialBox = await stageBox(page)

  // Next / previous (wrap-around), URL and live region
  await page.getByRole('button', { name: 'Nästa bild' }).click()
  await expect(counter(page)).toHaveText(`${pad(2)} / ${pad(N)}`)
  await expect(page).toHaveURL(new RegExp(`\\?bild=${expected[1].slug}$`))
  await expect(page.locator('.galleri-page__sr-only')).toHaveText(`Bild 2 av ${N}: ${expected[1].title}`)
  await page.getByRole('button', { name: 'Föregående bild' }).click()
  await page.getByRole('button', { name: 'Föregående bild' }).click()
  await expect(counter(page)).toHaveText(`${pad(N)} / ${pad(N)}`)
  await expect(thumbs.nth(N - 1)).toHaveAttribute('aria-pressed', 'true')

  // Keyboard: viewer ArrowRight, strip End/Home
  await page.locator('.galleri-page__viewer').focus()
  await page.keyboard.press('ArrowRight')
  await expect(counter(page)).toHaveText(`${pad(1)} / ${pad(N)}`)
  await thumbs.first().focus()
  await page.keyboard.press('End')
  await expect(thumbs.nth(N - 1)).toHaveAttribute('aria-pressed', 'true')
  await expect(thumbs.nth(N - 1)).toBeFocused()
  await page.keyboard.press('Home')
  await expect(thumbs.first()).toHaveAttribute('aria-pressed', 'true')

  // Stage geometry never changes
  for (let i = 0; i < 5; i++) {
    await page.getByRole('button', { name: 'Nästa bild' }).click()
    const box = await stageBox(page)
    expect(Math.abs(box.width - initialBox.width)).toBeLessThanOrEqual(1)
    expect(Math.abs(box.height - initialBox.height)).toBeLessThanOrEqual(1)
  }
  for (let i = 0; i < 5; i++) await page.getByRole('button', { name: 'Nästa bild' }).click()

  // Scroll the page; wheel over the strip must scroll the page, not be hijacked
  await page.evaluate(async () => {
    for (let y = 0; y <= document.documentElement.scrollHeight; y += 300) {
      window.scrollTo(0, y)
      await new Promise((resolve) => setTimeout(resolve, 40))
    }
    window.scrollTo(0, 0)
  })
  if (!testInfo.project.use.isMobile) {
    const strip = page.locator('.galleri-page__strip')
    await strip.scrollIntoViewIfNeeded()
    const before = await page.evaluate(() => window.scrollY)
    const box = (await strip.boundingBox())!
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
    await page.mouse.wheel(0, 300)
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(before)
  }
  await page.waitForTimeout(300)
  expect(await page.evaluate(() => (window as unknown as { __cls: number }).__cls)).toBeLessThan(0.02)
  expect(consoleProblems).toEqual([])

  // Closing card and booking
  await expect(page.locator('main a[href$="/biltjanster"]')).toHaveCount(1)
  await expect(page.locator('main a[href$="/tjanster"]')).toHaveCount(0)
  await page.locator('.galleri-page__book').click()
  await expect(page.locator('[role="dialog"]')).toBeVisible()
  await expect(page.locator('#booking-comment')).toHaveValue('')
  await page.keyboard.press('Escape')

  await page.evaluate(() => window.scrollTo(0, 0))
  await page.screenshot({ path: testInfo.outputPath('galleri.png'), fullPage: true })
})

test('galleri: deep links', async ({ page }) => {
  const last = expected[N - 1]
  await page.goto(`/galleri?bild=${last.slug}`)
  await expect(page.locator('.galleri-page__title')).toHaveText(last.title)
  await expect(counter(page)).toHaveText(`${pad(N)} / ${pad(N)}`)

  await page.goto('/galleri?bild=finns-inte')
  await expect(page.locator('.galleri-page__title')).toHaveText(expected[0].title)
  await expect(counter(page)).toHaveText(`${pad(1)} / ${pad(N)}`)
})

test('galleri: touch swipe on the stage', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-390', 'touch swipe is a mobile interaction')
  await page.goto('/galleri')
  await page.waitForLoadState('networkidle')
  // Swipe the real stage, not the loading placeholder that shares its class.
  await expect(page.locator('.galleri-page__stage-img')).toBeVisible()
  await expect(counter(page)).toHaveText(`${pad(1)} / ${pad(N)}`)
  const swipe = (dx: number, dy: number) =>
    page.locator('.galleri-page__stage').evaluate((stage, [dx, dy]) => {
      const r = stage.getBoundingClientRect()
      const x = r.left + r.width / 2
      const y = r.top + r.height / 2
      const init = { bubbles: true, pointerType: 'touch', pointerId: 7, isPrimary: true }
      stage.dispatchEvent(new PointerEvent('pointerdown', { ...init, clientX: x, clientY: y }))
      stage.dispatchEvent(new PointerEvent('pointerup', { ...init, clientX: x + dx, clientY: y + dy }))
    }, [dx, dy])
  await swipe(-120, 10)
  await expect(counter(page)).toHaveText(`${pad(2)} / ${pad(N)}`)
  await swipe(8, -140)
  await expect(counter(page)).toHaveText(`${pad(2)} / ${pad(N)}`)
  await swipe(120, 0)
  await expect(counter(page)).toHaveText(`${pad(1)} / ${pad(N)}`)
})

// Edge cases: the real folder module is fetched and modified in the browser
// (dev server only). The appended code starts with a newline because the
// served module ends in a sourcemap comment.
async function mockGallery(page: Page, code: string) {
  await page.route('**/src/data/gallery.ts*', async (route) => {
    const response = await route.fetch()
    await route.fulfill({ response, body: (await response.text()) + '\n' + code, headers: { ...response.headers(), 'content-type': 'application/javascript' } })
  })
}

test('galleri: zero, one and sixty images', async ({ page }) => {
  await mockGallery(page, 'folderGalleryImages.length = 0')
  await page.goto('/galleri')
  await expect(page.locator('.galleri-page__notice')).toBeVisible()
  await expect(page.locator('.galleri-page__viewer')).toHaveCount(0)

  await page.unrouteAll()
  await mockGallery(page, 'folderGalleryImages.length = 1')
  await page.goto('/galleri')
  await expect(page.locator('.galleri-page__stage-img')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Nästa bild' })).toHaveCount(0)
  await expect(page.locator('.galleri-page__strip')).toHaveCount(0)

  await page.unrouteAll()
  await mockGallery(page, `
const __src = [...folderGalleryImages]
folderGalleryImages.length = 0
for (let i = 0; i < 60; i++) { const b = __src[i % __src.length]; folderGalleryImages.push({ ...b, id: i + 1, slug: b.slug + '-' + i, title: b.title + ' ' + (i + 1) }) }`)
  await page.goto('/galleri')
  await page.waitForLoadState('networkidle')
  const thumbs = page.locator('.galleri-page__thumb')
  await expect(thumbs).toHaveCount(60)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
  expect(await page.locator('.galleri-page__strip').evaluate((strip) => strip.scrollWidth > strip.clientWidth)).toBe(true)
  await thumbs.first().focus()
  await page.keyboard.press('End')
  await expect(thumbs.nth(59)).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('.galleri-page__counter')).toHaveText('60 / 60')
  await expect(thumbs.nth(59)).toBeInViewport()
})
