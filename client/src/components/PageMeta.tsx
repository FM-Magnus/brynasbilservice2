import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { NOT_FOUND_META, PAGE_META } from '../data/pageMeta'

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
    setMeta('robots', known && !path.startsWith('/admin') ? null : 'noindex')
  }, [pathname])

  return null
}
