# MateriasUdeA

Sitio web estático de **Juan Felipe Quintana Gómez** — material de clase (Ingeniería de
Sistemas, Universidad de Antioquia) y perfil profesional. Sin build step: HTML/CSS/JS
plano, servido tal cual.

**Despliegue:** Azure Static Web Apps, vía GitHub Actions
(`.github/workflows/azure-static-web-apps-polite-beach-064318f0f.yml`) al hacer push a
`main`. Dominio de marca usado en el sitio: `profejuanfe.dev`.

## Estructura

```
index.html                     Home — listado de asignaturas
perfil-del-profesor/           Perfil del profesor
<curso>/                       Una carpeta por asignatura:
  index.html                     Índice del curso (semanas/sesiones)
  topics.js                      Datos de las semanas/sesiones (ver abajo)
  pdfs/<slug>.pdf                 PDF exportado de cada presentación
  presentaciones/<slug>/
    index.html                    El deck de slides
    img/*.svg                     Íconos recoloreados usados en ese deck
assets/
  css/  variables.css             Paleta y tokens compartidos (:root)
        home.css                  Solo para el home (index.html raíz)
        course.css                Solo para los índices de curso (<curso>/index.html)
        profile.css               Solo para el perfil del profesor
        slides.css                Visor de diapositivas (compartido por todos los decks)
  js/   main.js                   Renderiza semanas/sesiones desde topics.js
        slides.js                 Navegación del visor de diapositivas + tamaño del marco
        share.js                  Botón "Compartir" (Web Share API + fallback portapapeles)
  img/  og-image.png               Imagen para Open Graph / redes sociales
        logo-*.png, juanfe-profile.png
```

Asignaturas actuales: `tecnicas-de-programacion`, `calidad-de-software`,
`arquitectura-de-software` (sin contenido aún), `diseno-y-analisis-2` (sin contenido aún).

## Sistema de diseño — "hoja de plano"

Toda página nueva sigue la estética de plano arquitectónico definida en las conversaciones
de diseño: fondo con grid de líneas finas, marcas de registro (cruces) en las esquinas,
"title-block" tipo carátula de plano (Docente/Enfoque/Semestre/Sheet), tipografía Space
Grotesk (títulos) + IBM Plex Mono (etiquetas/números), y una sola paleta de colores.

**Paleta** (`assets/css/variables.css`, no se toca por página — todo hereda de aquí):

| Variable | Hex | Uso |
|---|---|---|
| `--color1` / `--text` | `#f0debb` | Crema — texto principal |
| `--color2` / `--accent` | `#59a87d` | Verde — acento primario, links, hover |
| `--color3` / `--surface` | `#16453f` | Verde oscuro — superficies, tarjetas |
| `--color4` / `--bg` | `#091c1a` | Casi negro — fondo base |
| `--color5` / `--accent-2` | `#541734` | Vino — énfasis secundario |

Cada hoja de estilos (`home.css`, `course.css`, `profile.css`, `slides.css`) es
independiente y solo la carga la página correspondiente — no hay una hoja global de
componentes; el look consistente viene de reusar los mismos nombres de clase
(`.reg-mark`, `.title-block`, `.sec-head`, `.share-btn`, etc.) y las variables de
`variables.css`.

La marca en la barra de navegación es un recuadro de texto **"JF"** (no el logo de la
UdeA) — así se ve en todas las páginas.

## El visor de diapositivas (`slides.css` + `slides.js`)

Cada deck es un HTML con secciones `<section class="slide" id="sNN">` dentro de
`#deck-stage`. `slides.js`:
- calcula en cada resize el mayor rectángulo 16:9 que cabe en la pantalla
  (`sizeFrame()`) y lo aplica como estilo inline a cada `.slide` (evita los bugs de
  `aspect-ratio` + posicionamiento absoluto),
- maneja navegación (flechas, teclado, swipe táctil, hash de la URL),
- dibuja las anotaciones de esquina ("UDEA · 1803" / "CÓDIGO {código}/S{n}") leyendo
  `data-sheet="XXXXXXX"` del `#deck-stage`.

**`@media print`** en `slides.css` redefine todo para exportar a PDF: quita el marco/grid,
un slide por página tamaño 1280×720, reduce fuentes/íconos para que quepan en una página
por diapositiva. Ver "Generar los PDF" abajo.

### Navegación entre presentaciones (`deck-nav.js`)

En la topbar de cada deck, donde antes había un texto fijo con el título, ahora hay
`<button id="deck-prev-btn">`, `<select id="deck-picker">` y `<button id="deck-next-btn">`.
`deck-nav.js` los llena en tiempo de carga:
- lee el `<script src="../../topics.js">` que cada deck ahora incluye (antes de
  `deck-nav.js`, después debe estar cargado `TOPICS`),
- detecta el slug del deck actual a partir de `location.pathname` (busca el segmento
  después de `presentaciones/`),
