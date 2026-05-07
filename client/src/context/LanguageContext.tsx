import React, { createContext, useState } from 'react'
import { sv as svTranslations } from '../translations/sv'
import { en as enTranslations } from '../translations/en'

export type Language = 'sv' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export { LanguageContext }

const translations = {
  sv: svTranslations,
  en: enTranslations
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // Check for saved language preference or use default
    const savedLanguage = localStorage.getItem('language') as Language
    return savedLanguage || 'sv'
  })

  const setLanguageHandler = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: unknown = translations[language]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k]
      } else {
        return key
      }
    }
    
    return typeof value === 'string' ? value : key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: setLanguageHandler, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
