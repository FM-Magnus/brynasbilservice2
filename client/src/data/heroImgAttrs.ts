/** Spread onto the first hero photo: it is the LCP element, so it is fetched first.
    (Lower-case attribute name: React 18 does not know `fetchPriority`.) */
export const heroImgAttrs = { fetchpriority: 'high' } as const
