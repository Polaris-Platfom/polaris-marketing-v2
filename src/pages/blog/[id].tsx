import React, { useState, useEffect } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Eye,
  Tag,
  ArrowRight,
  ChevronUp,
  Heart,
  Bookmark,
  MessageCircle
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

interface BlogPostDetailProps {
  post: BlogPost
  relatedPosts: BlogPost[]
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post, relatedPosts }) => {
  const { t } = useTranslation(['common', 'ui', 'blog'])
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(new Set())
  
  const { scrollYProgress } = useScroll()
  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Load likes and bookmarks from localStorage
  useEffect(() => {
    const savedLikes = localStorage.getItem('polaris-blog-likes')
    const savedBookmarks = localStorage.getItem('polaris-blog-bookmarks')
    
    if (savedLikes) {
      try {
        const likes = JSON.parse(savedLikes)
        const likesSet = new Set<string>(Array.isArray(likes) ? likes : [])
        setLikedPosts(likesSet)
        setIsLiked(likesSet.has(post.id))
      } catch (error) {
        console.error('Error loading liked posts:', error)
      }
    }
    
    if (savedBookmarks) {
      try {
        const bookmarks = JSON.parse(savedBookmarks)
        const bookmarksSet = new Set<string>(Array.isArray(bookmarks) ? bookmarks : [])
        setBookmarkedPosts(bookmarksSet)
        setIsBookmarked(bookmarksSet.has(post.id))
      } catch (error) {
        console.error('Error loading bookmarked posts:', error)
      }
    }
  }, [post.id])

  // Save likes to localStorage whenever likedPosts changes
  useEffect(() => {
    localStorage.setItem('polaris-blog-likes', JSON.stringify(Array.from(likedPosts)))
  }, [likedPosts])

  // Save bookmarks to localStorage whenever bookmarkedPosts changes
  useEffect(() => {
    localStorage.setItem('polaris-blog-bookmarks', JSON.stringify(Array.from(bookmarkedPosts)))
  }, [bookmarkedPosts])

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100
      setIsScrolled(scrolled)
      setShowScrollTop(window.scrollY > 800)
      
      // Calculate reading progress
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled_percent = (winScroll / height) * 100
      setReadingProgress(scrolled_percent)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(router.locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const translateCategory = (category: string) => {
    return t(`ui:blogPost.categories.${category}`, { defaultValue: category })
  }

  const translateTag = (tag: string) => {
    return t(`ui:blogPost.tags.${tag}`, { defaultValue: tag })
  }

  const toggleLike = () => {
    const newLikedState = !isLiked
    setIsLiked(newLikedState)
    
    setLikedPosts(prev => {
      const newSet = new Set(prev)
      if (newLikedState) {
        newSet.add(post.id)
      } else {
        newSet.delete(post.id)
      }
      return newSet
    })
  }

  const toggleBookmark = () => {
    const newBookmarkedState = !isBookmarked
    setIsBookmarked(newBookmarkedState)
    
    setBookmarkedPosts(prev => {
      const newSet = new Set(prev)
      if (newBookmarkedState) {
        newSet.add(post.id)
      } else {
        newSet.delete(post.id)
      }
      return newSet
    })
  }

  const getLikesCount = () => {
    return isLiked ? 1 : 0
  }

  const handleShare = async (platform?: 'facebook' | 'twitter' | 'linkedin') => {
    const url = window.location.href
    const title = post.title
    const text = post.excerpt

    if (platform) {
      let shareUrl = ''
      switch (platform) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
          break
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
          break
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
          break
      }
      window.open(shareUrl, '_blank', 'width=600,height=400')
    } else {
      if (navigator.share) {
        try {
          await navigator.share({ title, text, url })
        } catch (error) {
          console.log('Native sharing failed, falling back to clipboard')
          try {
            await navigator.clipboard.writeText(url)
            console.log('Link copied to clipboard')
          } catch (clipboardError) {
            console.log('Clipboard access failed')
          }
        }
      } else {
        try {
          await navigator.clipboard.writeText(url)
          console.log('Link copied to clipboard')
        } catch (clipboardError) {
          console.log('Clipboard access failed')
        }
      }
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const formatContent = (content: string) => {
    return content
      .split('\n\n')
      .map((paragraph, index) => (
        <div key={index} className="mb-8">
          <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
            {paragraph}
          </p>
        </div>
      ))
  }

  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 animate-pulse mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{post.title} - Polaris Platform</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
      </Head>

      <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-gray-100 dark:bg-gray-800 z-50">
          <div 
            className="h-full bg-gray-900 dark:bg-white transition-all duration-300"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        {/* Minimal Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 z-40"
        >
          <div className="container-polaris max-w-5xl mx-auto px-8">
            <div className="flex items-center justify-between py-4">
              <Link href="/blog">
                <motion.button
                  whileHover={{ x: -2 }}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  <ArrowLeft size={20} />
                  <span className="text-sm font-medium">{t('ui:blogPost.backToBlog')}</span>
                </motion.button>
              </Link>
              
              <div className="flex items-center space-x-4">
                {/* Engagement Buttons */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleLike}
                  className={`flex items-center space-x-1 p-2 transition-colors duration-200 ${
                    isLiked 
                      ? 'text-red-500' 
                      : 'text-gray-400 hover:text-red-500'
                  }`}
                >
                  <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                  <span className="text-sm">{getLikesCount()}</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleBookmark}
                  className={`p-2 transition-colors duration-200 ${
                    isBookmarked 
                      ? 'text-blue-500' 
                      : 'text-gray-400 hover:text-blue-500'
                  }`}
                >
                  <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-24 pb-16"
        >
          <div className="container-polaris max-w-4xl mx-auto px-8">
            <div className="space-y-8">
              {/* Meta Information */}
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium">
                  {translateCategory(post.category)}
                </span>
                <span>{formatDate(post.date)}</span>
                <span>•</span>
                <span>{t('blog:readTime', { minutes: post.readTime })}</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 dark:text-white leading-tight tracking-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
                {post.excerpt}
              </p>

              {/* Author Info and Engagement */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    {post.author.image ? (
                      <Image
                        src={post.author.image}
                        alt={post.author.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-gray-600 dark:text-gray-300 font-medium">
                        {post.author.initials}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {post.author.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {post.author.role}
                    </div>
                  </div>
                </div>

                {/* Like and Share */}
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleLike}
                    className={`flex items-center space-x-2 px-4 py-2 transition-colors duration-200 ${
                      isLiked 
                        ? 'bg-red-50 dark:bg-red-900/20 text-red-500 border border-red-200 dark:border-red-800' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-red-500 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                    <span className="text-sm font-medium">{isLiked ? 'Liked' : 'Like'}</span>
                    <span className="text-sm">({getLikesCount()})</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleShare()}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-200 dark:border-gray-700"
                  >
                    <Share2 size={16} />
                    <span className="text-sm font-medium">Share</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Featured Image */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="container-polaris max-w-5xl mx-auto px-8">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.section>

        {/* Content */}
        <section className="pb-20">
          <div className="container-polaris max-w-3xl mx-auto px-8">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="prose prose-lg max-w-none dark:prose-invert"
            >
              {formatContent(post.content)}
            </motion.article>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800"
            >
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                  {t('ui:blogPost.tagsLabel')}:
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                  >
                    {translateTag(tag)}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Author Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-16 p-8 bg-gray-50 dark:bg-gray-800/50"
            >
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                  {post.author.image ? (
                    <Image
                      src={post.author.image}
                      alt={post.author.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-gray-600 dark:text-gray-300 font-medium text-lg">
                      {post.author.initials}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                    {t('ui:blogPost.aboutAuthor', { authorName: post.author.name })}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {post.author.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {post.author.bio}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Share Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-16 text-center"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                {t('ui:blogPost.shareArticle')}
              </h3>
              <div className="flex justify-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare('facebook')}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
                >
                  <Facebook size={16} />
                  <span className="text-sm">Facebook</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare('twitter')}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-200"
                >
                  <Twitter size={16} />
                  <span className="text-sm">Twitter</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare('linkedin')}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white hover:bg-blue-800 transition-colors duration-200"
                >
                  <Linkedin size={16} />
                  <span className="text-sm">LinkedIn</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-20 bg-gray-50 dark:bg-gray-800/30">
            <div className="container-polaris max-w-5xl mx-auto px-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-2xl font-light text-gray-900 dark:text-white mb-12 text-center"
              >
                {t('ui:blogPost.relatedArticles')}
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.slice(0, 3).map((relatedPost, index) => (
                  <motion.div
                    key={relatedPost.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link href={`/blog/${relatedPost.id}`}>
                      <motion.article
                        whileHover={{ y: -2 }}
                        className="block group bg-white dark:bg-gray-800 p-6 h-full"
                      >
                        <div className="space-y-4">
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                              src={relatedPost.image}
                              alt={relatedPost.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {translateCategory(relatedPost.category)} • {formatDate(relatedPost.date)}
                          </div>
                          <h3 className="text-lg font-light text-gray-900 dark:text-white leading-tight group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200">
                            {relatedPost.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            {relatedPost.excerpt}
                          </p>
                        </div>
                      </motion.article>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 p-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 z-40"
            >
              <ChevronUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: any[] = []
  
  const locales = ['en', 'es', 'de']
  
  for (const locale of locales) {
    try {
      let posts: BlogPost[] = []
      
      if (locale === 'es') {
        posts = (await import('../../../public/data/blog-posts-es.json')).default
      } else if (locale === 'de') {
        posts = (await import('../../../public/data/blog-posts-de.json')).default
      } else {
        posts = (await import('../../../public/data/blog-posts-en.json')).default
      }
      
      posts.forEach(post => {
        paths.push({
          params: { id: post.id },
          locale
        })
      })
    } catch (error) {
      console.error(`Error loading blog posts for locale ${locale}:`, error)
    }
  }
  
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { id } = params as { id: string }
  
  try {
    let posts: BlogPost[] = []
    
    if (locale === 'es') {
      posts = (await import('../../../public/data/blog-posts-es.json')).default
    } else if (locale === 'de') {
      posts = (await import('../../../public/data/blog-posts-de.json')).default
    } else {
      posts = (await import('../../../public/data/blog-posts-en.json')).default
    }
    
    const post = posts.find(p => p.id === id)
    
    if (!post) {
      return {
        notFound: true
      }
    }
    
    // Get related posts (same category, excluding current post)
    const relatedPosts = posts
      .filter(p => p.id !== id && p.category === post.category)
      .slice(0, 3)
    
    return {
      props: {
        post,
        relatedPosts,
        ...(await serverSideTranslations(locale || 'en', ['common', 'ui', 'blog']))
      }
    }
  } catch (error) {
    console.error('Error loading blog post:', error)
    return {
      notFound: true
    }
  }
}

export default BlogPostDetail 