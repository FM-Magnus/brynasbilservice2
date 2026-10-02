import { useSyncExternalStore } from 'react'
import axiosInstance from './axiosConfig'
import { BUSINESS } from '../data/business'

export type PublicActionIntent = 'book' | 'contact' | 'call' | 'email' | 'directions'
export type PublicActionKind = PublicActionIntent
type ActionMap = Record<PublicActionIntent, PublicActionKind>

const defaults: ActionMap = {
  book: 'book',
  contact: 'contact',
  call: 'call',
  email: 'email',
  directions: 'directions',
}
const kinds = new Set<PublicActionKind>(Object.values(defaults))
let current: ActionMap = defaults
let loadPromise: Promise<void> | null = null
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}

export function actionKind(intent: PublicActionIntent): PublicActionKind {
  return current[intent]
}

export function usePublicAction(intent: PublicActionIntent): PublicActionKind {
  return useSyncExternalStore(subscribe, () => current[intent], () => defaults[intent])
}

/** One request per page load; invalid/unavailable config leaves safe defaults. */
export function loadPublicActions(): Promise<void> {
  if (!loadPromise) {
    loadPromise = axiosInstance.get<{ version: number; actions: ActionMap }>('/api/public/actions', { timeout: 3000 })
      .then(({ data }) => {
        if (data.version !== 1 || !data.actions || Object.keys(data.actions).length !== 5 ||
            Object.keys(defaults).some((key) => !kinds.has(data.actions[key as PublicActionIntent]))) return
        current = data.actions
        listeners.forEach((listener) => listener())
      })
      .catch(() => { /* Native call and direct contact remain available. */ })
  }
  return loadPromise
}

export function publicActionHref(kind: Exclude<PublicActionKind, 'book'>, comment = ''): string {
  const context = comment ? `?message=${encodeURIComponent(comment)}` : ''
  switch (kind) {
    case 'call': return BUSINESS.phone.href
    case 'email': return comment ? `${BUSINESS.email.href}?body=${encodeURIComponent(comment)}` : BUSINESS.email.href
    case 'directions': return BUSINESS.address.mapsUrl
    case 'contact': return `${import.meta.env.BASE_URL}kontakt${context}#contact-form`
  }
}

export const publicActionLabel: Record<PublicActionKind, string> = {
  book: 'Boka tid',
  contact: 'Skriv meddelande',
  call: 'Ring oss',
  email: 'Mejla oss',
  directions: 'Vägbeskrivning',
}

export function requestBooking(comment = '') {
  window.dispatchEvent(new CustomEvent('bb:request-booking', { detail: { comment } }))
}
