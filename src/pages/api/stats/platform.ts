import { NextApiRequest, NextApiResponse } from 'next'

// Database functions - waiting for real database connection
const getPlatformStats = async () => {
  // TODO: Connect to real database
  // For now, return empty state to show loading until real data is available
  
  return {
    success: true,
    data: {
      totalCommunities: 0,
      totalFundsManaged: 0,
      totalMembers: 0,
      totalProjects: 0,
      totalFundsRaised: 0,
      totalVotes: 0,
      averageParticipationRate: 0,
      monthlyGrowth: 0,
      lastUpdated: new Date().toISOString(),
      topCommunities: [],
      recentActivities: []
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
    const stats = await getPlatformStats()
    
    // Add cache headers to prevent stale data
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0')
    
    return res.status(200).json(stats)
  } catch (error) {
    console.error('Platform stats API error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error while fetching platform statistics'
    })
  }
} 