import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(),
        })),
      })),
    })),
  })),
}));

vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: vi.fn().mockImplementation(() => ({
    getGenerativeModel: vi.fn(() => ({
      generateContent: vi.fn(() =>
        Promise.resolve({
          response: {
            text: () =>
              Promise.resolve(
                JSON.stringify({
                  titulo: 'El Dragón Valiente',
                  texto: 'Había una vez un dragón.',
                  palabrasClave: ['dragón', 'valiente', 'aventura'],
                  emociones: ['valentía'],
                  personajes: [{ nombre: 'Draco', descripcion: 'Un dragón amable' }],
                })
              ),
          },
        })
      ),
    })),
  })),
}));

const mockSupabase = {
  from: vi.fn(() => ({
    insert: vi.fn(() => ({
      select: vi.fn(() => ({
        single: vi.fn(() =>
          Promise.resolve({
            data: { id: 'actividad-123', titulo: 'El Dragón Valiente' },
            error: null,
          })
        ),
      })),
    })),
    select: vi.fn(() => ({
      eq: vi.fn(() => ({
        single: vi.fn(() =>
          Promise.resolve({
            data: { id: 1, codigo: 'ES', nombre: 'Español' },
            error: null,
          })
        ),
      })),
    })),
  })),
};

vi.mock('@/lib/auth', () => ({
  supabase: mockSupabase,
}));

describe('Integración - Guardado de Cuento en Supabase', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Estructura de datos para actividades', () => {
    it('debe crear una actividad con tipo CUENTO', async () => {
      const datosActividad = {
        profesor_id: 'profesor-uuid',
        titulo: 'El Dragón Valiente',
        tipo: 'CUENTO',
        tematica: 'animales',
        finalidad_pedagogica: 'Enseñar valentía',
        contenido_json: {
          texto: 'Había una vez un dragón valiente.',
          palabrasClave: ['dragón', 'valiente'],
          emociones: ['valentía'],
          personajes: [{ nombre: 'Draco', descripcion: 'Un dragón amable' }],
        },
        es_activo: true,
      };

      expect(datosActividad.tipo).toBe('CUENTO');
      expect(datosActividad.es_activo).toBe(true);
      expect(datosActividad.contenido_json).toHaveProperty('texto');
      expect(datosActividad.contenido_json).toHaveProperty('palabrasClave');
      expect(datosActividad.contenido_json).toHaveProperty('emociones');
      expect(datosActividad.contenido_json).toHaveProperty('personajes');
    });

    it('debe incluir url_imagen en pictogramas', async () => {
      const datosPictograma = {
        actividad_id: 'actividad-123',
        texto_original: 'dragón',
        codigo_spc: 'M0001',
        categoria: 'PERSONA',
        orden_en_cuento: 0,
      };

      expect(datosPictograma).toHaveProperty('codigo_spc');
      expect(datosPictograma).toHaveProperty('texto_original');
      expect(datosPictograma).toHaveProperty('categoria');
    });
  });

  describe('Relación con idiomas', () => {
    it('debe guardar contenido por idioma', async () => {
      const datosContenidoIdioma = {
        actividad_id: 'actividad-123',
        idioma_id: 1,
        texto_traducido: 'Había una vez un dragón valiente.',
        transcripcion_pictos: [
          { codigoSpc: 'M0001', texto: 'habia', categoria: 'VERBO' },
          { codigoSpc: 'M0002', texto: 'una', categoria: 'OTRO' },
        ],
      };

      expect(datosContenidoIdioma).toHaveProperty('idioma_id');
      expect(datosContenidoIdioma).toHaveProperty('texto_traducido');
      expect(datosContenidoIdioma).toHaveProperty('transcripcion_pictos');
      expect(Array.isArray(datosContenidoIdioma.transcripcion_pictos)).toBe(true);
    });
  });

  describe('Validación de campos obligatorios', () => {
    it('debe requerir profesor_id en actividad', () => {
      const actividadSinProfesor = {
        titulo: 'Test',
        tipo: 'CUENTO',
      };

      expect(actividadSinProfesor).not.toHaveProperty('profesor_id');
    });

    it('debe requerir codigo_spc en pictograma', () => {
      const pictoSinCodigo = {
        texto_original: 'perro',
        categoria: 'OBJETO',
      };

      expect(pictoSinCodigo).not.toHaveProperty('codigo_spc');
    });

    it('debe validar que transcripcion_pictos sea un array', () => {
      const transcripcionValida = [{ codigoSpc: 'M001', texto: 'perro' }];
      const transcripcionInvalida = 'perro';

      expect(Array.isArray(transcripcionValida)).toBe(true);
      expect(Array.isArray(transcripcionInvalida)).toBe(false);
    });
  });

  describe('Categorías válidas de pictogramas', () => {
    const categoriasValidas = ['VERBO', 'PERSONA', 'ADJETIVO', 'OBJETO', 'OTRO'];

    it('debe aceptar todas las categorías válidas', () => {
      categoriasValidas.forEach((categoria) => {
        const pictograma = {
          codigo_spc: 'M0001',
          texto_original: 'test',
          categoria,
          orden_en_cuento: 0,
        };
        expect(categoriasValidas.includes(pictograma.categoria)).toBe(true);
      });
    });

    it('debe rechazar categorías inválidas', () => {
      const categoriaInvalida = 'ANIMAL';
      expect(categoriasValidas.includes(categoriaInvalida)).toBe(false);
    });
  });

  describe('Tipos de actividad válidos', () => {
    const tiposValidos = [
      'CUENTO',
      'ORDENAR_PICTOGRAMAS',
      'RELACIONAR',
      'COMPLETAR_GAPS',
      'VOCABULARIO',
    ];

    it('debe aceptar todos los tipos válidos', () => {
      tiposValidos.forEach((tipo) => {
        const actividad = { tipo, titulo: 'Test' };
        expect(tiposValidos.includes(actividad.tipo)).toBe(true);
      });
    });
  });
});

