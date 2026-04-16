'use client';

import Link from 'next/link';
import { useLanguageStore, traduccionesUI } from '@/lib/stores/useLanguageStore';

export function Footer() {
  const añoActual = new Date().getFullYear();
  const idiomaActual = useLanguageStore((s) => s.idiomaActual);
  const traducciones = traduccionesUI[idiomaActual] || traduccionesUI['ES'];

  return (
    <footer className="bg-[#1a4d4d] text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Columna 1: LOGO COMPLETO con recuadro traslúcido */}
          <div className="md:col-span-1 flex flex-col items-start">
            <Link href="/" className="mb-4 group">
              <img
                src="/logo_ImaginAC_completo_blanco.png"
                alt="ImaginAC Logo"
                className="w-full max-w-[250px] h-auto"
              />
            </Link>
          </div>

          {/* Columna 2: Enlaces */}
          <div>
            <h3 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">
              {traducciones.enlaces}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/70 hover:text-white transition-colors text-sm">
                  {traducciones.inicio}
                </Link>
              </li>
              <li>
                <Link
                  href="/crear-cuento"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  {traducciones.cuentos}
                </Link>
              </li>
              <li>
                <Link
                  href="/configuracion"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  {traducciones.configTitulo || 'Configuración'}
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre-nosotros"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  {traducciones.sobreNosotros}
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">
              {traducciones.legal}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacidad"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  {traducciones.politicaPrivacidad}
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  {traducciones.terminosUso}
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: ARASAAC */}
          <div>
            <h3 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm text-center md:text-left">
              {traducciones.pictogramas || 'Pictogramas'}
            </h3>
            <div className="flex flex-col items-center md:items-start space-y-4">
              {/* Logo con Link y Recuadro Traslúcido */}
              <a href="https://arasaac.org/" target="_blank">
                {' '}
                <img src="/logo_ARASAAC.png" alt="Logo ARASAAC" className="h-10 w-auto" />{' '}
              </a>

              {/* Texto con Enlaces Detallados */}
              <p className="text-white/60 text-[11px] leading-relaxed text-center md:text-left">
                Autor: <span className="text-white">Sergio Palao</span>. <br />
                Origen:{' '}
                <a
                  href="https://arasaac.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline decoration-white/30 hover:decoration-white transition-all"
                >
                  ARASAAC (http://www.arasaac.org)
                </a>
                . <br />
                Licencia:{' '}
                <a
                  href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline decoration-white/30 hover:decoration-white transition-all"
                >
                  CC (BY-NC-SA)
                </a>{' '}
                <br />
                Propiedad: <span className="text-white">Gobierno de Aragón (España)</span>. <br />
              </p>
            </div>
          </div>
        </div>

        {/* Línea de Copyright */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-white/50 text-xs">
            © {añoActual} ImaginAC - {traducciones.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
