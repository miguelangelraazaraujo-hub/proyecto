document.addEventListener('DOMContentLoaded', function () {
  const Hero_Icon = document.querySelector('.landing-hero-icon');

  if (!Hero_Icon) return;

  let lastScrollY = window.scrollY;
  const Speed = 0.5;

  // --- Function to update opacity based on screen size ---
  function updateOpacityBasedOnWidth() {
    // Only applies on large screens
    if (window.innerWidth >= 900) {
      // If we are on desktop, we force the initial opacity to 1
      // But we respect the scroll state
      if (window.scrollY <= lastScrollY) {
        Hero_Icon.style.opacity = '1';
      }
    } else {
      // On mobile, we don't apply the scroll effect
      Hero_Icon.style.opacity = '0';
    }
  }

  // --- Apply on load and on resize ---
  updateOpacityBasedOnWidth();
  window.addEventListener('resize', updateOpacityBasedOnWidth);

  // --- Scroll event ---
  window.addEventListener('scroll', function () {
    if (window.innerWidth < 768) return;

    const Scroll_Y = window.scrollY;
    const Translate_Y = Scroll_Y * Speed;

    Hero_Icon.style.transform = `translateY(${Translate_Y}px)`;

    // Fade-in/slide-up effect
    if (Scroll_Y > lastScrollY) {
      Hero_Icon.style.opacity = '0'; // down → hide
    } else {
      Hero_Icon.style.opacity = Math.min(1 + Scroll_Y * 0.001); // up → show
    }

    lastScrollY = Scroll_Y;
  });
});