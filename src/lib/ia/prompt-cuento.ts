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

  return `Eres un escritor especializado en cuentos infantiles para niños con necesidades de accesibilidad cognitiva. Crea cuentos adaptados para facilitar la comprensión y el aprendizaje.

CONTEXTO:
- Temática: ${nombreTematica}
- Finalidad pedagógica: ${datos.finalidadPedagogica}
- Público objetivo: Niños con necesidades de accesibilidad cognitiva

${reglasGrounding}

ESTRUCTURA DEL CUENTO:
1. INTRODUCCIÓN (aprox. 10%): Presenta los personajes y el escenario.
2. NUDO (aprox. 60%): Desarrolla una situación con interés y conexión emocional.
3. RESOLUCIÓN (aprox. 30%): Ofrece una solución positiva y educativa.

REGLAS DE ESCRITURA:
- Lenguaje simple y directo, adaptado a niños de 6-10 años.
- Oraciones cortas y claras. Máximo 10 palabras por oración.
- Tiempo verbal consistente: no mezcles presente y pasado en el mismo cuento.
- Máximo 3 personajes en total.
- VOCABULARIO INFANTIL (OBLIGATORIO): Usa SOLO palabras que un niño de 6 años conoce. Sustituye siempre las palabras cultas por su equivalente simple:
  * "debido a" → "por" / "porque"
  * "sin embargo" → "pero"
  * "por lo tanto" → "entonces"
  * "además" → "también"
  * "mediante" → "con"
  * "a causa de" → "por"
  * "a pesar de" → "aunque"
  * "puesto que" → "porque"
  * "de repente" → "de pronto"
  * "finalmente" → "al final"
  * "anteriormente" → "antes"
  * "posteriormente" → "después"
  * "numerosos" → "muchos"
- CONTENIDO: Prohibido violencia, lenguaje hiriente o contenido para adultos. Los monstruos y criaturas fantásticas sí están permitidos si el tono es amigable.
- Incluye repetición de frases clave para refuerzo.
- Finaliza con un mensaje positivo y educativo.
- MÁXIMO ${datos.palabrasMax} palabras totales.
- ESTRUCTURA DE PÁRRAFOS (OBLIGATORIA):
  * El campo "texto" DEBE tener exactamente 3 párrafos separados por "\n\n".
  * Párrafo 1 = Introducción, Párrafo 2 = Nudo, Párrafo 3 = Resolución.
- TÍTULO (ABSOLUTO): El campo "titulo" DEBE ser exactamente "${datos.titulo}". No lo modifiques, abrevies ni corrijas.

SALIDA REQUERIDA (JSON EXACTO):
{
  "titulo": "${datos.titulo}",
  "texto": "Texto completo del cuento en párrafos separados por saltos de línea",
  "palabrasClave": ["palabra1", "palabra2", "palabra3"],
  "emociones": ["emocion1", "emocion2"],
  "personajes": [
    {"nombre": "Nombre del personaje", "descripcion": "Breve descripción de 1-2 frases"}
  ],
  "diapositivas": [
    {
      "texto": "Aquí va la frase completa número 1",
      "segmentos": [
        {"texto": "Sujeto", "pictograma": "pictograma_sujeto"},
        {"texto": "Verbo", "pictograma": "pictograma_verbo"},
        {"texto": "Objeto", "pictograma": "pictograma_objeto"}
      ]
    }
  ]
}

REGLAS DE ESTRUCTURA DIAPOSITIVAS:

1. UNA DIAPOSITIVA POR CADA CLÁUSULA:
   - Divide por puntos Y por comas cuando la coma separe dos cláusulas con verbo (aunque el sujeto sea implícito).
   - "El gato comió, el perro durmió." → DOS diapositivas.
   - "Tenía juguetes, pero no era feliz." → DOS diapositivas.
   - Coma entre enumeración simple (rojo, azul, verde) → NO divide.
   - DIÁLOGO con dos puntos: "Juan dijo: Hola" → DOS diapositivas: "Juan dijo:" / "Hola"
   - PROHIBIDO resumir o saltarse cláusulas.

2. VERBOS Y NEGACIONES:
   - Cada verbo tiene su propia celda: "necesita comer" → {"texto": "necesita", "pictograma": "necesitar"} + {"texto": "comer", "pictograma": "comer"}
   - "no" SIEMPRE en celda propia: {"texto": "no", "pictograma": "no"} + verbo aparte.

3. NORMALIZACIÓN DE PICTOGRAMAS — REGLA ABSOLUTA:
   - El campo "pictograma" SIEMPRE en ESPAÑOL e INFINITIVO, sin importar el idioma del cuento.
   - El campo "texto" SÍ va en el idioma del cuento.
   - Ejemplos (catalán): {"texto": "menja", "pictograma": "comer"}, {"texto": "el gat", "pictograma": "gato"}
   - Ejemplos (euskera): {"texto": "jan", "pictograma": "comer"}, {"texto": "pozik", "pictograma": "feliz"}
   - Verbos reflexivos → infinitivo base: "se lava" → "lavar", "se levanta" → "levantar"
   - Adjetivos de estado: "mal" → "mal", "bien" → "bien", "triste" → "triste", "contento" → "contento"
   - Memoria → siempre "recuerdos" o "recordar"
   - "sol/solo" DISTINCIÓN OBLIGATORIA (tres casos):
     * "sol" como sustantivo (el astro, la estrella) → pictograma: "sol"
     * "sol/sola/solo/sola" como adjetivo de estado tras un verbo copulativo (estava sol, se quedó solo, se siente sola) → pictograma: "solo"
     * "solo" como adverbio de cantidad antes de un verbo (solo quería, solo tiene, solamente viene) → SIN pictograma, absorber en el segmento del verbo siguiente. Ejemplo: "solo quería jugar" → {"texto": "solo quería", "pictograma": "querer"}

4. PALABRAS SIN PICTOGRAMA — COBERTURA TOTAL OBLIGATORIA:
   - Artículos, preposiciones, conjunciones y adjetivos descriptivos NO llevan pictograma propio.
   - Se incluyen en el campo "texto" del segmento del concepto más cercano.
   - TODA palabra de la frase debe aparecer en algún campo "texto". NINGUNA palabra puede desaparecer.
   - "En un bosc llunyà" → {"texto": "En un bosc llunyà", "pictograma": "bosque"} — todo junto en el texto del sustantivo
   - "en el parque" → {"texto": "en el parque", "pictograma": "parque"}
   - "con su amigo" → {"texto": "con su amigo", "pictograma": "amigo"}
   - Los adjetivos que modifican a un sustantivo van dentro del texto de ese sustantivo, NO en celda separada.

5. SUSTANTIVOS COMPUESTOS:
   - Solo separa adjetivo y sustantivo en celdas distintas si el adjetivo es el concepto central de la frase (p. ej. "muy contento" → celda "muy contento" con pictograma "contento").

6. LÍMITE DE CELDAS: MÍNIMO 2, MÁXIMO 7 por diapositiva. Si hay más de 7 conceptos, agrupa los menos relevantes.

7. IDENTIDAD VISUAL: Si el cuento establece que "Tomás es un león", el pictograma de "Tomás" SIEMPRE es "león" en todo el cuento.

8. FALLBACK: El pictograma nunca puede estar vacío. Sustantivo raro → categoría general (roble → "árbol"). Concepto abstracto → acción concreta ("responsabilidad" → "ayudar").

9. PROHIBIDO:
   - Pictogramas para artículos, preposiciones, conjunciones o conectores
   - Agrupar "no" con verbos
   - Pictograma vacío o con texto roto
   - Menos de 2 o más de 7 celdas por diapositiva
   - Usar nombres propios como pictograma
   - Cambiar el pictograma de un personaje establecido

FORMATO OBLIGATORIO:
1. Devuelve SOLO JSON válido. Sin texto adicional, sin markdown.
2. Las claves del JSON NUNCA se traducen (titulo, texto, palabrasClave, emociones, personajes, nombre, descripcion).
3. Los valores SÍ van en el idioma solicitado (${nombreIdioma.toUpperCase()}).
4. El valor de "titulo" DEBE ser exactamente "${datos.titulo}"。`;
}

