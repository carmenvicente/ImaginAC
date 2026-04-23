'use client';

import { useState } from 'react';
import { IDIOMAS_DISPONIBLES } from '@/components/ui/SelectorIdioma';
import { useLanguageStore } from '@/lib/stores/useLanguageStore';

interface LanguageSwitcherProps {
  onIdiomaChange?: (codigo: string) => void;
}

export function LanguageSwitcher({ onIdiomaChange }: LanguageSwitcherProps) {
  const [abierto, setAbierto] = useState(false);
  const { idiomaActual, idiomaSeleccionado, setIdioma } = useLanguageStore();

  const handleSeleccionar = (codigo: string) => {
    setIdioma(codigo);
    onIdiomaChange?.(codigo);
    setAbierto(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setAbierto(!abierto)}
        aria-expanded={abierto}
        aria-haspopup="listbox"
        aria-label={`Idioma actual: ${idiomaSeleccionado.nombre}. Cambiar idioma`}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:text-[var(--marca)] transition-colors rounded-lg hover:bg-[var(--marca)]/10"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          />
        </svg>
        <span className="hidden sm:inline">{idiomaSeleccionado.nombre}</span>
      </button>

      {abierto && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setAbierto(false)} />
          <div
            role="listbox"
            aria-label="Seleccionar idioma"
            className="absolute right-0 z-20 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto"
          >
            {IDIOMAS_DISPONIBLES.map((idioma) => (
              <button
                key={idioma.codigo}
                type="button"
                role="option"
                aria-selected={idiomaActual === idioma.codigo}
                onClick={() => handleSeleccionar(idioma.codigo)}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-[var(--marca)] hover:text-white transition-colors ${
                  idiomaActual === idioma.codigo
                    ? 'bg-[var(--marca)] text-white font-medium'
                    : 'text-[var(--foreground)]'
                }`}
              >
                {idioma.nombre}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
