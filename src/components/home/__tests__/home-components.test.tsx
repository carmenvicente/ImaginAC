import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CookiesBanner } from '../CookiesBanner';
import { LanguageSwitcher } from '../../layout/LanguageSwitcher';
import { IDIOMAS_DISPONIBLES } from '@/components/ui/SelectorIdioma';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: () => {
      store = {};
    },
    getStore: () => store,
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('CookiesBanner', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('debe mostrar el banner en primera visita', () => {
    localStorageMock.getItem.mockReturnValue(null);
    render(<CookiesBanner />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('debe ocultar el banner si ya se configuraron las cookies', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify({ necesarias: true }));
    const { container } = render(<CookiesBanner />);
    expect(container.firstChild).toBeNull();
  });

  it('debe guardar en localStorage al pulsar Aceptar todas', () => {
    localStorageMock.getItem.mockReturnValue(null);
    render(<CookiesBanner />);
    const botonAceptar = screen.getByRole('button', { name: /aceptar todas/i });
    fireEvent.click(botonAceptar);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'cookies_config_v1',
      JSON.stringify({ necesarias: true, analiticas: true, personalizacion: true })
    );
  });

  it('debe guardar solo esenciales al pulsar Solo esenciales', () => {
    localStorageMock.getItem.mockReturnValue(null);
    render(<CookiesBanner />);
    const botonEsenciales = screen.getByRole('button', { name: /solo esenciales/i });
    fireEvent.click(botonEsenciales);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'cookies_config_v1',
      JSON.stringify({ necesarias: true, analiticas: false, personalizacion: false })
    );
  });

  it('debe mostrar la vista de configuración al pulsar Configurar', () => {
    localStorageMock.getItem.mockReturnValue(null);
    render(<CookiesBanner />);
    const botonConfigurar = screen.getByRole('button', { name: /configurar/i });
    fireEvent.click(botonConfigurar);
    expect(screen.getByRole('button', { name: /guardar/i })).toBeInTheDocument();
  });
});

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    localStorageMock.clear();
    localStorageMock.getItem.mockReturnValue(null);
    vi.clearAllMocks();
  });

  it('debe mostrar el idioma por defecto (Español)', () => {
    render(<LanguageSwitcher />);
    expect(screen.getByText('Español')).toBeInTheDocument();
  });

  it('debe abrir el dropdown al hacer click', () => {
    render(<LanguageSwitcher />);
    const boton = screen.getByRole('button', { name: /idioma actual/i });
    fireEvent.click(boton);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it(`debe mostrar los ${IDIOMAS_DISPONIBLES.length} idiomas en el dropdown`, () => {
    render(<LanguageSwitcher />);
    const boton = screen.getByRole('button', { name: /idioma actual/i });
    fireEvent.click(boton);
    expect(screen.getAllByRole('option')).toHaveLength(IDIOMAS_DISPONIBLES.length);
  });

  it('debe mantener el orden correcto de idiomas', () => {
    render(<LanguageSwitcher />);
    const boton = screen.getByRole('button', { name: /idioma actual/i });
    fireEvent.click(boton);
    const opciones = screen.getAllByRole('option');
    opciones.forEach((opcion, index) => {
      expect(opcion).toHaveTextContent(IDIOMAS_DISPONIBLES[index].nombre);
    });
  });

  it('debe cambiar el idioma al seleccionar una opción', () => {
    render(<LanguageSwitcher />);
    const boton = screen.getByRole('button', { name: /idioma actual/i });
    fireEvent.click(boton);
    const opcionFrances = screen.getByRole('option', { name: 'Français' });
    fireEvent.click(opcionFrances);
    expect(screen.getByText('Français')).toBeInTheDocument();
  });
});
