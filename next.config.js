const { i18n } = require('./next-i18next.config.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Note: 'standalone' output is not needed for Netlify
  // Netlify uses @netlify/plugin-nextjs for optimal deployment
  i18n,
  // Allow optimized loading of remote images used by blog posts
  // This enables Next.js Image Optimization for Unsplash assets
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  
  env: {
    // Force correct URLs based on NODE_ENV
    NEXT_PUBLIC_PLATFORM_URL: process.env.NODE_ENV === 'production' 
      ? 'https://app.polarisplatform.ch' 
      : 'http://localhost:3001',
    NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'production' 
      ? 'https://api.polarisplatform.ch' 
      : 'http://localhost:3002',
    NEXT_PUBLIC_MARKETING_URL: process.env.NODE_ENV === 'production'
      ? 'https://polarisplatform.ch'
      : 'http://localhost:3000',
  },

  async redirects() {
    return [
      {
        source: '/coming-soon',
        destination: process.env.NODE_ENV === 'production' 
          ? 'https://app.polarisplatform.ch' 
          : 'http://localhost:3001',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig 