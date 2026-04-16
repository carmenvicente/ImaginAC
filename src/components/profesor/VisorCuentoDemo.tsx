'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { DiapositivaPortada } from './DiapositivaPortada';
import { BotonesAccion } from './BotonesAccion';

interface Segmento {
  texto: string;
  pictograma: string;
  urlImagen?: string;
}

interface DiapositivaContenido {
  texto: string;
  segmentos: Segmento[];
}

interface CuentoDemo {
  titulo: string;
  finalidad: string;
  texto: string;
  pictogramas: any[];
  diapositivas?: DiapositivaContenido[];
}

interface VisorCuentoDemoProps {
  cuento: CuentoDemo;
}

export function VisorCuentoDemo({ cuento }: VisorCuentoDemoProps) {
  const [indiceDiapositiva, setIndiceDiapositiva] = useState(0);

  const tieneDiapositivas = cuento.diapositivas && cuento.diapositivas.length > 0;
  const totalDiapositivas = tieneDiapositivas ? cuento.diapositivas!.length + 1 : 1;

  const irAnterior = useCallback(() => {
    setIndiceDiapositiva((prev) => Math.max(0, prev - 1));
  }, []);

  const irSiguiente = useCallback(() => {
    setIndiceDiapositiva((prev) => Math.min(totalDiapositivas - 1, prev + 1));
  }, [totalDiapositivas]);

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

  useEffect(() => {
    if (cuento && cuento.titulo) {
      setIndiceDiapositiva(0);
    }
  }, [cuento?.titulo, cuento?.texto]);

  useEffect(() => {
    if (cuento?.diapositivas) {
      const urls = cuento.diapositivas
        .flatMap((d) => d.segmentos?.map((s) => s.urlImagen))
        .filter(Boolean) as string[];
      [...new Set(urls)].forEach((url) => {
        const img = new Image();
        img.src = url;
      });
    }
  }, [cuento]);

  useEffect(() => {
    const handleSetSlideIndex = (e: CustomEvent<number>) => {
      setIndiceDiapositiva(e.detail);
    };

    window.addEventListener('set-slide-index', handleSetSlideIndex as EventListener);
    return () => {
      window.removeEventListener('set-slide-index', handleSetSlideIndex as EventListener);
    };
  }, []);

  const esPrimera = indiceDiapositiva === 0;
  const esUltima = indiceDiapositiva === totalDiapositivas - 1;
  const esPortada = indiceDiapositiva === 0;
  const diapositivaActual = tieneDiapositivas ? cuento.diapositivas![indiceDiapositiva - 1] : null;

  return (
    <div className="space-y-8">
      <div className="max-w-5xl mx-auto mb-12">
        <h2
          className="text-3xl md:text-4xl font-bold text-left mb-6"
          style={{ color: '#F4A460', fontFamily: 'var(--font-escolar)' }}
        >
          {cuento.titulo}
        </h2>
        <div
          className="text-[var(--foreground)] text-xl md:text-2xl leading-relaxed text-left whitespace-pre-line"
          style={{ fontFamily: 'var(--font-escolar)' }}
        >
          {cuento.texto}
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="relative bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden">
          <div
            data-slide-container
            className="aspect-video md:aspect-video max-h-[600px] bg-gray-50 flex flex-col"
          >
            {esPortada ? (
              <DiapositivaPortada
                titulo={cuento.titulo}
                finalidad={cuento.finalidad}
                autor="Carmen Vicente Crespo"
              />
            ) : (
              <div className="flex flex-col justify-between h-full w-full bg-[#d4feff]/30 relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#F4A460]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="text-center mt-4 md:mt-8 px-4">
                  <p
                    className="text-xl md:text-3xl font-bold text-[var(--foreground)] leading-relaxed max-w-3xl mx-auto"
                    style={{ fontFamily: 'var(--font-escolar)' }}
                  >
                    {diapositivaActual?.texto}
                  </p>
                  <p className="text-sm md:text-base text-gray-400 mt-3 font-medium">
                    {indiceDiapositiva} de {totalDiapositivas - 1}
                  </p>
                </div>

                <div className="flex-grow flex items-center justify-center pb-4 md:pb-6 px-4">
                  {diapositivaActual?.segmentos && diapositivaActual.segmentos.length > 0 ? (
                    <div className="flex border border-black rounded-lg max-w-[90%] overflow-x-auto">
                      {diapositivaActual.segmentos.map((segmento, i) => (
                        <div
                          key={i}
                          className={`flex flex-col flex-shrink-0 ${
                            i < diapositivaActual.segmentos.length - 1
                              ? 'border-r border-black'
                              : ''
                          }`}
                        >
                          <div className="w-24 h-24 md:w-32 md:h-32 bg-white flex items-center justify-center p-2">
                            {segmento.urlImagen ? (
                              <img
                                src={segmento.urlImagen}
                                alt={segmento.texto}
                                className="max-w-full max-h-full object-contain transition-opacity duration-200"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            ) : (
                              <span className="text-gray-500 text-xl font-bold text-center">
                                {segmento.texto.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div className="border-t border-black bg-white px-2 py-1">
                            <span
                              className="block text-center text-xs font-bold uppercase tracking-wide text-black"
                              style={{ fontFamily: 'OpenDyslexic, sans-serif' }}
                            >
                              {segmento.texto}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-400 py-4">
                      <p>Sin segmentos disponibles para esta frase</p>
                    </div>
                  )}
                </div>

                <div className="mt-auto pb-3 pt-2 px-4 bg-white/50 border-t border-gray-100">
                  <p
                    className="text-sm md:text-lg text-gray-600 leading-relaxed text-center"
                    style={{ fontFamily: 'var(--font-escolar)' }}
                  >
                    <strong>Autor pictogramas:</strong> Sergio Palao <strong>Origen:</strong>{' '}
                    <a
                      href="http://arasaac.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F4A460] hover:underline font-bold"
                    >
                      ARASAAC (http://arasaac.org)
                    </a>{' '}
                    <strong>Licencia:</strong> CC (BY-NC-SA)
                  </p>
                </div>
              </div>
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
        </div>

        <div className="flex items-center justify-between mt-4 px-4">
          <div className="flex gap-2">
            {Array.from({ length: totalDiapositivas }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndiceDiapositiva(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === indiceDiapositiva
                    ? 'bg-[var(--marca)] w-6'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ir a diapositiva ${i + 1}`}
              />
            ))}
          </div>

          <div className="text-sm text-gray-500 font-medium">
            {indiceDiapositiva + 1} / {totalDiapositivas}
          </div>
        </div>

        <BotonesAccion
          totalSlides={totalDiapositivas}
          titulo={cuento.titulo}
          finalidad={cuento.finalidad}
          historia={cuento.texto}
        />
      </div>
    </div>
  );
}
