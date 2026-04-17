'use client';

import { useState, useCallback } from 'react';
import { FONT_CUENTO_BASE64 } from '@/../public/fonts/Escolar_G';

interface BotonesAccionInnerProps {
  totalSlides: number;
  titulo: string;
  finalidad?: string;
  historia?: string;
}

function limpiarNombreArchivo(nombre: string): string {
  return nombre
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .trim();
}

function cargarImagen(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } else {
        reject(new Error('No se pudo crear el contexto'));
      }
    };
    img.onerror = () => reject(new Error('Error cargando imagen'));
    img.src = url;
  });
}

export function BotonesAccionInner({
  totalSlides,
  titulo,
  finalidad = '',
  historia = '',
}: BotonesAccionInnerProps) {
  const [generandoPDF, setGenerandoPDF] = useState(false);

  const handleDownloadPDF = useCallback(async () => {
    if (generandoPDF) return;

    setGenerandoPDF(true);

    try {
      const jsPDFModule = await import('jspdf');
      const jsPDF = (jsPDFModule as any).jsPDF || (jsPDFModule as any).default;

      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: 'a4',
      });

      // ============================================================
      // 1. CONFIGURACIÓN GLOBAL Y FUENTES
      // ============================================================
      doc.addFileToVFS('Escolar.ttf', FONT_CUENTO_BASE64);
      doc.addFont('Escolar.ttf', 'Escolar', 'normal');

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // ============================================================
      // 2. PÁGINA 1: PORTADA
      // ============================================================

      // --- FONDO DE PORTADA ---
      doc.setFillColor(212, 254, 255);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');

      // --- LOGO IMAGINAC (ESQUINA SUPERIOR DERECHA) ---
      // Lo ponemos aquí para que el título no se desplace
      try {
        const rutaLogo = '/logo_ImaginAC_completo.png';
        const logoData = await cargarImagen(rutaLogo);

        // 1. Creamos un objeto Image temporal para obtener las medidas reales
        const imgTemp = new Image();
        imgTemp.src = logoData;

        // Esperamos un instante a que cargue la info de la imagen
        await new Promise((resolve) => {
          imgTemp.onload = resolve;
          // Por seguridad, si tarda mucho, resolvemos igual
          setTimeout(resolve, 100);
        });

        // 2. Definimos el ANCHO que queremos (Grande, p.ej., 80 unidades)
        const anchoDeseadoPDF = 80;

        // 3. Calculamos el ALTO proporcionalmente para no "aplastarla"
        // Proporción = Alto Real / Ancho Real
        const proporcion = imgTemp.height / imgTemp.width;
        const altoProporcionalPDF = anchoDeseadoPDF * proporcion;

        // 4. Márgenes desde la esquina superior derecha
        const margenSuperior = 30;
        const margenDerecho = 30;

        // Calculamos la posición X final
        const logoX = pageWidth - anchoDeseadoPDF - margenDerecho;

        // 5. Añadimos la imagen al PDF con las medidas perfectas
        doc.setGState(doc.GState({ opacity: 0.8 })); // Opacidad sutil
        doc.addImage(logoData, 'PNG', logoX, margenSuperior, anchoDeseadoPDF, altoProporcionalPDF);
        doc.setGState(doc.GState({ opacity: 1 }));
      } catch (e) {
        console.log('No se pudo cargar o dimensionar el logo de ImaginAC');
      }

      // --- PROCESAMIENTO DE IMAGEN DE PORTADA ---
      const slideIndexEvent = new CustomEvent('set-slide-index', { detail: 0 });
      window.dispatchEvent(slideIndexEvent);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const container = document.querySelector('[data-slide-container]') as HTMLDivElement | null;
      const imgElement = container?.querySelector(
        'img[alt="Niños leyendo"]'
      ) as HTMLImageElement | null;

      let imagenCargada = false;
      if (imgElement && imgElement.src) {
        try {
          const imgData = await cargarImagen(imgElement.src);
          doc.addImage(imgData, 'PNG', 40, 120, 280, 280);
          imagenCargada = true;
        } catch (imgError) {
          console.log('[PDF] No se pudo cargar la imagen de portada');
        }
      }

      // --- TÍTULO PRINCIPAL (PORTADA) ---
      const titleText = titulo;
      doc.setFont('Escolar');
      doc.setFontSize(42);
      doc.setTextColor(244, 164, 96);

      const titleWidth = doc.getTextWidth(titleText);
      const titleX = (pageWidth - titleWidth) / 2; // Centro absoluto

      doc.text(titleText, titleX, 80);
      doc.text(titleText, titleX + 0.5, 80);
      doc.text(titleText, titleX + 1, 80);

      // --- BLOQUE DE CAJAS (LADO DERECHO) ---
      const rightX = 340;
      const boxWidth = pageWidth - rightX - 20;
      const boxRadius = 10;
      const boxCenterX = rightX + boxWidth / 2;

      // --- CAJA 1: FINALIDAD ---
      const box1Y = 120;
      const prefijo = 'Cuento que nos habla sobre: ';
      const finalidadTexto = finalidad || 'las emociones y su gestión';
      const textoCompleto = prefijo + finalidadTexto; // Unimos todo en una sola cadena

      // 1. Configuración de fuente
      doc.setFont('Escolar');
      doc.setFontSize(18);
      doc.setTextColor(31, 41, 55);

      const margenInterno = 20;
      const anchoMaxTexto = boxWidth - margenInterno * 2;

      // 2. Calculamos las líneas y la altura necesaria
      // splitTextToSize hace que el texto salte de línea automáticamente al llegar al borde
      const lineasTexto = doc.splitTextToSize(textoCompleto, anchoMaxTexto);
      const interlineado = 22;
      // Calculamos la altura de la caja: (número de líneas * interlineado) + márgenes arriba y abajo
      const box1Height = lineasTexto.length * interlineado + 5;

      // 3. Dibujamos el recuadro (Altura dinámica)
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(230, 230, 230);
      doc.setLineWidth(1);
      doc.roundedRect(rightX, box1Y, boxWidth, box1Height, boxRadius, boxRadius, 'FD');

      // 4. Escribimos el texto (Alineado a la izquierda 'left')
      // No repetimos el comando doc.text para evitar el efecto negrita
      doc.text(lineasTexto, rightX + margenInterno, box1Y + 25, {
        align: 'left',
        lineHeightFactor: 1.2,
      });

      // --- CAJA 2: AUTORÍA (COMPACTA, CENTRADA Y CON NEGRITA) ---
      const box2Y = box1Y + box1Height + 7;
      const box2Height = 35; // Altura estilizada

      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(230, 230, 230);
      doc.roundedRect(rightX, box2Y, boxWidth, box2Height, boxRadius, boxRadius, 'FD');

      doc.setFontSize(18);
      doc.setTextColor(55, 65, 81);

      const autorText = 'Creado por Carmen Vicente Crespo';

      // Calculamos el centro vertical exacto
      const yCentrado = box2Y + box2Height / 2 + 5;

      // Dibujamos el texto con efecto negrita (doble escritura)
      doc.text(autorText, boxCenterX, yCentrado, { align: 'center' });
      doc.text(autorText, boxCenterX + 0.3, yCentrado, { align: 'center' });

      // --- CAJA 3: CRÉDITOS Y ORIGEN (ESTILO EXACTO) ---
      const box3Y = box2Y + box2Height + 7;
      // Aumentamos la altura de 100 a 115 para dar más espacio al final
      const box3Height = 115;

      doc.setFillColor(255, 255, 255);
      doc.setGState(doc.GState({ opacity: 0.8 }));
      doc.roundedRect(rightX, box3Y, boxWidth, box3Height, boxRadius, boxRadius, 'FD');
      doc.setGState(doc.GState({ opacity: 1 }));

      doc.setFontSize(14);
      const colorGris = [80, 80, 80];
      const colorNaranja = [244, 164, 96];

      // --- LÍNEA 1: Autor pictogramas (Igual que antes) ---
      const t1 = 'Autor pictogramas: ';
      const t1_2 = 'Sergio Palao';
      const w1 = doc.getTextWidth(t1 + t1_2);
      let currentX = boxCenterX - w1 / 2;

      doc.setTextColor(...colorGris);
      doc.text(t1, currentX, box3Y + 25);
      doc.text(t1, currentX + 0.2, box3Y + 25); // Negrita
      doc.text(t1_2, currentX + doc.getTextWidth(t1), box3Y + 25);

      // --- LÍNEA 2: Origen (TODO EN NEGRITA Y NARANJA) ---
      const t2 = 'Origen: ';
      const t2_full = 'ARASAAC (https://arasaac.org/)';
      const w2 = doc.getTextWidth(t2 + t2_full);
      currentX = boxCenterX - w2 / 2;

      // "Origen:" en Gris y Negrita
      doc.setTextColor(...colorGris);
      doc.text(t2, currentX, box3Y + 48);
      doc.text(t2, currentX + 0.2, box3Y + 48);

      // "ARASAAC (https://arasaac.org/)" en Naranja y TODO Negrita
      doc.setTextColor(...colorNaranja);
      doc.text(t2_full, currentX + doc.getTextWidth(t2), box3Y + 48);
      doc.text(t2_full, currentX + doc.getTextWidth(t2) + 0.2, box3Y + 48); // Negrita aplicada a todo

      // --- LÍNEA 3: Licencia (Igual que antes) ---
      const t3 = 'Licencia: ';
      const t3_2 = 'CC (BY-NC-SA)';
      const w3 = doc.getTextWidth(t3 + t3_2);
      currentX = boxCenterX - w3 / 2;

      doc.setTextColor(...colorGris);
      doc.text(t3, currentX, box3Y + 71);
      doc.text(t3, currentX + 0.2, box3Y + 71); // Negrita
      doc.text(t3_2, currentX + doc.getTextWidth(t3), box3Y + 71);

      // --- LÍNEA 4: Propiedad (Igual que antes) ---
      const t4 = 'Propiedad: ';
      const t4_2 = 'Gobierno de Aragón (España)';
      const w4 = doc.getTextWidth(t4 + t4_2);
      currentX = boxCenterX - w4 / 2;

      doc.text(t4, currentX, box3Y + 94); // Ajustado a +94 para equilibrar
      doc.text(t4, currentX + 0.2, box3Y + 94); // Negrita
      doc.text(t4_2, currentX + doc.getTextWidth(t4), box3Y + 94);

      // ============================================================
      // 3. PÁGINA 2: EL CUENTO (TEXTO COMPLETO)
      // ============================================================
      if (historia) {
        doc.addPage();

        const pageWidth2 = doc.internal.pageSize.getWidth();
        const pageHeight2 = doc.internal.pageSize.getHeight();

        // --- FONDO PÁGINA 2 ---
        doc.setFillColor(237, 255, 255);
        doc.rect(0, 0, pageWidth2, pageHeight2, 'F');

        // --- LOGO IMAGINAC (MISMA LÓGICA QUE EN PORTADA) ---
        try {
          const rutaLogo = '/logo_ImaginAC_completo.png';
          const logoData = await cargarImagen(rutaLogo);
          const imgTemp = new Image();
          imgTemp.src = logoData;
          await new Promise((r) => (imgTemp.onload = r));

          const anchoLogo = 80; // Un poco más pequeño para el interior
          const altoLogo = anchoLogo * (imgTemp.height / imgTemp.width);
          const logoX = pageWidth2 - anchoLogo - 30;
          const logoY = 30;

          doc.setGState(doc.GState({ opacity: 0.8 }));
          doc.addImage(logoData, 'PNG', logoX, logoY, anchoLogo, altoLogo);
          doc.setGState(doc.GState({ opacity: 1 }));
        } catch (e) {
          console.log('Error con el logo en p2');
        }

        // --- TÍTULO (PÁGINA 2) ---
        doc.setFont('Escolar');
        doc.setFontSize(38);
        doc.setTextColor(244, 164, 96);

        // Usamos un margen de 160 (80 de cada lado) para que el título salte antes de tocar el logo
        // pero se mantenga centrado en pageWidth2 / 2
        const titleLines = doc.splitTextToSize(titulo, pageWidth2 - 160);
        const titleY = 70;

        doc.text(titleLines, pageWidth2 / 2, titleY, { align: 'center' });
        doc.text(titleLines, pageWidth2 / 2 + 0.5, titleY, { align: 'center' });
        doc.text(titleLines, pageWidth2 / 2 + 1, titleY, { align: 'center' });

        // --- PROCESAMIENTO DEL CUERPO DEL CUENTO ---
        doc.setFontSize(24);
        doc.setTextColor(55, 65, 81);

        const margin = 80;
        const maxWidth = pageWidth2 - margin * 2;
        const lineHeight = 28;
        let yPos = 130;

        const parrafos = historia.split('\n\n');

        for (const parrafo of parrafos) {
          const lineas = doc.splitTextToSize(parrafo, maxWidth);
          for (const linea of lineas) {
            // LÓGICA DE SALTO DE PÁGINA AUTOMÁTICO
            if (yPos > pageHeight2 - 50) {
              doc.addPage();
              doc.setFillColor(212, 254, 255);
              doc.rect(0, 0, pageWidth2, pageHeight2, 'F');

              // Volvemos a poner el logo en la página nueva si salta
              try {
                const logoData = await cargarImagen('/logo_ImaginAC_simple.png');
                doc.setGState(doc.GState({ opacity: 0.8 }));
                doc.addImage(logoData, 'PNG', pageWidth2 - 90, 30, 60, 60); // Ajuste rápido para el salto
                doc.setGState(doc.GState({ opacity: 1 }));
              } catch (e) {}

              yPos = 80;
            }

            doc.text(linea, margin, yPos);
            doc.text(linea, margin + 0.2, yPos);
            yPos += lineHeight;
          }
          yPos += lineHeight;
        }
      }

      // ============================================================
      // 4. GUARDADO Y FINALIZACIÓN
      // ============================================================
      const nombreLimpio = limpiarNombreArchivo(titulo);
      const nombreArchivo = `ImaginAC - ${nombreLimpio}.pdf`;
      doc.save(nombreArchivo);

      console.log('[PDF] PDF generado correctamente');
    } catch (error) {
      console.error('[PDF] Error al generar PDF:', error);
      alert('Error al generar el PDF. Inténtalo de nuevo.');
    } finally {
      setGenerandoPDF(false);
    }
  }, [generandoPDF, titulo, finalidad, historia]);

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-12 md:mt-16 px-4 pb-10">
      <button
        type="button"
        onClick={handleDownloadPDF}
        disabled={generandoPDF}
        className="w-full flex items-center justify-center gap-3 py-3 px-6 bg-[#F4A460] hover:bg-[#e09550] disabled:bg-[#d4a574] text-white font-medium rounded-xl shadow-md transition-all active:scale-[0.98] disabled:cursor-not-allowed"
      >
        {generandoPDF ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Generando PDF...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Descargar PDF
          </>
        )}
      </button>
    </div>
  );
}
