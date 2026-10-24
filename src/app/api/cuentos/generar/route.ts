import { NextRequest, NextResponse } from 'next/server';
import { generarCuento, QuotaExceededError } from '@/lib/ia/generador';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // Rate limit: máximo 10 cuentos por IP cada 10 minutos
  const ip = getClientIp(request);
  const rateCheck = checkRateLimit(ip, 'generar-cuento', { limit: 10, windowSecs: 600 });
  if (!rateCheck.ok) {
    return NextResponse.json(
      { error: `Has generado muchos cuentos seguidos. Espera ${rateCheck.retryAfter} segundos antes de intentarlo de nuevo.` },
      { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfter) } }
    );
  }

  try {
    const body = await request.json();
    const { titulo, tematica, finalidadPedagogica, idioma, longitud } = body;

    if (!titulo || !tematica || !finalidadPedagogica || !idioma || !longitud) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    const resultado = await generarCuento({
      titulo,
      tematica,
      finalidadPedagogica,
      idioma,
      palabrasMax: longitud,
    });

    return NextResponse.json({
      id: `cuento-${Date.now()}`,
      titulo: resultado.cuento.titulo,
      cuento: resultado.cuento,
      pictogramas: resultado.pictogramas,
    });
  } catch (error: unknown) {
    if (error instanceof QuotaExceededError) {
      return NextResponse.json(
        { error: 'El sistema de IA está ocupado ahora mismo. Espera un minuto y vuelve a intentarlo. (ref: quota)' },
        { status: 429 }
      );
    }

    console.error('ERROR EN API:', error);
    const mensajeError = error instanceof Error ? error.message : 'Ha ocurrido un error inesperado. Inténtalo de nuevo. (ref: unknown)';
    return NextResponse.json(
      { error: mensajeError },
      { status: 500 }
    );
  }
}
