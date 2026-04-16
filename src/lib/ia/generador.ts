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
        throw new Error('El modelo de IA no ha devuelto respuesta');
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
        throw new QuotaExceededError('Cuota de la API de Google excedida');
      }

      throw error;
    }
  }

  throw new Error('Error inesperado en reintentos');
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
      maxOutputTokens: 8192,
      responseMimeType: 'application/json',
    },
  });

  const textoRespuesta = await generarCuentoConRetry(modelo, prompt);

  const cuento = parsearRespuestaCuento(textoRespuesta);

  const diapositivasConSegmentos = await Promise.all(
    (cuento.diapositivas || []).map(async (diapositiva) => {
      const segmentosConUrl = await Promise.all(
        (diapositiva.segmentos || []).map(async (segmento) => {
          const primeraPalabra = segmento.pictograma.split('|')[0].trim();
          const urlImagen = await generarUrlArasaac(primeraPalabra);
          return {
            texto: segmento.texto,
            pictograma: segmento.pictograma,
            urlImagen,
          };
        })
      );
      return {
        texto: diapositiva.texto,
        segmentos: segmentosConUrl,
      };
    })
  );

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
