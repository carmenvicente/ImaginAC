# ImaginAC

**ImaginAC** es una plataforma web que genera cuentos con Inteligencia Artificial y los transcribe automáticamente a pictogramas ARASAAC, pensada para profesores de Pedagogía Terapéutica y alumnos con necesidades educativas especiales.

## Funcionalidades

- **Generación de cuentos con IA:** El usuario introduce un tema, personajes y contexto, y la IA genera un cuento estructurado en diapositivas.
- **Transcripción a pictogramas:** Cada frase del cuento se traduce automáticamente a pictogramas del sistema ARASAAC.
- **Exportación a PDF:** El cuento generado se puede descargar como cómic en formato PDF para usar en el aula.
- **Multilingüe:** Soporte para 9 idiomas — español, catalán, valenciano, gallego, euskera, inglés, francés, alemán e italiano.
- **Feedback integrado:** Widget para que los usuarios envíen sugerencias directamente desde la web.

## Stack Tecnológico

- **Frontend:** Next.js 16, React 19, TypeScript
- **Estilos:** Tailwind CSS v4
- **IA:** Google Gemini (`gemini-2.5-flash-lite`)
- **Pictogramas:** ARASAAC (http://www.arasaac.org)
- **Estado global:** Zustand

## Inicio Rápido

```bash
npm install
npm run dev
```

Crea un archivo `.env` en la raíz con tu clave de API:

```
GEMINI_API_KEY=tu_clave_aqui
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

```
src/
├── app/                  # Rutas y páginas (App Router)
│   ├── api/              # Endpoints (generar cuento, feedback)
│   ├── crear-cuento/     # Página principal de creación
│   ├── configuracion/    # Ajustes del usuario
│   └── sobre-nosotros/   # Información del proyecto
├── components/
│   ├── layout/           # Navbar, Footer, LanguageSwitcher
│   ├── home/             # HeroSection, CookiesBanner
│   ├── cuento/           # Formulario, visor y exportación PDF
│   └── ui/               # FeedbackWidget, SelectorIdioma
├── lib/
│   ├── ia/               # Generador de cuentos y módulo ARASAAC
│   └── stores/           # Estado global (Zustand)
└── locales/              # Traducciones (es, ca, va, gl, eu, en, fr, de, it)
```

## Pictogramas

Los pictogramas utilizados pertenecen a [ARASAAC](http://www.arasaac.org), autor Sergio Palao, bajo licencia CC (BY-NC-SA), propiedad del Gobierno de Aragón (España).

## Licencia

MIT — Proyecto de código abierto.
