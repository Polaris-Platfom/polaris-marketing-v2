import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState, useEffect } from 'react'

// Language configuration - easily extensible
export const languages = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    rtl: false
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    rtl: false
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    rtl: false
  },
  // Ready for future languages
  // {
  //   code: 'fr',
  //   name: 'French',
  //   nativeName: 'Français',
  //   flag: '🇫🇷',
  //   rtl: false
  // },
  // {
  //   code: 'ar',
  //   name: 'Arabic',
  //   nativeName: 'العربية',
  //   flag: '🇸🇦',
  //   rtl: true
  // }
] as const

export type LanguageCode = typeof languages[number]['code']

export const useLanguage = () => {
  const router = useRouter()
  const { i18n } = useTranslation()
  const [isChanging, setIsChanging] = useState(false)

  // Get current language info
  const currentLanguage = languages.find(lang => lang.code === router.locale) || languages[0]

  // Change language with loading state and proper routing
  const changeLanguage = async (languageCode: LanguageCode) => {
    if (languageCode === router.locale || isChanging) return

    setIsChanging(true)

    try {
      // Store user preference in localStorage
      localStorage.setItem('preferred-language', languageCode)

      // Use Next.js router to change locale
      await router.push(router.asPath, router.asPath, { 
        locale: languageCode,
        scroll: false 
      })
    } catch (error) {
      console.error('Failed to change language:', error)
    } finally {
      setIsChanging(false)
    }
  }

  // Get user's preferred language on mount
  useEffect(() => {
    const preferredLanguage = localStorage.getItem('preferred-language')
    if (preferredLanguage && preferredLanguage !== router.locale) {
      const isValidLanguage = languages.some(lang => lang.code === preferredLanguage)
      if (isValidLanguage) {
        changeLanguage(preferredLanguage as LanguageCode)
      }
    }
  }, [])

  // Helper to get language by code
  const getLanguageByCode = (code: string) => {
    return languages.find(lang => lang.code === code)
  }

  return {
    currentLanguage,
    languages,
    changeLanguage,
    isChanging,
    getLanguageByCode,
    isRTL: currentLanguage?.rtl || false
  }
} 