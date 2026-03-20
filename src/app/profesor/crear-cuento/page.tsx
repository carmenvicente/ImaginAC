'use client';

import { FormularioCrearCuento } from '@/components/profesor/FormularioCrearCuento';
import { useProfesor } from '@/lib/auth';
import Link from 'next/link';

export default function PaginaCrearCuento() {
  const { profesor } = useProfesor();

  if (!profesor) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Botón de volver que has rescatado */}
      <div className="mb-6">
        <Link
          href="/profesor"
          className="text-[var(--marca)] hover:underline flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver al panel
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Crear Nuevo Cuento</h2>
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <FormularioCrearCuento profesorId={profesor.id} />
      </div>
    </div>
  );
}
