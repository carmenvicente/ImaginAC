'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/auth';
import { COLORES_CATEGORIA, type Pictograma, type CategoriaPictograma } from '@/lib/ia/arasaac';

interface CuentoCompleto {
  id: string;
  titulo: string;
  tipo: string;
  tematica: string;
  finalidad_pedagogica: string;
  contenido_json: {
    texto: string;
    palabrasClave: string[];
    emociones: string[];
    personajes: { nombre: string; descripcion: string }[];
  };
  pictogramas: Pictograma[];
}

interface VisorCuentoProps {
  cuentoId: string;
}

export function VisorCuento({ cuentoId }: VisorCuentoProps) {
  const [cuento, setCuento] = useState<CuentoCompleto | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pictogramaExpandido, setPictogramaExpandido] = useState<string | null>(null);

  useEffect(() => {
    async function cargarCuento() {
      try {
        const { data: actividad } = await supabase
          .from('actividades')
          .select('*')
          .eq('id', cuentoId)
          .single();

        if (!actividad) {
          setError('Cuento no encontrado');
          return;
        }

        const { data: pictogramas } = await supabase
          .from('pictogramas')
          .select('*')
          .eq('actividad_id', cuentoId)
          .order('orden_en_cuento');

        // --- MAPEO DE NOMBRES AQUÍ ---
        const pictogramasFormateados: Pictograma[] = (pictogramas || []).map((p: any) => ({
          codigoSpc: p.codigo_spc, // convertimos de codigo_spc a codigoSpc
          textoOriginal: p.texto_original, // convertimos de texto_original a textoOriginal
          categoria: p.categoria,
          orden: p.orden_en_cuento,
          urlImagen: p.url_imagen, // <--- ESTA ES LA CLAVE: de url_imagen a urlImagen
        }));

        setCuento({
          ...actividad,
          pictogramas: pictogramasFormateados,
        });
      } catch {
        setError('Error al cargar el cuento');
      } finally {
        setCargando(false);
      }
    }

    cargarCuento();
  }, [cuentoId]);

  if (cargando) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--marca)] border-t-transparent" />
      </div>
    );
  }

  if (error || !cuento) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error || 'Error desconocido'}</div>
    );
  }

  const pictogramasPorCategoria = () => {
    const grupos: Record<CategoriaPictograma, Pictograma[]> = {
      VERBO: [],
      PERSONA: [],
      ADJETIVO: [],
      OBJETO: [],
      OTRO: [],
    };

    cuento.pictogramas.forEach((p) => {
      grupos[p.categoria].push(p);
    });

    return grupos;
  };

  const grupos = pictogramasPorCategoria();

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-2xl">
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">{cuento.titulo}</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-[var(--marca)] text-white text-sm rounded-full">
            {cuento.tematica}
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
            Tipo: {cuento.tipo}
          </span>
        </div>
        <p className="text-sm text-[var(--foreground)] opacity-70 mb-4">
          <strong>Finalidad pedagógica:</strong> {cuento.finalidad_pedagogica}
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">Texto del cuento</h3>
        <div className="prose max-w-none">
          {cuento.contenido_json.texto.split('\n\n').map((parrafo, i) => (
            <p key={i} className="mb-4 text-[var(--foreground)] leading-relaxed">
              {parrafo}
            </p>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">Pictogramas del cuento</h3>
        <div className="space-y-4">
          {(Object.keys(grupos) as CategoriaPictograma[]).map((categoria) => {
            if (grupos[categoria].length === 0) return null;

            return (
              <div key={categoria}>
                <h4
                  className="text-sm font-semibold mb-2 capitalize"
                  style={{ color: COLORES_CATEGORIA[categoria] }}
                >
                  {categoria.toLowerCase()}s ({grupos[categoria].length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {grupos[categoria].map((picto, index) => (
                    <button
                      key={`${picto.codigoSpc}-${index}`}
                      onClick={() =>
                        setPictogramaExpandido(
                          pictogramaExpandido === picto.codigoSpc ? null : picto.codigoSpc
                        )
                      }
                      className="relative group"
                    >
                      <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-md transition-transform group-hover:scale-105"
                        style={{
                          backgroundColor: COLORES_CATEGORIA[categoria],
                        }}
                      >
                        <img
                          // Si urlImagen existe, la ponemos. Si es un string vacío, pasamos undefined (o null)
                          src={picto.urlImagen || undefined}
                          alt={picto.textoOriginal}
                          className="w-full h-full object-contain p-1"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                      {pictogramaExpandido === picto.codigoSpc && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap z-10">
                          {picto.textoOriginal}
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                        </div>
                      )}
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {picto.codigoSpc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">Personajes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cuento.contenido_json.personajes.map((personaje, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-xl">
              <h4 className="font-bold text-[var(--foreground)]">{personaje.nombre}</h4>
              <p className="text-sm text-[var(--foreground)] opacity-70">{personaje.descripcion}</p>
            </div>
          ))}
        </div>
      </div>

      {cuento.contenido_json.emociones.length > 0 && (
        <div className="bg-white p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">Emociones trabajadas</h3>
          <div className="flex flex-wrap gap-2">
            {cuento.contenido_json.emociones.map((emocion, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm"
              >
                {emocion}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <button className="flex-1 py-3 bg-[var(--marca)] text-white font-medium rounded-lg hover:bg-[var(--marca-hover)] transition-colors">
          Exportar PDF
        </button>
        <button className="flex-1 py-3 bg-gray-100 text-[var(--foreground)] font-medium rounded-lg hover:bg-gray-200 transition-colors">
          Habilitar para alumnos
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 mt-6">
        <p className="text-sm text-[var(--foreground)] opacity-80">
          <strong>Autor pictogramas:</strong> Sergio Palao. <strong>Origen:</strong>{' '}
          <a
            href="http://www.arasaac.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--marca)] hover:underline"
          >
            ARASAAC (http://www.arasaac.org)
          </a>
          . <strong>Licencia:</strong> CC (BY-NC-SA). <strong>Propiedad:</strong> Gobierno de Aragón
          (España)
        </p>
      </div>
    </div>
  );
}
