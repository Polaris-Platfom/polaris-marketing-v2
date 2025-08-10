import React from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Users, Vote, TrendingUp, ArrowRight } from 'lucide-react'

const DemosPage: React.FC = () => {
  const { t } = useTranslation('common')

  const demos = [
    {
      id: 'scenario1',
      title: 'Neighborhood Association',
      description: 'See how a neighborhood association manages community projects and funding decisions.',
      icon: Users,
      href: '/demos/scenario1',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'scenario2', 
      title: 'Housing Cooperative',
      description: 'Explore democratic decision-making in a housing cooperative with transparent voting.',
      icon: Vote,
      href: '/demos/scenario2',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'scenario3',
      title: 'Community Initiative',
      description: 'Discover how grassroots organizations can crowdfund and execute local projects.',
      icon: TrendingUp,
      href: '/demos/scenario3',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  return (
    <>
      <Head>
        <title>Polaris Demos - See Community Governance in Action</title>
        <meta name="description" content="Explore interactive demos showcasing how Polaris empowers communities with democratic governance and transparent funding." />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6">
              Experience Democracy in Action
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Explore real-world scenarios where communities use Polaris to make decisions, 
              fund projects, and create positive change together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/app" className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-medium transition-colors">
                Try Polaris Free
              </Link>
              <Link href="/contact" className="border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-8 py-4 rounded-lg font-medium transition-colors">
                Schedule Demo
              </Link>
            </div>
          </div>
        </div>

        {/* Demo Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {demos.map((demo) => {
              const Icon = demo.icon
              return (
                <div
                  key={demo.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className={`h-2 bg-gradient-to-r ${demo.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${demo.color} rounded-lg flex items-center justify-center mr-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white">
                        {demo.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {demo.description}
                    </p>
                    <Link
                      href={demo.href}
                      className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium transition-colors"
                    >
                      Explore Demo
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary-500 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
              Ready to Transform Your Community?
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8">
              Start building stronger, more democratic communities with Polaris today.
            </p>
            <Link 
              href="/app"
              className="bg-white text-primary-500 hover:bg-gray-100 px-8 py-4 rounded-lg font-medium transition-colors"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['navigation', 'common'])),
    },
  }
}

export default DemosPage 