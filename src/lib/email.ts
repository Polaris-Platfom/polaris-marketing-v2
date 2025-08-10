import nodemailer from 'nodemailer'

// Email configuration
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.office365.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    ciphers: 'SSLv3',
  },
}

// Create transporter
export const transporter = nodemailer.createTransport(emailConfig)

// Email templates with multi-language support
export const emailTemplates = {
  contact: {
    subject: 'Nuevo mensaje de contacto - Polaris Platform',
    html: (data: ContactFormData) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
          Nuevo mensaje de contacto
        </h2>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e293b; margin-top: 0;">Información del contacto:</h3>
          <p><strong>Nombre:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Teléfono:</strong> ${data.phone || 'No proporcionado'}</p>
          <p><strong>Empresa:</strong> ${data.company || 'No proporcionado'}</p>
        </div>
        
        <div style="background: #fff; padding: 20px; border-left: 4px solid #10b981; margin: 20px 0;">
          <h3 style="color: #1e293b; margin-top: 0;">Mensaje:</h3>
          <p style="line-height: 1.6; color: #374151;">${data.message}</p>
        </div>
        
        <div style="background: #f1f5f9; padding: 15px; border-radius: 4px; margin-top: 20px;">
          <p style="margin: 0; color: #64748b; font-size: 14px;">
            Este mensaje fue enviado desde el formulario de contacto de Polaris Platform.
          </p>
        </div>
      </div>
    `,
  },
  
  newsletter: {
    es: {
      subject: 'Nueva suscripción al newsletter - Polaris Platform',
      html: (data: NewsletterFormData) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            Nueva suscripción al newsletter
          </h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Información del suscriptor:</h3>
            ${data.name ? `<p><strong>Nombre:</strong> ${data.name}</p>` : ''}
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-ES')}</p>
            <p><strong>Origen:</strong> ${data.source}</p>
            <p><strong>Idioma:</strong> ${data.language || 'es'}</p>
          </div>
          
          <div style="background: #f1f5f9; padding: 15px; border-radius: 4px; margin-top: 20px;">
            <p style="margin: 0; color: #64748b; font-size: 14px;">
              Nueva suscripción recibida desde Polaris Platform.
            </p>
          </div>
        </div>
      `,
    },
    en: {
      subject: 'New Newsletter Subscription - Polaris Platform',
      html: (data: NewsletterFormData) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Newsletter Subscription
          </h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Subscriber Information:</h3>
            ${data.name ? `<p><strong>Name:</strong> ${data.name}</p>` : ''}
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-US')}</p>
            <p><strong>Source:</strong> ${data.source}</p>
            <p><strong>Language:</strong> ${data.language || 'en'}</p>
          </div>
          
          <div style="background: #f1f5f9; padding: 15px; border-radius: 4px; margin-top: 20px;">
            <p style="margin: 0; color: #64748b; font-size: 14px;">
              New subscription received from Polaris Platform.
            </p>
          </div>
        </div>
      `,
    }
  },
  
  welcomeNewsletter: {
    es: {
      subject: '¡Bienvenido al newsletter de Polaris Platform!',
      html: (data: NewsletterFormData) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">¡Bienvenido a Polaris!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Gracias por suscribirte a nuestro newsletter</p>
          </div>
          
          <div style="background: #fff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #1e293b; margin-top: 0;">${data.name ? `Hola ${data.name}, ¿q` : '¿Q'}ué puedes esperar?</h2>
            
            <div style="margin: 20px 0;">
              <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <div style="background: #10b981; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: bold;">✓</div>
                <span>Actualizaciones sobre el desarrollo de la plataforma</span>
              </div>
              
              <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <div style="background: #10b981; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: bold;">✓</div>
                <span>Invitaciones exclusivas para beta testing</span>
              </div>
              
              <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <div style="background: #10b981; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: bold;">✓</div>
                <span>Recursos sobre gobernanza comunitaria</span>
              </div>
            </div>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e293b; margin-top: 0;">Cronograma de desarrollo:</h3>
              <ul style="color: #374151; line-height: 1.6;">
                <li><strong>Q1 2024:</strong> Autenticación y perfiles</li>
                <li><strong>Q2 2024:</strong> Funciones principales</li>
                <li><strong>Q3 2024:</strong> Funciones avanzadas</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Visitar Polaris Platform
              </a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #64748b; font-size: 14px;">
            <p>Este email fue enviado por Polaris Platform</p>
            <p>Si no deseas recibir más emails, puedes <a href="#" style="color: #2563eb;">darte de baja aquí</a></p>
          </div>
        </div>
      `,
    },
    en: {
      subject: 'Welcome to Polaris Platform Newsletter!',
      html: (data: NewsletterFormData) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Welcome to Polaris!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for subscribing to our newsletter</p>
          </div>
          
          <div style="background: #fff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #1e293b; margin-top: 0;">${data.name ? `Hello ${data.name}, w` : 'W'}hat can you expect?</h2>
            
            <div style="margin: 20px 0;">
              <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <div style="background: #10b981; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: bold;">✓</div>
                <span>Platform development updates</span>
              </div>
              
              <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <div style="background: #10b981; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: bold;">✓</div>
                <span>Exclusive beta testing invitations</span>
              </div>
              
              <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <div style="background: #10b981; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: bold;">✓</div>
                <span>Community governance resources</span>
              </div>
            </div>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e293b; margin-top: 0;">Development Timeline:</h3>
              <ul style="color: #374151; line-height: 1.6;">
                <li><strong>Q1 2024:</strong> Authentication and profiles</li>
                <li><strong>Q2 2024:</strong> Core features</li>
                <li><strong>Q3 2024:</strong> Advanced features</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Visit Polaris Platform
              </a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #64748b; font-size: 14px;">
            <p>This email was sent by Polaris Platform</p>
            <p>If you don't want to receive more emails, you can <a href="#" style="color: #2563eb;">unsubscribe here</a></p>
          </div>
        </div>
      `,
    }
  },
  
  contactConfirmation: {
    subject: 'Hemos recibido tu mensaje - Polaris Platform',
    html: (data: ContactFormData) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">¡Gracias por contactarnos!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Hemos recibido tu mensaje</p>
        </div>
        
        <div style="background: #fff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #1e293b; margin-top: 0;">Hola ${data.name},</h2>
          
          <p style="color: #374151; line-height: 1.6;">
            Gracias por ponerte en contacto con nosotros. Hemos recibido tu mensaje y nuestro equipo lo revisará pronto.
          </p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Resumen de tu mensaje:</h3>
            <p style="margin: 5px 0;"><strong>Nombre:</strong> ${data.name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${data.email}</p>
            <p style="margin: 5px 0;"><strong>Mensaje:</strong></p>
            <p style="color: #374151; font-style: italic; margin: 10px 0;">"${data.message}"</p>
          </div>
          
          <p style="color: #374151; line-height: 1.6;">
            Normalmente respondemos en 24-48 horas. Si tu consulta es urgente, puedes llamarnos directamente o enviar un email a <a href="mailto:${process.env.SUPPORT_EMAIL}" style="color: #2563eb;">${process.env.SUPPORT_EMAIL}</a>.
          </p>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Visitar Polaris Platform
            </a>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #64748b; font-size: 14px;">
          <p>Este email fue enviado por Polaris Platform</p>
        </div>
      </div>
    `,
  },
  
  jobApplication: {
    es: {
      subject: 'Nueva aplicación de trabajo - Polaris Platform',
      html: (data: JobApplicationData) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            Nueva aplicación de trabajo
          </h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Información del aplicante:</h3>
            <p><strong>Nombre:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Teléfono:</strong> ${data.phone || 'No proporcionado'}</p>
            <p><strong>Posición:</strong> ${data.position}</p>
            <p><strong>Fecha de aplicación:</strong> ${new Date(data.applicationDate || new Date()).toLocaleDateString('es-ES')}</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border-left: 4px solid #7c3aed; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Currículum/CV:</h3>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 4px; word-wrap: break-word;">
              ${data.resume.length > 200 ? data.resume.substring(0, 200) + '...' : data.resume}
            </div>
          </div>
          
          <div style="background: #fff; padding: 20px; border-left: 4px solid #10b981; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Carta de presentación:</h3>
            <p style="line-height: 1.6; color: #374151;">${data.coverLetter}</p>
          </div>
          
          <div style="background: #f1f5f9; padding: 15px; border-radius: 4px; margin-top: 20px;">
            <p style="margin: 0; color: #64748b; font-size: 14px;">
              Esta aplicación fue enviada desde el formulario de reclutamiento de Polaris Platform.
            </p>
          </div>
        </div>
      `,
    },
    en: {
      subject: 'New Job Application - Polaris Platform',
      html: (data: JobApplicationData) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Job Application
          </h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Applicant Information:</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
            <p><strong>Position:</strong> ${data.position}</p>
            <p><strong>Application Date:</strong> ${new Date(data.applicationDate || new Date()).toLocaleDateString('en-US')}</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border-left: 4px solid #7c3aed; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Resume/CV:</h3>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 4px; word-wrap: break-word;">
              ${data.resume.length > 200 ? data.resume.substring(0, 200) + '...' : data.resume}
            </div>
          </div>
          
          <div style="background: #fff; padding: 20px; border-left: 4px solid #10b981; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Cover Letter:</h3>
            <p style="line-height: 1.6; color: #374151;">${data.coverLetter}</p>
          </div>
          
          <div style="background: #f1f5f9; padding: 15px; border-radius: 4px; margin-top: 20px;">
            <p style="margin: 0; color: #64748b; font-size: 14px;">
              This application was sent from the Polaris Platform recruitment form.
            </p>
          </div>
        </div>
      `,
    }
  }
}

