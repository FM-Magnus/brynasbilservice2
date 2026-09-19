// Pure helpers for the folder-driven gallery. No Vite-specific syntax, so the
// Playwright spec can import them directly (tests/browser/galleri.visual.spec.ts).

export interface GalleryCaption {
  titel?: string
  beskrivning?: string
  kategori?: string
  alt?: string
}

export interface ResolvedCaption {
  title: string
  description: string
  category: string
  alt: string
}

const TRANSLITERATION: Record<string, string> = { å: 'a', ä: 'a', ö: 'o', é: 'e', ü: 'u' }

/** "010-Servicegång mot kontor.JPG" → "servicegang-mot-kontor" */
export function slugFromFilename(name: string): string {
  const base = name.replace(/^.*[\\/]/, '').replace(/\.[^.]+$/, '')
  return base
    .replace(/^\d+[-_]/, '')
    .toLowerCase()
    .replace(/[åäöéü]/g, (char) => TRANSLITERATION[char])
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Natural filename order: "2-a" before "10-b". */
export function naturalCompare(a: string, b: string): number {
  return a.localeCompare(b, 'sv', { numeric: true, sensitivity: 'base' })
}

/** Caption from bildtexter.json, or safe fallbacks built from the slug. */
export function resolveCaption(slug: string, captions: Record<string, GalleryCaption>): ResolvedCaption {
  const fallbackTitle = slug.replace(/-/g, ' ').replace(/^./, (char) => char.toUpperCase())
  const caption = captions[slug] ?? {}
  const title = caption.titel?.trim() || fallbackTitle
  return {
    title,
    description: caption.beskrivning?.trim() ?? '',
    category: caption.kategori?.trim() || 'Verkstad',
    alt: caption.alt?.trim() || `Bild från Brynäs Bilservice verkstad: ${title}`,
  }
}

export const GALLERY_EXTENSIONS = /\.(jpe?g|png|webp)$/i
