(function () {
  const wrap = document.getElementById("course-filter");
  const input = document.getElementById("course-filter-input");
  const clearBtn = document.getElementById("course-filter-clear");
  const container = document.getElementById("weeks-container");
  const statsEl = document.getElementById("content-stats");
  if (!wrap || !input || !container) return;

  const weeks = Array.from(container.querySelectorAll(".week"));
  if (!weeks.length) {
    wrap.style.display = "none";
    return;
  }

  const baseStats = statsEl ? statsEl.textContent : "";
  const totalSessions = container.querySelectorAll(".session").length;

  const DIACRITICS_RE = new RegExp(String.fromCharCode(91) + String.fromCharCode(92) + "u0300-" + String.fromCharCode(92) + "u036f" + String.fromCharCode(93), "g");

  const normalize = (s) =>
    (s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(DIACRITICS_RE, "");

  let emptyEl = null;
  const ensureEmptyEl = () => {
    if (!emptyEl) {
      emptyEl = document.createElement("p");
      emptyEl.className = "course-empty";
      emptyEl.id = "course-filter-empty";
      emptyEl.hidden = true;
      container.after(emptyEl);
    }
    return emptyEl;
  };

  function applyFilter() {
    const raw = input.value.trim();
    const query = normalize(raw);
    let visible = 0;

    weeks.forEach((week) => {
      const sessions = Array.from(week.querySelectorAll(".session"));
      let visibleInWeek = 0;
      sessions.forEach((session) => {
        const titleEl = session.querySelector("h4");
        const subtitleEl = session.querySelector("p");
        const title = normalize(titleEl ? titleEl.textContent : "");
        const subtitle = normalize(subtitleEl ? subtitleEl.textContent : "");
        const matches = !query || title.indexOf(query) !== -1 || subtitle.indexOf(query) !== -1;
        session.classList.toggle("is-hidden", !matches);
        if (matches) visibleInWeek++;
      });
      week.classList.toggle("is-hidden", visibleInWeek === 0);
      visible += visibleInWeek;
    });

    const empty = ensureEmptyEl();
    empty.hidden = !(query && visible === 0);
    if (!empty.hidden) {
      empty.textContent = 'No hay presentaciones que coincidan con "' + raw + '".';
    }

    if (clearBtn) clearBtn.classList.toggle("visible", raw.length > 0);
    if (statsEl) {
      statsEl.textContent = query ? visible + " de " + totalSessions + " sesiones" : baseStats;
    }
  }

  input.addEventListener("input", applyFilter);

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      input.value = "";
      applyFilter();
      input.focus();
    });
  }
})();
