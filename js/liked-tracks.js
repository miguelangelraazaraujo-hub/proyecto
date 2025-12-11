document.querySelectorAll(".liked-tracks").forEach(el => {
  el.addEventListener("click", () => {
    el.classList.toggle("activa");
  });
});