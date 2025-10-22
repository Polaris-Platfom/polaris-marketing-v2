import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import { BlogPost, APIResponse } from '@/types'

/**
 * API endpoint to list all blog posts
 * GET /api/blog/list?locale=en&category=technology&featured=true&limit=10
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<BlogPost[]>>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    })
  }

  try {
    const { locale = 'en', category, featured, limit } = req.query

    // Validate locale
    const validLocales = ['en', 'es', 'de']
    if (!validLocales.includes(locale as string)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid locale. Must be one of: en, es, de'
      })
    }

    // Read posts for the specified locale
    const filePath = path.join(
      process.cwd(),
      'public',
      'data',
      `blog-posts-${locale}.json`
    )

    let posts: BlogPost[] = []
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8')
      posts = JSON.parse(fileContent)
    } catch (error) {
      return res.status(404).json({
        success: false,
        error: `Blog posts file not found for locale: ${locale}`
      })
    }

    // Filter by category if provided
    if (category && typeof category === 'string') {
      posts = posts.filter(post => post.category === category)
    }

    // Filter by featured if provided
    if (featured !== undefined) {
      const isFeatured = featured === 'true'
      posts = posts.filter(post => post.featured === isFeatured)
    }

    // Limit results if provided
    if (limit && typeof limit === 'string') {
      const limitNum = parseInt(limit)
      if (!isNaN(limitNum) && limitNum > 0) {
        posts = posts.slice(0, limitNum)
      }
    }

    return res.status(200).json({
      success: true,
      message: `Found ${posts.length} blog posts`,
      data: posts
    })
  } catch (error) {
    console.error('Error listing blog posts:', error)
    return res.status(500).json({
      success: false,
      error: 'Internal server error while listing blog posts'
    })
  }
}

