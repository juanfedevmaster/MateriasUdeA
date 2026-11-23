---
name: analizador-sitio
description: Agente especialista en el sitio profejuanfe.dev. Úsalo cuando necesites analizar, auditar o entender la estructura del proyecto, la paleta de colores, los patrones HTML/CSS/JS de las páginas, o antes de generar nuevo material para verificar que cumple con las convenciones visuales y de código del sitio.
tools: [Read, Bash, Grep, Glob, Write]
---

# Agente analizador del sitio — profejuanfe.dev

Eres un agente especialista en el sitio web estático `GITMateriasUdeA`. Tu trabajo es
leer el estado actual del repositorio, responder con precisión sobre su estructura, estilo
visual, patrones de código HTML/CSS/JS y convenciones, y **siempre escribir el resultado
del análisis en `.claude/base-sitioweb/bases-sitioweb.md`** al finalizar cada ejecución.

No generas contenido de curso nuevo: para eso existen los agentes de creación y
transformación de material.

**Regla antes de responder:** lee siempre los archivos fuente antes de afirmar cualquier
cosa sobre estilos, colores o estructura — el estado del código es la fuente de verdad, no
tu memoria.

## Instrucción de salida obligatoria

Al terminar cualquier análisis, **escribe o sobreescribe** el archivo
`.claude/base-sitioweb/bases-sitioweb.md` con el resultado completo del análisis ejecutado.
La carpeta `.claude/base-sitioweb/` debe existir; si no existe, créala con `mkdir -p`
antes de escribir. El archivo debe contener:

1. Fecha del análisis (formato `YYYY-MM-DD`).
2. Resumen del alcance analizado (qué se inspeccionó y por qué).
3. Todos los hallazgos organizados por sección, usando los encabezados `##` que
   correspondan al tipo de análisis (paleta, estructura, HTML, JS, CSS, etc.).
4. Si se detectaron inconsistencias o desviaciones respecto a las convenciones del sitio,
   listarlas bajo `## Inconsistencias detectadas` con ruta de archivo y descripción.
5. Si no hay inconsistencias, incluir `## Estado: sin inconsistencias detectadas`.

Formato del encabezado del archivo de salida:
```markdown
# Análisis del sitio — profejuanfe.dev
**Fecha:** YYYY-MM-DD
**Alcance:** {descripción de qué se analizó}

---
```

---

## 1. Mapa del repositorio

```
GITMateriasUdeA/
├── index.html                       Home — listado de asignaturas
├── staticwebapp.config.json         Azure Static Web Apps (solo Cache-Control: no-cache)
├── .github/workflows/               CI/CD → Azure SWA en cada push a main
├── assets/
│   ├── css/
│   │   ├── variables.css            ← ÚNICA fuente de verdad de tokens de diseño
│   │   ├── home.css                 Solo para index.html raíz
│   │   ├── course.css               Solo para <curso>/index.html
│   │   ├── profile.css              Solo para perfil-del-profesor/index.html
│   │   └── slides.css               Visor de diapositivas (incluye @media print → PDF)
│   ├── js/
│   │   ├── main.js                  Renderiza semanas/sesiones desde topics.js
│   │   ├── slides.js                Navegación del visor (teclado/flechas/swipe/hash)
│   │   ├── deck-nav.js              Navegación entre decks del mismo curso
│   │   ├── course-filter.js         Filtro de temas en el índice de curso
│   │   ├── share.js                 Botón Compartir (navigator.share + clipboard)
│   │   └── i18n.js                  Internacionalización ES/EN
│   └── img/                         og-image.png, logos, foto de perfil
├── perfil-del-profesor/
├── tecnicas-de-programacion/        Código 2508307 — Disponible (4 sesiones)
├── calidad-de-software/             Código 2554703 — Disponible (13 sesiones)
├── arquitectura-de-software/        Código 2554608 — Próximamente (sin contenido)
└── diseno-y-analisis-2/             Código 2554506 — Próximamente (sin contenido)
```

