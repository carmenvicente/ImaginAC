'use client';

import { useProfesor } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { BotonCerrarSesion } from '@/components/ui/BotonCerrarSesion';

export default function LayoutProfesor({ children }: { children: React.ReactNode }) {
  const { profesor, cargando } = useProfesor();
  const router = useRouter();

  useEffect(() => {
    if (!cargando && !profesor) {
      router.push('/login');
    }
  }, [profesor, cargando, router]);

  if (cargando && !profesor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-lg text-[var(--foreground)]">Cargando...</div>
      </div>
    );
  }

  if (!profesor) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-[var(--foreground)]">
            AdaptAC - Panel Profesor PT
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[var(--foreground)] opacity-70">{profesor.nombre}</span>
            <BotonCerrarSesion />
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
