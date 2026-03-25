'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '@/lib/auth';
import type { Pictograma, CategoriaPictograma } from '@/lib/ia/arasaac';
import {
  DiapositivaPortada,
  DiapositivaFrase,
  type Frase,
  type Diapositiva,
} from './DiapositivaPortada';

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
  autor?: string;
}

interface VisorCuentoProps {
  cuentoId: string;
}

function separarEnFrases(texto: string): string[] {
  return texto
    .split(/(?<=[.!?])\s+/)
    .map((f) => f.trim())
    .filter((f) => f.length > 0);
}

function distribuirPictogramas(frases: string[], pictos: Pictograma[]): Frase[] {
  if (frases.length === 0) return [];

  const pictosPorFrase = Math.ceil(pictos.length / frases.length);

  return frases.map((texto, i) => ({
    texto: texto.endsWith('.') || texto.endsWith('!') || texto.endsWith('?') ? texto : texto + '.',
    pictogramas: pictos.slice(
      i * pictosPorFrase,
      Math.min((i + 1) * pictosPorFrase, pictos.length)
    ),
  }));
}

function construirDiapositivas(cuento: CuentoCompleto): Diapositiva[] {
  const frases = separarEnFrases(cuento.contenido_json.texto);
  const frasesConPictos = distribuirPictogramas(frases, cuento.pictogramas || []);

  return [
    {
      tipo: 'portada',
      titulo: cuento.titulo,
      finalidad: cuento.finalidad_pedagogica,
      autor: cuento.autor || 'Carmen Vicente Crespo',
    },
    ...frasesConPictos.map((f, i) => ({
      tipo: 'contenido' as const,
      fraseActual: f,
      indice: i + 1,
      total: frasesConPictos.length,
    })),
  ];
}

export function VisorCuento({ cuentoId }: VisorCuentoProps) {
  const [cuento, setCuento] = useState<CuentoCompleto | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [indiceDiapositiva, setIndiceDiapositiva] = useState(0);

  const diapositivas = useMemo(() => {
    if (!cuento) return [];
    return construirDiapositivas(cuento);
  }, [cuento]);

  const irAnterior = useCallback(() => {
    setIndiceDiapositiva((prev) => Math.max(0, prev - 1));
  }, []);

  const irSiguiente = useCallback(() => {
    setIndiceDiapositiva((prev) => Math.min(diapositivas.length - 1, prev + 1));
  }, [diapositivas.length]);

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

        const pictogramasFormateados: Pictograma[] = (pictogramas || []).map((p: any) => ({
          codigoSpc: p.codigo_spc || '',
          textoOriginal: p.texto_original || '',
          categoria: (p.categoria || 'OBJETO') as CategoriaPictograma,
          orden: p.orden_en_cuento || 0,
          urlImagen: p.url_imagen || '',
        }));

        setCuento({
          ...actividad,
          pictogramas: pictogramasFormateados,
        });
        setIndiceDiapositiva(0);
      } catch {
        setError('Error al cargar el cuento');
      } finally {
        setCargando(false);
      }
    }

    cargarCuento();
  }, [cuentoId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        irAnterior();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        irSiguiente();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [irAnterior, irSiguiente]);

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

  const diapositivaActual = diapositivas[indiceDiapositiva];
  const esPrimera = indiceDiapositiva === 0;
  const esUltima = indiceDiapositiva === diapositivas.length - 1;

  return (
    <div className="space-y-8 pb-24">
      <div className="max-w-5xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">{cuento.titulo}</h2>
        <p className="text-[var(--foreground)] leading-relaxed whitespace-pre-line">
          {cuento.contenido_json.texto}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {cuento.contenido_json.emociones.map((emocion, i) => (
            <span key={i} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
              {emocion}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-12">
        <h3 className="text-xl font-semibold text-[var(--foreground)] mb-6">
          Versión con pictogramas
        </h3>

        <div className="relative bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden">
          <div className="aspect-video bg-gray-50 flex items-center justify-center">
            {diapositivaActual?.tipo === 'portada' ? (
              <DiapositivaPortada
                titulo={diapositivaActual.titulo!}
                finalidad={diapositivaActual.finalidad!}
                autor={diapositivaActual.autor!}
              />
            ) : (
              <DiapositivaFrase
                frase={diapositivaActual!.fraseActual!}
                indice={diapositivaActual!.indice!}
                total={diapositivaActual!.total!}
              />
            )}
          </div>

          <button
            type="button"
            onClick={irAnterior}
            disabled={esPrimera}
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
              esPrimera
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 active:scale-95 border border-gray-200'
            }`}
            aria-label="Anterior"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={irSiguiente}
            disabled={esUltima}
            className={`absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
              esUltima
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-[var(--marca)] text-white hover:bg-[var(--marca-hover)] active:scale-95'
            }`}
            aria-label="Siguiente"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium">
            {indiceDiapositiva + 1} / {diapositivas.length}
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {diapositivas.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndiceDiapositiva(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === indiceDiapositiva ? 'bg-[var(--marca)] w-6' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Ir a diapositiva ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {cuento.contenido_json.personajes.length > 0 && (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Personajes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cuento.contenido_json.personajes.map((personaje, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-xl">
                <h4 className="font-bold text-[var(--foreground)]">{personaje.nombre}</h4>
                <p className="text-sm text-[var(--foreground)] opacity-70">
                  {personaje.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto flex gap-4">
        <button className="flex-1 py-3 bg-[var(--marca)] text-white font-medium rounded-lg hover:bg-[var(--marca-hover)] transition-colors">
          Exportar PDF
        </button>
        <button className="flex-1 py-3 bg-gray-100 text-[var(--foreground)] font-medium rounded-lg hover:bg-gray-200 transition-colors">
          Habilitar para alumnos
        </button>
      </div>
    </div>
  );
}
