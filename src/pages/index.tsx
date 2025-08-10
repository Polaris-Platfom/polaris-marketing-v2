import React from 'react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Users, Vote, DollarSign, Shield, Star, Award } from 'lucide-react'
import Button from '../components/ui/Button'
import HeroSection from '../components/home/HeroSection'
import HowItWorksSection from '../components/home/HowItWorksSection'
import FeaturesSection from '../components/home/FeaturesSection'
import SurveySection from '../components/home/SurveySection'
import SurveyModal from '../components/ui/SurveyModal'
import { useTestimonials } from '../hooks/useTestimonials'
import { PLATFORM_URLS } from '../config/env'

const HomePage: React.FC = () => {
  const { t } = useTranslation('homepage')
  const [showSurveyModal, setShowSurveyModal] = React.useState(false)
  const [surveyDismissed, setSurveyDismissed] = React.useState(false)
  
  // Real-time testimonials data
  const { testimonials, loading: testimonialsLoading, error: testimonialsError, stats: testimonialsStats } = useTestimonials()

  const surveyUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSf98g6Jg9z2igKLo99ixvYKWX75WiVOK6qagmDHK_X_XdEtOQ/viewform?usp=dialog'

  // Testimonial skeleton component
  const TestimonialSkeleton = () => (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 animate-pulse">
      <div className="space-y-3">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
      </div>
    </div>
  )

  // Show survey modal after 3 seconds if not dismissed
  React.useEffect(() => {
    const dismissed = localStorage.getItem('survey-dismissed')
    if (!dismissed) {
      const timer = setTimeout(() => {
        setShowSurveyModal(true)
      }, 3000)
      return () => clearTimeout(timer)
    } else {
      setSurveyDismissed(true)
    }
  }, [])

  const handleSurveyClick = () => {
    window.open(surveyUrl, '_blank')
  }

  const handleModalClose = () => {
    setShowSurveyModal(false)
    localStorage.setItem('survey-dismissed', 'true')
    setSurveyDismissed(true)
  }

  return (
    <>
      <Head>
        <title>Polaris - SaaS Platform for Community Governance</title>
        <meta name="description" content="The complete SaaS solution for democratic community governance. Create, manage, and fund multiple communities with transparent blockchain technology." />
        <meta property="og:title" content="Polaris - SaaS Platform for Community Governance" />
        <meta property="og:description" content="The complete SaaS solution for democratic community governance. Create, manage, and fund multiple communities with transparent blockchain technology." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://polaris-platform.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@polarisnet00" />
        <meta name="twitter:creator" content="@polarisnet00" />
        <meta name="twitter:title" content="Polaris - SaaS Platform for Community Governance" />
        <meta name="twitter:description" content="The complete SaaS solution for democratic community governance. Create, manage, and fund multiple communities with transparent blockchain technology." />
      </Head>

      {/* Hero Section */}
      <HeroSection />

      {/* Value Proposition Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              {t('valueProposition.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('valueProposition.description')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: t('valueProposition.multiCommunity.title'),
                description: t('valueProposition.multiCommunity.description')
              },
              {
                icon: Vote,
                title: t('valueProposition.democraticGovernance.title'),
                description: t('valueProposition.democraticGovernance.description')
              },
              {
                icon: DollarSign,
                title: t('valueProposition.collaborativeFunding.title'),
                description: t('valueProposition.collaborativeFunding.description')
              },
              {
                icon: Shield,
                title: t('valueProposition.secureTransparent.title'),
                description: t('valueProposition.secureTransparent.description')
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center rounded-lg mx-auto mb-4">
                  <feature.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href={PLATFORM_URLS.HOME} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="min-w-[200px]">
                  {t('cta.startTrial')}
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </a>
              
              <a href={PLATFORM_URLS.LOGIN} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="lg" className="min-w-[200px]">
                  {t('cta.signIn')}
                </Button>
              </a>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              {t('cta.disclaimer')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials/Social Proof Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white">
                {t('testimonials.title')}
              </h2>
              {testimonialsStats && (
                <div className="flex items-center space-x-2">
                  <Star className="text-yellow-500 w-5 h-5 fill-current" />
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {testimonialsStats.formattedRating}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({testimonialsStats.verified} verified)
                  </span>
                </div>
              )}
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonialsLoading ? (
                // Show loading skeletons
                Array.from({ length: 3 }).map((_, index) => (
                  <motion.div
                    key={`skeleton-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <TestimonialSkeleton />
                  </motion.div>
                ))
              ) : testimonialsError ? (
                // Show error state with fallback to hardcoded data
                <div className="col-span-3 text-center">
                  <p className="text-red-500 mb-4">Unable to load latest testimonials</p>
                  <p className="text-gray-600 dark:text-gray-400">Showing cached testimonials:</p>
                </div>
              ) : (
                // Show real testimonials
                testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center space-x-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? 'text-yellow-500 fill-current'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                      {testimonial.verified && (
                        <Award className="w-4 h-4 text-blue-500 ml-2" />
                      )}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                      "{testimonial.quote}"
                    </p>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {testimonial.initials}
                      </div>
                      <div className="text-sm">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {testimonial.author}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400">
                          {testimonial.role}, {testimonial.community}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          {testimonial.displayDate}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
              
              {/* Fallback testimonials if API fails */}
              {testimonialsError && [
                {
                  quote: t('testimonials.testimonial1.quote'),
                  author: t('testimonials.testimonial1.author'),
                  role: t('testimonials.testimonial1.role'),
                  community: t('testimonials.testimonial1.community')
                },
                {
                  quote: t('testimonials.testimonial2.quote'),
                  author: t('testimonials.testimonial2.author'),
                  role: t('testimonials.testimonial2.role'), 
                  community: t('testimonials.testimonial2.community')
                },
                {
                  quote: t('testimonials.testimonial3.quote'),
                  author: t('testimonials.testimonial3.author'),
                  role: t('testimonials.testimonial3.role'),
                  community: t('testimonials.testimonial3.community')
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={`fallback-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 opacity-75"
                >
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      {testimonial.role}, {testimonial.community}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Survey Section */}
      <SurveySection surveyUrl={surveyUrl} onSurveyClick={handleSurveyClick} />

      {/* Survey Modal */}
      <SurveyModal
        isOpen={showSurveyModal}
        onClose={handleModalClose}
        surveyUrl={surveyUrl}
      />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'navigation',
        'homepage', 
        'ui',
        'common'
      ])),
    },
  }
}

export default HomePage
