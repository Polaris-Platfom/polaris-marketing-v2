import React from 'react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Users, Activity } from 'lucide-react'
import Layout from '../components/layout/Layout'
import TransparentStats from '../components/ui/TransparentStats'

const StatsPage: React.FC = () => {
  const { t } = useTranslation('common')

  return (
    <Layout>
      <Head>
        <title>{t('stats.pageTitle')}</title>
        <meta name="description" content={t('stats.pageDescription')} />
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
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg">
                <BarChart3 className="w-12 h-12 text-primary-500" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-6">
              {t('stats.hero.title')}
              <span className="block text-accent-500 mt-2">{t('stats.hero.subtitle')}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t('stats.hero.description')}
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span>{t('stats.hero.liveData')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span>{t('stats.hero.updatedEvery30s')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>{t('stats.hero.transparent')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Stats Dashboard */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container-polaris">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TransparentStats 
              showRecentActivities={true}
              showTrends={true}
              compact={false}
              refreshInterval={30000}
            />
          </motion.div>
        </div>
      </section>

      {/* Transparency Information */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container-polaris">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                {t('stats.transparency.title')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t('stats.transparency.subtitle')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-700">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100">
                    {t('stats.transparency.communityTrust.title')}
                  </h3>
                </div>
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  {t('stats.transparency.communityTrust.description')}
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-700">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-900 dark:text-green-100">
                    {t('stats.transparency.dataIntegrity.title')}
                  </h3>
                </div>
                <p className="text-green-800 dark:text-green-200 text-sm">
                  {t('stats.transparency.dataIntegrity.description')}
                </p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-700">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100">
                    {t('stats.transparency.realTimeUpdates.title')}
                  </h3>
                </div>
                <p className="text-purple-800 dark:text-purple-200 text-sm">
                  {t('stats.transparency.realTimeUpdates.description')}
                </p>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-700">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-orange-500 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-orange-900 dark:text-orange-100">
                    {t('stats.transparency.growthTracking.title')}
                  </h3>
                </div>
                <p className="text-orange-800 dark:text-orange-200 text-sm">
                  {t('stats.transparency.growthTracking.description')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'ui'])),
    },
  }
}

export default StatsPage 