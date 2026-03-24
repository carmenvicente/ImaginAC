# Resumen de Sesión - AdaptAC

**Fecha:** 2024-03-24 (sesión completa)
**Proyecto:** AdaptAC - Accesibilidad Cognitiva para Profesores PT y Alumnos

---

## 1. Frontend y UI

### Navbar Global

- Componente `Navbar.tsx` con logo AdaptAC (#40E0D0), enlaces (Inicio, Cuentos, Sobre Nosotros)
- Selector de idiomas (`LanguageSwitcher`) integrado con estado global Zustand
- Menú hamburguesa responsive (<768px)
- Botón "Acceder" con color #F4A460

### Hero Section

- Imagen de fondo Unsplash con overlay turquesa (#40E0D0)
- Título y subtítulo traducibles (18 idiomas)
- CTA "Acceder a la App" centrado
- Responsive con clases `text-3xl sm:text-4xl md:text-5xl lg:text-6xl`
- Bug fix: eliminación de texto duplicado

### Footer Global

- 4 columnas: Info, Enlaces, Legal, Pictogramas
- Atribución ARASAAC con placeholder para logo
- Enlace a Configuración

### CookiesBanner

- Banner fijo inferior con persistencia localStorage
- Traducible (18 idiomas)

---

## 2. Rutas Estáticas y Legales

### Páginas Creadas (sin autenticación)

| Ruta              | Archivo                           |
| ----------------- | --------------------------------- |
| `/privacidad`     | `src/app/privacidad/page.tsx`     |
| `/terminos`       | `src/app/terminos/page.tsx`       |
| `/sobre-nosotros` | `src/app/sobre-nosotros/page.tsx` |
| `/configuracion`  | `src/app/configuracion/page.tsx`  |

### Rutas Públicas en Proxy

```typescript
const RUTAS_PUBLICAS = [
  '/',
  '/login',
  '/registro',
  '/privacidad',
  '/terminos',
  '/sobre-nosotros',
  '/configuracion',
  '/profesor/crear-cuento',
];
```

### Arquitectura de Navegación

- Todas las páginas legales usan Navbar + Footer globales
- Selector de idiomas unificado con Zustand
- 18 idiomas con traducciones completas

---

## 3. Arquitectura de Cuentos

### Stack Original

- Formulario existente en `src/app/profesor/crear-cuento/page.tsx`
- Componente `FormularioCrearCuento.tsx` (NO modificado internamente)

### Modificación para Demo Público

**OPCIÓN A - Modo Demo:**

- Página envuelta con Navbar + Footer globales
- `profesorId="demo"` hardcodeado
- Sin guardado en Supabase (omitido para demos)
- Genera cuentos visualmente sin persistencia

### Layout Excepción (Anti-Doble Candado)

```typescript
const RUTA_PUBLICA = '/profesor/crear-cuento';

export default function LayoutProfesor({ children }) {
  const esRutaPublica = pathname === RUTA_PUBLICA;

  // Solo protege otras rutas de /profesor/*
  if (!esRutaPublica && !profesor) {
    router.push('/login');
  }

  // Header solo para rutas protegidas
  {!esRutaPublica && <header>...</header>}
}
```

### Reglas Aplicadas

- REGLA ANTIRROTURA: Componente `FormularioCrearCuento` intacto
- El cambio se hace solo en el wrapper (`page.tsx`)
- El layout `profesor/layout.tsx` tiene excepción para `/profesor/crear-cuento`

---

## 4. Grounding Legal (ARASAAC)

### Licencia Creative Commons CC BY-NC-SA

**Autor:** Sergio Palao
**Origen:** ARASAAC (http://www.arasaac.org)
**Propiedad:** Gobierno de Aragón (España)
**Licencia:** CC BY-NC-SA

### Inyección Obligatoria

#### 1. Footer (placeholder para logo)

```tsx
<div className="w-20 h-20 border-2 border-dashed">
  [Logo ARASAAC]
</div>
<p>Autor: Sergio Palao. Origen: ARASAAC. Licencia: CC BY-NC-SA</p>
```

#### 2. Página Cuentos (`/profesor/crear-cuento`)

Al final de cada cuento generado en `VisorCuento.tsx`:

```tsx
<div className="bg-gray-100 p-4 rounded-lg">
  <strong>Autor pictogramas:</strong> Sergio Palao.
  <strong>Origen:</strong> ARASAAC...
  <strong>Licencia:</strong> CC (BY-NC-SA).
  <strong>Propiedad:</strong> Gobierno de Aragón (España)
</div>
```

#### 3. Página Sobre Nosotros

Sección dedicada con:

- Placeholder para logo ARASAAC
- Texto completo de atribución
- Deslinde: "El Gobierno de Aragón no se hace responsable..."

#### 4. Términos de Uso

Sección "Propiedad Intelectual" con atribución completa y deslinde legal.

### Texto Legal Obligatorio (exacto)

```
Autor pictogramas: Sergio Palao.
Origen: ARASAAC (http://www.arasaac.org).
Licencia: CC (BY-NC-SA).
Propiedad: Gobierno de Aragón (España)
```

---

## Estado del Proyecto

| Componente                | Estado                  |
| ------------------------- | ----------------------- |
| Navbar + LanguageSwitcher | ✅ Funcional            |
| Hero Section              | ✅ Responsive           |
| Footer + CookiesBanner    | ✅ Funcional            |
| Rutas públicas            | ✅ Configuradas         |
| Página crear-cuento       | ✅ Demo público         |
| Atribución ARASAAC        | ✅ En todos los lugares |
| Tests                     | 35 passing              |

---

## Stack Tecnológico

- Next.js 16.2.0
- React 19
- TypeScript
- Tailwind CSS
- Zustand (estado global)
- Supabase
- Google Gemini (IA)

---

## Fases Completadas (Histórico)

| Fase | Descripción                                   | Estado          |
| ---- | --------------------------------------------- | --------------- |
| 1    | Scaffold + Configuración base                 | ✅ Validada     |
| 1.5  | Base de datos Supabase (7 tablas + RLS)       | ✅ Validada     |
| 2    | Autenticación + RBAC                          | ✅ Validada     |
| 3    | Motor Cognitivo (Generador de Cuentos con IA) | ✅ Validada     |
| 4    | Testing con Vitest                            | ✅ Implementada |
| 5    | Rediseño Home + Rutas públicas                | ✅ Implementada |

---

## Sesión 2024-03-23 - Estabilización Demo y Footer ARASAAC

### Cambios Aplicados por la Orquestadora

1. **UI Fix - Layout Público:**
   - La Orquestadora asume control manual de la UI
   - Removido el "corsé" del `layout.tsx` público para `/profesor/crear-cuento`
   - Navbar ahora pegado al borde superior (eliminado `py-8` del `<main>`)

2. **Logo ARASAAC Inyectado:**
   - Archivo `public/logo_ARASAAC_black.png` creado
   - **Footer:** Reemplazado placeholder por `<img src="/logo_ARASAAC_black.png" className="h-12 w-auto mx-auto" />`
   - **FormularioCuentos:** Atribución visible bajo el botón de generación

3. **Lógica Demo Bypass Supabase:**
   - API route `/api/cuentos/generar` detecta `profesorId === 'demo'`
   - Si es demo: genera con IA y retorna datos inline, **omitiend INSERT en Supabase**
   - Si es usuario real: flujo normal con autenticación y guardado en BD
   - Formulario muestra cuento generado directamente en pantalla (modo demo)

### Archivos Modificados

| Archivo                                             | Cambio                                               |
| --------------------------------------------------- | ---------------------------------------------------- |
| `src/app/profesor/crear-cuento/page.tsx`            | Eliminado padding superior del main                  |
| `src/components/home/Footer.tsx`                    | Logo ARASAAC real inyectado                          |
| `src/components/profesor/FormularioCrearCuento.tsx` | Atribución ARASAAC visible + estado para cuento demo |
| `src/app/api/cuentos/generar/route.ts`              | Bifurcación demo vs normal                           |

### Estado Final

- Build: ✓ passing
- Demo mode: ✓ funcional
- Footer logo: ✓ visible
- Atribución ARASAAC: ✓ en todos los puntos requeridos

---

## Sesión 2024-03-24 - Sistema i18n y Restricciones de UI/Prompt

### 1. Sistema de Internacionalización (i18n)

#### Arquitectura Decidida

- **SISTEMA ACTUAL:** Zustand store (`useLanguageStore.ts`) con diccionarios `traduccionesUI`
- **DECISIÓN:** NO migrar a `next-intl`. Mantener el sistema Zustand existente
- **JUSTIFICACIÓN:** Ya está implementado y funcionando. No requiere cambios de infraestructura.

#### Traducciones Completadas (18 idiomas)

- ES, EN, CA, VA, GL, EU, FR, DE, IT, PT, NL, PL, RU, ZH, JA, KO, AR, HI

#### Claves Traducidas (por idioma)

| Categoría      | Claves                                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Configuración  | `configTitulo`, `configIdioma`, `configIdiomaDesc`, `configPrivacidad`, `configPoliticaPrivacidad`, `configTerminos`, `configAcerca`, `configDescripcion`, `configTecnologias`                                                                                                                                                                                                                             |
| Sobre Nosotros | `sobreNosotrosTitulo`, `sobreNosotrosMision`, `sobreNosotrosMisionTexto`, `sobreNosotrosPicto`, `sobreNosotrosPictoTexto`, `atribucionArasaac`, `atribucionArasaacTexto`, `deslindeAragon`, `tecnologias`, `derechosReservados`                                                                                                                                                                            |
| Términos       | `terminosTitulo`, `terminosAceptacion`, `terminosAceptacionTexto`, `terminosDescripcion`, `terminosDescripcionTexto`, `terminosUsoAceptable`, `terminosUsoTexto`, `terminosPropiedad`, `terminosPropiedadTexto`, `terminosLimitacion`, `terminosLimitacionTexto`, `terminosModificacion`, `terminosModificacionTexto`, `terminosContacto`, `terminosContactoTexto`                                         |
| Privacidad     | `privacidadTitulo`, `privacidadIntro`, `privacidadIntroTexto`, `privacidadDatos`, `privacidadUso`, `privacidadUsoTexto`, `privacidadCookies`, `privacidadCookiesTexto`, `privacidadCookiesAdicional`, `privacidadProteccion`, `privacidadProteccionTexto`, `privacidadDerechos`, `privacidadDerechosTexto`, `privacidadTerceros`, `privacidadTercerosTexto`, `privacidadCambios`, `privacidadCambiosTexto` |
| Formulario     | `formTituloCuento`, `formPlaceholderTitulo`, `formTematica`, `formSelectTematica`, `formFinalidad`, `formPlaceholderFinalidad`, `formCaracteres`, `formLongitud`, `formCorto`, `formMedio`, `formLargo`, `formPalabras`, `formResumen`, `formLabelTitulo`, `formLabelTematica`, `formLabelIdioma`, `formLabelLongitud`, `formSinDefinir`, `formGenerando`, `formBotonGenerar`                              |
| Dropdown       | `formPalabras100`, `formPalabras200`, `formPalabras300`                                                                                                                                                                                                                                                                                                                                                    |

### 2. Preselección Inteligente de Idioma

#### Lógica Implementada

```typescript
// FormularioCrearCuento.tsx
const idiomaGlobal = useLanguageStore((s) => s.idiomaActual);

useEffect(() => {
  const borrador = cargarBorrador();
  // ...
  const idiomaDelBorrador = borrador.idioma && borrador.idioma.trim() !== '';
  setIdioma(idiomaDelBorrador ? borrador.idioma : idiomaGlobal);
}, [idiomaGlobal]);
```

#### Regla de Negocio

- Selector de idioma del cuento se preselecciona con idioma global de la web
- Usuario puede cambiar independientemente sin afectar el global
- Si existe borrador previo con idioma, lo respeta

### 3. Restricciones de UI - Selector de Longitud

#### Cambio Implementado

| Antes                                   | Después                            |
| --------------------------------------- | ---------------------------------- |
| Radio buttons: `corto/medio/largo`      | Dropdown: `100/200/300`            |
| Mapeo a `100/300/600` palabras          | Valores directos                   |
| Etiquetas: "Micro", "Corto", "Estándar" | Solo número + "palabras/words/etc" |

#### Archivos Modificados

- `FormularioCrearCuento.tsx`:
  - Estado: `useState<'100' | '200' | '300'>('200')`
  - Radio buttons → `<select>` con 3 opciones
  - Envío: `longitud: Number(longitud)`

### 4. Grounding del Prompt - Título Obligatorio

#### Reglas Añadidas al System Prompt

```typescript
// prompt-cuento.ts
REGLAS DE GROUNDING DEL TÍTULO (ABSOLUTAS):
* USA EXACTAMENTE el título proporcionado por el usuario: "${datos.titulo}"
* PROHIBIDO generar, modificar, abreviar o inventar un título alternativo
* El campo "titulo" en el JSON DEBE ser idéntico a "${datos.titulo}"
* Si el título original tiene errores de ortografía, cópialos exactamente igual
* NO añadas comillas, signos de exclamación ni modificaciones de ningún tipo
```

#### Verificación en Salida

```typescript
SALIDA REQUERIDA (JSON EXACTO):
{
  "titulo": "${datos.titulo}",  // Título exacto del usuario
  // ...
}
REGLA CRÍTICA DE TÍTULO: El valor de "titulo" en el JSON DEBE ser "${datos.titulo}" exactamente.
```

### 5. Fixes Críticos Aplicados

| Bug                                 | Solución                                                | Archivo                     |
| ----------------------------------- | ------------------------------------------------------- | --------------------------- |
| Error "Unexpected token '<'" en API | Añadir `/api/cuentos/generar` a `RUTAS_PUBLICAS`        | `src/proxy.ts`              |
| Warning `src=""` en pictogramas     | Renderizado condicional: `picto.urlImagen ? ... : null` | `FormularioCrearCuento.tsx` |
| Navbar no pegado al borde           | Eliminar `py-8` del `<main>`                            | `page.tsx`                  |

### 6. Archivos Clave del Proyecto

```
src/
├── lib/stores/useLanguageStore.ts    # Diccionario i18n + estado global
├── lib/ia/prompt-cuento.ts          # System prompt con grounding
├── components/profesor/
│   └── FormularioCrearCuento.tsx    # Formulario con dropdown + demo mode
├── app/api/cuentos/generar/route.ts # API con bypass demo
└── proxy.ts                         # Middleware/auth
```

### 7. Estado Final

| Componente                      | Estado          |
| ------------------------------- | --------------- |
| Dropdown longitud (100/200/300) | ✅ Implementado |
| Grounding título IA             | ✅ Implementado |
| Traducciones 18 idiomas         | ✅ Completas    |
| Preselección idioma             | ✅ Funcional    |
| Demo mode (sin Supabase)        | ✅ Funcional    |
| Build                           | ✅ Passing      |

---

**Última actualización:** 2024-03-24
