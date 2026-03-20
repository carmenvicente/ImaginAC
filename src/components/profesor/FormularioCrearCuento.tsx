'use client';

import { useState, useEffect, useCallback } from 'react';
import { SelectorIdioma, IDIOMAS_DISPONIBLES } from '@/components/ui/SelectorIdioma';
import { useRouter } from 'next/navigation';

const CLAVE_BORRADOR = 'borrador_cuento';

interface FormularioCuentoProps {
  profesorId: string;
}

interface DatosFormulario {
  titulo: string;
  tematica: string;
  finalidadPedagogica: string;
  idioma: string;
  longitud: 'corto' | 'medio' | 'largo';
}

const DATOS_INICIALES: DatosFormulario = {
  titulo: '',
  tematica: '',
  finalidadPedagogica: '',
  idioma: 'ES',
  longitud: 'medio',
};

function guardarBorrador(datos: DatosFormulario) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CLAVE_BORRADOR, JSON.stringify(datos));
  } catch {
    // Ignorar errores de localStorage
  }
}

function cargarBorrador(): DatosFormulario {
  if (typeof window === 'undefined') return DATOS_INICIALES;
  try {
    const guardado = localStorage.getItem(CLAVE_BORRADOR);
    if (guardado) {
      return JSON.parse(guardado);
    }
  } catch {
    // Ignorar errores de localStorage
  }
  return DATOS_INICIALES;
}

function limpiarBorrador() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(CLAVE_BORRADOR);
  } catch {
    // Ignorar errores de localStorage
  }
}

export function FormularioCrearCuento({ profesorId }: FormularioCuentoProps) {
  const router = useRouter();
  const [titulo, setTitulo] = useState('');
  const [tematica, setTematica] = useState('');
  const [finalidadPedagogica, setFinalidadPedagogica] = useState('');
  const [idioma, setIdioma] = useState('ES');
  const [longitud, setLongitud] = useState<'corto' | 'medio' | 'largo'>('medio');
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const [borradorRecuperado, setBorradorRecuperado] = useState(false);

  useEffect(() => {
    const borrador = cargarBorrador();
    setTitulo(borrador.titulo);
    setTematica(borrador.tematica);
    setFinalidadPedagogica(borrador.finalidadPedagogica);
    setIdioma(borrador.idioma);
    setLongitud(borrador.longitud);
    setBorradorRecuperado(true);
  }, []);

  const sincronizarBorrador = useCallback(() => {
    if (!borradorRecuperado) return;
    guardarBorrador({
      titulo,
      tematica,
      finalidadPedagogica,
      idioma,
      longitud,
    });
  }, [titulo, tematica, finalidadPedagogica, idioma, longitud, borradorRecuperado]);

  useEffect(() => {
    sincronizarBorrador();
  }, [sincronizarBorrador]);

  const tematicas = [
    { valor: 'animales', label: 'Animales' },
    { valor: 'familia', label: 'Familia' },
    { valor: 'escuela', label: 'Escuela' },
    { valor: 'emociones', label: 'Emociones' },
    { valor: 'naturaleza', label: 'Naturaleza' },
    { valor: 'amistad', label: 'Amistad' },
    { valor: 'comida', label: 'Comida' },
    { valor: 'casa', label: 'Casa' },
    { valor: 'transporte', label: 'Transporte' },
    { valor: 'diversion', label: 'Diversión' },
  ];

  const palabrasPorLongitud = {
    corto: 100,
    medio: 300,
    largo: 600,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCargando(true);

    try {
      const respuesta = await fetch('/api/cuentos/generar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profesorId,
          titulo,
          tematica,
          finalidadPedagogica,
          idioma,
          longitud: palabrasPorLongitud[longitud],
        }),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.error || 'Error al generar el cuento');
      }

      limpiarBorrador();
      router.push(`/profesor/cuento/${datos.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setCargando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}

      <div>
        <label htmlFor="titulo" className="block text-sm font-medium text-[var(--foreground)] mb-1">
          Título del cuento
        </label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--marca)] focus:border-transparent"
          placeholder="El dragón que tenía miedo"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="tematica"
            className="block text-sm font-medium text-[var(--foreground)] mb-1"
          >
            Temática
          </label>
          <select
            id="tematica"
            value={tematica}
            onChange={(e) => setTematica(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--marca)] focus:border-transparent"
            required
          >
            <option value="">Selecciona una temática</option>
            {tematicas.map((t) => (
              <option key={t.valor} value={t.valor}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <SelectorIdioma valor={idioma} onCambio={setIdioma} id="idioma" />
      </div>

      <div>
        <label
          htmlFor="finalidad"
          className="block text-sm font-medium text-[var(--foreground)] mb-1"
        >
          Finalidad pedagógica
        </label>
        <textarea
          id="finalidad"
          value={finalidadPedagogica}
          onChange={(e) => setFinalidadPedagogica(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--marca)] focus:border-transparent resize-none"
          rows={3}
          placeholder="Este cuento ayuda al niño a identificar y expresar el miedo, fomentando la comprensión de que es normal sentir miedo y que hay estrategias para superarlo."
          maxLength={500}
          required
        />
        <p className="text-xs text-[var(--foreground)] opacity-50 mt-1">
          {finalidadPedagogica.length}/500 caracteres
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
          Longitud del cuento
        </label>
        <div className="flex gap-4">
          {(['corto', 'medio', 'largo'] as const).map((opcion) => (
            <label key={opcion} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="longitud"
                value={opcion}
                checked={longitud === opcion}
                onChange={() => setLongitud(opcion)}
                className="w-4 h-4 text-[var(--marca)] focus:ring-[var(--marca)]"
              />
              <span className="text-sm text-[var(--foreground)] capitalize">
                {opcion} ({palabrasPorLongitud[opcion]} palabras)
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-sm text-[var(--foreground)] mb-2">
          Resumen de la generación
        </h4>
        <ul className="text-sm text-[var(--foreground)] opacity-70 space-y-1">
          <li>
            <strong>Título:</strong> {titulo || 'Sin definir'}
          </li>
          <li>
            <strong>Temática:</strong>{' '}
            {tematica ? tematicas.find((t) => t.valor === tematica)?.label : 'Sin definir'}
          </li>
          <li>
            <strong>Idioma:</strong> {IDIOMAS_DISPONIBLES.find((i) => i.codigo === idioma)?.nombre}
          </li>
          <li>
            <strong>Longitud:</strong> ~{palabrasPorLongitud[longitud]} palabras
          </li>
        </ul>
      </div>

      <button
        type="submit"
        disabled={cargando || !titulo || !tematica || !finalidadPedagogica}
        className="w-full py-3 bg-[var(--marca)] text-white font-medium rounded-lg hover:bg-[var(--marca-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {cargando ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Generando cuento...
          </span>
        ) : (
          'Generar Cuento con Pictogramas'
        )}
      </button>
    </form>
  );
}
