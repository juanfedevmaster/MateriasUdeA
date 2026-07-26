(function () {
  const grid = document.getElementById("topic-grid");
  if (!grid || typeof TOPICS === "undefined") return;

  const frag = document.createDocumentFragment();

  TOPICS.forEach((topic) => {
    const weekLabel = topic.week === 0 ? "Presentación" : `Semana ${topic.week}`;
    const card = document.createElement(topic.available ? "a" : "div");

    card.className = "topic-card" + (topic.available ? "" : " disabled");
    if (topic.available) {
      card.href = `presentaciones/${topic.slug}/index.html`;
    }

    card.innerHTML = `
      <div>
        <div class="week">${weekLabel}</div>
        <h2>${topic.title}</h2>
        <p class="subtitle">${topic.subtitle}</p>
      </div>
      <div class="status">${topic.available ? "" : "Próximamente"}</div>
      ${topic.available ? '<div class="arrow">→</div>' : ""}
    `;

    frag.appendChild(card);
  });

  grid.appendChild(frag);
})();
