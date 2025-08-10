import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { TrendingUp, ArrowRight } from 'lucide-react'

const Scenario3Page: React.FC = () => {
  return (
    <>
      <Head>
        <title>Community Initiative Demo - Polaris</title>
        <meta name="description" content="Discover how grassroots organizations crowdfund and execute local projects using democratic governance." />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Community Initiative Demo
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Experience how the Downtown Revitalization Initiative uses Polaris to crowdfund projects, 
              engage stakeholders, and track progress transparently.
            </p>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                In this demo you'll see:
              </h3>
              <ul className="text-left space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Crowdfunding campaigns with milestone tracking</li>
                <li>• Community-driven project prioritization</li>
                <li>• Multi-stakeholder governance and coordination</li>
                <li>• Impact measurement and public accountability</li>
              </ul>
            </div>

            <Link
              href="/app?demo=scenario3"
              className="inline-flex items-center bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-medium transition-colors"
            >
              Start Interactive Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
              <Link href="/demos" className="text-primary-500 hover:text-primary-600">
                ← Back to all demos
              </Link>
            </p>
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

export default Scenario3Page 