import { createBrowserClient } from '@supabase/ssr';

export type TipoRol = 'PROFESOR_PT' | 'ALUMNO';

export interface SesionUsuario {
  id: string;
  email: string;
  nombre: string;
  rol: TipoRol;
  idiomaPreferido: string;
  profesorId: string | null;
}

export interface RespuestaAuth {
  usuario?: SesionUsuario;
  error?: string;
}

let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null;

export const supabase = (() => {
  if (!supabaseInstance) {
    supabaseInstance = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return supabaseInstance;
})();
