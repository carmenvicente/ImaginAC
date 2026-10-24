import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_DESTINO = process.env.FEEDBACK_EMAIL || 'cvicentecrespos@gmail.com';

/** Escapa caracteres HTML para evitar inyección en el cuerpo del email */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: NextRequest) {
  // Rate limit: máximo 3 feedbacks por IP cada 5 minutos
  const ip = getClientIp(request);
  const rateCheck = checkRateLimit(ip, 'feedback', { limit: 3, windowSecs: 300 });
  if (!rateCheck.ok) {
    return NextResponse.json(
      { error: `Demasiados mensajes enviados. Espera ${rateCheck.retryAfter} segundos.` },
      { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfter) } }
    );
  }

  try {
    const body = await request.json();
    const { mensaje, email, url, timestamp } = body;

    if (!mensaje?.trim()) {
      return NextResponse.json({ error: 'El mensaje es obligatorio' }, { status: 400 });
    }

    if (!email?.trim()) {
      return NextResponse.json({ error: 'El email es obligatorio' }, { status: 400 });
    }

    // Validación de formato del email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'El email no tiene un formato válido' }, { status: 400 });
    }

    const fechaFormateada = timestamp
      ? new Date(timestamp).toLocaleString('es-ES', {
          dateStyle: 'long',
          timeStyle: 'short',
        })
      : new Date().toLocaleString('es-ES');

    const mensajeSeguro = escapeHtml(mensaje.trim());
    const emailSeguro = escapeHtml(email.trim());

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0d766e; border-bottom: 2px solid #40E0D0; padding-bottom: 10px;">
          📬 Nuevo feedback de ImaginAC
        </h2>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #1f2937; margin-top: 0;">Contenido:</h3>
          <p style="color: #374151; line-height: 1.6;">${mensajeSeguro}</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">
              <strong style="color: #1f2937;">Email de contacto:</strong>
            </td>
            <td style="padding: 8px 0; font-size: 14px;">
              <a href="mailto:${emailSeguro}" style="color: #40E0D0;">${emailSeguro}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">
              <strong style="color: #1f2937;">Página de origen:</strong>
            </td>
            <td style="padding: 8px 0; color: #40E0D0; font-size: 14px;">
              ${url || 'No disponible'}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">
              <strong style="color: #1f2937;">Fecha/Hora:</strong>
            </td>
            <td style="padding: 8px 0; color: #374151; font-size: 14px;">
              ${fechaFormateada}
            </td>
          </tr>
        </table>
        
        <p style="color: #9ca3af; font-size: 12px; margin-top: 30px; text-align: center;">
          Enviado desde el widget de sugerencias de ImaginAC
        </p>
      </div>
    `;

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: EMAIL_DESTINO,
      subject: `Sugerencia de ${emailSeguro} en ImaginAC`,
      html: htmlContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Feedback API] Error:', error);
    return NextResponse.json({ error: 'Error al enviar el feedback' }, { status: 500 });
  }
}
