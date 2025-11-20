document.addEventListener('DOMContentLoaded', function () {
  const Button = document.querySelector('.js-user-link');
  const Login_Box = document.querySelector('.login-box');

  // Reference to the menu
  const Mobile_Menu = document.querySelector('[data-click-menu-id="mobile-menu"]');

  // --- Nueva sección: Ajuste de translateX basado en si la pantalla crece o decrece ---
  let previousWidth = window.innerWidth;

  function updateLoginBoxPositionOnResize() {
    const Current_Width = window.innerWidth;
    const Width_Difference = Current_Width - previousWidth; // Puede ser positivo (crece) o negativo (decrece)

    // Solo aplica entre 900px y 1000px
    if (Current_Width >= 900 && Current_Width <= 1240) {
      // Obtener el valor actual de translateX
      const Computed_Style = getComputedStyle(Login_Box);
      const Transform_Value = Computed_Style.transform;

      let currentTranslateX = 540 + (window.innerWidth - 900);

      if (Transform_Value !== 'none' && Transform_Value.includes('Matrix')) {
        // Parsear translateX de una matriz (ej: Matrix(1, 0, 0, 1, 692, 0))
        const Matrix = Transform_Value.match(/Matrix.*\((.+)\)/)[1].split(', ');
        currentTranslateX = parseFloat(Matrix[4]) || 540;
      } else if (Transform_Value.includes('translateX')) {
        // Parsear translateX directo (ej: translateX(692px))
        const match = Transform_Value.match(/translateX\(([-\d.]+)px\)/);
        if (match) currentTranslateX = parseFloat(match[1]);
      }

      const New_TranslateX = currentTranslateX + Width_Difference;

      Login_Box.style.transform = `translateX(${New_TranslateX}px)`;
    } else if(Current_Width <= 899) {
      let currentTranslateX = 0;
      Login_Box.style.transform = `translateX(${currentTranslateX}px)`;
    } else if(Current_Width >= 1241) {
      let currentTranslateX = 900;
      Login_Box.style.transform = `translateX(${currentTranslateX}px)`;
    }

    previousWidth = Current_Width;
  }

  if (window.innerWidth >= 900 && window.innerWidth <= 1000) {
    updateLoginBoxPositionOnResize();
    let currentTranslateX = 0;
  }

  // Escuchar cambios de tamaño de ventana
  window.addEventListener('resize', updateLoginBoxPositionOnResize);

  // --- Fin de la nueva sección ---

  if (Button && Login_Box) {
    Button.addEventListener('click', function (e) {
      e.stopPropagation();

      // If the menu is open, close it
      if (Mobile_Menu && Mobile_Menu.classList.contains('visible')) {
        Mobile_Menu.classList.remove('visible');
      }

      // Toggle visibility
      if (Login_Box.style.display === 'none' || getComputedStyle(Login_Box).display === 'none') {
        Login_Box.style.display = 'block';
      } else {
        Login_Box.style.display = 'none';
      }
    });

    // Close the form if a clic is done outside of it
    document.addEventListener('click', function (e) {
      // Check if the form is visible
      if ((getComputedStyle(Login_Box).display) !== 'none') {
        // Check if the clic was done outside of the form 
        if (!Login_Box.contains(e.target) && !Button.contains(e.target)) {
          Login_Box.style.display = 'none';
        }
      }
    });
  }
});