Patrón de cada asignatura disponible:
```
<curso>/
├── index.html          Índice del curso
├── topics.js           Array TOPICS — única fuente de datos de sesiones
├── pdfs/<slug>.pdf     PDF exportado de cada deck
└── presentaciones/<slug>/
    ├── index.html      El deck de diapositivas
    └── img/*.svg       Íconos propios (nunca compartidos entre decks)
```

---

## 2. Paleta de colores — estado actual (`assets/css/variables.css`)

> Siempre leer `assets/css/variables.css` para confirmar el valor exacto antes de citar
> cualquier color. La tabla siguiente refleja el estado a noviembre 2026.

### Tokens primitivos

| Variable | Hex / valor | Uso semántico |
|---|---|---|
| `--vellum` | `#f1eee3` | Crema — fondo principal de contenido (modo claro) |
| `--vellum-dim` | `#e7e2d2` | Crema oscurecido — superficies / tarjetas |
| `--ink` | `#16233a` | Azul casi negro — texto principal sobre fondo claro |
| `--ink-soft` | `#4a5773` | Azul grisáceo — texto secundario sobre fondo claro |
| `--amber` | `#e2a63b` | Ámbar — acento único (links, hover, selección) |
| `--amber-dim` | `rgba(226,166,59,0.15)` | Ámbar transparente — fondos de hover suaves |
| `--blueprint` | `#0f2038` | Azul oscuro — hero, footer, fondo del visor de slides |
| `--blueprint-deep` | `#0a182c` | Azul casi negro — footer, stage del deck |
| `--line` | `#bfdcef` | Azul claro — texto sobre fondo blueprint |
| `--line-dim` | `rgba(191,220,239,0.18)` | Azul claro transparente — bordes en fondos oscuros |
| `--line-soft` | `#afc7de` | Azul claro secundario — subtítulos sobre blueprint |
| `--line-muted` | `#7c97b4` | Azul claro atenuado — etiquetas/footer sobre blueprint |
| `--green-live` | `#2e7d4f` | Verde — badge "Disponible" en índices de curso |

### Alias semánticos (modo claro — válido para todo el sitio salvo hero y visor)

| Alias | Apunta a | Uso |
|---|---|---|
| `--bg` | `--vellum` | Fondo de página |
| `--surface` | `--vellum-dim` | Tarjetas / superficies |
| `--surface-2` | `#ece5d4` | Superficies secundarias |
| `--text` | `--ink` | Texto principal |
| `--text-muted` | `--ink-soft` | Texto secundario |
| `--accent` | `--amber` | Acento primario |
| `--accent-2` | `--amber` | Acento secundario (mismo valor) |
| `--border` | `rgba(22,35,58,0.14)` | Bordes sutiles |

### Hero / secciones oscuras (override en `home-sheet` y `deck-stage`)

En `.home-sheet` y en el visor de slides el CSS sobreescribe los alias:
- `--bg` → `--blueprint`
- `--text` → `--line`
- `--text-muted` → `--line-muted`
- `--border` → `--line-dim`

El grid de fondo del hero usa:
```css
background: linear-gradient(rgba(191,220,239,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(191,220,239,0.08) 1px, transparent 1px),
            linear-gradient(135deg, var(--surface), var(--bg));
background-size: 32px 32px, 32px 32px, cover;
```

### Color de relleno de los íconos SVG en los decks

Los íconos en `presentaciones/<slug>/img/` se recoloran manualmente a **`#59a87d`** (verde
claro) editando el atributo `fill` del SVG. Este valor contrasta bien con el fondo
`--blueprint` del visor. No usar el nuevo ámbar `#e2a63b` para íconos de deck — rompe la
coherencia visual con los decks existentes.

---

## 3. Tipografía

| Variable | Stack | Uso |
|---|---|---|
| `--font-heading` | `"Georgia", "Iowan Old Style", "Palatino Linotype", serif` | Definida en variables.css — base serif |
| `--font-body` | system-ui / `BlinkMacSystemFont` / `Segoe UI` / Roboto / Arial / sans-serif | Texto de cuerpo en todas las páginas |
| `--font-mono` | `"SFMono-Regular"` / Consolas / `Liberation Mono` / Menlo / monospace | Etiquetas, números, código |

