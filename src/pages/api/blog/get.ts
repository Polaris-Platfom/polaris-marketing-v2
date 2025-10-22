import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import { BlogPost, APIResponse } from '@/types'

/**
 * API endpoint to get a specific blog post by ID
 * GET /api/blog/get?id=1&locale=en
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<BlogPost>>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    })
  }

  try {
    const { id, locale = 'en' } = req.query

    // Validate required fields
    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Missing or invalid required field: id'
      })
    }

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

    // Find the post
    const post = posts.find(p => p.id === id)
    if (!post) {
      return res.status(404).json({
        success: false,
        error: `Blog post with id ${id} not found`
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Blog post found',
      data: post
    })
  } catch (error) {
    console.error('Error getting blog post:', error)
    return res.status(500).json({
      success: false,
      error: 'Internal server error while getting blog post'
    })
  }
}

