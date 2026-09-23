import axiosInstance from './axiosConfig'
import type { GalleryImage } from '../types/gallery'

// Single entry point for the gallery. Default source is the repo folder
// src/assets/galleri/ (lazy-loaded, so it stays out of the main bundle).
// Set VITE_GALLERY_SOURCE=api once GET /api/gallery exists (docs/BACKEND.md §7).
const source = import.meta.env.VITE_GALLERY_SOURCE === 'api' ? 'api' : 'folder'

export async function getGalleryImages(): Promise<GalleryImage[]> {
  if (source === 'api') {
    const { data } = await axiosInstance.get<{ images: GalleryImage[] }>('/api/gallery')
    return data.images
  }
  const { folderGalleryImages } = await import('../data/gallery')
  return folderGalleryImages
}
