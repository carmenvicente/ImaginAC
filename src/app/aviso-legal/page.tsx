'use client';

import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { CookiesBanner } from '@/components/home/CookiesBanner';
import { useLanguageStore, traduccionesUI } from '@/lib/stores/useLanguageStore';

export default function AvisoLegal() {
  const idiomaActual = useLanguageStore((s) => s.idiomaActual);
  const t = traduccionesUI[idiomaActual] || traduccionesUI['ES'];

  // --- LÓGICA DE ENVÍO DE CORREO INTELIGENTE ---
  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = 'cvicentecrespos@gmail.com';
    const subject = 'Consulta Legal - ImaginAC';

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}`;
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = mailtoUrl;
    } else {
      window.open(gmailUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />

      <main className="flex-1 py-8 md:py-12 px-3 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto prose prose-sm sm:prose md:prose-lg">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-900 mb-6 md:mb-10 border-b pb-4">
            Aviso Legal
          </h1>
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              1. Información sobre el Titular del Sitio Web
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Este Sitio Web [introducir dominio] es titularidad de{' '}
              <strong>Carmen Vicente Crespo</strong>, con NIF <strong>04656218Y</strong>, domicilio
              en <strong>Cuenca, España</strong>, y correo electrónico de contacto
              <button
                onClick={handleEmailClick}
                className="text-teal-600 font-semibold underline mx-1 hover:text-teal-800 transition-colors"
              >
                cvicentecrespos@gmail.com
              </button>
              .
            </p>
            {/* Cláusula literal de protección total */}
            <p className="text-gray-700 leading-relaxed mb-4">
              Dentro de la expresión “Sitio Web” se comprenden -con carácter delimitativo pero no
              limitativo- los datos, textos, gráficos, imágenes, animaciones, dibujos, fotografías y
              otros incluidos en el mismo, y, en general, todas las creaciones expresadas por
              cualquier medio o soporte, tangible o intangible con independencia de que sean
              susceptibles o no de propiedad intelectual de acuerdo al Texto Refundido de la Ley de
              Propiedad Intelectual.
            </p>
          </section>
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">2. Objeto del Sitio Web</h2>
            <p className="text-gray-700 leading-relaxed">
              El Sitio Web <strong>ImaginAC</strong> es una plataforma educativa de servicios de la
              sociedad de la información, cuyo objetivo es facilitar la creación de materiales
              inclusivos mediante el uso de inteligencia artificial y sistemas aumentativos y
              alternativos de comunicación (SAAC), ofreciendo recursos y herramientas de libre
              acceso al público y a la comunidad educativa.
            </p>
          </section>
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              3. Condiciones de Acceso y Utilización del Sitio Web
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              El acceso a este Sitio Web es responsabilidad exclusiva del usuario, y supone aceptar
              y conocer las advertencias legales, condiciones y términos de uso contenidos en ella.
            </p>
            <p>
              El usuario se compromete a la correcta utilización del Sitio Web, sus contenidos y
              utilidades conforme a la ley y al presente aviso legal, quedando obligado al uso de
              todos sus contenidos para fines lícitos y no prohibidos, que no infrinjan la legalidad
              vigente y/o puedan resultar lesivos de los derechos legítimos de la titular del Sitio
              Web o de cualquier tercero, y/o que puedan causar cualquier daño o perjuicio de forma
              directa o indirecta.
            </p>{' '}
            <br />
            <p>
              Se prohíbe el uso de los contenidos del Sitio Web para promocionar, contratar o
              divulgar publicidad o información propia o de terceras personas sin la autorización
              del titular, así como remitir publicidad o información valiéndose para ello de los
              servicios o información que se ponen a disposición del usuario, independientemente de
              si la utilización es gratuita o no.
            </p>{' '}
            <br />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Obligaciones del Usuario</h3>
            <p className="text-gray-700 mb-4">El usuario del Sitio Web podrá:</p>
            <ul className="list-disc ml-6 text-gray-700 space-y-3 mb-6">
              <li>
                Acceder de forma gratuita y sin necesidad de autorización previa a los contenidos y
                servicios del sitio disponibles como tales, sin perjuicio de las condiciones
                técnicas, particulares o la necesidad del previo registro respecto de servicios y
                contenidos específicos según se determine en estas condiciones generales o en las
                condiciones particulares de dichos servicios.
              </li>
              <li>
                Utilizar los servicios y contenidos disponibles para su uso exclusivamente
                particular y educativo.
              </li>
              <li>
                Hacer un uso correcto y lícito del sitio, de conformidad con la legislación vigente,
                la moral, las buenas costumbres y el orden público.
              </li>
            </ul>
            <p className="text-gray-700 mb-4 font-medium">En ningún caso el usuario podrá:</p>
            <ul className="list-disc ml-6 text-gray-700 space-y-3 mb-6">
              <li>
                Acceder o utilizar los servicios y contenidos del sitio para la comisión de acciones
                ilícitas o contrarias a la legislación vigente, la moral, las buenas costumbres y el
                orden público, con fines lesivos de derechos y libertades de terceros, o que puedan
                perjudicar, dañar o impedir por cualquier forma, el acceso a los mismos, en
                perjuicio de la titular o de terceros.
              </li>
              <li>
                Introducir información en el Sitio Web o emplear los servicios existentes en el
                mismo con la finalidad de atentar –directa o indirectamente- contra los derechos –y
                muy especialmente los derechos fundamentales y libertades públicas- de otros
                usuarios del Sitio Web; que inciten o promuevan la realización de actos delictivos,
                xenófobos, terroristas o degradantes por razón de edad, sexo, religión o creencias;
                o de carácter pornográfico, obsceno, violento o que atenten contra la ley, la moral
                o las buenas costumbres. A estos efectos, por información se entenderá, con carácter
                delimitativo pero no limitativo: textos, gráficos, imágenes, dibujos, fotografías,
                datos, notas, y otros.
              </li>
              <li>
                Realizar cualquier acción que impida o dificulte el acceso al sitio por los
                usuarios, así como de los hipervínculos a los servicios y contenidos ofrecidos por
                la titular o por otros terceros a través del Sitio Web.
              </li>
              <li>
                Emplear cualquier tipo de virus informático, código, software, programa informático,
                equipo informático o de telecomunicaciones, que puedan provocar daños o alteraciones
                no autorizadas de los contenidos, programas o sistemas accesibles a través de los
                servicios y contenidos prestados en el Sitio Web o en los sistemas de información,
                archivos y equipos informáticos de los usuarios de los mismos; o el acceso no
                autorizado a cualesquiera contenidos y/o servicios del Sitio Web.
              </li>
              <li>
                Utilizar los servicios, total o parcialmente, para promocionar, vender, contratar,
                divulgar publicidad o información propia o de terceras personas sin autorización
                previa y por escrito de la titular.
              </li>
              <li>
                Reproducir total o parcialmente el presente Sitio Web en otros sitios web distintos;
                no podrá realizar enmarcados al presente sitio o los sitios web accesibles a través
                del mismo que oculten o modifiquen –con carácter delimitativo pero no limitativo-
                contenidos de la titular o de terceros.
              </li>
              <li>
                Crear marcos dentro de un Sitio Web de su responsabilidad o propiedad que
                reproduzcan la página principal y/o las páginas accesibles a través de la misma,
                correspondientes a este Sitio Web sin la previa autorización de la titular.
              </li>
              <li>
                Realizar cualquier acción que suponga la reproducción, distribución, copia,
                alquiler, comunicación pública, transformación o cualquier otra acción similar que
                suponga la modificación o alteración, de todo o parte de los contenidos y servicios
                del sitio o la explotación económica de los mismos, sin la autorización previa y por
                escrito de la titular o del tercero propietario de los derechos de propiedad
                intelectual e industrial que recaigan sobre los servicios o contenidos del Sitio Web
                y a salvo de lo dispuesto en estas condiciones generales o, en su caso, condiciones
                particulares que regulen el uso de un servicio y/o contenido existente en el Sitio
                Web.
              </li>
            </ul>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Derechos de la Titular</h3>
            <p className="text-gray-700 mb-4">
              La titular se reserva los siguientes derechos en relación con la gestión y
              administración del Sitio Web:
            </p>
            <ul className="list-disc ml-6 text-gray-700 space-y-3">
              <li>
                Modificar las condiciones de acceso al Sitio Web, técnicas o no, de forma unilateral
                y sin preaviso a los usuarios, sin perjuicio de lo dispuesto en las condiciones
                particulares que regulen el uso de un determinado servicio y/o contenido destinado a
                los usuarios del Sitio Web.
              </li>
              <li>
                Establecer condiciones particulares para el acceso a determinados servicios y/o
                contenidos.
              </li>
              <li>
                Limitar, excluir o condicionar el acceso de los usuarios cuando no se den todas las
                garantías de utilización correcta del sitio por los mismos conforme a las
                obligaciones y prohibiciones asumidas por los mismos.
              </li>
              <li>
                Finalizar la prestación de un servicio o suministro de un contenido, sin derecho a
                indemnización, cuando su utilización por los usuarios devenga ilícito o contrario a
                lo establecido en las condiciones que lo regulan, sin perjuicio de lo dispuesto en
                las condiciones particulares que regulen el uso de un determinado servicio y/o
                contenido destinado a los usuarios del Sitio Web.
              </li>
              <li>
                Modificar, suprimir o actualizar todo o parte de los contenidos o servicios
                ofrecidos a través del sitio, sin necesidad de preaviso, sin perjuicio de lo
                dispuesto en las condiciones particulares que regulen el uso de un determinado
                servicio y/o contenido destinado a los usuarios del Sitio Web.
              </li>
              <li>
                Exigir la indemnización que pudiera derivar por el uso indebido o ilícito de todo o
                parte de los servicios y contenidos prestados a través del sitio.
              </li>
            </ul>{' '}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600 italic">
              En el supuesto de que cualquier cláusula de estas condiciones generales de uso del
              Sitio Web o, en su caso, condiciones particulares que regulen el uso de un determinado
              servicio y/o contenido, resulte anulable o nula, en su totalidad o en parte, esta
              nulidad o anulabilidad no afectará a la validez de otras cláusulas de las mismas, las
              cuales permanecerán con plena eficacia y validez, salvo que la parte que alegue su
              nulidad o anulabilidad pruebe que sin la cláusula que resultare nula o anulable no
              podrán cumplirse los fines perseguidos por las presentes Condiciones.
            </div>
          </section>
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              4. Derechos de Propiedad Intelectual
            </h2>
            <p className="text-gray-700 leading-relaxed">
              El usuario se obliga a respetar los derechos de propiedad intelectual de la titular.
              El uso o la concesión de acceso a este Sitio Web no comportan el otorgamiento de
              derecho alguno sobre las marcas, nombres comerciales o cualquier otro signo distintivo
              que se utilicen en la misma.
            </p>{' '}
            <br />
            <p>
              Quedan prohibidas las descargas de este Sitio Web para fines comerciales, por lo que
              el usuario no podrá explotar, reproducir, distribuir, modificar, comunicar
              públicamente, ceder, transformar o usar el contenido de este Sitio Web con fines
              comerciales.
            </p>{' '}
            <br />
            <p>
              Asimismo, en virtud de lo establecido en este Aviso Legal, queda prohibida la
              reproducción total o parcial de los contenidos de este Sitio Web sin autorización
              expresa de la titular y sin que puedan entenderse cedidos al usuario por el acceso a
              la misma.
            </p>
          </section>

          <section className="mb-10 p-6 bg-teal-50 rounded-2xl border border-teal-100 shadow-sm -ml-6 w-[calc(100%+3rem)]">
            {/* El padding vertical (pt-6) se mantiene en la section, pero quitamos el horizontal */}

            <div className="text-teal-900 mt-0 mb-4">
              {' '}
              {/* Envolvemos el contenido para darle el padding horizontal */}
              <h2 className="text-xl font-bold text-teal-900 mt-0 mb-4">5. Pictogramas ARASAAC</h2>
              <p className="text-gray-800 leading-relaxed">
                Todos los pictogramas usados en este Sitio Web forman parte de la colección{' '}
                <strong>ARASAAC</strong> (
                <a
                  href="http://www.arasaac.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 underline font-medium hover:text-teal-900"
                >
                  http://www.arasaac.org
                </a>
                ), son propiedad del <strong>Gobierno de Aragón</strong> y han sido creados por{' '}
                <strong>Sergio Palao</strong>, se publican bajo Licencia Creative Commons{' '}
                <strong>BY-NC-SA</strong>, autorizándose su uso para fines sin ánimo lucrativo
                siempre que se cite la fuente, autor y se compartan bajo la misma licencia.
              </p>
            </div>
          </section>
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              6. Contenidos generados por el Usuario e Inteligencia Artificial
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              El Sitio Web utiliza la API de <strong>Google Gemini</strong> para procesar los textos
              introducidos por el usuario. El usuario se compromete a no introducir, almacenar o
              difundir contenidos que infrinjan derechos de propiedad intelectual de terceros o que
              contengan datos de carácter personal sensible.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              En este sentido, y dada la naturaleza técnica del servicio basado en Inteligencia
              Artificial (IA), resulta materialmente imposible verificar la originalidad o la
              ausencia de derechos de terceros sobre los "prompts" o instrucciones suministradas. La
              titular declina cualquier responsabilidad sobre la veracidad o similitud de los
              resultados con obras preexistentes, limitándose a proveer la herramienta tecnológica.
            </p>

            {/* Nueva cláusula adaptada de PictoTraductor sobre modificar contenido */}
            <p className="text-gray-700 leading-relaxed mb-6">
              La titular se reserva el derecho de poder modificar o adaptar los contenidos generados
              por la IA a partir de las peticiones del usuario, a fin de ajustarlos a las
              necesidades de formato editorial, accesibilidad o calidad del Sitio Web.
            </p>

            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 shadow-sm">
              <h3 className="text-lg font-semibold text-amber-900 mb-3 mt-0 text-sm uppercase tracking-wider">
                Autoría y Licencia de Uso
              </h3>
              <p className="text-gray-800 text-sm leading-relaxed mb-4">
                El usuario conserva la autoría sobre los textos originales que introduce en el Sitio
                Web. No obstante, al hacer uso del mismo, concede a la titular una
                <strong> licencia no exclusiva, gratuita y mundial</strong> para alojar, mostrar y
                compartir los materiales generados con fines exclusivamente educativos y sin ánimo
                de lucro, por el tiempo que el contenido permanezca en la plataforma.
              </p>
              <p className="text-gray-800 text-sm leading-relaxed italic">
                Esta licencia no implica cesión de derechos de explotación ni permite a la titular
                reproducir, distribuir o comunicar públicamente los contenidos del usuario fuera del
                ámbito del Sitio Web y sus fines educativos, sin autorización expresa del mismo.
              </p>
            </div>
          </section>
          {/* SECCIÓN 7: PROTECCIÓN DE DATOS */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              7. Protección de Datos de Carácter Personal
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              La titular se obliga a cumplir la legislación vigente en materia de protección de
              datos personales contenida en el <strong>Reglamento (UE) 2016/679 (RGPD)</strong> y la{' '}
              <strong>Ley Orgánica 3/2018 (LOPDGDD)</strong>, y demás normas que la complementen y
              desarrollen.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Responsable del tratamiento
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Carmen Vicente Crespo</strong> — correo electrónico:{' '}
              <button
                onClick={handleEmailClick}
                className="text-teal-600 font-semibold underline hover:text-teal-800 transition-colors"
              >
                cvicentecrespos@gmail.com
              </button>
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">Finalidad y base jurídica</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Los datos facilitados voluntariamente por el usuario se tratan con la finalidad de
              gestionar las consultas recibidas y prestar los servicios educativos ofrecidos a
              través del Sitio Web. La base jurídica del tratamiento es el{' '}
              <strong>consentimiento del usuario</strong> (art. 6.1.a RGPD), otorgado en el momento
              de hacer uso de los servicios o contactar con la titular.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Transferencia internacional de datos — Google Gemini
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Este Sitio Web utiliza la <strong>API de Google Gemini</strong> (Google LLC, con sede
              en EE.UU.) para procesar los textos introducidos por el usuario. Dicho procesamiento
              puede implicar una <strong>transferencia internacional de datos</strong> a servidores
              ubicados fuera del Espacio Económico Europeo. Google LLC ofrece garantías adecuadas
              conforme al RGPD mediante sus cláusulas contractuales tipo y su adhesión a los marcos
              de transferencia vigentes. El usuario, al usar este servicio, consiente expresamente
              dicha transferencia.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Almacenamiento de datos — Supabase
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Este Sitio Web utiliza <strong>Supabase</strong> (Supabase Inc., con sede en EE.UU.)
              como servicio de base de datos en la nube para almacenar temporalmente los contenidos
              generados a través de la plataforma, como cuentos, pictogramas y sus traducciones.
              Los datos se almacenan en servidores ubicados en la{' '}
              <strong>Unión Europea (Irlanda)</strong>, por lo que no se produce transferencia
              internacional fuera del Espacio Económico Europeo. Supabase Inc. actúa como encargado
              del tratamiento y ofrece garantías de protección de datos conforme al RGPD.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Servicio de correo electrónico — Resend
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Este Sitio Web utiliza el servicio <strong>Resend</strong> (Resend Inc., con sede en
              EE.UU.) para el envío de los mensajes de feedback que el usuario remite
              voluntariamente a través del formulario del sitio. Resend actúa como encargado del
              tratamiento y no almacena los datos de forma permanente más allá de lo estrictamente
              necesario para la entrega del correo electrónico. Dicho procesamiento puede implicar
              una <strong>transferencia internacional de datos</strong> a servidores ubicados fuera
              del Espacio Económico Europeo. Resend Inc. ofrece garantías adecuadas conforme al
              RGPD mediante sus cláusulas contractuales tipo.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">Plazo de conservación</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Los datos personales se conservarán únicamente durante el tiempo necesario para
              cumplir con la finalidad para la que fueron recabados y, en todo caso, durante los
              plazos legalmente establecidos.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">Derechos del usuario</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              El usuario podrá ejercitar en cualquier momento sus derechos de{' '}
              <strong>
                acceso, rectificación, supresión, limitación del tratamiento, portabilidad y
                oposición
              </strong>{' '}
              dirigiéndose a la titular a través del correo electrónico:{' '}
              <button
                onClick={handleEmailClick}
                className="text-teal-600 font-semibold underline hover:text-teal-800 transition-colors"
              >
                cvicentecrespos@gmail.com
              </button>
              . Asimismo, tiene derecho a presentar una reclamación ante la{' '}
              <a
                href="https://www.aepd.es"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 underline hover:text-teal-800"
              >
                Agencia Española de Protección de Datos (AEPD)
              </a>
              .
            </p>

            <p className="text-gray-700 leading-relaxed">
              El usuario que accede al Sitio Web no está obligado a proporcionar información
              personal para el uso general del mismo. Cualquier comunicación de datos se produce
              porque el usuario voluntariamente ha decidido realizar una consulta o hacer uso de los
              servicios.
            </p>
          </section>

          {/* SECCIÓN 8: COOKIES */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">8. Utilización de Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Este Sitio Web utiliza cookies y almacenamiento local propios con el fin de garantizar
              el correcto funcionamiento del sitio y recordar las preferencias del usuario. A
              continuación se detalla el tipo de almacenamiento empleado:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-teal-50 text-teal-900 font-semibold">
                  <tr>
                    <th className="px-4 py-3 text-left border-b border-gray-200">Tipo</th>
                    <th className="px-4 py-3 text-left border-b border-gray-200">Finalidad</th>
                    <th className="px-4 py-3 text-left border-b border-gray-200">Duración</th>
                    <th className="px-4 py-3 text-left border-b border-gray-200">Titular</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">Técnicas</td>
                    <td className="px-4 py-3">
                      Necesarias para el correcto funcionamiento del sitio. Incluye el registro del
                      consentimiento de cookies del usuario (<code>cookies_config_v1</code>),
                      almacenado en localStorage.
                    </td>
                    <td className="px-4 py-3">Persistente</td>
                    <td className="px-4 py-3">Propia</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">Preferencias</td>
                    <td className="px-4 py-3">
                      Recuerdan las opciones elegidas por el usuario, como el idioma seleccionado.
                      Almacenado en localStorage del navegador.
                    </td>
                    <td className="px-4 py-3">Persistente</td>
                    <td className="px-4 py-3">Propia</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">
              Las cookies <strong>técnicas</strong> no requieren consentimiento previo del usuario
              al ser estrictamente necesarias para la prestación del servicio. El resto de cookies
              solo se activarán si el usuario otorga su consentimiento a través del banner de
              configuración presente en el Sitio Web.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              El usuario puede en todo momento <strong>retirar su consentimiento</strong>,
              configurar o deshabilitar las cookies a través de:
            </p>

            <ul className="list-disc ml-6 text-gray-700 space-y-2 mb-4">
              <li>El banner de configuración de cookies disponible en el Sitio Web.</li>
              <li>
                La configuración de su navegador (Chrome, Firefox, Safari, Edge), donde puede
                bloquear o eliminar las cookies instaladas.
              </li>
            </ul>

            <p className="text-gray-700 leading-relaxed text-sm italic">
              La desactivación de cookies técnicas puede afectar al correcto funcionamiento del
              Sitio Web.
            </p>
          </section>

          {/* SECCIÓN 9: EXENCIÓN DE RESPONSABILIDAD (AMPLIADA) */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              9. Exención y Limitación de Responsabilidad
            </h2>
            <p className="text-gray-700 mb-4">
              La titular queda exenta de cualquier tipo de responsabilidad por daños y perjuicios de
              toda naturaleza en los siguientes casos:
            </p>
            <ul className="list-disc ml-6 text-gray-700 space-y-3">
              <li>
                Por la imposibilidad o dificultades de conexión a la red a través de la que resulta
                accesible este Sitio Web, independientemente de la clase de conexión utilizada por
                el usuario.
              </li>
              <li>
                Por la interrupción, suspensión o cancelación del acceso al Sitio Web, así como por
                la disponibilidad y continuidad del funcionamiento del sitio cuando se deba a
                mantenimiento técnico o causas ajenas al control de la titular.
              </li>

              <li>
                La titular no asume ninguna responsabilidad respecto de los servicios y contenidos,
                ni por la disponibilidad y condiciones, técnicas o no, de acceso a los mismos, que
                sean ofrecidos por terceros prestadores de servicios, en especial respecto de los{' '}
                <strong>prestadores de servicios de la sociedad de la información</strong>{' '}
                (incluyendo, pero no limitado a, la API de{' '}
                <strong>Google Gemini</strong>, los servicios de base de datos de{' '}
                <strong>Supabase</strong>, el servicio de correo electrónico de{' '}
                <strong>Resend</strong> y servicios de hosting). Por prestadores de
                servicios de la sociedad de la información se entenderán aquellas personas físicas o
                jurídicas que presten los siguientes servicios al público: (i) transmisión por una
                red de comunicación de datos facilitados por el destinatario del servicio (ii)
                servicios de acceso a la citada red (iii) servicios de almacenamiento o alojamiento
                de datos (iv) suministro de contenidos o información (v) servicio de copia temporal
                de los datos solicitados por los usuarios (vi) facilitación de enlaces a contenidos
                o instrumentos de búsqueda.
              </li>

              <li>
                En ningún momento se asume responsabilidad por los daños o perjuicios que pudieran
                causar la información, contenidos, productos y servicios -con carácter delimitativo
                pero no limitativo- prestados, comunicados, alojados, transmitidos, exhibidos u
                ofertados por terceros ajenos a la titular a través de un sitio web al que pueda
                accederse mediante un enlace existente en este sitio.
              </li>
              <li>
                De la calidad y velocidad de acceso al sitio y de las condiciones técnicas que debe
                reunir el usuario con el fin de poder acceder al servicio.
              </li>
            </ul>
          </section>

          {/* SECCIÓN 10: LEGISLACIÓN Y JURISDICCIÓN */}
          <section className="mb-10 border-t pt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              10. Legislación Aplicable y Jurisdicción
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Estas Condiciones Generales de Uso del Sitio Web se rigen por la{' '}
              <strong>legislación española</strong>. Para la resolución de cualquier litigio que
              pudiera derivarse, las partes, con expresa renuncia a su propio fuero, se someten a
              los <strong>Juzgados y Tribunales de la ciudad de residencia de la titular</strong>.
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
