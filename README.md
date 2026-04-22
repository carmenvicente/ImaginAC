# ImaginAC

**ImaginAC** es una plataforma de generador de cuentos con Inteligencia Artificial y transcritos a pictogramas para la accesibilidad cognitiva.

## Objetivo

Proporcionar herramientas para crear contenido educativo adaptado, generando cuentos con pictogramas SPC (Sistema Pictográfico de Comunicación) en múltiples idiomas.

## Funcionalidades Principales

- **Motor Cognitivo:** Generación de cuentos con transcripción a pictogramas
- **Módulo Multi-Idioma:** Soporte para Español, Catalán, Valenciano, Gallego, Euskera y más
- **Exportación PDF:** Generación de cómics físicos para uso en el aula

## Inicio Rápido

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Stack Tecnológico

- **Frontend:** Next.js 16, React 19, TypeScript
- **Estilos:** Tailwind CSS v4
- **Base de Datos:** PostgreSQL con Supabase + Drizzle ORM
- **Autenticación:** Supabase Auth con RBAC
- **IA:** Google Generative AI (gemini-1.5-flash-001)

## Estructura del Proyecto

```
src/
├── app/              # Rutas y páginas (App Router)
├── components/       # Componentes React
│   ├── home/        # Componentes públicos
│   ├── profesor/    # Panel de profesor
│   └── ui/          # Componentes compartidos
├── lib/              # Utilidades y lógica de negocio
│   ├── db/          # Drizzle schema y cliente Supabase
│   ├── ia/          # Generador de cuentos y módulo ARASAAC
│   └── stores/      # Zustand stores
└── locales/         # Ficheros i18n (es, ca, va, gl, eu, en, de, fr, it)
```

## Licencia

Privado - Proyecto en desarrollo.
