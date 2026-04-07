# ImaginAC - Accesibilidad Cognitiva

**ImaginAC** es una plataforma de accesibilidad cognitiva diseñada para facilitar el aprendizaje de profesores PT (Pedagogía Terapéutica) y sus alumnos con necesidades educativas especiales.

## Objetivo

Proporcionar herramientas para crear contenido educativo adaptado, generando cuentos y actividades con pictogramas SPC (Sistema Pictográfico de Comunicación) en múltiples idiomas.

## Funcionalidades Principales

- **Sistema de Roles:** Paneles separados para Profesores PT y Alumnos
- **Motor Cognitivo:** Generación de cuentos con transcripción a pictogramas
- **Módulo Multi-Idioma:** Soporte para Español, Catalán, Valenciano, Gallego, Euskera y más
- **Sistema de Actividades:** Creación de actividades complementarias escalable
- **Exportación PDF:** Generación de cómics físicos para uso en el aula

## Inicio Rápido

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Stack Tecnológico

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript
- **Estilos:** Tailwind CSS
- **Base de Datos:** Supabase (PostgreSQL)
- **Autenticación:** NextAuth.js con RBAC

## Estructura del Proyecto

```
src/
├── app/              # Rutas y páginas
├── components/       # Componentes React
├── lib/              # Utilidades y lógica de negocio
├── types/            # Tipos TypeScript
└── hooks/            # React hooks personalizados
```

## Licencia

Privado - Proyecto en desarrollo.
