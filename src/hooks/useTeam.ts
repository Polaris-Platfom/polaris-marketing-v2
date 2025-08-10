import { useRealTimeData } from './useRealTimeData'

// TypeScript interfaces for team data
export interface TeamMember {
  id: number
  name: string
  role: string
  bio: string
  image?: string
  initials: string
  active: boolean
  joinDate: string
  skills: string[]
  social: {
    twitter?: string
    linkedin?: string
    github?: string
  }
  stats: {
    projectsLed?: number
    communitiesHelped?: number
    communitiesManaged?: number
    membersOnboarded?: number
    engagementRate?: number
    codeCommits?: number
    codeGenerated?: number
    bugsFixed?: number
    testsWritten?: number
  }
}

export interface TeamStats {
  totalMembers: number
  activeMembers: number
  averageExperience: number
  totalProjectsLed: number
  totalCommunitiesHelped: number
}

export interface TeamData {
  teamMembers: TeamMember[]
  teamStats: TeamStats
  openPositions: number
  lastUpdated: string
}

export interface UseTeamOptions {
  refreshInterval?: number
  enabled?: boolean
  onSuccess?: (data: TeamData) => void
  onError?: (error: Error) => void
}

export function useTeam(options: UseTeamOptions = {}) {
  const {
    refreshInterval = 120000, // 2 minutes default (team data changes less frequently)
    enabled = true,
    onSuccess,
    onError
  } = options

  const result = useRealTimeData<TeamData>(
    '/api/team',
    {
      refreshInterval,
      enabled,
      onSuccess,
      onError,
      retryCount: 2,
      retryDelay: 3000
    }
  )

  // Format team members for display
  const getFormattedTeamMembers = () => {
    if (!result.data) return []

    return result.data.teamMembers.map(member => ({
      ...member,
      experienceYears: calculateExperience(member.joinDate),
      skillsDisplay: member.skills.slice(0, 3).join(', ') + 
                    (member.skills.length > 3 ? ` +${member.skills.length - 3} more` : ''),
      socialLinks: Object.entries(member.social).filter(([_, url]) => url),
      primaryStat: getPrimaryStat(member),
      isFounder: member.role.toLowerCase().includes('founder'),
      joinDateFormatted: formatDate(member.joinDate)
    }))
  }

  // Calculate years of experience
  const calculateExperience = (joinDate: string) => {
    const joinYear = new Date(joinDate).getFullYear()
    const currentYear = new Date().getFullYear()
    return currentYear - joinYear
  }

  // Get primary stat for display
  const getPrimaryStat = (member: TeamMember) => {
    const stats = member.stats
    
    if (stats.projectsLed) {
      return { label: 'Projects Led', value: stats.projectsLed }
    }
    if (stats.communitiesHelped) {
      return { label: 'Communities Helped', value: stats.communitiesHelped }
    }
    if (stats.communitiesManaged) {
      return { label: 'Communities Managed', value: stats.communitiesManaged }
    }
    if (stats.membersOnboarded) {
      return { label: 'Members Onboarded', value: stats.membersOnboarded }
    }
    if (stats.codeCommits) {
      return { label: 'Code Commits', value: stats.codeCommits }
    }
    if (stats.codeGenerated) {
      return { label: 'Lines of Code', value: stats.codeGenerated }
    }
    if (stats.bugsFixed) {
      return { label: 'Bugs Fixed', value: stats.bugsFixed }
    }
    if (stats.testsWritten) {
      return { label: 'Tests Written', value: stats.testsWritten }
    }
    
    return { label: 'Team Member', value: 1 }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long'
    }
    return date.toLocaleDateString(undefined, options)
  }

  // Get team stats for display
  const getFormattedStats = () => {
    if (!result.data) return null

    return {
      ...result.data.teamStats,
      averageExperienceFormatted: `${result.data.teamStats.averageExperience.toFixed(1)} years`,
      activeRate: result.data.teamStats.activeMembers / result.data.teamStats.totalMembers,
      activeRateFormatted: `${Math.round((result.data.teamStats.activeMembers / result.data.teamStats.totalMembers) * 100)}%`,
      growthIndicator: result.data.openPositions > 0 ? '📈' : '✅'
    }
  }

  // Get founders specifically
  const getFounders = () => {
    if (!result.data) return []
    
    return result.data.teamMembers.filter(member => 
      member.role.toLowerCase().includes('founder') || 
      member.role.toLowerCase().includes('co-founder')
    )
  }

  // Get team members by role
  const getTeamByRole = () => {
    if (!result.data) return {}
    
    const roles = result.data.teamMembers.reduce((acc, member) => {
      const roleKey = member.role.toLowerCase().includes('founder') ? 'founders' : 'team'
      if (!acc[roleKey]) acc[roleKey] = []
      acc[roleKey].push(member)
      return acc
    }, {} as Record<string, TeamMember[]>)
    
    return roles
  }

  // Check if team data is fresh (updated within last hour)
  const isFreshData = () => {
    if (!result.data || !result.lastUpdated) return false
    
    const lastUpdate = new Date(result.lastUpdated)
    const now = new Date()
    const diffInMinutes = (now.getTime() - lastUpdate.getTime()) / (1000 * 60)
    
    return diffInMinutes < 60
  }

  return {
    ...result,
    teamMembers: getFormattedTeamMembers(),
    teamStats: getFormattedStats(),
    founders: getFounders(),
    teamByRole: getTeamByRole(),
    isFreshData: isFreshData()
  }
} 