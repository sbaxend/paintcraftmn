export function initServiceSlider({
  storageKey = "interiorSlideId",
  paramKey = "slide",
} = {}) {
  const wrap = document.getElementById("svc-wrap");
  const track = document.getElementById("svc-track");
  const prev = document.getElementById("svc-prev");
  const next = document.getElementById("svc-next");
  const dots = Array.from(document.querySelectorAll("#svc-dots > button"));
  const autoBtn = document.getElementById("svc-auto");

  if (!wrap || !track || !prev || !next || !autoBtn) return;

  const params = new URLSearchParams(window.location.search);
  const slideFromUrl = params.get(paramKey);
  const slideFromStorage = sessionStorage.getItem(storageKey);
  const targetSlideId = slideFromUrl || slideFromStorage;

  // ...everything else stays basically the same...

  // IMPORTANT: update this part
  sessionStorage.removeItem(storageKey);
}