// Type definitions
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
}

export interface NewsletterFormData {
  email: string
  name?: string // Added name field for Google Sheets integration
  source: string
  language?: string // Added language support
}

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

// Email sending functions
export const sendContactEmail = async (data: ContactFormData) => {
  try {
    // Send email to admin
    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM}>`,
      to: process.env.CONTACT_EMAIL,
      subject: emailTemplates.contact.subject,
      html: emailTemplates.contact.html(data),
    })
    
    // Send confirmation email to user
    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM}>`,
      to: data.email,
      subject: emailTemplates.contactConfirmation.subject,
      html: emailTemplates.contactConfirmation.html(data),
    })
    
    return { success: true, message: 'Emails sent successfully' }
  } catch (error) {
    console.error('Error sending contact email:', error)
    return { success: false, message: 'Error sending email', error }
  }
}

export const sendNewsletterEmail = async (data: NewsletterFormData) => {
  try {
    // Determine language (default to 'es' if not provided)
    const language = data.language || 'es'
    const isValidLanguage = language === 'en' || language === 'es'
    const emailLanguage = isValidLanguage ? language as 'en' | 'es' : 'es'
    
    // Get templates for the specific language
    const newsletterTemplate = emailTemplates.newsletter[emailLanguage]
    const welcomeTemplate = emailTemplates.welcomeNewsletter[emailLanguage]
    
    // Send notification to admin
    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM}>`,
      to: process.env.NEWSLETTER_EMAIL,
      subject: newsletterTemplate.subject,
      html: newsletterTemplate.html(data),
    })
    
    // Send welcome email to subscriber in their language
    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM}>`,
      to: data.email,
      subject: welcomeTemplate.subject,
      html: welcomeTemplate.html(data),
    })
    
    return { success: true, message: 'Newsletter emails sent successfully' }
  } catch (error) {
    console.error('Error sending newsletter email:', error)
    return { success: false, message: 'Error sending email', error }
  }
}

