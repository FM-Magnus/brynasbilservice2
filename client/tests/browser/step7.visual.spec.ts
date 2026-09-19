import { expect, test } from '@playwright/test'

// Step 7 guard: the legacy index.css is gone and must stay gone.

test('/tjanster redirects to /biltjanster', async ({ page }) => {
  await page.goto('/tjanster')
  await expect(page).toHaveURL(/\/biltjanster$/)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('no legacy tokens or classes in the global stylesheet', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  const legacy = await page.evaluate(() => {
    const root = getComputedStyle(document.documentElement)
    const vars = ['--redesign-accent', '--redesign-ink', '--color-background', '--font-family-body'].filter((v) => root.getPropertyValue(v).trim() !== '')
    const selectors: string[] = []
    for (const sheet of Array.from(document.styleSheets)) {
      let rules: CSSRuleList
      try { rules = sheet.cssRules } catch { continue }
      for (const rule of Array.from(rules)) {
        const text = (rule as CSSStyleRule).selectorText ?? ''
        if (/\.(services-page__|biltjanster-faq|btn--primary|site-header|site-footer|google-reviews)/.test(text)) selectors.push(text)
      }
    }
    // Tailwind emits its own .container utility; no public element may use it.
    const containers = document.querySelectorAll('main .container, header .container, footer .container').length
    return { vars, selectors: selectors.slice(0, 5), containers }
  })
  expect(legacy.vars).toEqual([])
  expect(legacy.selectors).toEqual([])
  expect(legacy.containers).toBe(0)
})
