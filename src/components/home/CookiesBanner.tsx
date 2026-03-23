'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguageStore, traduccionesUI } from '@/lib/stores/useLanguageStore';

const LOCALSTORAGE_KEY = 'cookies_aceptadas';

export function CookiesBanner() {
  const [visible, setVisible] = useState(false);
  const idiomaActual = useLanguageStore((s) => s.idiomaActual);
  const traducciones = traduccionesUI[idiomaActual] || traduccionesUI['ES'];

  useEffect(() => {
    const aceptadas = localStorage.getItem(LOCALSTORAGE_KEY);
    if (!aceptadas) {
      setVisible(true);
    }
  }, []);

  const handleAceptar = () => {
    localStorage.setItem(LOCALSTORAGE_KEY, 'true');
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm sm:text-base text-gray-200">
              {traducciones.avisoCookies}{' '}
              <Link href="/privacidad" className="underline hover:text-white transition-colors">
                {traducciones.politicaPrivacidad}
              </Link>
              .
            </p>
          </div>
          <button
            type="button"
            onClick={handleAceptar}
            className="px-6 py-2 bg-[#40E0D0] text-white font-medium rounded-lg hover:bg-[#35c9b8] transition-colors whitespace-nowrap"
          >
            {traducciones.aceptar}
          </button>
        </div>
      </div>
    </div>
  );
}
