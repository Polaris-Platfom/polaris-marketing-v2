import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import { BlogPost, APIResponse } from '@/types'

/**
 * API endpoint to delete a blog post
 * DELETE /api/blog/delete
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<{ id: string }>>
) {
  // Only allow DELETE requests
  if (req.method !== 'DELETE') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    })
  }

  try {
    const { id, locale = 'en' } = req.body

    // Validate required fields
    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: id'
      })
    }

    // Validate locale
    const validLocales = ['en', 'es', 'de']
    if (!validLocales.includes(locale)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid locale. Must be one of: en, es, de'
      })
    }

    // Read existing posts for the specified locale
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

    // Find the post to delete
    const postIndex = posts.findIndex(post => post.id === id)
    if (postIndex === -1) {
      return res.status(404).json({
        success: false,
        error: `Blog post with id ${id} not found`
      })
    }

    // Remove the post from the array
    posts.splice(postIndex, 1)

    // Write updated posts back to file
    await fs.writeFile(filePath, JSON.stringify(posts, null, 2), 'utf-8')

    return res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully',
      data: { id }
    })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return res.status(500).json({
      success: false,
      error: 'Internal server error while deleting blog post'
    })
  }
}

