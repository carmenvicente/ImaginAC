'use client';

import { useState, useEffect } from 'react'; // Añadido
import Link from 'next/link';
import Image from 'next/image';
import { useLanguageStore, traduccionesUI } from '@/lib/stores/useLanguageStore';

export function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);
  const idiomaActual = useLanguageStore((s) => s.idiomaActual);
  const traducciones = traduccionesUI[idiomaActual] || traduccionesUI['ES'];

  // --- PARCHE DE HIDRATACIÓN ---
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Retornamos un hueco del mismo tamaño aproximado para que no haya saltos
    return <section className="min-h-[calc(100vh-64px)] bg-[#40E0D0]/40" />;
  }
  // -----------------------------

  return (
    <section
      className="relative min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* 1. IMAGEN DE FONDO */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=1920&q=80"
          alt="Material escolar claro"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Degradado sobre la imagen para asegurar legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#40E0D0]/40 via-[#40E0D0]/60 to-[#0d4a4a]/90" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-3 md:px-4 text-center">
        {/* 2. LOGO COMPLETO */}
        <div className="mb-4 md:mb-6">
          <img
            src="/logo_ImaginAC_completo.png"
            alt="ImaginAC Logo"
            className="mx-auto w-full max-w-[200px] md:max-w-[280px] lg:max-w-[320px] h-auto drop-shadow-xl"
          />
        </div>

        {/* 3. DESCRIPCIÓN */}
        <h2
          id="hero-title"
          className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 md:mb-10 leading-snug drop-shadow-lg px-2"
        >
          {traducciones.heroSubtitulo}
        </h2>

        {/* 4. BOTÓN DE ACCESO */}
        <Link
          href="/crear-cuento"
          className="inline-flex items-center justify-center px-6 md:px-10 py-3 md:py-4 bg-[#F4A460] text-base md:text-xl font-bold rounded-xl md:rounded-2xl hover:bg-[#e09550] transition-all transform hover:scale-105 shadow-xl hover:shadow-[#F4A460]/20 uppercase tracking-wide"
        >
          {traducciones.accederApp}
        </Link>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-8 h-8 text-white/70"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
