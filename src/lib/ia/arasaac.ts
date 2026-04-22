export type CategoriaPictograma = 'VERBO' | 'PERSONA' | 'ADJETIVO' | 'OBJETO' | 'OTRO';

export interface Pictograma {
  codigoSpc: string;
  textoOriginal: string;
  categoria: CategoriaPictograma;
  orden: number;
  urlImagen: string;
}

export interface Segmento {
  texto: string;
  pictograma: string;
  urlImagen?: string;
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

const IDIOMA_ARASAAC: Record<string, string> = {
  ES: 'es', EN: 'en', CA: 'ca', VA: 'val',
  GL: 'gl', EU: 'eu', FR: 'fr', DE: 'de', IT: 'it',
};

// Si el idioma principal no devuelve resultado, intentar con este fallback
const IDIOMA_FALLBACK: Record<string, string> = {
  VA: 'ca',
};

// Formas irregulares/dialectales → forma estándar que ARASAAC reconoce
const NORMALIZAR_TERMINO: Record<string, string> = {
  // Valenciano/Catalán — verbos conjugados o dialectales
  té: 'tenir', tindre: 'tenir', tinc: 'tenir', tens: 'tenir',
  és: 'ser', sóc: 'ser', ets: 'ser',
  va: 'anar', vaig: 'anar', vas: 'anar',
  fa: 'fer', faig: 'fer', fas: 'fer',
  vol: 'voler', vull: 'voler', vols: 'voler',
  pot: 'poder', puc: 'poder', pots: 'poder',
  sap: 'saber', sé: 'saber',
  veu: 'veure', veig: 'veure',
  diu: 'dir', dic: 'dir',
};

// Traducción al español para el fallback final (ARASAAC tiene la base más completa en español)
// Clave: palabra normalizada (sin acentos, minúsculas) → término en español para buscar en ARASAAC
const TRADUCCION_ESPANOL: Record<string, string> = {
  // Catalán / Valenciano — emociones y estados
  felic: 'feliz', trist: 'triste', content: 'contento', malalt: 'enfermo',
  enfadat: 'enfadado', sorpres: 'sorprendido', cansat: 'cansado', nerviós: 'nervioso',
  nerviosa: 'nerviosa', assustada: 'asustada', assustado: 'asustado',
  // Catalán / Valenciano — verbos frecuentes en cuentos
  menjar: 'comer', beure: 'beber', jugar: 'jugar', plorar: 'llorar', riure: 'reir',
  caminar: 'caminar', correr: 'correr', saltar: 'saltar', llegir: 'leer',
  escriure: 'escribir', pintar: 'pintar', cantar: 'cantar', ballar: 'bailar',
  ajudar: 'ayudar', compartir: 'compartir', escoltar: 'escuchar', abracar: 'abrazar',
  trobar: 'encontrar', portar: 'llevar', donar: 'dar', agafar: 'coger',
  obrir: 'abrir', tancar: 'cerrar', entrar: 'entrar', sortir: 'salir',
  seure: 'sentar', dormir: 'dormir', despertar: 'despertar',
  // Catalán / Valenciano — sustantivos frecuentes
  amic: 'amigo', amiga: 'amiga', nen: 'niño', nena: 'niña',
  mare: 'madre', pare: 'padre', avi: 'abuelo', avia: 'abuela',
  casa: 'casa', escola: 'escuela', parc: 'parque', bosc: 'bosque',
  arbre: 'árbol', flor: 'flor', gat: 'gato', gos: 'perro', ocell: 'pájaro',
  peix: 'pez', conill: 'conejo', cavall: 'caballo',
  // Catalán / Valenciano — adjetivos y roles frecuentes
  // (claves normalizadas: sin acentos, sin punt volat)
  gran: 'grande', petit: 'pequeño', lleig: 'feo', bo: 'bueno', dolent: 'malo',
  util: 'útil', important: 'importante', especial: 'especial',
  valent: 'valiente', intelligent: 'inteligente',
  cantaire: 'cantante', ballador: 'bailarín', corredor: 'corredor',
  mestre: 'maestro', mestra: 'maestra', metge: 'médico',
  princesa: 'princesa', princep: 'príncipe', rei: 'rey', reina: 'reina',
  // Catalán / Valenciano — verbos adicionales
  recordar: 'recordar', pensar: 'pensar', somiar: 'soñar',
  estimar: 'querer', odiar: 'odiar', tenir: 'tener', anar: 'ir',
  venir: 'venir', fer: 'hacer', dir: 'decir', veure: 'ver',
  saber: 'saber', poder: 'poder', voler: 'querer',
  // Gallego — palabras que difieren del español
  neno: 'niño', nena: 'niña', can: 'perro', gato: 'gato',
  xogar: 'jugar', comer: 'comer', correr: 'correr', chorar: 'llorar',
  feliz: 'feliz', triste: 'triste', // gallego coincide con español en muchos casos
  // Euskera — palabras básicas
  pozik: 'feliz', triste: 'triste', jan: 'comer', jolastu: 'jugar',
  etxe: 'casa', eskola: 'escuela', lagun: 'amigo', txakur: 'perro',
};

// Stopwords para el fallback de palabras individuales
const STOPWORDS_MULTIPALABRA = new Set([
  'el', 'la', 'els', 'les', 'un', 'una', 'uns', 'unes',
  'de', 'del', 'en', 'a', 'al', 'amb', 'per', 'que',
  'es', 'és', 'està', 'fan', 'son', 'és', 'no', 'i', 'o',
]);

function normalizarSinAcentos(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

async function buscarEnArasaac(termino: string, codigoLang: string): Promise<string> {
  try {
    const respuesta = await fetch(
      `https://api.arasaac.org/api/pictograms/${codigoLang}/search/${encodeURIComponent(termino)}`
    );
    if (!respuesta.ok) return '';
    const datos = await respuesta.json();
    if (Array.isArray(datos) && datos.length > 0 && datos[0]._id) {
      const id = datos[0]._id;
      return `https://static.arasaac.org/pictograms/${id}/${id}_300.png`;
    }
  } catch (error) {
    console.warn(`Error buscando "${termino}" en ${codigoLang}:`, error);
  }
  return '';
}

async function buscarConFallbacks(termino: string, codigoLang: string, fallbackLang?: string): Promise<string> {
  // 1. Eliminar punt volat catalán (·, U+00B7) antes de cualquier búsqueda
  //    "úti·l" → "útil",  "col·legi" → "collegi",  "il·lusió" → "illusió"
  const terminoSinPunt = termino.replace(/\u00B7/g, '');

  // 2. Normalizar si hay forma irregular conocida
  const terminoNorm = NORMALIZAR_TERMINO[terminoSinPunt] || terminoSinPunt;

  // 2. Buscar en idioma principal
  const url = await buscarEnArasaac(terminoNorm, codigoLang);
  if (url) return url;

  // 3. Fallback de idioma (ej: val → ca)
  if (fallbackLang) {
    const urlFallback = await buscarEnArasaac(terminoNorm, fallbackLang);
    if (urlFallback) return urlFallback;
  }

  // 4. Fallback español: término directo, luego traducción del mapa
  if (codigoLang !== 'es') {
    const urlEs = await buscarEnArasaac(terminoNorm, 'es');
    if (urlEs) return urlEs;

    const terminoEsNorm = normalizarSinAcentos(terminoNorm);
    const traduccion = TRADUCCION_ESPANOL[terminoEsNorm];
    if (traduccion) {
      const urlEsTrad = await buscarEnArasaac(traduccion, 'es');
      if (urlEsTrad) return urlEsTrad;
    }
  }

  // 5. Si el término tiene espacios, probar cada palabra con significado por separado
  const palabras = terminoNorm.split(/\s+/).filter(p => p.length > 1 && !STOPWORDS_MULTIPALABRA.has(p));
  if (palabras.length >= 1 && terminoNorm.includes(' ')) {
    for (const palabra of palabras.reverse()) { // primero las últimas (suelen ser el concepto clave)
      const urlPalabra = await buscarEnArasaac(palabra, codigoLang);
      if (urlPalabra) return urlPalabra;
      if (fallbackLang) {
        const urlPalabraFallback = await buscarEnArasaac(palabra, fallbackLang);
        if (urlPalabraFallback) return urlPalabraFallback;
      }
      if (codigoLang !== 'es') {
        const urlPalabraEs = await buscarEnArasaac(palabra, 'es');
        if (urlPalabraEs) return urlPalabraEs;
        const palabraNorm = normalizarSinAcentos(palabra);
        const trad = TRADUCCION_ESPANOL[palabraNorm];
        if (trad) {
          const urlTrad = await buscarEnArasaac(trad, 'es');
          if (urlTrad) return urlTrad;
        }
      }
    }
  }

  return '';
}

export async function generarUrlArasaac(palabra: string, idioma = 'ES'): Promise<string> {
  const codigoArasaac = IDIOMA_ARASAAC[idioma] || 'es';
  const fallback = IDIOMA_FALLBACK[idioma];
  const terminos = palabra.split('|').map((t) => t.toLowerCase().trim());

  for (const termino of terminos) {
    const url = await buscarConFallbacks(termino, codigoArasaac, fallback);
    if (url) return url;
  }

  return '';
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

export async function transcribirPalabrasConcretas(palabras: string[]): Promise<Pictograma[]> {
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
