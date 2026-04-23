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
- **Base de Datos:** Supabase (PostgreSQL) + Drizzle ORM
- **Autenticación:** Supabase Auth
- **IA:** Google Gemini (`gemini-2.5-flash-lite`)
- **Pictogramas:** ARASAAC (http://www.arasaac.org)

## Inicio Rápido

```bash
npm install
npm run dev
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
│   ├── db/               # Schema Drizzle y cliente Supabase
│   ├── ia/               # Generador de cuentos y módulo ARASAAC
│   └── stores/           # Estado global (Zustand)
└── locales/              # Traducciones (es, ca, va, gl, eu, en, fr, de, it)
```

## Licencia

Privado — Proyecto en desarrollo.
