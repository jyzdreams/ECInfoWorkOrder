(function () {
  const slides = Array.from(document.querySelectorAll(".slide"));
  const total = slides.length;
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const fullBtn = document.getElementById("fullBtn");
  const pageIndicator = document.getElementById("pageIndicator");
  const deck = document.querySelector(".deck");
  const viewport = document.getElementById("deckViewport");
  const stage = document.getElementById("stage");
  const DESIGN_WIDTH = 1920;
  const DESIGN_HEIGHT = 1080;
  let current = 0;

  function pad(num) {
    return String(num).padStart(2, "0");
  }

  function show(index, updateHash = true) {
    current = Math.max(0, Math.min(index, total - 1));
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === current);
      slide.setAttribute("aria-hidden", slideIndex === current ? "false" : "true");
    });
    pageIndicator.value = `${pad(current + 1)} / ${pad(total)}`;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === total - 1;
    if (updateHash) {
      history.replaceState(null, "", `#${pad(current + 1)}`);
    }
  }

  function fromHash() {
    const raw = window.location.hash.replace("#", "");
    const page = Number.parseInt(raw, 10);
    if (Number.isFinite(page) && page >= 1 && page <= total) {
      show(page - 1, false);
    }
  }

  function resizeStage() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scale = Math.min(viewportWidth / DESIGN_WIDTH, viewportHeight / DESIGN_HEIGHT);
    viewport.style.width = `${DESIGN_WIDTH * scale}px`;
    viewport.style.height = `${DESIGN_HEIGHT * scale}px`;
    stage.style.transform = `scale(${scale})`;
  }

  prevBtn.addEventListener("click", () => show(current - 1));
  nextBtn.addEventListener("click", () => show(current + 1));

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-go]");
    if (!target) return;
    const page = Number.parseInt(target.dataset.go, 10);
    if (Number.isFinite(page)) show(page - 1);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
      event.preventDefault();
      show(current + 1);
    }
    if (event.key === "ArrowLeft" || event.key === "PageUp") {
      event.preventDefault();
      show(current - 1);
    }
    if (event.key === "Home") show(0);
    if (event.key === "End") show(total - 1);
    if (event.key.toLowerCase() === "f") toggleFullscreen();
  });

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      deck.requestFullscreen?.();
      return;
    }
    document.exitFullscreen?.();
  }

  fullBtn.addEventListener("click", toggleFullscreen);
  window.addEventListener("hashchange", fromHash);
  window.addEventListener("resize", resizeStage);
  window.addEventListener("orientationchange", resizeStage);
  document.addEventListener("fullscreenchange", resizeStage);

  resizeStage();
  fromHash();
  show(current, false);
})();
