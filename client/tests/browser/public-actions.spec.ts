import { expect, test } from '@playwright/test'

test('one server mapping changes shared booking CTAs into native call links', async ({ page }) => {
  await page.route('**/api/public/actions', (route) => route.fulfill({
    json: {
      version: 1,
      actions: { book: 'call', contact: 'contact', call: 'call', email: 'email', directions: 'directions' },
    },
  }))
  await page.goto('/kontakt')
  const header = page.locator('.public-header__booking')
  await expect(header).toHaveAttribute('href', 'tel:+46705533395')
  await expect(header).toContainText('Ring oss')
  const closing = page.locator('.kontakt-page__closing-actions .bb-btn--teal')
  await expect(closing).toHaveAttribute('href', 'tel:+46705533395')
  await expect(closing).toContainText('Ring oss')
})

test('the default booking action still opens the shared modal', async ({ page }) => {
  await page.route('**/api/public/actions', (route) => route.fulfill({
    json: {
      version: 1,
      actions: { book: 'book', contact: 'contact', call: 'call', email: 'email', directions: 'directions' },
    },
  }))
  await page.goto('/kontakt')
  await page.locator('.kontakt-page__hero .bb-btn--teal').click()
  await expect(page.getByRole('dialog')).toBeVisible()
})

test('vehicle inquiry context follows a booking-to-contact mapping', async ({ page }) => {
  await page.route('**/api/public/actions', (route) => route.fulfill({ json: {
    version: 1,
    actions: { book: 'contact', contact: 'contact', call: 'call', email: 'email', directions: 'directions' },
  } }))
  await page.goto('/bilar-till-salu')
  const inquiry = page.locator('.bilartillsalu-page__inquiry-btn').first()
  await expect(inquiry).toContainText('Skriv meddelande')
  await inquiry.click()
  await expect(page).toHaveURL(/\/kontakt\?message=/)
  await expect(page.locator('#contact-message')).toHaveValue('Gäller förfrågan om Peugeot 307 CC 2.0 (2006)')
})

test('unavailable policy retains native call and a local booking control', async ({ page }) => {
  await page.route('**/api/public/actions', (route) => route.abort())
  await page.goto('/kontakt')
  await expect(page.locator('.kontakt-page__hero .bb-btn--teal')).toHaveJSProperty('tagName', 'BUTTON')
  await expect(page.locator('.kontakt-page__hero a[href^="tel:"]')).toHaveCount(1)
})

test('contact policy can replace both form submit actions with a native call', async ({ page }) => {
  await page.route('**/api/public/actions', (route) => route.fulfill({ json: {
    version: 1,
    actions: { book: 'book', contact: 'call', call: 'call', email: 'email', directions: 'directions' },
  } }))
  await page.goto('/kontakt')
  await expect(page.locator('.kontakt-page__form-action a')).toHaveAttribute('href', 'tel:+46705533395')
  await expect(page.locator('.kontakt-page__form-action a')).toContainText('Ring oss')
  await page.goto('/')
  await expect(page.locator('.bb-contact-form__submit')).toHaveAttribute('href', 'tel:+46705533395')
  await expect(page.locator('.bb-contact-form__submit')).toContainText('Ring oss')
})

test('service-specific booking context follows a contact remap', async ({ page }) => {
  await page.route('**/api/public/actions', (route) => route.fulfill({ json: {
    version: 1,
    actions: { book: 'contact', contact: 'contact', call: 'call', email: 'email', directions: 'directions' },
  } }))
  await page.goto('/dackservice')
  const hotel = page.locator('.bilservice__storage-footer .bb-btn')
  await expect(hotel).toHaveAttribute('href', /\/kontakt\?message=G/)
  await hotel.click()
  await expect(page.locator('#contact-message')).toHaveValue('Gäller däckhotell & förvaring')
})
