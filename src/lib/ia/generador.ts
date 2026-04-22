import {
  construirPromptCuento,
  parsearRespuestaCuento,
  type RespuestaCuento,
} from './prompt-cuento';
import { generarUrlArasaac, type Pictograma } from '@/lib/ia/arasaac';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// MODELO OFICIAL: gemini-3.1-flash-lite-preview (Decisión Orquestadora 2024-03-25)
// NO cambiar sin autorización explícita de la Orquestadora

export interface ResultadoGeneracion {
  cuento: RespuestaCuento;
  pictogramas: Pictograma[];
}

export class QuotaExceededError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'QuotaExceededError';
  }
}

async function esperarMs(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generarCuentoConRetry(
  modelo: ReturnType<typeof genAI.getGenerativeModel>,
  prompt: string,
  reintentosMax = 3
): Promise<string> {
  for (let intento = 1; intento <= reintentosMax; intento++) {
    try {
      const resultado = await modelo.generateContent(prompt);
      const respuesta = await resultado.response;
      const textoRespuesta = respuesta.text();

      if (!textoRespuesta) {
        throw new Error(
          'El cuento no se ha podido generar. Inténtalo de nuevo. (ref: empty_response)'
        );
      }

      return textoRespuesta;
    } catch (error: any) {
      const es429 = error?.status === 429 || error?.message?.includes('429');

      if (es429 && intento < reintentosMax) {
        const esperaMs = Math.pow(2, intento) * 1000;
        console.warn(
          `⚠️ Error 429 detectado. Reintentando en ${esperaMs}ms (intento ${intento + 1}/${reintentosMax})`
        );
        await esperarMs(esperaMs);
        continue;
      }

      if (es429) {
        throw new QuotaExceededError('quota_exceeded');
      }

      const mensajeError = error?.message || error?.toString() || 'desconocido';
      throw new Error(
        `El servicio de IA no está disponible ahora mismo. Inténtalo en unos minutos. (ref: api_error — ${mensajeError})`
      );
    }
  }

  throw new Error('El cuento no se ha podido generar. Inténtalo de nuevo. (ref: retry_exhausted)');
}

export async function generarCuento(params: {
  titulo: string;
  tematica: string;
  finalidadPedagogica: string;
  idioma: string;
  palabrasMax: number;
}): Promise<ResultadoGeneracion> {
  const prompt = construirPromptCuento({
    titulo: params.titulo,
    tematica: params.tematica,
    finalidadPedagogica: params.finalidadPedagogica,
    idioma: params.idioma,
    palabrasMax: params.palabrasMax,
  });

  const modelo = genAI.getGenerativeModel({
    model: 'gemini-3-flash-preview',
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 32768,
      responseMimeType: 'application/json',
    },
  });

  const MAX_PARSE_INTENTOS = 3;
  let cuento: ReturnType<typeof parsearRespuestaCuento> | null = null;

  for (let intento = 1; intento <= MAX_PARSE_INTENTOS; intento++) {
    const textoRespuesta = await generarCuentoConRetry(modelo, prompt);
    try {
      cuento = parsearRespuestaCuento(textoRespuesta);
      break;
    } catch (parseErr) {
      if (intento >= MAX_PARSE_INTENTOS) throw parseErr;
      console.warn(
        `⚠️ JSON inválido del modelo (intento ${intento}/${MAX_PARSE_INTENTOS}), reintentando...`
      );
      await esperarMs(1000);
    }
  }

  if (!cuento) throw new Error('No se pudo parsear la respuesta del modelo tras varios intentos');

  // Peticiones secuenciales para evitar rate limiting de ARASAAC
  const diapositivasConSegmentos = [];
  for (const diapositiva of cuento.diapositivas || []) {
    const segmentosConUrl = [];
    for (const segmento of diapositiva.segmentos || []) {
      const primeraPalabra = segmento.pictograma.split('|')[0].trim();
      // El campo "pictograma" siempre llega en español (regla del prompt) → buscar en 'ES'
      const urlImagen = await generarUrlArasaac(primeraPalabra, 'ES');
      segmentosConUrl.push({
        texto: segmento.texto,
        pictograma: segmento.pictograma,
        urlImagen,
      });
    }
    diapositivasConSegmentos.push({
      texto: diapositiva.texto,
      segmentos: segmentosConUrl,
    });
  }

  const pictogramasGlobales = diapositivasConSegmentos
    .flatMap((d) => d.segmentos)
    .map((s, i) => ({
      codigoSpc: '',
      textoOriginal: s.texto,
      categoria: 'OBJETO' as const,
      orden: i,
      urlImagen: s.urlImagen,
    }));

  return {
    cuento: {
      ...cuento,
      diapositivas: diapositivasConSegmentos,
    },
    pictogramas: pictogramasGlobales,
  };
}
