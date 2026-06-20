document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("jsScroll__scrolled");
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".jsScroll").forEach((item) => observer.observe(item));

const musicButton = document.querySelector("[data-music-button]");
const toast = document.querySelector(".toast");
const weddingAudio = document.querySelector("[data-wedding-audio]");

if (musicButton) {
  const musicText = musicButton.querySelector(".sm-music-text");

  musicButton.addEventListener("click", async () => {
    if (!weddingAudio) return;

    if (weddingAudio.paused) {
      try {
        await weddingAudio.play();
        musicButton.classList.add("is-playing");
        if (musicText) musicText.textContent = "Пауза";
      } catch (error) {
        if (!toast) return;
        toast.textContent = "Нажмите еще раз, чтобы включить музыку";
        toast.classList.add("is-visible");

        window.clearTimeout(window.__musicToastTimer);
        window.__musicToastTimer = window.setTimeout(() => {
          toast.classList.remove("is-visible");
        }, 2200);
      }
    } else {
      weddingAudio.pause();
      musicButton.classList.remove("is-playing");
      if (musicText) musicText.textContent = "Включить музыку";
    }
  });
}
