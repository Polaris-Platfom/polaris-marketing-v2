import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, User, Mail, Phone, FileText, MessageSquare, Shield } from 'lucide-react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Button from './Button'
import Card from './Card'

interface JobPosition {
  id: string
  title: string
  description: string
  requirements: string
  benefits: string
  responsibilities: string
}

interface JobApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  position: JobPosition | null
}

interface FormData {
  name: string
  email: string
  phone: string
  resume: string
  coverLetter: string
  privacyConsent: boolean
}

interface FormErrors {
  name?: string
  email?: string
  resume?: string
  coverLetter?: string
  privacyConsent?: string
}

const JobApplicationModal: React.FC<JobApplicationModalProps> = ({ isOpen, onClose, position }) => {
  const { t } = useTranslation(['ui', 'common'])
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    resume: '',
    coverLetter: '',
    privacyConsent: false
  })
  
  const [errors, setErrors] = useState<FormErrors>({})

  // Reset form when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        resume: '',
        coverLetter: '',
        privacyConsent: false
      })
      setErrors({})
      setSuccess(false)
      setError(null)
    }
  }, [isOpen])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = t('jobApplication.validation.nameRequired')
    }

    if (!formData.email.trim()) {
      newErrors.email = t('jobApplication.validation.emailRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('jobApplication.validation.emailInvalid')
    }

    if (!formData.resume.trim()) {
      newErrors.resume = t('jobApplication.validation.resumeRequired')
    }

    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = t('jobApplication.validation.coverLetterRequired')
    } else if (formData.coverLetter.length < 50) {
      newErrors.coverLetter = t('jobApplication.validation.coverLetterTooShort')
    }

    if (!formData.privacyConsent) {
      newErrors.privacyConsent = t('jobApplication.validation.privacyConsentRequired')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm() || !position) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/job-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          position: position.title,
          language: router.locale || 'es'
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          onClose()
        }, 3000)
      } else {
        setError(data.message || t('jobApplication.error'))
      }
    } catch (err) {
      setError(t('jobApplication.error'))
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  if (!position) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          />

          {/* Modal */}
          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <Card className="relative p-0">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-heading font-bold">{position.title}</h2>
                      <p className="opacity-90 mt-1">{t('jobApplication.title')}</p>
                    </div>
                    <button
                      onClick={onClose}
                      className="text-white hover:text-gray-200 transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {success ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-8"
                    >
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-2">
                        {t('jobApplication.success')}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {t('jobApplication.applicationProcess')}
                      </p>
                    </motion.div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Left Column - Job Details */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-heading font-semibold text-gray-900 dark:text-white mb-3">
                            {t('jobApplication.aboutPosition')}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            {position.description}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            {t('jobApplication.requirements')}
                          </h4>
                          <div className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">
                            {position.requirements}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            {t('jobApplication.benefits')}
                          </h4>
                          <div className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">
                            {position.benefits}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            {t('jobApplication.responsibilities')}
                          </h4>
                          <div className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">
                            {position.responsibilities}
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Application Form */}
                      <div>
                        <h3 className="text-lg font-heading font-semibold text-gray-900 dark:text-white mb-6">
                          {t('jobApplication.howToApply')}
                        </h3>

                        {error && (
                          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 flex items-center">
                            <AlertCircle className="w-5 h-5 mr-2" />
                            {error}
                          </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                          {/* Personal Information */}
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                              {t('jobApplication.personalInfo')}
                            </h4>
                            
                            <div className="space-y-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  {t('jobApplication.name')} *
                                </label>
                                <div className="relative">
                                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                  <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder={t('jobApplication.namePlaceholder')}
                                                      className={`w-full pl-10 pr-3 py-2 border focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                                  />
                                </div>
                                {errors.name && (
                                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                )}
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  {t('jobApplication.email')} *
                                </label>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                  <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    placeholder={t('jobApplication.emailPlaceholder')}
                                                      className={`w-full pl-10 pr-3 py-2 border focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                                  />
                                </div>
                                {errors.email && (
                                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                )}
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  {t('jobApplication.phone')}
                                </label>
                                <div className="relative">
                                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                  <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    placeholder={t('jobApplication.phonePlaceholder')}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Application Information */}
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                              {t('jobApplication.applicationInfo')}
                            </h4>
                            
                            <div className="space-y-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  {t('jobApplication.resume')} *
                                </label>
                                <div className="relative">
                                  <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                  <textarea
                                    value={formData.resume}
                                    onChange={(e) => handleInputChange('resume', e.target.value)}
                                    placeholder={t('jobApplication.resumePlaceholder')}
                                    rows={3}
                                    className={`w-full pl-10 pr-3 py-2 border focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent ${
                                      errors.resume ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                  />
                                </div>
                                {errors.resume && (
                                  <p className="mt-1 text-sm text-red-600">{errors.resume}</p>
                                )}
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  {t('jobApplication.coverLetter')} *
                                </label>
                                <div className="relative">
                                  <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                  <textarea
                                    value={formData.coverLetter}
                                    onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                                    placeholder={t('jobApplication.coverLetterPlaceholder')}
                                    rows={6}
                                    className={`w-full pl-10 pr-3 py-2 border focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent ${
                                      errors.coverLetter ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                  />
                                </div>
                                {errors.coverLetter && (
                                  <p className="mt-1 text-sm text-red-600">{errors.coverLetter}</p>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Privacy Consent */}
                          <div className="border-t pt-4">
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  type="checkbox"
                                  checked={formData.privacyConsent}
                                  onChange={(e) => handleInputChange('privacyConsent', e.target.checked)}
                                  className="w-4 h-4 text-accent-600 border-gray-300 focus:ring-accent-500"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label className="text-gray-700 dark:text-gray-300">
                                  <Shield className="inline w-4 h-4 mr-1" />
                                  {t('jobApplication.privacyConsent')}
                                </label>
                                {errors.privacyConsent && (
                                  <p className="mt-1 text-red-600">{errors.privacyConsent}</p>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Submit Button */}
                          <div className="flex justify-end pt-4">
                            <Button
                              type="submit"
                              disabled={loading}
                              className="bg-accent-600 hover:bg-accent-700 text-white"
                            >
                              {loading ? t('jobApplication.submitting') : t('jobApplication.submitApplication')}
                            </Button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default JobApplicationModal 