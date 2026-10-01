export type PublicNavigationChild = {
  label: string
  to: string
}

export type PublicNavigationGroup = {
  label: string
  items: PublicNavigationChild[]
}

export type PublicNavigationItem = PublicNavigationChild & {
  /** Every page under this item, flat; used for the active state and the related-service labels. */
  children?: PublicNavigationChild[]
  /** How the header shows `children`: grouped columns (desktop) or an accordion (phone). */
  groups?: PublicNavigationGroup[]
  /** Overview links shown next to the groups (the hub and the larger-repairs page). */
  overview?: PublicNavigationChild[]
  /** Shown inside the Biltjänster menu (a group there) instead of as its own item in the header; still a plain item in the footer. */
  inServices?: boolean
}

export const publicServiceOverview: PublicNavigationChild[] = [
  { label: 'Våra tjänster', to: '/biltjanster' },
  { label: 'Reparationer & större arbeten', to: '/reparationer-storre-arbeten' },
]

export const publicServiceGroups: PublicNavigationGroup[] = [
  {
    label: 'Underhåll',
    items: [
      { label: 'Bilservice', to: '/service-reparationer#bilservice' },
      { label: 'Oljebyte', to: '/oljebyte' },
      { label: 'GAT motorvård', to: '/gat' },
      { label: 'Bilbatteri', to: '/bilbatteri' },
    ],
  },
  {
    label: 'Motor & drivlina',
    items: [
      { label: 'Kamrem', to: '/kamrem' },
      { label: 'Koppling', to: '/koppling' },
      { label: 'Drivaxel och drivknutar', to: '/drivaxel-drivknutar' },
      { label: 'Avgassystem', to: '/avgassystem' },
    ],
  },
  {
    label: 'Bromsar, hjul & chassi',
    items: [
      { label: 'Bromssystem', to: '/bromssystem' },
      { label: 'Hjullagerbyte', to: '/hjullagerbyte' },
      { label: 'Stötdämpare och fjädrar', to: '/stodampare-fjadrar' },
      { label: 'Styrning och kulleder', to: '/styrning-kulleder' },
    ],
  },
  {
    label: 'Felsökning & klimat',
    items: [
      { label: 'Felsökning', to: '/felsokning' },
      { label: 'AC-service', to: '/ac-service' },
    ],
  },
]

export const publicServiceNavigation: PublicNavigationChild[] = [
  ...publicServiceOverview,
  ...publicServiceGroups.flatMap((group) => group.items),
]

export const publicNavigation: PublicNavigationItem[] = [
  { label: 'Hem', to: '/' },
  { label: 'Om oss', to: '/om-oss' },
  { label: 'Biltjänster', to: '/biltjanster', children: publicServiceNavigation, groups: publicServiceGroups, overview: publicServiceOverview },
  { label: 'Felsökning', to: '/felsokning', inServices: true },
  { label: 'Däck', to: '/dackservice' },
  { label: 'AC', to: '/ac-service', inServices: true },
  { label: 'Bärgning', to: '/bargning' },
  { label: 'Till salu', to: '/bilar-till-salu' },
  { label: 'Kontakt', to: '/kontakt' },
]
