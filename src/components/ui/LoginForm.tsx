'use client';

import { useState, useRef } from 'react';
import { supabase } from '@/lib/auth';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    console.log('[LOGIN] Formulario interceptado, iniciando login...');

    if (isLoading) {
      console.log('[LOGIN] Ya está cargando, ignorando...');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      console.log('[LOGIN] 1. Llamando a supabase.auth.signInWithPassword...');
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('[LOGIN] 2. Respuesta de auth recibida:', !!data.user, authError?.message);

      if (authError) {
        console.log('[LOGIN] ❌ Error de auth:', authError.message);
        setError(authError.message);
        setIsLoading(false);
        return;
      }

      if (!data.user) {
        console.log('[LOGIN] ❌ No hay usuario');
        setError('Error desconocido');
        setIsLoading(false);
        return;
      }

      console.log('[LOGIN] 3. Usuario:', data.user.id);
      console.log('[LOGIN] 4. Obteniendo perfil...');

      const { data: perfil, error: perfilError } = await supabase
        .from('usuarios')
        .select('rol')
        .eq('id', data.user.id)
        .single();

      console.log('[LOGIN] 5. Perfil:', perfil?.rol, perfilError?.message);

      if (perfilError || !perfil) {
        console.log('[LOGIN] ❌ Error de perfil');
        setError('Error al obtener perfil');
        setIsLoading(false);
        return;
      }

      console.log(
        '[LOGIN] 6. Redirigiendo a:',
        perfil.rol === 'PROFESOR_PT' ? '/profesor' : '/alumno'
      );

      if (perfil.rol === 'PROFESOR_PT') {
        console.log('Cookies actuales:', document.cookie);
        window.location.href = '/profesor';
      } else {
        window.location.href = '/alumno';
      }
    } catch (err) {
      console.error('[LOGIN] ❌ Error catch:', err);
      setError('Error inesperado');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl">
        <h1 className="text-3xl font-bold text-center mb-2 text-[var(--foreground)]">AdaptAC</h1>
        <p className="text-center text-[var(--foreground)] opacity-70 mb-8">
          Accesibilidad Cognitiva
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

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
              placeholder="Tu contraseña"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[var(--marca)] text-white font-medium rounded-lg hover:bg-[var(--marca-hover)] transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--foreground)] opacity-70">
          ¿No tienes cuenta?{' '}
          <a href="/registro" className="text-[var(--marca)] hover:underline font-medium">
            Regístrate como profesor
          </a>
        </p>
      </div>
    </div>
  );
}
