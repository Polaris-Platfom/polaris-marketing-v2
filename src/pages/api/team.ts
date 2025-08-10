import { NextApiRequest, NextApiResponse } from 'next'

// Mock database functions - replace with real database calls
const getTeamData = async () => {
  // This would normally connect to your database
  // For now, providing structured team data with real-time status
  const teamMembers = [
    {
      id: 1,
      name: 'Osmel P. Teran',
      role: 'CTO & Co-Founder',
      bio: 'Blockchain engineer with expertise in decentralized governance systems and smart contracts.',
      image: '/team/osmel.jpg',
      initials: 'OPT',
      active: true,
      joinDate: '2023-01-15',
      skills: ['Blockchain', 'Smart Contracts', 'System Architecture', 'DeFi'],
      social: {
        twitter: 'https://twitter.com/osmelpteran',
        linkedin: 'https://linkedin.com/in/osmelpteran',
        github: 'https://github.com/osmelpteran'
      },
      stats: {
        projectsLed: 8,
        communitiesHelped: 25,
        codeCommits: 1250
      }
    },
    {
      id: 2,
      name: 'Dionne P. Teran',
      role: 'Head of Community',
      bio: 'Community management expert with deep understanding of digital democracy and civic engagement processes.',
      image: '/team/dionne.jpg',
      initials: 'DPT',
      active: true,
      joinDate: '2023-01-20',
      skills: ['Community Management', 'Digital Democracy', 'Civic Engagement', 'User Experience'],
      social: {
        twitter: 'https://twitter.com/dionneperan',
        linkedin: 'https://linkedin.com/in/dionneperan'
      },
      stats: {
        communitiesManaged: 15,
        membersOnboarded: 500,
        engagementRate: 0.87
      }
    },
    {
      id: 3,
      name: 'AI Assistant',
      role: 'Development Partner',
      bio: 'Advanced AI system assisting in development, testing, and platform optimization.',
      image: '/team/ai.jpg',
      initials: 'AI',
      active: true,
      joinDate: '2023-12-01',
      skills: ['Code Generation', 'Testing', 'Optimization', 'Documentation'],
      social: {},
      stats: {
        codeGenerated: 50000,
        bugsFixed: 200,
        testsWritten: 800
      }
    }
  ]

  // Calculate team stats
  const teamStats = {
    totalMembers: teamMembers.length,
    activeMembers: teamMembers.filter(m => m.active).length,
    averageExperience: teamMembers.reduce((sum, m) => {
      const joinYear = new Date(m.joinDate).getFullYear()
      const currentYear = new Date().getFullYear()
      return sum + (currentYear - joinYear)
    }, 0) / teamMembers.length,
    totalProjectsLed: teamMembers.reduce((sum, m) => sum + (m.stats.projectsLed || 0), 0),
    totalCommunitiesHelped: teamMembers.reduce((sum, m) => sum + (m.stats.communitiesHelped || m.stats.communitiesManaged || 0), 0)
  }

  return {
    success: true,
    data: {
      teamMembers,
      teamStats,
      openPositions: 3, // Number of open positions
      lastUpdated: new Date().toISOString()
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    })
  }

  try {
    const teamData = await getTeamData()
    
    // Add cache headers for better performance but still allow updates
    res.setHeader('Cache-Control', 'public, max-age=600') // 10 minutes cache
    
    return res.status(200).json(teamData)
  } catch (error) {
    console.error('Team API error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error while fetching team data'
    })
  }
} 