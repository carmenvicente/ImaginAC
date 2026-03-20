"use client";

import { useProfesor } from "@/lib/auth";

export function BotonCerrarSesion() {
  const { cerrarSesion } = useProfesor();

  return (
    <button
      onClick={cerrarSesion}
      className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
    >
      Cerrar Sesión
    </button>
  );
}
