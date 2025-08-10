import React from 'react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { Users, Target, Heart, Globe, Briefcase } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import JobApplicationModal from '../components/ui/JobApplicationModal'
import { usePlatformStats } from '../hooks/usePlatformStats'

interface JobPosition {
  id: string
  title: string
  description: string
  requirements: string
  benefits: string
  responsibilities: string
  isOpen: boolean
}

const AboutPage: React.FC = () => {
  const { t } = useTranslation(['common', 'ui'])
  const [selectedPosition, setSelectedPosition] = React.useState<JobPosition | null>(null)
  const [showJobModal, setShowJobModal] = React.useState(false)
  
  // Real-time data hooks
  const { displayData: platformStats, loading: statsLoading, error: statsError } = usePlatformStats()

  // Loading skeleton component
  const StatsSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-16 mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
    </div>
  )



  const values = [
    {
      icon: Users,
      title: t('common:about.communityFirst'),
      description: t('common:about.communityFirstDesc'),
    },
    {
      icon: Target,
      title: t('common:about.transparency'),
      description: t('common:about.transparencyDesc'),
    },
    {
      icon: Heart,
      title: t('common:about.socialImpact'),
      description: t('common:about.socialImpactDesc'),
    },
    {
      icon: Globe,
      title: t('common:about.globalReach'),
      description: t('common:about.globalReachDesc'),
    },
  ]

  const openPositions: JobPosition[] = [
    {
      id: 'ceo',
      title: t('common:about.positions.ceo.title'),
      description: t('common:about.positions.ceo.description'),
      requirements: t('common:about.positions.ceo.requirements'),
      benefits: t('common:about.positions.ceo.benefits'),
      responsibilities: t('common:about.positions.ceo.responsibilities'),
      isOpen: true
    },
    {
      id: 'product',
      title: t('common:about.positions.product.title'),
      description: t('common:about.positions.product.description'),
      requirements: t('common:about.positions.product.requirements'),
      benefits: t('common:about.positions.product.benefits'),
      responsibilities: t('common:about.positions.product.responsibilities'),
      isOpen: true
    },
    {
      id: 'marketing',
      title: t('common:about.positions.marketing.title'),
      description: t('common:about.positions.marketing.description'),
      requirements: t('common:about.positions.marketing.requirements'),
      benefits: t('common:about.positions.marketing.benefits'),
      responsibilities: t('common:about.positions.marketing.responsibilities'),
      isOpen: true
    }
  ]

  // Static team data - no real-time updates needed
  const team = [
    {
      name: 'Osmel P. Teran',
      role: 'CTO & Co-Founder',
      bio: 'Blockchain engineer with expertise in decentralized governance systems and smart contracts.',
      image: '/assets/images/team/osmel-teran.png',
      initials: 'OPT'
    },
    {
      name: 'Dionne P. Teran',
      role: 'Head of Community',
      bio: 'Community management expert with deep understanding of digital democracy and civic engagement processes.',
      image: '/team/dionne.jpg',
      initials: 'DPT'
    }
  ]

  const handleApplyClick = (position: JobPosition) => {
    setSelectedPosition(position)
    setShowJobModal(true)
  }

  const handleModalClose = () => {
    setShowJobModal(false)
    setSelectedPosition(null)
  }

  return (
    <>
      <Head>
        <title>About Us - Polaris Platform</title>
        <meta name="description" content="Learn about Polaris Platform's mission to empower communities through democratic funding and governance" />
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-6">
              {t('common:about.title')}
              <span className="block text-accent-500">{t('common:about.subtitle')}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t('common:about.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container-polaris">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                {t('common:about.mission')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {t('common:about.missionText')}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t('common:about.blockchainText')}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-500 to-accent-500 p-8 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-heading font-bold">{t('common:about.impactTitle')}</h3>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${statsLoading ? 'bg-yellow-400' : 'bg-green-400'} animate-pulse`}></div>
                    <span className="text-xs opacity-75">
                      {statsLoading ? 'Updating...' : 'Live Data'}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    {statsLoading ? (
                      <div className="animate-pulse">
                        <div className="h-8 bg-white/20 rounded w-16 mb-2"></div>
                        <div className="h-4 bg-white/20 rounded w-24"></div>
                      </div>
                    ) : statsError ? (
                      <div className="text-red-200 text-sm">Error loading data</div>
                    ) : (
                      <>
                        <div className="text-3xl font-bold">
                          {platformStats?.communities.formatted || '50+'}
                        </div>
                        <div className="text-sm opacity-90">
                          {platformStats?.communities.label || t('common:about.communitiesServed')}
                        </div>
                      </>
                    )}
                  </div>
                  <div>
                    {statsLoading ? (
                      <div className="animate-pulse">
                        <div className="h-8 bg-white/20 rounded w-16 mb-2"></div>
                        <div className="h-4 bg-white/20 rounded w-24"></div>
                      </div>
                    ) : statsError ? (
                      <div className="text-red-200 text-sm">Error loading data</div>
                    ) : (
                      <>
                        <div className="text-3xl font-bold">
                          {platformStats?.funds.formatted || '$2.5M'}
                        </div>
                        <div className="text-sm opacity-90">
                          {platformStats?.funds.label || t('common:about.fundsAllocated')}
                        </div>
                      </>
                    )}
                  </div>
                  <div>
                    {statsLoading ? (
                      <div className="animate-pulse">
                        <div className="h-8 bg-white/20 rounded w-16 mb-2"></div>
                        <div className="h-4 bg-white/20 rounded w-24"></div>
                      </div>
                    ) : statsError ? (
                      <div className="text-red-200 text-sm">Error loading data</div>
                    ) : (
                      <>
                        <div className="text-3xl font-bold">
                          {platformStats?.members.formatted || '1000+'}
                        </div>
                        <div className="text-sm opacity-90">
                          {platformStats?.members.label || t('common:about.activeParticipants')}
                        </div>
                      </>
                    )}
                  </div>
                  <div>
                    {statsLoading ? (
                      <div className="animate-pulse">
                        <div className="h-8 bg-white/20 rounded w-16 mb-2"></div>
                        <div className="h-4 bg-white/20 rounded w-24"></div>
                      </div>
                    ) : statsError ? (
                      <div className="text-red-200 text-sm">Error loading data</div>
                    ) : (
                      <>
                        <div className="text-3xl font-bold">
                          {platformStats?.projects.formatted || '150+'}
                        </div>
                        <div className="text-sm opacity-90">
                          {platformStats?.projects.label || t('common:about.projectsCompleted')}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container-polaris">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-6">
              {t('common:about.values')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('common:about.valuesDescription')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center h-full">
                    <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900/20 flex items-center justify-center mx-auto mb-6">
                      <Icon size={32} className="text-accent-500" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-white dark:bg-gray-900">
        <div className="container-polaris">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-6">
              {t('common:about.team')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('common:about.teamDescription')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Current Team Members */}
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full">
                  <div className="w-24 h-24 mx-auto mb-4 relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full border-2 border-primary-500"
                      onError={(e) => {
                        // Fallback to initials if image fails to load
                        const target = e.currentTarget;
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) {
                          target.style.display = 'none';
                          fallback.style.display = 'flex';
                        }
                      }}
                    />
                    <div className="w-full h-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-2xl font-bold rounded-full absolute inset-0" style={{ display: 'none' }}>
                      {member.initials}
                    </div>
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-accent-500 font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>
                </Card>
              </motion.div>
            ))}

            {/* Open Positions */}
            {openPositions.map((position, index) => (
              <motion.div
                key={`position-${position.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: (team.length + index) * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                  {/* Open Position Badge */}
                  <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-medium px-2 py-1">
                    {t('common:about.openPositions')}
                  </div>
                  
                  <div className="w-24 h-24 bg-gradient-to-br from-accent-500 to-primary-500 mx-auto mb-4 flex items-center justify-center text-white text-sm font-bold border-2 border-dashed border-accent-300 dark:border-accent-600">
                    <Briefcase size={32} />
                  </div>
                  
                  <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-2">
                    {position.title}
                  </h3>
                  
                  <p className="text-accent-500 font-medium mb-4">
                    {t('common:about.joinOurTeam')}
                  </p>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                    {position.description}
                  </p>
                  
                  <Button
                    onClick={() => handleApplyClick(position)}
                    className="bg-accent-500 hover:bg-accent-600 text-white transform group-hover:scale-105 transition-transform duration-300"
                  >
                    {t('common:about.applyNow')}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Application Modal */}
      <JobApplicationModal
        isOpen={showJobModal}
        onClose={handleModalClose}
        position={selectedPosition}
      />
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

export default AboutPage 