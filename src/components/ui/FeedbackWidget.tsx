'use client';

import { useState, useCallback, useEffect } from 'react';

type FeedbackState = 'open' | 'minimized';

export function FeedbackWidget() {
  const [state, setState] = useState<FeedbackState>('open');
  const [mensaje, setMensaje] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  // --- PARCHE PARA EL ERROR DE HIDRATACIÓN ---
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  // -------------------------------------------

  const handleEnviar = useCallback(async () => {
    if (!mensaje.trim() || enviando) return;

    setEnviando(true);

    const feedbackData = {
      mensaje: mensaje.trim(),
      url: window.location.href,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar');
      }
    } catch (error) {
      console.error('[FeedbackWidget] Error:', error);
    }

    setEnviado(true);
    setMensaje('');

    setTimeout(() => {
      setEnviado(false);
      setEnviando(false);
      setState('minimized');
    }, 2000);
  }, [mensaje, enviando]);

  const handleMinimizar = useCallback(() => {
    setState('minimized');
  }, []);

  const handleAbrir = useCallback(() => {
    setState('open');
  }, []);

  // Evita el error de hidratación
  if (!mounted) return null;

  if (state === 'minimized') {
    return (
      <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40">
        <button
          onClick={handleAbrir}
          className="w-12 h-12 md:w-14 md:h-14 bg-teal-900 hover:bg-teal-800 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 border border-teal-700"
          aria-label="Abrir caja de sugerencias"
        >
          <svg
            className="w-6 h-6 md:w-7 md:h-7 text-[#40E0D0]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 w-[85vw] max-w-64">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Cabecera Azul Oscuro / Teal */}
        <div className="bg-teal-900 px-4 py-3 flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold text-sm">Caja de sugerencias</h3>
            <p className="text-[#40E0D0] text-xs mt-0.5">Envíanos tu opinión o reporta errores</p>
          </div>
          <button
            onClick={handleMinimizar}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Minimizar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Cuerpo */}
        <div className="p-3 space-y-3">
          {enviado ? (
            <div className="text-center py-2">
              <svg
                className="w-10 h-10 text-green-500 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="text-teal-900 font-medium text-sm italic">¡Gracias!</p>
            </div>
          ) : (
            <>
              <textarea
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="¿Qué mejorarías?"
                rows={2}
                className="w-full p-2 text-sm border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#40E0D0]"
              />
              <button
                onClick={handleEnviar}
                disabled={!mensaje.trim() || enviando}
                className="w-full bg-[#40E0D0] hover:bg-[#3cd5c4] disabled:bg-gray-200 disabled:text-gray-400 text-teal-900 font-bold py-2 rounded-lg text-xs transition-all"
              >
                {enviando ? 'Enviando...' : 'Enviar'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
