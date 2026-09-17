export type PublicNavigationChild = {
  label: string
  to: string
}

export type PublicNavigationItem = PublicNavigationChild & {
  children?: PublicNavigationChild[]
}

export const publicServiceNavigation: PublicNavigationChild[] = [
  { label: 'Våra tjänster', to: '/biltjanster' },
  { label: 'Bilservice', to: '/service-reparationer#bilservice' },
  { label: 'Oljebyte', to: '/oljebyte' },
  { label: 'Kamrem', to: '/kamrem' },
  { label: 'Koppling', to: '/koppling' },
  { label: 'Bromssystem', to: '/bromssystem' },
  { label: 'Bilbatteri', to: '/bilbatteri' },
  { label: 'Stötdämpare och fjädrar', to: '/stodampare-fjadrar' },
  { label: 'Hjullagerbyte', to: '/hjullagerbyte' },
  { label: 'Avgassystem', to: '/avgassystem' },
  { label: 'Drivaxel och drivknutar', to: '/drivaxel-drivknutar' },
  { label: 'Styrning och kulleder', to: '/styrning-kulleder' },
]

export const publicNavigation: PublicNavigationItem[] = [
  { label: 'Start', to: '/' },
  { label: 'Om oss', to: '/om-oss' },
  { label: 'Biltjänster', to: '/biltjanster', children: publicServiceNavigation },
  { label: 'Felsökning', to: '/felsokning' },
  { label: 'Däck', to: '/dackservice' },
  { label: 'AC', to: '/ac-service' },
  { label: 'Bärgning', to: '/bargning' },
  { label: 'Till salu', to: '/bilar-till-salu' },
  { label: 'Kontakt', to: '/kontakt' },
]
