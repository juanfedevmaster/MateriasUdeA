# Análisis del sitio — profejuanfe.dev
**Fecha:** 2026-11-22
**Alcance:** Análisis completo del repositorio GITMateriasUdeA — paleta, tipografía, arquitectura CSS/JS, estructura HTML de todas las páginas, estado real de los cuatro cursos y detección de inconsistencias entre la documentación existente y el código fuente actual.

---

## Estado general

Sitio web estático puro. Sin build step, sin npm, sin framework, sin bundler.
Desplegado en Azure Static Web Apps vía GitHub Actions en cada push a `main`.
`staticwebapp.config.json` define solo `globalHeaders: { "Cache-Control": "no-cache" }`.

---

## Estructura de carpetas verificada

```
GITMateriasUdeA/
├── index.html                        Home — grid de asignaturas + sección de repositorios
├── staticwebapp.config.json
├── .github/workflows/                CI/CD → Azure SWA
├── assets/
│   ├── css/
│   │   ├── variables.css             ÚNICA fuente de tokens de diseño
│   │   ├── home.css                  Solo index.html raíz
│   │   ├── course.css                Solo <curso>/index.html
│   │   ├── profile.css               Solo perfil-del-profesor/index.html
│   │   └── slides.css                Visor de diapositivas + @media print → PDF
│   ├── js/
│   │   ├── main.js                   Renderiza semanas/sesiones desde TOPICS
│   │   ├── slides.js                 Navegación del visor (teclado/flechas/swipe/hash)
│   │   ├── deck-nav.js               Navegación entre decks del mismo curso
│   │   ├── course-filter.js          Filtro de búsqueda en índice de curso
│   │   ├── share.js                  Botón Compartir (navigator.share + clipboard)
│   │   └── i18n.js                   Internacionalización ES/EN (solo home)
│   ├── i18n/
│   │   ├── es.json                   Textos en español
│   │   └── en.json                   Textos en inglés
│   └── img/
│       ├── og-image.png              Open Graph 1200×630
│       ├── logo-horizontal-cream.png
│       ├── logo-vertical-cream.png
│       └── juanfe-profile.png
├── perfil-del-profesor/index.html
├── tecnicas-de-programacion/
├── calidad-de-software/
├── arquitectura-de-software/
└── diseno-y-analisis-2/
```

---

## Paleta de colores — estado actual (verificado en variables.css)

### Tokens primitivos

| Variable | Valor | Uso |
|---|---|---|
| `--vellum` | `#f1eee3` | Crema — fondo principal modo claro |
| `--vellum-dim` | `#e7e2d2` | Crema oscurecido — superficies / tarjetas |
| `--ink` | `#16233a` | Azul casi negro — texto sobre fondo claro |
| `--ink-soft` | `#4a5773` | Azul grisáceo — texto secundario |
| `--amber` | `#e2a63b` | Ámbar — único acento del sitio |
| `--amber-dim` | `rgba(226,166,59,0.15)` | Ámbar transparente — hover suaves |
| `--blueprint` | `#0f2038` | Azul oscuro — hero, footer, fondo del visor |
| `--blueprint-deep` | `#0a182c` | Azul casi negro — footer, stage del deck |
| `--line` | `#bfdcef` | Azul claro — texto sobre fondo blueprint |
| `--line-dim` | `rgba(191,220,239,0.18)` | Azul transparente — bordes en fondos oscuros |
| `--line-soft` | `#afc7de` | Azul claro secundario — subtítulos sobre blueprint |
| `--line-muted` | `#7c97b4` | Azul atenuado — etiquetas/footer sobre blueprint |
| `--green-live` | `#2e7d4f` | Verde — badge "Disponible" |

### Alias semánticos (modo claro)

| Alias | Apunta a |
|---|---|
| `--bg` | `--vellum` |
| `--surface` | `--vellum-dim` |
| `--surface-2` | `#ece5d4` |
| `--text` | `--ink` |
| `--text-muted` | `--ink-soft` |
| `--accent` | `--amber` |
| `--accent-2` | `--amber` |
| `--border` | `rgba(22,35,58,0.14)` |

### Override en hero y visor (modo oscuro local)

`.home-sheet`, `.course-sheet`, `.deck-body` redefinen los alias:
```css
--bg: var(--blueprint);
--text: var(--line);
--text-muted: var(--line-muted);
--border: var(--line-dim);
```

