'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from './cliente';
import type { SesionUsuario } from './cliente';

interface UsoSesionRetorno {
  sesion: SesionUsuario | null;
  cargando: boolean;
  error: string | null;
  cerrarSesion: () => Promise<void>;
  actualizarSesion: () => Promise<void>;
}

export function useSesion(): UsoSesionRetorno {
  const [sesion, setSesion] = useState<SesionUsuario | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const obtenerSesion = useCallback(async () => {
    try {
      setCargando(true);
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error('[useSesion] ❌ Error de sesión:', sessionError.message);
        setError(sessionError.message);
        setCargando(false);
        return;
      }

      if (session?.user) {
        const { data: perfil, error: perfilError } = await supabase
          .from('usuarios')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (perfilError) {
          console.error('[useSesion] ❌ Error al obtener perfil:', perfilError.message);
          setError(perfilError.message);
          setCargando(false);
          return;
        }

        if (perfil) {
          const perfilAny = perfil as Record<string, unknown>;
          setSesion({
            id: perfilAny.id as string,
            email: perfilAny.email as string,
            nombre: perfilAny.nombre as string,
            rol: perfilAny.rol as 'PROFESOR_PT' | 'ALUMNO',
            idiomaPreferido: perfilAny.idioma_preferido as string,
            profesorId: perfilAny.profesor_id as string | null,
          });
        } else {
          setSesion(null);
        }
      } else {
        setSesion(null);
      }
    } catch (err) {
      console.error('[useSesion] ❌ Error catch:', err);
      setError('Error al obtener la sesión');
    } finally {
      setCargando(false);
    }
  }, []);

  const cerrarSesion = useCallback(async () => {
    await supabase.auth.signOut();
    setSesion(null);
    window.location.href = '/login';
  }, []);

  useEffect(() => {
    obtenerSesion();

    // AQUÍ ESTÁ LA MAGIA: Le pedimos a Supabase el "event" exacto
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: string) => {
      // Solo actualizamos si es un inicio, cierre o actualización manual
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED') {
        obtenerSesion();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [obtenerSesion]);

  return { sesion, cargando, error, cerrarSesion, actualizarSesion: obtenerSesion };
}

export function useProfesor() {
  const { sesion, cargando, error, cerrarSesion, actualizarSesion } = useSesion();

  return {
    profesor: sesion?.rol === 'PROFESOR_PT' ? sesion : null,
    esProfesor: sesion?.rol === 'PROFESOR_PT',
    cargando,
    error,
    cerrarSesion,
    actualizarSesion,
  };
}

export function useAlumno() {
  const { sesion, cargando, error, cerrarSesion, actualizarSesion } = useSesion();

  return {
    alumno: sesion?.rol === 'ALUMNO' ? sesion : null,
    esAlumno: sesion?.rol === 'ALUMNO',
    cargando,
    error,
    cerrarSesion,
    actualizarSesion,
  };
}
