export type CategoriaPictograma = 'VERBO' | 'PERSONA' | 'ADJETIVO' | 'OBJETO' | 'OTRO';

export interface Pictograma {
  codigoSpc: string;
  textoOriginal: string;
  categoria: CategoriaPictograma;
  orden: number;
  urlImagen: string;
}

const STOPWORDS_ES: Record<string, boolean> = {
  el: true,
  la: true,
  los: true,
  las: true,
  un: true,
  una: true,
  unos: true,
  unas: true,
  de: true,
  del: true,
  en: true,
  a: true,
  al: true,
  por: true,
  para: true,
  con: true,
  sin: true,
  sobre: true,
  entre: true,
  y: true,
  e: true,
  o: true,
  u: true,
  que: true,
  quien: true,
  cuando: true,
  donde: true,
  como: true,
  cual: true,
  cuales: true,
  es: true,
  son: true,
  está: true,
  están: true,
  ser: true,
  estar: true,
  fue: true,
  eran: true,
  se: true,
  le: true,
  les: true,
  lo: true,
  me: true,
  te: true,
  nos: true,
  mi: true,
  tu: true,
  su: true,
  este: true,
  esta: true,
  estos: true,
  estas: true,
  ese: true,
  esa: true,
  esos: true,
  esas: true,
  otro: true,
  otra: true,
  otros: true,
  otras: true,
  muy: true,
  más: true,
  menos: true,
  tan: true,
  tanto: true,
  ya: true,
  aún: true,
  no: true,
  sí: true,
  pero: true,
  aunque: true,
  porque: true,
  si: true,
  bien: true,
  mal: true,
  aquí: true,
  ahí: true,
  allá: true,
  hoy: true,
  ayer: true,
  mañana: true,
  ahora: true,
  después: true,
  antes: true,
  luego: true,
  siempre: true,
  nunca: true,
  había: true,
  hay: true,
  ha: true,
  han: true,
  tenido: true,
  hacer: true,
  hizo: true,
  hecho: true,
  podido: true,
  quiero: true,
  quiere: true,
  quieren: true,
  tengo: true,
  tiene: true,
  tienen: true,
};

const VERBOS_COMUNES = [
  'correr',
  'saltar',
  'comer',
  'beber',
  'dormir',
  'despertar',
  'hablar',
  'escuchar',
  'ver',
  'mirar',
  'oir',
  'oler',
  'gustar',
  'querer',
  'necesitar',
  'poder',
  'tener',
  'ser',
  'estar',
  'ir',
  'venir',
  'llorar',
  'reir',
  'jugar',
  'abrazar',
  'besar',
  'ayudar',
  'dar',
  'recibir',
  'traer',
  'llevar',
  'coger',
  'soltar',
  'abrir',
  'cerrar',
  'entrar',
  'salir',
  'subir',
  'bajar',
  'caer',
  'levantar',
  'sentir',
  'pensar',
  'saber',
  'conocer',
  'aprender',
  'enseñar',
  'crear',
  'destruir',
  'construir',
  'pintar',
  'dibujar',
  'escribir',
  'leer',
  'contar',
  'cantar',
  'bailar',
];

const CATEGORIA_POR_PALABRA: Record<string, CategoriaPictograma> = {
  mama: 'PERSONA',
  papa: 'PERSONA',
  padre: 'PERSONA',
  madre: 'PERSONA',
  abuela: 'PERSONA',
  abuelo: 'PERSONA',
  hermano: 'PERSONA',
  hermana: 'PERSONA',
  amigo: 'PERSONA',
  amiga: 'PERSONA',
  niño: 'PERSONA',
  niña: 'PERSONA',
  nene: 'PERSONA',
  nena: 'PERSONA',
  perro: 'OBJETO',
  gato: 'OBJETO',
  casa: 'OBJETO',
  mesa: 'OBJETO',
  silla: 'OBJETO',
  libro: 'OBJETO',
  colores: 'OBJETO',
  agua: 'OBJETO',
  comida: 'OBJETO',
  feliz: 'ADJETIVO',
  triste: 'ADJETIVO',
  grande: 'ADJETIVO',
  pequeño: 'ADJETIVO',
  bonito: 'ADJETIVO',
  feo: 'ADJETIVO',
  bueno: 'ADJETIVO',
  malo: 'ADJETIVO',
  nuevo: 'ADJETIVO',
  viejo: 'ADJETIVO',
  correr: 'VERBO',
  saltar: 'VERBO',
  comer: 'VERBO',
  beber: 'VERBO',
  dormir: 'VERBO',
  jugar: 'VERBO',
  hablar: 'VERBO',
  mirar: 'VERBO',
  ver: 'VERBO',
  querer: 'VERBO',
  dar: 'VERBO',
};

