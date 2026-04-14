'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguageStore, traduccionesUI } from '@/lib/stores/useLanguageStore';

export function HeroSection() {
  const idiomaActual = useLanguageStore((s) => s.idiomaActual);
  const traducciones = traduccionesUI[idiomaActual] || traduccionesUI['ES'];

  return (
    <section
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&q=80"
          alt="Educación inclusiva y accesible"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#40E0D0]/30 to-[#40E0D0]/60" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1
          id="hero-title"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg leading-tight"
        >
          {traducciones.heroTitulo}
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-10 max-w-3xl mx-auto drop-shadow-md px-2">
          {traducciones.heroSubtitulo}
        </p>
        <Link
          href="/crear-cuento"
          className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-[#F4A460] text-white text-base sm:text-lg font-bold rounded-xl hover:bg-[#e09550] transition-all transform hover:scale-105 shadow-lg"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          {traducciones.accederApp}
        </Link>
      </div>

      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8 text-white/80"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
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
