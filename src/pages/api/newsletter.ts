import { NextApiRequest, NextApiResponse } from 'next'
import { sendNewsletterEmail, NewsletterFormData } from '../../lib/email'
import { addSubscriberToSheet, checkEmailExists, SubscriberData } from '../../lib/googleSheets'

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
    if (language && !['en', 'es'].includes(language)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid language. Supported languages: en, es'
      })
    }

    // Check if email already exists in Google Sheets
    try {
      const emailExistsResult = await checkEmailExists(email)
      if (emailExistsResult.exists) {
        // Return appropriate message based on language
        const duplicateMessage = language === 'en' 
          ? 'This email address is already subscribed to our newsletter. Thank you for your interest!'
          : 'Este email ya está suscrito a nuestro newsletter. ¡Gracias por tu interés!'
        
        return res.status(409).json({
          success: false,
          message: duplicateMessage,
          code: 'ALREADY_SUBSCRIBED'
        })
      }
    } catch (checkError) {
      // If we can't check for duplicates, continue with normal flow
      console.warn('Error checking email existence - continuing with subscription:', checkError)
    }

    // Set default values if not provided
    const newsletterData: NewsletterFormData = {
      email,
      name,
      source: source || 'website',
      language: language || 'es' // Default to Spanish
    }

    // Send email
    const emailResult = await sendNewsletterEmail(newsletterData)

    // Prepare data for Google Sheets
    const subscriberData: SubscriberData = {
      name: newsletterData.name,
      email: newsletterData.email,
      source: newsletterData.source,
      language: newsletterData.language || 'es', // Ensure language is always a string
      subscriptionDate: new Date().toISOString()
    }

    // Save to Google Sheets (don't fail if this fails - email is the priority)
    let sheetsResult = null
    try {
      sheetsResult = await addSubscriberToSheet(subscriberData)
      if (sheetsResult.success) {
        console.log('Subscriber successfully added to Google Sheets:', email)
      } else {
        console.warn('Failed to add subscriber to Google Sheets (but email sent):', sheetsResult.error)
      }
    } catch (sheetsError) {
      console.warn('Error saving to Google Sheets (but email sent):', sheetsError)
    }

    if (emailResult.success) {
      // Return success message in the appropriate language
      const message = newsletterData.language === 'en' 
        ? 'Successfully subscribed to newsletter! Check your email for confirmation.'
        : 'Te has suscrito exitosamente al newsletter. Revisa tu email para confirmación.'
      
      return res.status(200).json({
        success: true,
        message,
        // Optionally include Google Sheets status for debugging
        sheetsStatus: sheetsResult?.success ? 'saved' : 'failed'
      })
    } else {
      console.error('Newsletter email error:', emailResult.error)
      
      // Return error message in the appropriate language
      const errorMessage = newsletterData.language === 'en'
        ? 'Error subscribing to newsletter. Please try again later.'
        : 'Error al suscribirte al newsletter. Por favor intenta de nuevo más tarde.'
      
      return res.status(500).json({
        success: false,
        message: errorMessage
      })
    }

  } catch (error) {
    console.error('Newsletter API error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    })
  }
} 