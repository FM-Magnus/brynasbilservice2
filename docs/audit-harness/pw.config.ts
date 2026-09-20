// Playwright config that uses the system Chrome instead of Playwright's own browser
// (which may not be installed). Keep it OUTSIDE client/ or pass it with -c; do not
// replace client/playwright.config.ts. Usage from client/:
//   npx playwright test -c ../docs/audit-harness/pw.config.ts
import base from '../../client/playwright.config'

export default {
  ...base,
  testDir: '../../client/tests/browser',
  use: { ...base.use, channel: 'chrome' },
}