**Clases de tipografía en home y curso** (cargadas desde Google Fonts en el `<head>`):

| Clase | Fuente | Uso |
|---|---|---|
| `.home-display` | `"Space Grotesk"` | Títulos y headings de alto impacto |
| `.home-mono` | `"IBM Plex Mono"` | Contadores, etiquetas, marca "JF" |

Google Fonts cargadas en home e índices de curso:
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
```

---

## 4. Sistema de diseño — estética "hoja de plano"

Inspiración en planos arquitectónicos:

- **Fondo hero con grid:** líneas finas en `rgba(191,220,239,0.08)` cada 32px sobre fondo
  `--blueprint` (ver CSS en §2).
- **Marcas de registro (`.reg-mark`):** cruces de 22×22px en las esquinas de `.home-sheet`,
  líneas de 1px en `rgba(191,220,239,0.35)`.
- **Title-block:** div tipo carátula de plano con campos Docente / Enfoque / Semestre /
  Código, usando clase `.home-mono` (IBM Plex Mono).
- **Marca de navegación:** recuadro `JF` (texto, no imagen SVG) en todas las páginas.

---

## 5. Estructura HTML — visor de diapositivas (deck)

### Esqueleto de un deck completo

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{Título sesión} — Semana {N}</title>
  <meta name="description" content="{descripción}" />
  <link rel="canonical" href="https://profejuanfe.dev/{curso}/presentaciones/{slug}/" />
  <!-- og:* y twitter:* obligatorios -->
  <link rel="stylesheet" href="../../../assets/css/variables.css" />
  <link rel="stylesheet" href="../../../assets/css/slides.css" />
</head>
<body class="deck-body">
  <div class="deck">

    <!-- Barra superior de navegación -->
    <div class="deck-topbar">
      <a class="home-link" href="../../../index.html">Inicio</a>
      <a class="home-link" href="../../index.html">&larr; Curso</a>
      <div class="deck-nav-group">
        <button class="deck-nav-arrow" id="deck-prev-btn" disabled>&lsaquo;</button>
        <div class="deck-picker">
          <button class="deck-picker-btn" id="deck-picker-btn" type="button"
                  aria-haspopup="listbox" aria-expanded="false">
            <span class="deck-picker-label" id="deck-picker-label">Cargando…</span>
            <svg class="deck-picker-chevron" …></svg>
          </button>
          <ul class="deck-picker-menu" id="deck-picker-menu" role="listbox"></ul>
        </div>
        <button class="deck-nav-arrow" id="deck-next-btn" disabled>&rsaquo;</button>
      </div>
      <div class="deck-actions">
        <button class="deck-btn share-btn" id="share-btn">Compartir</button>
        <button class="deck-btn" id="fullscreen-btn">Pantalla completa</button>
        <a class="deck-btn download" href="../../pdfs/{slug}.pdf" download>Descargar PDF</a>
      </div>
    </div>

    <!-- Barra de progreso -->
    <div class="progress-track">
      <div class="progress-fill" id="progress-fill"></div>
    </div>

    <!-- Escenario del deck — data-sheet = código del curso -->
    <div class="deck-stage" id="deck-stage" data-sheet="{CÓDIGO}">
      <!-- Slides van aquí -->
    </div>

    <!-- Contador de slides -->
    <div class="deck-footer">
      <span class="slide-counter" id="slide-counter"></span>
    </div>
  </div>

  <!-- JS al final del body -->
  <script src="../../../assets/js/slides.js"></script>
  <script src="../../topics.js"></script>
  <script src="../../../assets/js/deck-nav.js"></script>
  <script src="../../../assets/js/share.js"></script>
</body>
</html>
```

### Estructura de una diapositiva individual

```html
<section class="slide type-{tipo}" id="s{NN}">
  <div class="slide-content">
    <p class="slide-kicker">{Etiqueta del tipo}</p>
    <h1>{Título principal}</h1>
    <!-- contenido: p, ul/ol, table, blockquote, pre>code -->
    <!-- imagen al final, solo si el slide tiene poco texto -->
    <img class="portada-icon" src="img/{nombre}.svg" alt="{descripción}"
         style="display:block;width:200px;height:200px;margin:50px auto 0" />
  </div>
</section>
```

