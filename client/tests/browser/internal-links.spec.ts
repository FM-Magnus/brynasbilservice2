import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { expect, test } from '@playwright/test'

// The router runs under a basename: '/brynasbilservice' in production, '/' in dev.
// A plain <a href="/kontakt"> skips it, so on the live site it leaves the app and
// 404s — while every other test here runs in dev, where the same link happens to
// work. Internal links must be <Link to="/kontakt">. A deliberate full-page link
// to the app root uses import.meta.env.BASE_URL instead of a literal '/'.

// Playwright loads specs as CommonJS in this package, so __dirname is available.
const SRC = join(__dirname, '../../src')

function tsxFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return tsxFiles(path)
    return path.endsWith('.tsx') ? [path] : []
  })
}

// href="/x", href='/x' and href={'/x'} / href={"/x"} / href={`/x`}. Protocol-relative
// '//host' is excluded; it is external by definition.
const ROOT_RELATIVE_HREF = /href=\{?\s*["'`]\/(?!\/)/

test('no internal link bypasses the router basename', async ({}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1440', 'source scan, not viewport-dependent')

  const offenders = tsxFiles(SRC).flatMap((file) =>
    readFileSync(file, 'utf8')
      .split('\n')
      .map((line, index) => ({ line, index }))
      .filter(({ line }) => ROOT_RELATIVE_HREF.test(line))
      .map(({ line, index }) => `${relative(SRC, file)}:${index + 1}  ${line.trim().slice(0, 120)}`),
  )

  expect(offenders, 'Use <Link to="/..."> for internal links (see comment above)').toEqual([])
})
