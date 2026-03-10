import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data?.name || !data?.email || !data?.subject || !data?.message) {
      return NextResponse.json(
        { success: false, message: 'Todos os campos obrigatórios devem ser preenchidos' },
        { status: 400 }
      );
    }

    // Save to database
    const contact = await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data?.phone ?? '',
        subject: data.subject,
        message: data.message,
        status: 'new',
      },
    });

    // Create HTML email body
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px;">
        <div style="background-color: #282828; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: #827751; margin: 0; font-family: 'Playfair Display', serif;">Nova Mensagem do Site</h1>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px;">
          <h2 style="color: #4d4b4b; border-bottom: 2px solid #827751; padding-bottom: 10px;">
            Detalhes do Contato
          </h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong style="color: #4d4b4b;">Nome:</strong> <span style="color: #737373;">${data?.name ?? ''}</span></p>
            <p style="margin: 10px 0;"><strong style="color: #4d4b4b;">E-mail:</strong> <a href="mailto:${data?.email ?? ''}" style="color: #827751; text-decoration: none;">${data?.email ?? ''}</a></p>
            ${data?.phone ? `<p style="margin: 10px 0;"><strong style="color: #4d4b4b;">Telefone:</strong> <a href="tel:${data.phone}" style="color: #827751; text-decoration: none;">${data.phone}</a></p>` : ''}
            <p style="margin: 10px 0;"><strong style="color: #4d4b4b;">Assunto:</strong> <span style="color: #737373;">${data?.subject ?? ''}</span></p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #4d4b4b; margin-bottom: 10px;">Mensagem:</h3>
            <div style="background: #f9f9f9; padding: 20px; border-radius: 4px; border-left: 4px solid #827751;">
              <p style="color: #737373; line-height: 1.6; margin: 0; white-space: pre-wrap;">${data?.message ?? ''}</p>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="color: #999; font-size: 12px; margin: 5px 0;">
              📅 Recebido em: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
            </p>
            <p style="color: #999; font-size: 12px; margin: 5px 0;">
              🆔 ID do contato: ${contact?.id ?? ''}
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
          <p>Este é um e-mail automático do site Karoline Menegazzo Advocacia</p>
        </div>
      </div>
    `;

    // Extract app name from NEXTAUTH_URL for sender alias
    const appUrl = process.env.NEXTAUTH_URL ?? '';
    const hostname = appUrl ? new URL(appUrl).hostname : 'localhost';
    const appName = hostname.split('.')?.[0] ?? 'Karoline Menegazzo';

    // Send email notification
    try {
      const response = await fetch('https://apps.abacus.ai/api/sendNotificationEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deployment_token: process.env.ABACUSAI_API_KEY,
          app_id: process.env.WEB_APP_ID,
          notification_id: process.env.NOTIF_ID_FORMULRIO_DE_CONTATO,
          subject: `📧 Nova Mensagem do Site - ${data?.name ?? 'Cliente'}`,
          body: htmlBody,
          is_html: true,
          recipient_email: 'karolmenegazzo.adv@gmail.com',
          sender_email: `noreply@${hostname}`,
          sender_alias: `${appName} - Formulário de Contato`,
        }),
      });

      const result = await response.json();
      
      if (!result?.success) {
        // Check if notification was disabled by user
        if (result?.notification_disabled) {
          console.log('Notification disabled by user, skipping email');
        } else {
          console.error('Failed to send notification email:', result?.message ?? 'Unknown error');
        }
      }
    } catch (emailError) {
      console.error('Error sending notification email:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
      contactId: contact?.id ?? null,
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao processar a mensagem. Por favor, tente novamente.' },
      { status: 500 }
    );
  }
}