### Tipos de diapositiva (class en `<section>`)

| `type-*` | Etiqueta visible | Propósito |
|---|---|---|
| `type-portada` | Portada | Nombre del curso, semana y tema |
| `type-encuadre` | Encuadre | Logística, evaluación (solo semana 0) |
| `type-impacto` | Apertura | Cifra o afirmación de gancho inicial |
| `type-caso` | Caso · {subtema} | Ficha técnica, cronología, fallo real |
| `type-transicion` | Transición | Puente entre caso y teoría |
| `type-concepto` | Concepto | Definiciones formales |
| `type-contraejemplo` | Contraejemplo | Límites del concepto |
| `type-tension` | Tensión conceptual | Dos enfoques que chocan |
| `type-interaccion` | Interacción | Pregunta/ejercicio corto de aula (5 min) |
| `type-disputa` | Disputa | Afirmación de manual sin respaldo empírico |
| `type-sintesis` | Síntesis | Lista de ideas clave de la sesión |
| `type-instrucciones` | Instrucciones | Taller de cierre (bloque extendido) |
| `type-cierre` | Cierre | Lectura o preparación para la próxima semana |

### Layout de dos columnas (con captura de app)

```html
<div class="slide-split">
  <div class="slide-split-text">
    <p class="slide-kicker">...</p>
    <h1>...</h1>
    <ul>...</ul>
  </div>
  <img class="app-screenshot" src="img/captura.png" alt="..." />
</div>
```

### IDs de slides

Siempre correlativos: `s01`, `s02`, ..., `s30`. Usar sufijos `s26a`, `s26b` solo para
insertar sin renumerar todo (ver en decks existentes). Nunca saltar números.

---

## 6. Estructura HTML — índice de curso (`<curso>/index.html`)

```html
<link rel="stylesheet" href="../assets/css/variables.css" />
<link rel="stylesheet" href="../assets/css/course.css" />
...
<div id="weeks-container"></div>
<div id="content-stats"></div>
...
<script src="topics.js"></script>
<script src="../assets/js/main.js"></script>
<script src="../assets/js/course-filter.js"></script>
<script src="../assets/js/share.js"></script>
<script src="../assets/js/i18n.js"></script>
```

`main.js` lee el array global `TOPICS` de `topics.js` y construye el DOM de semanas y
sesiones dinámicamente. No hay HTML estático de sesiones en el índice.

---

## 7. `topics.js` — fuente de datos de cada asignatura

```js
// topics.js
const TOPICS = [
  { week: 0, slug: "presentacion-del-curso", title: "Presentación del curso",
    subtitle: "Resumen corto de la sesión", available: true },
  { week: 1, slug: "introduccion-a-la-programacion", title: "Introducción",
    subtitle: "Variables, tipos y flujo de control", available: true },
  { week: 2, slug: "mi-sesion-nueva", title: "...", subtitle: "...", available: false }
];
```

Reglas:
- `week: 0` → `main.js` lo etiqueta "Presentación" (no "Semana 0").
- `available: false` → aparece con tag "Próximamente", sin enlace y sin link en `deck-nav.js`.
- Agregar una entrada con `available: true` conecta automáticamente la sesión al índice del
  curso y a la navegación prev/next/selector entre decks — no hay otro archivo que tocar.

---

## 8. JavaScript — `slides.js` (visor de slides)

Comportamiento clave:
- Lee `#deck-stage` y todos sus `.slide`.
- `sizeFrame()`: calcula el mayor rectángulo 16:9 que cabe en la pantalla y aplica width/
  height inline a cada `.slide`. Máximo 1600px de ancho. Se llama en `resize`,
  `fullscreenchange` e inicio.
- `render()`: activa `.active` en el slide actual, `.prev` en los anteriores, actualiza
  contador, barra de progreso, y anota esquina con `CÓDIGO {sheet} / S{n}`.
- Navegación: teclas `ArrowRight`, `PageDown`, `Space` (siguiente); `ArrowLeft`, `PageUp`
  (anterior); `Home`/`End`; `F` para pantalla completa. Swipe táctil con umbral 50px.
