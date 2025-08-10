# 🌍 Polaris Translation System Guide

## Overview

Polaris uses a professional, scalable translation system built on **next-i18next** with organized namespaces, type safety, and automated validation tools.

## 📁 File Organization

### Translation Files Structure
```
public/locales/
├── en/                     # English translations
│   ├── navigation.json     # Header, footer, navigation
│   ├── homepage.json       # Hero, features, how it works
│   ├── ui.json            # Common UI elements, forms, buttons
│   ├── about.json         # About page content
│   ├── blog.json          # Blog and news
│   ├── contact.json       # Contact forms and information
│   ├── proposals.json     # Proposals and voting
│   ├── wallet.json        # Wallet and transactions
│   ├── auth.json          # Authentication and registration
│   ├── dashboard.json     # User dashboard
│   ├── settings.json      # User settings and preferences
│   ├── errors.json        # Error messages and states
│   └── common.json        # Legacy (being deprecated)
├── es/                    # Spanish translations
│   └── [same structure]
└── [future languages]/    # Ready for expansion
```

## 🚀 Quick Start

### 1. Using Translations in Components

```tsx
import { useTranslation } from 'next-i18next'

const MyComponent = () => {
  // Use specific namespace
  const { t } = useTranslation('homepage')
  
  // Multiple namespaces
  const { t: tNav } = useTranslation('navigation')
  const { t: tUI } = useTranslation('ui')

  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <button>{tUI('common.save')}</button>
      <nav>{tNav('nav.home')}</nav>
    </div>
  )
}
```

### 2. Language Selector Component

```tsx
import LanguageSelector from '../ui/LanguageSelector'

// Basic usage
<LanguageSelector />

// Customized
<LanguageSelector 
  variant="compact" 
  showFlags={true}
  showNativeNames={false}
  className="custom-class"
/>
```

### 3. Language Management Hook

```tsx
import { useLanguage } from '../hooks/useLanguage'

const MyComponent = () => {
  const { 
    currentLanguage, 
    languages, 
    changeLanguage, 
    isChanging 
  } = useLanguage()

  return (
    <select onChange={(e) => changeLanguage(e.target.value)}>
      {languages.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.flag} {lang.nativeName}
        </option>
      ))}
    </select>
  )
}
```

## 🎯 Available Namespaces

| Namespace | Purpose | Example Keys |
|-----------|---------|--------------|
| `navigation` | Header, footer, menus | `nav.home`, `footer.about` |
| `homepage` | Landing page content | `hero.title`, `features.title` |
| `ui` | Common UI elements | `common.save`, `forms.email` |
| `about` | About page | `mission`, `team` |
| `blog` | Blog and news | `title`, `readMore` |
| `contact` | Contact forms | `getInTouch`, `sendMessage` |
| `proposals` | Community proposals | `createProposal`, `vote` |
| `wallet` | Wallet management | `balance`, `transactions` |
| `auth` | Authentication | `login`, `register` |
| `dashboard` | User dashboard | `overview`, `stats` |
| `settings` | User preferences | `profile`, `notifications` |
| `errors` | Error messages | `notFound`, `serverError` |

## 🔧 Development Tools

### Translation Validation

```tsx
import { checkTranslationCoverage } from '../lib/translationUtils'

// Check all translations in development
checkTranslationCoverage()
```

### Translation Manager

```tsx
import { TranslationManager } from '../lib/translationUtils'

const manager = TranslationManager.getInstance()

// Validate specific namespace
const validation = await manager.validateTranslationCompleteness('homepage')

// Generate template for new language
const template = manager.generateTranslationTemplate('homepage')
```

## 🌐 Adding New Languages

### 1. Update Language Configuration

```tsx
// src/hooks/useLanguage.ts
export const languages = [
  // ... existing languages
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    rtl: false
  }
]
```

### 2. Update Next.js Configuration

```js
// next-i18next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'es', 'fr'], // Add new locale
    defaultLocale: 'en',
  }
}
```

### 3. Create Translation Files

Create all namespace files for the new language in `public/locales/fr/`

### 4. Use Translation Manager to Generate Templates

```tsx
const template = await manager.generateTranslationTemplate('homepage')
// Copy template and translate values
```

## 📝 Translation Best Practices

### 1. Namespace Organization
- **navigation**: Header, footer, menus
- **homepage**: Landing page specific content
- **ui**: Reusable UI elements across the app
- **[feature]**: Feature-specific content (e.g., `proposals`, `wallet`)

### 2. Key Naming Convention
```json
{
  "section": {
    "subsection": {
      "element": "Translation text"
    }
  }
}
```

### 3. Interpolation Support
```json
{
  "welcome": "Welcome, {{name}}!",
  "itemCount": "You have {{count}} items"
}
```

```tsx
// Usage
t('welcome', { name: 'John' })
t('itemCount', { count: 5 })
```

### 4. Pluralization
```json
{
  "item_zero": "No items",
  "item_one": "One item", 
  "item_other": "{{count}} items"
}
```

## 🛠️ Maintenance

### Regular Tasks

1. **Validate translations**: Run `checkTranslationCoverage()` regularly
2. **Update missing translations**: Use validation results to find gaps
3. **Clean up unused keys**: Remove deprecated translation keys
4. **Review translations**: Ensure quality and consistency

### Adding New Features

1. Add translations to appropriate namespace files
2. Update all language versions
3. Run validation to ensure completeness
4. Test language switching works correctly

## 🎨 Customization

### Language Selector Variants

- **default**: Full language names with flags
- **compact**: Language codes with flags
- **minimal**: Globe icon only

### Custom Styling

```tsx
<LanguageSelector 
  className="custom-selector"
  // Add custom CSS classes
/>
```

## 🔍 Troubleshooting

### Common Issues

1. **Translation not found**: Check namespace and key path
2. **Language not switching**: Verify locale configuration
3. **Missing translations**: Use validation tools to identify gaps

### Debug Mode

Enable debug mode in development:

```js
// next-i18next.config.js
debug: process.env.NODE_ENV === 'development',
```

## 📊 Performance Considerations

- Translations are loaded on-demand by namespace
- Language preferences are stored in localStorage
- SSR-friendly with proper hydration
- Optimized bundle splitting per language

## 🚀 Future Enhancements

Ready for:
- Right-to-left (RTL) language support
- Automated translation services integration
- Advanced pluralization rules
- Dynamic translation loading
- Translation management UI

---

**Need help?** Check the validation tools or contact the development team. 