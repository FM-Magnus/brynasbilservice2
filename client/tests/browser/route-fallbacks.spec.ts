import { expect, test } from '@playwright/test'

// Before 2026-09-24 both cases below rendered an empty page with no header:
// there was no catch-all route and no error boundary around the lazy routes.

test('an unknown address shows the 404 page with the public shell', async ({ page }) => {
  await page.goto('/finns-inte')

  await expect(page.getByRole('heading', { level: 1, name: /Den här sidan\s*finns inte/ })).toBeVisible()
  await expect(page.locator('.public-header')).toBeVisible()
  await expect(page.locator('.bb-footer')).toBeVisible()

  await page.getByRole('link', { name: 'Till startsidan', exact: true }).click()
  await expect(page).toHaveURL(/\/$/)
})

test('a route chunk that fails to load shows a reload prompt, and reloading recovers', async ({ page }) => {
  // In dev each lazy page is its own module request; failing it is what a
  // stale chunk after a deploy looks like to the browser.
  const failKamrem = (route: import('@playwright/test').Route) => route.fulfill({ status: 404, body: 'gone' })
  await page.route('**/src/pages/KamremPage.tsx*', failKamrem)
  await page.goto('/kamrem')

  await expect(page.getByRole('heading', { level: 1, name: /Sidan kunde inte\s*laddas/ })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Ladda om sidan' })).toBeVisible()

  await page.unroute('**/src/pages/KamremPage.tsx*', failKamrem)
  await page.getByRole('button', { name: 'Ladda om sidan' }).click()
  await expect(page.locator('.service-guide__hero h1')).toBeVisible()
})
