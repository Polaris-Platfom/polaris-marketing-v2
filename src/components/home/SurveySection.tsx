import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { MessageCircle, ExternalLink, Clock } from 'lucide-react'
import Button from '../ui/Button'

interface SurveySectionProps {
  surveyUrl: string
  onSurveyClick: () => void
}

const SurveySection: React.FC<SurveySectionProps> = ({ surveyUrl, onSurveyClick }) => {
  const { t } = useTranslation('homepage')

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
                      className="text-center bg-white dark:bg-gray-800 shadow-lg p-8 border border-gray-200 dark:border-gray-700"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-6">
            <MessageCircle size={32} className="text-white" />
          </div>
          
          <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            {t('survey.title')}
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            {t('survey.description')}
          </p>
          
          <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400 mb-8">
            <Clock size={16} className="mr-1" />
            {t('survey.timeEstimate')}
          </div>
          
          <Button
            onClick={onSurveyClick}
            size="lg"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold"
          >
            {t('survey.buttonText')}
            <ExternalLink size={20} className="ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default SurveySection 