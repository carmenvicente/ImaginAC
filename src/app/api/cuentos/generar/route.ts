import { NextRequest, NextResponse } from 'next/server';
import { generarCuento, QuotaExceededError } from '@/lib/ia/generador';

export async function POST(request: NextRequest) {
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
  } catch (error: any) {
    if (error instanceof QuotaExceededError) {
      return NextResponse.json(
        { error: 'El sistema de IA está ocupado ahora mismo. Espera un minuto y vuelve a intentarlo. (ref: quota)' },
        { status: 429 }
      );
    }

    console.error('ERROR EN API:', error);
    return NextResponse.json(
      { error: error?.message || 'Ha ocurrido un error inesperado. Inténtalo de nuevo. (ref: unknown)' },
      { status: 500 }
    );
  }
}
