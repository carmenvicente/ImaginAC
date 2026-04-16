'use client';

import { COLORES_CATEGORIA, type Pictograma, type CategoriaPictograma } from '@/lib/ia/arasaac';

interface Frase {
  texto: string;
  pictogramas: Pictograma[];
}

interface Diapositiva {
  tipo: 'portada' | 'contenido';
  titulo?: string;
  finalidad?: string;
  autor?: string;
  fraseActual?: Frase;
  indice?: number;
  total?: number;
}

interface DiapositivaPortadaProps {
  titulo: string;
  finalidad: string;
  autor: string;
}

function sanitizeText(text: unknown, fallback: string = ''): string {
  if (typeof text !== 'string') return fallback;
  return text.slice(0, 500).replace(/[<>'"&]/g, '');
}

export function DiapositivaPortada({ titulo, finalidad, autor }: DiapositivaPortadaProps) {
  const tituloSeguro = sanitizeText(titulo, 'Cuento sin título');
  const finalidadSegura = sanitizeText(finalidad, 'las emociones y su gestión');
  const autorSeguro = sanitizeText(autor, 'Carmen Vicente Crespo');

  return (
    <div
      className="w-full h-full flex flex-col bg-[#d4feff] overflow-y-auto relative" // He añadido relative
      style={{ fontFamily: 'var(--font-escolar)' }}
    >
      {/* LOGO IMAGINAC SIMPLE - Esquina superior derecha */}
      <div className="absolute top-4 right-4 z-20 pointer-events-none">
        <img
          src="/logo_ImaginAC_simple.png"
          alt="ImaginAC"
          className="h-8 md:h-12 w-auto opacity-70"
        />
      </div>

      {/* TÍTULO - Con px-16 para mantener el centro perfecto sin chocar con el logo */}
      <div className="flex flex-col items-center pt-6 pb-2 px-16 md:px-20">
        <h1 className="text-xl md:text-4xl font-bold text-[#F4A460] text-center">{tituloSeguro}</h1>
      </div>

      <div className="flex flex-col md:flex-row flex-1 px-4 md:px-10 pb-6 gap-4 md:gap-6 items-center justify-center">
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <img
            src="/niños_leyendo.png"
            alt="Niños leyendo"
            className="max-h-[160px] md:max-h-full object-contain rounded-lg"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center gap-3 md:pr-14">
          <div className="bg-white rounded-xl shadow-sm p-3 md:p-4 text-center md:text-right">
            <p className="text-left text-sm md:text-lg text-gray-800 leading-relaxed">
              Cuento que nos habla sobre: {finalidadSegura}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-3 md:p-4 text-center md:text-right">
            <p className="text-center text-xs md:text-base text-gray-700 font-bold mb-0.5">
              Creado por {autorSeguro}
            </p>
          </div>

          {/* CRÉDITOS ARASAAC ACTUALIZADOS (Con saltos de línea para mejor lectura) */}
          <div className="bg-white/50 rounded-xl shadow-sm p-2 md:p-3 border-t border-gray-300">
            <p className="text-[9px] md:text-xs text-gray-700 leading-normal text-center">
              <span className="block">
                <strong>Autor pictogramas:</strong> Sergio Palao
              </span>
              <span className="block">
                <strong>Origen:</strong>{' '}
                <a
                  href="http://arasaac.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F4A460] hover:underline font-bold"
                >
                  ARASAAC (https://arasaac.org/)
                </a>
              </span>
              <span className="block">
                <strong>Licencia:</strong> CC (BY-NC-SA)
              </span>
              {/* Salto de línea implícito al usar "block" */}
              <span className="block mt-0.5">
                <strong>Propiedad:</strong> Gobierno de Aragón (España)
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DiapositivaFraseProps {
  frase: Frase;
  indice: number;
  total: number;
}

export function DiapositivaFrase({ frase, indice, total }: DiapositivaFraseProps) {
  return (
    <div className="min-h-[70vh] flex flex-col p-8">
      <div className="text-center mb-6">
        <p className="text-xl md:text-2xl font-medium text-[var(--foreground)] leading-relaxed max-w-3xl mx-auto">
          {frase.texto}
        </p>
        <p className="text-sm text-gray-400 mt-3">
          {indice} de {total}
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {frase.pictogramas.length > 0 ? (
          <div className="flex justify-center items-center gap-3 flex-wrap max-w-4xl mx-auto">
            {frase.pictogramas.map((picto, i) => (
              <div key={i} className="flex flex-col items-center p-2">
                <div
                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl flex items-center justify-center shadow-sm"
                  style={{
                    backgroundColor:
                      COLORES_CATEGORIA[picto.categoria as CategoriaPictograma] || '#6B7280',
                  }}
                >
                  {picto.urlImagen ? (
                    <img
                      src={picto.urlImagen}
                      alt={String(picto.textoOriginal || 'pictograma')}
                      className="w-full h-full object-contain p-1"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <span className="text-white text-xs font-bold text-center px-1">
                      {String(picto.textoOriginal || '').slice(0, 6)}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-600 mt-1 text-center max-w-[80px]">
                  {String(picto.textoOriginal || '?')}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8">
            <p>Sin pictogramas disponibles para esta frase</p>
          </div>
        )}
      </div>
    </div>
  );
}

export type { Frase, Diapositiva };
