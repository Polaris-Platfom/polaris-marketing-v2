import { NextApiRequest, NextApiResponse } from 'next'

// Mock database functions - replace with real database calls
const getTestimonials = async () => {
  // This would normally connect to your database
  // For now, simulating real testimonials with more variety
  const testimonials = [
    {
      id: 1,
      quote: "Polaris has revolutionized how we make decisions in our co-op. The transparency and ease of use is incredible.",
      author: "Maria González",
      role: "Community Leader",
      community: "Green Valley Co-op",
      verified: true,
      rating: 5,
      date: "2024-01-15",
      avatar: "/testimonials/maria.jpg"
    },
    {
      id: 2,
      quote: "Managing multiple neighborhood associations was chaotic before Polaris. Now everything is organized and democratic.",
      author: "David Chen",
      role: "Municipal Coordinator",
      community: "City of Portland",
      verified: true,
      rating: 5,
      date: "2024-01-20",
      avatar: "/testimonials/david.jpg"
    },
    {
      id: 3,
      quote: "The funding features helped us raise $50k for our community garden. The process was transparent and engaging.",
      author: "Sarah Williams",
      role: "Project Manager",
      community: "Urban Gardens Network",
      verified: true,
      rating: 5,
      date: "2024-01-25",
      avatar: "/testimonials/sarah.jpg"
    },
    {
      id: 4,
      quote: "Real-time voting results and complete transparency in fund allocation builds trust in our community.",
      author: "Ahmed Hassan",
      role: "Tech Lead",
      community: "Tech Entrepreneurs",
      verified: true,
      rating: 5,
      date: "2024-02-01",
      avatar: "/testimonials/ahmed.jpg"
    },
    {
      id: 5,
      quote: "The platform's analytics helped us understand our community better and make data-driven decisions.",
      author: "Elena Rodriguez",
      role: "Data Analyst",
      community: "Local Arts Initiative",
      verified: true,
      rating: 5,
      date: "2024-02-10",
      avatar: "/testimonials/elena.jpg"
    },
    {
      id: 6,
      quote: "Mobile-first design means our members can participate anywhere. Participation rates increased by 40%.",
      author: "James Thompson",
      role: "Community Manager",
      community: "Neighborhood Watch",
      verified: true,
      rating: 5,
      date: "2024-02-15",
      avatar: "/testimonials/james.jpg"
    }
  ]

  // Randomly select 3 testimonials to show variety
  const shuffled = testimonials.sort(() => 0.5 - Math.random())
  const selected = shuffled.slice(0, 3)

  return {
    success: true,
    data: {
      testimonials: selected,
      totalCount: testimonials.length,
      averageRating: testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length,
      verifiedCount: testimonials.filter(t => t.verified).length,
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
    const testimonials = await getTestimonials()
    
    // Add cache headers for better performance but still allow updates
    res.setHeader('Cache-Control', 'public, max-age=300') // 5 minutes cache
    
    return res.status(200).json(testimonials)
  } catch (error) {
    console.error('Testimonials API error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error while fetching testimonials'
    })
  }
} 