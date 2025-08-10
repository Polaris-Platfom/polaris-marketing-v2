import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { X, ExternalLink, MessageCircle } from 'lucide-react'
import Button from './Button'

interface SurveyModalProps {
  isOpen: boolean
  onClose: () => void
  surveyUrl: string
}

const SurveyModal: React.FC<SurveyModalProps> = ({ isOpen, onClose, surveyUrl }) => {
  const { t } = useTranslation('homepage')

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSurveyClick = () => {
    window.open(surveyUrl, '_blank')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-6 text-white">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="flex items-center mb-2">
                  <MessageCircle size={24} className="mr-2" />
                  <h2 className="text-xl font-bold">
                    {t('survey.popupTitle')}
                  </h2>
                </div>
                <p className="text-sm text-primary-100">
                  {t('survey.timeEstimate')}
                </p>
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t('survey.popupDescription')}
                </p>

                <div className="space-y-3">
                  <Button
                    onClick={handleSurveyClick}
                    className="w-full flex items-center justify-center"
                    size="lg"
                  >
                    {t('survey.popupCta')}
                    <ExternalLink size={16} className="ml-2" />
                  </Button>

                  <Button
                    onClick={onClose}
                    variant="ghost"
                    className="w-full"
                    size="lg"
                  >
                    {t('survey.popupClose')}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default SurveyModal 