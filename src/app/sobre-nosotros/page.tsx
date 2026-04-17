'use client';

import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { CookiesBanner } from '@/components/home/CookiesBanner';
import { useLanguageStore, traduccionesUI } from '@/lib/stores/useLanguageStore';
import Image from 'next/image';

export default function SobreNosotros() {
  const idiomaActual = useLanguageStore((s) => s.idiomaActual);
  const t = traduccionesUI[idiomaActual] || traduccionesUI['ES'];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto prose prose-lg">
          {/* --- SECCIÓN 1: EL ORIGEN (TU HISTORIA) --- */}
          <section className="mb-16">
            <h1 className="text-3xl sm:text-5xl font-bold text-[var(--foreground)] mb-6 text-center">
              La historia detrás de ImaginAC
            </h1>
            <div className="bg-[#FAFEFF] p-8 rounded-3xl border border-blue-50 shadow-sm">
              <h2 className="text-2xl font-semibold text-[var(--marca)] mb-4 italic">
                "De una necesidad real a una herramienta para todos"
              </h2>
              <div className="space-y-4 text-[var(--foreground)] opacity-90 leading-relaxed">
                <p>
                  ImaginAC no nació en una oficina, sino en una tarde de café escuchando a una buena
                  amiga. Ella, que se está formando para ser{' '}
                  <strong>profesora de Pedagogía Terapéutica (PT)</strong>, me contaba su
                  frustración diaria.
                </p>
                <p>
                  A pesar de que existen bancos de pictogramas maravillosos, no encontraba ningún
                  sitio que le permitiera crear <strong>sus propios cuentos personalizados</strong>,
                  con la temática exacta que necesitaba para sus alumnos, y que directamente se lo
                  diera ya transcrito a pictogramas listo para imprimir y usar.
                </p>
                <p>
                  Como desarrolladora independiente, me di cuenta de que podía usar la tecnología
                  para solucionar ese vacío. Sabía que si mi amiga tenía ese problema, miles de
                  docentes PT y maestros de aula ordinaria estarían pasando por lo mismo: horas
                  infinitas buscando, recortando y pegando de forma manual.
                </p>
                <p className="font-medium text-[var(--marca)] pt-2">
                  Mi misión es simple: que tú solo pongas la imaginación. Yo me encargo del código
                  para que el resultado sea un material inclusivo, visual y profesional en segundos.
                </p>
              </div>
            </div>
          </section>

          {/* --- SECCIÓN 2: ARASAAC Y LICENCIAS --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[var(--marca)] mb-4">
              {t.sobreNosotrosPicto || 'Pictogramas y Recursos Visuales'}
            </h2>
            <p className="text-[var(--foreground)] opacity-80 mb-4">
              {t.sobreNosotrosPictoTexto ||
                'Los pictogramas utilizados en ImaginAC provienen del proyecto ARASAAC (Centro Aragonés de Comunicación Aumentativa y Alternativa), fundamentales para la accesibilidad cognitiva.'}
            </p>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  🖼️
                </div>
                {t.atribucionArasaac || 'Atribución ARASAAC'}
              </h3>
              <p className="text-sm text-[var(--foreground)] opacity-70 leading-relaxed">
                {t.atribucionArasaacTexto ||
                  'Los símbolos pictográficos utilizados son propiedad del Gobierno de Aragón y han sido creados por Sergio Palao para ARASAAC (http://www.arasaac.org), que los distribuye bajo Licencia Creative Commons BY-NC-SA.'}
              </p>
              <p className="text-xs text-[var(--foreground)] opacity-50 mt-4 italic">
                {t.deslindeAragon ||
                  'El Gobierno de Aragón no se hace responsable del uso que terceros hagan de estos materiales.'}
              </p>
            </div>
          </section>

          {/* --- SECCIÓN 3: TECNOLOGÍAS --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[var(--marca)] mb-4">
              {t.tecnologias || 'Tecnologías que hacen la magia'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="list-disc list-inside text-[var(--foreground)] opacity-80 space-y-2 bg-white p-4 rounded-xl border">
                <li>
                  <strong>Next.js 16</strong> - Estructura y velocidad
                </li>
                <li>
                  <strong>TypeScript</strong> - Seguridad en el código
                </li>
                <li>
                  <strong>Tailwind CSS</strong> - Diseño moderno
                </li>
              </ul>
              <ul className="list-disc list-inside text-[var(--foreground)] opacity-80 space-y-2 bg-white p-4 rounded-xl border">
                <li>
                  <strong>Supabase</strong> - Gestión de datos
                </li>
                <li>
                  <strong>Google Gemini</strong> - Inteligencia Artificial
                </li>
                <li>
                  <strong>ARASAAC</strong> - Lenguaje visual
                </li>
              </ul>
            </div>
          </section>
        </article>
      </main>
      <Footer />
      <CookiesBanner />
    </div>
  );
}
