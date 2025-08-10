import React, { useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { 
  Calendar, 
  Clock, 
  User, 
  Filter,
  X,
  ArrowRight,
  Search,
  TrendingUp,
  Star,
  Grid,
  List,
  Eye,
  Heart,
  Bookmark,
  ChevronDown,
  Menu
} from 'lucide-react'

import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

interface BlogAuthor {
  name: string
  role: string
  bio: string
  image: string
  initials: string
}

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: BlogAuthor
  date: string
  category: string
  readTime: number
  image: string
  tags: string[]
  featured: boolean
}

interface BlogIndexProps {
  posts: BlogPost[]
}

const BlogIndex: React.FC<BlogIndexProps> = ({ posts }) => {
  const { t } = useTranslation(['common', 'ui', 'blog'])
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'featured'>('recent')
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts)
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [showFilters, setShowFilters] = useState(false)

  const categories = ['all', ...Array.from(new Set(posts.map(post => post.category)))]
  const featuredPost = posts.find(post => post.featured) || posts[0]

  // Load likes from localStorage
  useEffect(() => {
    const savedLikes = localStorage.getItem('polaris-blog-likes')
    
    if (savedLikes) {
      try {
        const likes = JSON.parse(savedLikes)
        setLikedPosts(new Set(likes))
      } catch (error) {
        console.error('Error loading liked posts:', error)
      }
    }
  }, [])

  // Save likes to localStorage whenever likedPosts changes
  useEffect(() => {
    localStorage.setItem('polaris-blog-likes', JSON.stringify(Array.from(likedPosts)))
  }, [likedPosts])

  // Filter and sort posts
  useEffect(() => {
    let filtered = posts

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(post => post.category === activeCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Sort posts
    filtered.sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (sortBy === 'popular') {
        return getLikesCount(b.id) - getLikesCount(a.id)
      } else if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      return 0
    })

    setFilteredPosts(filtered)
  }, [posts, activeCategory, searchTerm, sortBy, likedPosts])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const translateCategory = (category: string) => {
    return t(`blog:categories.${category}`, { defaultValue: category })
  }

  const translateTag = (tag: string) => {
    return t(`ui:blogPost.tags.${tag}`, { defaultValue: tag })
  }

  const toggleLike = (postId: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }
    
    setLikedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const getLikesCount = (postId: string) => {
    // Generate a consistent random-like number for each post
    const hash = postId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    const baseCount = Math.abs(hash) % 50 + 5
    return baseCount + (likedPosts.has(postId) ? 1 : 0)
  }

  return (
    <>
      <Head>
        <title>{t('blog:title')} - Polaris Platform</title>
        <meta name="description" content={t('blog:description')} />
        <meta property="og:title" content={`${t('blog:title')} - Polaris Platform`} />
        <meta property="og:description" content={t('blog:description')} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${t('blog:title')} - Polaris Platform`} />
        <meta name="twitter:description" content={t('blog:description')} />
      </Head>

      <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Minimal Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-24 pb-12 border-b border-gray-100 dark:border-gray-800"
        >
          <div className="container-polaris max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-4 tracking-tight"
              >
                {t('blog:title')}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              >
                {t('blog:description')}
              </motion.p>
            </div>

            {/* Simplified Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="max-w-xl mx-auto"
            >
              <div className="relative">
                <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('blog:searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-16 py-4 bg-transparent border-b border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white transition-colors duration-200 outline-none text-gray-900 dark:text-white placeholder-gray-400"
                />
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  <Filter size={20} />
                </button>
              </div>

              {/* Collapsible Filters */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 py-6 border-t border-gray-100 dark:border-gray-800 space-y-4"
                  >
                    {/* Sort Options */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Sort by
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'recent' | 'popular' | 'featured')}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:border-gray-900 dark:focus:border-white outline-none"
                      >
                        <option value="recent">{t('blog:filters.recent')}</option>
                        <option value="popular">{t('blog:filters.popular')}</option>
                        <option value="featured">{t('blog:filters.featured')}</option>
                      </select>
                    </div>

                    {/* Categories */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        value={activeCategory}
                        onChange={(e) => setActiveCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:border-gray-900 dark:focus:border-white outline-none"
                      >
                        <option value="all">{t('blog:allCategories')}</option>
                        {categories.slice(1).map((category) => (
                          <option key={category} value={category}>
                            {translateCategory(category)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Post - Hidden on mobile when filters are open */}
        {featuredPost && !showFilters && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="py-12 md:py-16 border-b border-gray-100 dark:border-gray-800"
          >
            <div className="container-polaris max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium">
                  <Star size={14} className="mr-2" />
                  Featured
                </span>
              </div>

              <Link href={`/blog/${featuredPost.id}`}>
                <motion.div
                  whileHover={{ y: -2 }}
                  className="block group"
                >
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="order-2 md:order-1">
                      <div className="space-y-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {translateCategory(featuredPost.category)} • {formatDate(featuredPost.date)}
                        </div>
                        <h2 className="text-2xl md:text-3xl font-light text-gray-900 dark:text-white leading-tight group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200">
                          {featuredPost.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                              {featuredPost.author.image ? (
                                <Image
                                  src={featuredPost.author.image}
                                  alt={featuredPost.author.name}
                                  width={40}
                                  height={40}
                                  className="object-cover"
                                />
                              ) : (
                                <span className="text-gray-600 dark:text-gray-300 font-medium text-sm">
                                  {featuredPost.author.initials}
                                </span>
                              )}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {featuredPost.author.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {t('blog:readTime', { minutes: featuredPost.readTime })}
                              </div>
                            </div>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => toggleLike(featuredPost.id, e)}
                            className={`flex items-center space-x-2 p-2 transition-colors duration-200 ${
                              likedPosts.has(featuredPost.id) 
                                ? 'text-red-500' 
                                : 'text-gray-400 hover:text-red-500'
                            }`}
                          >
                            <Heart size={16} fill={likedPosts.has(featuredPost.id) ? 'currentColor' : 'none'} />
                            <span className="text-sm">{getLikesCount(featuredPost.id)}</span>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                    <div className="order-1 md:order-2">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={featuredPost.image}
                          alt={featuredPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </div>
          </motion.section>
        )}

        {/* Blog Posts */}
        <section className="py-12 md:py-16">
          <div className="container-polaris max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Results Counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8 text-center"
            >
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {activeCategory === 'all'
                  ? t('blog:showingAllPosts', { count: filteredPosts.length })
                  : t('blog:showingCategoryPosts', { 
                      count: filteredPosts.length, 
                      category: translateCategory(activeCategory)
                    })
                }
              </p>
            </motion.div>

            {/* Posts Grid - Mobile optimized */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${sortBy}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
              >
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    layout
                  >
                    <Link href={`/blog/${post.id}`}>
                      <motion.article
                        whileHover={{ y: -2 }}
                        className="block group"
                      >
                        <div className="space-y-4">
                          {/* Image */}
                          <div className="relative aspect-[16/10] overflow-hidden">
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute top-3 left-3">
                              <span className="px-2 py-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs font-medium">
                                {translateCategory(post.category)}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="space-y-3">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {formatDate(post.date)} • {t('blog:readTime', { minutes: post.readTime })}
                            </div>
                            <h3 className="text-xl font-light text-gray-900 dark:text-white leading-tight group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                              {post.excerpt}
                            </p>
                          </div>

                          {/* Author and Actions */}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                {post.author.image ? (
                                  <Image
                                    src={post.author.image}
                                    alt={post.author.name}
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                  />
                                ) : (
                                  <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                                    {post.author.initials}
                                  </span>
                                )}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {post.author.name}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  {post.author.role}
                                </div>
                              </div>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => toggleLike(post.id, e)}
                              className={`flex items-center space-x-1 p-2 transition-colors duration-200 ${
                                likedPosts.has(post.id) 
                                  ? 'text-red-500' 
                                  : 'text-gray-400 hover:text-red-500'
                              }`}
                            >
                              <Heart size={16} fill={likedPosts.has(post.id) ? 'currentColor' : 'none'} />
                              <span className="text-sm">{getLikesCount(post.id)}</span>
                            </motion.button>
                          </div>
                        </div>
                      </motion.article>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* No Results */}
            {filteredPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-6">
                  <Search size={24} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-light text-gray-900 dark:text-white mb-4">
                  {t('blog:noResults')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your search terms or filters
                </p>
                <button 
                  onClick={() => {
                    setSearchTerm('')
                    setActiveCategory('all')
                    setShowFilters(false)
                  }}
                  className="px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  try {
    let posts: BlogPost[] = []
    
    if (locale === 'es') {
      posts = (await import('../../../public/data/blog-posts-es.json')).default
    } else if (locale === 'de') {
      posts = (await import('../../../public/data/blog-posts-de.json')).default
    } else {
      posts = (await import('../../../public/data/blog-posts-en.json')).default
    }
    
    return {
      props: {
        posts,
        ...(await serverSideTranslations(locale || 'en', ['common', 'ui', 'blog']))
      }
    }
  } catch (error) {
    console.error('Error loading blog posts:', error)
    return {
      props: {
        posts: [],
        ...(await serverSideTranslations(locale || 'en', ['common', 'ui', 'blog']))
      }
    }
  }
}

export default BlogIndex 