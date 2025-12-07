document.addEventListener('DOMContentLoaded', function () {
  const BUTTON = document.querySelector('.js-user-link');
  const LOGIN_BOX = document.querySelector('.login-box');

  // Reference to the menu
  const MOBILE_MENU = document.querySelector('[data-click-menu-id="mobile-menu"]');

  // --- Change the translateX depending on the size of the screen ---
  let previousWidth = window.innerWidth;

  function updateLoginBoxPositionOnResize() {
    const CURRENT_WIDTH = window.innerWidth;
    const WIDTH_DIFFERENCE = CURRENT_WIDTH - previousWidth; // Can be positive or negative

    //  Only apply bewteen 900px and 1000px
    if (CURRENT_WIDTH >= 900 && CURRENT_WIDTH <= 1240) {
      const COMPUTED_STYLE = getComputedStyle(LOGIN_BOX);
      const TRANSFORM_VALUE = COMPUTED_STYLE.transform;

      let currentTranslateX = 540 + (window.innerWidth - 900);

      if (TRANSFORM_VALUE !== 'none' && TRANSFORM_VALUE.includes('MATRIX')) {
        const MATRIX = TRANSFORM_VALUE.match(/MATRIX.*\((.+)\)/)[1].split(', ');
        currentTranslateX = parseFloat(MATRIX[4]) || 540;
      } else if (TRANSFORM_VALUE.includes('translateX')) {
        const MATCH = TRANSFORM_VALUE.match(/translateX\(([-\d.]+)px\)/);
        if (MATCH) currentTranslateX = parseFloat(MATCH[1]);
      }

      const NEW_TRANSLATE_X = currentTranslateX + WIDTH_DIFFERENCE;

      LOGIN_BOX.style.transform = `translateX(${NEW_TRANSLATE_X}px)`;
    } else if(CURRENT_WIDTH <= 899) {
      let currentTranslateX = 0;
      LOGIN_BOX.style.transform = `translateX(${currentTranslateX}px)`;
    } else if(CURRENT_WIDTH >= 1241) {
      let currentTranslateX = 900;
      LOGIN_BOX.style.transform = `translateX(${currentTranslateX}px)`;
    }

    previousWidth = CURRENT_WIDTH;
  }

  if (window.innerWidth >= 900 && window.innerWidth <= 1000) {
    updateLoginBoxPositionOnResize();
    let currentTranslateX = 0;
  }

  // Listen to changes in the size of the windows
  window.addEventListener('resize', updateLoginBoxPositionOnResize);

  // --- End of the new section ---

  if (BUTTON && LOGIN_BOX) {
    BUTTON.addEventListener('click', function (e) {
      e.stopPropagation();

      // If the menu is open, close it
      if (MOBILE_MENU && MOBILE_MENU.classList.contains('visible')) {
        MOBILE_MENU.classList.remove('visible');
      }

      // Toggle visibility
      if (LOGIN_BOX.style.display === 'none' || getComputedStyle(LOGIN_BOX).display === 'none') {
        LOGIN_BOX.style.display = 'block';
      } else {
        LOGIN_BOX.style.display = 'none';
      }
    });

    // Close the form if a clic is done outside of it
    document.addEventListener('click', function (e) {
      // Check if the form is visible
      if ((getComputedStyle(LOGIN_BOX).display) !== 'none') {
        // Check if the clic was done outside of the form 
        if (!LOGIN_BOX.contains(e.target) && !BUTTON.contains(e.target)) {
          LOGIN_BOX.style.display = 'none';
        }
      }
    });
  }
});