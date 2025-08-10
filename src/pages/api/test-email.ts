import { NextApiRequest, NextApiResponse } from 'next'
import { testEmailConnection } from '../../lib/email'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    })
  }

  try {
    const result = await testEmailConnection()
    
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Email connection successful! SMTP is properly configured.',
        config: {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          user: process.env.SMTP_USER,
          from: process.env.SMTP_FROM,
        }
      })
    } else {
      return res.status(500).json({
        success: false,
        message: 'Email connection failed. Please check your SMTP configuration.',
        error: result.error
      })
    }

  } catch (error) {
    console.error('Email test error:', error)
    return res.status(500).json({
      success: false,
      message: 'Error testing email connection',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 