import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Vote, 
  Activity, 
  Clock, 
  Eye,
  Zap,
  RefreshCw,
  AlertCircle
} from 'lucide-react'
import { usePlatformStats } from '../../hooks/usePlatformStats'

interface TransparentStatsProps {
  className?: string
  showRecentActivities?: boolean
  showTrends?: boolean
  compact?: boolean
  refreshInterval?: number
}

const TransparentStats: React.FC<TransparentStatsProps> = ({
  className = '',
  showRecentActivities = true,
  showTrends = true,
  compact = false,
  refreshInterval = 30000
}) => {
  const { 
    displayData, 
    recentActivities, 
    loading, 
    isUpdating,
    error, 
    isFreshData,
    isLive,
    statusMessage,
    refetch 
  } = usePlatformStats({
    refreshInterval,
    enabled: true
  })

  const handleRefresh = async () => {
    await refetch()
  }

  // Memoize the loading skeleton to prevent re-renders
  const StatSkeleton = useMemo(() => (
    <div className="animate-pulse">
      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16 mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 mb-1"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
    </div>
  ), [])

  // Coming soon placeholder
  const ComingSoonPlaceholder = useMemo(() => (
    <div className="text-center py-8">
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
        <Clock className="w-8 h-8 text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
        Coming Soon
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-500">
        {statusMessage || 'Real-time statistics will be available when the platform launches'}
      </p>
    </div>
  ), [statusMessage])

  // Real-time indicator with optimized status
  const LiveIndicator = () => (
    <div className="flex items-center space-x-2 text-xs">
      <div className={`w-2 h-2 rounded-full ${
        !isLive ? 'bg-gray-400' : 
        error ? 'bg-red-500' : 
        isUpdating ? 'bg-yellow-400 animate-pulse' : 
        loading ? 'bg-yellow-400 animate-pulse' : 
        'bg-green-500'
      }`}></div>
      <span className="text-gray-600 dark:text-gray-400">
        {!isLive ? 'Development Mode' :
         error ? 'Connection Error' :
         isUpdating ? 'Updating...' :
         loading ? 'Loading...' :
         'Live Data'}
      </span>
      {isLive && !error && !loading && (
        <button
          onClick={handleRefresh}
          className="text-blue-500 hover:text-blue-600 transition-colors"
          disabled={isUpdating}
        >
          <RefreshCw className={`w-3 h-3 ${isUpdating ? 'animate-spin' : ''}`} />
        </button>
      )}
    </div>
  )

  const StatsGrid = () => {
    const stats = useMemo(() => [
      {
        icon: Users,
        color: 'text-blue-500',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        data: displayData?.communities,
        trend: '+12%'
      },
      {
        icon: DollarSign,
        color: 'text-green-500',
        bgColor: 'bg-green-50 dark:bg-green-900/20',
        data: displayData?.funds,
        trend: '+8%'
      },
      {
        icon: Vote,
        color: 'text-purple-500',
        bgColor: 'bg-purple-50 dark:bg-purple-900/20',
        data: displayData?.members,
        trend: '+15%'
      },
      {
        icon: Activity,
        color: 'text-orange-500',
        bgColor: 'bg-orange-50 dark:bg-orange-900/20',
        data: displayData?.projects,
        trend: '+22%'
      }
    ], [displayData])

    // Show coming soon placeholder when not live
    if (!isLive && !loading) {
      return (
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            {ComingSoonPlaceholder}
          </div>
        </div>
      )
    }

    return (
      <div className={`grid ${compact ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'} gap-4`}>
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${stat.bgColor} rounded-lg p-4 border border-gray-200 dark:border-gray-700 transition-all duration-200 ${
                isUpdating ? 'ring-1 ring-blue-200 dark:ring-blue-700' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                {showTrends && isLive && (
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                      {stat.trend}
                    </span>
                  </div>
                )}
              </div>
              
              {loading && !stat.data ? (
                StatSkeleton
              ) : error && !stat.data ? (
                <div className="text-red-500 text-xs">Error loading</div>
              ) : (
                <>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.data?.formatted || '—'}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.data?.label || 'Loading...'}
                  </div>
                </>
              )}
            </motion.div>
          )
        })}
      </div>
    )
  }

  const RecentActivitiesComponent = () => {
    // Don't show activities when not live
    if (!isLive) {
      return null
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Recent Activity
          </h3>
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Transparent
            </span>
          </div>
        </div>
        
        <div className="space-y-3">
          {recentActivities.length > 0 ? (
            recentActivities.map((activity, index) => (
              <motion.div
                key={`${activity.type}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-700 rounded-lg"
              >
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {activity.displayText}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.timeAgo}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500 dark:text-gray-400">
              <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No recent activity</p>
            </div>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header with live indicator */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Platform Statistics
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {isLive ? 'Real-time platform metrics' : 'Platform metrics coming soon'}
          </p>
        </div>
        <LiveIndicator />
      </div>

      {/* Stats Grid */}
      <StatsGrid />

      {/* Recent Activities */}
      {showRecentActivities && <RecentActivitiesComponent />}

      {/* Development notice */}
      {!isLive && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4"
        >
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
                Development Mode
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-300">
                {statusMessage || 'Real-time statistics will be available when the platform launches'}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default TransparentStats 