// Email templates with multi-language support

export const emailTemplates = {
  contact: {
    subject: 'Nuevo mensaje de contacto - Polaris Platform',
    html: (data: any) => `
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
      html: (data: any) => `
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
      html: (data: any) => `
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
    },
  },

  welcomeNewsletter: {
    es: {
      subject: '¡Bienvenido al newsletter de Polaris Platform!',
      html: (data: any) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">¡Bienvenido a Polaris!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Gracias por suscribirte a nuestro newsletter</p>
          </div>
          
          <div style="background: #fff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #1e293b; margin-top: 0;">${data.name ? `Hola ${data.name}, ¿q` : '¿Q'}ué puedes esperar?</h2>
            
            <div style="margin: 20px 0;">
              <div style="margin-bottom: 15px;">
                <span style="color: #10b981; margin-right: 10px;">✓</span>
                <span>Actualizaciones sobre el desarrollo de la plataforma</span>
              </div>
              
              <div style="margin-bottom: 15px;">
                <span style="color: #10b981; margin-right: 10px;">✓</span>
                <span>Invitaciones exclusivas para beta testing</span>
              </div>
              
              <div style="margin-bottom: 15px;">
                <span style="color: #10b981; margin-right: 10px;">✓</span>
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
              <a href="https://polarisplatform.ch" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
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
    en: {
      subject: 'Welcome to Polaris Platform Newsletter!',
      html: (data: any) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Welcome to Polaris!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for subscribing to our newsletter</p>
          </div>
          
          <div style="background: #fff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #1e293b; margin-top: 0;">${data.name ? `Hello ${data.name}, w` : 'W'}hat can you expect?</h2>
            
            <div style="margin: 20px 0;">
              <div style="margin-bottom: 15px;">
                <span style="color: #10b981; margin-right: 10px;">✓</span>
                <span>Platform development updates</span>
              </div>
              
              <div style="margin-bottom: 15px;">
                <span style="color: #10b981; margin-right: 10px;">✓</span>
                <span>Exclusive beta testing invitations</span>
              </div>
              
              <div style="margin-bottom: 15px;">
                <span style="color: #10b981; margin-right: 10px;">✓</span>
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
              <a href="https://polarisplatform.ch" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Visit Polaris Platform
              </a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #64748b; font-size: 14px;">
            <p>This email was sent by Polaris Platform</p>
          </div>
        </div>
      `,
    },
  },

  jobApplication: {
    es: {
      subject: 'Nueva aplicación de trabajo - Polaris Platform',
      html: (data: any) => `
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
            <p><strong>Fecha de aplicación:</strong> ${new Date().toLocaleDateString('es-ES')}</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border-left: 4px solid #7c3aed; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Currículum/CV:</h3>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 4px; word-wrap: break-word; max-height: 200px; overflow-y: auto;">
              ${data.resume.length > 500 ? data.resume.substring(0, 500) + '...' : data.resume}
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
      html: (data: any) => `
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
            <p><strong>Application Date:</strong> ${new Date().toLocaleDateString('en-US')}</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border-left: 4px solid #7c3aed; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Resume/CV:</h3>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 4px; word-wrap: break-word; max-height: 200px; overflow-y: auto;">
              ${data.resume.length > 500 ? data.resume.substring(0, 500) + '...' : data.resume}
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
    },
  },
};

