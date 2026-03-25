'use client';

interface CarruselNavegacionProps {
  indiceActual: number;
  total: number;
  onAnterior: () => void;
  onSiguiente: () => void;
}

export function CarruselNavegacion({
  indiceActual,
  total,
  onAnterior,
  onSiguiente,
}: CarruselNavegacionProps) {
  const esPrimera = indiceActual === 0;
  const esUltima = indiceActual === total - 1;

  return (
    <div className="flex justify-center items-center gap-4 py-4 bg-white rounded-b-2xl border-t border-gray-200">
      <button
        type="button"
        onClick={onAnterior}
        disabled={esPrimera}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
          esPrimera
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 active:bg-gray-400'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Anterior
      </button>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-600 min-w-[60px] text-center">
          {indiceActual + 1} / {total}
        </span>
      </div>

      <button
        type="button"
        onClick={onSiguiente}
        disabled={esUltima}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
          esUltima
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-[var(--marca)] text-white hover:bg-[var(--marca-hover)] active:scale-95'
        }`}
      >
        Siguiente
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
