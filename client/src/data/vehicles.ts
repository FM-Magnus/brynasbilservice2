import type { Vehicle } from '../types/vehicle'
import sideWebp from '../assets/images/vehicles/peugeot-307-cc/peugeot-307-cc-side-profile.webp'
import sideThumbWebp from '../assets/images/vehicles/peugeot-307-cc/peugeot-307-cc-side-profile-thumb.webp'
import rearWebp from '../assets/images/vehicles/peugeot-307-cc/peugeot-307-cc-rear-three-quarter.webp'
import rearThumbWebp from '../assets/images/vehicles/peugeot-307-cc/peugeot-307-cc-rear-three-quarter-thumb.webp'
import wheelWebp from '../assets/images/vehicles/peugeot-307-cc/peugeot-307-cc-wheel-closeup.webp'
import wheelThumbWebp from '../assets/images/vehicles/peugeot-307-cc/peugeot-307-cc-wheel-closeup-thumb.webp'

// Static stock list, used while VITE_VEHICLES_SOURCE is 'static' (the default).
// Same shape as GET /api/vehicles — see docs/BACKEND.md §3.4.
//
// To add a car: import its photos above and add an entry below.
// To mark a car sold: set status: 'sold' and soldAt to an ISO date.
// mileageKm is in km — the page shows Swedish mil (km / 10) automatically.
// Delete this file once the backend is live (§3.7).

const main = (webp: string) => ({ webp, width: 1920, height: 1440 })
const thumb = (webp: string) => ({ webp, width: 640, height: 480 })

export const seedVehicles: Vehicle[] = [
  {
    id: 1,
    slug: 'peugeot-307-cc-2-0-2006',
    make: 'Peugeot',
    model: '307 CC 2.0',
    year: 2006,
    mileageKm: 141147,
    fuel: 'Bensin',
    gearbox: 'Manuell',
    color: 'Mörkgrå',
    priceSek: 39900,
    description:
      'Snygg och välskött cabriolet med elektriskt hopfällbart hardtop. Nybesiktigad maj 2026 och godkänd till juli 2027. ' +
      'Dragkrok. Aluminiumfälgar. Inga anmärkningar i senaste besiktning. ' +
      'Perfekt sommarbil – ring oss för att boka en provkörning.',
    status: 'available',
    soldAt: null,
    images: [
      { id: 1, alt: 'Peugeot 307 CC från sidan', main: main(sideWebp), thumb: thumb(sideThumbWebp) },
      { id: 2, alt: 'Peugeot 307 CC snett bakifrån', main: main(rearWebp), thumb: thumb(rearThumbWebp) },
      { id: 3, alt: 'Aluminiumfälg på Peugeot 307 CC', main: main(wheelWebp), thumb: thumb(wheelThumbWebp) },
    ],
    createdAt: '2026-05-01T00:00:00Z',
    updatedAt: '2026-09-19T00:00:00Z',
  },
]
