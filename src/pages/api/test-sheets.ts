import { NextApiRequest, NextApiResponse } from 'next'
import { testSheetsConnection } from '../../lib/googleSheets'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    })
  }

  try {
    const result = await testSheetsConnection()

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: result.message
      })
    } else {
      console.error('Google Sheets test error:', result.error)
      return res.status(500).json({
        success: false,
        message: result.message,
        error: result.error?.message || 'Unknown error'
      })
    }

  } catch (error) {
    console.error('Test sheets API error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error while testing Google Sheets connection'
    })
  }
} 