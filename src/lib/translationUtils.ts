import { languages } from '../hooks/useLanguage'

// Translation validation and management utilities
export class TranslationManager {
  private static instance: TranslationManager
  private translations: Map<string, any> = new Map()

  public static getInstance(): TranslationManager {
    if (!TranslationManager.instance) {
      TranslationManager.instance = new TranslationManager()
    }
    return TranslationManager.instance
  }

  /**
   * Load translation files for validation
   */
  public async loadTranslations(namespace: string) {
    for (const language of languages) {
      try {
        const translation = await import(`../../public/locales/${language.code}/${namespace}.json`)
        this.translations.set(`${language.code}-${namespace}`, translation.default)
      } catch (error) {
        console.warn(`Translation file not found: ${language.code}/${namespace}.json`)
      }
    }
  }

  /**
   * Validate that all languages have the same keys
   */
  public validateTranslationCompleteness(namespace: string): TranslationValidationResult {
    const results: TranslationValidationResult = {
      isValid: true,
      missingKeys: {},
      extraKeys: {},
      errors: []
    }

    const baseLanguage = languages[0] // Use first language as base
    const baseTranslation = this.translations.get(`${baseLanguage.code}-${namespace}`)
    
    if (!baseTranslation) {
      results.isValid = false
      results.errors.push(`Base translation not found for ${baseLanguage.code}/${namespace}`)
      return results
    }

    const baseKeys = this.flattenObject(baseTranslation)

    for (const language of languages.slice(1)) {
      const translation = this.translations.get(`${language.code}-${namespace}`)
      
      if (!translation) {
        results.isValid = false
        results.errors.push(`Translation not found for ${language.code}/${namespace}`)
        continue
      }

      const languageKeys = this.flattenObject(translation)
      
      // Check for missing keys
      const missingKeys = Object.keys(baseKeys).filter(key => !(key in languageKeys))
      if (missingKeys.length > 0) {
        results.missingKeys[language.code] = missingKeys
        results.isValid = false
      }

      // Check for extra keys
      const extraKeys = Object.keys(languageKeys).filter(key => !(key in baseKeys))
      if (extraKeys.length > 0) {
        results.extraKeys[language.code] = extraKeys
      }
    }

    return results
  }

  /**
   * Get missing translations for a specific language
   */
  public getMissingTranslations(targetLanguage: string, namespace: string): string[] {
    const baseLanguage = languages[0]
    const baseTranslation = this.translations.get(`${baseLanguage.code}-${namespace}`)
    const targetTranslation = this.translations.get(`${targetLanguage}-${namespace}`)

    if (!baseTranslation || !targetTranslation) {
      return []
    }

    const baseKeys = this.flattenObject(baseTranslation)
    const targetKeys = this.flattenObject(targetTranslation)

    return Object.keys(baseKeys).filter(key => !(key in targetKeys))
  }

  /**
   * Generate a translation template for a new language
   */
  public generateTranslationTemplate(namespace: string): Record<string, string> {
    const baseLanguage = languages[0]
    const baseTranslation = this.translations.get(`${baseLanguage.code}-${namespace}`)

    if (!baseTranslation) {
      return {}
    }

    const flattened = this.flattenObject(baseTranslation)
    const template: Record<string, string> = {}

    Object.keys(flattened).forEach(key => {
      template[key] = `[TRANSLATE] ${flattened[key]}`
    })

    return this.unflattenObject(template)
  }

  /**
   * Flatten nested object to dot notation
   */
  private flattenObject(obj: any, prefix = ''): Record<string, any> {
    let flattened: Record<string, any> = {}

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = prefix ? `${prefix}.${key}` : key

        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          Object.assign(flattened, this.flattenObject(obj[key], newKey))
        } else {
          flattened[newKey] = obj[key]
        }
      }
    }

    return flattened
  }

  /**
   * Unflatten dot notation back to nested object
   */
  private unflattenObject(obj: Record<string, any>): any {
    const result: any = {}

    for (const key in obj) {
      const keys = key.split('.')
      let current = result

      for (let i = 0; i < keys.length - 1; i++) {
        if (!(keys[i] in current)) {
          current[keys[i]] = {}
        }
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]] = obj[key]
    }

    return result
  }
}

// Interfaces
export interface TranslationValidationResult {
  isValid: boolean
  missingKeys: Record<string, string[]>
  extraKeys: Record<string, string[]>
  errors: string[]
}

// Helper functions for components
export const useTranslationHelper = () => {
  const manager = TranslationManager.getInstance()

  const validateNamespace = async (namespace: string) => {
    await manager.loadTranslations(namespace)
    return manager.validateTranslationCompleteness(namespace)
  }

  const generateTemplate = async (namespace: string) => {
    await manager.loadTranslations(namespace)
    return manager.generateTranslationTemplate(namespace)
  }

  return {
    validateNamespace,
    generateTemplate,
    manager
  }
}

// Translation key constants for type safety
export const TRANSLATION_NAMESPACES = {
  NAVIGATION: 'navigation',
  HOMEPAGE: 'homepage',
  UI: 'ui',
  ABOUT: 'about',
  BLOG: 'blog',
  CONTACT: 'contact',
  PROPOSALS: 'proposals',
  WALLET: 'wallet',
  AUTH: 'auth',
  DASHBOARD: 'dashboard',
  SETTINGS: 'settings',
  ERRORS: 'errors',
  COMMON: 'common', // Legacy
} as const

export type TranslationNamespace = typeof TRANSLATION_NAMESPACES[keyof typeof TRANSLATION_NAMESPACES]

// Helper to get translation with type safety
export const getTranslationKey = (namespace: TranslationNamespace, key: string): string => {
  return `${namespace}:${key}`
}

// Development helper to check translation coverage
export const checkTranslationCoverage = async () => {
  const manager = TranslationManager.getInstance()
  const namespaces = Object.keys(TRANSLATION_NAMESPACES).map(key => TRANSLATION_NAMESPACES[key as keyof typeof TRANSLATION_NAMESPACES])

  console.group('🌍 Translation Coverage Report')
  
  for (const namespace of namespaces) {
    await manager.loadTranslations(namespace)
    const validation = manager.validateTranslationCompleteness(namespace)
    
    if (validation.isValid) {
      console.log(`✅ ${namespace}: Complete`)
    } else {
      console.group(`❌ ${namespace}: Issues found`)
      
      if (validation.errors.length > 0) {
        console.error('Errors:', validation.errors)
      }
      
      if (Object.keys(validation.missingKeys).length > 0) {
        console.warn('Missing keys:', validation.missingKeys)
      }
      
      if (Object.keys(validation.extraKeys).length > 0) {
        console.info('Extra keys:', validation.extraKeys)
      }
      
      console.groupEnd()
    }
  }
  
  console.groupEnd()
} 