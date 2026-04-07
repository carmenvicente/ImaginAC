'use client';

import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { CookiesBanner } from '@/components/home/CookiesBanner';
import { useLanguageStore, traduccionesUI } from '@/lib/stores/useLanguageStore';

export default function Privacidad() {
  const idiomaActual = useLanguageStore((s) => s.idiomaActual);
  const t = traduccionesUI[idiomaActual] || traduccionesUI['ES'];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-8">
            {t.privacidadTitulo || 'Política de Privacidad'}
          </h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[var(--marca)] mb-4">
              {t.privacidadIntro || '1. Introducción'}
            </h2>
            <p className="text-[var(--foreground)] opacity-80">
              {t.privacidadIntroTexto ||
                'ImaginAC se compromete a proteger su privacidad. Esta política explica cómo recopilamos, usamos y protegemos su información personal cuando utiliza nuestra plataforma educativa.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[var(--marca)] mb-4">
              {t.privacidadDatos || '2. Datos que Recopilamos'}
            </h2>
            <ul className="list-disc list-inside text-[var(--foreground)] opacity-80 space-y-2">
              <li>
                <strong>Datos de registro:</strong> nombre, correo electrónico, contraseña (cifrada)
              </li>
              <li>
                <strong>Datos de perfil:</strong> rol (Profesor PT o Alumno)
              </li>
              <li>
                <strong>Datos de uso:</strong> cuentos creados, actividades realizadas
              </li>
              <li>
                <strong>Preferencias:</strong> idioma seleccionado, configuración de cookies
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[var(--marca)] mb-4">
              {t.privacidadUso || '3. Uso de los Datos'}
            </h2>
            <p className="text-[var(--foreground)] opacity-80 mb-2">
              {t.privacidadUsoTexto || 'Utilizamos sus datos para:'}
            </p>
            <ul className="list-disc list-inside text-[var(--foreground)] opacity-80 space-y-1 ml-4">
              <li>Proporcionar y mantener el servicio</li>
              <li>Personalizar la experiencia educativa</li>
              <li>Generar cuentos y actividades adaptadas</li>
              <li>Comunicar cambios en el servicio</li>
              <li>Cumplir obligaciones legales</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[var(--marca)] mb-4">
              {t.privacidadCookies || '4. Cookies'}
            </h2>
            <p className="text-[var(--foreground)] opacity-80 mb-2">
              {t.privacidadCookiesTexto || 'Utilizamos cookies para:'}
            </p>
            <ul className="list-disc list-inside text-[var(--foreground)] opacity-80 space-y-1 ml-4">
              <li>
                <strong>Cookies esenciales:</strong> autenticación y preferencias del usuario
              </li>
              <li>
                <strong>Cookies de idioma:</strong> recordar el idioma seleccionado
              </li>
              <li>
                <strong>Cookies de sesión:</strong> mantener la sesión activa
              </li>
            </ul>
            <p className="text-[var(--foreground)] opacity-80 mt-4">
              {t.privacidadCookiesAdicional ||
                'Para más información sobre nuestra política de cookies, consulte nuestra Política de Cookies.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[var(--marca)] mb-4">
              {t.privacidadProteccion || '5. Protección de Datos'}
            </h2>
            <p className="text-[var(--foreground)] opacity-80">
              {t.privacidadProteccionTexto ||
                'Implementamos medidas de seguridad apropiadas para proteger sus datos personales contra acceso no autorizado, modificación, divulgación o destrucción. Los datos se almacenan en Supabase con cifrado en tránsito y en reposo.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[var(--marca)] mb-4">
              {t.privacidadDerechos || '6. Sus Derechos'}
            </h2>
            <p className="text-[var(--foreground)] opacity-80 mb-2">
              {t.privacidadDerechosTexto || 'Usted tiene derecho a:'}
            </p>
            <ul className="list-disc list-inside text-[var(--foreground)] opacity-80 space-y-1 ml-4">
              <li>Acceder a sus datos personales</li>
              <li>Rectificar datos inexactos</li>
              <li>Solicitar la eliminación de sus datos</li>
              <li>Oponerse al tratamiento de sus datos</li>
              <li>Portabilidad de sus datos</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[var(--marca)] mb-4">
              {t.privacidadTerceros || '7. Terceros'}
            </h2>
            <p className="text-[var(--foreground)] opacity-80">
              {t.privacidadTercerosTexto ||
                'No compartimos sus datos personales con terceros, excepto cuando sea necesario para prestar el servicio (por ejemplo, Supabase para almacenamiento) o cuando la ley lo exija. Los pictogramas de ARASAAC se cargan directamente desde sus servidores.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[var(--marca)] mb-4">
              {t.privacidadCambios || '8. Cambios'}
            </h2>
            <p className="text-[var(--foreground)] opacity-80">
              {t.privacidadCambiosTexto ||
                'Podemos actualizar esta política periódicamente. Le notificaremos cualquier cambio publicando la nueva política en esta página y, si los cambios son significativos, le enviaremos una notificación por correo electrónico.'}
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
