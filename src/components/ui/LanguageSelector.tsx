import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { useLanguage, type LanguageCode } from '../../hooks/useLanguage'

interface LanguageSelectorProps {
  variant?: 'default' | 'compact' | 'minimal'
  showFlags?: boolean
  showNativeNames?: boolean
  className?: string
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'default',
  showFlags = true,
  showNativeNames = true,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { currentLanguage, languages, changeLanguage, isChanging } = useLanguage()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = async (languageCode: LanguageCode) => {
    await changeLanguage(languageCode)
    setIsOpen(false)
  }

  // Variant styles
  const getButtonStyles = () => {
    const baseStyles = 'flex items-center space-x-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
    
    switch (variant) {
      case 'compact':
        return `${baseStyles} px-2 py-1 text-sm rounded-none hover:bg-gray-100 dark:hover:bg-gray-700`
      case 'minimal':
        return `${baseStyles} px-2 py-1 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 active:scale-95 border border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-800`
      default:
        return `${baseStyles} px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-none hover:border-primary-500 dark:hover:border-primary-400 shadow-sm`
    }
  }

  const renderCurrentLanguage = () => {
    switch (variant) {
      case 'minimal':
        return (
          <>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {currentLanguage.code.toUpperCase()}
            </span>
            <ChevronDown 
              className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
            />
          </>
        )
      case 'compact':
        return (
          <>
            {showFlags && <span className="text-lg">{currentLanguage.flag}</span>}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {currentLanguage.code.toUpperCase()}
            </span>
            <ChevronDown 
              className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
            />
          </>
        )
      default:
        return (
          <>
            {showFlags && <span className="text-lg">{currentLanguage.flag}</span>}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {currentLanguage.name}
              </span>
              {showNativeNames && currentLanguage.nativeName !== currentLanguage.name && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {currentLanguage.nativeName}
                </span>
              )}
            </div>
            <ChevronDown 
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
            />
          </>
        )
    }
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isChanging}
        className={getButtonStyles()}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        {isChanging ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-none animate-spin" />
            <span className="text-sm">Changing...</span>
          </div>
        ) : (
          renderCurrentLanguage()
        )}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg ${
              variant === 'minimal' ? 'right-0 min-w-[120px]' : 'left-0 min-w-[200px]'
            }`}
          >
            <div className="py-2">
              {languages.map((language) => {
                const isSelected = language.code === currentLanguage.code
                
                return (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    disabled={isChanging}
                    className={`w-full flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ${
                      variant === 'minimal' ? 'px-3 py-2' : 'px-4 py-3'
                    } ${isSelected ? 'bg-primary-50 dark:bg-primary-900/20' : ''}`}
                  >
                    <div className="flex items-center space-x-3">
                      {showFlags && variant !== 'minimal' && (
                        <span className="text-lg">{language.flag}</span>
                      )}
                      <div className="flex flex-col">
                        <span className={`text-sm font-medium ${
                          isSelected 
                            ? 'text-primary-600 dark:text-primary-400' 
                            : 'text-gray-700 dark:text-gray-200'
                        }`}>
                          {variant === 'minimal' ? language.code.toUpperCase() : language.name}
                        </span>
                        {showNativeNames && language.nativeName !== language.name && variant !== 'minimal' && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {language.nativeName}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {isSelected && (
                      <Check className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    )}
                  </button>
                )
              })}
            </div>
            
            {/* Footer with language count */}
            {variant !== 'minimal' && (
            <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                {languages.length} languages available
              </p>
            </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LanguageSelector 