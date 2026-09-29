import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { NOT_FOUND_META, PAGE_META } from '../data/pageMeta'
import { BUSINESS_JSON_LD, toJsonLd } from '../data/structuredData'

function setMeta(name: string, content: string | null) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (content === null) {
    tag?.remove()
    return
  }
  if (!tag) {
    tag = document.createElement('meta')
    tag.name = name
    document.head.appendChild(tag)
  }
  tag.content = content
}

/** The workshop's AutoRepair data sits in <head> on every indexable page. */
function setBusinessJsonLd(show: boolean) {
  let tag = document.getElementById('ld-business')
  if (!show) {
    tag?.remove()
    return
  }
  if (!tag) {
    tag = document.createElement('script')
    tag.id = 'ld-business'
    tag.setAttribute('type', 'application/ld+json')
    tag.textContent = toJsonLd(BUSINESS_JSON_LD)
    document.head.appendChild(tag)
  }
}

/** Sets <title> and the meta description for the current route from data/pageMeta.ts. */
export function PageMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
    const known = PAGE_META[path] ?? (path.startsWith('/admin') ? PAGE_META['/admin'] : undefined)
    const meta = known ?? NOT_FOUND_META

    document.title = meta.title
    setMeta('description', meta.description ?? null)
    // The 404 page and admin stay out of search results.
    const indexable = !!known && !path.startsWith('/admin')
    setMeta('robots', indexable ? null : 'noindex')
    setBusinessJsonLd(indexable)
  }, [pathname])

  return null
}
