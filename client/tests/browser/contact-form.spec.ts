import { expect, test, type Locator } from '@playwright/test'
import { BUSINESS } from '../../src/data/business'

// Until a /api/contact endpoint exists, both contact forms hand the message to
// the visitor's e-mail program (src/api/contact.ts). Before 2026-09-24 they
// showed "Tack för ditt meddelande!" and sent nothing.

async function expectMailto(link: Locator, expected: { subject: string; body: string[] }) {
  const href = await link.getAttribute('href')
  expect(href).not.toBeNull()
  const url = new URL(href!)
  expect(url.protocol).toBe('mailto:')
  expect(url.pathname).toBe(BUSINESS.email.address)
  expect(url.searchParams.get('subject')).toBe(expected.subject)
  expect(url.searchParams.get('body')?.split('\r\n')).toEqual(expected.body)
}

test('the Kontakt form hands a pre-filled message to the e-mail program', async ({ page }) => {
  await page.goto('/kontakt')
  const form = page.locator('.kontakt-page__form')
  await form.getByLabel(/Namn/).fill('Anna Andersson')
  await form.getByLabel(/E-post/).fill('anna@example.se')
  await form.getByLabel(/Telefonnummer/).fill('0701234567')
  await form.getByLabel(/Ärende/).selectOption('AC-service')
  await form.getByLabel(/Meddelande/).fill('AC:n blåser varmt.')
  await form.getByRole('button', { name: /Skicka meddelande/ }).click()

  const status = page.locator('.kontakt-page__form-success')
  await expect(status).toContainText('Klart att skicka')
  await expect(status).not.toContainText('Tack för ditt meddelande')
  await expectMailto(status.getByRole('link', { name: BUSINESS.email.address }), {
    subject: 'Förfrågan via webbplatsen – AC-service',
    body: ['Namn: Anna Andersson', 'E-post: anna@example.se', 'Telefon: 0701234567', 'Ärende: AC-service', '', 'AC:n blåser varmt.'],
  })
})

test('the Landing contact card hands a pre-filled message to the e-mail program', async ({ page }) => {
  await page.goto('/')
  const form = page.locator('.bb-contact-form')
  // Surrounding spaces are trimmed, as on Kontakt (both use useContactForm).
  await form.getByLabel(/Namn/).fill('  Olle ')
  await form.getByLabel(/E-post/).fill('olle@example.se')
  await form.getByLabel(/Meddelande/).fill('Hej!\n')
  await form.getByRole('button', { name: /Skicka meddelande/ }).click()

  const status = page.locator('.bb-contact-form__success')
  await expect(status).toContainText('Klart att skicka')
  // Empty optional fields (phone, subject) are left out of the message.
  await expectMailto(status.getByRole('link', { name: BUSINESS.email.address }), {
    subject: 'Förfrågan via webbplatsen',
    body: ['Namn: Olle', 'E-post: olle@example.se', '', 'Hej!'],
  })
})
