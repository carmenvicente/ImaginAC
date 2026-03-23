'use client';

import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { CookiesBanner } from '@/components/home/CookiesBanner';
import { FormularioCrearCuento } from '@/components/profesor/FormularioCrearCuento';

export default function PaginaCrearCuento() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />

      {/* Añadimos py-8 para darle espacio al contenido sin empujar el Navbar */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Crear Nuevo Cuento</h2>

          {/* El formulario original */}
          <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
            <FormularioCrearCuento profesorId="demo" />
          </div>

          {/* NUEVA CAJA: Licencia ARASAAC independiente */}
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <img src="/logo_ARASAAC_black.png" alt="Logo ARASAAC" className="w-32 mx-auto mb-4" />
            <p className="text-sm text-gray-600 font-medium">
              Autor pictogramas: Sergio Palao. Origen: ARASAAC (http://www.arasaac.org). Licencia:
              CC (BY-NC-SA). Propiedad: Gobierno de Aragón (España)
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <CookiesBanner />
    </div>
  );
}
