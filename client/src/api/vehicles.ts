import axiosInstance from './axiosConfig'
import type { Vehicle } from '../types/vehicle'

// Single entry point for the public vehicle list. Set VITE_VEHICLES_SOURCE=api
// once GET /api/vehicles is live (docs/BACKEND_HANDOFF.md §3.7); until then the
// bundled seed is used. The seed is imported lazily so an api-mode build does
// not ship its photos.
const source = import.meta.env.VITE_VEHICLES_SOURCE === 'api' ? 'api' : 'static'

export async function getPublicVehicles(): Promise<Vehicle[]> {
  if (source === 'api') {
    const { data } = await axiosInstance.get<{ vehicles: Vehicle[] }>('/api/vehicles')
    return data.vehicles
  }
  const { seedVehicles } = await import('../data/vehicles')
  return seedVehicles.filter((vehicle) => vehicle.status !== 'draft')
}
