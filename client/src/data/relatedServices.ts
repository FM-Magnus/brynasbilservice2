import { publicNavigation, publicServiceNavigation } from './publicNavigation'

/**
 * "Fler tjänster" links at the end of each guide (benchmark B5): jobs that
 * often go together. Labels come from the navigation so a renamed page
 * renames its links too.
 */
const RELATED: Record<string, readonly string[]> = {
  '/oljebyte': ['/service-reparationer#bilservice', '/kamrem', '/bilbatteri'],
  '/kamrem': ['/oljebyte', '/koppling', '/felsokning'],
  '/koppling': ['/drivaxel-drivknutar', '/kamrem', '/felsokning'],
  '/bromssystem': ['/hjullagerbyte', '/stodampare-fjadrar', '/styrning-kulleder'],
  '/bilbatteri': ['/felsokning', '/oljebyte', '/service-reparationer#bilservice'],
  '/stodampare-fjadrar': ['/styrning-kulleder', '/hjullagerbyte', '/bromssystem'],
  '/hjullagerbyte': ['/bromssystem', '/drivaxel-drivknutar', '/stodampare-fjadrar'],
  '/avgassystem': ['/felsokning', '/service-reparationer#bilservice', '/oljebyte'],
  '/drivaxel-drivknutar': ['/koppling', '/hjullagerbyte', '/styrning-kulleder'],
  '/styrning-kulleder': ['/stodampare-fjadrar', '/hjullagerbyte', '/dackservice'],
}

const LABELS = new Map<string, string>([
  ...publicServiceNavigation.map((item) => [item.to, item.label] as const),
  ...publicNavigation.map((item) => [item.to, item.label] as const),
  ['/dackservice', 'Däckservice och hjulinställning'],
])

export function relatedServices(route: string): { to: string; label: string }[] {
  return (RELATED[route] ?? []).map((to) => ({ to, label: LABELS.get(to) ?? to }))
}
