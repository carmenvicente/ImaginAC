"use client";

import { useAlumno } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LayoutAlumno({
  children,
}: {
  children: React.ReactNode;
}) {
  const { alumno, cargando, cerrarSesion } = useAlumno();
  const router = useRouter();

  useEffect(() => {
    if (!cargando && !alumno) {
      router.push("/login");
    }
  }, [alumno, cargando, router]);

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-lg text-[var(--foreground)]">Cargando...</div>
      </div>
    );
  }

  if (!alumno) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-[var(--foreground)]">
            AdaptAC - Panel de Alumno
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[var(--foreground)] opacity-70">
              {alumno.nombre}
            </span>
            <button
              onClick={cerrarSesion}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
