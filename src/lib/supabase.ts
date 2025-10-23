import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials not found. Please check your environment variables.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our marketing tables
export interface NewsletterSubscriber {
  id?: string
  email: string
  name?: string
  source: string
  language: string
  status?: 'active' | 'unsubscribed'
  subscribed_at?: string
  unsubscribed_at?: string
  created_at?: string
  updated_at?: string
}

export interface JobApplication {
  id?: string
  name: string
  email: string
  phone?: string
  position: string
  resume: string
  cover_letter: string
  language: string
  privacy_consent: boolean
  status?: 'pending' | 'reviewed' | 'rejected' | 'hired'
  notes?: string
  created_at?: string
  updated_at?: string
}

// Email types for Edge Function
export interface EmailPayload {
  type: 'contact' | 'newsletter' | 'newsletter_welcome' | 'job_application' | 'job_application_confirmation'
  data: any
  language?: string
}

/**
 * Newsletter Subscriber Functions
 */

/**
 * Add a new subscriber to the newsletter
 */
export const addSubscriber = async (
  subscriber: NewsletterSubscriber
): Promise<{ success: boolean; message: string; data?: any; error?: any }> => {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([
        {
          email: subscriber.email,
          name: subscriber.name,
          source: subscriber.source,
          language: subscriber.language,
          status: 'active',
          subscribed_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      // Check if it's a duplicate email error
      if (error.code === '23505') {
        return {
          success: false,
          message: 'Email already subscribed',
          error: { code: 'ALREADY_SUBSCRIBED' },
        }
      }
      
      console.error('Error adding subscriber to Supabase:', error)
      return {
        success: false,
        message: 'Failed to add subscriber',
        error,
      }
    }

    console.log('Successfully added subscriber to Supabase:', subscriber.email)
    return {
      success: true,
      message: 'Subscriber added successfully',
      data,
    }
  } catch (error) {
    console.error('Exception adding subscriber:', error)
    return {
      success: false,
      message: 'Failed to add subscriber',
      error,
    }
  }
}

/**
 * Check if an email is already subscribed
 */
export const checkEmailExists = async (
  email: string
): Promise<{ exists: boolean; message: string; data?: any }> => {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('id, email, status')
      .eq('email', email.toLowerCase())
      .single()

    if (error) {
      // If no rows found, email doesn't exist
      if (error.code === 'PGRST116') {
        return {
          exists: false,
          message: 'Email not found',
        }
      }
      
      console.error('Error checking email existence:', error)
      return {
        exists: false,
        message: 'Error checking email',
      }
    }

    if (data && data.status === 'active') {
      return {
        exists: true,
        message: 'Email already subscribed',
        data,
      }
    }

    return {
      exists: false,
      message: 'Email not subscribed or unsubscribed',
      data,
    }
  } catch (error) {
    console.error('Exception checking email:', error)
    return {
      exists: false,
      message: 'Error checking email',
    }
  }
}

/**
 * Unsubscribe an email from the newsletter
 */
export const unsubscribe = async (
  email: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const { error } = await supabase
      .from('newsletter_subscribers')
      .update({
        status: 'unsubscribed',
        unsubscribed_at: new Date().toISOString(),
      })
      .eq('email', email.toLowerCase())

    if (error) {
      console.error('Error unsubscribing email:', error)
      return {
        success: false,
        message: 'Failed to unsubscribe',
      }
    }

    return {
      success: true,
      message: 'Successfully unsubscribed',
    }
  } catch (error) {
    console.error('Exception unsubscribing:', error)
    return {
      success: false,
      message: 'Failed to unsubscribe',
    }
  }
}

/**
 * Job Application Functions
 */

/**
 * Add a new job application
 */
export const addJobApplication = async (
  application: JobApplication
): Promise<{ success: boolean; message: string; data?: any; error?: any }> => {
  try {
    const { data, error } = await supabase
      .from('job_applications')
      .insert([
        {
          name: application.name,
          email: application.email,
          phone: application.phone,
          position: application.position,
          resume: application.resume,
          cover_letter: application.cover_letter,
          language: application.language,
          privacy_consent: application.privacy_consent,
          status: 'pending',
        },
      ])
      .select()

    if (error) {
      console.error('Error adding job application to Supabase:', error)
      return {
        success: false,
        message: 'Failed to add job application',
        error,
      }
    }

    console.log('Successfully added job application to Supabase:', application.email)
    return {
      success: true,
      message: 'Job application added successfully',
      data,
    }
  } catch (error) {
    console.error('Exception adding job application:', error)
    return {
      success: false,
      message: 'Failed to add job application',
      error,
    }
  }
}

/**
 * Update job application status
 */
export const updateApplicationStatus = async (
  id: string,
  status: 'pending' | 'reviewed' | 'rejected' | 'hired',
  notes?: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const updateData: any = { status }
    if (notes) {
      updateData.notes = notes
    }

    const { error } = await supabase
      .from('job_applications')
      .update(updateData)
      .eq('id', id)

    if (error) {
      console.error('Error updating application status:', error)
      return {
        success: false,
        message: 'Failed to update status',
      }
    }

    return {
      success: true,
      message: 'Status updated successfully',
    }
  } catch (error) {
    console.error('Exception updating status:', error)
    return {
      success: false,
      message: 'Failed to update status',
    }
  }
}

/**
 * Email Functions via Edge Function
 */

/**
 * Send email via Supabase Edge Function
 */
export const sendEmail = async (
  payload: EmailPayload
): Promise<{ success: boolean; message: string; data?: any; error?: any }> => {
  try {
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: payload,
    })

    if (error) {
      console.error('Error invoking send-email function:', error)
      return {
        success: false,
        message: 'Failed to send email',
        error,
      }
    }

    if (!data.success) {
      console.error('Email function returned error:', data.error)
      return {
        success: false,
        message: data.error || 'Failed to send email',
        error: data.error,
      }
    }

    return {
      success: true,
      message: 'Email sent successfully',
      data,
    }
  } catch (error) {
    console.error('Exception sending email:', error)
    return {
      success: false,
      message: 'Failed to send email',
      error,
    }
  }
}

/**
 * Test Supabase connection
 */
export const testConnection = async (): Promise<{ success: boolean; message: string }> => {
  try {
    // Try to query the newsletter_subscribers table (should work even if empty)
    const { error } = await supabase
      .from('newsletter_subscribers')
      .select('count')
      .limit(1)

    if (error) {
      console.error('Supabase connection test failed:', error)
      return {
        success: false,
        message: `Connection failed: ${error.message}`,
      }
    }

    return {
      success: true,
      message: 'Successfully connected to Supabase',
    }
  } catch (error) {
    console.error('Exception testing connection:', error)
    return {
      success: false,
      message: 'Connection test failed',
    }
  }
}

