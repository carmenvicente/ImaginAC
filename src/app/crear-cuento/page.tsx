'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react'; // Importamos los hooks necesarios
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { CookiesBanner } from '@/components/home/CookiesBanner';
import { FormularioCrearCuento } from '@/components/profesor/FormularioCrearCuento';
import { VisorCuentoDemo } from '@/components/profesor/VisorCuentoDemo';
import { useLanguageStore, traduccionesUI } from '@/lib/stores/useLanguageStore';

interface CuentoData {
  titulo: string;
  finalidad: string;
  texto: string;
  pictogramas: any[];
}

export default function PaginaCrearCuento() {
  const idiomaActual = useLanguageStore((s) => s.idiomaActual);
  const t = traduccionesUI[idiomaActual] || traduccionesUI['ES'];
  const [cuento, setCuento] = useState<CuentoData | null>(null);

  // 1. Creamos la referencia para la sección del resultado
  const resultadoRef = useRef<HTMLDivElement>(null);

  // 2. Efecto para hacer scroll automático cuando aparezca el cuento
  useEffect(() => {
    if (cuento && resultadoRef.current) {
      // Un pequeño timeout asegura que el elemento ya existe en el DOM antes de movernos
      setTimeout(() => {
        resultadoRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    }
  }, [cuento]);

  return (
    <div className="min-h-screen flex flex-col relative bg-[#ecffff]">
      <Navbar />

      {/* IMAGEN DE CABECERA CON DEGRADADO EXTENDIDO */}
      <div className="absolute top-0 left-0 w-full h-[1000px] z-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1920&q=80"
          alt="Fondo educativo"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#40E0D0]/30 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-[60%] to-[#ecffff] to-[95%]" />
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <main className="relative z-10 flex-1 px-4 py-6 md:py-10 min-h-[calc(100vh-64px)] flex flex-col justify-start">
        <div className="w-full max-w-5xl mx-auto">
          {/* Formulario Compacto */}
          <section className="bg-white/95 backdrop-blur-md p-5 md:p-8 rounded-[1.5rem] shadow-2xl border border-white/40">
            <h2 className="text-2xl font-bold text-[#1a4d4d] mb-4 text-center">
              {t.crearCuentoTitulo}
            </h2>
            <FormularioCrearCuento profesorId="demo" onCuentoGenerado={setCuento} />
          </section>

          {/* Resultado: Con la referencia (ref) para el scroll y animación */}
          {cuento && (
            <div
              ref={resultadoRef} // Asignamos la referencia aquí
              className="mt-24 pb-20 animate-in fade-in slide-in-from-bottom-10 duration-1000"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#1a4d4d] mb-10 text-center drop-shadow-sm">
                {t.cuentoListo}
              </h2>
              <div className="bg-white p-4 md:p-8 rounded-[2rem] shadow-2xl border border-[#40E0D0]/20">
                <VisorCuentoDemo cuento={cuento} />
              </div>
            </div>
          )}
        </div>
      </main>

      <div className="relative z-20">
        <Footer />
      </div>
      <CookiesBanner />
    </div>
  );
}
