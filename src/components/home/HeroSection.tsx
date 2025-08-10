import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { ArrowRight, Play, Users, Vote, DollarSign, BarChart3, TrendingUp, Activity, Clock } from 'lucide-react'
import Button from '../ui/Button'
import { usePlatformStats } from '../../hooks/usePlatformStats'
import { PLATFORM_URLS } from '../../config/env'

const HeroSection: React.FC = () => {
  const { t } = useTranslation('homepage')
  const { displayData, loading, error, isFreshData, recentActivities } = usePlatformStats({
    refreshInterval: 30000, // 30 seconds for hero section
    enabled: true
  })

  // Loading skeleton component
  const StatsSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-16 mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
    </div>
  )

  // Real-time indicator
  const RealTimeIndicator = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center space-x-2 mb-4"
    >
      <div className={`w-2 h-2 rounded-full ${isFreshData ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`}></div>
      <span className="text-xs text-gray-600 dark:text-gray-400">
        {isFreshData ? 'Live Data' : 'Updating...'}
      </span>
    </motion.div>
  )

  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800 py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-accent-500 to-primary-500 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container-polaris relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-6"
            >
              {t('hero.title')}
              <span className="block text-accent-500 mt-2">
                {t('hero.subtitle')}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a href={PLATFORM_URLS.HOME} target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="animate-pulse-once"
                >
                  {t('hero.getStarted')}
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </a>
              <a href={PLATFORM_URLS.LOGIN} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="lg">
                  <Play size={20} className="mr-2" />
                  {t('hero.tryDemo', 'Try Demo')}
                </Button>
              </a>
            </motion.div>

            {/* Real-time Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12"
            >
              <RealTimeIndicator />
              
              <div className="grid grid-cols-3 gap-8 text-center lg:text-left">
                <div>
                  {loading ? (
                    <StatsSkeleton />
                  ) : error ? (
                    <div className="text-red-500 text-sm">Error loading data</div>
                  ) : (
                    <>
                      <div className="text-2xl md:text-3xl font-heading font-bold text-primary-500 dark:text-accent-500">
                        {displayData?.communities.formatted || '50+'}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {displayData?.communities.label || t('hero.stats.communities')}
                      </div>
                    </>
                  )}
                </div>
                <div>
                  {loading ? (
                    <StatsSkeleton />
                  ) : error ? (
                    <div className="text-red-500 text-sm">Error loading data</div>
                  ) : (
                    <>
                      <div className="text-2xl md:text-3xl font-heading font-bold text-primary-500 dark:text-accent-500">
                        {displayData?.funds.formatted || '$2.5M'}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {displayData?.funds.label || t('hero.stats.fundsManaged')}
                      </div>
                    </>
                  )}
                </div>
                <div>
                  {loading ? (
                    <StatsSkeleton />
                  ) : error ? (
                    <div className="text-red-500 text-sm">Error loading data</div>
                  ) : (
                    <>
                      <div className="text-2xl md:text-3xl font-heading font-bold text-primary-500 dark:text-accent-500">
                        {displayData?.members.formatted || '1000+'}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {displayData?.members.label || t('hero.stats.members')}
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              {/* Recent Activities - Real-time Transparency */}
              {recentActivities && recentActivities.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="mt-8 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <Activity size={16} className="text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Recent Activity
                    </span>
                  </div>
                  <div className="space-y-2">
                    {recentActivities.slice(0, 2).map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3 text-sm">
                        <span className="text-base">{activity.icon}</span>
                        <div className="flex-1">
                          <p className="text-gray-800 dark:text-gray-200 leading-tight">
                            {activity.displayText}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {activity.timeAgo}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* SaaS Features Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative z-10 bg-white dark:bg-gray-800 p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
              {/* SaaS Platform Preview */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-white">
                    Polaris Platform
                  </h3>
                  <div className="w-3 h-3 bg-green-500"></div>
                </div>
                
                {/* Feature Icons Grid */}
                <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20">
                <div className="w-10 h-10 bg-blue-500 flex items-center justify-center">
                      <Users size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {t('hero.preview.multiCommunity')}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {t('hero.preview.manageMultiple')}
                      </div>
                    </div>
                  </div>

                              <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20">
              <div className="w-10 h-10 bg-green-500 flex items-center justify-center">
                      <Vote size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {t('hero.preview.democratic')}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {t('hero.preview.transparentVoting')}
                      </div>
                    </div>
                  </div>

                              <div className="flex items-center space-x-3 p-4 bg-accent-50 dark:bg-accent-900/20">
              <div className="w-10 h-10 bg-accent-500 flex items-center justify-center">
                      <DollarSign size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {t('hero.preview.fundManagement')}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {t('hero.preview.secureTransparent')}
                      </div>
                    </div>
                  </div>

                              <div className="flex items-center space-x-3 p-4 bg-primary-50 dark:bg-primary-900/20">
              <div className="w-10 h-10 bg-primary-500 flex items-center justify-center">
                      <BarChart3 size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {t('hero.preview.analytics')}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {t('hero.preview.realTimeInsights')}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {t('hero.preview.readyEmpower')}
                    </div>
                    <a href={PLATFORM_URLS.HOME} target="_blank" rel="noopener noreferrer">
                      <Button variant="primary" size="sm" className="w-full">
                        {t('hero.preview.getStartedToday')}
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-accent-500 opacity-20 rounded-full"
            ></motion.div>
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary-500 opacity-20 rounded-full"
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection 