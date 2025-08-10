import React from 'react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Lock, 
  Eye, 
  Users, 
  Heart, 
  Zap, 
  CheckCircle,
  Globe,
  Mail,
  Star
} from 'lucide-react'

const PrivacyPolicyPage: React.FC = () => {
  const { t } = useTranslation(['common', 'ui'])

  const privacyPrinciples = [
    {
      icon: Eye,
      title: t('common:privacy.principles.transparency.title'),
      description: t('common:privacy.principles.transparency.description')
    },
    {
      icon: Shield,
      title: t('common:privacy.principles.security.title'),
      description: t('common:privacy.principles.security.description')
    },
    {
      icon: Heart,
      title: t('common:privacy.principles.control.title'),
      description: t('common:privacy.principles.control.description')
    },
    {
      icon: Users,
      title: t('common:privacy.principles.community.title'),
      description: t('common:privacy.principles.community.description')
    }
  ]

  const dataCollection = [
    {
      icon: Users,
      title: t('common:privacy.basics.personal.title'),
      description: t('common:privacy.basics.personal.description')
    },
    {
      icon: Zap,
      title: t('common:privacy.basics.activity.title'),
      description: t('common:privacy.basics.activity.description')
    },
    {
      icon: Globe,
      title: t('common:privacy.basics.technical.title'),
      description: t('common:privacy.basics.technical.description')
    }
  ]

  const dataUsage = [
    {
      icon: CheckCircle,
      title: t('common:privacy.usage.platform.title'),
      description: t('common:privacy.usage.platform.description')
    },
    {
      icon: Mail,
      title: t('common:privacy.usage.communication.title'),
      description: t('common:privacy.usage.communication.description')
    },
    {
      icon: Star,
      title: t('common:privacy.usage.improvement.title'),
      description: t('common:privacy.usage.improvement.description')
    }
  ]

  const protectionFeatures = [
    {
      icon: Lock,
      title: t('common:privacy.protection.blockchain.title'),
      description: t('common:privacy.protection.blockchain.description')
    },
    {
      icon: Shield,
      title: t('common:privacy.protection.encryption.title'),
      description: t('common:privacy.protection.encryption.description')
    },
    {
      icon: Globe,
      title: t('common:privacy.protection.compliance.title'),
      description: t('common:privacy.protection.compliance.description')
    }
  ]

  const userRights = [
    t('common:privacy.rights.access'),
    t('common:privacy.rights.correct'),
    t('common:privacy.rights.delete'),
    t('common:privacy.rights.export'),
    t('common:privacy.rights.object'),
    t('common:privacy.rights.withdraw')
  ]

  return (
    <>
      <Head>
        <title>{t('common:privacy.title')} - Polaris Platform</title>
        <meta name="description" content={t('common:privacy.subtitle')} />
        <meta name="robots" content="index, follow" />
      </Head>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container-polaris">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-lg">
                <Shield size={40} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-6">
              {t('common:privacy.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t('common:privacy.subtitle')}
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-8">
              <p>🇨🇭 {t('common:terms.jurisdiction')} | {t('common:privacy.lastUpdated')}: {new Date().toLocaleDateString()}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container-polaris">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white p-8 mb-12">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                ✨ {t('common:privacy.welcomeTitle')}
              </h2>
              <p className="text-lg opacity-90">
                {t('common:privacy.welcomeText')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Principles */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container-polaris">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              {t('common:privacy.principles.title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {privacyPrinciples.map((principle, index) => {
              const Icon = principle.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-900 p-6 text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-accent-500" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {principle.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Data Collection */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container-polaris">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4 text-center">
              📊 {t('common:privacy.basics.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 text-center">
              {t('common:privacy.basics.description')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {dataCollection.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-700 p-6 text-center"
                  >
                    <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {item.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Data Usage */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container-polaris">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4 text-center">
              🎯 {t('common:privacy.usage.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 text-center">
              {t('common:privacy.usage.description')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {dataUsage.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-gray-900 p-6 text-center hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {item.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Protection Features */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container-polaris">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4 text-center">
              🛡️ {t('common:privacy.protection.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 text-center">
              {t('common:privacy.protection.description')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {protectionFeatures.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 text-center border-2 border-green-200 dark:border-green-800"
                  >
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {feature.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* User Rights */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-accent-500 text-white">
        <div className="container-polaris">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              ⚖️ {t('common:privacy.rights.title')}
            </h2>
            <p className="text-lg opacity-90 mb-8">
              {t('common:privacy.rights.description')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userRights.map((right, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-sm p-4 text-center border border-white/20"
                >
                  <CheckCircle size={20} className="mx-auto mb-2 text-white" />
                  <p className="text-sm font-medium">{right}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container-polaris">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              💬 {t('common:privacy.contact.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              {t('common:privacy.contact.description')}
            </p>
            
            <div className="bg-white dark:bg-gray-900 p-8 shadow-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail size={32} className="text-white" />
                </div>
                <a
                  href="/contact"
                  className="inline-block bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-3 font-semibold hover:from-primary-600 hover:to-accent-600 transition-all duration-300 transform hover:scale-105"
                >
                  {t('common:privacy.contact.contactButton')}
                </a>
              </div>
            </div>
          </motion.div>
          </div>
      </section>

      {/* Updates Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container-polaris">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              🔄 {t('common:privacy.updates.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('common:privacy.updates.description')}
            </p>
          </motion.div>
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
        'common'
      ])),
    },
  }
}

export default PrivacyPolicyPage 