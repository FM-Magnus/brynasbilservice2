import { readFileSync } from 'node:fs'
import { join } from 'node:path'

// The public page routes, read from the router in src/main.tsx so a new page
// is covered by the route-wide specs without editing them. Left out: redirects
// (<Navigate>), /admin and the "*" 404 route.
// Playwright loads specs as CommonJS in this package, so __dirname is available.
const main = readFileSync(join(__dirname, '../../src/main.tsx'), 'utf8')

export const PUBLIC_ROUTES: readonly string[] = [...main.matchAll(/<Route path="([^"]+)" element=\{<(\w+)/g)]
  .filter(([, path, element]) => element !== 'Navigate' && path !== '*' && !path.startsWith('/admin'))
  .map(([, path]) => path)

if (PUBLIC_ROUTES.length < 20 || !PUBLIC_ROUTES.includes('/')) {
  throw new Error(`Could not read the public routes from src/main.tsx (got ${PUBLIC_ROUTES.length}); has the <Route> markup changed?`)
}
