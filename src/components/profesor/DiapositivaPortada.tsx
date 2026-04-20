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
      className="w-full h-full flex flex-col bg-[#d4feff] overflow-hidden relative @container"
      style={{ fontFamily: 'var(--font-escolar)' }}
    >
      {/* LOGO - Ajustado un poco más a la esquina */}
      <div className="absolute top-[1.5cqw] right-[2cqw] z-20 pointer-events-none">
        <img
          src="/logo_ImaginAC_simple.png"
          alt="ImaginAC"
          className="h-[4.5cqw] w-auto opacity-70"
        />
      </div>

      {/* TÍTULO - Reducimos un poco el padding superior para ganar espacio */}
      <div className="flex flex-col items-center pt-[3cqw] pb-[1.5cqw] px-[10cqw]">
        <h1 className="text-[5.8cqw] font-bold text-[#F4A460] text-center leading-tight">
          {tituloSeguro}
        </h1>
      </div>

      {/* CUERPO - Cambio de proporciones: Imagen 40% | Texto 60% */}
      <div className="flex flex-row flex-1 px-[5cqw] pb-[3cqw] gap-[3cqw] items-center justify-center">
        {/* IMAGEN IZQUIERDA - Ahora un poco más estrecha */}
        <div className="w-[40%] flex items-center justify-center">
          <img
            src="/niños_leyendo.png"
            alt="Niños leyendo"
            className="max-h-[38cqw] object-contain rounded-lg"
          />
        </div>

        {/* TEXTOS DERECHA - Ahora más anchos (60%) para que el texto no salte tanto de línea */}
        <div className="w-[60%] flex flex-col justify-center gap-[1.5cqw]">
          <div className="bg-white rounded-[1.5cqw] shadow-sm p-[2cqw]">
            <p className="text-[2.7cqw] text-gray-800 leading-tight">
              Cuento que nos habla sobre: {finalidadSegura}
            </p>
          </div>

          <div className="bg-white rounded-[1.5cqw] shadow-sm p-[1.5cqw]">
            <p className="text-center text-[2.4cqw] text-gray-700 font-bold">
              Creado por {autorSeguro}
            </p>
          </div>

          {/* CRÉDITOS ARASAAC ACTUALIZADOS - Versión ultra-compacta para móviles */}
          <div className="bg-white/50 rounded-[1cqw] shadow-sm p-[1cqw] border-t border-gray-300">
            <p className="text-[1.5cqw] text-gray-700 leading-none text-center">
              <span className="block mb-[0.2cqw]">
                <strong>Autor pictogramas:</strong> Sergio Palao
              </span>
              <span className="block mb-[0.2cqw]">
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
              <span className="block mb-[0.2cqw]">
                <strong>Licencia:</strong> CC (BY-NC-SA)
              </span>
              <span className="block">
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
