import type { GalleryImage, GalleryImageVariant } from '../types/gallery'
import { naturalCompare, resolveCaption, slugFromFilename, type GalleryCaption } from './galleryHelpers'
import captions from '../assets/galleri/bildtexter.json'

// Folder-driven gallery: every JPG/PNG/WebP in src/assets/galleri/ becomes a
// gallery image. vite-imagetools generates 640px and 1920px variants in WebP
// and JPG at build time (never upscaled). quality=70 matches the old hand-exported
// files visually (checked side by side) at ~230–320 KB per 1920px WebP.
// See src/assets/galleri/LÄSMIG.md.

interface ImagetoolsMeta {
  src: string
  width: number
  height: number
  format: string
}

const files = import.meta.glob('../assets/galleri/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  query: { w: '640;1920', format: 'webp;jpg', quality: '70', as: 'meta:src;width;height;format' },
  import: 'default',
}) as Record<string, ImagetoolsMeta[]>

function variant(metas: ImagetoolsMeta[], smallest: boolean): GalleryImageVariant {
  const pick = (format: string) => {
    const matches = metas.filter((meta) => meta.format === format).sort((a, b) => a.width - b.width)
    return smallest ? matches[0] : matches[matches.length - 1]
  }
  const webp = pick('webp')
  const jpg = pick('jpg') ?? pick('jpeg')
  return { webp: webp.src, jpg: jpg.src, width: jpg.width, height: jpg.height }
}

const captionMap = captions as Record<string, GalleryCaption>
const seen = new Map<string, string>()
const duplicates: string[] = []

export const folderGalleryImages: GalleryImage[] = Object.keys(files)
  .sort(naturalCompare)
  .flatMap((path) => {
    const filename = path.split('/').pop() ?? path
    const slug = slugFromFilename(filename)
    if (!slug) return []
    if (seen.has(slug)) {
      duplicates.push(`${seen.get(slug)} + ${filename}`)
      return []
    }
    seen.set(slug, filename)
    const metas = files[path]
    return [{ slug, metas }]
  })
  .map(({ slug, metas }, index) => ({
    id: index + 1,
    slug,
    ...resolveCaption(slug, captionMap),
    main: variant(metas, false),
    thumb: variant(metas, true),
  }))

if (import.meta.env.DEV) {
  const missing = folderGalleryImages.filter((image) => !captionMap[image.slug]).map((image) => image.slug)
  if (missing.length || duplicates.length) {
    console.info(
      '[galleri] ' +
        (missing.length ? `Saknar bildtext i bildtexter.json: ${missing.join(', ')}. ` : '') +
        (duplicates.length ? `Samma namn på flera filer (första används): ${duplicates.join('; ')}.` : ''),
    )
  }
}
