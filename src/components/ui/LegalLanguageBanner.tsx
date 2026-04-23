'use client';

import { useLanguageStore, traduccionesUI } from '@/lib/stores/useLanguageStore';

export function LegalLanguageBanner() {
  const idiomaActual = useLanguageStore((s) => s.idiomaActual);
  const t = traduccionesUI[idiomaActual] || traduccionesUI['ES'];

  if (idiomaActual === 'ES') return null;

  return (
    <div className="flex items-start gap-3 mb-8 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
      <span className="text-amber-500 mt-0.5 shrink-0" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      </span>
      <p className="leading-relaxed">{t.avisoIdiomaTexto}</p>
    </div>
  );
}
