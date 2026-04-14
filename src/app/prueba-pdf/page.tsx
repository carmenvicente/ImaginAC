'use client';

import { useRef } from 'react';
import { useEasyPdf } from '@easypdf/react';

export default function PruebaEasyPDF() {
  const containerRef = useRef<HTMLDivElement>(null!);

  const { downloadPDF } = useEasyPdf({
    pageSize: 'A4',
    filename: 'prueba.pdf',
    styles: {
      backgroundColor: '#d4feff',
      defaultFontFamily: 'Arial, sans-serif',
      defaultFontSize: 14,
    },
    container: {
      style: {
        width: '800px',
        margin: '0 auto',
        padding: '20px',
      },
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Prueba EasyPDF</h1>
        
        <button
          onClick={() => downloadPDF(containerRef)}
          className="mb-6 px-6 py-3 bg-green-500 text-white rounded-lg mx-auto block hover:bg-green-600"
        >
          Descargar PDF
        </button>

        <div
          ref={containerRef}
          style={{
            backgroundColor: '#d4feff',
            padding: '40px',
            borderRadius: '12px',
          }}
        >
          <h1 style={{ color: '#F4A460', fontSize: '32px', fontWeight: 'bold', textAlign: 'center' }}>
            Prueba de PDF
          </h1>
          <p style={{ color: '#333', fontSize: '16px', marginTop: '20px' }}>
            Este es un PDF de prueba generado con @easypdf/react.
          </p>
          <p style={{ color: '#666', fontSize: '14px', marginTop: '10px' }}>
            Si puedes ver esto, el entorno funciona correctamente.
          </p>
        </div>
      </div>
    </div>
  );
}
