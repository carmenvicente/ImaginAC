'use client';

import { useState, useEffect, useCallback } from 'react';
import { SelectorIdioma, IDIOMAS_DISPONIBLES } from '@/components/ui/SelectorIdioma';
import { useRouter } from 'next/navigation';
import { useLanguageStore, traduccionesUI } from '@/lib/stores/useLanguageStore';

interface CuentoGenerado {
  titulo: string;
  texto: string;
  palabrasClave: string[];
  emociones: string[];
  personajes: string[];
}

interface Pictograma {
  codigoSpc: string;
  textoOriginal: string;
  categoria: string;
  urlImagen: string;
  orden: number;
}

const CLAVE_BORRADOR = 'borrador_cuento';

interface FormularioCuentoProps {
  profesorId: string;
}

interface DatosFormulario {
  titulo: string;
  tematica: string;
  finalidadPedagogica: string;
  idioma: string;
  longitud: '100' | '200' | '300';
}

const DATOS_INICIALES: DatosFormulario = {
  titulo: '',
  tematica: '',
  finalidadPedagogica: '',
  idioma: 'ES',
  longitud: '200',
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
  const idiomaGlobal = useLanguageStore((s) => s.idiomaActual);
  const traducciones = traduccionesUI[idiomaGlobal] || traduccionesUI['ES'];

  const [titulo, setTitulo] = useState('');
  const [tematica, setTematica] = useState('');
  const [finalidadPedagogica, setFinalidadPedagogica] = useState('');
  const [idioma, setIdioma] = useState(idiomaGlobal);
  const [longitud, setLongitud] = useState<'100' | '200' | '300'>('200');
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const [borradorRecuperado, setBorradorRecuperado] = useState(false);
  const [cuentoDemo, setCuentoDemo] = useState<{
    cuento: CuentoGenerado;
    pictogramas: Pictograma[];
  } | null>(null);

  useEffect(() => {
    const borrador = cargarBorrador();
    setTitulo(borrador.titulo);
    setTematica(borrador.tematica);
    setFinalidadPedagogica(borrador.finalidadPedagogica);
    const idiomaDelBorrador = borrador.idioma && borrador.idioma.trim() !== '';
    setIdioma(idiomaDelBorrador ? borrador.idioma : idiomaGlobal);
    const longitudValida = ['100', '200', '300'].includes(borrador.longitud);
    setLongitud(longitudValida ? (borrador.longitud as '100' | '200' | '300') : '200');
    setBorradorRecuperado(true);
  }, [idiomaGlobal]);

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
          longitud: Number(longitud),
        }),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.error || 'Error al generar el cuento');
      }

      // MODO DEMO: Mostrar cuento inline
      if (datos.esDemo) {
        setCuentoDemo({
          cuento: datos.cuento,
          pictogramas: datos.pictogramas,
        });
        setCargando(false);
        return;
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
          {traducciones.formTituloCuento || 'Título del cuento'}
        </label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--marca)] focus:border-transparent"
          placeholder={traducciones.formPlaceholderTitulo || 'El dragón que tenía miedo'}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="tematica"
            className="block text-sm font-medium text-[var(--foreground)] mb-1"
          >
            {traducciones.formTematica || 'Temática'}
          </label>
          <select
            id="tematica"
            value={tematica}
            onChange={(e) => setTematica(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--marca)] focus:border-transparent"
            required
          >
            <option value="">{traducciones.formSelectTematica || 'Selecciona una temática'}</option>
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
          {traducciones.formFinalidad || 'Finalidad pedagógica'}
        </label>
        <textarea
          id="finalidad"
          value={finalidadPedagogica}
          onChange={(e) => setFinalidadPedagogica(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--marca)] focus:border-transparent resize-none"
          rows={3}
          placeholder={
            traducciones.formPlaceholderFinalidad ||
            'Este cuento ayuda al niño a identificar y expresar el miedo, fomentando la comprensión de que es normal sentir miedo y que hay estrategias para superarlo.'
          }
          maxLength={500}
          required
        />
        <p className="text-xs text-[var(--foreground)] opacity-50 mt-1">
          {finalidadPedagogica.length}/500 {traducciones.formCaracteres || 'caracteres'}
        </p>
      </div>

      <div>
        <label
          htmlFor="longitud"
          className="block text-sm font-medium text-[var(--foreground)] mb-1"
        >
          {traducciones.formLongitud || 'Longitud del cuento'}
        </label>
        <select
          id="longitud"
          value={longitud}
          onChange={(e) => setLongitud(e.target.value as '100' | '200' | '300')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--marca)] focus:border-transparent"
        >
          <option value="100">{traducciones.formPalabras100 || '100 palabras (Micro)'}</option>
          <option value="200">{traducciones.formPalabras200 || '200 palabras (Corto)'}</option>
          <option value="300">{traducciones.formPalabras300 || '300 palabras (Estándar)'}</option>
        </select>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-sm text-[var(--foreground)] mb-2">
          {traducciones.formResumen || 'Resumen de la generación'}
        </h4>
        <ul className="text-sm text-[var(--foreground)] opacity-70 space-y-1">
          <li>
            <strong>{traducciones.formLabelTitulo || 'Título'}:</strong>{' '}
            {titulo || traducciones.formSinDefinir || 'Sin definir'}
          </li>
          <li>
            <strong>{traducciones.formLabelTematica || 'Temática'}:</strong>{' '}
            {tematica
              ? tematicas.find((t) => t.valor === tematica)?.label
              : traducciones.formSinDefinir || 'Sin definir'}
          </li>
          <li>
            <strong>{traducciones.formLabelIdioma || 'Idioma'}:</strong>{' '}
            {IDIOMAS_DISPONIBLES.find((i) => i.codigo === idioma)?.nombre}
          </li>
          <li>
            <strong>{traducciones.formLabelLongitud || 'Longitud'}:</strong> ~{longitud}{' '}
            {traducciones.formPalabras || 'palabras'}
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
            {traducciones.formGenerando || 'Generando cuento...'}
          </span>
        ) : (
          traducciones.formBotonGenerar || 'Generar Cuento con Pictogramas'
        )}
      </button>

      {cuentoDemo && (
        <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg border-2 border-[var(--marca)]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-[var(--marca)]">{cuentoDemo.cuento.titulo}</h3>
            <button
              onClick={() => setCuentoDemo(null)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Cerrar
            </button>
          </div>
          <div className="prose max-w-none mb-6">
            <p className="whitespace-pre-wrap">{cuentoDemo.cuento.texto}</p>
          </div>
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Pictogramas del cuento:</h4>
            <div className="flex flex-wrap gap-3">
              {cuentoDemo.pictogramas.map((picto, index) =>
                picto.urlImagen ? (
                  <div key={index} className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
                    <img
                      src={picto.urlImagen}
                      alt={picto.textoOriginal || 'Pictograma'}
                      className="w-16 h-16 object-contain"
                    />
                    <span className="text-xs mt-1 text-center">{picto.textoOriginal}</span>
                  </div>
                ) : null
              )}
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500">
            Autor pictogramas: Sergio Palao. Origen: ARASAAC (http://www.arasaac.org). Licencia: CC
            (BY-NC-SA). Propiedad: Gobierno de Aragón (España)
          </p>
        </div>
      )}
    </form>
  );
}
