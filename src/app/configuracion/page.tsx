'use client';

import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { CookiesBanner } from '@/components/home/CookiesBanner';
import {
  useLanguageStore,
  traduccionesUI,
  IDIOMAS_DISPONIBLES,
  type Idioma,
} from '@/lib/stores/useLanguageStore';

export default function Configuracion() {
  const idiomaActual = useLanguageStore((s) => s.idiomaActual);
  const setIdioma = useLanguageStore((s) => s.setIdioma);
  const t = traduccionesUI[idiomaActual] || traduccionesUI['ES'];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-8">
            {t.configTitulo || 'Configuración'}
          </h1>

          <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-[var(--marca)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
              {t.configIdioma || 'Idioma'}
            </h2>
            <p className="text-[var(--foreground)] opacity-70 mb-4">
              {t.configIdiomaDesc ||
                'Seleccione el idioma de la interfaz. El cambio se aplicará inmediatamente a toda la plataforma.'}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {IDIOMAS_DISPONIBLES.map((idioma: Idioma) => (
                <button
                  key={idioma.codigo}
                  onClick={() => setIdioma(idioma.codigo)}
                  className={`px-4 py-3 rounded-lg text-left font-medium transition-all ${
                    idiomaActual === idioma.codigo
                      ? 'bg-[var(--marca)] text-white shadow-md'
                      : 'bg-gray-100 text-[var(--foreground)] hover:bg-gray-200'
                  }`}
                >
                  {idioma.nombre}
                </button>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-[var(--marca)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              {t.configPrivacidad || 'Privacidad'}
            </h2>
            <div className="space-y-3">
              <a
                href="/privacidad"
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-[var(--foreground)]">
                  {t.configPoliticaPrivacidad || 'Política de Privacidad'}
                </span>
                <svg
                  className="w-5 h-5 text-gray-400"
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
                href="/terminos"
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-[var(--foreground)]">
                  {t.configTerminos || 'Términos de Uso'}
                </span>
                <svg
                  className="w-5 h-5 text-gray-400"
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

          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-[var(--marca)]"
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
              {t.configAcerca || 'Acerca de'}
            </h2>
            <p className="text-[var(--foreground)] opacity-70 mb-4">ImaginAC v1.0.0</p>
            <p className="text-sm text-[var(--foreground)] opacity-60">
              {t.configDescripcion ||
                'Plataforma de accesibilidad cognitiva para profesores PT y alumnos.'}
            </p>
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-[var(--foreground)] opacity-50">
                {t.configTecnologias ||
                  'Desarrollado con Next.js, TypeScript, Tailwind CSS, Supabase y Google Gemini.'}
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <CookiesBanner />
    </div>
  );
}
