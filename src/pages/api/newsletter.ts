import { NextApiRequest, NextApiResponse } from 'next'
import { addSubscriber, checkEmailExists, sendEmail } from '../../lib/supabase'

// Interface for newsletter form data
interface NewsletterFormData {
  email: string
  name?: string
  source: string
  language?: string
}

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
    const { email, name, source, language }: NewsletterFormData = req.body

    // Validate required fields
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
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

    // Validate language if provided
    if (language && !['en', 'es', 'de'].includes(language)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid language. Supported languages: en, es, de'
      })
    }

    // Set default values if not provided
    const newsletterData: NewsletterFormData = {
      email,
      name,
      source: source || 'website',
      language: language || 'es' // Default to Spanish
    }

    // Check if email already exists in Supabase
    const emailExistsResult = await checkEmailExists(email)
    if (emailExistsResult.exists) {
      // Return appropriate message based on language
      const duplicateMessage = newsletterData.language === 'en' 
        ? 'This email address is already subscribed to our newsletter. Thank you for your interest!'
        : 'Este email ya está suscrito a nuestro newsletter. ¡Gracias por tu interés!'
      
      return res.status(409).json({
        success: false,
        message: duplicateMessage,
        code: 'ALREADY_SUBSCRIBED'
      })
    }

    // Add subscriber to Supabase
    const supabaseResult = await addSubscriber({
      email: newsletterData.email,
      name: newsletterData.name,
      source: newsletterData.source,
      language: newsletterData.language || 'es',
    })

    if (!supabaseResult.success) {
      console.error('Failed to add subscriber to Supabase:', supabaseResult.error)
      
      // Check if it's a duplicate error (shouldn't happen after our check, but just in case)
      if (supabaseResult.error?.code === 'ALREADY_SUBSCRIBED') {
        const duplicateMessage = newsletterData.language === 'en' 
          ? 'This email address is already subscribed to our newsletter.'
          : 'Este email ya está suscrito a nuestro newsletter.'
        
        return res.status(409).json({
          success: false,
          message: duplicateMessage,
          code: 'ALREADY_SUBSCRIBED'
        })
      }

      // Return error message in the appropriate language
      const errorMessage = newsletterData.language === 'en'
        ? 'Error subscribing to newsletter. Please try again later.'
        : 'Error al suscribirte al newsletter. Por favor intenta de nuevo más tarde.'
      
      return res.status(500).json({
        success: false,
        message: errorMessage
      })
    }

    console.log('Subscriber successfully added to Supabase:', email)

    // Send notification email to admin via Edge Function
    const adminEmailResult = await sendEmail({
      type: 'newsletter',
      data: newsletterData,
      language: newsletterData.language,
    })

    if (!adminEmailResult.success) {
      console.warn('Failed to send admin notification email:', adminEmailResult.error)
      // Continue - user is subscribed even if admin notification fails
    }

    // Send welcome email to subscriber via Edge Function
    const welcomeEmailResult = await sendEmail({
      type: 'newsletter_welcome',
      data: newsletterData,
      language: newsletterData.language,
    })

    if (!welcomeEmailResult.success) {
      console.warn('Failed to send welcome email:', welcomeEmailResult.error)
      // Continue - user is subscribed even if welcome email fails
    }

    // Return success message in the appropriate language
    const message = newsletterData.language === 'en' 
      ? 'Successfully subscribed to newsletter! Check your email for confirmation.'
      : 'Te has suscrito exitosamente al newsletter. Revisa tu email para confirmación.'
    
    return res.status(200).json({
      success: true,
      message,
    })

  } catch (error) {
    console.error('Newsletter API error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    })
  }
} 