import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">
            AdaptAC
          </h1>
          <p className="text-xl text-[var(--foreground)] opacity-70 mb-8">
            Accesibilidad Cognitiva para Profesores PT y Alumnos
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/login"
              className="px-6 py-3 bg-[var(--marca)] text-white font-medium rounded-lg hover:bg-[var(--marca-hover)] transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/registro"
              className="px-6 py-3 bg-white text-[var(--foreground)] font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-[var(--foreground)] opacity-50">
        Plataforma de accesibilidad cognitiva
      </footer>
    </div>
  );
}
