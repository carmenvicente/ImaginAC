'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguageStore, traduccionesUI } from '@/lib/stores/useLanguageStore';

const LOCALSTORAGE_KEY = 'cookies_config_v1';

export function CookiesBanner() {
  const [visible, setVisible] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  // Estado para la configuración granular
  const [options, setOptions] = useState({
    necesarias: true, // Siempre true por ley
    analiticas: false,
    personalizacion: false,
  });

  const idiomaActual = useLanguageStore((s) => s.idiomaActual);
  const traducciones = traduccionesUI[idiomaActual] || traduccionesUI['ES'];

  useEffect(() => {
    const config = localStorage.getItem(LOCALSTORAGE_KEY);
    if (!config) {
      setVisible(true);
    }
  }, []);

  const saveConfig = (newConfig: typeof options) => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newConfig));
    setVisible(false);
  };

  const handleAceptarTodas = () => {
    const allIn = { necesarias: true, analiticas: true, personalizacion: true };
    saveConfig(allIn);
  };

  const handleSoloEsenciales = () => {
    const essentials = { necesarias: true, analiticas: false, personalizacion: false };
    saveConfig(essentials);
  };

  const handleGuardarConfig = () => {
    saveConfig(options);
  };

  if (!visible) return null;

  const t = traducciones;

  return (
    <div
      role="dialog"
      aria-label={t.configPrivacidad || 'Cookie Settings'}
      className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white shadow-[0_-10px_40px_rgba(0,0,0,0.3)] border-t border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-3 md:px-6 py-4 md:py-6">
        {!showConfig ? (
          /* VISTA PRINCIPAL */
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
            <div className="flex-1 text-center lg:text-left text-sm md:text-base text-gray-300">
              <p className="leading-relaxed">
                {t.cookiesBannerTexto || 'We use cookies to improve your experience...'}
                <Link href="/cookies" className="underline hover:text-[#40E0D0] transition-colors">
                  {t.configPoliticaCookies || 'Cookie Policy'}
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              <button
                onClick={() => setShowConfig(true)}
                className="px-4 py-2.5 md:py-2 text-sm font-semibold border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
              >
                {t.cookiesBannerConfigurar || 'Configure'}
              </button>
              <button
                onClick={handleSoloEsenciales}
                className="px-4 py-2.5 md:py-2 text-sm font-semibold bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                {t.cookiesBannerEsenciales || t.cookiesBannerEsentials || 'Only essential'}
              </button>
              <button
                onClick={handleAceptarTodas}
                className="px-5 py-2.5 md:py-2 text-sm font-bold bg-[#40E0D0] text-gray-900 rounded-lg hover:bg-[#35c9b8] transition-colors"
              >
                {t.cookiesBannerAceptar || 'Accept all'}
              </button>
            </div>
          </div>
        ) : (
          /* VISTA CONFIGURACIÓN */
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-center border-b border-gray-700 pb-4">
              <h3 className="font-bold text-lg text-[#40E0D0]">
                {t.cookiesBannerPrivacidad || 'Privacy Settings'}
              </h3>
              <button
                onClick={() => setShowConfig(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Necesarias */}
              <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 opacity-80">
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-sm text-white">
                    {t.cookiesBannerNecesarias || 'Necessary'}
                  </span>
                  <span className="text-[10px] bg-gray-600 px-2 py-0.5 rounded text-white uppercase">
                    {t.cookiesBannerSiempreActivas ||
                      t.cookiesBannerAlwaysActive ||
                      'Always active'}
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  {t.cookiesBannerNecesariasDesc || 'They allow basic web functioning...'}
                </p>
              </div>

              {/* Analíticas */}
              <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-sm text-white">
                    {t.cookiesBannerAnaliticas || t.cookiesBannerAnalitiques || 'Analytics'}
                  </span>
                  <input
                    type="checkbox"
                    checked={options.analiticas}
                    onChange={(e) => setOptions({ ...options, analiticas: e.target.checked })}
                    className="accent-[#40E0D0] w-4 h-4 cursor-pointer"
                  />
                </div>
                <p className="text-xs text-gray-400">
                  {t.cookiesBannerAnaliticasDesc ||
                    t.cookiesBannerAnalitiquesDesc ||
                    'They help us understand...'}
                </p>
              </div>

              {/* Personalización */}
              <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-sm text-white">
                    {t.cookiesBannerPreferencia || t.cookiesBannerPreference || 'Preference'}
                  </span>
                  <input
                    type="checkbox"
                    checked={options.personalizacion}
                    onChange={(e) => setOptions({ ...options, personalizacion: e.target.checked })}
                    className="accent-[#40E0D0] w-4 h-4 cursor-pointer"
                  />
                </div>
                <p className="text-xs text-gray-400">
                  {t.cookiesBannerPreferenciaDesc ||
                    t.cookiesBannerPreferenceDesc ||
                    'They allow remembering information...'}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
              <button
                onClick={() => setShowConfig(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white"
              >
                {t.cookiesBannerVolver || 'Go back'}
              </button>
              <button
                onClick={handleGuardarConfig}
                className="px-8 py-2 text-xs font-bold bg-[#40E0D0] text-gray-900 rounded-lg hover:bg-[#35c9b8] transition-colors"
              >
                {t.cookiesBannerGuardar || t.cookiesBannerSave || 'Save preferences'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
