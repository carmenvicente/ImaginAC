'use client';

import { useState } from 'react';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { CookiesBanner } from '@/components/home/CookiesBanner';
import { FormularioCrearCuento } from '@/components/profesor/FormularioCrearCuento';
import { VisorCuentoDemo } from '@/components/profesor/VisorCuentoDemo';

interface CuentoData {
  titulo: string;
  finalidad: string;
  texto: string;
  pictogramas: any[];
}

export default function PaginaCrearCuento() {
  const [cuento, setCuento] = useState<CuentoData | null>(null);

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col bg-[var(--background)]">
      <Navbar />

      <main className="flex-1 px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-12 pb-20 mb-8">
          <section className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Crear Nuevo Cuento</h2>
            <FormularioCrearCuento profesorId="demo" onCuentoGenerado={setCuento} />
          </section>

          {/* CONTENEDOR 2: RESULTADO (Totalmente oculto hasta tener datos) */}
          {cuento && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Cuento Generado</h2>
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <VisorCuentoDemo cuento={cuento} />
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <CookiesBanner />
    </div>
  );
}
