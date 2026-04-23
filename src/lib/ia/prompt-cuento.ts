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
      "Usa la 'ç': açò, faç, dolç, braç.",
      "Usa la 'l·l' (ela geminada, punt volat) siempre en el interior de palabra, nunca al inicio ni al final: col·legi, il·lusió, cel·la, pal·lasso.",
      "Artículos: el/la/els/les. NUNCA uses 'el/la' en plural.",
      "Usa 'ny' para el sonido /ɲ/ (equivale a la ñ española): any, bany, espanya, anyell.",
      "Final '-ig' al final de palabra se pronuncia /tʃ/: maig, puig, vaig, veig, boig.",
    ],
  },
  {
    idioma: 'Valenciano',
    codigo: 'VA',
    reglas: [
      "Usa la 'ç': açò, faç, dolç, braç.",
      "Usa la 'l·l' (ela geminada): col·legi, pal·lasso, cel·la.",
      "Artículos: el/la/els/les. NUNCA uses 'el/la' en plural.",
      "Usa 'ny' para el sonido /ɲ/ (equivale a la ñ española): any, espanya, bany, anyell.",
      "Infinitivos de 2.ª conjugación terminan en '-re': perdre, vendre, córrer, beure.",
      'Vocabulario propio: hui (avui/hoy), ací (aquí), roig (vermell/rojo), pardal (ocell/pájaro), joguet (joguina/juguete), capell (barret/sombrero), bonico/a (macu/a/bonito), per favor (si us plau).',
      'Verbos propios: vore (veure/ver), traure (treure/sacar), tindre (tenir/tener), vindre (venir), eixir (sortir/salir), arreplegar (recollir/recoger).',
    ],
  },
  {
    idioma: 'Gallego',
    codigo: 'GL',
    reglas: [
      "NUNCA uses la letra 'j'. Usa 'x' o 'g' suave: xente, máxico, xogar, páxina.",
      "NUNCA uses la letra 'y' como conjunción. Usa 'e': o neno e a nena, o pai e a nai.",
      "Usa 'ñ' para el sonido palatal nasal (igual que en español): viño (vino), camiño (camino), señor.",
      "USA 'ch': chora, chocar, chave, choiva.",
      "Artículo: 'o/a' + plural 'os/as'. Ej: o neno, a nena, os nenos, as nenas.",
      'Vocabulario propio: neno/a (niño/a), xogar (jugar), falar (hablar), achegar (acercar), agochar (esconder).',
      "Usa formas verbales propias del galego: 'fixen' (hice), 'truxen' (traje), 'fun' (fui), 'vin' (vine).",
    ],
  },
  {
    idioma: 'Euskera',
    codigo: 'EU',
    reglas: [
      "Usa 'k' para el sonido /k/: kale, ikusi, mendi, ondo.",
      "Usa 'z' para /z/ (fricativa dental): zorte, zuhaitz, azoka.",
      "Usa 'tz' para /ts/: hitz (palabra), gorputz (cuerpo), atzo (ayer).",
      "Usa 'tx' para /tʃ/: txakurra (perro), etxea (casa), katua (gato).",
      "Usa 'x' para el sonido /ʃ/ (como 'sh' inglés): kaixo (hola), xarma (encanto), xede (objetivo), xume (humilde), xaboi (jabón).",
      "NO uses artículos 'el/la'. El euskera NO tiene género gramatical.",
      "Orden SOV obligatorio: el verbo va siempre al final de la oración. Ej: 'Amak ogia erosten du' (La madre compra el pan).",
      'Usa postposiciones (van detrás del nombre): -ren (de), -rekin (con), -rako (para), -tik (desde), -ra (hacia).',
      'Nombres propios vascos sin adaptar: Ane, Peru, Markel, Leire.',
    ],
  },
  {
    idioma: 'Inglés',
    codigo: 'EN',
    reglas: [
      'Orden estricto Sujeto + Verbo + Objeto. No insertar adverbios entre el verbo y su complemento directo.',
      'Tercera persona del singular en presente añade -s: he runs, she plays, it jumps.',
      'Adjetivos invariables (sin género ni número) y siempre DELANTE del sustantivo: "the big dog", "a funny cat".',
      'Usa el pasado simple (Simple Past) para narrar: walked, played, said, ran, went, was, had.',
    ],
  },
  {
    idioma: 'Francés',
    codigo: 'FR',
    reglas: [
      'Usa siempre los caracteres especiales: ç, é, è, ê, ë, à, â, ô, û, î, ï, œ.',
      'Concordancia obligatoria de género y número: artículo y adjetivo concuerdan con el sustantivo. Ex: le petit chien, la petite chatte, les petits enfants.',
      'Los adjetivos van generalmente DETRÁS del sustantivo. Los cortos y comunes van DELANTE: grand, petit, beau, bon, vieux, jeune, long.',
      'Negación en dos partes rodeando el verbo conjugado: ne…pas. Ex: "Il ne mange pas."',
      'Usa "tu" para personajes y niños (informal); "vous" para adultos desconocidos o figuras de autoridad.',
    ],
  },
  {
    idioma: 'Deutsch',
    codigo: 'DE',
    reglas: [
      'TODOS los sustantivos se escriben en MAYÚSCULA: der Hund, das Kind, die Schule, ein Baum.',
      'Tres géneros: der (masculino), die (femenino), das (neutro). Los plurales usan siempre "die".',
      'El verbo ocupa siempre la SEGUNDA posición en la oración principal; va al FINAL en subordinadas.',
      'Usa SIEMPRE los umlauts y la eszett: ä, ö, ü, ß. NUNCA sustituir por ae, oe, ue, ss.',
      'Para narrar usar Präteritum: war (era/fue), hatte (tenía), ging (fue/iba), kam (vino), sah (vio).',
      'Los adjetivos concuerdan con género y caso: ein kleiner Hund, eine kleine Katze, ein kleines Kind.',
    ],
  },
  {
    idioma: 'Italiano',
    codigo: 'IT',
    reglas: [
      'Concordancia de género obligatoria: masculino (il/i) y femenino (la/le); artículos y adjetivos concuerdan siempre.',
      "Apostrofe en elisión obligatoria ante vocal: l'amico, dell'albero, un'amica, all'alba.",
      'Las consonantes dobles son OBLIGATORIAS y cambian el significado: anno (año) ≠ ano, palla (pelota) ≠ pala.',
      'Los acentos son obligatorios: è (es) ≠ e (y). Usa siempre: è, à, ù, ì, ò.',
      'El pronombre sujeto se omite habitualmente: "Mangia la mela" (no "Lui mangia la mela").',
      'Los adjetivos van generalmente DETRÁS del sustantivo: un cane piccolo, una casa grande.',
      'Para narrar usar passato prossimo: è andato/a, ha mangiato, hanno giocato.',
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

REGLA FUNDAMENTAL — TRANSCRIPCIÓN LITERAL:
Las diapositivas transcriben el campo "texto" del cuento frase a frase, de forma LITERAL y COMPLETA.
- La concatenación de todos los diapositivas[].texto debe reproducir el texto COMPLETO del cuento sin omisiones, añadidos ni paráfrasis.
- PROHIBIDO inventar texto, resumir, saltar frases o cambiar palabras respecto al cuento original.

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
   - El pictograma debe ser el concepto MÁS DIRECTO y CONCRETO del segmento. NUNCA asignes un pictograma sin relación semántica clara con el texto.
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
   - Artículos, preposiciones, conjunciones y conectores NO llevan pictograma propio.
   - Conectores sin pictograma: entonces, también, además, luego, así, por eso, mientras tanto, sin embargo.
   - Se incluyen en el campo "texto" del segmento del concepto más cercano.
   - TODA palabra de la frase debe aparecer en algún campo "texto". NINGUNA palabra puede desaparecer.
   - "En un bosc llunyà" → {"texto": "En un bosc llunyà", "pictograma": "bosque"}
   - "en el parque" → {"texto": "en el parque", "pictograma": "parque"}
   - "con su amigo" → {"texto": "con su amigo", "pictograma": "amigo"}

5. ADJETIVOS:
   - Adjetivos de COLOR, APARIENCIA FÍSICA o RASGO DEFINITORIO del personaje → celda PROPIA con pictograma.
     * "un conejo negro" → {"texto": "un conejo", "pictograma": "conejo"} + {"texto": "negro", "pictograma": "negro"}
     * "una niña alta" → {"texto": "una niña", "pictograma": "niña"} + {"texto": "alta", "pictograma": "alto"}
   - Adjetivos genéricos, de tamaño o no visuales → absorbidos en el texto del sustantivo al que modifican.
     * "un pequeño jardín" → {"texto": "un pequeño jardín", "pictograma": "jardín"}
   - Adjetivo como concepto central de la frase → celda propia: "estaba muy contento" → {"texto": "muy contento", "pictograma": "contento"}

6. LÍMITE DE CELDAS: MÍNIMO 2, MÁXIMO 7 por diapositiva. Si hay más de 7 conceptos, agrupa los menos relevantes.

7. IDENTIDAD VISUAL Y PRONOMBRES — REGLA ABSOLUTA:
   Al presentar un personaje, establece su pictograma según su naturaleza y manténlo EN TODO EL CUENTO:
   - Personaje humano: asigna el pictograma según género y edad aproximada.
     * Niño / chico → "niño"        * Niña / chica → "niña"
     * Hombre / padre → "hombre" o "padre"    * Mujer / madre → "mujer" o "madre"
     * Abuelo → "abuelo"            * Abuela → "abuela"
   - Personaje animal o cosa → el pictograma del animal/cosa: "León" (personaje) → "león"
   - Este pictograma se usa SIEMPRE que el personaje aparezca como:
     * Nombre propio: "Juan" → pictograma "niño"
     * Pronombre personal: "él" → pictograma del personaje masculino de referencia; "ella" → femenino; "ellos/ellas" → plural correspondiente
     * Demostrativo referido al personaje: "este", "esta", "estos", "estas"
   - Ejemplo: Juan es un niño → pictograma "niño" para Juan, él, este niño, en todo el cuento.
   - Ejemplo: Julia es una niña → pictograma "niña" para Julia, ella, esta niña, en todo el cuento.
   - Ejemplo: Tomás es un león → pictograma "león" para Tomás, él, este animal, en todo el cuento.

8. FALLBACK: El pictograma nunca puede estar vacío. Sustantivo raro → categoría general (roble → "árbol"). Concepto abstracto → acción concreta ("responsabilidad" → "ayudar").

9. PROHIBIDO:
   - Pictogramas para artículos, preposiciones, conjunciones, conectores o adverbios de enlace (entonces, también, además, luego, así...)
   - Agrupar "no" con verbos
   - Pictograma vacío o con texto roto
   - Menos de 2 o más de 7 celdas por diapositiva
   - Usar el nombre propio como valor del campo pictograma (usar "niño", "niña", el animal, etc.)
   - Cambiar el pictograma de un personaje una vez establecido
   - Pictograma sin relación semántica con el texto del segmento
   - Inventar, resumir o parafrasear el texto del cuento en las diapositivas

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
  'el',
  'la',
  'los',
  'las',
  'un',
  'una',
  'unos',
  'unas',
  'uno',
  // Artículos CA/VA
  'els',
  'les',
  'uns',
  'unes',
  // Artículos EN
  'the',
  'an',
  // Artículos FR
  'le',
  'des',
  'une',
  // Preposiciones ES
  'de',
  'a',
  'en',
  'con',
  'por',
  'para',
  'sin',
  'sobre',
  'bajo',
  'hacia',
  'entre',
  'desde',
  'hasta',
  // Preposiciones CA/VA
  'amb',
  'per',
  'sense',
  'dins',
  // Preposiciones EN
  'of',
  'to',
  'in',
  'with',
  'on',
  'at',
  'by',
  'for',
  'from',
  'into',
  'about',
  // Preposiciones FR
  'dans',
  'sur',
  'avec',
  'pour',
  'sans',
  'vers',
  // Conjunciones y conectores ES
  'y',
  'e',
  'o',
  'u',
  'ni',
  'que',
  'pero',
  'sino',
  'aunque',
  'porque',
  'cuando',
  'si',
  'como',
  // Conjunciones y conectores CA/VA
  'i',
  'però',
  'sinó',
  'perquè',
  'quan',
  'com',
  // Conjunciones y conectores EN
  'and',
  'but',
  'or',
  'nor',
  'yet',
  'so',
  'because',
  'when',
  'if',
  'as',
  'than',
  // Conjunciones y conectores FR
  'et',
  'mais',
  'ou',
  'car',
  'quand',
  'comme',
  // Conjunciones EU
  'eta',
  'edo',
  'baina',
  // Conjunciones GL
  'mais',
  'nin',
  // Conectores lógicos y temporales ES (sin valor pictográfico)
  'entonces',
  'también',
  'además',
  // Artículos DE
  'der',
  'die',
  'das',
  'ein',
  'eine',
  'dem',
  'den',
  'des',
  'einen',
  'einer',
  'eines',
  // Preposiciones DE
  'von',
  'zu',
  'mit',
  'auf',
  'an',
  'bei',
  'nach',
  'aus',
  'für',
  'über',
  'unter',
  'vor',
  // Conjunciones y conectores DE
  'und',
  'aber',
  'oder',
  'dann',
  'auch',
  'denn',
  'weil',
  'wenn',
  'dass',
  'wie',
  'als',
  // Artículos IT
  'il',
  'lo',
  'gli',
  'del',
  'dello',
  'della',
  'degli',
  'delle',
  'dei',
  'al',
  'allo',
  'alla',
  'agli',
  'alle',
  // Preposiciones IT
  'di',
  'da',
  'su',
  'tra',
  'fra',
  // Conjunciones y conectores IT
  'ma',
  'oppure',
  'mentre',
  'quindi',
]);

function filtrarSegmentosSinPictograma(
  segmentos: { texto: string; pictograma: string }[]
): { texto: string; pictograma: string }[] {
  const resultado: { texto: string; pictograma: string }[] = [];
  let textoPendiente = '';

  for (const segmento of segmentos) {
    const pictogramaLimpio = segmento.pictograma
      .trim()
      .toLowerCase()
      .replace(/[.,;:!?¡¿]/g, '');
    const esSinPictograma = PALABRAS_SIN_PICTOGRAMA.has(pictogramaLimpio);

    if (esSinPictograma) {
      textoPendiente += (textoPendiente ? ' ' : '') + segmento.texto;
    } else {
      const textoFinal = textoPendiente ? textoPendiente + ' ' + segmento.texto : segmento.texto;
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
    throw new Error(
      'El cuento no se ha podido generar correctamente. Inténtalo de nuevo. (ref: parse_error)'
    );
  }
}
