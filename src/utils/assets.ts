// Polaris Assets Utility
// This module provides easy access to all Polaris brand assets

export const POLARIS_BRAND = {
  name: 'Polaris',
  description: 'Democratic Funding Platform',
  colors: {
    primary: '#3B82F6',
    accent: '#8B5CF6',
    darkPrimary: '#1E40AF',
    darkAccent: '#6B21A8',
    lightPrimary: '#60A5FA',
    lightAccent: '#A78BFA'
  }
} as const

export const POLARIS_LOGOS = {
  main: {
    svg: '/assets/logos/polaris-logo.svg',
    png64: '/assets/logos/polaris-logo-64.png',
    png128: '/assets/logos/polaris-logo-128.png',
    size: '32x32'
  },
  horizontal: {
    svg: '/assets/logos/polaris-logo-horizontal.svg',
    png: '/assets/logos/polaris-logo-horizontal.png',
    size: '200x40'
  },
  vertical: {
    svg: '/assets/logos/polaris-logo-vertical.svg',
    png: '/assets/logos/polaris-logo-vertical.png',
    size: '80x80'
  },
  variants: {
    dark: '/assets/logos/polaris-logo-dark.svg',
    light: '/assets/logos/polaris-logo-light.svg'
  }
} as const

export const POLARIS_ICONS = {
  favicon: '/assets/icons/favicon.ico',
  favicon16: '/assets/icons/favicon-16x16.png',
  favicon32: '/assets/icons/favicon-32x32.png',
  appleTouch: '/assets/icons/apple-touch-icon.png'
} as const

// Utility function to get the appropriate logo based on theme
export const getPolarisLogo = (theme: 'light' | 'dark' = 'light', format: 'svg' | 'png' = 'svg') => {
  if (theme === 'dark') {
    return POLARIS_LOGOS.variants.light // Use light variant on dark backgrounds
  }
  if (theme === 'light') {
    return POLARIS_LOGOS.variants.dark // Use dark variant on light backgrounds
  }
  return format === 'svg' ? POLARIS_LOGOS.main.svg : POLARIS_LOGOS.main.png64
}

// Utility function to get horizontal logo
export const getHorizontalLogo = (format: 'svg' | 'png' = 'svg') => {
  return format === 'svg' ? POLARIS_LOGOS.horizontal.svg : POLARIS_LOGOS.horizontal.png
}

// Utility function to get vertical logo
export const getVerticalLogo = (format: 'svg' | 'png' = 'svg') => {
  return format === 'svg' ? POLARIS_LOGOS.vertical.svg : POLARIS_LOGOS.vertical.png
}

// Type exports for TypeScript support
export type PolarisTheme = 'light' | 'dark'
export type PolarisFormat = 'svg' | 'png'
export type PolarisLogoVariant = 'main' | 'horizontal' | 'vertical' | 'dark' | 'light' 