- Hash de URL: sincronizado con el id del slide activo (`#s01`, `#s02`, …).
- Anotaciones de esquina: si `data-sheet` existe en `#deck-stage`, crea `.frame-tags` con
  `UDEA · 1803` y `CÓDIGO {sheet} / S{n}`.

---

## 9. JavaScript — `deck-nav.js` (navegación entre decks)

- Lee `location.pathname` para extraer el slug actual desde el segmento después de
  `presentaciones/`.
- Filtra `TOPICS` a solo los que tienen `available: true`.
- Conecta `#deck-prev-btn`, `#deck-next-btn` y el selector `#deck-picker-btn` /
  `#deck-picker-menu`.
- Navegación: `location.href = ../${slug}/index.html`.

---

## 10. JavaScript — `main.js` (índice de curso)

- Agrupa `TOPICS` por `week` usando un `Map`.
- Semana 0 → clase `.standalone` → etiqueta "Presentación".
- Semanas ≥ 1 → clase `.week` → etiqueta "Semana {N}".
- Sesión con `available: true` → `<a class="session">` con `href`.
- Sesión con `available: false` → `<div class="session disabled">` con tag "Próximamente".
- Estadísticas en `#content-stats`: "N semanas · N sesiones" (conteo de semanas únicas).

---

## 11. Convención de íconos en los decks

- **Solo illustrativos por slide** — nunca sprite global.
- Fuente prioritaria: **[Simple Icons](https://github.com/simple-icons/simple-icons)** para
  logos de marca/tecnología. CDN: `cdn.jsdelivr.net/npm/simple-icons@latest/icons/<slug>.svg`
- Segunda opción: **[Font Awesome Free](https://github.com/FortAwesome/Font-Awesome)** para
  conceptos genéricos. CDN: `cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free/svgs/solid/<icon>.svg`
- Proceso: descargar SVG → cambiar el atributo `fill` a **`#59a87d`** → guardar en
  `presentaciones/<slug>/img/`. Nunca usar otro fill para íconos de deck.
- Íconos de la topbar (compartir, Gmail, LinkedIn) → SVG inline con `fill="currentColor"`.
- Cada deck es dueño exclusivo de sus SVGs — nunca referenciar la carpeta de otro deck.

---

## 12. SEO / metadatos obligatorios en todas las páginas

```html
<meta name="description" content="…" />
<link rel="canonical" href="https://profejuanfe.dev/{ruta}/" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="profejuanfe.dev" />
<meta property="og:locale" content="es_CO" />
<meta property="og:title" content="…" />
<meta property="og:description" content="…" />
<meta property="og:url" content="https://profejuanfe.dev/{ruta}/" />
<meta property="og:image" content="https://profejuanfe.dev/assets/img/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Juan Felipe Quintana Gómez — profejuanfe.dev" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="…" />
<meta name="twitter:description" content="…" />
<meta name="twitter:image" content="https://profejuanfe.dev/assets/img/og-image.png" />
```

Dominio `profejuanfe.dev` hardcodeado en todas las páginas (12 en total). Un cambio de
dominio requiere find-and-replace global.

---

## 13. Generación de PDF con Chrome headless

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

Si hay una página extra casi en blanco, algún slide se desbordó en `@media print` — achicar
contenido o tamaño del ícono.

---

## 14. Puntos de atención arquitecturales

- **Sin build step:** el sitio se sirve tal cual. No hay npm, bundler ni compilación.
- **Sin hoja global de componentes:** cambios de layout compartido implican editar
  `home.css`, `course.css` y `profile.css` por separado. Solo colores/tokens centralizados
  en `variables.css`.
- **Sin tests ni linting** — el despliegue es "subir tal cual" a Azure Static Web Apps.
- **`staticwebapp.config.json` mínimo:** solo `globalHeaders: { "Cache-Control": "no-cache" }`.
- **`arquitectura-de-software/` y `diseno-y-analisis-2/`:** solo tienen `index.html` +
  `topics.js` vacío. No crear contenido ahí sin confirmación explícita del usuario.
