import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { UserPlus, Users, Vote, DollarSign, CheckCircle } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { PLATFORM_URLS } from '../../config/env'

const HowItWorksSection: React.FC = () => {
  const { t } = useTranslation('homepage')
  const { t: tCommon } = useTranslation('ui')

  const steps = [
    {
      icon: UserPlus,
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.description'),
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      icon: Users,
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.description'),
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      icon: Vote,
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.description'),
      color: 'text-accent-500',
      bgColor: 'bg-accent-50 dark:bg-accent-900/20',
    },
    {
      icon: DollarSign,
      title: t('howItWorks.step4.title'),
      description: t('howItWorks.step4.description'),
      color: 'text-primary-500',
      bgColor: 'bg-primary-50 dark:bg-primary-900/20',
    },
    {
      icon: CheckCircle,
      title: t('howItWorks.step5.title'),
      description: t('howItWorks.step5.description'),
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container-polaris">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6">
            {t('howItWorks.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('howItWorks.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full relative overflow-hidden">
                  {/* Step Number */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <Icon size={32} className={step.color} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {/* Connector Line (except for last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-600 transform -translate-y-1/2 z-10">
                      <div className="absolute right-0 top-1/2 w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                  )}
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t('howItWorks.ctaText')}
          </p>
          <a href={PLATFORM_URLS.HOME} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="lg">
              {t('hero.getStarted')}
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorksSection 