import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  Users, 
  Settings, 
  LogOut, 
  ChevronDown, 
  Plus,
  Bell,
  Search,
  Menu,
  X,
  Building,
  User
} from 'lucide-react'
import Button from '../ui/Button'
// import { useTheme } from '../../contexts/ThemeContext' // TODO: Implement theme context

interface Community {
  id: string
  name: string
  role: 'admin' | 'member' | 'viewer'
}

interface AppLayoutProps {
  children: React.ReactNode
  currentCommunity?: Community | null
}

// Mock data - will be replaced with real data from context/API
const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: null,
  communities: [
    { id: '1', name: 'Downtown Community', role: 'admin' as const },
    { id: '2', name: 'Green Initiative', role: 'member' as const },
    { id: '3', name: 'Tech Entrepreneurs', role: 'admin' as const },
  ]
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, currentCommunity }) => {
  const router = useRouter()
  // const { theme, toggleTheme } = useTheme() // TODO: Implement theme context
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isCommunityMenuOpen, setIsCommunityMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    // TODO: Implement logout logic
            router.push('/coming-soon')
  }

  const isActivePath = (path: string) => {
    return router.pathname === path || router.pathname.startsWith(path)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'text-primary-600 dark:text-primary-400'
      case 'member':
        return 'text-green-600 dark:text-green-400'
      case 'viewer':
        return 'text-gray-600 dark:text-gray-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  const mainNavigation = [
    {
      name: 'Dashboard',
      href: '/app/dashboard',
      icon: Home,
      active: isActivePath('/app/dashboard')
    },
    {
      name: 'Communities',
      href: '/app/communities',
      icon: Building,
      active: isActivePath('/app/communities')
    },
  ]

  // Community-specific navigation (shown when a community is selected)
  const communityNavigation = currentCommunity ? [
    {
      name: 'Overview',
      href: `/app/communities/${currentCommunity.id}`,
      active: router.pathname === `/app/communities/[id]`
    },
    {
      name: 'Proposals',
      href: `/app/communities/${currentCommunity.id}/proposals`,
      active: isActivePath(`/app/communities/${currentCommunity.id}/proposals`)
    },
    {
      name: 'Wallet',
      href: `/app/communities/${currentCommunity.id}/wallet`,
      active: isActivePath(`/app/communities/${currentCommunity.id}/wallet`)
    },
    {
      name: 'Members',
      href: `/app/communities/${currentCommunity.id}/members`,
      active: isActivePath(`/app/communities/${currentCommunity.id}/members`)
    },
    ...(currentCommunity.role === 'admin' ? [{
      name: 'Settings',
      href: `/app/communities/${currentCommunity.id}/settings`,
      active: isActivePath(`/app/communities/${currentCommunity.id}/settings`)
    }] : [])
  ] : []

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            {/* Logo */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <Link href="/app/dashboard" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <span className="ml-2 text-xl font-heading font-bold text-gray-900 dark:text-white">
                  Polaris
                </span>
              </Link>
            </div>

            {/* Community Selector */}
            {currentCommunity && (
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <button
                    onClick={() => setIsCommunityMenuOpen(!isCommunityMenuOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 text-left bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {currentCommunity.name}
                      </p>
                      <p className={`text-xs capitalize ${getRoleColor(currentCommunity.role)}`}>
                        {currentCommunity.role}
                      </p>
                    </div>
                    <ChevronDown size={16} className="text-gray-400" />
                  </button>

                  <AnimatePresence>
                    {isCommunityMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20"
                      >
                        <div className="py-1">
                          {mockUser.communities.map((community) => (
                            <Link
                              key={community.id}
                              href={`/app/communities/${community.id}`}
                              className="block px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700"
                              onClick={() => setIsCommunityMenuOpen(false)}
                            >
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {community.name}
                              </p>
                              <p className={`text-xs capitalize ${getRoleColor(community.role)}`}>
                                {community.role}
                              </p>
                            </Link>
                          ))}
                          <div className="border-t border-gray-200 dark:border-gray-700 mt-1 pt-1">
                            <Link
                              href="/app/communities"
                              className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                              onClick={() => setIsCommunityMenuOpen(false)}
                            >
                              View All Communities
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-1">
              {/* Main Navigation */}
              {mainNavigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      item.active
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon size={18} className="mr-3" />
                    {item.name}
                  </Link>
                )
              })}

              {/* Community-specific navigation */}
              {communityNavigation.length > 0 && (
                <>
                  <div className="pt-4 pb-2">
                    <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Community
                    </h3>
                  </div>
                  {communityNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        item.active
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </>
              )}
            </nav>

            {/* User menu */}
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="w-full flex items-center px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {mockUser.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {mockUser.email}
                    </p>
                  </div>
                  <ChevronDown size={16} className="text-gray-400" />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full left-0 right-0 mb-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20"
                    >
                      <div className="py-1">
                        <Link
                          href="/app/profile"
                          className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <User size={16} className="mr-3" />
                          Profile
                        </Link>
                        <Link
                          href="/app/settings"
                          className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <Settings size={16} className="mr-3" />
                          Settings
                        </Link>
                        <div className="border-t border-gray-200 dark:border-gray-700 mt-1 pt-1">
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            <LogOut size={16} className="mr-3" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div 
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="relative flex flex-col w-64 bg-white dark:bg-gray-800 h-full shadow-xl"
            >
              {/* Mobile menu content - same as sidebar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <Link href="/app/dashboard" className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">P</span>
                  </div>
                  <span className="ml-2 text-xl font-heading font-bold text-gray-900 dark:text-white">
                    Polaris
                  </span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X size={20} />
                </button>
              </div>
              {/* Rest of mobile menu content... */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar for mobile */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <Menu size={20} />
          </button>
          <Link href="/app/dashboard" className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="ml-2 text-xl font-heading font-bold text-gray-900 dark:text-white">
              Polaris
            </span>
          </Link>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppLayout 