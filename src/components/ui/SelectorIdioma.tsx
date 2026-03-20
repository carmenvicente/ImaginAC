'use client';

import { useState } from 'react';

export interface Idioma {
  codigo: string;
  nombre: string;
  region: 'ESPANA' | 'EUROPA' | 'MUNDO';
}

export const IDIOMAS_DISPONIBLES: Idioma[] = [
  { codigo: 'ES', nombre: 'Español', region: 'ESPANA' },
  { codigo: 'CA', nombre: 'Catalán', region: 'ESPANA' },
  { codigo: 'VA', nombre: 'Valenciano', region: 'ESPANA' },
  { codigo: 'GL', nombre: 'Gallego', region: 'ESPANA' },
  { codigo: 'EU', nombre: 'Euskera', region: 'ESPANA' },
  { codigo: 'EN', nombre: 'Inglés', region: 'EUROPA' },
  { codigo: 'FR', nombre: 'Francés', region: 'EUROPA' },
  { codigo: 'DE', nombre: 'Alemán', region: 'EUROPA' },
  { codigo: 'IT', nombre: 'Italiano', region: 'EUROPA' },
  { codigo: 'PT', nombre: 'Portugués', region: 'EUROPA' },
  { codigo: 'NL', nombre: 'Holandés', region: 'EUROPA' },
  { codigo: 'PL', nombre: 'Polaco', region: 'EUROPA' },
  { codigo: 'RU', nombre: 'Ruso', region: 'EUROPA' },
  { codigo: 'ZH', nombre: 'Chino', region: 'MUNDO' },
  { codigo: 'JA', nombre: 'Japonés', region: 'MUNDO' },
  { codigo: 'KO', nombre: 'Coreano', region: 'MUNDO' },
  { codigo: 'AR', nombre: 'Árabe', region: 'MUNDO' },
  { codigo: 'HI', nombre: 'Hindi', region: 'MUNDO' },
];

function GrupoIdioma({
  titulo,
  idiomas,
  valor,
  onSeleccionar,
}: {
  titulo: string;
  idiomas: Idioma[];
  valor: string;
  onSeleccionar: (codigo: string) => void;
}) {
  return (
    <div className="mb-3">
      <div className="px-3 py-1 text-xs font-semibold text-[var(--foreground)] opacity-50 uppercase">
        {titulo}
      </div>
      {idiomas.map((idioma) => (
        <button
          key={idioma.codigo}
          type="button"
          onClick={() => onSeleccionar(idioma.codigo)}
          className={`w-full px-3 py-2 text-left text-sm hover:bg-[var(--marca)] hover:text-white transition-colors ${
            valor === idioma.codigo ? 'bg-[var(--marca)] text-white' : 'text-[var(--foreground)]'
          }`}
        >
          {idioma.nombre}
        </button>
      ))}
    </div>
  );
}

interface SelectorIdiomaProps {
  valor: string;
  onCambio: (codigo: string) => void;
  id?: string;
}

export function SelectorIdioma({ valor, onCambio, id }: SelectorIdiomaProps) {
  const [abierto, setAbierto] = useState(false);

  const idiomaSeleccionado =
    IDIOMAS_DISPONIBLES.find((i) => i.codigo === valor) || IDIOMAS_DISPONIBLES[0];

  const idiomasEspanas = IDIOMAS_DISPONIBLES.filter((i) => i.region === 'ESPANA');
  const idiomasEuropa = IDIOMAS_DISPONIBLES.filter((i) => i.region === 'EUROPA');
  const idiomasMundo = IDIOMAS_DISPONIBLES.filter((i) => i.region === 'MUNDO');

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-[var(--foreground)] mb-1">
        Idioma
      </label>
      <button
        id={id}
        type="button"
        onClick={() => setAbierto(!abierto)}
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
          <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
            <GrupoIdioma
              titulo="España"
              idiomas={idiomasEspanas}
              valor={valor}
              onSeleccionar={(codigo) => {
                onCambio(codigo);
                setAbierto(false);
              }}
            />
            <div className="border-t border-gray-100" />
            <GrupoIdioma
              titulo="Europa"
              idiomas={idiomasEuropa}
              valor={valor}
              onSeleccionar={(codigo) => {
                onCambio(codigo);
                setAbierto(false);
              }}
            />
            <div className="border-t border-gray-100" />
            <GrupoIdioma
              titulo="Mundo"
              idiomas={idiomasMundo}
              valor={valor}
              onSeleccionar={(codigo) => {
                onCambio(codigo);
                setAbierto(false);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