- filtra `TOPICS` a `available: true` y ubica la posición del deck actual en esa lista,
- llena el `<select>` con todas las presentaciones disponibles del curso (saltar a
  cualquiera navega directo), y habilita/deshabilita los botones anterior/siguiente según
  si existe un deck adyacente.

Como todo depende de `topics.js`, **agregar una semana nueva a `topics.js` la conecta
automáticamente** a la navegación de todos los demás decks del curso — no hay que tocar
nada más.

## Cómo agregar una semana/sesión nueva

1. Copia una presentación existente como plantilla (ej. `tecnicas-de-programacion/presentaciones/introduccion-a-la-programacion/`).
2. Escribe el contenido de cada `<section class="slide">` (kicker, `<h1>`, texto/tabla/código).
3. Si el slide tiene poco texto, agrégale una imagen alusiva (ver "Íconos" abajo),
   siempre **debajo del texto**. Si ya tiene mucho texto, no le pongas imagen.
4. Agrega la entrada en el `topics.js` del curso:
   ```js
   { week: 1, slug: "mi-sesion", title: "Título", subtitle: "Resumen corto", available: true }
   ```
   `main.js` agrupa por `week` automáticamente y arma la lista en el índice del curso.
5. Genera el PDF (ver abajo) y colócalo en `<curso>/pdfs/<slug>.pdf`.

## Íconos

Se usan **solo como imágenes ilustrativas por diapositiva**, nunca como sprite/librería
cargada en el sitio. Por cada ícono:

1. Buscar primero en [Simple Icons](https://github.com/simple-icons/simple-icons) (logos
   de marca — Java, GitHub, Zoom, Selenium, etc.) y si no hay uno pertinente, en
   [Font Awesome Free](https://github.com/FortAwesome/Font-Awesome) (conceptos genéricos —
   bug, reloj, balanza, etc.).
2. Descargar el SVG (CDN: `cdn.jsdelivr.net/npm/simple-icons@latest/icons/<slug>.svg` o
   `cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free/svgs/solid/<icon>.svg`).
3. Recolorear en verde acento editando el `fill` directamente en el archivo (un
   `<img>` no hereda `currentColor` de la página, así que hay que "hornear" el color
   dentro del SVG): `fill="#59a87d"` en la raíz (Simple Icons) o reemplazando
   `fill="currentColor"` en el `<path>` (Font Awesome).
4. Guardar en `presentaciones/<slug>/img/<nombre>.svg` (carpeta local del deck, no en
   `assets/img/`).
5. Insertar como `<img class="portada-icon" src="img/<nombre>.svg" ... style="display:block;width:...px;height:...px;margin:...px auto 0" />`, siempre como el último
   elemento dentro de `.slide-content` (debajo del texto).

Font Awesome Free es CC BY 4.0 (pide atribución); Simple Icons es CC0. Para este sitio
académico interno el riesgo es bajo, pero queda anotado.

Los íconos usados en la barra de navegación (compartir, flecha de breadcrumb, Gmail,
LinkedIn) van **inline** en el HTML como `<svg>` con `fill="currentColor"`, no como
archivos — así heredan el color vía CSS igual que el resto de los botones.

## Generar los PDF

No hay pipeline automático: se genera con Chrome headless apuntando al HTML del deck
(el `@media print` de `slides.css` hace el resto):

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --no-sandbox \
  --print-to-pdf="<curso>/pdfs/<slug>.pdf" \
  --no-pdf-header-footer --virtual-time-budget=4000 \
  "file:///ruta/absoluta/<curso>/presentaciones/<slug>/index.html"
```

Verificar que el número de páginas del PDF coincida con el número de `<section class="slide">`
del deck (`pdftotext -layout archivo.pdf - | awk 'BEGIN{RS="\f"}{c++}END{print c}'`) — si
sobra una página casi en blanco, algún slide se desbordó y hay que achicar su contenido o
su ícono para impresión.

## SEO / Open Graph

Las 12 páginas (home, perfil, 4 índices de curso, 6 decks) tienen en el `<head>`:
`description`, `canonical`, `og:*` y `twitter:*`, todas apuntando a
`assets/img/og-image.png` (1200×630, generada en el mismo estilo de "hoja de plano") y a
URLs absolutas bajo `https://profejuanfe.dev/` — **confirmar que ese sea el dominio real
configurado en Azure Static Web Apps** antes de dar esto por definitivo; si cambia, es un
find-and-replace en las 12 páginas.

## Botón "Compartir"

`assets/js/share.js` usa `navigator.share()` cuando está disponible (móviles, Safari,
Edge) y si no, copia el link al portapapeles y el botón muestra "¡Enlace copiado!" un par
de segundos. Está en la home, en el índice de cada curso, en el perfil y en cada deck
(junto a "Pantalla completa"/"Descargar PDF").