export const sendJobApplicationEmail = async (data: JobApplicationData) => {
  try {
    // Determine language (default to 'es' if not provided)
    const language = data.language || 'es'
    const isValidLanguage = language === 'en' || language === 'es'
    const emailLanguage = isValidLanguage ? language as 'en' | 'es' : 'es'
    
    // Get template for the specific language
    const jobApplicationTemplate = emailTemplates.jobApplication[emailLanguage]
    
    // Send notification to admin/HR
    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM}>`,
      to: process.env.CONTACT_EMAIL, // Use contact email for job applications
      subject: jobApplicationTemplate.subject,
      html: jobApplicationTemplate.html(data),
    })
    
    // Send confirmation email to applicant
    const confirmationSubject = emailLanguage === 'es' 
      ? '¡Aplicación recibida! - Polaris Platform'
      : 'Application received! - Polaris Platform'
    
    const confirmationHtml = emailLanguage === 'es' 
      ? `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">¡Aplicación recibida!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Gracias por tu interés en Polaris Platform</p>
          </div>
          
          <div style="background: #fff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #1e293b; margin-top: 0;">Hola ${data.name},</h2>
            
            <p style="color: #374151; line-height: 1.6;">
              Hemos recibido tu aplicación para la posición de <strong>${data.position}</strong>. 
              Nuestro equipo revisará tu aplicación cuidadosamente y nos pondremos en contacto contigo en 2-3 días hábiles.
            </p>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e293b; margin-top: 0;">Próximos pasos:</h3>
              <ul style="color: #374151; line-height: 1.6;">
                <li>Revisión inicial de tu aplicación</li>
                <li>Evaluación del equipo de reclutamiento</li>
                <li>Entrevista inicial (si eres seleccionado)</li>
                <li>Proceso de entrevista final</li>
              </ul>
            </div>
            
            <p style="color: #374151; line-height: 1.6;">
              Si tienes alguna pregunta sobre tu aplicación, no dudes en contactarnos en 
              <a href="mailto:${process.env.CONTACT_EMAIL}" style="color: #2563eb;">${process.env.CONTACT_EMAIL}</a>.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #64748b; font-size: 14px;">
            <p>Este email fue enviado por Polaris Platform</p>
          </div>
        </div>
      `
      : `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Application received!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for your interest in Polaris Platform</p>
          </div>
          
          <div style="background: #fff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #1e293b; margin-top: 0;">Hello ${data.name},</h2>
            
            <p style="color: #374151; line-height: 1.6;">
              We have received your application for the <strong>${data.position}</strong> position. 
              Our team will review your application carefully and get back to you within 2-3 business days.
            </p>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e293b; margin-top: 0;">Next steps:</h3>
              <ul style="color: #374151; line-height: 1.6;">
                <li>Initial review of your application</li>
                <li>Recruitment team evaluation</li>
                <li>Initial interview (if selected)</li>
                <li>Final interview process</li>
              </ul>
            </div>
            
            <p style="color: #374151; line-height: 1.6;">
              If you have any questions about your application, please don't hesitate to contact us at 
              <a href="mailto:${process.env.CONTACT_EMAIL}" style="color: #2563eb;">${process.env.CONTACT_EMAIL}</a>.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #64748b; font-size: 14px;">
            <p>This email was sent by Polaris Platform</p>
          </div>
        </div>
      `
    
    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM}>`,
      to: data.email,
      subject: confirmationSubject,
      html: confirmationHtml,
    })
    
    return { success: true, message: 'Job application emails sent successfully' }
  } catch (error) {
    console.error('Error sending job application email:', error)
    return { success: false, message: 'Error sending email', error }
  }
}

// Test email connection
export const testEmailConnection = async () => {
  try {
    await transporter.verify()
    return { success: true, message: 'Email connection successful' }
  } catch (error) {
    console.error('Error testing email connection:', error)
    return { success: false, message: 'Email connection failed', error }
  }
} 