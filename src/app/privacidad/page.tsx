'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookiesBanner } from '@/components/home/CookiesBanner';
import { LegalLanguageBanner } from '@/components/ui/LegalLanguageBanner';
import { useLanguageStore, traduccionesUI } from '@/lib/stores/useLanguageStore';

export default function Privacidad() {
  const idiomaActual = useLanguageStore((s) => s.idiomaActual);
  const t = traduccionesUI[idiomaActual] || traduccionesUI['ES'];

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = 'mailto:cvicentecrespos@gmail.com?subject=Privacidad - ImaginAC';
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />

      <main className="flex-1 py-8 md:py-12 px-3 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto prose prose-sm sm:prose md:prose-lg">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-900 mb-6 md:mb-10 border-b pb-4">
            {t.politicaPrivacidadTitulo}
          </h1>
          <LegalLanguageBanner />

          {/* SECCIÓN 1: RESPONSABLE */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">1. Responsable del Tratamiento</h2>
            <p className="text-gray-700 leading-relaxed">
              En cumplimiento de lo establecido en el{' '}
              <strong>
                Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de
                2016
              </strong>
              , relativo a la protección de las personas físicas en lo que respecta al tratamiento
              de datos personales y a la libre circulación de estos datos (RGPD), así como en la{' '}
              <strong>
                Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía
                de los derechos digitales (LOPDGDD)
              </strong>
              , le informamos de la Política de Protección de Datos Personales, en lo que se refiere
              al tratamiento de los datos personales, es la que se detalla a continuación.
            </p>{' '}
            <br />
            <p>
              El responsable del tratamiento es la persona física o jurídica que determina los fines
              y medios del tratamiento de datos personales. En otras palabras, el responsable decide
              cómo y con qué finalidades se tratan los datos personales.
            </p>{' '}
            <br />
            <p>
              A los efectos de la presente Política de Protección de Datos, el responsable del
              tratamiento de los datos personales es:
            </p>
            <ul className="list-none pl-0 text-gray-700 space-y-1 mt-4">
              <li>
                <strong>Titular:</strong> Carmen Vicente Crespo
              </li>
              <li>
                <strong>NIF:</strong> 04656218Y
              </li>
              <li>
                <strong>Domicilio:</strong> Cuenca, España
              </li>
              <li>
                <strong>Nombre Comercial:</strong> ImaginAC
              </li>
              <li>
                <strong>Contacto:</strong>
                <button
                  onClick={handleEmailClick}
                  className="text-teal-600 underline ml-1 hover:text-teal-800 transition-colors"
                >
                  cvicentecrespos@gmail.com
                </button>
              </li>
            </ul>
          </section>

          {/* SECCIÓN 2: TRATAMIENTO DE DATOS */}
          <section className="mb-10 -ml-6 w-[calc(100%+3rem)]">
            {/* Texto introductorio: sin fondo, alineado con el resto del documento */}
            <div className="px-6 mb-8">
              <h2 className="text-xl font-bold text-teal-900 mt-0 mb-4">
                2. ¿Qué datos personales tratamos y cómo los protegemos?
              </h2>
              <div className="text-gray-800 leading-relaxed space-y-4">
                <p>
                  Un dato personal es toda información sobre una persona física identificada o
                  identificable.
                </p>
                <p>
                  Para las finalidades establecidas en esta Política de Privacidad, la responsable
                  recaba y trata los datos personales que se explican en cada tipo de tratamiento, y
                  que dependerán de los diferentes servicios que solicite o la relación con nuestra
                  entidad.
                </p>
                <p>
                  Nuestra organización se compromete a tratar con total confidencialidad y a aplicar
                  las medidas de seguridad adecuadas, de tipo físico, técnico y organizativo, para
                  la protección de sus datos personales.
                </p>
                <p>
                  Usted garantiza y responde de la veracidad y autenticidad de los datos
                  proporcionados y se compromete a mantenerlos debidamente actualizados.
                </p>
              </div>
            </div>

            {/* Las cajitas de tratamiento: con el azul más potente */}
            <ul className="list-none px-6 space-y-6">
              {/* CASO A: CONSULTAS */}
              <li className="bg-teal-50 border border-teal-200 p-6 rounded-2xl shadow-sm">
                <strong className="text-teal-900 block mb-4 text-lg border-b border-teal-300/50 pb-2">
                  Tratamiento de datos de “Consultas por Email”
                </strong>
                <div className="grid gap-3 text-gray-800 text-sm md:text-base">
                  <p>
                    <strong>1. ¿Qué tipo de datos personales tratamos?</strong> Datos
                    identificativos: nombre y dirección de correo electrónico.
                  </p>
                  <p>
                    <strong>2. ¿Con qué finalidad?</strong> Gestión de las consultas o dudas
                    planteadas por el usuario a través de los canales de contacto.
                  </p>
                  <p>
                    <strong>3. ¿Cuál es la legitimación?</strong> La base legal es el consentimiento
                    expreso del interesado al remitir su comunicación.
                  </p>
                  <p>
                    <strong>4. ¿A qué destinatarios?</strong> Los datos son gestionados por{' '}
                    <strong>Resend</strong> (Resend Inc., EE.UU.) como encargado del tratamiento
                    para el envío técnico del correo electrónico. No se cederán datos a ningún otro
                    tercero, salvo obligación legal.
                  </p>
                </div>
              </li>

              {/* CASO B: IA */}
              <li className="bg-teal-50 border border-teal-200 p-6 rounded-2xl shadow-sm">
                <strong className="text-teal-900 block mb-4 text-lg border-b border-teal-300/50 pb-2">
                  Tratamiento de datos de “Uso de la IA (Google Gemini)”
                </strong>
                <div className="grid gap-3 text-gray-800 text-sm md:text-base">
                  <p>
                    <strong>1. ¿Qué tipo de datos personales tratamos?</strong> Textos e
                    instrucciones (prompts) suministrados. Se recomienda no introducir datos
                    personales sensibles.
                  </p>
                  <p>
                    <strong>2. ¿Con qué finalidad?</strong> Procesamiento técnico para la generación
                    de cuentos y materiales educativos adaptados.
                  </p>
                  <p>
                    <strong>3. ¿Cuál es la legitimación?</strong> Ejecución de la solicitud de
                    servicio realizada por el usuario al interactuar con la herramienta.
                  </p>
                  <p>
                    <strong>4. ¿A qué destinatarios?</strong> El texto es procesado por la API de
                    Google de forma técnica; no se comparten datos de identidad del usuario.
                  </p>
                </div>
              </li>

              {/* CASO C: ALMACENAMIENTO */}
              <li className="bg-teal-50 border border-teal-200 p-6 rounded-2xl shadow-sm">
                <strong className="text-teal-900 block mb-4 text-lg border-b border-teal-300/50 pb-2">
                  Tratamiento de datos de "Almacenamiento de contenidos generados (Supabase)"
                </strong>
                <div className="grid gap-3 text-gray-800 text-sm md:text-base">
                  <p>
                    <strong>1. ¿Qué tipo de datos personales tratamos?</strong> Contenidos generados
                    por el usuario a través de la herramienta (cuentos, pictogramas y traducciones).
                    No se almacenan datos identificativos del usuario.
                  </p>
                  <p>
                    <strong>2. ¿Con qué finalidad?</strong> Almacenamiento temporal de los
                    materiales educativos generados para permitir su visualización y uso dentro de la
                    plataforma.
                  </p>
                  <p>
                    <strong>3. ¿Cuál es la legitimación?</strong> Ejecución del servicio solicitado
                    por el usuario al interactuar con la herramienta.
                  </p>
                  <p>
                    <strong>4. ¿A qué destinatarios?</strong> Los datos se almacenan en{' '}
                    <strong>Supabase</strong> (Supabase Inc., EE.UU.) como encargado del
                    tratamiento, en servidores ubicados en la Unión Europea (Irlanda).
                  </p>
                </div>
              </li>

              {/* CASO D: NAVEGACIÓN */}
              <li className="bg-teal-50 border border-teal-200 p-6 rounded-2xl shadow-sm">
                <strong className="text-teal-900 block mb-4 text-lg border-b border-teal-300/50 pb-2">
                  Tratamiento de datos de “Datos de Navegación”
                </strong>
                <div className="grid gap-3 text-gray-800 text-sm md:text-base">
                  <p>
                    <strong>1. ¿Qué tipo de datos personales tratamos?</strong> Datos técnicos de
                    navegación que el servidor de alojamiento puede registrar (como la dirección IP)
                    y preferencias de idioma guardadas en el navegador.
                  </p>
                  <p>
                    <strong>2. ¿Con qué finalidad?</strong> Garantizar la correcta administración
                    del Sitio Web y recordar las preferencias del usuario.
                  </p>
                  <p>
                    <strong>3. ¿Cuál es la legitimación?</strong> Interés legítimo para el
                    funcionamiento técnico y consentimiento para el uso de cookies.
                  </p>
                  <p>
                    <strong>4. ¿A qué destinatarios?</strong> No se prevén cesiones a ninguna
                    entidad.
                  </p>
                </div>
              </li>
            </ul>
          </section>

          {/* SECCIÓN 3: SUS DERECHOS */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">3. ¿Cuáles son sus derechos?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              De conformidad con la normativa aplicable en materia de protección de datos, Usted
              tiene una serie de derechos en relación con el tratamiento de sus datos personales. El
              ejercicio de estos derechos será gratuito para usted, excepto en los casos en que se
              formulen solicitudes manifiestamente infundadas o excesivas, especialmente por
              repetitivas.
            </p>
            <p className="text-gray-700 mb-4 font-medium">Estos derechos son los siguientes:</p>

            <ul className="list-none pl-0 space-y-6 text-gray-700">
              <li>
                <strong>1. Derecho de información:</strong> Usted tiene derecho a ser informado de
                manera concisa, transparente, inteligible y de fácil acceso, con un lenguaje claro y
                sencillo, sobre la utilización y tratamiento de sus datos personales.
              </li>
              <li>
                <strong>2. Derecho de acceso:</strong> Usted tiene derecho a solicitarnos en
                cualquier momento que le confirmemos si estamos tratando sus datos personales, a que
                le facilitemos acceso a los mismos y a la información sobre su tratamiento y a
                obtener una copia de dichos datos. Por nuestra parte, podremos pedirle que acredite
                su identidad o requerirle más información que sea necesaria para gestionar su
                solicitud.
              </li>
              <li>
                <strong>3. Derecho de rectificación:</strong> Usted tiene derecho a solicitar la
                rectificación de los datos personales inexactos, no actualizados o incompletos que
                le conciernan.
              </li>
              <li>
                <strong>4. Derecho de supresión:</strong> Usted tiene derecho a solicitar la
                supresión de sus datos personales cuando, entre otros motivos, los datos ya no sean
                necesarios para los fines para los que fueran recogidos.
              </li>
              <li>
                <strong>5. Derecho a limitar el tratamiento:</strong> Usted tiene derecho a
                solicitar que limitemos el tratamiento de sus datos personales cuando se impugne la
                exactitud de los mismos, el tratamiento sea ilícito, o el responsable ya no los
                necesite pero el interesado sí para la defensa de reclamaciones.
              </li>
              <li>
                <strong>6. Derecho a la portabilidad de los datos:</strong> Usted tiene derecho a
                que sus datos sean transmitidos a otro responsable del tratamiento en un formato
                estructurado, de uso común y lectura mecánica.
              </li>
              <li>
                <strong>7. Derecho de oposición:</strong> Este derecho le permite oponerse al
                tratamiento de sus datos personales. No podremos atender a su derecho únicamente
                cuando acreditemos motivos legítimos que prevalezcan sobre los suyos o para la
                defensa de reclamaciones.
              </li>
              <li>
                <strong>8. Derecho a no someterse a decisiones automatizadas:</strong> Incluyendo la
                elaboración de perfiles, que produzcan efectos jurídicos o le afecten de modo
                similar, salvo que sea necesario para la ejecución de un contrato o se base en el
                consentimiento.
              </li>
              <li>
                <strong>9. Derecho a retirar el consentimiento:</strong> En los casos en los que
                hayamos obtenido su consentimiento para el tratamiento, podrá retirarlo en cualquier
                momento sin que ello afecte a la licitud del tratamiento previo.
              </li>
              <li>
                <strong>
                  10. Derecho a presentar una reclamación ante una autoridad de control:
                </strong>{' '}
                Usted tiene derecho a presentar una reclamación ante la Agencia Española de
                Protección de Datos (www.aepd.es) si considera que el tratamiento no se ajusta a la
                normativa vigente.
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-gray-700 leading-relaxed">
                Podrá ejercitar los derechos antes indicados enviando una comunicación por correo
                electrónico a <strong>cvicentecrespos@gmail.com</strong> acompañando un documento
                acreditativo de su identidad y proporcionando los detalles necesarios para procesar
                su solicitud.
              </p>
            </div>
          </section>

          {/* SECCIÓN 4: CONSERVACIÓN Y DESTINATARIOS */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              4. Conservación y Destinatarios
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Los datos se conservarán durante el tiempo necesario para cumplir con la finalidad
              para la que se recabaron o mientras usted no revoque su consentimiento. No se cederán
              datos a terceros ajenos al servicio, salvo obligación legal.
            </p>
            <p className="text-gray-700 mt-4 leading-relaxed">
              Los pictogramas se sirven desde los servidores de <strong>ARASAAC</strong>. El
              procesamiento de textos se realiza mediante la API de <strong>Google Gemini</strong>{' '}
              (Google LLC, EE.UU.). Los contenidos generados se almacenan en{' '}
              <strong>Supabase</strong> (Supabase Inc., EE.UU., servidores en Irlanda). El envío de
              comunicaciones de feedback se gestiona a través de <strong>Resend</strong> (Resend
              Inc., EE.UU.). Todos estos proveedores actúan como encargados del tratamiento con las
              garantías adecuadas conforme al RGPD.
            </p>
            {/* Nota técnica sobre la API para mayor seguridad legal */}
            <p className="text-gray-600 mt-2 text-sm italic bg-gray-50 p-3 rounded-lg border-l-4 border-teal-400">
              Nota técnica: El uso de la API de Google Gemini en el Sitio Web garantiza que los
              textos enviados para procesar no son utilizados por el proveedor para el entrenamiento
              de sus modelos globales de inteligencia artificial, manteniendo el procesamiento en un
              entorno estrictamente técnico y privado.
            </p>
          </section>

          {/* SECCIÓN 5: PROTECCIÓN DE MENORES */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">5. Protección de Menores</h2>
            <p className="text-gray-700 leading-relaxed">
              ImaginAC es una herramienta orientada a profesionales de la educación, terapeutas y
              familias. La plataforma no recaba ni trata deliberadamente datos de menores de 14 años
              sin el consentimiento de sus padres o tutores.
            </p>
            <p className="text-gray-700 mt-4 leading-relaxed">
              Dado que el servicio genera materiales destinados al apoyo pedagógico infantil,
              recomendamos que cualquier interacción directa de un menor con la herramienta sea
              supervisada en todo momento por un adulto responsable.
            </p>
          </section>

          {/* SECCIÓN 6: CAMBIOS */}
          <section className="mb-10 border-t pt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              6. Modificación de la Política de Privacidad
            </h2>
            <p className="text-gray-700 leading-relaxed">
              La titular se reserva el derecho de modificar la presente política para adaptarla a
              novedades legislativas o jurisprudenciales. En dichos supuestos, se anunciarán en esta
              página los cambios introducidos con razonable antelación a su puesta en práctica.
            </p>
          </section>

          <p className="text-sm text-gray-400 text-center mt-12 italic">
            Última actualización:{' '}
            {new Date().toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </article>
      </main>

      <Footer />
      <CookiesBanner />
    </div>
  );
}
