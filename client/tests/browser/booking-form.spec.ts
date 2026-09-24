import { expect, test } from '@playwright/test'
import type { Locator, Page, Route } from '@playwright/test'

// The date bug this suite guards against only shows up east of UTC: a local
// midnight in Stockholm serialises to the previous day in UTC.
test.use({ timezoneId: 'Europe/Stockholm' })

const SUBMIT_LABEL = 'Skicka bokning'

type Captured = { body: Record<string, unknown> }

/** Mocks `/api/*` for the modal. Test double for the contract, not a backend. */
async function mockApi(page: Page, onBooking: (route: Route, captured: Captured) => Promise<void>) {
  const bookings: Captured[] = []
  await page.route('**/api/services', (route) =>
    route.fulfill({ json: [{ id: 3, name: 'Oljebyte' }, { id: 4, name: 'AC-service' }] }),
  )
  await page.route('**/api/bookings', async (route) => {
    const captured = { body: route.request().postDataJSON() as Record<string, unknown> }
    bookings.push(captured)
    await onBooking(route, captured)
  })
  return bookings
}

const created = (route: Route) =>
  route.fulfill({ status: 201, json: { message: 'Booking submitted successfully', bookingId: 1 } })

async function openBookingOn(page: Page, path: string, trigger: string): Promise<Locator> {
  await page.goto(path)
  await page.locator(trigger).first().click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  return dialog
}

const openOnContactPage = (page: Page) => openBookingOn(page, '/kontakt', '.kontakt-page__hero button')

/** Fills every required field; returns the `dd/MM` the date picker shows. */
async function fillRequired(dialog: Locator, page: Page, comment = ''): Promise<string> {
  await dialog.locator('#booking-service').selectOption('3')
  await dialog.locator('#booking-name').fill('  Test Person  ')
  await dialog.locator('#booking-email').fill('test@example.se')
  await dialog.locator('#booking-phone').fill('0701234567')
  await dialog.locator('#booking-date').click()
  await page
    .locator('.react-datepicker__day:not(.react-datepicker__day--outside-month):not(.react-datepicker__day--disabled)')
    .last()
    .click()
  await dialog.locator('.react-time-picker__inputGroup__hour').click()
  await page.keyboard.type('0930')
  if (comment) await dialog.locator('#booking-comment').fill(comment)
  const shown = await dialog.locator('#booking-date').inputValue()
  return shown.split(', ')[1] // "söndag, 20/09" -> "20/09"
}

test('sends a clean booking payload with a local calendar date', async ({ page }) => {
  const bookings = await mockApi(page, (route) => created(route))
  const dialog = await openOnContactPage(page)
  const shown = await fillRequired(dialog, page)
  await dialog.getByRole('button', { name: SUBMIT_LABEL }).click()
  await expect(dialog.getByRole('heading', { name: /Tack/ })).toBeVisible()

  expect(bookings).toHaveLength(1)
  const { body } = bookings[0]
  const [day, month] = shown.split('/')
  expect(body.date).toMatch(new RegExp(`^\\d{4}-${month}-${day}$`)) // not a UTC timestamp
  expect(body).toMatchObject({
    customerName: 'Test Person', // trimmed
    customerEmail: 'test@example.se',
    customerPhone: '0701234567',
    serviceId: 3, // number, not "3"
    time: '09:30',
  })
  expect(body).not.toHaveProperty('comment_customer') // empty comment is omitted
})

test('sends the customer comment as comment_customer', async ({ page }) => {
  const bookings = await mockApi(page, (route) => created(route))
  const dialog = await openOnContactPage(page)
  await fillRequired(dialog, page, 'Kan ni titta på bromsarna också?')
  await dialog.getByRole('button', { name: SUBMIT_LABEL }).click()
  await expect(dialog.getByRole('heading', { name: /Tack/ })).toBeVisible()

  expect(bookings[0].body.comment_customer).toBe('Kan ni titta på bromsarna också?')
})

test('a page-supplied inquiry comment is prefilled and reaches the request', async ({ page }) => {
  const bookings = await mockApi(page, (route) => created(route))
  const dialog = await openBookingOn(page, '/kamrem', '.service-guide__hero button')
  await expect(dialog.locator('#booking-comment')).toHaveValue('Gäller kamremsbyte')
  await fillRequired(dialog, page)
  await dialog.getByRole('button', { name: SUBMIT_LABEL }).click()
  await expect(dialog.getByRole('heading', { name: /Tack/ })).toBeVisible()

  expect(bookings[0].body.comment_customer).toBe('Gäller kamremsbyte')
})

