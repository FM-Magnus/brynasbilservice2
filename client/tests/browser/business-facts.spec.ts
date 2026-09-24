import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { expect, test } from '@playwright/test'
import { BUSINESS } from '../../src/data/business'

// Business facts live only in src/data/business.ts (AGENTS.md). On 2026-09-24
// they had drifted: Om oss showed org.nr 559343-9307 while the registers and the
// footer say 559343-5307, and the street address was typed out in 8 places.

// Playwright loads specs as CommonJS in this package, so __dirname is available.
const SRC = join(__dirname, '../../src')

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return sourceFiles(path)
    return /\.tsx?$/.test(path) ? [path] : []
  })
}

// Fixed facts written out literally. Prose such as "på Utmarksvägen i Brynäs"
// (street name without a number) is copy, not a fact, and is allowed.
const HARD_CODED_FACT = /\b559343-\d{4}\b|Utmarksvägen \d|802 91|070[- ]?553|46705533395|info@brynasbilservice\.se|Brynäs Bilservice AB\b/

test('business facts are not hard-coded outside business.ts', async ({}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1440', 'source scan, not viewport-dependent')

  const offenders = sourceFiles(SRC)
    .filter((file) => !file.endsWith(join('data', 'business.ts')))
    .flatMap((file) =>
      readFileSync(file, 'utf8')
        .split('\n')
        .map((line, index) => ({ line, index }))
        // The Facebook page URL contains the company name; it is an address, not copy.
        .filter(({ line }) => HARD_CODED_FACT.test(line.replace(/https?:\/\/\S+/g, '')))
        .map(({ line, index }) => `${relative(SRC, file)}:${index + 1}  ${line.trim().slice(0, 120)}`),
    )

  expect(offenders, 'Read these from BUSINESS in src/data/business.ts').toEqual([])
})

test('Om oss shows the registered org.nr', async ({ page }) => {
  await page.goto('/om-oss')
  await expect(page.locator('.omoss-page__fact-val', { hasText: /^\d{6}-\d{4}$/ })).toHaveText(BUSINESS.orgNumber)
})
