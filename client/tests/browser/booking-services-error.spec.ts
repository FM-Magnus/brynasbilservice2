import { expect, test } from '@playwright/test'
import { BUSINESS } from '../../src/data/business'

// The service select is required, so without services the booking can never be
// sent. Until 2026-09-24 a failed /api/services left an empty list and only a
// console error; the visitor now gets a notice with the phone number.

const openBooking = async (page: import('@playwright/test').Page) => {
  await page.goto('/dackservice')
  await page.locator('#dackservice .bb-hero__actions button').first().click()
  return page.getByRole('dialog')
}

test('a failed services request tells the visitor to call instead', async ({ page }) => {
  await page.route((url) => url.pathname === '/api/services', (route) => route.fulfill({ status: 500, body: '{}' }))
  const dialog = await openBooking(page)

  const notice = dialog.getByRole('alert')
  await expect(notice).toContainText('Tjänsterna kunde inte hämtas just nu.')
  await expect(notice.getByRole('link', { name: BUSINESS.phone.display })).toHaveAttribute('href', BUSINESS.phone.href)
})

test('no notice when services load', async ({ page }) => {
  await page.route((url) => url.pathname === '/api/services', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([{ id: 1, name: 'Hjulskifte' }]) }),
  )
  const dialog = await openBooking(page)

  await expect(dialog.locator('#booking-service option')).toHaveCount(2)
  await expect(dialog.getByText('Tjänsterna kunde inte hämtas just nu.')).toHaveCount(0)
})