Grid blueprint del hero:
```css
background: linear-gradient(rgba(191,220,239,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(191,220,239,0.08) 1px, transparent 1px),
            linear-gradient(135deg, var(--surface), var(--bg));
background-size: 32px 32px, 32px 32px, cover;
```

### Color de relleno de íconos SVG en decks

`fill="#59a87d"` — verde claro. Contrasta con `--blueprint`. No cambiar a ámbar.

---

## Tipografía

### Variables CSS (variables.css)

| Variable | Stack |
|---|---|
| `--font-heading` | `"Georgia", "Iowan Old Style", "Palatino Linotype", serif` |
| `--font-body` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` |
| `--font-mono` | `"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace` |

### Clases Google Fonts (cargadas en home e índices de curso, NO en decks)

| Clase | Fuente | Uso |
|---|---|---|
| `.home-display` | Space Grotesk | Títulos `<h1>`, `<h2>`, `<h3>`, nombres de tarjeta |
| `.home-mono` | IBM Plex Mono | Códigos, etiquetas, contadores, marca "JF", footer |

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
```

### Otros tokens de diseño

```css
--radius: 12px;
--radius-sm: 8px;
--shadow: 0 10px 30px rgba(0,0,0,0.35);
--transition: 220ms cubic-bezier(0.4,0,0.2,1);
```

---

## Arquitectura CSS

Una hoja por tipo de página — sin hoja global de componentes:

| Archivo | Usada en |
|---|---|
| `variables.css` | Todas las páginas (siempre primera) |
| `home.css` | `index.html` raíz |
| `course.css` | `<curso>/index.html` |
| `profile.css` | `perfil-del-profesor/index.html` |
| `slides.css` | Todos los decks |

Cambios de layout compartido requieren editar múltiples archivos CSS.
Solo colores/tokens son globales vía `variables.css`.

---

## Arquitectura JavaScript

Todos los scripts son IIFEs `(function(){ ... })()`. Sin módulos ES, sin bundler.
Scripts siempre al final del `<body>`.

| Script | Función |
|---|---|
| `main.js` | Lee `TOPICS` global, construye DOM de semanas/sesiones, actualiza `#content-stats` |
| `slides.js` | Calcula frame 16:9 (`sizeFrame`), gestiona navegación por teclado/swipe/hash |
| `deck-nav.js` | Lee `TOPICS`, extrae slug del pathname, conecta prev/next/picker entre decks |
| `course-filter.js` | Búsqueda en tiempo real sobre `.week` y `.session` generados por `main.js` |
| `share.js` | `navigator.share()` con fallback a clipboard |
| `i18n.js` | Carga `assets/i18n/{lang}.json`, aplica `data-i18n` y `data-i18n-title`. Solo en home |

---

## Patrones HTML

### Secciones del home (index.html raíz)

```
<section class="home-sheet">   hero blueprint con .reg-mark + .title-block
<section class="presenta">     avatar + nombre + links + enlace a perfil
<section class="home-courses"> grid de asignaturas (.home-grid)
<section class="home-courses"> grid de repositorios GitHub
<footer class="home-footer">
```

Scripts al final: `share.js`, `i18n.js`. Body lleva `data-i18n-page="home"`.

### Índice de curso (`<curso>/index.html`)

```
<section class="course-sheet">  hero compacto
<section class="course-content"> .course-filter + #weeks-container
<footer class="course-footer">
```

Scripts al final: `topics.js` → `main.js` → `course-filter.js` → `share.js`.
Sin i18n. Sin `data-i18n-page`.

### Deck de diapositivas

```
<div class="deck">
  <div class="deck-topbar">    nav: inicio, curso, prev/picker/next, acciones
  <div class="progress-track"> barra de progreso
  <div class="deck-stage" id="deck-stage" data-sheet="{CÓDIGO}">  slides aquí
  <div class="deck-footer">    contador
```

CSS: solo `variables.css` + `slides.css`. Sin Google Fonts.
Scripts al final: `slides.js` → `topics.js` → `deck-nav.js` → `share.js`.

### `topics.js`

```js
const TOPICS = [
  { week: N, slug: "kebab-case", title: "Título", subtitle: "Resumen", available: true|false }
];
```

`week: 0` → etiqueta "Presentación". `available: false` → badge "Próximamente", sin enlace.
Agregar entrada con `available: true` conecta automáticamente el índice y la navegación.

---

## Estado real de los cursos (verificado en topics.js y carpetas)

