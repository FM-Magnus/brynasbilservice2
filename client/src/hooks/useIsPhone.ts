import { useEffect, useState } from 'react'

const PHONE_QUERY = '(max-width: 650px)'

/** True at the shared phone breakpoint (matches the `max-width: 650px` CSS rules). */
export function useIsPhone() {
  const [isPhone, setIsPhone] = useState(() => window.matchMedia(PHONE_QUERY).matches)

  useEffect(() => {
    const query = window.matchMedia(PHONE_QUERY)
    const update = () => setIsPhone(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return isPhone
}
