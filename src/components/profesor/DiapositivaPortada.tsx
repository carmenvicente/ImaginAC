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

export function DiapositivaPortada({ titulo, finalidad, autor }: DiapositivaPortadaProps) {
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center p-8 text-center">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--marca)] mb-8">{titulo}</h1>

        <div className="bg-gray-50 p-6 rounded-xl mb-8 border border-gray-200">
          <p className="text-gray-700 text-lg leading-relaxed">
            {finalidad ||
              'Cuento que nos habla sobre las emociones: alegría, tristeza, rabia o enfado, miedo o calma.'}
          </p>
        </div>

        <div className="mb-8">
          <p className="text-lg font-medium text-gray-700">Creado por {autor}</p>
          <div className="flex gap-4 justify-center mt-3">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Twitter"
            >
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8 text-xs text-gray-500 border-t border-gray-200 w-full">
        <p className="mb-1">
          <strong>Autor pictogramas:</strong> Sergio Palao
        </p>
        <p className="mb-1">
          <strong>Origen:</strong>{' '}
          <a
            href="http://arasaac.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--marca)] hover:underline"
          >
            ARASAAC (http://arasaac.org)
          </a>
        </p>
        <p>
          <strong>Licencia:</strong> CC (BY-NC-SA)
        </p>
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
