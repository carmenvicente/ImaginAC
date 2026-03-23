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
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-8">
            {t.sobreNosotrosTitulo || 'Sobre Nosotros'}
          </h1>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[var(--marca)] mb-4">
              {t.sobreNosotrosMision || 'Nuestra Misión'}
            </h2>
            <p className="text-[var(--foreground)] opacity-80 mb-4">
              {t.sobreNosotrosMisionTexto ||
                'AdaptAC es una plataforma educativa diseñada para facilitar la accesibilidad cognitiva a profesores de educación especial (PT) y alumnos con necesidades específicas de aprendizaje.'}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[var(--marca)] mb-4">
              {t.sobreNosotrosPicto || 'Pictogramas y Recursos Visuales'}
            </h2>
            <p className="text-[var(--foreground)] opacity-80 mb-4">
              {t.sobreNosotrosPictoTexto ||
                'Los pictogramas utilizados en AdaptAC provienen del proyecto ARASAAC (Centro Aragonés de Comunicación Aumentativa y Alternativa), distribuidos bajo licencia Creative Commons.'}
            </p>
          </section>

          <section className="mb-12 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              {t.atribucionArasaac || 'Atribución ARASAAC'}
            </h3>
            <div className="mb-4">
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-white">
                <span className="text-gray-400 text-sm text-center px-2">
                  {t.logoArasaacPlaceholder || '[Logo ARASAAC]'}
                </span>
              </div>
            </div>
            <p className="text-sm text-[var(--foreground)] opacity-70">
              {t.atribucionArasaacTexto ||
                'Los símbolos pictográficos utilizados son propiedad del Gobierno de Aragón y han sido creados por Sergio Palao para ARASAAC (http://www.arasaac.org), que los distribuye bajo Licencia Creative Commons BY-NC-SA.'}
            </p>
            <p className="text-xs text-[var(--foreground)] opacity-50 mt-2">
              {t.deslindeAragon ||
                'El Gobierno de Aragón no se hace responsable del uso que terceros hagan de estos materiales.'}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[var(--marca)] mb-4">
              {t.tecnologias || 'Tecnologías Utilizadas'}
            </h2>
            <ul className="list-disc list-inside text-[var(--foreground)] opacity-80 space-y-2">
              <li>Next.js 16 - Framework de React</li>
              <li>TypeScript - Lenguaje tipado</li>
              <li>Tailwind CSS - Estilos</li>
              <li>Supabase - Base de datos y autenticación</li>
              <li>Google Gemini - Inteligencia Artificial</li>
              <li>ARASAAC - Pictogramas</li>
            </ul>
          </section>

          <section className="text-center pt-8 border-t">
            <p className="text-[var(--foreground)] opacity-60">
              © {new Date().getFullYear()} AdaptAC.{' '}
              {t.derechosReservados || 'Todos los derechos reservados.'}
            </p>
          </section>
        </article>
      </main>
      <Footer />
      <CookiesBanner />
    </div>
  );
}