| Asignatura | Código | Sesiones en topics.js (available:true) | Carpetas en presentaciones/ |
|---|---|---|---|
| Técnicas de Programación | 2508307 | ~34 | ~33 |
| Calidad de Software | 2554703 | 18 | 17 |
| Arquitectura de Software | 2554608 | ~35 | ~34 |
| Análisis y Diseño 2 | 2554506 | ~44 | ~43 |

Todas marcadas `home-status live` ("Disponible") en el home — verificado en `index.html`.

Semana inicial de cada curso:
- Técnicas, Calidad, Arquitectura: empiezan en `week: 0` (Presentación del curso).
- Análisis y Diseño 2: empieza en `week: 1` (sin `week: 0`).

---

## Convención de íconos en decks

- Solo illustrativos por slide — nunca sprite global.
- Fuente prioritaria: Simple Icons (logos de marca). CDN: `cdn.jsdelivr.net/npm/simple-icons@latest/icons/<slug>.svg`
- Segunda opción: Font Awesome Free (conceptos genéricos). CDN: `cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free/svgs/solid/<icon>.svg`
- Proceso: descargar SVG → `fill="#59a87d"` → guardar en `presentaciones/<slug>/img/`.
- Íconos de topbar/nav: SVG inline con `fill="currentColor"`.
- Cada deck es dueño exclusivo de sus SVGs.

---

## Rutas relativas por profundidad

| Desde | Hacia assets/ | Hacia index.html raíz |
|---|---|---|
| `index.html` (raíz) | `assets/css/...` | `#` |
| `<curso>/index.html` | `../assets/css/...` | `../index.html` |
| `<curso>/presentaciones/<slug>/index.html` | `../../../assets/css/...` | `../../../index.html` |
| `perfil-del-profesor/index.html` | `../assets/css/...` | `../index.html` |

---

## Generación de PDF

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --no-sandbox \
  --print-to-pdf="<curso>/pdfs/<slug>.pdf" \
  --no-pdf-header-footer --virtual-time-budget=4000 \
  "file:///ruta/absoluta/<curso>/presentaciones/<slug>/index.html"
```

Verificar páginas vs slides:
```bash
pdftotext -layout <curso>/pdfs/<slug>.pdf - | awk 'BEGIN{RS="\f"}{c++}END{print c}'
```

---

## Inconsistencias detectadas

### 1. Documentación interna desactualizada — estado de los cursos

**Archivos afectados:**
- `.claude/0.EstrucutraWebSite.md` (§11 y §2)
- `.claude/agents/analizador-sitio.md` (§1 mapa del repositorio)
- `.claude/agents/constructor-paginas.md` (§1C)

**Problema:** los tres documentos describen `arquitectura-de-software/` y
`diseno-y-analisis-2/` como cursos "Próximamente" o "sin contenido". En la realidad actual:
- Ambos cursos tienen `topics.js` con ~35 y ~44 sesiones respectivamente, todas con
  `available: true`.
- Ambos tienen carpetas `presentaciones/` con decks reales.
- El `index.html` raíz los muestra con `home-status live` ("Disponible").

**Acción recomendada:** actualizar los tres documentos para reflejar que los 4 cursos están
disponibles con contenido. La frase "sin crear contenido ahí sin confirmación" en el agente
constructor-paginas ya no aplica.

### 2. Paleta documentada vs paleta real

**Archivo afectado:** `.claude/0.EstrucutraWebSite.md` (§5 "Sistema de diseño")

**Problema:** el documento describe una paleta con `--color1` / `--color2` / `--color3` /
`--color4` / `--color5` (verde/crema/vino). La paleta real en `variables.css` usa
`--vellum` / `--amber` / `--blueprint` / `--line` etc. (crema/ámbar/azul).

**Acción recomendada:** actualizar §5 de `0.EstrucutraWebSite.md` con la paleta actual.
Los agentes `analizador-sitio.md` y `constructor-paginas.md` ya documentan la paleta
correcta.

### 3. Discrepancia topics.js vs carpetas presentaciones/ (menor)

En todos los cursos hay exactamente 1 sesión en `topics.js` (available:true) sin carpeta
correspondiente en `presentaciones/`. Puede ser una sesión en progreso de creación o un
deck que falta subir. No bloquea el funcionamiento (la sesión aparece como enlace en el
índice del curso pero la URL destino da 404).

**Acción recomendada:** verificar qué slug es el que falta en cada curso y crear o subir
el deck correspondiente, o marcarlo temporalmente `available: false`.
