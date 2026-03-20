export default function PaginaAlumno() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[var(--foreground)]">
        Bienvenido a tu Panel
      </h2>
      <p className="text-[var(--foreground)] opacity-70">
        Aquí encontrarás tus cuentos y actividades.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl">
          <h3 className="font-bold text-lg mb-2 text-[var(--foreground)]">
            Mis Cuentos
          </h3>
          <p className="text-sm text-[var(--foreground)] opacity-70 mb-4">
            Accede a los cuentos que tu profesor te ha preparado
          </p>
          <button className="w-full py-2 bg-[var(--marca)] text-white rounded-lg hover:bg-[var(--marca-hover)] transition-colors">
            Ver Cuentos
          </button>
        </div>
        <div className="bg-white p-6 rounded-2xl">
          <h3 className="font-bold text-lg mb-2 text-[var(--foreground)]">
            Mis Actividades
          </h3>
          <p className="text-sm text-[var(--foreground)] opacity-70 mb-4">
            Completa las actividades que tienes pendientes
          </p>
          <button className="w-full py-2 bg-gray-100 text-[var(--foreground)] rounded-lg hover:bg-gray-200 transition-colors">
            Ver Actividades
          </button>
        </div>
        <div className="bg-white p-6 rounded-2xl">
          <h3 className="font-bold text-lg mb-2 text-[var(--foreground)]">
            Progreso
          </h3>
          <p className="text-sm text-[var(--foreground)] opacity-70 mb-4">
            Consulta cuánto has avanzado
          </p>
          <button className="w-full py-2 bg-gray-100 text-[var(--foreground)] rounded-lg hover:bg-gray-200 transition-colors">
            Ver Progreso
          </button>
        </div>
      </div>
    </div>
  );
}
