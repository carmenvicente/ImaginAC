'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookiesBanner } from '@/components/home/CookiesBanner';
import { LegalLanguageBanner } from '@/components/ui/LegalLanguageBanner';
import { useLanguageStore, traduccionesUI } from '@/lib/stores/useLanguageStore';

export default function PoliticaCookies() {
  const idiomaActual = useLanguageStore((s) => s.idiomaActual);
  const t = traduccionesUI[idiomaActual] || traduccionesUI['ES'];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 py-8 md:py-12 px-3 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto">
          {/* Cabecera */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-900 mb-6 md:mb-8 border-b pb-4">
            {t.politicaCookiesTitulo}
          </h1>
          <LegalLanguageBanner />

          <div className="space-y-10">
            {/* 1. ¿Qué son? */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">1. ¿Qué son las cookies?</h2>
              <p className="text-gray-700 leading-relaxed">
                Las cookies son pequeños archivos que se graban en el navegador para que el servidor
                pueda recordar información sobre la visita del usuario. Además de cookies
                tradicionales, este Sitio Web utiliza <strong>localStorage</strong>, un mecanismo
                de almacenamiento local del navegador funcionalmente similar pero que no se envía
                al servidor en cada petición. En ambos casos, la información almacenada no revela
                su identidad ni accede al contenido de su dispositivo, y se emplea exclusivamente
                para guardar sus preferencias y garantizar el correcto funcionamiento del sitio.
              </p>
            </section>

            {/* 2. Listado Técnico */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                2. Cookies utilizadas en ImaginAC
              </h2>
              <div className="overflow-x-auto border border-gray-200 rounded-xl">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold text-teal-900 uppercase">
                        Nombre
                      </th>
                      <th className="px-4 py-3 text-left font-bold text-teal-900 uppercase">
                        Propósito
                      </th>
                      <th className="px-4 py-3 text-left font-bold text-teal-900 uppercase">
                        Origen
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 font-mono text-teal-600">cookies_config_v1</td>
                      <td className="px-4 py-3">
                        Guarda tus preferencias sobre qué cookies aceptas. Almacenado en
                        localStorage.
                      </td>
                      <td className="px-4 py-3 italic">Propia (Necesaria)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-teal-600">idioma_preferido</td>
                      <td className="px-4 py-3">
                        Recuerda el idioma seleccionado para la interfaz. Almacenado en
                        localStorage.
                      </td>
                      <td className="px-4 py-3 italic">Propia (Personalización)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 3. Gestión y Configuración detallada */}
            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-800 mb-4">3. Gestión de Cookies</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  Si usted no desea que se guarden cookies en su navegador o prefiere recibir una
                  información cada vez que una cookie solicite instalarse, puede configurar sus
                  opciones de navegación para que se haga de esa forma. La mayor parte de los
                  navegadores permiten la gestión de las cookies de 3 formas diferentes:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Las cookies son siempre rechazadas.</li>
                  <li>El navegador pregunta si el usuario desea instalar cada cookie.</li>
                  <li>Las cookies son siempre aceptadas.</li>
                </ul>
                <p>
                  Su navegador también puede incluir la posibilidad de seleccionar con detalle las
                  cookies que desea que se instalen en su ordenador. En concreto, el usuario puede
                  normalmente aceptar alguna de las siguientes opciones:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Rechazar las cookies de determinados dominios.</li>
                  <li>Rechazar las cookies de terceros.</li>
                  <li>
                    Aceptar cookies como no persistentes (se eliminan cuando el navegador se
                    cierra).
                  </li>
                  <li>Permitir al servidor crear cookies para un dominio diferente.</li>
                </ul>

                <div className="mt-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <p className="font-bold text-gray-800 mb-4">
                    Puede encontrar información sobre cómo configurar los navegadores más usados en
                    los siguientes enlaces:
                  </p>
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
                  Este Sitio Web no utiliza cookies de terceros con fines analíticos ni
                  publicitarios. Todo el almacenamiento es propio y se realiza exclusivamente en el
                  navegador del usuario mediante localStorage.
                </p>
              </div>
            </section>

            {/* 4. Panel de Control Directo */}
            <section className="bg-teal-900 rounded-2xl p-8 text-white shadow-xl">
              <h2 className="text-2xl font-bold mb-4">¿Quieres cambiar tus ajustes ahora?</h2>
              <p className="text-teal-100 mb-6 opacity-90">
                Puedes modificar tus preferencias de cookies en cualquier momento desde nuestro
                panel de configuración. No es necesario borrar el historial de tu navegador.
              </p>
              <a
                href="/configuracion"
                className="inline-block px-8 py-3 bg-[#40E0D0] text-teal-900 font-bold rounded-xl hover:bg-[#35c9b8] transition-all transform hover:scale-105"
              >
                Ir a Configuración
              </a>
            </section>
          </div>

          <p className="text-sm text-gray-400 text-center mt-16 italic">
            Última actualización:{' '}
            {new Date().toLocaleDateString('es-ES', {
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
