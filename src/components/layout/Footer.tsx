import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Github, Twitter, Linkedin, Mail, CheckCircle } from 'lucide-react'

const Footer: React.FC = () => {
  const { t } = useTranslation('ui')
  const router = useRouter()
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setMessage('')
    setIsError(false)
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: name.trim() || undefined, // Send name if provided, otherwise undefined
          source: 'footer',
          language: router.locale || 'es' // Send current language
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubscribed(true)
        setEmail('')
        setName('')
        setMessage(t('newsletter.subscriptionSuccess'))
        setTimeout(() => {
          setSubscribed(false)
          setMessage('')
        }, 5000) // Reset after 5 seconds
      } else {
        // Handle different error types
        if (result.code === 'ALREADY_SUBSCRIBED') {
          setMessage(t('newsletter.alreadySubscribed'))
          setIsError(true)
        } else {
          setMessage(result.message || t('newsletter.subscriptionError'))
          setIsError(true)
        }
        
        // Clear error message after 5 seconds
        setTimeout(() => {
          setMessage('')
          setIsError(false)
        }, 5000)
      }
    } catch (error) {
      const errorMessage = t('newsletter.subscriptionError')
      setMessage(errorMessage)
      setIsError(true)
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setMessage('')
        setIsError(false)
      }, 5000)
    } finally {
      setLoading(false)
    }
  }

  const footerLinks = [
    { href: '/about', label: t('footer.about') },
    { href: '/about#team', label: t('footer.team') },
    { href: '/privacy', label: t('footer.privacyPolicy') },
    { href: '/terms', label: t('footer.termsOfService') },
    { href: '/contact', label: t('footer.contact') },
  ]

  const socialLinks = [
    { href: 'https://github.com/Polaris-Platfom', icon: Github, label: 'GitHub' },
    { href: 'https://x.com/polarisnet00?s=21&t=abS0ME4OuaWs9S-JTARCXQ', icon: Twitter, label: 'Twitter' },
    { href: '#', icon: Linkedin, label: 'LinkedIn' },
    { href: 'mailto:hello@polarisplatform.ch', icon: Mail, label: 'Email' },
  ]

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container-polaris">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-heading font-bold text-gray-900 dark:text-white">
                Polaris
              </span>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              {t('footer.description')}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-gray-400 hover:text-primary-500 dark:hover:text-accent-500 transition-colors"
                    aria-label={social.label}
                    target={social.href.startsWith('mailto:') ? '_self' : '_blank'}
                    rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  >
                    <Icon size={20} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-accent-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">
              {t('footer.newsletter')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {t('footer.newsletterDescription')}
            </p>
            
            {subscribed ? (
              <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                <CheckCircle size={16} className="mr-2" />
                <span>
                  {t('newsletter.subscriptionSuccess')}
                </span>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col space-y-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('footer.namePlaceholder')}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('footer.emailPlaceholder')}
                    required
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button 
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors rounded disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1" />
                        {t('footer.subscribing')}
                      </div>
                    ) : (
                      t('footer.subscribe')
                    )}
                  </button>
                </form>
                
                {/* Message Display */}
                {message && (
                  <div className={`text-sm ${isError ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                    {message}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {currentYear} Polaris Platform. {t('footer.copyright')}
            </p>
            
            <div className="flex space-x-6">
              <Link 
                href="/privacy" 
                className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-accent-500 text-sm transition-colors"
              >
                {t('footer.privacyPolicy')}
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-accent-500 text-sm transition-colors"
              >
                {t('footer.termsOfService')}
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-accent-500 text-sm transition-colors"
              >
                {t('footer.contact')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 