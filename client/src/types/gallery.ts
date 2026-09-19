// Gallery image contract — mirrors docs/BACKEND_HANDOFF.md §7. The folder source
// (data/gallery.ts) and GET /api/gallery both return this shape.

export interface GalleryImageVariant {
  webp: string
  jpg: string
  width: number
  height: number
}

export interface GalleryImage {
  id: number // stable within a build: index in sorted order
  slug: string // from the filename; used in the URL as ?bild={slug}
  title: string
  description: string
  category: string
  alt: string
  main: GalleryImageVariant // ≤1920px wide
  thumb: GalleryImageVariant // ≤640px wide, same aspect ratio
}
