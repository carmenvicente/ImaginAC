interface ReglasGrounding {
  idioma: string;
  codigo: string;
  reglas: string[];
}

const REGLAS_IDIOMAS: ReglasGrounding[] = [
  {
    idioma: 'Español',
    codigo: 'ES',
    reglas: [
      'Usa ortografía estándar española.',
      'Evita calcos del catalán o gallego.',
      "Emplea correctamente la 'ñ' cuando sea necesario.",
    ],
  },
  {
    idioma: 'Catalán',
    codigo: 'CA',
    reglas: [
      "Usa la 'ç': açò, faç, dolç, braç, llengua.",
      "Usa la 'l·l' (ela geminada): llengua, col·legi, pallasso, pillat.",
      "Artículos: el/la/els/les. NUNCA uses 'el/la' en plural.",
      "Palabras con 'ny': any, bany, espanya, pitjor,inya.",
      'Usa el punto volat (·l): cantaire, útil, cotxe.',
      "Palabras con 'ig' pronunciada 'tx': maig, setge,veig.",
    ],
  },
  {
    idioma: 'Valenciano',
    codigo: 'VA',
    reglas: [
      "Usa la 'ç': açò, faç, dolç, braç.",
      "Usa la 'l·l' (ela geminada): llengua, pallasso.",
      "Artículos: el/la/els/les. NUNCA uses 'el/la' en plural.",
      "Palabras con 'ny': any, espanya,inya.",
      "Mantén el uso de 'e' final en infinitivos: cantar, perdre.",
    ],
  },
  {
    idioma: 'Gallego',
    codigo: 'GL',
    reglas: [
      "NUNCA uses la letra 'j'. Usa 'x' o 'g' suave: xente, maxistro, xoguete.",
      "NUNCA uses la letra 'y' como conjunción. Usa 'i':派的, raíña.",
      "USA 'nh' en lugar de 'ñ': niño, manlibro, viño, paxina, couna.",
      "USA 'ch': chorra, chocar, chave, choiva.",
      "Artículo: 'o/a' + plural 'os/as'. Ej: o neno, a nena, os nenos, as nenas.",
      'Palabras características: acio (hace), achegar (acercar), agochar (esconder).',
      'Evita formas del español: dixe → dixo, traxía → traía.',
    ],
  },
  {
    idioma: 'Euskera',
    codigo: 'EU',
    reglas: [
      "Usa 'k' para el sonido /k/: kale,eko, ikusi, mendi.",
      "Usa 'z' para /z/: zorte, zuhaitz, azoka.",
      "Usa 'tz' para /ts/:kotz, atzo, bitz.",
      "Usa 'tx' para /tʃ/: txakurra, etxea, katu.",
      "Usa 'xt' para /ʃ/: lauxtxo, zortzi.",
      "NO uses artículos 'el/la'. El euskera NO tiene género gramatical.",
      'Usa kasus (casos): noren (de quién), zertaz (de qué), non (dónde).',
      'Usa postposiciones: -ren, -rekin, -rako, -tik, -ra.',
      'Nombres propios vascos sin adaptar: Ane, Peru, Markel, Leire.',
    ],
  },
  {
    idioma: 'Inglés',
    codigo: 'EN',
    reglas: ['Usa inglés estándar sin spanglish.', 'Traduce todos los nombres propios.'],
  },
  {
    idioma: 'Francés',
    codigo: 'FR',
    reglas: [
      'Usa caracteres especiales: ç, é, è, ê, ë, à, â, ô, û, î, ï.',
      'El article partitif: du, de la, des.',
    ],
  },
];

function obtenerReglasPorIdioma(codigo: string): string[] {
  const idioma = REGLAS_IDIOMAS.find((r) => r.codigo === codigo);
  if (!idioma) {
    return REGLAS_IDIOMAS.find((r) => r.codigo === 'ES')!.reglas;
  }
  return idioma.reglas;
}

function formatearReglasGrounding(codigo: string): string {
  const idioma = REGLAS_IDIOMAS.find((r) => r.codigo === codigo);
  const nombreIdioma = idioma?.idioma || 'Español';
  const reglas = obtenerReglasPorIdioma(codigo);

  return `
IDIOMA: ${nombreIdioma.toUpperCase()}
REGLAS DE GROUNDING (OBLIGATORIAS):
${reglas.map((regla, i) => `${i + 1}. ${regla}`).join('\n')}
`;
}

