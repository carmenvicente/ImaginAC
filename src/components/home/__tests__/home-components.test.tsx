import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { CookiesBanner } from '../CookiesBanner';
import { LanguageSwitcher } from '../LanguageSwitcher';
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
    expect(screen.getByRole('dialog', { name: /aviso de cookies/i })).toBeInTheDocument();
  });

  it('debe ocultar el banner si ya se aceptaron las cookies', () => {
    localStorageMock.getItem.mockReturnValue('true');
    const { container } = render(<CookiesBanner />);
    expect(container.firstChild).toBeNull();
  });

  it('debe guardar en localStorage al pulsar Aceptar', () => {
    localStorageMock.getItem.mockReturnValue(null);
    render(<CookiesBanner />);
    const botonAceptar = screen.getByRole('button', { name: 'Aceptar' });
    fireEvent.click(botonAceptar);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('cookies_aceptadas', 'true');
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

  it('debe mostrar los 18 idiomas en el dropdown', () => {
    render(<LanguageSwitcher />);
    const boton = screen.getByRole('button', { name: /idioma actual/i });
    fireEvent.click(boton);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(18);
  });

  it('debe mantener el orden correcto de idiomas', () => {
    render(<LanguageSwitcher />);
    const boton = screen.getByRole('button', { name: /idioma actual/i });
    fireEvent.click(boton);
    const opciones = screen.getAllByRole('option');
    expect(opciones).toHaveLength(18);
    opciones.forEach((opcion, index) => {
      expect(opcion).toHaveTextContent(IDIOMAS_DISPONIBLES[index].nombre);
    });
  });

  it('debe cambiar el idioma al seleccionar una opción', () => {
    render(<LanguageSwitcher />);
    const boton = screen.getByRole('button', { name: /idioma actual/i });
    fireEvent.click(boton);
    const opcionFrances = screen.getByRole('option', { name: 'Francés' });
    fireEvent.click(opcionFrances);
    expect(screen.getByText('Francés')).toBeInTheDocument();
  });
});