test('a trigger-specific comment wins, and the next plain open is back to the page default', async ({ page }) => {
  await mockApi(page, (route) => created(route))
  const dialog = await openBookingOn(page, '/dackservice', '.bilservice__tire-cta')
  await expect(dialog.locator('#booking-comment')).toHaveValue(/^Gäller \S/)
  await expect(dialog.locator('#booking-comment')).not.toHaveValue('Gäller däckservice & hjulskifte')
  await dialog.getByRole('button', { name: 'Stäng bokningsformuläret' }).click()

  await page.locator('.bb-hero button').first().click()
  await expect(page.getByRole('dialog').locator('#booking-comment')).toHaveValue('Gäller däckservice & hjulskifte')
})

test('a chosen symptom follows into the booking comment', async ({ page }) => {
  await mockApi(page, (route) => created(route))
  await page.goto('/felsokning')
  const card = page.locator('.bilservice__symptom-card').first()
  const advice = await card.locator('.bilservice__symptom-advice').innerText()
  await card.click()
  await page.locator('.bilservice__recommendation button').click()
  await expect(page.getByRole('dialog').locator('#booking-comment')).toHaveValue(`Önskad hjälp: ${advice}`)
})

test('locks the form while sending and a double click creates one booking', async ({ page }) => {
  let release!: () => void
  const gate = new Promise<void>((resolve) => { release = resolve })
  const bookings = await mockApi(page, async (route) => {
    await gate
    await created(route)
  })
  const dialog = await openOnContactPage(page)
  await fillRequired(dialog, page)

  await dialog.getByRole('button', { name: SUBMIT_LABEL }).dblclick()

  const pending = dialog.getByRole('button', { name: 'Skickar…' })
  await expect(pending).toBeDisabled()
  await expect(dialog.locator('form')).toHaveAttribute('aria-busy', 'true')
  await expect(dialog.locator('#booking-name')).toBeDisabled()
  await expect(dialog.getByRole('status')).toHaveText('Skickar din bokning')
  expect(bookings).toHaveLength(1)

  release()
  await expect(dialog.getByRole('heading', { name: /Tack/ })).toBeVisible()
  expect(bookings).toHaveLength(1)
})

test('success replaces the form without a native alert and moves focus to the result', async ({ page }) => {
  let nativeDialogs = 0
  page.on('dialog', (native) => {
    nativeDialogs += 1
    void native.dismiss()
  })
  await mockApi(page, (route) => created(route))
  const dialog = await openOnContactPage(page)
  await fillRequired(dialog, page)
  await dialog.getByRole('button', { name: SUBMIT_LABEL }).click()

  const heading = dialog.getByRole('heading', { name: 'Tack! Din bokningsförfrågan är skickad' })
  await expect(heading).toBeFocused()
  await expect(dialog.getByText('Oljebyte')).toBeVisible()
  await expect(dialog.locator('form')).toHaveCount(0)
  expect(nativeDialogs).toBe(0)

  await dialog.getByRole('button', { name: 'Stäng', exact: true }).click()
  await expect(page.getByRole('dialog')).toHaveCount(0)

  // A fresh open starts empty: nothing from the previous customer is kept.
  await page.locator('.kontakt-page__hero button').first().click()
  await expect(page.getByRole('dialog').locator('#booking-name')).toHaveValue('')
})

test('a server error keeps the entered data, is announced, and can be retried', async ({ page }) => {
  let fail = true
  const bookings = await mockApi(page, (route) =>
    fail ? route.fulfill({ status: 500, json: { error: 'Failed to submit booking' } }) : created(route),
  )
  const dialog = await openOnContactPage(page)
  await fillRequired(dialog, page, 'Behåll mig')
  await dialog.getByRole('button', { name: SUBMIT_LABEL }).click()

  const alert = dialog.getByRole('alert')
  await expect(alert).toContainText('Din bokning har inte skickats.')
  await expect(alert).toContainText('070-553 33 95')
  await expect(alert).toBeFocused()
  await expect(dialog.locator('#booking-name')).toHaveValue('  Test Person  ')
  await expect(dialog.locator('#booking-comment')).toHaveValue('Behåll mig')
  await expect(dialog.getByRole('button', { name: SUBMIT_LABEL })).toBeEnabled()

  fail = false
  await dialog.getByRole('button', { name: SUBMIT_LABEL }).click()
  await expect(dialog.getByRole('heading', { name: /Tack/ })).toBeVisible()
  expect(bookings).toHaveLength(2)
})

test('an unreachable server gets its own message', async ({ page }) => {
  await mockApi(page, (route) => route.abort('failed'))
  const dialog = await openOnContactPage(page)
  await fillRequired(dialog, page)
  await dialog.getByRole('button', { name: SUBMIT_LABEL }).click()

  await expect(dialog.getByRole('alert')).toContainText('Vi når inte servern just nu')
})
