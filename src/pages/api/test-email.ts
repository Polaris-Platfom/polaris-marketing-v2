import { NextApiRequest, NextApiResponse } from 'next'
import { testConnection, sendEmail } from '../../lib/supabase'

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
    // Test Supabase connection
    const supabaseResult = await testConnection()
    
    if (!supabaseResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Supabase connection failed. Please check your configuration.',
        error: supabaseResult.message,
        config: {
          url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'configured' : 'missing',
          anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'configured' : 'missing',
        }
      })
    }

    // Test email function with a test payload
    const emailResult = await sendEmail({
      type: 'contact',
      data: {
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test message from the API test endpoint.'
      }
    })

    if (emailResult.success) {
      return res.status(200).json({
        success: true,
        message: 'Supabase and email function are working correctly!',
        tests: {
          supabase: 'connected',
          emailFunction: 'working',
        },
        config: {
          supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'configured' : 'missing',
          supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'configured' : 'missing',
        }
      })
    } else {
      return res.status(500).json({
        success: false,
        message: 'Email function test failed. Check Edge Function logs in Supabase dashboard.',
        error: emailResult.error,
        tests: {
          supabase: 'connected',
          emailFunction: 'failed',
        }
      })
    }

  } catch (error) {
    console.error('Test error:', error)
    return res.status(500).json({
      success: false,
      message: 'Error running tests',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 