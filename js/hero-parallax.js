document.addEventListener('DOMContentLoaded', function () {
  const Hero_Icon = document.querySelector('.landing-hero-icon');

  if (!Hero_Icon) return;

  // Parallax speed
  const Speed = 0.5;

  window.addEventListener('scroll', function () {
    // Only for big screens
    if (window.innerWidth < 768) return;

    const Scroll_Y = window.scrollY;

    // Calc the vertical move
    const Translate_Y = scrollY * Speed;

    // Apply the movement with trasform
    Hero_Icon.style.transform = `translateY(${Translate_Y}px)`;

    // Opcional: si quieres que el ícono se haga más visible al scrollear
    // Hero_Icon.style.opacity = Math.min(0, 1 + scrollY * 0.001);
  });
});