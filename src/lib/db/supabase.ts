import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Faltan variables de entorno de Supabase. Configura NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      idiomas: {
        Row: {
          id: number;
          codigo: string;
          nombre: string;
          region: "ESPANA" | "EUROPA" | "MUNDO";
          dialecto_de_id: number | null;
          creado_en: string;
          actualizado_en: string;
        };
        Insert: {
          id?: number;
          codigo: string;
          nombre: string;
          region: "ESPANA" | "EUROPA" | "MUNDO";
          dialecto_de_id?: number | null;
          creado_en?: string;
          actualizado_en?: string;
        };
        Update: {
          id?: number;
          codigo?: string;
          nombre?: string;
          region?: "ESPANA" | "EUROPA" | "MUNDO";
          dialecto_de_id?: number | null;
          creado_en?: string;
          actualizado_en?: string;
        };
      };
      usuarios: {
        Row: {
          id: string;
          email: string;
          password_hash: string;
          nombre: string;
          rol: "PROFESOR_PT" | "ALUMNO";
          idioma_preferido: string;
          profesor_id: string | null;
          creado_en: string;
          actualizado_en: string;
        };
        Insert: {
          id?: string;
          email: string;
          password_hash: string;
          nombre: string;
          rol: "PROFESOR_PT" | "ALUMNO";
          idioma_preferido?: string;
          profesor_id?: string | null;
          creado_en?: string;
          actualizado_en?: string;
        };
        Update: {
          id?: string;
          email?: string;
          password_hash?: string;
          nombre?: string;
          rol?: "PROFESOR_PT" | "ALUMNO";
          idioma_preferido?: string;
          profesor_id?: string | null;
          creado_en?: string;
          actualizado_en?: string;
        };
      };
      actividades: {
        Row: {
          id: string;
          profesor_id: string;
          titulo: string;
          tipo:
            | "CUENTO"
            | "ORDENAR_PICTOGRAMAS"
            | "RELACIONAR"
            | "COMPLETAR_GAPS"
            | "VOCABULARIO";
          tematica: string | null;
          finalidad_pedagogica: string | null;
          contenido_json: Record<string, unknown> | null;
          es_activo: boolean;
          habilitado_para: string[] | null;
          creado_en: string;
          actualizado_en: string;
        };
        Insert: {
          id?: string;
          profesor_id: string;
          titulo: string;
          tipo:
            | "CUENTO"
            | "ORDENAR_PICTOGRAMAS"
            | "RELACIONAR"
            | "COMPLETAR_GAPS"
            | "VOCABULARIO";
          tematica?: string | null;
          finalidad_pedagogica?: string | null;
          contenido_json?: Record<string, unknown> | null;
          es_activo?: boolean;
          habilitado_para?: string[] | null;
          creado_en?: string;
          actualizado_en?: string;
        };
        Update: {
          id?: string;
          profesor_id?: string;
          titulo?: string;
          tipo?:
            | "CUENTO"
            | "ORDENAR_PICTOGRAMAS"
            | "RELACIONAR"
            | "COMPLETAR_GAPS"
            | "VOCABULARIO";
          tematica?: string | null;
          finalidad_pedagogica?: string | null;
          contenido_json?: Record<string, unknown> | null;
          es_activo?: boolean;
          habilitado_para?: string[] | null;
          creado_en?: string;
          actualizado_en?: string;
        };
      };
      pictogramas: {
        Row: {
          id: string;
          actividad_id: string;
          texto_original: string;
          codigo_spc: string;
          categoria: "VERBO" | "PERSONA" | "ADJETIVO" | "OBJETO" | "OTRO";
          orden_en_cuento: number | null;
          creado_en: string;
        };
        Insert: {
          id?: string;
          actividad_id: string;
          texto_original: string;
          codigo_spc: string;
          categoria: "VERBO" | "PERSONA" | "ADJETIVO" | "OBJETO" | "OTRO";
          orden_en_cuento?: number | null;
          creado_en?: string;
        };
        Update: {
          id?: string;
          actividad_id?: string;
          texto_original?: string;
          codigo_spc?: string;
          categoria?:
            | "VERBO"
            | "PERSONA"
            | "ADJETIVO"
            | "OBJETO"
            | "OTRO";
          orden_en_cuento?: number | null;
          creado_en?: string;
        };
      };
      contenido_idioma: {
        Row: {
          id: string;
          actividad_id: string;
          idioma_id: number;
          texto_traducido: string;
          transcripcion_pictos: unknown | null;
          creado_en: string;
        };
        Insert: {
          id?: string;
          actividad_id: string;
          idioma_id: number;
          texto_traducido: string;
          transcripcion_pictos?: unknown | null;
          creado_en?: string;
        };
        Update: {
          id?: string;
          actividad_id?: string;
          idioma_id?: number;
          texto_traducido?: string;
          transcripcion_pictos?: unknown | null;
          creado_en?: string;
        };
      };
      actividad_pictograma: {
        Row: {
          id: string;
          actividad_id: string;
          pictograma_id: string;
          posicion_x: number | null;
          posicion_y: number | null;
        };
        Insert: {
          id?: string;
          actividad_id: string;
          pictograma_id: string;
          posicion_x?: number | null;
          posicion_y?: number | null;
        };
        Update: {
          id?: string;
          actividad_id?: string;
          pictograma_id?: string;
          posicion_x?: number | null;
          posicion_y?: number | null;
        };
      };
      alumno_actividad: {
        Row: {
          id: string;
          alumno_id: string;
          actividad_id: string;
          progreso: "NO_INICIADO" | "EN_PROGRESO" | "COMPLETADO";
          respuestas_json: Record<string, unknown> | null;
          completado_en: string | null;
        };
        Insert: {
          id?: string;
          alumno_id: string;
          actividad_id: string;
          progreso?: "NO_INICIADO" | "EN_PROGRESO" | "COMPLETADO";
          respuestas_json?: Record<string, unknown> | null;
          completado_en?: string | null;
        };
        Update: {
          id?: string;
          alumno_id?: string;
          actividad_id?: string;
          progreso?: "NO_INICIADO" | "EN_PROGRESO" | "COMPLETADO";
          respuestas_json?: Record<string, unknown> | null;
          completado_en?: string | null;
        };
      };
    };
  };
};
