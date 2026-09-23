// Vehicle listing contract — mirrors docs/BACKEND.md §3.4 exactly.
// The static seed (data/vehicles.ts) and GET /api/vehicles both return this
// shape, so the page never knows which source it is reading from.

export type VehicleStatus = 'draft' | 'available' | 'sold'

export interface VehicleImageVariant {
  webp: string
  jpg: string
  width: number
  height: number
}

export interface VehicleImage {
  id: number
  alt: string
  main: VehicleImageVariant
  thumb: VehicleImageVariant
}

export interface Vehicle {
  id: number
  slug: string
  make: string
  model: string
  year: number
  mileageKm: number
  fuel: string
  gearbox: string
  color: string
  priceSek: number
  description: string
  status: VehicleStatus
  soldAt: string | null
  images: VehicleImage[] // sorted by position; first is the main image
  createdAt: string
  updatedAt: string
}
