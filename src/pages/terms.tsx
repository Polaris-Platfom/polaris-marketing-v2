import React from 'react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Users, 
  Heart, 
  Shield, 
  CheckCircle, 
  Zap, 
  Globe,
  Mail,
  Star
} from 'lucide-react'

const TermsOfServicePage: React.FC = () => {
  const { t } = useTranslation(['common', 'ui'])

  const coreValues = [
    {
      icon: Heart,
      title: t('common:terms.values.simplicity.title'),
      description: t('common:terms.values.simplicity.description')
    },
    {
      icon: Shield,
      title: t('common:terms.values.protection.title'),
      description: t('common:terms.values.protection.description')
    },
    {
      icon: Users,
      title: t('common:terms.values.community.title'),
      description: t('common:terms.values.community.description')
    },
    {
      icon: Zap,
      title: t('common:terms.values.innovation.title'),
      description: t('common:terms.values.innovation.description')
    }
  ]

  const commitments = [
    {
      icon: Shield,
      title: t('common:terms.commitments.security.title'),
      description: t('common:terms.commitments.security.description')
    },
    {
      icon: Globe,
      title: t('common:terms.commitments.transparency.title'),
      description: t('common:terms.commitments.transparency.description')
    },
    {
      icon: Star,
      title: t('common:terms.commitments.innovation.title'),
      description: t('common:terms.commitments.innovation.description')
    },
    {
      icon: Heart,
      title: t('common:terms.commitments.support.title'),
      description: t('common:terms.commitments.support.description')
    }
  ]

  return (
    <>
      <Head>
        <title>{t('common:terms.title')} - Polaris Platform</title>
        <meta name="description" content={t('common:terms.subtitle')} />
      </Head>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container-polaris">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-2xl">
                <FileText size={32} />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6">
              {t('common:terms.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t('common:terms.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                {t('common:terms.jurisdiction')}
              </span>
              <span className="flex items-center gap-2">
                <FileText size={16} className="text-blue-500" />
                {t('common:terms.lastUpdated')}: 15 {t('common:terms.lastUpdated') === 'Last updated' ? 'January' : 'Enero'} 2025
              </span>
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
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-700 p-8 mb-12">
              <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                {t('common:terms.welcomeTitle')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t('common:terms.welcomeText')}
              </p>
            </div>

            {/* Core Values */}
            <div className="mb-12">
              <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-8 text-center">
                {t('common:terms.values.title')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {coreValues.map((value, index) => {
                  const Icon = value.icon
                  return (
                    <div key={index} className="text-center p-6 bg-gray-50 dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors duration-300">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4 text-white">
                        <Icon size={24} />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {value.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {value.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Basics Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container-polaris">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8">
              {t('common:terms.basics.title')}
            </h2>
            
            <div className="bg-white dark:bg-gray-900 p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('common:terms.basics.whatIs')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('common:terms.basics.description')}
              </p>
              
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('common:terms.basics.needsTitle')}
              </h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  {t('common:terms.basics.age')}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  {t('common:terms.basics.email')}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  {t('common:terms.basics.respect')}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  {t('common:terms.basics.rules')}
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Account Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container-polaris">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8">
              {t('common:terms.account.title')}
            </h2>
            
            <div className="bg-gradient-to-r from-accent-50 to-primary-50 dark:from-gray-800 dark:to-gray-700 p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('common:terms.account.createTitle')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('common:terms.account.createDescription')}
              </p>
              
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('common:terms.account.canDoTitle')}
              </h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <Star size={16} className="text-yellow-500" />
                  {t('common:terms.account.vote')}
                </li>
                <li className="flex items-center gap-2">
                  <Star size={16} className="text-yellow-500" />
                  {t('common:terms.account.propose')}
                </li>
                <li className="flex items-center gap-2">
                  <Star size={16} className="text-yellow-500" />
                  {t('common:terms.account.fund')}
                </li>
                <li className="flex items-center gap-2">
                  <Star size={16} className="text-yellow-500" />
                  {t('common:terms.account.track')}
                </li>
                <li className="flex items-center gap-2">
                  <Star size={16} className="text-yellow-500" />
                  {t('common:terms.account.earn')}
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Commitments Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container-polaris">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8 text-center">
              {t('common:terms.commitments.title')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {commitments.map((commitment, index) => {
                const Icon = commitment.icon
                return (
                  <div key={index} className="bg-white dark:bg-gray-900 p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {commitment.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {commitment.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rules Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container-polaris">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8">
              {t('common:terms.rules.title')}
            </h2>
            
            <div className="bg-green-50 dark:bg-gray-800 p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('common:terms.rules.respectTitle')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('common:terms.rules.respectDescription')}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-4">
                    {t('common:terms.rules.celebrateTitle')}
                  </h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      {t('common:terms.rules.constructive')}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      {t('common:terms.rules.collaboration')}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      {t('common:terms.rules.communication')}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      {t('common:terms.rules.beneficial')}
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-4">
                    {t('common:terms.rules.notAllowTitle')}
                  </h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✕</span>
                      </div>
                      {t('common:terms.rules.spam')}
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✕</span>
                      </div>
                      {t('common:terms.rules.discrimination')}
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✕</span>
                      </div>
                      {t('common:terms.rules.manipulation')}
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✕</span>
                      </div>
                      {t('common:terms.rules.offensive')}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blockchain Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-700">
        <div className="container-polaris">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8">
              {t('common:terms.blockchain.title')}
            </h2>
            
            <div className="bg-white dark:bg-gray-900 p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('common:terms.blockchain.whyTitle')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('common:terms.blockchain.whyDescription')}
              </p>
              
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('common:terms.blockchain.meansTitle')}
              </h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <Shield size={16} className="text-blue-500" />
                  {t('common:terms.blockchain.votesRecorded')}
                </li>
                <li className="flex items-center gap-2">
                  <Shield size={16} className="text-blue-500" />
                  {t('common:terms.blockchain.fundsTracked')}
                </li>
                <li className="flex items-center gap-2">
                  <Shield size={16} className="text-blue-500" />
                  {t('common:terms.blockchain.decisionsImmutable')}
                </li>
                <li className="flex items-center gap-2">
                  <Shield size={16} className="text-blue-500" />
                  {t('common:terms.blockchain.verifiable')}
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Legal Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container-polaris">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8">
              {t('common:terms.legal.title')}
            </h2>
            
            <div className="bg-blue-50 dark:bg-gray-800 p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('common:terms.legal.jurisdictionTitle')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('common:terms.legal.jurisdictionDescription')}
              </p>
              
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('common:terms.legal.protectionTitle')}
              </h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <Shield size={16} className="text-blue-500" />
                  {t('common:terms.legal.gdpr')}
                </li>
                <li className="flex items-center gap-2">
                  <Shield size={16} className="text-blue-500" />
                  {t('common:terms.legal.protected')}
                </li>
                <li className="flex items-center gap-2">
                  <Shield size={16} className="text-blue-500" />
                  {t('common:terms.legal.access')}
                </li>
                <li className="flex items-center gap-2">
                  <Shield size={16} className="text-blue-500" />
                  {t('common:terms.legal.disputes')}
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container-polaris">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8 text-center">
              {t('common:terms.support.title')}
            </h2>
            
            <div className="bg-white dark:bg-gray-900 p-8 text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('common:terms.support.description')}
              </p>
              
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                <Mail size={20} />
                {t('common:terms.support.contactButton')}
              </a>
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
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8">
              {t('common:terms.updates.title')}
            </h2>
            
            <div className="bg-yellow-50 dark:bg-gray-800 p-8">
              <p className="text-gray-600 dark:text-gray-300">
                {t('common:terms.updates.description')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Future Section */}
      <section className="py-16 bg-gradient-to-br from-accent-50 to-primary-50 dark:from-gray-800 dark:to-gray-700">
        <div className="container-polaris">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8">
              {t('common:terms.future.title')}
            </h2>
            
            <div className="bg-white dark:bg-gray-900 p-8 mb-8">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                {t('common:terms.future.description')}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4 text-white">
                    <Globe size={32} />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('common:terms.future.transparency')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4 text-white">
                    <Shield size={32} />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('common:terms.future.protection')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4 text-white">
                    <Users size={32} />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('common:terms.future.community')}
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('common:terms.future.questions')}
            </p>
          </div>
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

export default TermsOfServicePage 