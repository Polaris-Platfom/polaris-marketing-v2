import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { Resend } from 'npm:resend@2.0.0';
import { emailTemplates } from './templates.ts';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  try {
    const { type, data, language = 'es' } = await req.json();

    console.log('📧 Email request received:', { type, language });
    console.log('📝 Data:', JSON.stringify(data, null, 2));

    // Validate environment variables
    const resendKey = Deno.env.get('RESEND_API_KEY');
    const fromEmail = Deno.env.get('FROM_EMAIL');
    const contactEmail = Deno.env.get('CONTACT_EMAIL');

    console.log('🔑 Environment check:', {
      hasResendKey: !!resendKey,
      resendKeyLength: resendKey?.length,
      fromEmail: fromEmail || 'NOT SET',
      contactEmail: contactEmail || 'NOT SET',
    });

    if (!resendKey) {
      console.error('❌ RESEND_API_KEY not configured');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'RESEND_API_KEY not configured in Edge Function secrets',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate request
    if (!type || !data) {
      console.error('❌ Missing type or data');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing type or data',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    let emailResult;

    switch (type) {
      case 'contact':
        emailResult = await sendContactEmail(data, resend);
        break;
      case 'newsletter':
        emailResult = await sendNewsletterNotification(data, language, resend);
        break;
      case 'newsletter_welcome':
        emailResult = await sendNewsletterWelcome(data, language, resend);
        break;
      case 'job_application':
        emailResult = await sendJobApplicationNotification(data, language, resend);
        break;
      case 'job_application_confirmation':
        emailResult = await sendJobApplicationConfirmation(data, language, resend);
        break;
      default:
        console.error('❌ Invalid email type:', type);
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Invalid email type',
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
    }

    console.log('✅ Email sent successfully:', emailResult);

    return new Response(
      JSON.stringify({
        success: true,
        ...emailResult,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('❌ Error sending email:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        errorName: error.name,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
});

// Contact form email to admin
async function sendContactEmail(data: any, resend: any) {
  const { name, email, phone, company, message } = data;
  const contactEmail = Deno.env.get('CONTACT_EMAIL') || 'hello@polarisplatform.ch';
  const fromEmail = Deno.env.get('FROM_EMAIL') || 'noreply@polarisplatform.ch';

  console.log('📨 Sending contact email:', { to: contactEmail, from: fromEmail });

  try {
    const result = await resend.emails.send({
      from: `Polaris Platform <${fromEmail}>`,
      to: [contactEmail],
      subject: 'Nuevo mensaje de contacto - Polaris Platform',
      html: emailTemplates.contact.html({
        name,
        email,
        phone,
        company,
        message,
      }),
    });

    console.log('📧 Resend response:', result);

    if (result.error) {
      console.error('❌ Resend error:', result.error);
      throw new Error(`Resend API error: ${result.error.message || JSON.stringify(result.error)}`);
    }

    return {
      messageId: result.data?.id || result.id,
    };
  } catch (error) {
    console.error('❌ Exception sending contact email:', error);
    throw error;
  }
}

// Newsletter subscription notification to admin
async function sendNewsletterNotification(data: any, language: string, resend: any) {
  const { email, name, source } = data;
  const newsletterEmail = Deno.env.get('NEWSLETTER_EMAIL') || 'newsletter@polarisplatform.ch';
  const fromEmail = Deno.env.get('FROM_EMAIL') || 'noreply@polarisplatform.ch';
  const template = emailTemplates.newsletter[language] || emailTemplates.newsletter.es;

  console.log('📨 Sending newsletter notification:', { to: newsletterEmail, from: fromEmail });

  try {
    const result = await resend.emails.send({
      from: `Polaris Platform <${fromEmail}>`,
      to: [newsletterEmail],
      subject: template.subject,
      html: template.html({
        email,
        name,
        source,
        language,
      }),
    });

    console.log('📧 Resend response:', result);

    if (result.error) {
      console.error('❌ Resend error:', result.error);
      throw new Error(`Resend API error: ${result.error.message || JSON.stringify(result.error)}`);
    }

    return {
      messageId: result.data?.id || result.id,
    };
  } catch (error) {
    console.error('❌ Exception sending newsletter notification:', error);
    throw error;
  }
}

// Welcome email to newsletter subscriber
async function sendNewsletterWelcome(data: any, language: string, resend: any) {
  const { email, name } = data;
  const fromEmail = Deno.env.get('FROM_EMAIL') || 'noreply@polarisplatform.ch';
  const template = emailTemplates.welcomeNewsletter[language] || emailTemplates.welcomeNewsletter.es;

  console.log('📨 Sending newsletter welcome:', { to: email, from: fromEmail });

  try {
    const result = await resend.emails.send({
      from: `Polaris Platform <${fromEmail}>`,
      to: [email],
      subject: template.subject,
      html: template.html({
        email,
        name,
      }),
    });

    console.log('📧 Resend response:', result);

    if (result.error) {
      console.error('❌ Resend error:', result.error);
      throw new Error(`Resend API error: ${result.error.message || JSON.stringify(result.error)}`);
    }

    return {
      messageId: result.data?.id || result.id,
    };
  } catch (error) {
    console.error('❌ Exception sending newsletter welcome:', error);
    throw error;
  }
}

// Job application notification to admin
async function sendJobApplicationNotification(data: any, language: string, resend: any) {
  const { name, email, phone, position, resume, coverLetter } = data;
  const contactEmail = Deno.env.get('CONTACT_EMAIL') || 'hello@polarisplatform.ch';
  const fromEmail = Deno.env.get('FROM_EMAIL') || 'noreply@polarisplatform.ch';
  const template = emailTemplates.jobApplication[language] || emailTemplates.jobApplication.es;

  console.log('📨 Sending job application notification:', { to: contactEmail, from: fromEmail });

  try {
    const result = await resend.emails.send({
      from: `Polaris Platform <${fromEmail}>`,
      to: [contactEmail],
      subject: template.subject,
      html: template.html({
        name,
        email,
        phone,
        position,
        resume,
        coverLetter,
      }),
    });

    console.log('📧 Resend response:', result);

    if (result.error) {
      console.error('❌ Resend error:', result.error);
      throw new Error(`Resend API error: ${result.error.message || JSON.stringify(result.error)}`);
    }

    return {
      messageId: result.data?.id || result.id,
    };
  } catch (error) {
    console.error('❌ Exception sending job application notification:', error);
    throw error;
  }
}

// Job application confirmation to applicant
async function sendJobApplicationConfirmation(data: any, language: string, resend: any) {
  const { name, email, position } = data;
  const fromEmail = Deno.env.get('FROM_EMAIL') || 'noreply@polarisplatform.ch';
  const contactEmail = Deno.env.get('CONTACT_EMAIL') || 'hello@polarisplatform.ch';
  const isSpanish = language === 'es';

  const subject = isSpanish
    ? '¡Aplicación recibida! - Polaris Platform'
    : 'Application received! - Polaris Platform';

  const html = isSpanish
    ? `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">¡Aplicación recibida!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Gracias por tu interés en Polaris Platform</p>
        </div>
        <div style="background: #fff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #1e293b; margin-top: 0;">Hola ${name},</h2>
          <p style="color: #374151; line-height: 1.6;">
            Hemos recibido tu aplicación para la posición de <strong>${position}</strong>. 
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
            <a href="mailto:${contactEmail}" style="color: #2563eb;">${contactEmail}</a>.
          </p>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #64748b; font-size: 14px;">
          <p>Este email fue enviado por Polaris Platform</p>
        </div>
      </div>`
    : `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">Application received!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for your interest in Polaris Platform</p>
        </div>
        <div style="background: #fff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #1e293b; margin-top: 0;">Hello ${name},</h2>
          <p style="color: #374151; line-height: 1.6;">
            We have received your application for the <strong>${position}</strong> position. 
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
            <a href="mailto:${contactEmail}" style="color: #2563eb;">${contactEmail}</a>.
          </p>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #64748b; font-size: 14px;">
          <p>This email was sent by Polaris Platform</p>
        </div>
      </div>`;

  console.log('📨 Sending job application confirmation:', { to: email, from: fromEmail });

  try {
    const result = await resend.emails.send({
      from: `Polaris Platform <${fromEmail}>`,
      to: [email],
      subject,
      html,
    });

    console.log('📧 Resend response:', result);

    if (result.error) {
      console.error('❌ Resend error:', result.error);
      throw new Error(`Resend API error: ${result.error.message || JSON.stringify(result.error)}`);
    }

    return {
      messageId: result.data?.id || result.id,
    };
  } catch (error) {
    console.error('❌ Exception sending job application confirmation:', error);
    throw error;
  }
}

