(function () {
  if (typeof TOPICS === "undefined") return;

  const parts = location.pathname.split("/").filter(Boolean);
  const idx = parts.indexOf("presentaciones");
  if (idx === -1 || idx + 1 >= parts.length) return;
  const currentSlug = parts[idx + 1];

  const available = TOPICS.filter((t) => t.available);
  const pos = available.findIndex((t) => t.slug === currentSlug);
  if (pos === -1) return;

  const prev = pos > 0 ? available[pos - 1] : null;
  const next = pos < available.length - 1 ? available[pos + 1] : null;

  const prevBtn = document.getElementById("deck-prev-btn");
  const nextBtn = document.getElementById("deck-next-btn");
  const pickerBtn = document.getElementById("deck-picker-btn");
  const pickerLabel = document.getElementById("deck-picker-label");
  const pickerMenu = document.getElementById("deck-picker-menu");

  const labelFor = (t) => (t.week === 0 ? t.title : `Semana ${t.week} · ${t.title}`);
  const goTo = (slug) => {
    location.href = `../${slug}/index.html`;
  };

  if (prevBtn) {
    if (prev) {
      prevBtn.disabled = false;
      prevBtn.title = `Anterior: ${labelFor(prev)}`;
      prevBtn.addEventListener("click", () => goTo(prev.slug));
    } else {
      prevBtn.disabled = true;
      prevBtn.title = "No hay una presentación anterior";
    }
  }

  if (nextBtn) {
    if (next) {
      nextBtn.disabled = false;
      nextBtn.title = `Siguiente: ${labelFor(next)}`;
      nextBtn.addEventListener("click", () => goTo(next.slug));
    } else {
      nextBtn.disabled = true;
      nextBtn.title = "No hay una presentación siguiente";
    }
  }

  if (pickerBtn && pickerLabel && pickerMenu) {
    pickerLabel.textContent = labelFor(available[pos]);

    available.forEach((t) => {
      const li = document.createElement("li");
      const optBtn = document.createElement("button");
      optBtn.type = "button";
      optBtn.setAttribute("role", "option");
      optBtn.textContent = labelFor(t);
      if (t.slug === currentSlug) {
        optBtn.classList.add("current");
        optBtn.setAttribute("aria-selected", "true");
      }
      optBtn.addEventListener("click", () => goTo(t.slug));
      li.appendChild(optBtn);
      pickerMenu.appendChild(li);
    });

    const closeMenu = () => {
      pickerMenu.classList.remove("open");
      pickerBtn.classList.remove("open");
      pickerBtn.setAttribute("aria-expanded", "false");
    };
    const openMenu = () => {
      pickerMenu.classList.add("open");
      pickerBtn.classList.add("open");
      pickerBtn.setAttribute("aria-expanded", "true");
    };

    pickerBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (pickerMenu.classList.contains("open")) closeMenu();
      else openMenu();
    });

    document.addEventListener("click", (e) => {
      if (!pickerMenu.contains(e.target) && e.target !== pickerBtn) closeMenu();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }
})();
