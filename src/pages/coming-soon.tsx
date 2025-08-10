import React, { useState } from 'react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Bell, 
  CheckCircle, 
  Clock, 
  Users, 
  Vote, 
  DollarSign, 
  Shield, 
  Sparkles,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react'
import Button from '../components/ui/Button'

const ComingSoonPage: React.FC = () => {
  const { t } = useTranslation('ui')
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
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
          source: 'coming-soon',
          language: router.locale || 'es' // Send current language
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubscribed(true)
        setEmail('')
        setName('')
        setMessage(t('newsletter.subscriptionSuccess'))
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

  const features = [
    {
      icon: Users,
      text: t('comingSoon.features.feature1')
    },
    {
      icon: Vote,
      text: t('comingSoon.features.feature2')
    },
    {
      icon: DollarSign,
      text: t('comingSoon.features.feature3')
    },
    {
      icon: Shield,
      text: t('comingSoon.features.feature4')
    },
    {
      icon: Sparkles,
      text: t('comingSoon.features.feature5')
    }
  ]

  const timeline = [
    {
      quarter: 'Q1 2024',
      title: t('comingSoon.timeline.q1.title'),
      description: t('comingSoon.timeline.q1.description'),
      status: 'completed'
    },
    {
      quarter: 'Q2 2024',
      title: t('comingSoon.timeline.q2.title'),
      description: t('comingSoon.timeline.q2.description'),
      status: 'in-progress'
    },
    {
      quarter: 'Q3 2024',
      title: t('comingSoon.timeline.q3.title'),
      description: t('comingSoon.timeline.q3.description'),
      status: 'upcoming'
    }
  ]

  return (
    <>
      <Head>
        <title>{t('comingSoon.title')} | Polaris Platform</title>
        <meta name="description" content={t('comingSoon.description')} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <header className="relative z-10">
          <div className="container-polaris py-6">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-accent-500 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>{t('comingSoon.backToHome')}</span>
              </Link>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <span className="text-xl font-heading font-bold text-gray-900 dark:text-white">
                  Polaris
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="container-polaris py-12">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center rounded-full mx-auto mb-8">
                <Clock size={40} className="text-white" />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                {t('comingSoon.title')}
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {t('comingSoon.subtitle')}
              </p>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t('comingSoon.description')}
              </p>
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-none shadow-lg p-8 mb-16"
            >
              <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  {t('comingSoon.notify.title')}
                </h2>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t('comingSoon.notify.description')}
                </p>

                {subscribed ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center justify-center text-green-600 dark:text-green-400"
                  >
                    <CheckCircle size={24} className="mr-2" />
                    <span className="text-lg font-semibold">
                      {t('newsletter.subscriptionSuccess')}
                    </span>
                  </motion.div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('footer.namePlaceholder')}
                        className="px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t('comingSoon.notify.placeholder')}
                          required
                          className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        <Button
                          type="submit"
                          disabled={loading}
                          className="px-6 py-3 flex items-center justify-center"
                        >
                          {loading ? (
                            <div className="animate-spin rounded-none h-5 w-5 border-b-2 border-white" />
                          ) : (
                            <>
                              <Bell size={20} className="mr-2" />
                              {t('comingSoon.notify.button')}
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                    
                    {/* Message Display */}
                    {message && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-center ${isError ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}
                      >
                        {message}
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Features Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-12">
                {t('comingSoon.features.title')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      className="bg-white dark:bg-gray-800 p-6 rounded-none shadow-md"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-none flex items-center justify-center mb-4 mx-auto">
                        <Icon size={24} className="text-white" />
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-center">
                        {feature.text}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Development Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-12">
                {t('comingSoon.timeline.title')}
              </h2>
              
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center p-6 rounded-none ${
                      item.status === 'completed' 
                        ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500'
                        : item.status === 'in-progress'
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500'
                        : 'bg-gray-50 dark:bg-gray-800 border-l-4 border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <div className="flex-1 text-left">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                          {item.quarter}
                        </span>
                        <h3 className="text-lg font-heading font-semibold text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        {item.description}
                      </p>
                    </div>
                    
                    <div className={`w-3 h-3 rounded-none ${
                      item.status === 'completed'
                        ? 'bg-green-500'
                        : item.status === 'in-progress'
                        ? 'bg-blue-500 animate-pulse'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`} />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex justify-center space-x-6"
            >
              <a 
                href="https://github.com/Polaris-Platfom" 
                className="text-gray-400 hover:text-primary-500 dark:hover:text-accent-500 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a 
                href="https://x.com/polarisnet00?s=21&t=abS0ME4OuaWs9S-JTARCXQ" 
                className="text-gray-400 hover:text-primary-500 dark:hover:text-accent-500 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary-500 dark:hover:text-accent-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'ui',
        'common'
      ])),
    },
  }
}

export default ComingSoonPage 