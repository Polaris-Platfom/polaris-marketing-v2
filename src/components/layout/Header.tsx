import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Sun, Moon, Menu, X } from 'lucide-react'
import LanguageSelector from '../ui/LanguageSelector'
import { useTheme } from '../../hooks/useTheme'

const Header: React.FC = () => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useTranslation('navigation')
  const { theme, changeTheme, getCurrentTheme, mounted } = useTheme()
  
  const currentTheme = getCurrentTheme()

  const navItems = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.blog'), href: '/blog' },
    { name: t('nav.contact'), href: '/contact' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return router.pathname === '/'
    }
    return router.pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="container-polaris">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg">
              P
            </div>
            <span className="text-xl font-heading font-bold text-primary-500 dark:text-white">
              Polaris
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-primary-500 dark:hover:text-accent-500 ${
                  isActive(item.href)
                    ? 'text-primary-500 dark:text-accent-500'
                    : 'text-gray-700 dark:text-gray-200'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Selector - Simple version always visible */}
            <LanguageSelector 
              variant="minimal" 
              showFlags={false}
              showNativeNames={false}
              className="text-gray-700 dark:text-gray-200"
            />

            {/* Theme Toggle - Always visible */}
            <div className="relative">
              <button
                onClick={() => changeTheme(currentTheme === 'dark' ? 'light' : 'dark')}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="Toggle theme"
              >
                <div className="relative w-5 h-5">
                  <Moon className={`w-5 h-5 transition-all duration-500 ${
                    mounted && currentTheme === 'dark' 
                      ? 'rotate-180 scale-0' 
                      : 'rotate-0 scale-100'
                  }`} />
                  <Sun className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
                    mounted && currentTheme === 'dark' 
                      ? 'rotate-0 scale-100' 
                      : 'rotate-180 scale-0'
                  }`} />
                </div>
              </button>
            </div>

            {/* App Access - Hidden on mobile */}
            <div className="hidden md:flex items-center">
              <a
                href="https://app.polarisplatform.ch"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 text-sm font-medium transition-colors"
              >
                {t('nav.platform', 'Platform')}
              </a>
            </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-accent-500 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-primary-500 dark:text-accent-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-accent-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <a
                  href="https://app.polarisplatform.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 text-sm font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.platform', 'Platform')}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header 