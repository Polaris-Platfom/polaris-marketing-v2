import { useRealTimeData } from './useRealTimeData'

// TypeScript interfaces for testimonials
export interface Testimonial {
  id: number
  quote: string
  author: string
  role: string
  community: string
  verified: boolean
  rating: number
  date: string
  avatar?: string
}

export interface TestimonialsData {
  testimonials: Testimonial[]
  totalCount: number
  averageRating: number
  verifiedCount: number
  lastUpdated: string
}

export interface UseTestimonialsOptions {
  refreshInterval?: number
  enabled?: boolean
  onSuccess?: (data: TestimonialsData) => void
  onError?: (error: Error) => void
}

export function useTestimonials(options: UseTestimonialsOptions = {}) {
  const {
    refreshInterval = 60000, // 1 minute default (testimonials change less frequently)
    enabled = true,
    onSuccess,
    onError
  } = options

  const result = useRealTimeData<TestimonialsData>(
    '/api/testimonials',
    {
      refreshInterval,
      enabled,
      onSuccess,
      onError,
      retryCount: 2,
      retryDelay: 3000
    }
  )

  // Format testimonials for display
  const getFormattedTestimonials = () => {
    if (!result.data) return []

    return result.data.testimonials.map(testimonial => ({
      ...testimonial,
      shortQuote: testimonial.quote.length > 150 
        ? testimonial.quote.substring(0, 150) + '...'
        : testimonial.quote,
      initials: testimonial.author
        .split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase(),
      displayDate: formatDate(testimonial.date),
      ratingStars: '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating)
    }))
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return 'Today'
    if (diffInDays === 1) return 'Yesterday'
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
    return `${Math.floor(diffInDays / 365)} years ago`
  }

  // Get testimonials stats for display
  const getStats = () => {
    if (!result.data) return null

    return {
      total: result.data.totalCount,
      verified: result.data.verifiedCount,
      averageRating: result.data.averageRating,
      verificationRate: result.data.verifiedCount / result.data.totalCount,
      formattedRating: result.data.averageRating.toFixed(1),
      ratingStars: '★'.repeat(Math.floor(result.data.averageRating)) + 
                   (result.data.averageRating % 1 >= 0.5 ? '★' : '☆')
    }
  }

  // Get random testimonial for spotlight
  const getRandomTestimonial = () => {
    if (!result.data || result.data.testimonials.length === 0) return null

    const randomIndex = Math.floor(Math.random() * result.data.testimonials.length)
    return result.data.testimonials[randomIndex]
  }

  // Check if testimonials are fresh (updated within last 30 minutes)
  const isFreshData = () => {
    if (!result.data || !result.lastUpdated) return false
    
    const lastUpdate = new Date(result.lastUpdated)
    const now = new Date()
    const diffInMinutes = (now.getTime() - lastUpdate.getTime()) / (1000 * 60)
    
    return diffInMinutes < 30
  }

  return {
    ...result,
    testimonials: getFormattedTestimonials(),
    stats: getStats(),
    randomTestimonial: getRandomTestimonial(),
    isFreshData: isFreshData()
  }
} 