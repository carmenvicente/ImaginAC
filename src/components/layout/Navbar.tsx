'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguageStore, traduccionesUI } from '@/lib/stores/useLanguageStore';

export function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const idiomaActual = useLanguageStore((s) => s.idiomaActual);
  const traducciones = traduccionesUI[idiomaActual] || traduccionesUI['ES'];

  const enlaces = [
    { href: '/', label: traducciones.inicio },
    { href: '/crear-cuento', label: traducciones.cuentos },
    { href: '/sobre-nosotros', label: traducciones.sobreNosotros },
  ];

  return (
    <nav
      className="sticky top-0 z-50 bg-white shadow-sm"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3" aria-label="ImaginAC - Inicio">
              {/* Logo con etiqueta img estándar igual que en el footer */}
              <img
                src="/logo_ImaginAC_simple.png"
                alt="Logo ImaginAC"
                className="w-16 h-16 object-contain"
              />

              {/* Texto de la marca */}
              <span className="font-bold text-2xl tracking-tight text-[#F4A460]">ImaginAC</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {enlaces.map((enlace) => (
              <Link
                key={enlace.href}
                href={enlace.href}
                className="text-[var(--foreground)] hover:text-[var(--marca)] font-medium transition-colors"
              >
                {enlace.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
          </div>

          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="p-2 rounded-lg text-[var(--foreground)] hover:bg-gray-100 transition-colors"
              aria-expanded={menuAbierto}
              aria-controls="menu-mobile"
              aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
            >
              {menuAbierto ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {menuAbierto && (
        <div id="menu-mobile" className="md:hidden bg-white border-t border-gray-100" role="menu">
          <div className="px-4 py-3 space-y-1">
            {enlaces.map((enlace) => (
              <Link
                key={enlace.href}
                href={enlace.href}
                role="menuitem"
                className="block px-4 py-3 text-base font-medium text-[var(--foreground)] hover:text-[var(--marca)] hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMenuAbierto(false)}
              >
                {enlace.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
