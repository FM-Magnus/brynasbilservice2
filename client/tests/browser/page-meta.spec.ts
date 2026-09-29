import { expect, test } from '@playwright/test'
import { PUBLIC_ROUTES } from './routes'
import { PAGE_META } from '../../src/data/pageMeta'
import { BUSINESS } from '../../src/data/business'

// Until 2026-09-29 every page shared the <title> and description from
// index.html (benchmark finding A1). Each public route now needs its own.

test('every public route has its own title and description', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1440', 'metadata is not viewport-dependent')

  const seenTitles = new Map<string, string>()
  const seenDescriptions = new Map<string, string>()
  for (const route of PUBLIC_ROUTES) {
    expect(PAGE_META[route], `add ${route} to src/data/pageMeta.ts`).toBeDefined()
    await page.goto(route)
    await expect(page).toHaveTitle(PAGE_META[route].title)
    const title = await page.title()
    const description = await page.locator('meta[name="description"]').getAttribute('content')
    expect(description, `${route} has no description`).toBeTruthy()
    expect(title.length, `${route} title is too long for Google`).toBeLessThanOrEqual(60)
    expect(description!.length, `${route} description is too long for Google`).toBeLessThanOrEqual(155)
    expect(seenTitles.get(title), `${route} repeats a title`).toBeUndefined()
    expect(seenDescriptions.get(description!), `${route} repeats a description`).toBeUndefined()
    seenTitles.set(title, route)
    seenDescriptions.set(description!, route)
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0)
  }
})

test('the 404 page has its own title and is kept out of search results', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1440', 'metadata is not viewport-dependent')
  await page.goto('/finns-inte')
  await expect(page).toHaveTitle('Sidan hittades inte – Brynäs Bilservice')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex')
})

test('structured data: AutoRepair on every page, FAQPage where there is a FAQ', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1440', 'metadata is not viewport-dependent')

  const readJsonLd = async () =>
    (await page.locator('script[type="application/ld+json"]').allTextContents()).map((text) => JSON.parse(text))

  await page.goto('/bromssystem')
  await expect(page.locator('h1')).toBeVisible()
  const data = await readJsonLd()
  const business = data.find((d) => d['@type'] === 'AutoRepair')
  expect(business?.telephone).toBe(BUSINESS.phone.e164)
  expect(business?.address?.streetAddress).toBe(BUSINESS.address.street)
  const faq = data.find((d) => d['@type'] === 'FAQPage')
  const visibleQuestions = await page.locator('.bb-faq__item').count()
  expect(faq?.mainEntity).toHaveLength(visibleQuestions)

  await page.goto('/finns-inte')
  await expect(page.locator('#ld-business')).toHaveCount(0)
})
