import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { expect, test } from '@playwright/test'

// Shared markup and logic have one home each (AGENTS.md: one pattern per job).
// A page that hand-writes a tip box, its own booking state or a copy of a guide
// section renders fine and passes every visual test, and then drifts the next
// time the shared version changes. This scan keeps each pattern in its owner.

// Playwright loads specs as CommonJS in this package, so __dirname is available.
const SRC = join(__dirname, '../../src')

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return sourceFiles(path)
    return /\.tsx?$/.test(path) ? [path] : []
  })
}

const GUIDE_SECTIONS = 'components/guide/ServiceGuideSections.tsx'

const RULES = [
  {
    what: 'the tip callout (.bb-tip)',
    pattern: /className=["'`{][^"'`]*\bbb-tip\b(?!__)/,
    owners: ['components/ui/Tip.tsx'],
    use: 'render <Tip title text action? /> from components/ui/Tip',
  },
  {
    what: 'the booking modal',
    pattern: /from ['"][./]*(components\/)?BookingForm['"]/,
    owners: ['hooks/useBookingModal.tsx'],
    use: 'const { openBooking, openBookingWith, bookingModal } = useBookingModal(defaultComment)',
  },
  {
    what: 'the booking modal implementation',
    pattern: /['"][./]*(components\/)?BookingFormModalImpl['"]/,
    owners: ['components/BookingForm.tsx'],
    use: 'useBookingModal (the implementation stays behind the lazy boundary in BookingForm.tsx)',
  },
  {
    what: 'sending a contact message',
    pattern: /\b(openContactEmail|contactMailtoHref)\(/,
    owners: ['hooks/useContactForm.ts', 'api/contact.ts'],
    use: 'const { mailtoHref, handleSubmit, reset } = useContactForm()',
  },
  {
    what: 'Guide-family section markup',
    pattern: /service-guide__(hero|intro-layout|importance|symptoms-layout|symptom-list|service-card|info-heading|info-ledger|safety-strip|closing|topic-header|topic-grid|topic-prose|component-grid)\b/,
    owners: [GUIDE_SECTIONS],
    use: `the Guide* components in ${GUIDE_SECTIONS}`,
  },
]

test('shared markup and logic are only written in their owner file', async ({}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1440', 'source scan, not viewport-dependent')

  const files = sourceFiles(SRC).map((path) => ({ path: relative(SRC, path).split('\\').join('/'), text: readFileSync(path, 'utf8') }))

  for (const rule of RULES) {
    // Guard the guard: if an owner stops matching (renamed file, changed markup),
    // this rule would silently pass everything, so fail instead.
    for (const owner of rule.owners) {
      const file = files.find(({ path }) => path === owner)
      expect(file, `${owner} (owner of ${rule.what}) no longer exists; update RULES`).toBeTruthy()
    }
    expect(
      rule.owners.some((owner) => rule.pattern.test(files.find(({ path }) => path === owner)?.text ?? '')),
      `No owner of ${rule.what} matches its pattern any more; update RULES`,
    ).toBe(true)

    const offenders = files
      .filter(({ path }) => !rule.owners.includes(path))
      .flatMap(({ path, text }) =>
        text.split('\n').flatMap((line, index) => (rule.pattern.test(line) ? [`${path}:${index + 1}  ${line.trim().slice(0, 120)}`] : [])),
      )

    expect.soft(offenders, `Written outside its owner: ${rule.what}. Use ${rule.use}.`).toEqual([])
  }
})
