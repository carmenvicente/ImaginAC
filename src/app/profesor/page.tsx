'use client';

import Link from 'next/link';

export default function PaginaProfesor() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[var(--foreground)]">
        Bienvenido al Panel del Profesor
      </h2>
      <p className="text-[var(--foreground)] opacity-70">
        Aquí podrás crear cuentos y actividades para tus alumnos.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/profesor/crear-cuento"
          className="bg-white p-6 rounded-2xl hover:shadow-md transition-shadow block"
        >
          <h3 className="font-bold text-lg mb-2 text-[var(--foreground)]">Crear Cuento</h3>
          <p className="text-sm text-[var(--foreground)] opacity-70 mb-4">
            Genera un nuevo cuento con pictogramas SPC
          </p>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--marca)] text-white rounded-lg hover:bg-[var(--marca-hover)] transition-colors">
            Nuevo Cuento
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </span>
        </Link>
        <div className="bg-white p-6 rounded-2xl">
          <h3 className="font-bold text-lg mb-2 text-[var(--foreground)]">Gestionar Alumnos</h3>
          <p className="text-sm text-[var(--foreground)] opacity-70 mb-4">
            Administra los alumnos y sus actividades
          </p>
          <button className="w-full py-2 bg-gray-100 text-[var(--foreground)] rounded-lg hover:bg-gray-200 transition-colors">
            Ver Alumnos
          </button>
        </div>
        <div className="bg-white p-6 rounded-2xl">
          <h3 className="font-bold text-lg mb-2 text-[var(--foreground)]">Mis Actividades</h3>
          <p className="text-sm text-[var(--foreground)] opacity-70 mb-4">
            Consulta y edita tus actividades creadas
          </p>
          <button className="w-full py-2 bg-gray-100 text-[var(--foreground)] rounded-lg hover:bg-gray-200 transition-colors">
            Ver Todas
          </button>
        </div>
      </div>
    </div>
  );
}
