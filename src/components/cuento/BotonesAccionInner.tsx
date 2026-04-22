'use client';

import { useState, useCallback } from 'react';
import { FONT_CUENTO_BASE64 } from '@/../public/fonts/Escolar_G';
import { useLanguageStore, traduccionesUI } from '@/lib/stores/useLanguageStore';

interface Segmento {
  texto: string;
  pictograma: string;
  urlImagen?: string;
}

interface DiapositivaContenido {
  texto: string;
  segmentos: Segmento[];
}

interface BotonesAccionInnerProps {
  totalSlides: number;
  titulo: string;
  finalidad?: string;
  historia?: string;
  diapositivas?: DiapositivaContenido[];
}

const CHARS_FUERA_ESCOLAR = /[êâîôûàèùëïœæçÊÂÎÔÛÀÈÙËÏŒÆÇäöÄÖßãõÃÕ]/;
function fontParaTexto(texto: string): string {
  return CHARS_FUERA_ESCOLAR.test(texto) ? 'helvetica' : 'Escolar';
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
  diapositivas = [],
}: BotonesAccionInnerProps) {
  const idiomaActual = useLanguageStore((s) => s.idiomaActual);
  const tr = traduccionesUI[idiomaActual] || traduccionesUI['ES'];
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
      doc.setFont(fontParaTexto(titleText));
      doc.setFontSize(42);
      doc.setTextColor(244, 164, 96);

      const titleWidth = doc.getTextWidth(titleText);
      const titleX = (pageWidth - titleWidth) / 2; // Centro absoluto

      doc.text(titleText, titleX, 80);
      doc.text(titleText, titleX + 0.5, 80);
      doc.text(titleText, titleX + 1, 80);
      doc.setFont('Escolar'); // reset tras el título

      // --- BLOQUE DE CAJAS (LADO DERECHO) ---
      const rightX = 340;
      const boxWidth = pageWidth - rightX - 20;
      const boxRadius = 10;
      const boxCenterX = rightX + boxWidth / 2;

      // --- CAJA 1: FINALIDAD ---
      const box1Y = 120;
      const prefijo = (tr.portadaHablaSobre || 'Cuento que nos habla sobre:') + ' ';
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

      doc.setFont('Escolar');
      doc.setFontSize(18);
      doc.setTextColor(55, 65, 81);

      const autorText = (tr.portadaCreadoPor || 'Creado por') + ' Carmen Vicente Crespo';

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
      const t1 = (tr.autorPicto || 'Autor pictogramas:') + ' ';
      const t1_2 = 'Sergio Palao';
      const w1 = doc.getTextWidth(t1 + t1_2);
      let currentX = boxCenterX - w1 / 2;

      doc.setTextColor(...colorGris);
      doc.text(t1, currentX, box3Y + 25);
      doc.text(t1, currentX + 0.2, box3Y + 25); // Negrita
      doc.text(t1_2, currentX + doc.getTextWidth(t1), box3Y + 25);

      // --- LÍNEA 2: Origen (TODO EN NEGRITA Y NARANJA) ---
      const t2 = (tr.origen || 'Origen:') + ' ';
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
      const t3 = (tr.licencia || 'Licencia:') + ' ';
      const t3_2 = 'CC (BY-NC-SA)';
      const w3 = doc.getTextWidth(t3 + t3_2);
      currentX = boxCenterX - w3 / 2;

      doc.setTextColor(...colorGris);
      doc.text(t3, currentX, box3Y + 71);
      doc.text(t3, currentX + 0.2, box3Y + 71); // Negrita
      doc.text(t3_2, currentX + doc.getTextWidth(t3), box3Y + 71);

      // --- LÍNEA 4: Propiedad (Igual que antes) ---
      const t4 = (tr.propiedad || 'Propiedad:') + ' ';
      const t4_2 = tr.gobiernoAragon || 'Gobierno de Aragón (España)';
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
        doc.setFont(fontParaTexto(titulo));
        doc.setFontSize(38);
        doc.setTextColor(244, 164, 96);

        // Usamos un margen de 160 (80 de cada lado) para que el título salte antes de tocar el logo
        // pero se mantenga centrado en pageWidth2 / 2
        const titleLines = doc.splitTextToSize(titulo, pageWidth2 - 160);
        const titleY = 70;

        doc.text(titleLines, pageWidth2 / 2, titleY, { align: 'center' });
        doc.text(titleLines, pageWidth2 / 2 + 0.5, titleY, { align: 'center' });
        doc.text(titleLines, pageWidth2 / 2 + 1, titleY, { align: 'center' });
        doc.setFont('Escolar'); // reset tras el título

        // --- PROCESAMIENTO DEL CUERPO DEL CUENTO ---
        doc.setFontSize(24);
        doc.setTextColor(55, 65, 81);

        const margin = 80;
        const maxWidth = pageWidth2 - margin * 2;
        const startY = 130;
        const endY = pageHeight2 - 50;
        const alturaDisponible = endY - startY;

        // Ajuste dinámico: reducir tamaño de fuente hasta que todo quepa en una página
        let fontSize = 24;
        const parrafos = historia.split('\n\n');

        const contarLineas = (fs: number) => {
          doc.setFontSize(fs);
          let total = 0;
          for (const parrafo of parrafos) {
            total += doc.splitTextToSize(parrafo, maxWidth).length + 1;
          }
          return total;
        };

        while (fontSize > 10 && contarLineas(fontSize) * (fontSize * 1.2) > alturaDisponible) {
          fontSize -= 1;
        }

        const lineHeight = fontSize * 1.2;
        doc.setFont('Escolar');
        doc.setFontSize(fontSize);
        doc.setTextColor(55, 65, 81);
        let yPos = startY;

        for (const parrafo of parrafos) {
          const lineas = doc.splitTextToSize(parrafo, maxWidth);
          for (const linea of lineas) {
            doc.text(linea, margin, yPos);
            doc.text(linea, margin + 0.2, yPos);
            yPos += lineHeight;
          }
          yPos += lineHeight;
        }
      }

      // ============================================================
      // 4. PÁGINAS DE PICTOGRAMAS (VERSION BLINDADA)
      // ============================================================
      if (diapositivas && diapositivas.length > 0) {
        for (const diapositiva of diapositivas) {
          doc.addPage();
          const pageW = doc.internal.pageSize.getWidth();
          const pageH = doc.internal.pageSize.getHeight();

          // FONDO
          doc.setFillColor(237, 255, 255);
          doc.rect(0, 0, pageW, pageH, 'F');

          // --- LOGO --- (Mantenemos tu código del logo aquí)
          try {
            const rutaLogo = '/logo_ImaginAC_completo.png';
            const logoData = await cargarImagen(rutaLogo);
            const imgTemp = new Image();
            imgTemp.src = logoData;
            await new Promise((resolve) => {
              imgTemp.onload = resolve;
              setTimeout(resolve, 100);
            });

            const anchoLogo = 80;
            const altoLogo = anchoLogo * (imgTemp.height / imgTemp.width);
            const logoX = pageW - anchoLogo - 30;
            const logoY = 30;

            doc.setGState(doc.GState({ opacity: 0.8 }));
            doc.addImage(logoData, 'PNG', logoX, logoY, anchoLogo, altoLogo);
            doc.setGState(doc.GState({ opacity: 1 }));
          } catch (e) {
            console.log('Error con el logo en página de pictogramas');
          }

          // --- TEXTO SUPERIOR: SIEMPRE ESCOLAR ---
          doc.setFont('Escolar', 'normal');
          doc.setFontSize(26);
          doc.setTextColor(31, 41, 55);

          const margenLateral = 140;
          const maxWidthTexto = pageW - margenLateral * 2;
          const lineasTexto = doc.splitTextToSize(diapositiva.texto, maxWidthTexto);

          // Escribimos el título (asegurándonos de que Escolar esté activa)
          doc.text(lineasTexto, pageW / 2, 70, { align: 'center' });
          doc.text(lineasTexto, pageW / 2 + 0.3, 70, { align: 'center' });
          doc.text(lineasTexto, pageW / 2 + 0.6, 70, { align: 'center' });
          doc.setFont('Escolar', 'normal'); // reset tras el texto de la diapositiva

          // --- PICTOGRAMAS CON CAJAS ELÁSTICAS (ANCHO DINÁMICO) ---
          const todosSegmentos = diapositiva.segmentos;

          if (todosSegmentos.length > 0) {
            const altoCelda = 80;
            const altoTexto = 20;
            const totalAltoCaja = altoCelda + altoTexto;
            const radio = 10;
            const margenTexto = 15; // Espacio extra a los lados del texto

            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(11);

            // 1. PRIMERO CALCULAMOS EL ANCHO TOTAL DE LA TIRA
            let anchoTotalTira = 0;
            const anchosCeldas = todosSegmentos.map((seg: any) => {
              const textoMayus = (seg.texto || '').toUpperCase();
              const anchoTexto = doc.getTextWidth(textoMayus);
              return Math.max(80, anchoTexto + margenTexto);
            });

            anchoTotalTira = anchosCeldas.reduce((a, b) => a + b, 0);

            const inicioX = (pageW - anchoTotalTira) / 2;
            const inicioY = 180;

            // 2. DIBUJAMOS EL FONDO ÚNICO REDONDEADO
            doc.setFillColor(255, 255, 255);
            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(1);
            doc.roundedRect(inicioX, inicioY, anchoTotalTira, totalAltoCaja, radio, radio, 'FD');

            // Línea horizontal que separa imagen de texto
            doc.line(inicioX, inicioY + altoCelda, inicioX + anchoTotalTira, inicioY + altoCelda);

            // 3. DIBUJAMOS CADA CELDA CON SU ANCHO CALCULADO
            let xActual = inicioX;

            for (let i = 0; i < todosSegmentos.length; i++) {
              const segmento = todosSegmentos[i];
              const anchoEstaCelda = anchosCeldas[i];

              if (segmento.urlImagen) {
                // Imagen real
                try {
                  const imgData = await cargarImagen(segmento.urlImagen);
                  const sizeImg = 70;
                  const offsetX = (anchoEstaCelda - sizeImg) / 2;
                  doc.addImage(imgData, 'PNG', xActual + offsetX, inicioY + 5, sizeImg, sizeImg);
                } catch (e) {
                  console.log('Error picto');
                }
              } else {
                // Placeholder: fondo gris claro + inicial de la palabra en grande
                doc.setFillColor(240, 240, 240);
                doc.setDrawColor(200, 200, 200);
                const sizeImg = 70;
                const offsetX = (anchoEstaCelda - sizeImg) / 2;
                doc.roundedRect(xActual + offsetX, inicioY + 5, sizeImg, sizeImg, 5, 5, 'FD');

                const inicial = (segmento.texto || '?').charAt(0).toUpperCase();
                doc.setFont('Helvetica', 'bold');
                doc.setFontSize(28);
                doc.setTextColor(160, 160, 160);
                doc.text(inicial, xActual + anchoEstaCelda / 2, inicioY + 5 + sizeImg / 2 + 10, {
                  align: 'center',
                });
                doc.setFont('Helvetica', 'bold');
                doc.setFontSize(11);
              }

              // Línea vertical divisoria (solo si no es la última)
              if (i < todosSegmentos.length - 1) {
                doc.setDrawColor(0, 0, 0);
                doc.line(
                  xActual + anchoEstaCelda,
                  inicioY,
                  xActual + anchoEstaCelda,
                  inicioY + totalAltoCaja
                );
              }

              // Texto (En una sola línea, centrado en su celda elástica)
              doc.setFont('Helvetica', 'bold');
              doc.setFontSize(11);
              doc.setTextColor(31, 41, 55);
              const textoMayus = (segmento.texto || '').toUpperCase();
              doc.text(textoMayus, xActual + anchoEstaCelda / 2, inicioY + altoCelda + 14, {
                align: 'center',
              });

              // Avanzamos la X para la siguiente celda
              xActual += anchoEstaCelda;
            }
          }

          /// --- 5. PIE DE PÁGINA (FRANJA DE LICENCIA DETALLADA) ---
          const altoFranja = 50;
          const yFranja = pageH - altoFranja;

          // Dibujamos el recuadro con tu color #FAFEFF (250, 254, 255)
          doc.setFillColor(250, 254, 255);
          doc.rect(0, yFranja, pageW, altoFranja, 'F');

          // Línea divisoria superior
          doc.setLineWidth(0.5);
          doc.setDrawColor(200, 200, 200);
          doc.line(0, yFranja, pageW, yFranja);

          // Configuración base
          const fontSize = 11; // Ajustado para que quepa todo en una línea
          const yTexto = yFranja + altoFranja / 2 + 4;
          const gris = [100, 100, 100];
          const naranja = [244, 164, 96];

          // Definimos los trozos (texto, esNegrita, color)
          const partes = [
            { t: (tr.autorPicto || 'Autor pictogramas:') + ' ', b: true, c: gris },
            { t: 'Sergio Palao    ', b: false, c: gris },
            { t: (tr.origen || 'Origen:') + ' ', b: true, c: gris },
            { t: 'ARASAAC (http://www.arasaac.org) ', b: true, c: naranja },
            { t: '   ', b: false, c: gris },
            { t: (tr.licencia || 'Licencia:') + ' ', b: true, c: gris },
            { t: 'CC (BY-NC-SA)    ', b: false, c: gris },
            { t: (tr.propiedad || 'Propiedad:') + ' ', b: true, c: gris },
            { t: tr.gobiernoAragon || 'Gobierno de Aragón (España)', b: false, c: gris },
          ];

          // Calculamos el ancho total para centrarlo
          doc.setFontSize(fontSize);
          let anchoTotal = 0;
          partes.forEach((p) => {
            doc.setFont('Escolar', 'normal');
            let w = doc.getTextWidth(p.t);
            // Si es negrita falsa, el ancho es un pelín más
            anchoTotal += p.b ? w + 0.6 : w;
          });

          // Empezamos a escribir desde la X inicial calculada
          let xActual = (pageW - anchoTotal) / 2;

          partes.forEach((p) => {
            doc.setTextColor(p.c[0], p.c[1], p.c[2]);
            doc.setFont('Escolar', 'normal');

            if (p.b) {
              // TRUCO DE NEGRITA (Doble escritura)
              doc.text(p.t, xActual, yTexto);
              doc.text(p.t, xActual + 0.15, yTexto);
              doc.text(p.t, xActual + 0.3, yTexto);
              xActual += doc.getTextWidth(p.t) + 0.6;
            } else {
              doc.text(p.t, xActual, yTexto);
              xActual += doc.getTextWidth(p.t);
            }
          });
        }
      }

      // ============================================================
      // 5. GUARDADO Y FINALIZACIÓN
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
  }, [generandoPDF, titulo, finalidad, historia, diapositivas, tr]);

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
            {tr.pdfGenerando || 'Generando PDF...'}
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
            {tr.pdfDescargar || 'Descargar PDF'}
          </>
        )}
      </button>
    </div>
  );
}
