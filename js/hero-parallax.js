document.addEventListener('DOMContentLoaded', function () {
  const HERO_ICON = document.querySelector('.landing-hero-icon');

  if (!HERO_ICON) return;

  let lastScrollY = window.scrollY;
  const SPEED = 0.7;

  // --- Function to update opacity based on screen size ---
  function updateOpacityBasedOnWidth() {
    // Only applies on large screens
    if (window.innerWidth >= 900) {
      // If we are on desktop, we force the initial opacity to 1
      // But we respect the scroll state
      if (window.scrollY <= lastScrollY) {
        HERO_ICON.style.opacity = '1';
      }
    } else {
      // On mobile, we don't apply the scroll effect
      HERO_ICON.style.opacity = '0';
    }
  }

  // --- Apply on load and on resize ---
  updateOpacityBasedOnWidth();
  window.addEventListener('resize', updateOpacityBasedOnWidth);

  // --- Scroll event ---
  window.addEventListener('scroll', function () {
    if (window.innerWidth < 768) return;

    const SCROLL_Y = window.scrollY;
    const TRANSLATE_Y = SCROLL_Y * SPEED;

    HERO_ICON.style.transform = `translateY(${TRANSLATE_Y}px)`;

    // Fade-in/slide-up effect
    if (SCROLL_Y > lastScrollY) {
      // Down  → hide
      HERO_ICON.style.opacity = '0';
    } else {
      // Up → show only if it is at the top
      if (SCROLL_Y < 300 && this.window.innerWidth > 900) { // <-- limit
        HERO_ICON.style.opacity = '1';
      }
      // Scrolling up but not has reached the limit 
    }

    lastScrollY = SCROLL_Y;
  });
});