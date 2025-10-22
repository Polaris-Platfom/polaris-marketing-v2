import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import { BlogPost, APIResponse } from '@/types'

/**
 * API endpoint to create a new blog post
 * POST /api/blog/create
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<BlogPost>>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    })
  }

  try {
    const {
      title,
      excerpt,
      content,
      author,
      category,
      readTime,
      image,
      tags,
      featured = false,
      locale = 'en'
    } = req.body

    // Validate required fields
    if (!title || !excerpt || !content || !author || !category) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: title, excerpt, content, author, category'
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
      // If file doesn't exist, start with empty array
      console.log(`Creating new blog posts file for locale: ${locale}`)
    }

    // Generate new ID (increment from highest existing ID)
    const maxId = posts.reduce((max, post) => {
      const id = parseInt(post.id)
      return id > max ? id : max
    }, 0)
    const newId = (maxId + 1).toString()

    // Create new post object
    const newPost: BlogPost = {
      id: newId,
      title,
      excerpt,
      content,
      author,
      date: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
      category,
      readTime: readTime || Math.ceil(content.split(' ').length / 200), // Estimate reading time
      image,
      tags: tags || [],
      featured: featured || false
    }

    // Add new post to the beginning of the array
    posts.unshift(newPost)

    // Write updated posts back to file
    await fs.writeFile(filePath, JSON.stringify(posts, null, 2), 'utf-8')

    return res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: newPost
    })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return res.status(500).json({
      success: false,
      error: 'Internal server error while creating blog post'
    })
  }
}

