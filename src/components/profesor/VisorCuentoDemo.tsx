'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { DiapositivaPortada } from './DiapositivaPortada';
import { BotonesAccion } from './BotonesAccion';
import { useLanguageStore, traduccionesUI } from '@/lib/stores/useLanguageStore';

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
  const idiomaActual = useLanguageStore((s) => s.idiomaActual);
  const t = traduccionesUI[idiomaActual] || traduccionesUI['ES'];
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
        <div className="relative bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden @container">
          <div data-slide-container className="aspect-video max-h-[600px] bg-gray-50 flex flex-col">
            {esPortada ? (
              <DiapositivaPortada
                titulo={cuento.titulo}
                finalidad={cuento.finalidad}
                autor="Carmen Vicente Crespo"
              />
            ) : (
              <div className="flex flex-col justify-between h-full w-full bg-[#d4feff]/30 relative overflow-hidden">
                {/* DECORACIÓN DE FONDO - Ajustada a cqw */}
                <div className="absolute -top-[10cqw] -right-[10cqw] w-[30cqw] h-[30cqw] bg-[#F4A460]/10 rounded-full blur-3xl pointer-events-none" />

                {/* LOGO IMAGINAC SIMPLE - Esquina superior derecha con cqw */}
                <div className="absolute top-[2cqw] right-[2cqw] z-20 pointer-events-none">
                  <img
                    src="/logo_ImaginAC_simple.png"
                    alt="ImaginAC"
                    className="h-[4cqw] w-auto opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>

                <div className="text-center mt-[4cqw] px-[4cqw] relative z-10">
                  <p
                    className="text-[3.5cqw] font-bold text-[var(--foreground)] leading-relaxed max-w-3xl mx-auto px-[6cqw]"
                    style={{ fontFamily: 'var(--font-escolar)' }}
                  >
                    {diapositivaActual?.texto}
                  </p>
                  <p className="text-[1.8cqw] text-gray-400 mt-[1cqw] font-medium">
                    {indiceDiapositiva} {t.diapoDe || 'de'} {totalDiapositivas - 1}
                  </p>
                </div>

                {/* PICTOGRAMAS - Unidades cqw para escalar en tablets */}
                <div className="flex-grow flex items-center justify-center pb-[2cqw] px-[2cqw]">
                  {diapositivaActual?.segmentos && diapositivaActual.segmentos.length > 0 ? (
                    <div className="flex border-[0.15cqw] border-black rounded-[1cqw] max-w-[95%] overflow-x-auto shadow-sm bg-white">
                      {diapositivaActual.segmentos.map((segmento, i) => (
                        <div
                          key={i}
                          className={`flex flex-col flex-shrink-0 ${
                            i < diapositivaActual.segmentos.length - 1
                              ? 'border-r-[0.15cqw] border-black'
                              : ''
                          }`}
                        >
                          <div className="w-[12cqw] h-[12cqw] bg-white flex items-center justify-center p-[1cqw]">
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
                              <span className="text-gray-500 text-[2.5cqw] font-bold text-center">
                                {segmento.texto.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div className="border-t-[0.15cqw] border-black bg-white px-[1cqw] py-[0.5cqw]">
                            <span
                              className="block text-center text-[1.2cqw] font-bold uppercase tracking-wide text-black"
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
                      <p className="text-[2cqw]">{t.diapoSinSegmentos || 'Sin segmentos disponibles para esta frase'}</p>
                    </div>
                  )}
                </div>

                {/* CRÉDITOS ARASAAC - Unidades cqw */}
                <div className="mt-auto pb-[2cqw] pt-[1cqw] px-[4cqw] bg-white/50 border-t border-gray-100 relative z-10">
                  <p
                    className="text-[1.2cqw] text-gray-600 leading-relaxed text-center"
                    style={{ fontFamily: 'var(--font-escolar)' }}
                  >
                    <span className="mr-[2cqw]">
                      <strong>{t.autorPicto || 'Autor pictogramas:'}</strong> Sergio Palao
                    </span>

                    <span className="mr-[2cqw]">
                      <strong>{t.origen || 'Origen:'}</strong>{' '}
                      <a
                        href="http://arasaac.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#F4A460] hover:underline font-bold"
                      >
                        ARASAAC (https://arasaac.org/)
                      </a>
                    </span>

                    <span className="mr-[2cqw]">
                      <strong>{t.licencia || 'Licencia:'}</strong> CC (BY-NC-SA)
                    </span>

                    <span>
                      <strong>{t.propiedad || 'Propiedad:'}</strong> {t.gobiernoAragon || 'Gobierno de Aragón (España)'}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* BOTONES NAVEGACIÓN - Se mantienen tus clases de flechas intactas */}
          <button
            type="button"
            onClick={irAnterior}
            disabled={esPrimera}
            className={`absolute left-[2%] md:left-4 top-1/2 -translate-y-1/2 md:w-12 md:h-12 w-[8cqw] h-[8cqw] rounded-full flex items-center justify-center shadow-lg transition-all ${
              esPrimera
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 active:scale-95 border border-gray-200'
            }`}
            aria-label={t.diapoAnterior || 'Anterior'}
          >
            <svg
              className="w-[4cqw] h-[4cqw] md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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
            className={`absolute right-[2%] md:right-4 top-1/2 -translate-y-1/2 md:w-12 md:h-12 w-[8cqw] h-[8cqw] rounded-full flex items-center justify-center shadow-lg transition-all ${
              esUltima
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-[var(--marca)] text-white hover:bg-[var(--marca-hover)] active:scale-95'
            }`}
            aria-label={t.diapoSiguiente || 'Siguiente'}
          >
            <svg
              className="w-[4cqw] h-[4cqw] md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* INDICADORES INFERIORES - Se mantienen igual */}
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
                aria-label={`${t.diapoIrA || 'Ir a diapositiva'} ${i + 1}`}
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
          diapositivas={cuento.diapositivas}
        />
      </div>
    </div>
  );
}
