"use client";

import { useState } from "react";
import { supabase } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function RegistroForm() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmarPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setCargando(true);

    try {
      const { data: authData, error: authError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (authError) {
        setError(authError.message);
        setCargando(false);
        return;
      }

      if (authData.user) {
        const { error: dbError } = await supabase
          .from("usuarios")
          .insert({
            id: authData.user.id,
            email,
            password_hash: "auth-managed",
            nombre,
            rol: "PROFESOR_PT",
            idioma_preferido: "ES",
          });

        if (dbError) {
          setError("Error al crear el perfil. Por favor, contacta con soporte.");
          setCargando(false);
          return;
        }

        router.push("/profesor");
      }
    } catch {
      setError("Ha ocurrido un error inesperado");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl">
        <h1 className="text-3xl font-bold text-center mb-2 text-[var(--foreground)]">
          Registro - Profesor PT
        </h1>
        <p className="text-center text-[var(--foreground)] opacity-70 mb-8">
          Crea tu cuenta de profesor
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-[var(--foreground)] mb-1"
            >
              Nombre completo
            </label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--marca)] focus:border-transparent"
              placeholder="María García López"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--foreground)] mb-1"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--marca)] focus:border-transparent"
              placeholder="profesor@colegio.es"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--foreground)] mb-1"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--marca)] focus:border-transparent"
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmarPassword"
              className="block text-sm font-medium text-[var(--foreground)] mb-1"
            >
              Confirmar contraseña
            </label>
            <input
              id="confirmarPassword"
              type="password"
              value={confirmarPassword}
              onChange={(e) => setConfirmarPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--marca)] focus:border-transparent"
              placeholder="Repite tu contraseña"
              required
            />
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="w-full py-3 bg-[var(--marca)] text-white font-medium rounded-lg hover:bg-[var(--marca-hover)] transition-colors disabled:opacity-50"
          >
            {cargando ? "Creando cuenta..." : "Crear Cuenta"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--foreground)] opacity-70">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/login"
            className="text-[var(--marca)] hover:underline font-medium"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
