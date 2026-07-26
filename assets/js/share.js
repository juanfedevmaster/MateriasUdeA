/**
 * Botón "Compartir": usa la Web Share API si está disponible (móviles,
 * Safari, Edge); si no, copia el enlace al portapapeles como respaldo.
 */
(function () {
  document.querySelectorAll(".share-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const shareData = { title: document.title, url: window.location.href };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          /* usuario canceló o el navegador rechazó — no hacer nada */
        }
        return;
      }

      try {
        await navigator.clipboard.writeText(shareData.url);
        const label = btn.querySelector(".label");
        const original = label ? label.textContent : null;
        btn.classList.add("copied");
        if (label) label.textContent = "¡Enlace copiado!";
        setTimeout(() => {
          btn.classList.remove("copied");
          if (label && original) label.textContent = original;
        }, 2000);
      } catch (err) {
        /* portapapeles no disponible — no hacer nada */
      }
    });
  });
})();
