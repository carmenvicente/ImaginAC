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
      const titleX = (pageWidth - titleWidth) / 2;

      // Efecto Negrita (Triple escritura)
      doc.text(titleText, titleX, 80);
      doc.text(titleText, titleX + 0.5, 80);
      doc.text(titleText, titleX + 1, 80);

      // --- BLOQUE DE CAJAS (LADO DERECHO) ---
      const rightX = 360;
      const boxWidth = pageWidth - rightX - 40;
      const boxRadius = 10;
      const boxCenterX = rightX + boxWidth / 2;

      // --- CAJA 1: FINALIDAD ---
      const box1Y = 120;
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(230, 230, 230);
      doc.setLineWidth(1);
      doc.roundedRect(rightX, box1Y, boxWidth, 75, boxRadius, boxRadius, 'FD');

      doc.setFontSize(16);
      doc.setTextColor(100, 100, 100);
      doc.text('Cuento que nos habla sobre:', boxCenterX, box1Y + 25, { align: 'center' });

      doc.setFontSize(18);
      doc.setTextColor(31, 41, 55);
      const finalidadTexto = finalidad || 'las emociones y su gestión';
      const finalidadLines = doc.splitTextToSize(finalidadTexto, boxWidth - 20);
      doc.text(finalidadLines.slice(0, 2), boxCenterX, box1Y + 50, { align: 'center' });
      doc.text(finalidadLines.slice(0, 2), boxCenterX + 0.3, box1Y + 50, { align: 'center' });

      // --- CAJA 2: AUTORÍA ---
      const box2Y = 210;
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(rightX, box2Y, boxWidth, 55, boxRadius, boxRadius, 'FD');
      doc.setFontSize(18);
      doc.setTextColor(55, 65, 81);
      const autorText = 'Creado por Carmen Vicente Crespo';
      doc.text(autorText, boxCenterX, box2Y + 35, { align: 'center' });
      doc.text(autorText, boxCenterX + 0.3, box2Y + 35, { align: 'center' });

      // --- CAJA 3: CRÉDITOS Y ORIGEN ---
      const box3Y = 280;
      doc.setFillColor(255, 255, 255);
      doc.setGState(doc.GState({ opacity: 0.8 }));
      doc.roundedRect(rightX, box3Y, boxWidth, 100, boxRadius, boxRadius, 'FD');
      doc.setGState(doc.GState({ opacity: 1 }));

      doc.setFontSize(14);
      doc.setTextColor(80, 80, 80);
      const txtAutor = 'Autor pictogramas: Sergio Palao';
      doc.text(txtAutor, boxCenterX, box3Y + 30, { align: 'center' });
      doc.text(txtAutor, boxCenterX + 0.2, box3Y + 30, { align: 'center' });

      const labelOrigen = 'Origen: ';
      const linkArasaac = 'ARASAAC (http://arasaac.org)';
      const widthLabel = doc.getTextWidth(labelOrigen);
      const widthLink = doc.getTextWidth(linkArasaac);
      const totalWidth = widthLabel + widthLink;
      const startTextX = boxCenterX - totalWidth / 2;

      doc.setTextColor(80, 80, 80);
      doc.text(labelOrigen, startTextX, box3Y + 55);
      doc.setTextColor(244, 164, 96);
      doc.text(linkArasaac, startTextX + widthLabel, box3Y + 55);

      doc.setTextColor(80, 80, 80);
      doc.text('Licencia: CC (BY-NC-SA)', boxCenterX, box3Y + 80, { align: 'center' });

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

        // --- TÍTULO (PÁGINA 2) ---
        doc.setFont('Escolar');
        doc.setFontSize(38);
        doc.setTextColor(244, 164, 96);

        const titleLines = doc.splitTextToSize(titulo, pageWidth2 - 100);
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
              yPos = 60;
            }

            doc.text(linea, margin, yPos);
            doc.text(linea, margin + 0.2, yPos);
            yPos += lineHeight;
          }
          yPos += lineHeight; // Espacio entre párrafos
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
