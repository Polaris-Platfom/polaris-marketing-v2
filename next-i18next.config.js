module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'de'],
    // Ready for future locales
    // locales: ['en', 'es', 'fr', 'de', 'ar'],
  },
  // Namespace configuration for organized translations
  ns: [
    'common', // Legacy support - will be deprecated
    'navigation', // Header, footer, navigation elements
    'homepage', // Hero, features, how it works
    'ui', // Common UI elements, forms, buttons
    'about', // About page
    'blog', // Blog and news
    'contact', // Contact forms and info
    'proposals', // Proposals and voting
    'wallet', // Wallet and transactions
    'auth', // Authentication and registration
    'dashboard', // User dashboard
    'settings', // User settings and preferences
    'errors', // Error messages and states
  ],
  defaultNS: 'ui', // Default namespace for most common elements
  fallbackNS: ['ui', 'common'], // Fallback namespaces
  // Interpolation settings
  interpolation: {
    escapeValue: false, // React already escapes values
    formatSeparator: ','
  },
  // Development settings
  debug: process.env.NODE_ENV === 'development',
  saveMissing: process.env.NODE_ENV === 'development',
  // Optimization
  reloadOnPrerender: process.env.NODE_ENV === 'development',
} 