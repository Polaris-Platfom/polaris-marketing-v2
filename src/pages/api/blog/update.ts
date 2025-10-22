import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import { BlogPost, APIResponse } from '@/types'

/**
 * API endpoint to update an existing blog post
 * PUT /api/blog/update
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<BlogPost>>
) {
  // Only allow PUT requests
  if (req.method !== 'PUT') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    })
  }

  try {
    const {
      id,
      title,
      excerpt,
      content,
      author,
      category,
      readTime,
      image,
      tags,
      featured,
      locale = 'en'
    } = req.body

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

    // Find the post to update
    const postIndex = posts.findIndex(post => post.id === id)
    if (postIndex === -1) {
      return res.status(404).json({
        success: false,
        error: `Blog post with id ${id} not found`
      })
    }

    // Update post with provided fields (only update fields that are provided)
    const existingPost = posts[postIndex]
    const updatedPost: BlogPost = {
      ...existingPost,
      ...(title !== undefined && { title }),
      ...(excerpt !== undefined && { excerpt }),
      ...(content !== undefined && { content }),
      ...(author !== undefined && { author }),
      ...(category !== undefined && { category }),
      ...(readTime !== undefined && { readTime }),
      ...(image !== undefined && { image }),
      ...(tags !== undefined && { tags }),
      ...(featured !== undefined && { featured })
    }

    // Replace the post in the array
    posts[postIndex] = updatedPost

    // Write updated posts back to file
    await fs.writeFile(filePath, JSON.stringify(posts, null, 2), 'utf-8')

    return res.status(200).json({
      success: true,
      message: 'Blog post updated successfully',
      data: updatedPost
    })
  } catch (error) {
    console.error('Error updating blog post:', error)
    return res.status(500).json({
      success: false,
      error: 'Internal server error while updating blog post'
    })
  }
}