interface DatosCuento {
  titulo: string;
  tematica: string;
  finalidadPedagogica: string;
  idioma: string;
  palabrasMax: number;
}

export function construirPromptCuento(datos: DatosCuento): string {
  const reglasGrounding = formatearReglasGrounding(datos.idioma);
  const nombreIdioma = REGLAS_IDIOMAS.find((r) => r.codigo === datos.idioma)?.idioma || 'Español';

  const nombreTematica =
    {
      animales: 'animales domésticos y salvajes',
      familia: 'la familia y las relaciones familiares',
      escuela: 'la escuela y el aprendizaje',
      emociones: 'las emociones y cómo manejarlas',
      naturaleza: 'la naturaleza y el medio ambiente',
      amistad: 'la amistad y las relaciones sociales',
      comida: 'la comida y la alimentación sana',
      casa: 'el hogar y las tareas domésticas',
      transporte: 'los medios de transporte',
      diversion: 'el juego y la diversión',
    }[datos.tematica] || datos.tematica;

  return `Eres un escritor especializado en cuentos infantiles para niños con necesidades de accesibilidad cognitiva.

ROL: Escritor de cuentos inclusivos
OBJETIVO: Crear un cuento adaptado para facilitar la comprensión y el aprendizaje

CONTEXTO:
- Temática: ${nombreTematica}
- Finalidad pedagógica: ${datos.finalidadPedagogica}
- Público objetivo: Niños con necesidades de accesibilidad cognitiva

${reglasGrounding}

ESTRUCTURA DEL CUENTO:
1. INTRODUCCIÓN (aproximadamente 10% del texto): Presenta a los personajes y el escenario.
2. NUDO/CONFLICTO (aproximadamente 60% del texto): Desarrolla una situación que genere interés y conexión emocional.
3. RESOLUCIÓN (aproximadamente 30% del texto): Ofrece una solución positiva y educativa.

REGLAS DE ESCRITURA:
- Lenguaje simple y directo, adaptado a niños.
- Oraciones cortas y claras.
- Vocabulario concreto, evita abstracciones.
- Usa nombres propios fáciles de pronunciar.
- Incluye repetición de frases clave para refuerzo.
- Finaliza con un mensaje positivo y educativo.
- MÁXIMO ${datos.palabrasMax} palabras totales.

SALIDA REQUERIDA (JSON EXACTO):
{
  "titulo": "Título del cuento",
  "texto": "Texto completo del cuento en párrafos separados por saltos de línea",
  "palabrasClave": ["palabra1", "palabra2", "palabra3"],
  "emociones": ["emocion1", "emocion2"],
  "personajes": [
    {"nombre": "Nombre del personaje", "descripcion": "Breve descripción de 1-2 frases"}
  ]
}

IMPORTANTE - REGLAS DE FORMATO OBLIGATORIAS:
1. Devuelve SOLO un JSON válido. Sin texto adicional, sin saludos, sin formato markdown.
2. REGLA DE ORO: LAS CLAVES DEL JSON ("titulo", "texto", "palabrasClave", "emociones", "personajes", "nombre", "descripcion") NO SE DEBEN TRADUCIR NUNCA. Mantenlas exactamente en español como en el ejemplo.
3. El contenido (los valores del JSON) SÍ debe estar traducido al idioma solicitado (${nombreIdioma.toUpperCase()}).`;
}

export interface RespuestaCuento {
  titulo: string;
  texto: string;
  palabrasClave: string[];
  emociones: string[];
  personajes: { nombre: string; descripcion: string }[];
}

export function parsearRespuestaCuento(respuesta: string): RespuestaCuento {
  try {
    // Esta expresión regular busca la primera llave '{' y la última '}'
    // Ignorando cualquier texto conversacional que la IA haya puesto antes o después.
    const match = respuesta.match(/\{[\s\S]*\}/);

    if (!match) {
      throw new Error('No se encontró ninguna estructura JSON en la respuesta de la IA.');
    }

    return JSON.parse(match[0]);
  } catch (err) {
    console.error('Texto original devuelto por la IA que falló al parsear:', respuesta);
    throw new Error('Error al parsear la respuesta del modelo de IA');
  }
}
