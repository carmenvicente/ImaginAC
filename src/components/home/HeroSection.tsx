'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguageStore, traduccionesUI } from '@/lib/stores/useLanguageStore';

export function HeroSection() {
  const idiomaActual = useLanguageStore((s) => s.idiomaActual);
  const traducciones = traduccionesUI[idiomaActual] || traduccionesUI['ES'];

  return (
    <section
      className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* 1. RECUPERAMOS LA IMAGEN DE FONDO */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&q=80"
          alt="Educación inclusiva y accesible"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Degradado sobre la imagen para asegurar legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#40E0D0]/40 to-[#40E0D0]/70" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center">
        {/* 2. LOGO COMPLETO (Más pequeño: max-w-[320px]) */}
        <div className="mb-6">
          <img
            src="/logo_ImaginAC_completo.png" // Asegúrate de que el nombre coincida en public
            alt="ImaginAC Logo"
            className="mx-auto w-full max-w-[320px] h-auto drop-shadow-xl"
          />
        </div>

        {/* 3. NUEVA DESCRIPCIÓN (Todo en BLANCO, grande y detallado) */}
        <h2
          id="hero-title"
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-10 leading-snug drop-shadow-lg"
        >
          {traducciones.heroSubtitulo}
        </h2>

        {/* 4. BOTÓN DE ACCESO (Mismo estilo que tenías) */}
        <Link
          href="/crear-cuento"
          className="inline-flex items-center justify-center px-10 py-4 bg-[#F4A460] text-white text-xl font-bold rounded-2xl hover:bg-[#e09550] transition-all transform hover:scale-105 shadow-xl hover:shadow-[#F4A460]/20 uppercase tracking-wide"
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