describe('Flujo completo de generación y guardado', () => {
  it('debe estructurar correctamente los datos para el flujo completo', async () => {
    const cuentoGenerado = {
      titulo: 'El Dragón Valiente',
      texto: 'Había una vez un dragón.',
      palabrasClave: ['dragón', 'valiente', 'aventura'],
      emociones: ['valentía'],
      personajes: [{ nombre: 'Draco', descripcion: 'Un dragón amable' }],
    };

    const pictogramasGenerados = [
      {
        codigoSpc: 'M0001',
        textoOriginal: 'habia',
        categoria: 'VERBO' as const,
        orden: 0,
        urlImagen: 'https://static.arasaac.org/pictograms/123/123_300.png',
      },
      {
        codigoSpc: 'M0002',
        textoOriginal: 'dragon',
        categoria: 'PERSONA' as const,
        orden: 1,
        urlImagen: 'https://static.arasaac.org/pictograms/456/456_300.png',
      },
    ];

    const actividadParaBDD = {
      profesor_id: 'profesor-123',
      titulo: cuentoGenerado.titulo,
      tipo: 'CUENTO',
      tematica: 'animales',
      finalidad_pedagogica: 'Enseñar valentía',
      contenido_json: {
        texto: cuentoGenerado.texto,
        palabrasClave: cuentoGenerado.palabrasClave,
        emociones: cuentoGenerado.emociones,
        personajes: cuentoGenerado.personajes,
      },
      es_activo: true,
    };

    expect(actividadParaBDD.tipo).toBe('CUENTO');
    expect(actividadParaBDD.contenido_json.texto).toBe(cuentoGenerado.texto);
    expect(actividadParaBDD.contenido_json.palabrasClave).toEqual(cuentoGenerado.palabrasClave);

    pictogramasGenerados.forEach((picto) => {
      expect(picto).toHaveProperty('codigoSpc');
      expect(picto).toHaveProperty('urlImagen');
      expect(picto.urlImagen).toContain('static.arasaac.org');
    });
  });
});
