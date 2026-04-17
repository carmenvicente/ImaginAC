'use client';

import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { CookiesBanner } from '@/components/home/CookiesBanner';
import { useLanguageStore, traduccionesUI } from '@/lib/stores/useLanguageStore';
import Image from 'next/image';

export default function SobreNosotros() {
  const idiomaActual = useLanguageStore((s) => s.idiomaActual);
  const t = traduccionesUI[idiomaActual] || traduccionesUI['ES'];

  // --- LÓGICA DE ENVÍO DE CORREO ---
  const handleEmailClick = () => {
    const email = 'cvicentecrespos@gmail.com';
    const subject = 'Consulta sobre ImaginAC';

    // Enlace para Gmail Web (Escritorio)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}`;
    // Enlace mailto estándar (Móvil)
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

    // Detectamos si es móvil
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = mailtoUrl;
    } else {
      window.open(gmailUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main
        className="flex-1 py-12 px-4 sm:px-6 lg:px-8 relative"
        style={{ background: 'transparent' }}
      >
        {/* FONDO DE IMAGEN SUTIL */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&q=80"
            alt=""
            fill
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-white/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d4a4a]/70 via-[#40E0D0]/20 to-transparent" />
        </div>

        <article className="max-w-4xl mx-auto prose prose-lg">
          {/* --- SECCIÓN 1: EL ORIGEN --- */}
          <section className="mb-16">
            <h1 className="text-2xl sm:text-4xl font-bold text-[var(--foreground)] mb-8 text-center">
              La historia detrás de ImaginAC
            </h1>
            <div className="bg-[#FAFEFF] p-8 rounded-3xl border border-blue-50 shadow-sm mb-12">
              <h2 className="text-2xl font-semibold text-[var(--marca)] mb-6 italic">
                "De una necesidad real a una herramienta para todos"
              </h2>
              <div className="space-y-4 text-[var(--foreground)] opacity-90 leading-relaxed text-lg">
                <p>
                  ImaginAC no nació en una oficina, sino en una tarde de café. Escuchaba a una buena
                  amiga, futura docente especializada en <strong>Pedagogía Terapéutica (PT)</strong>
                  , compartir su frustración: a pesar de contar con excelentes bancos de
                  pictogramas, perdía tiempo buscando, recortando y pegando manualmente para crear
                  materiales que se adaptaran a sus alumnos.
                </p>
                <p>
                  No existía un lugar que le permitiera crear un cuento desde cero y transformarlo,
                  al instante, en un recurso visual listo para imprimir. Como desarrolladora, supe
                  que la tecnología debía llenar ese vacío.
                </p>
                <p>
                  Si mi amiga se sentía así, miles de docentes estarían pasando por lo mismo. Mi
                  misión hoy es sencilla:{' '}
                  <strong>que tú solo pongas la imaginación y yo el código.</strong> Juntos, creamos
                  materiales inclusivos y profesionales en cuestión de segundos.
                </p>
              </div>
            </div>

            {/* --- SECCIÓN 2: PERFIL PROFESIONAL --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-2 space-y-4">
                <h2 className="text-3xl font-bold text-[var(--foreground)]">Hola, soy Carmen</h2>
                <p className="text-lg text-[var(--foreground)] opacity-80">
                  Mi nombre completo es <strong>Carmen Vicente Crespo</strong>. Tras finalizar mi
                  formación como <strong>Ingeniera en Tecnologías de Telecomunicación</strong>,
                  decidí volcar mi pasión en el desarrollo web, la inteligencia artificial y la
                  ciberseguridad.
                </p>
                <p className="text-md text-[var(--foreground)] opacity-80">
                  ImaginAC es el resultado de combinar esos conocimientos técnicos con un propósito
                  social: facilitar el día a día de la comunidad educativa mediante herramientas
                  inteligentes.
                </p>

                {/* REDES SOCIALES */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <a
                    href="https://instagram.com/carmenvicentee"
                    target="_blank"
                    className="flex items-center gap-2 bg-teal-50 text-teal-700 border border-teal-100 px-4 py-2 rounded-full hover:bg-teal-100 transition-colors shadow-sm"
                  >
                    <span className="font-medium">Instagram: @carmenvicentee</span>
                  </a>

                  <a
                    href="https://github.com/carmenvicente"
                    target="_blank"
                    className="flex items-center gap-2 bg-orange-50 text-orange-600 border border-orange-100 px-4 py-2 rounded-full hover:bg-orange-100 transition-colors shadow-sm"
                  >
                    <span className="font-medium">GitHub: @carmenvicente</span>
                  </a>
                </div>
              </div>

              {/* BLOQUE DE CONTACTO DINÁMICO */}
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-md flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">✉️</span>
                </div>

                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                  ¿Tienes una consulta?
                </h3>

                <p className="text-sm text-gray-500 mb-6">
                  Si tienes alguna duda o quieres proponer algo, pulsa el botón para escribirme.
                </p>

                <button
                  onClick={handleEmailClick}
                  className="w-full bg-[#83D8CB] text-white py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  Enviar correo
                </button>

                <p className="text-[10px] text-gray-400 mt-4 font-mono select-all">
                  cvicentecrespos@gmail.com
                </p>
              </div>
            </div>
          </section>

          {/* --- SECCIÓN ARASAAC SIMPLIFICADA CON LINKS --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-teal-900 mb-6">
              {t.sobreNosotrosPicto || 'Pictogramas y Recursos Visuales'}
            </h2>

            <div className="flex flex-col md:flex-row items-center gap-8 bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white/20">
              {/* LOGO CON LINK */}
              <a
                href="https://arasaac.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 transition-transform hover:scale-105 active:scale-95"
              >
                <img
                  src="/logo_ARASAAC_black.png"
                  alt="Logo ARASAAC"
                  className="h-16 w-auto object-contain"
                />
              </a>

              {/* TEXTO LEGAL CON LINK EN EL TEXTO */}
              <div className="flex-1">
                <p className="text-md text-gray-800 leading-relaxed mb-4">
                  {/* En lugar de solo poner {t.atribucionArasaacTexto}, lo montamos así: */}
                  Los símbolos pictográficos utilizados son propiedad del Gobierno de Aragón y han
                  sido creados por Sergio Palao para{' '}
                  <a
                    href="https://arasaac.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 font-bold hover:text-teal-800 hover:underline transition-all"
                  >
                    ARASAAC (http://www.arasaac.org)
                  </a>
                  , que los distribuye bajo Licencia Creative Commons BY-NC-SA.
                </p>

                <p className="text-xs text-gray-500 italic opacity-80">
                  {t.deslindeAragon ||
                    'El Gobierno de Aragón no se hace responsable del uso que terceros hagan de estos materiales.'}
                </p>
              </div>
            </div>
          </section>

          {/* --- SECCIÓN TECNOLOGÍAS (CAJA ÚNICA) --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-teal-900 mb-6">
              {t.tecnologias || 'Tecnologías que hacen la magia'}
            </h2>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white/40 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {/* Columna 1 */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-teal-500 mt-1">✔</span>
                    <p className="text-[var(--foreground)] opacity-90">
                      <strong>Next.js 16</strong> — Framework web
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-teal-500 mt-1">✔</span>
                    <p className="text-[var(--foreground)] opacity-90">
                      <strong>TypeScript</strong> — Lenguaje tipado
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-teal-500 mt-1">✔</span>
                    <p className="text-[var(--foreground)] opacity-90">
                      <strong>Tailwind CSS</strong> — Estilos
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-teal-500 mt-1">✔</span>
                    <p className="text-[var(--foreground)] opacity-90">
                      <strong>Supabase</strong> — Base de datos
                    </p>
                  </div>
                </div>

                {/* Columna 2 */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-teal-500 mt-1">✔</span>
                    <p className="text-[var(--foreground)] opacity-90">
                      <strong>Google Gemini</strong> — Inteligencia Artificial
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-teal-500 mt-1">✔</span>
                    <p className="text-[var(--foreground)] opacity-90">
                      <strong>jsPDF</strong> — Generación de PDFs
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-teal-500 mt-1">✔</span>
                    <p className="text-[var(--foreground)] opacity-90">
                      <strong>ARASAAC</strong> — Pictogramas (fuente externa)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
      <CookiesBanner />
    </div>
  );
}
