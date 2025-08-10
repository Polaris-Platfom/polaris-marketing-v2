import { NextApiRequest, NextApiResponse } from 'next'
import { sendJobApplicationEmail, JobApplicationData } from '../../lib/email'
import { addJobApplicationToSheet } from '../../lib/googleSheets'

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
    const { 
      name, 
      email, 
      phone, 
      resume, 
      coverLetter, 
      position, 
      language,
      privacyConsent 
    }: JobApplicationData = req.body

    // Validate required fields
    if (!name || !email || !resume || !coverLetter || !position) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, resume, cover letter, and position are required fields'
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

    // Validate cover letter length
    if (coverLetter.length < 50) {
      return res.status(400).json({
        success: false,
        message: 'Cover letter must be at least 50 characters long'
      })
    }

    // Validate privacy consent
    if (!privacyConsent) {
      return res.status(400).json({
        success: false,
        message: 'Privacy consent is required'
      })
    }

    // Validate language if provided
    if (language && !['en', 'es'].includes(language)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid language. Supported languages: en, es'
      })
    }

    // Set default values
    const applicationData: JobApplicationData = {
      name,
      email,
      phone,
      resume,
      coverLetter,
      position,
      language: language || 'es',
      privacyConsent,
      applicationDate: new Date().toISOString()
    }

    // Send email notification
    const emailResult = await sendJobApplicationEmail(applicationData)

    // Save to Google Sheets (don't fail if this fails - email is the priority)
    let sheetsResult = null
    try {
      sheetsResult = await addJobApplicationToSheet(applicationData)
      if (sheetsResult.success) {
        console.log('Job application successfully added to Google Sheets:', email)
      } else {
        console.warn('Failed to add job application to Google Sheets (but email sent):', sheetsResult.error)
      }
    } catch (sheetsError) {
      console.warn('Error saving job application to Google Sheets (but email sent):', sheetsError)
    }

    if (emailResult.success) {
      // Return success message in the appropriate language
      const message = applicationData.language === 'en' 
        ? 'Application submitted successfully! We will contact you soon.'
        : 'Aplicación enviada exitosamente! Te contactaremos pronto.'
      
      return res.status(200).json({
        success: true,
        message,
        // Optionally include Google Sheets status for debugging
        sheetsStatus: sheetsResult?.success ? 'saved' : 'failed'
      })
    } else {
      console.error('Job application email error:', emailResult.error)
      
      // Return error message in the appropriate language
      const errorMessage = applicationData.language === 'en'
        ? 'Error submitting application. Please try again later.'
        : 'Error al enviar la aplicación. Por favor intenta de nuevo más tarde.'
      
      return res.status(500).json({
        success: false,
        message: errorMessage
      })
    }

  } catch (error) {
    console.error('Job application API error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    })
  }
} 