/**
 * Motor de navegación para los mazos de diapositivas.
 * Cada slide es un <section class="slide" id="s01" data-type="...">
 * dentro de #deck-stage. Este script solo controla la navegación;
 * el contenido de cada diapositiva vive en el HTML de la presentación.
 */
(function () {
  const stage = document.getElementById("deck-stage");
  if (!stage) return;

  const slides = Array.from(stage.querySelectorAll(".slide"));
  const total = slides.length;
  const counterEl = document.getElementById("slide-counter");
  const progressEl = document.getElementById("progress-fill");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const fullscreenBtn = document.getElementById("fullscreen-btn");
  const sheetCode = stage.dataset.sheet || "";

  let current = 0;

  // Anotaciones de esquina del marco (alineadas con el .slide activo)
  let sheetTagEl = null;
  let frameTagsEl = null;
  if (sheetCode) {
    frameTagsEl = document.createElement("div");
    frameTagsEl.className = "frame-tags";
    frameTagsEl.innerHTML = `
      <span class="frame-tag uni">UDEA · 1803</span>
      <span class="frame-tag sheet"></span>
    `;
    stage.appendChild(frameTagsEl);
    sheetTagEl = frameTagsEl.querySelector(".sheet");
  }

  // Calcula el mayor rectángulo 16:9 que cabe en el escenario y lo aplica
  // como tamaño inline a cada .slide y a la capa de anotaciones.
  function sizeFrame() {
    const margin = window.innerWidth <= 720 ? 16 : 32;
    const availW = stage.clientWidth - margin * 2;
    const availH = stage.clientHeight - margin * 2;
    if (availW <= 0 || availH <= 0) return;

    let w = Math.min(availW, 1600);
    let h = (w * 9) / 16;
    if (h > availH) {
      h = availH;
      w = (h * 16) / 9;
    }

    slides.forEach((slide) => {
      slide.style.width = `${w}px`;
      slide.style.height = `${h}px`;
    });
    if (frameTagsEl) {
      frameTagsEl.style.width = `${w}px`;
      frameTagsEl.style.height = `${h}px`;
    }
  }

  function indexFromHash() {
    const id = window.location.hash.replace("#", "");
    const idx = slides.findIndex((s) => s.id === id);
    return idx >= 0 ? idx : 0;
  }

  function render() {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === current);
      slide.classList.toggle("prev", i < current);
    });
    if (counterEl)
      counterEl.innerHTML = `<strong>${String(current + 1).padStart(2, "0")}</strong> / ${total}`;
    if (progressEl) progressEl.style.width = `${((current + 1) / total) * 100}%`;
    if (sheetTagEl) sheetTagEl.textContent = `SHEET ${sheetCode} / S${current + 1}`;
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current === total - 1;
    history.replaceState(null, "", `#${slides[current].id}`);
  }

  function goTo(idx) {
    current = Math.min(Math.max(idx, 0), total - 1);
    render();
  }

  prevBtn && prevBtn.addEventListener("click", () => goTo(current - 1));
  nextBtn && nextBtn.addEventListener("click", () => goTo(current + 1));

  fullscreenBtn &&
    fullscreenBtn.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen();
      }
    });

  document.addEventListener("keydown", (e) => {
    if (["ArrowRight", "PageDown", " "].includes(e.key)) {
      e.preventDefault();
      goTo(current + 1);
    } else if (["ArrowLeft", "PageUp"].includes(e.key)) {
      e.preventDefault();
      goTo(current - 1);
    } else if (e.key === "Home") {
      goTo(0);
    } else if (e.key === "End") {
      goTo(total - 1);
    } else if (e.key.toLowerCase() === "f") {
      fullscreenBtn && fullscreenBtn.click();
    }
  });

  // Deslizar en pantallas táctiles
  let touchStartX = null;
  stage.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].clientX;
    },
    { passive: true }
  );
  stage.addEventListener(
    "touchend",
    (e) => {
      if (touchStartX === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) goTo(current + (dx < 0 ? 1 : -1));
      touchStartX = null;
    },
    { passive: true }
  );

  window.addEventListener("hashchange", () => goTo(indexFromHash()));
  window.addEventListener("resize", sizeFrame);
  document.addEventListener("fullscreenchange", sizeFrame);

  sizeFrame();
  current = indexFromHash();
  render();
})();
