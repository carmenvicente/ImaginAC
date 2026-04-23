'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookiesBanner } from '@/components/home/CookiesBanner';
import {
  useLanguageStore,
  traduccionesUI,
  IDIOMAS_DISPONIBLES,
  type Idioma,
} from '@/lib/stores/useLanguageStore';

const COOKIES_KEY = 'cookies_config_v1';

export default function Configuracion() {
  const idiomaActual = useLanguageStore((s) => s.idiomaActual);
  const setIdioma = useLanguageStore((s) => s.setIdioma);
  const t = traduccionesUI[idiomaActual] || traduccionesUI['ES'];

  const [cookieConfig, setCookieConfig] = useState({
    necesarias: true,
    analiticas: false,
    personalizacion: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem(COOKIES_KEY);
    if (saved) {
      setCookieConfig(JSON.parse(saved));
    }
  }, []);

  const handleCookieChange = (key: keyof typeof cookieConfig, value: boolean) => {
    const newConfig = { ...cookieConfig, [key]: value };
    setCookieConfig(newConfig);
    localStorage.setItem(COOKIES_KEY, JSON.stringify(newConfig));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Título con el azul oscuro de la marca */}
          <h1 className="text-3xl sm:text-4xl font-bold text-teal-900 mb-8">
            {t.configTitulo || 'Configuración'}
          </h1>

          {/* SECCIÓN 1: IDIOMA */}
          <section className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
            <h2 className="text-xl font-bold text-teal-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
              {t.configIdioma || 'Idioma de la interfaz'}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {IDIOMAS_DISPONIBLES.map((idioma: Idioma) => (
                <button
                  key={idioma.codigo}
                  onClick={() => setIdioma(idioma.codigo)}
                  className={`px-4 py-3 rounded-xl text-center font-semibold transition-all ${
                    idiomaActual === idioma.codigo
                      ? 'bg-[#40E0D0] text-white shadow-md'
                      : 'bg-gray-100 text-teal-900 hover:bg-gray-200'
                  }`}
                >
                  {idioma.nombre}
                </button>
              ))}
            </div>
          </section>

          {/* SECCIÓN 2: PRIVACIDAD Y COOKIES */}
          <section className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
            <h2 className="text-xl font-bold text-teal-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              {t.configPrivacidadTitulo || 'Preferencias de Privacidad'}
            </h2>
            <div className="space-y-4">
              {/* Analíticas */}
              <div className="flex items-center justify-between p-4 bg-teal-50/50 rounded-xl border border-teal-100">
                <div className="pr-4">
                  <p className="font-bold text-teal-900">
                    {t.cookiesAnaliticas || 'Cookies Analíticas'}
                  </p>
                  <p className="text-xs text-teal-700/70">
                    {t.cookiesAnaliticasDesc ||
                      'Ayudan a mejorar la herramienta midiendo el uso de forma anónima.'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cookieConfig.analiticas}
                    onChange={(e) => handleCookieChange('analiticas', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>

              {/* Personalización */}
              <div className="flex items-center justify-between p-4 bg-teal-50/50 rounded-xl border border-teal-100">
                <div className="pr-4">
                  <p className="font-bold text-teal-900">
                    {t.cookiesPersonalizacion || 'Cookies de Personalización'}
                  </p>
                  <p className="text-xs text-teal-700/70">
                    {t.cookiesPersonalizacionDesc ||
                      'Permiten recordar tu idioma y ajustes en tu próxima visita.'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cookieConfig.personalizacion}
                    onChange={(e) => handleCookieChange('personalizacion', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>
            </div>
          </section>

          {/* SECCIÓN 3: LEGALIDAD ACTUALIZADA */}
          <section className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
            <h2 className="text-xl font-bold text-teal-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {t.configTextosLegales || 'Textos Legales'}
            </h2>
            <div className="grid grid-cols-1 gap-2">
              <a
                href="/privacidad"
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-teal-50 hover:text-teal-900 transition-all group"
              >
                <span className="text-sm font-semibold text-gray-700 group-hover:text-teal-900">
                  {t.configPoliticaPrivacidad || 'Política de Privacidad'}
                </span>
                <svg
                  className="w-4 h-4 text-gray-400 group-hover:text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
              {/* NUEVO: Política de Cookies */}
              <a
                href="/cookies"
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-teal-50 hover:text-teal-900 transition-all group"
              >
                <span className="text-sm font-semibold text-gray-700 group-hover:text-teal-900">
                  {t.configPoliticaCookies || 'Política de Cookies'}
                </span>
                <svg
                  className="w-4 h-4 text-gray-400 group-hover:text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
              <a
                href="/aviso-legal"
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-teal-50 hover:text-teal-900 transition-all group"
              >
                <span className="text-sm font-semibold text-gray-700 group-hover:text-teal-900">
                  {t.configAvisoLegal || 'Aviso Legal'}
                </span>
                <svg
                  className="w-4 h-4 text-gray-400 group-hover:text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </section>

          {/* SECCIÓN 4: INFO */}
          <section className="bg-teal-900 rounded-2xl shadow-lg p-6 text-white">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-teal-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {t.configAcerca || 'Sobre ImaginAC'}
            </h2>
            <p className="text-teal-100 text-sm mb-4 leading-relaxed opacity-90">
              Versión 1.0.0 •{' '}
              {t.configDescripcion || 'Accesibilidad cognitiva para educación especial.'}
            </p>
            <div className="pt-4 border-t border-teal-800 text-[10px] text-teal-400 uppercase tracking-widest font-medium">
              Next.js • TypeScript • Tailwind • Gemini
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <CookiesBanner />
    </div>
  );
}
