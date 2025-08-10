// Environment configuration for marketing app
export const ENV_CONFIG = {
  // Platform URLs - FORCED FOR DEVELOPMENT
  PLATFORM_URL: 'http://localhost:3001',
  API_URL: 'http://localhost:3002',
  
  // Common paths
  PLATFORM_LOGIN: '/auth/login',
  PLATFORM_REGISTER: '/auth/register',
  PLATFORM_DASHBOARD: '/dashboard',
  
  // Full URLs for external links
  getPlatformUrl: (path: string = '') => {
    const baseUrl = 'http://localhost:3001'
    return path ? `${baseUrl}${path}` : baseUrl
  }
}

// Quick access to common URLs
export const PLATFORM_URLS = {
  HOME: 'http://localhost:3001',
  LOGIN: 'http://localhost:3001/auth/login',
  REGISTER: 'http://localhost:3001/auth/register',
  DASHBOARD: 'http://localhost:3001/dashboard',
}

export default ENV_CONFIG