import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_DESTINO = process.env.FEEDBACK_EMAIL || 'cvicentecrespos@gmail.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mensaje, url, timestamp } = body;

    if (!mensaje?.trim()) {
      return NextResponse.json({ error: 'El mensaje es obligatorio' }, { status: 400 });
    }

    const fechaFormateada = timestamp
      ? new Date(timestamp).toLocaleString('es-ES', {
          dateStyle: 'long',
          timeStyle: 'short',
        })
      : new Date().toLocaleString('es-ES');

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0d766e; border-bottom: 2px solid #40E0D0; padding-bottom: 10px;">
          📬 Nuevo feedback de ImaginAC
        </h2>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #1f2937; margin-top: 0;">Contenido:</h3>
          <p style="color: #374151; line-height: 1.6;">${mensaje.trim()}</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse;">
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
      subject: 'Sugerencia o Error en ImaginAC',
      html: htmlContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Feedback API] Error:', error);
    return NextResponse.json({ error: 'Error al enviar el feedback' }, { status: 500 });
  }
}
