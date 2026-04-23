'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookiesBanner } from '@/components/home/CookiesBanner';
import { useLanguageStore, traduccionesUI } from '@/lib/stores/useLanguageStore';

export default function PoliticaCookies() {
  const idiomaActual = useLanguageStore((s) => s.idiomaActual);
  const t = traduccionesUI[idiomaActual] || traduccionesUI['ES'];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 py-8 md:py-12 px-3 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-900 mb-6 md:mb-8 border-b pb-4">
            {t.politicaCookiesTitulo}
          </h1>
          <div className="space-y-10">
            {/* 1. ¿Qué son? */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">{t.cookiesPage1Titulo}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t.cookiesPage1Texto}{' '}
                <strong>localStorage</strong>
                {'.'}
              </p>
            </section>

            {/* 2. Listado Técnico */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">{t.cookiesPage2Titulo}</h2>
              <div className="overflow-x-auto border border-gray-200 rounded-xl">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold text-teal-900 uppercase">
                        {t.cookiesPageTabNombre}
                      </th>
                      <th className="px-4 py-3 text-left font-bold text-teal-900 uppercase">
                        {t.cookiesPageTabProposito}
                      </th>
                      <th className="px-4 py-3 text-left font-bold text-teal-900 uppercase">
                        {t.cookiesPageTabOrigen}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 font-mono text-teal-600">cookies_config_v1</td>
                      <td className="px-4 py-3">{t.cookiesPageFila1Proposito}</td>
                      <td className="px-4 py-3 italic">{t.cookiesPageFila1Origen}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-teal-600">idioma_preferido</td>
                      <td className="px-4 py-3">{t.cookiesPageFila2Proposito}</td>
                      <td className="px-4 py-3 italic">{t.cookiesPageFila2Origen}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 3. Gestión */}
            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{t.cookiesPage3Titulo}</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>{t.cookiesPage3P1}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>{t.cookiesPage3Li1}</li>
                  <li>{t.cookiesPage3Li2}</li>
                  <li>{t.cookiesPage3Li3}</li>
                </ul>
                <p>{t.cookiesPage3P2}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>{t.cookiesPage3Li4}</li>
                  <li>{t.cookiesPage3Li5}</li>
                  <li>{t.cookiesPage3Li6}</li>
                  <li>{t.cookiesPage3Li7}</li>
                </ul>

                <div className="mt-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <p className="font-bold text-gray-800 mb-4">{t.cookiesPageNavTitle}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href="https://support.google.com/chrome/answer/95647?hl=es"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg hover:border-teal-400 hover:text-teal-700 transition-colors"
                    >
                      <span className="text-sm font-medium">Google Chrome</span>
                    </a>
                    <a
                      href="https://support.microsoft.com/es-es/windows"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg hover:border-teal-400 hover:text-teal-700 transition-colors"
                    >
                      <span className="text-sm font-medium">Microsoft Edge / Explorer</span>
                    </a>
                    <a
                      href="https://support.mozilla.org/es/kb/Protecci%C3%B3n-contra-el-rastreo-mejorada-en-Firefox-para-escritorio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg hover:border-teal-400 hover:text-teal-700 transition-colors"
                    >
                      <span className="text-sm font-medium">Mozilla Firefox</span>
                    </a>
                    <a
                      href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg hover:border-teal-400 hover:text-teal-700 transition-colors"
                    >
                      <span className="text-sm font-medium">Safari</span>
                    </a>
                  </div>
                </div>

                <p className="mt-6 text-sm italic text-gray-600 bg-teal-50/50 p-4 rounded-xl border-l-4 border-teal-400">
                  {t.cookiesPageNota}
                </p>
              </div>
            </section>

            {/* 4. CTA */}
            <section className="bg-teal-900 rounded-2xl p-8 text-white shadow-xl">
              <h2 className="text-2xl font-bold mb-4">{t.cookiesPage4Titulo}</h2>
              <p className="text-teal-100 mb-6 opacity-90">{t.cookiesPage4Texto}</p>
              <a
                href="/configuracion"
                className="inline-block px-8 py-3 bg-[#40E0D0] text-teal-900 font-bold rounded-xl hover:bg-[#35c9b8] transition-all transform hover:scale-105"
              >
                {t.cookiesPage4Btn}
              </a>
            </section>
          </div>

          <p className="text-sm text-gray-400 text-center mt-16 italic">
            {t.cookiesPageActualizacion}{' '}
            {new Date().toLocaleDateString(idiomaActual === 'EN' ? 'en-GB' : 'es-ES', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </article>
      </main>
      <Footer />
      <CookiesBanner />
    </div>
  );
}
