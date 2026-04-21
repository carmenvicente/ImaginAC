import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IDIOMAS_DISPONIBLES, type Idioma } from '@/components/ui/SelectorIdioma';

// Import all locale JSON files
import es from '@/locales/es.json';
import en from '@/locales/en.json';
import ca from '@/locales/ca.json';
import va from '@/locales/va.json';
import gl from '@/locales/gl.json';
import eu from '@/locales/eu.json';
import fr from '@/locales/fr.json';
import de from '@/locales/de.json';
import it from '@/locales/it.json';

export { IDIOMAS_DISPONIBLES };
export type { Idioma };

const LOCALSTORAGE_KEY = 'idioma_preferido';

interface LanguageState {
  idiomaActual: string;
  setIdioma: (codigo: string) => void;
  idiomaSeleccionado: Idioma;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      idiomaActual: 'ES',
      idiomaSeleccionado: IDIOMAS_DISPONIBLES[0],
      setIdioma: (codigo: string) => {
        const idioma =
          IDIOMAS_DISPONIBLES.find((i) => i.codigo === codigo) || IDIOMAS_DISPONIBLES[0];
        set({ idiomaActual: codigo, idiomaSeleccionado: idioma });
      },
    }),
    {
      name: LOCALSTORAGE_KEY,
      partialize: (state) => ({ idiomaActual: state.idiomaActual }),
    }
  )
);

export const traduccionesUI: Record<string, Record<string, string>> = {
  ES: es,
  EN: en,
  CA: ca,
  VA: va,
  GL: gl,
  EU: eu,
  FR: fr,
  DE: de,
  IT: it,
};

export function t(clave: string): string {
  const estado = useLanguageStore.getState();
  const codigo = estado.idiomaActual;
  return traduccionesUI[codigo]?.[clave] || traduccionesUI['ES'][clave] || clave;
}
