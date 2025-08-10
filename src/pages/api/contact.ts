import { NextApiRequest, NextApiResponse } from 'next'
import { sendContactEmail, ContactFormData } from '../../lib/email'

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
    const { name, email, phone, company, message }: ContactFormData = req.body

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields'
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      })
    }

    // Validate message length
    if (message.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Message must be at least 10 characters long'
      })
    }

    // Send email
    const result = await sendContactEmail({
      name,
      email,
      phone,
      company,
      message
    })

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Message sent successfully! We will contact you soon.'
      })
    } else {
      console.error('Contact email error:', result.error)
      return res.status(500).json({
        success: false,
        message: 'Error sending message. Please try again later.'
      })
    }

  } catch (error) {
    console.error('Contact API error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    })
  }
} 