function detectarCategoria(palabra: string): CategoriaPictograma {
  const palabraLower = palabra
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  if (CATEGORIA_POR_PALABRA[palabraLower]) {
    return CATEGORIA_POR_PALABRA[palabraLower];
  }

  for (const verbo of VERBOS_COMUNES) {
    if (palabraLower.includes(verbo)) {
      return 'VERBO';
    }
  }

  const terminadoEn = palabraLower.slice(-2);
  if (
    terminadoEn === 'do' ||
    terminadoEn === 'da' ||
    terminadoEn === 'to' ||
    terminadoEn === 'ta'
  ) {
    return 'ADJETIVO';
  }

  return 'OTRO';
}

function tokenizarTexto(texto: string): string[] {
  const palabras = texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\s]/gu, ' ')
    .split(/\s+/)
    .filter((p) => p.length > 2 && !STOPWORDS_ES[p]);

  return [...new Set(palabras)];
}

function generarCodigoSpc(palabra: string): string {
  const hash = palabra
    .split('')
    .reduce((acc, char) => ((acc << 5) - acc + char.charCodeAt(0)) | 0, 0);
  const numero = Math.abs(hash) % 9999;
  return `M${String(numero).padStart(4, '0')}`;
}

async function generarUrlArasaac(palabra: string): Promise<string> {
  // 1. Limpiamos la palabra (quitar espacios, pasar a minúsculas)
  const termino = palabra.toLowerCase().trim();

  try {
    // 2. LLAMADA A LA API: Buscamos el término en la base de datos de ARASAAC
    const respuesta = await fetch(
      `https://api.arasaac.org/api/pictograms/es/search/${encodeURIComponent(termino)}`
    );

    if (!respuesta.ok) return '';

    const datos = await respuesta.json();

    // 3. VALIDACIÓN: ARASAAC devuelve una lista de posibles pictogramas
    if (Array.isArray(datos) && datos.length > 0) {
      // Cogemos el ID del primer resultado (el más exacto)
      const idPictograma = datos[0]._id;

      // 4. RETORNO: Construimos la URL final usando el ID real
      // Esta URL es la que el navegador usará para descargar la imagen .png
      return `https://static.arasaac.org/pictograms/${idPictograma}/${idPictograma}_300.png`;
    }

    return ''; // Si no hay resultados para esa palabra
  } catch (error) {
    console.error('Error al conectar con ARASAAC:', error);
    return '';
  }
}

export async function transcribirAPictogramas(
  texto: string,
  idioma: string
): Promise<Pictograma[]> {
  const palabras = tokenizarTexto(texto);

  const pictogramas = await Promise.all(
    palabras.map(async (palabra, indice) => ({
      codigoSpc: generarCodigoSpc(palabra),
      textoOriginal: palabra,
      categoria: detectarCategoria(palabra),
      orden: indice,
      urlImagen: await generarUrlArasaac(palabra),
    }))
  );

  return pictogramas;
}

export function categorizarPictogramas(
  pictogramas: Pictograma[]
): Record<CategoriaPictograma, Pictograma[]> {
  return {
    VERBO: pictogramas.filter((p) => p.categoria === 'VERBO'),
    PERSONA: pictogramas.filter((p) => p.categoria === 'PERSONA'),
    ADJETIVO: pictogramas.filter((p) => p.categoria === 'ADJETIVO'),
    OBJETO: pictogramas.filter((p) => p.categoria === 'OBJETO'),
    OTRO: pictogramas.filter((p) => p.categoria === 'OTRO'),
  };
}

export const COLORES_CATEGORIA: Record<CategoriaPictograma, string> = {
  VERBO: 'var(--verbos)',
  PERSONA: 'var(--personas)',
  ADJETIVO: 'var(--adjetivos)',
  OBJETO: 'var(--objetos)',
  OTRO: 'var(--marca)',
};
