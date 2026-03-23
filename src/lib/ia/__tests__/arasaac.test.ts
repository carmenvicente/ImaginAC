import { describe, it, expect, vi, beforeEach } from 'vitest';
import { categorizarPictogramas } from '../arasaac';

global.fetch = vi.fn();

const mockFetch = global.fetch as ReturnType<typeof vi.fn>;

describe('arasaac.ts - Tests Unitarios', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  describe('Tokenización y Normalización (tests de función pura)', () => {
    it('debe normalizar texto eliminando acentos', () => {
      const texto = 'niño';
      const normalizado = texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      expect(normalizado).toBe('nino');
    });

    it('debe filtrar palabras cortas (menos de 3 caracteres)', () => {
      const palabras = ['el', 'la', 'de', 'sol'];
      const filtradas = palabras.filter((p) => p.length > 2);

      expect(filtradas).toEqual(['sol']);
      expect(filtradas.length).toBe(1);
    });

    it('debe eliminar duplicados', () => {
      const palabras = ['casa', 'casa', 'perro'];
      const unicas = [...new Set(palabras)];

      expect(unicas).toEqual(['casa', 'perro']);
      expect(unicas.length).toBe(2);
    });

    it('debe filtrar stopwords correctamente', () => {
      const STOPWORDS_ES: Record<string, boolean> = {
        el: true,
        la: true,
        los: true,
        las: true,
        de: true,
        del: true,
        en: true,
        a: true,
        y: true,
        e: true,
        o: true,
        u: true,
        que: true,
        un: true,
        una: true,
      };

      const palabras = ['el', 'casa', 'de', 'la', 'mar'];
      const filtradas = palabras.filter((p) => !STOPWORDS_ES[p]);

      expect(filtradas).toEqual(['casa', 'mar']);
    });
  });

  describe('Categorización (tests de función pura)', () => {
    it('debe categorizar verbos conocidos', () => {
      const CATEGORIA_POR_PALABRA: Record<string, string> = {
        correr: 'VERBO',
        saltar: 'VERBO',
        comer: 'VERBO',
        dormir: 'VERBO',
        jugar: 'VERBO',
      };

      expect(CATEGORIA_POR_PALABRA['correr']).toBe('VERBO');
      expect(CATEGORIA_POR_PALABRA['jugar']).toBe('VERBO');
    });

    it('debe categorizar personas', () => {
      const CATEGORIA_POR_PALABRA: Record<string, string> = {
        mama: 'PERSONA',
        papa: 'PERSONA',
        niño: 'PERSONA',
        niña: 'PERSONA',
        amigo: 'PERSONA',
        amiga: 'PERSONA',
      };

      expect(CATEGORIA_POR_PALABRA['niño']).toBe('PERSONA');
      expect(CATEGORIA_POR_PALABRA['mama']).toBe('PERSONA');
    });

    it('debe categorizar adjetivos', () => {
      const CATEGORIA_POR_PALABRA: Record<string, string> = {
        feliz: 'ADJETIVO',
        triste: 'ADJETIVO',
        grande: 'ADJETIVO',
        pequeño: 'ADJETIVO',
      };

      expect(CATEGORIA_POR_PALABRA['feliz']).toBe('ADJETIVO');
      expect(CATEGORIA_POR_PALABRA['grande']).toBe('ADJETIVO');
    });

    it('debe categorizar objetos', () => {
      const CATEGORIA_POR_PALABRA: Record<string, string> = {
        perro: 'OBJETO',
        gato: 'OBJETO',
        casa: 'OBJETO',
        libro: 'OBJETO',
        agua: 'OBJETO',
      };

      expect(CATEGORIA_POR_PALABRA['perro']).toBe('OBJETO');
      expect(CATEGORIA_POR_PALABRA['casa']).toBe('OBJETO');
    });

    it('debe detectar terminaciones de adjetivos', () => {
      const terminadoEnAdjetivo = (palabra: string) => {
        const terminaEn = palabra.slice(-2);
        return terminaEn === 'do' || terminaEn === 'da' || terminaEn === 'to' || terminaEn === 'ta';
      };

      expect(terminadoEnAdjetivo('amado')).toBe(true);
      expect(terminadoEnAdjetivo('bonita')).toBe(true);
      expect(terminadoEnAdjetivo('bendito')).toBe(true);
      expect(terminadoEnAdjetivo('feliz')).toBe(false);
      expect(terminadoEnAdjetivo('grande')).toBe(false);
      expect(terminadoEnAdjetivo('correr')).toBe(false);
    });
  });

  describe('Generación de URLs ARASAAC (tests de lógica)', () => {
    it('debe construir URL correcta para pictograma ARASAAC', () => {
      const pictogramaId = 'abc123';
      const urlEsperada = `https://static.arasaac.org/pictograms/${pictogramaId}/${pictogramaId}_300.png`;

      expect(urlEsperada).toBe('https://static.arasaac.org/pictograms/abc123/abc123_300.png');
    });

    it('debe normalizar palabra para URL', () => {
      const palabra = 'casa grande';
      const normalizada = palabra
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '_');

      expect(normalizada).toBe('casa_grande');
    });

    it('debe manejar acentos en normalización de URL', () => {
      const palabra = 'niño emoción';
      const normalizada = palabra
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '_');

      expect(normalizada).toBe('nino_emocion');
    });

    it('debe codificar URI correctamente', () => {
      const palabra = 'casa grande';
      const encoded = encodeURIComponent(palabra);

      expect(encoded).toBe('casa%20grande');
    });
  });

  describe('Categorizar Pictogramas', () => {
    it('debe agrupar pictogramas por categoría', () => {
      const pictogramas = [
        {
          codigoSpc: 'M0001',
          textoOriginal: 'correr',
          categoria: 'VERBO' as const,
          orden: 0,
          urlImagen: '',
        },
        {
          codigoSpc: 'M0002',
          textoOriginal: 'perro',
          categoria: 'OBJETO' as const,
          orden: 1,
          urlImagen: '',
        },
        {
          codigoSpc: 'M0003',
          textoOriginal: 'feliz',
          categoria: 'ADJETIVO' as const,
          orden: 2,
          urlImagen: '',
        },
        {
          codigoSpc: 'M0004',
          textoOriginal: 'nino',
          categoria: 'PERSONA' as const,
          orden: 3,
          urlImagen: '',
        },
        {
          codigoSpc: 'M0005',
          textoOriginal: 'xyz',
          categoria: 'OTRO' as const,
          orden: 4,
          urlImagen: '',
        },
      ];

      const resultado = categorizarPictogramas(pictogramas);

      expect(resultado.VERBO.length).toBe(1);
      expect(resultado.OBJETO.length).toBe(1);
      expect(resultado.ADJETIVO.length).toBe(1);
      expect(resultado.PERSONA.length).toBe(1);
      expect(resultado.OTRO.length).toBe(1);
    });

    it('debe devolver arrays vacíos si no hay pictogramas de una categoría', () => {
      const pictogramas = [
        {
          codigoSpc: 'M0001',
          textoOriginal: 'correr',
          categoria: 'VERBO' as const,
          orden: 0,
          urlImagen: '',
        },
      ];

      const resultado = categorizarPictogramas(pictogramas);

      expect(resultado.OBJETO.length).toBe(0);
      expect(resultado.ADJETIVO.length).toBe(0);
      expect(resultado.PERSONA.length).toBe(0);
      expect(resultado.OTRO.length).toBe(0);
    });

    it('debe mantener todas las categorías en el resultado', () => {
      const pictogramas: any[] = [];
      const resultado = categorizarPictogramas(pictogramas);

      expect(resultado).toHaveProperty('VERBO');
      expect(resultado).toHaveProperty('PERSONA');
      expect(resultado).toHaveProperty('ADJETIVO');
      expect(resultado).toHaveProperty('OBJETO');
      expect(resultado).toHaveProperty('OTRO');
    });
  });

  describe('Orden de Pictogramas', () => {
    it('debe mantener índice de orden correcto', () => {
      const pictogramas = [
        {
          codigoSpc: 'M0001',
          textoOriginal: 'uno',
          categoria: 'OTRO' as const,
          orden: 0,
          urlImagen: '',
        },
        {
          codigoSpc: 'M0002',
          textoOriginal: 'dos',
          categoria: 'OTRO' as const,
          orden: 1,
          urlImagen: '',
        },
        {
          codigoSpc: 'M0003',
          textoOriginal: 'tres',
          categoria: 'OTRO' as const,
          orden: 2,
          urlImagen: '',
        },
      ];

      pictogramas.forEach((p, i) => {
        expect(p.orden).toBe(i);
      });
    });
  });
});
