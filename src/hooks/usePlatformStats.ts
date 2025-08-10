import { useRealTimeData } from './useRealTimeData'

// TypeScript interfaces for platform statistics
export interface PlatformStats {
  totalCommunities: number
  totalFundsManaged: number
  totalMembers: number
  totalProjects: number
  totalFundsRaised: number
  totalVotes: number
  averageParticipationRate: number
  monthlyGrowth: number
  lastUpdated: string
  topCommunities: CommunityStats[]
  recentActivities: ActivityStats[]
}

export interface CommunityStats {
  id: string
  name: string
  members: number
  fundsRaised: number
  votingParticipation: number
}

export interface ActivityStats {
  type: 'proposal_funded' | 'community_created' | 'voting_completed'
  title: string
  amount?: number
  members?: number
  votes?: number
  timestamp: string
}

export interface FormattedActivityStats extends ActivityStats {
  displayText: string
  icon: string
  timeAgo: string
}

export interface UsePlatformStatsOptions {
  refreshInterval?: number
  enabled?: boolean
  onSuccess?: (data: PlatformStats) => void
  onError?: (error: Error) => void
}

export function usePlatformStats(options: UsePlatformStatsOptions = {}) {
  const {
    refreshInterval = 30000, // 30 seconds default
    enabled = true,
    onSuccess,
    onError
  } = options

  const result = useRealTimeData<PlatformStats>(
    '/api/stats/platform',
    {
      refreshInterval,
      enabled,
      onSuccess,
      onError,
      retryCount: 3,
      retryDelay: 2000
    }
  )

  // Format numbers for display
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`
    }
    return num.toString()
  }

  const formatCurrency = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(0)}K`
    }
    return `$${num.toLocaleString()}`
  }

  const formatPercentage = (num: number) => {
    return `${(num * 100).toFixed(0)}%`
  }

  // Get formatted display data
  const getDisplayData = () => {
    if (!result.data) return null

    return {
      communities: {
        value: result.data.totalCommunities,
        formatted: formatNumber(result.data.totalCommunities),
        label: 'Communities Created'
      },
      funds: {
        value: result.data.totalFundsManaged,
        formatted: formatCurrency(result.data.totalFundsManaged),
        label: 'Total Funds Managed'
      },
      members: {
        value: result.data.totalMembers,
        formatted: formatNumber(result.data.totalMembers),
        label: 'Active Members'
      },
      projects: {
        value: result.data.totalProjects,
        formatted: formatNumber(result.data.totalProjects),
        label: 'Projects Completed'
      },
      participation: {
        value: result.data.averageParticipationRate,
        formatted: formatPercentage(result.data.averageParticipationRate),
        label: 'Average Participation'
      },
      growth: {
        value: result.data.monthlyGrowth,
        formatted: formatPercentage(result.data.monthlyGrowth),
        label: 'Monthly Growth'
      }
    }
  }

  // Get recent activities formatted for display
  const getRecentActivities = (): FormattedActivityStats[] => {
    if (!result.data) return []

    return result.data.recentActivities.map(activity => {
      const timeAgo = getTimeAgo(activity.timestamp)
      
      switch (activity.type) {
        case 'proposal_funded':
          return {
            ...activity,
            displayText: `${activity.title} received ${formatCurrency(activity.amount || 0)}`,
            icon: '💰',
            timeAgo
          } as FormattedActivityStats
        case 'community_created':
          return {
            ...activity,
            displayText: `${activity.title} created with ${activity.members} members`,
            icon: '🏘️',
            timeAgo
          } as FormattedActivityStats
        case 'voting_completed':
          return {
            ...activity,
            displayText: `${activity.title} completed with ${activity.votes} votes`,
            icon: '🗳️',
            timeAgo
          } as FormattedActivityStats
        default:
          return {
            ...activity,
            displayText: activity.title,
            icon: '📊',
            timeAgo
          } as FormattedActivityStats
      }
    })
  }

  // Helper function to get time ago string
  const getTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  // Check if data is fresh (updated within last 5 minutes)
  const isFreshData = () => {
    if (!result.data || !result.lastUpdated) return false
    
    const lastUpdate = new Date(result.lastUpdated)
    const now = new Date()
    const diffInMinutes = (now.getTime() - lastUpdate.getTime()) / (1000 * 60)
    
    return diffInMinutes < 5
  }

  return {
    ...result,
    displayData: getDisplayData(),
    recentActivities: getRecentActivities(),
    isFreshData: isFreshData(),
    isLive: true, // Platform is live
    statusMessage: 'Real-time data from platform',
    formatNumber,
    formatCurrency,
    formatPercentage
  }
} 