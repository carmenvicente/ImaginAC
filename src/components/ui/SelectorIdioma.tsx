'use client';

import { useState } from 'react';

export interface Idioma {
  codigo: string;
  nombre: string;
}

export const IDIOMAS_DISPONIBLES: Idioma[] = [
  { codigo: 'ES', nombre: 'Español' },
  { codigo: 'EN', nombre: 'English' },
  { codigo: 'CA', nombre: 'Català' },
  { codigo: 'VA', nombre: 'Valencià' },
  { codigo: 'GL', nombre: 'Galego' },
  { codigo: 'EU', nombre: 'Euskara' },
  { codigo: 'FR', nombre: 'Français' },
  { codigo: 'DE', nombre: 'Deutsch' },
  { codigo: 'IT', nombre: 'Italiano' },
];

interface SelectorIdiomaProps {
  valor: string;
  onCambio: (codigo: string) => void;
  id?: string;
  label?: string;
}

export function SelectorIdioma({ valor, onCambio, id, label = 'Idioma' }: SelectorIdiomaProps) {
  const [abierto, setAbierto] = useState(false);

  const idiomaSeleccionado =
    IDIOMAS_DISPONIBLES.find((i) => i.codigo === valor) || IDIOMAS_DISPONIBLES[0];

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-[var(--foreground)] mb-1">
        {label}
      </label>
      <button
        id={id}
        type="button"
        onClick={() => setAbierto(!abierto)}
        aria-expanded={abierto}
        aria-haspopup="listbox"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-left flex justify-between items-center hover:border-[var(--marca)] focus:ring-2 focus:ring-[var(--marca)] focus:border-transparent"
      >
        <span>{idiomaSeleccionado.nombre}</span>
        <svg
          className={`w-5 h-5 transition-transform ${abierto ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {abierto && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setAbierto(false)} />
          <div
            role="listbox"
            className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto"
          >
            {IDIOMAS_DISPONIBLES.map((idioma) => (
              <button
                key={idioma.codigo}
                type="button"
                role="option"
                aria-selected={valor === idioma.codigo}
                onClick={() => {
                  onCambio(idioma.codigo);
                  setAbierto(false);
                }}
                className={`w-full px-3 py-2 text-left text-sm hover:bg-[var(--marca)] hover:text-white transition-colors ${
                  valor === idioma.codigo
                    ? 'bg-[var(--marca)] text-white'
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
