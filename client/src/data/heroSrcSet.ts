/** srcset for the single-photo heroes (guides, Felsökning, Reparationer, Bilservice).
    The 3000 px export is 140–220 KB; a phone only needs about 830 px of it. The file
    itself stays the `src` and the widest candidate; two resized WebP copies are made
    at build time. Phone-crop heroes (`*-phone.webp`) are picked in JS and left out. */
const originals = import.meta.glob(['../assets/images/services/**/*hero*.webp', '!../assets/images/services/**/*phone*'], {
  eager: true,
  import: 'default',
}) as Record<string, string>

const resized = import.meta.glob(['../assets/images/services/**/*hero*.webp', '!../assets/images/services/**/*phone*'], {
  eager: true,
  import: 'default',
  query: { w: '828;1400', format: 'webp', as: 'srcset' },
}) as Record<string, string>

const metadata = import.meta.glob(['../assets/images/services/**/*hero*.webp', '!../assets/images/services/**/*phone*'], {
  eager: true,
  import: 'default',
  query: { as: 'metadata' },
}) as Record<string, { width: number }>

const srcSetByUrl = new Map<string, string>()
for (const path of Object.keys(originals)) {
  const width = metadata[path]?.width
  // A photo that is not wider than the largest copy needs no extra candidate.
  srcSetByUrl.set(originals[path], width && width > 1400 ? `${resized[path]}, ${originals[path]} ${width}w` : resized[path])
}

/** The srcset for a hero imported as a plain URL, or undefined when none was generated. */
export function heroSrcSet(webp: string): string | undefined {
  return srcSetByUrl.get(webp)
}