export interface RespuestaCuento {
  titulo: string;
  texto: string;
  palabrasClave: string[];
  emociones: string[];
  personajes: { nombre: string; descripcion: string }[];
  diapositivas: {
    texto: string;
    segmentos: {
      texto: string;
      pictograma: string;
    }[];
  }[];
}

// Palabras que nunca deben tener pictograma propio — se absorben en el segmento siguiente
const PALABRAS_SIN_PICTOGRAMA = new Set([
  // Artículos ES
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'uno',
  // Artículos CA/VA
  'els', 'les', 'uns', 'unes',
  // Artículos EN
  'the', 'an',
  // Artículos FR
  'le', 'des', 'une',
  // Preposiciones ES
  'de', 'a', 'en', 'con', 'por', 'para', 'sin', 'sobre', 'bajo', 'hacia', 'entre', 'desde', 'hasta',
  // Preposiciones CA/VA
  'amb', 'per', 'sense', 'dins',
  // Preposiciones EN
  'of', 'to', 'in', 'with', 'on', 'at', 'by', 'for', 'from', 'into', 'about',
  // Preposiciones FR
  'dans', 'sur', 'avec', 'pour', 'sans', 'vers',
  // Conjunciones y conectores ES
  'y', 'e', 'o', 'u', 'ni', 'que', 'pero', 'sino', 'aunque', 'porque', 'cuando', 'si', 'como',
  // Conjunciones y conectores CA/VA
  'i', 'però', 'sinó', 'perquè', 'quan', 'com',
  // Conjunciones y conectores EN
  'and', 'but', 'or', 'nor', 'yet', 'so', 'because', 'when', 'if', 'as', 'than',
  // Conjunciones y conectores FR
  'et', 'mais', 'ou', 'car', 'quand', 'comme',
  // Conjunciones EU
  'eta', 'edo', 'baina',
  // Conjunciones GL
  'mais', 'nin',
]);

