(function () {
  const container = document.getElementById("weeks-container");
  const statsEl = document.getElementById("content-stats");
  if (!container || typeof TOPICS === "undefined") return;

  const pluralize = (n, singular, plural) => `${n} ${n === 1 ? singular : plural}`;
  const arrowIcon =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  if (statsEl) {
    const weekCount = new Set(TOPICS.map((t) => t.week)).size;
    statsEl.textContent = TOPICS.length
      ? `${pluralize(weekCount, "semana", "semanas")} · ${pluralize(TOPICS.length, "sesión", "sesiones")}`
      : "";
  }

  if (!TOPICS.length) {
    const empty = document.createElement("p");
    empty.className = "course-empty";
    empty.textContent = "Aún no hay contenido publicado para este curso.";
    container.appendChild(empty);
    return;
  }

  const weeks = new Map();
  TOPICS.forEach((topic) => {
    if (!weeks.has(topic.week)) weeks.set(topic.week, []);
    weeks.get(topic.week).push(topic);
  });

  const frag = document.createDocumentFragment();

  Array.from(weeks.keys())
    .sort((a, b) => a - b)
    .forEach((weekNum) => {
      const sessions = weeks.get(weekNum);
      const isStandalone = weekNum === 0;

      const weekEl = document.createElement("div");
      weekEl.className = "week" + (isStandalone ? " standalone" : "");

      const head = document.createElement("div");
      head.className = "week-head";
      head.innerHTML = `
        <span class="num home-mono">${String(weekNum).padStart(2, "0")}</span>
        <span class="label home-display">${isStandalone ? "Presentación" : `Semana ${weekNum}`}</span>
        <span class="count home-mono">${pluralize(sessions.length, "sesión", "sesiones")}</span>
      `;
      weekEl.appendChild(head);

      sessions.forEach((topic, i) => {
        const session = document.createElement(topic.available ? "a" : "div");
        session.className = "session" + (topic.available ? "" : " disabled");
        if (topic.available) {
          session.href = `presentaciones/${topic.slug}/index.html`;
        }

        session.innerHTML = `
          <span class="idx home-mono">${String(i + 1).padStart(2, "0")}</span>
          <div class="body">
            <h4 class="home-display">${topic.title}</h4>
            <p>${topic.subtitle}</p>
          </div>
          ${
            topic.available
              ? `<div class="go">${arrowIcon}</div>`
              : '<span class="soon-tag">Próximamente</span>'
          }
        `;
        weekEl.appendChild(session);
      });

      frag.appendChild(weekEl);
    });

  container.appendChild(frag);
})();
