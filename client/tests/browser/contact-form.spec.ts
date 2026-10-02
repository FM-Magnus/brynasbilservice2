import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

async function mockContact(page: Page, status = 202) {
  const messages: Record<string, unknown>[] = []
  await page.route('**/api/contact', (route) => {
    messages.push(route.request().postDataJSON() as Record<string, unknown>)
    return route.fulfill({ status, json: status === 202 ? { status: 'accepted' } : { error: { code: 'MAIL_UNAVAILABLE' } } })
  })
  return messages
}

test('Kontakt sends through the API and reports acceptance', async ({ page }) => {
  const messages = await mockContact(page)
  await page.goto('/kontakt')
  const form = page.locator('.kontakt-page__form')
  await form.getByLabel(/Namn/).fill('Anna Andersson')
  await form.getByLabel(/E-post/).fill('anna@example.se')
  await form.getByLabel(/^Telefon/).fill('0701234567')
  await form.getByLabel(/Ärende/).selectOption('AC-service')
  await form.getByLabel(/Meddelande/).fill('AC:n blåser varmt.')
  await form.getByRole('button', { name: /Skicka meddelande/ }).click()

  await expect(page.locator('.kontakt-page__form-success')).toContainText('Förfrågan mottagen')
  expect(messages).toEqual([{
    name: 'Anna Andersson', email: 'anna@example.se', phone: '0701234567',
    subject: 'AC-service', message: 'AC:n blåser varmt.',
  }])
})

test('Landing uses the same API path and trims its fields', async ({ page }) => {
  const messages = await mockContact(page)
  await page.goto('/')
  const form = page.locator('.bb-contact-form')
  await form.getByLabel(/Namn/).fill('  Olle ')
  await form.getByLabel(/E-post/).fill('olle@example.se')
  await form.getByLabel(/Meddelande/).fill('Hej!\n')
  await form.getByRole('button', { name: /Skicka meddelande/ }).click()

  await expect(page.locator('.bb-contact-form__success')).toContainText('Förfrågan mottagen')
  expect(messages).toEqual([{
    name: 'Olle', email: 'olle@example.se', phone: '', subject: '', message: 'Hej!',
  }])
})

test('a failed send keeps the Kontakt form values and shows a real error', async ({ page }) => {
  await mockContact(page, 503)
  await page.goto('/kontakt')
  const form = page.locator('.kontakt-page__form')
  await form.getByLabel(/Namn/).fill('Anna Andersson')
  await form.getByLabel(/E-post/).fill('anna@example.se')
  await form.getByLabel(/Meddelande/).fill('Behåll mig')
  await form.getByRole('button', { name: /Skicka meddelande/ }).click()

  await expect(form.getByRole('alert')).toContainText('kunde inte ta emot')
  await expect(form.getByLabel(/Meddelande/)).toHaveValue('Behåll mig')
  await expect(form.getByRole('button', { name: /Skicka meddelande/ })).toBeEnabled()
  await expect(page.locator('.kontakt-page__form-success')).toHaveCount(0)
})
