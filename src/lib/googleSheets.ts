import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

// Interface for subscriber data
export interface SubscriberData {
  name?: string
  email: string
  source: string
  language: string
  subscriptionDate: string
}

// Interface for job application data
export interface JobApplicationData {
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

// Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY

// Initialize Google Sheets client
const initializeSheet = async () => {
  try {
    if (!SPREADSHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      throw new Error('Missing Google Sheets configuration. Please check your environment variables.')
    }

    // Create JWT client for authentication
    const serviceAccountAuth = new JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Handle newlines in private key
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    // Initialize Google Spreadsheet document
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth)
    
    // Load spreadsheet info
    await doc.loadInfo()
    
    return doc
  } catch (error) {
    console.error('Error initializing Google Sheets:', error)
    throw error
  }
}

// Add subscriber to Google Sheets
export const addSubscriberToSheet = async (subscriberData: SubscriberData): Promise<{ success: boolean; message: string; error?: any }> => {
  try {
    const doc = await initializeSheet()
    
    // Get the first sheet (or create it if it doesn't exist)
    let sheet = doc.sheetsByIndex[0]
    
    if (!sheet) {
      // Create sheet if it doesn't exist
      sheet = await doc.addSheet({
        title: 'Subscribers',
        headerValues: ['Timestamp', 'Name', 'Email', 'Source', 'Language']
      })
    } else {
      // Try to load existing sheet data, if it fails, the sheet is empty
      try {
        await sheet.loadHeaderRow()
        
        // Check if headers exist, if not, set them
        if (!sheet.headerValues || sheet.headerValues.length === 0) {
          await sheet.setHeaderRow(['Timestamp', 'Name', 'Email', 'Source', 'Language'])
        }
      } catch (error) {
        // Sheet exists but is empty, set the headers
        console.log('Sheet is empty, setting headers...')
        await sheet.setHeaderRow(['Timestamp', 'Name', 'Email', 'Source', 'Language'])
      }
    }

    // Prepare row data
    const rowData = {
      Timestamp: subscriberData.subscriptionDate,
      Name: subscriberData.name || '',
      Email: subscriberData.email,
      Source: subscriberData.source,
      Language: subscriberData.language
    }

    // Add row to sheet
    await sheet.addRow(rowData)
    
    console.log('Successfully added subscriber to Google Sheets:', subscriberData.email)
    
    return {
      success: true,
      message: 'Subscriber added to Google Sheets successfully'
    }
    
  } catch (error) {
    console.error('Error adding subscriber to Google Sheets:', error)
    
    return {
      success: false,
      message: 'Failed to add subscriber to Google Sheets',
      error
    }
  }
}

// Check if email already exists in Google Sheets
export const checkEmailExists = async (email: string): Promise<{ exists: boolean; message: string; error?: any }> => {
  try {
    const doc = await initializeSheet()
    
    // Get the first sheet
    let sheet = doc.sheetsByIndex[0]
    
    if (!sheet) {
      // No sheet exists, so email doesn't exist
      return {
        exists: false,
        message: 'No subscribers sheet found'
      }
    }

    // Try to load the sheet rows
    try {
      await sheet.loadHeaderRow()
      
      if (!sheet.headerValues || sheet.headerValues.length === 0) {
        // Empty sheet, email doesn't exist
        return {
          exists: false,
          message: 'Empty subscribers sheet'
        }
      }

      // Load all rows to search for the email
      const rows = await sheet.getRows()
      
      // Search for existing email
      const existingRow = rows.find(row => 
        row.get('Email') && row.get('Email').toLowerCase() === email.toLowerCase()
      )
      
      if (existingRow) {
        return {
          exists: true,
          message: `Email ${email} already exists in subscribers list`
        }
      } else {
        return {
          exists: false,
          message: `Email ${email} not found in subscribers list`
        }
      }
      
    } catch (headerError) {
      // Sheet exists but is empty
      return {
        exists: false,
        message: 'Empty sheet - email does not exist'
      }
    }
    
  } catch (error) {
    console.error('Error checking if email exists in Google Sheets:', error)
    
    return {
      exists: false,
      message: 'Error checking email existence',
      error
    }
  }
}

// Test Google Sheets connection
export const testSheetsConnection = async (): Promise<{ success: boolean; message: string; error?: any }> => {
  try {
    const doc = await initializeSheet()
    
    return {
      success: true,
      message: `Successfully connected to Google Sheets: ${doc.title}`
    }
    
  } catch (error) {
    console.error('Error testing Google Sheets connection:', error)
    
    return {
      success: false,
      message: 'Failed to connect to Google Sheets',
      error
    }
  }
}

// Add job application to Google Sheets
export const addJobApplicationToSheet = async (applicationData: JobApplicationData): Promise<{ success: boolean; message: string; error?: any }> => {
  try {
    const doc = await initializeSheet()
    
    // Try to get the "Job Applications" sheet or create it
    let sheet = doc.sheetsByTitle['Job Applications']
    
    if (!sheet) {
      // Create sheet if it doesn't exist
      sheet = await doc.addSheet({
        title: 'Job Applications',
        headerValues: ['Timestamp', 'Name', 'Email', 'Phone', 'Position', 'Language', 'Resume', 'Cover Letter', 'Privacy Consent']
      })
    } else {
      // Try to load existing sheet data, if it fails, the sheet is empty
      try {
        await sheet.loadHeaderRow()
        
        // Check if headers exist, if not, set them
        if (!sheet.headerValues || sheet.headerValues.length === 0) {
          await sheet.setHeaderRow(['Timestamp', 'Name', 'Email', 'Phone', 'Position', 'Language', 'Resume', 'Cover Letter', 'Privacy Consent'])
        }
      } catch (error) {
        // Sheet exists but is empty, set the headers
        console.log('Job Applications sheet is empty, setting headers...')
        await sheet.setHeaderRow(['Timestamp', 'Name', 'Email', 'Phone', 'Position', 'Language', 'Resume', 'Cover Letter', 'Privacy Consent'])
      }
    }

    // Prepare row data
    const rowData = {
      Timestamp: applicationData.applicationDate || new Date().toISOString(),
      Name: applicationData.name,
      Email: applicationData.email,
      Phone: applicationData.phone || '',
      Position: applicationData.position,
      Language: applicationData.language || 'es',
      Resume: applicationData.resume.length > 1000 ? applicationData.resume.substring(0, 1000) + '...' : applicationData.resume,
      'Cover Letter': applicationData.coverLetter.length > 1000 ? applicationData.coverLetter.substring(0, 1000) + '...' : applicationData.coverLetter,
      'Privacy Consent': applicationData.privacyConsent ? 'Yes' : 'No'
    }

    // Add row to sheet
    await sheet.addRow(rowData)
    
    console.log('Successfully added job application to Google Sheets:', applicationData.email)
    
    return {
      success: true,
      message: 'Job application added to Google Sheets successfully'
    }
    
  } catch (error) {
    console.error('Error adding job application to Google Sheets:', error)
    
    return {
      success: false,
      message: 'Failed to add job application to Google Sheets',
      error
    }
  }
} 