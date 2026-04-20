'use client';

import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { CookiesBanner } from '@/components/home/CookiesBanner';

export default function PoliticaCookies() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-8">
            Política de Cookies
          </h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[var(--marca)] mb-4">
              ¿Qué son las cookies?
            </h2>
            <p className="text-[var(--foreground)] opacity-80">
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando
              visitas un sitio web. Se utilizan para recordar tus preferencias y mejorar tu
              experiencia de navegación.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[var(--marca)] mb-4">
              Tipos de cookies que utilizamos
            </h2>
            <p className="text-[var(--foreground)] opacity-80">
              Esta página está en construcción. Próximamente informaremos sobre las cookies
              utilizadas en ImaginAC.
            </p>
          </section>
        </article>
      </main>
      <Footer />
      <CookiesBanner />
    </div>
  );
}
