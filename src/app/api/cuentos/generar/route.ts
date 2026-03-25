import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { generarCuento, QuotaExceededError } from '@/lib/ia/generador';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { profesorId, titulo, tematica, finalidadPedagogica, idioma, longitud } = body;

    // MODO DEMO: Generar sin guardar en Supabase
    if (profesorId === 'demo') {
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
        id: `demo-${Date.now()}`,
        titulo: resultado.cuento.titulo,
        mensaje: 'Cuento generado correctamente (modo demo)',
        esDemo: true,
        cuento: resultado.cuento,
        pictogramas: resultado.pictogramas,
      });
    }

    // MODO NORMAL: Requiere autenticación
    // 1. Obtenemos el almacén de cookies de Next.js
    const cookieStore = await cookies();

    // 2. Creamos el cliente de Supabase que SÍ sabe leer cookies
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    // 3. CAMBIO CLAVE: Usamos getUser() para mayor seguridad
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // 4. Comprobamos directamente el user
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    // 5. Usamos user.id
    const { data: perfil } = await supabase
      .from('usuarios')
      .select('rol')
      .eq('id', user.id)
      .single();

    if (perfil?.rol !== 'PROFESOR_PT') {
      return NextResponse.json({ error: 'Solo profesores pueden crear cuentos' }, { status: 403 });
    }

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

    // 6. Usamos user.id al insertar la actividad
    const { data: actividad, error: errorActividad } = await supabase
      .from('actividades')
      .insert({
        profesor_id: user.id,
        titulo: resultado.cuento.titulo,
        tipo: 'CUENTO',
        tematica,
        finalidad_pedagogica: finalidadPedagogica,
        contenido_json: {
          texto: resultado.cuento.texto,
          palabrasClave: resultado.cuento.palabrasClave,
          emociones: resultado.cuento.emociones,
          personajes: resultado.cuento.personajes,
        },
        es_activo: true,
      })
      .select()
      .single();

    if (errorActividad || !actividad) {
      console.error('Error al crear actividad:', errorActividad);
      return NextResponse.json({ error: 'Error al guardar el cuento' }, { status: 500 });
    }

    const { data: idiomaData } = await supabase
      .from('idiomas')
      .select('id')
      .eq('codigo', idioma)
      .single();

    if (idiomaData) {
      await supabase.from('contenido_idioma').insert({
        actividad_id: actividad.id,
        idioma_id: idiomaData.id,
        texto_traducido: resultado.cuento.texto,
        transcripcion_pictos: resultado.pictogramas.map((p) => ({
          codigoSpc: p.codigoSpc,
          texto: p.textoOriginal,
          categoria: p.categoria,
          urlImagen: p.urlImagen,
        })),
      });
    }

    for (const picto of resultado.pictogramas) {
      await supabase.from('pictogramas').insert({
        actividad_id: actividad.id,
        texto_original: picto.textoOriginal,
        codigo_spc: picto.codigoSpc,
        categoria: picto.categoria,
        orden_en_cuento: picto.orden,
        url_imagen: picto.urlImagen,
      });
    }

    return NextResponse.json({
      id: actividad.id,
      titulo: actividad.titulo,
      mensaje: 'Cuento generado correctamente',
    });
  } catch (error: any) {
    if (error instanceof QuotaExceededError) {
      console.warn('⚠️ Cuota de API excedida:', error.message);
      return NextResponse.json(
        {
          error:
            'El sistema de IA está saturado ahora mismo. Por favor, espera un minuto y vuelve a intentarlo.',
        },
        { status: 429 }
      );
    }

    console.error('ERROR CRÍTICO EN API:', error);
    return NextResponse.json(
      {
        error: error?.message || 'Error interno del servidor',
        detalles: error?.toString(),
      },
      { status: 500 }
    );
  }
}
