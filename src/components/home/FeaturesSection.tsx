import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { ArrowRight, Users, Vote, DollarSign, BarChart3, Zap, Shield, Layers, Target, Code, Globe, Award } from 'lucide-react'
import { PLATFORM_URLS } from '../../config/env'
import Card from '../ui/Card'

const FeaturesSection: React.FC = () => {
  const { t } = useTranslation('homepage')

  const features = [
    {
      icon: Users,
      title: t('features.multiCommunity.title'),
      description: t('features.multiCommunity.description'),
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      icon: Vote,
      title: t('features.democraticVoting.title'),
      description: t('features.democraticVoting.description'),
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      icon: DollarSign,
      title: t('features.secureFund.title'),
      description: t('features.secureFund.description'),
      color: 'text-accent-500',
      bgColor: 'bg-accent-50 dark:bg-accent-900/20',
    },
    {
      icon: BarChart3,
      title: t('features.realTimeAnalytics.title'),
      description: t('features.realTimeAnalytics.description'),
      color: 'text-primary-600 dark:text-primary-300',
      bgColor: 'bg-primary-50 dark:bg-primary-900/20',
    },
    {
      icon: Shield,
      title: t('features.enterpriseSecurity.title'),
      description: t('features.enterpriseSecurity.description'),
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      icon: Globe,
      title: t('features.globalAccessibility.title'),
      description: t('features.globalAccessibility.description'),
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
    {
      icon: Zap,
      title: t('features.automatedWorkflows.title'),
      description: t('features.automatedWorkflows.description'),
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    {
      icon: Layers,
      title: t('features.roleBasedPermissions.title'),
      description: t('features.roleBasedPermissions.description'),
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
    },
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container-polaris">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6">
            {t('featuresMain.title')}
            <span className="block text-primary-500 dark:text-accent-500 mt-2">
              {t('featuresMain.subtitle')}
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('featuresMain.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow duration-300">
                  {/* Icon */}
                                      <div className={`w-16 h-16 ${feature.bgColor} flex items-center justify-center mx-auto mb-6`}>
                    <Icon size={32} className={feature.color} />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-heading font-semibold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white dark:bg-gray-900 p-8 shadow-lg border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              {t('featuresCtaSection.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t('featuresCtaSection.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={PLATFORM_URLS.HOME} target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  {t('featuresCtaSection.startTrial')}
                </motion.button>
              </a>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary"
                >
                  {t('featuresCtaSection.scheduleDemo')}
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturesSection 