import React, { useState } from 'react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import toast from 'react-hot-toast'

const ContactPage: React.FC = () => {
  const { t } = useTranslation(['common', 'contact'])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitted(true)
        toast.success(result.message)
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: ''
        })
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error('Error sending message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>{t('contact:pageTitle')}</title>
        <meta name="description" content={t('contact:pageDescription')} />
      </Head>

      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container-polaris">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6">
              {t('nav.contact')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('contact:contactDescription')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container-polaris">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-8">
                {t('contact:getInTouch')}
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <Mail className="text-primary-500 dark:text-accent-400 mr-4" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{t('contact:email')}</h3>
                    <a 
                      href="mailto:hello@polarisplatform.ch"
                      className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-accent-500 transition-colors"
                    >
                      hello@polarisplatform.ch
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="text-primary-500 dark:text-accent-400 mr-4" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{t('contact:phone')}</h3>
                    <p className="text-gray-600 dark:text-gray-300">+41 79 104 88 85</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="text-primary-500 dark:text-accent-400 mr-4" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{t('contact:address')}</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Schaufelacker 3<br />
                      3033 Wohlen bei Bern<br />
                      Switzerland
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card>
                <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-6">
                  {t('contact:sendMessage')}
                </h3>
                
                {submitted ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {t('contact:form.success.title')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t('contact:form.success.description')}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t('contact:form.name')}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t('contact:form.email')}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={t('contact:form.phone')}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder={t('contact:form.company')}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      placeholder={t('contact:form.message')}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                    ></textarea>
                    
                    <Button 
                      type="submit" 
                      variant="primary" 
                      className="w-full" 
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="animate-spin h-5 w-5 border-b-2 border-white mr-2" />
                      ) : (
                        <Send size={16} className="mr-2" />
                      )}
                      {loading ? t('contact:form.sending') : t('contact:form.sendButton')}
                    </Button>
                  </form>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'navigation',
        'ui',
        'common',
        'contact'
      ])),
    },
  }
}

export default ContactPage 