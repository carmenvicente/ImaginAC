'use client';

import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { CookiesBanner } from '@/components/home/CookiesBanner';
import { useLanguageStore, traduccionesUI } from '@/lib/stores/useLanguageStore';

export default function Terminos() {
  const idiomaActual = useLanguageStore((s) => s.idiomaActual);
  const t = traduccionesUI[idiomaActual] || traduccionesUI['ES'];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-8">
            {t.terminosTitulo || 'Términos de Uso'}
          </h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[var(--marca)] mb-4">
              {t.terminosAceptacion || '1. Aceptación de los Términos'}
            </h2>
            <p className="text-[var(--foreground)] opacity-80">
              {t.terminosAceptacionTexto ||
                'Al acceder y utilizar la plataforma ImaginAC, usted acepta estar sujeto a estos Términos de Uso. Si no está de acuerdo con alguno de los términos, no debe utilizar esta plataforma.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[var(--marca)] mb-4">
              {t.terminosDescripcion || '2. Descripción del Servicio'}
            </h2>
            <p className="text-[var(--foreground)] opacity-80 mb-4">
              {t.terminosDescripcionTexto ||
                'ImaginAC es una plataforma educativa que proporciona herramientas de accesibilidad cognitiva, incluyendo la generación de cuentos y actividades adaptadas para alumnos con necesidades educativas especiales.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[var(--marca)] mb-4">
              {t.terminosUso || '3. Uso Aceptable'}
            </h2>
            <p className="text-[var(--foreground)] opacity-80 mb-2">
              {t.terminosUsoTexto || 'El usuario se compromete a:'}
            </p>
            <ul className="list-disc list-inside text-[var(--foreground)] opacity-80 space-y-1 ml-4">
              <li>Utilizar la plataforma únicamente con fines educativos legítimos</li>
              <li>No modificar, copiar o redistribuir los contenidos sin autorización</li>
              <li>No intentar acceder a cuentas de otros usuarios</li>
              <li>No utilizar la plataforma para fines comerciales sin autorización</li>
              <li>Mantener la confidencialidad de sus credenciales de acceso</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[var(--marca)] mb-4">
              {t.terminosPropiedad || '4. Propiedad Intelectual'}
            </h2>
            <p className="text-[var(--foreground)] opacity-80 mb-4">
              {t.terminosPropiedadTexto ||
                'Los cuentos y materiales generados mediante la plataforma pueden ser utilizados para fines educativos. Sin embargo, los pictogramas utilizados provienen de ARASAAC y están protegidos por la licencia Creative Commons BY-NC-SA.'}
            </p>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-[var(--foreground)] mb-2">
                {t.atribucionArasaac || 'Atribución ARASAAC'}
              </h4>
              <p className="text-sm text-[var(--foreground)] opacity-80">
                {t.atribucionArasaacTexto ||
                  'Los símbolos pictográficos utilizados son propiedad del Gobierno de Aragón y han sido creados por Sergio Palao para ARASAAC (http://www.arasaac.org), que los distribuye bajo Licencia Creative Commons BY-NC-SA.'}
              </p>
              <p className="text-xs text-[var(--foreground)] opacity-60 mt-2">
                {t.deslindeAragon ||
                  'El Gobierno de Aragón no se hace responsable del uso que terceros hagan de estos materiales.'}
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[var(--marca)] mb-4">
              {t.terminosLimitacion || '5. Limitación de Responsabilidad'}
            </h2>
            <p className="text-[var(--foreground)] opacity-80">
              {t.terminosLimitacionTexto ||
                'ImaginAC se proporciona "tal cual". No garantizamos que el servicio sea ininterrumpido o libre de errores. No somos responsables de cualquier daño derivados del uso de la plataforma.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[var(--marca)] mb-4">
              {t.terminosModificacion || '6. Modificaciones'}
            </h2>
            <p className="text-[var(--foreground)] opacity-80">
              {t.terminosModificacionTexto ||
                'Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en la plataforma.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[var(--marca)] mb-4">
              {t.terminosContacto || '7. Contacto'}
            </h2>
            <p className="text-[var(--foreground)] opacity-80">
              {t.terminosContactoTexto ||
                'Para cualquier pregunta sobre estos Términos de Uso, puede contactarnos a través del formulario de contacto en la plataforma.'}
            </p>
          </section>

          <section className="text-center pt-8 border-t">
            <p className="text-[var(--foreground)] opacity-60 text-sm">
              © {new Date().getFullYear()} ImaginAC.{' '}
              {t.derechosReservados || 'Todos los derechos reservados.'}
            </p>
          </section>
        </article>
      </main>
      <Footer />
      <CookiesBanner />
    </div>
  );
}
