import { NextApiRequest, NextApiResponse } from 'next'
import { addJobApplication, sendEmail } from '../../lib/supabase'

// Interface for job application data
interface JobApplicationData {
  name: string
  email: string
  phone?: string
  resume: string
  coverLetter: string
  position: string
  language?: string
  privacyConsent: boolean
  applicationDate?: string
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
    if (language && !['en', 'es', 'de'].includes(language)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid language. Supported languages: en, es, de'
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

    // Save to Supabase
    const supabaseResult = await addJobApplication({
      name: applicationData.name,
      email: applicationData.email,
      phone: applicationData.phone,
      position: applicationData.position,
      resume: applicationData.resume,
      cover_letter: applicationData.coverLetter,
      language: applicationData.language || 'es',
      privacy_consent: applicationData.privacyConsent,
    })

    if (!supabaseResult.success) {
      console.error('Failed to add job application to Supabase:', supabaseResult.error)
      
      // Return error message in the appropriate language
      const errorMessage = applicationData.language === 'en'
        ? 'Error submitting application. Please try again later.'
        : 'Error al enviar la aplicación. Por favor intenta de nuevo más tarde.'
      
      return res.status(500).json({
        success: false,
        message: errorMessage
      })
    }

    console.log('Job application successfully added to Supabase:', email)

    // Send notification email to admin via Edge Function
    const adminEmailResult = await sendEmail({
      type: 'job_application',
      data: {
        name: applicationData.name,
        email: applicationData.email,
        phone: applicationData.phone,
        position: applicationData.position,
        resume: applicationData.resume,
        coverLetter: applicationData.coverLetter,
      },
      language: applicationData.language,
    })

    if (!adminEmailResult.success) {
      console.warn('Failed to send admin notification email:', adminEmailResult.error)
      // Continue - application is saved even if admin notification fails
    }

    // Send confirmation email to applicant via Edge Function
    const confirmationEmailResult = await sendEmail({
      type: 'job_application_confirmation',
      data: {
        name: applicationData.name,
        email: applicationData.email,
        position: applicationData.position,
      },
      language: applicationData.language,
    })

    if (!confirmationEmailResult.success) {
      console.warn('Failed to send confirmation email:', confirmationEmailResult.error)
      // Continue - application is saved even if confirmation email fails
    }

    // Return success message in the appropriate language
    const message = applicationData.language === 'en' 
      ? 'Application submitted successfully! We will contact you soon.'
      : 'Aplicación enviada exitosamente! Te contactaremos pronto.'
    
    return res.status(200).json({
      success: true,
      message,
    })

  } catch (error) {
    console.error('Job application API error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    })
  }
} 