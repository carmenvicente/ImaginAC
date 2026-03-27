'use client';

import { useState, useEffect, useCallback } from 'react';
import { DiapositivaPortada } from './DiapositivaPortada';

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

  console.log('[DEBUG CARRUSEL] Cuento recibido:', cuento);
  console.log('[DEBUG CARRUSEL] Diapositivas recibidas:', cuento?.diapositivas);

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

  const esPrimera = indiceDiapositiva === 0;
  const esUltima = indiceDiapositiva === totalDiapositivas - 1;
  const esPortada = indiceDiapositiva === 0;
  const diapositivaActual = tieneDiapositivas ? cuento.diapositivas![indiceDiapositiva - 1] : null;

  return (
    <div className="space-y-8">
      <div className="max-w-5xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">{cuento.titulo}</h2>
        <p className="text-[var(--foreground)] leading-relaxed whitespace-pre-line">
          {cuento.texto}
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="relative bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden">
          <div className="aspect-video bg-gray-50 flex items-center justify-center">
            {esPortada ? (
              <DiapositivaPortada
                titulo={cuento.titulo}
                finalidad={cuento.finalidad}
                autor="Carmen Vicente Crespo"
              />
            ) : (
              <div className="min-h-[70vh] flex flex-col p-8 w-full">
                <div className="text-center mb-6">
                  <p className="text-xl md:text-2xl font-medium text-[var(--foreground)] leading-relaxed max-w-3xl mx-auto">
                    {diapositivaActual?.texto}
                  </p>
                  <p className="text-sm text-gray-400 mt-3">
                    {indiceDiapositiva} de {totalDiapositivas - 1}
                  </p>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  {diapositivaActual?.segmentos && diapositivaActual.segmentos.length > 0 ? (
                    <div className="flex flex-wrap justify-center items-center gap-4 max-w-4xl mx-auto">
                      {diapositivaActual.segmentos.map((segmento, i) => (
                        <div
                          key={i}
                          className="flex flex-col items-center border-2 border-gray-300 rounded-xl p-2 bg-white min-w-[100px]"
                        >
                          <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg flex items-center justify-center bg-gray-100">
                            {segmento.urlImagen ? (
                              <img
                                src={segmento.urlImagen}
                                alt={segmento.texto}
                                className="w-full h-full object-contain p-1 transition-opacity duration-200"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            ) : (
                              <span className="text-gray-500 text-xs font-bold text-center px-1">
                                {segmento.texto.slice(0, 6)}
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-medium text-gray-700 mt-2 text-center font-sans">
                            {segmento.texto}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-400 py-8">
                      <p>Sin segmentos disponibles para esta frase</p>
                    </div>
                  )}
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
      </div>
    </div>
  );
}
