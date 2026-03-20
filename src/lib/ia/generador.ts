import {
  construirPromptCuento,
  parsearRespuestaCuento,
  type RespuestaCuento,
} from './prompt-cuento';
import { transcribirAPictogramas, type Pictograma } from './arasaac';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface ResultadoGeneracion {
  cuento: RespuestaCuento;
  pictogramas: Pictograma[];
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
      maxOutputTokens: 4000,
      responseMimeType: 'application/json',
    },
  });

  const resultado = await modelo.generateContent(prompt);
  const respuesta = await resultado.response;
  const textoRespuesta = respuesta.text();

  if (!textoRespuesta) {
    throw new Error('El modelo de IA no ha devuelto respuesta');
  }

  const cuento = parsearRespuestaCuento(textoRespuesta);
  const pictogramas = await transcribirAPictogramas(cuento.texto, params.idioma);

  return {
    cuento,
    pictogramas,
  };
}