function filtrarSegmentosSinPictograma(
  segmentos: { texto: string; pictograma: string }[]
): { texto: string; pictograma: string }[] {
  const resultado: { texto: string; pictograma: string }[] = [];
  let textoPendiente = '';

  for (const segmento of segmentos) {
    const pictogramaLimpio = segmento.pictograma.trim().toLowerCase().replace(/[.,;:!?¡¿]/g, '');
    const esSinPictograma = PALABRAS_SIN_PICTOGRAMA.has(pictogramaLimpio);

    if (esSinPictograma) {
      textoPendiente += (textoPendiente ? ' ' : '') + segmento.texto;
    } else {
      const textoFinal = textoPendiente
        ? textoPendiente + ' ' + segmento.texto
        : segmento.texto;
      resultado.push({ texto: textoFinal, pictograma: segmento.pictograma });
      textoPendiente = '';
    }
  }

  // Si quedó texto pendiente al final, lo añade al último segmento
  if (textoPendiente && resultado.length > 0) {
    resultado[resultado.length - 1] = {
      ...resultado[resultado.length - 1],
      texto: resultado[resultado.length - 1].texto + ' ' + textoPendiente,
    };
  }

  return resultado;
}

export function parsearRespuestaCuento(respuesta: string): RespuestaCuento {
  try {
    let textoLimpio = respuesta.trim();

    // Eliminar bloques markdown que Gemini a veces incluye (```json ... ```)
    textoLimpio = textoLimpio.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');

    const primeraLlave = textoLimpio.indexOf('{');
    const ultimaLlave = textoLimpio.lastIndexOf('}');

    if (primeraLlave === -1 || ultimaLlave === -1 || primeraLlave > ultimaLlave) {
      throw new Error('No se encontró ninguna estructura JSON válida en la respuesta de la IA.');
    }

    let jsonStr = textoLimpio.substring(primeraLlave, ultimaLlave + 1);

    // Trailing commas antes de } o ] — error frecuente de Gemini
    jsonStr = jsonStr.replace(/,\s*([\]}])/g, '$1');

    // Caracteres de control que rompen JSON.parse (excepto \n \r \t)
    jsonStr = jsonStr.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

    const cuento: RespuestaCuento = JSON.parse(jsonStr);

    cuento.diapositivas = cuento.diapositivas.map((d) => ({
      ...d,
      segmentos: filtrarSegmentosSinPictograma(d.segmentos),
    }));

    return cuento;
  } catch (err) {
    console.error('Texto original devuelto por la IA que falló al parsear:', respuesta);
    throw new Error('El cuento no se ha podido generar correctamente. Inténtalo de nuevo. (ref: parse_error)');
  }
}
