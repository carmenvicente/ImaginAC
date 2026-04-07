'use client';

import Link from 'next/link';
import { useLanguageStore, traduccionesUI } from '@/lib/stores/useLanguageStore';

export function Footer() {
  const añoActual = new Date().getFullYear();
  const idiomaActual = useLanguageStore((s) => s.idiomaActual);
  const traducciones = traduccionesUI[idiomaActual] || traduccionesUI['ES'];

  return (
    <footer className="bg-[#40E0D0] text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <span className="text-[#40E0D0] font-bold text-lg">I</span>
              </div>
              <span className="font-bold text-xl text-white">ImaginAC</span>
            </div>
            <p className="text-white/80 text-sm">
              Accesibilidad Cognitiva para Profesores PT y Alumnos
            </p>
            <p className="text-white/60 text-sm mt-2">Versión 0.1.0</p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">{traducciones.enlaces}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition-colors">
                  {traducciones.inicio}
                </Link>
              </li>
              <li>
                <Link
                  href="/profesor/crear-cuento"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {traducciones.cuentos}
                </Link>
              </li>
              <li>
                <Link
                  href="/configuracion"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {traducciones.configTitulo || 'Configuración'}
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre-nosotros"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {traducciones.sobreNosotros}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">{traducciones.legal}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacidad"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {traducciones.politicaPrivacidad}
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-white/80 hover:text-white transition-colors">
                  {traducciones.terminosUso}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">
              {traducciones.pictogramas || 'Pictogramas'}
            </h3>
            <div className="space-y-2">
              <img
                src="/logo_ARASAAC_black.png"
                alt="Logo ARASAAC"
                className="h-12 w-auto mx-auto"
              />
              <p className="text-white/60 text-xs leading-relaxed text-center">
                {traducciones.atribucionFooter ||
                  'Autor: Sergio Palao. Origen: ARASAAC. Licencia: CC BY-NC-SA'}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/60 text-sm">
            © {añoActual} ImaginAC - {traducciones.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
