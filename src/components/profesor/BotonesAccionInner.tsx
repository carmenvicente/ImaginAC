'use client';

import { useState, useCallback } from 'react';

interface BotonesAccionInnerProps {
  totalSlides: number;
  titulo: string;
  finalidad?: string;
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

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      doc.setFillColor(212, 254, 255);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');

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

      const titleText = titulo;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(42);
      doc.setTextColor(244, 164, 96);

      const titleWidth = doc.getTextWidth(titleText);
      const titleX = (pageWidth - titleWidth) / 2;
      doc.text(titleText, titleX, 80);

      const rightX = 360;
      const boxWidth = pageWidth - rightX - 40;
      const boxRadius = 8;

      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.5);
      doc.roundedRect(rightX, 120, boxWidth, 70, boxRadius, boxRadius, 'FD');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(14);
      doc.setTextColor(75, 85, 99);
      doc.text('Cuento que nos habla sobre:', rightX + 10, 138);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(31, 41, 55);
      const finalidadTexto = finalidad || 'las emociones y su gestión';
      const finalidadLines = doc.splitTextToSize(finalidadTexto, boxWidth - 20);
      doc.text(finalidadLines.slice(0, 2), rightX + 10, 158);

      const box2Y = 205;
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(200, 200, 200);
      doc.roundedRect(rightX, box2Y, boxWidth, 50, boxRadius, boxRadius, 'FD');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(55, 65, 81);
      const autorText = 'Creado por Carmen Vicente Crespo';
      const autorWidth = doc.getTextWidth(autorText);
      doc.text(autorText, rightX + (boxWidth - autorWidth) / 2, box2Y + 30);

      const box3Y = 270;
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(200, 200, 200);
      doc.setGState(doc.GState({ opacity: 0.6 }));
      doc.roundedRect(rightX, box3Y, boxWidth, 115, boxRadius, boxRadius, 'FD');
      doc.setGState(doc.GState({ opacity: 1 }));

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.setTextColor(55, 65, 81);
      doc.text('Autor pictogramas: Sergio Palao', rightX + 15, box3Y + 25);
      doc.text('Origen: ARASAAC (http://arasaac.org)', rightX + 15, box3Y + 50);
      doc.text('Licencia: CC (BY-NC-SA)', rightX + 15, box3Y + 75);

      const nombreLimpio = limpiarNombreArchivo(titulo);
      const nombreArchivo = `ImaginAC - ${nombreLimpio}.pdf`;
      console.log('[PDF] Guardando:', nombreArchivo);
      doc.save(nombreArchivo);

      console.log('[PDF] PDF generado correctamente');
    } catch (error) {
      console.error('[PDF] Error al generar PDF:', error);
      alert('Error al generar el PDF. Inténtalo de nuevo.');
    } finally {
      setGenerandoPDF(false);
    }
  }, [generandoPDF, titulo, finalidad]);

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
