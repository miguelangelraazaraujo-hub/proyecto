document.addEventListener('DOMContentLoaded', function () {
  const Button = document.querySelector('.js-user-link');
  const Login_Box = document.querySelector('.login-box');

  // Reference to the menu
  const Mobile_Menu = document.querySelector('[data-click-menu-id="mobile-menu"]');

  // --- Nueva sección: Ajuste de translateX basado en si la pantalla crece o decrece ---
  let previousWidth = window.innerWidth;

  function updateLoginBoxPositionOnResize() {
    const currentWidth = window.innerWidth;
    const widthDifference = currentWidth - previousWidth; // Puede ser positivo (crece) o negativo (decrece)

    // Solo aplica entre 900px y 1000px
    if (currentWidth >= 900 && currentWidth <= 1200) {
      // Obtener el valor actual de translateX
      const computedStyle = getComputedStyle(Login_Box);
      const transformValue = computedStyle.transform;

      let currentTranslateX = 540;

      if (transformValue !== 'none' && transformValue.includes('matrix')) {
        // Parsear translateX de una matriz (ej: matrix(1, 0, 0, 1, 692, 0))
        const matrix = transformValue.match(/matrix.*\((.+)\)/)[1].split(', ');
        currentTranslateX = parseFloat(matrix[4]) || 540;
      } else if (transformValue.includes('translateX')) {
        // Parsear translateX directo (ej: translateX(692px))
        const match = transformValue.match(/translateX\(([-\d.]+)px\)/);
        if (match) currentTranslateX = parseFloat(match[1]);
      }

      // Calcular nuevo valor sumando o restando según si creció o decreció
      const newTranslateX = currentTranslateX + widthDifference;

      // Aplicar nuevo transform
      Login_Box.style.transform = `translateX(${newTranslateX}px)`;
    } else if(currentWidth <= 899) {
      let currentTranslateX = 0;
      Login_Box.style.transform = `translateX(${currentTranslateX}px)`;
    }

    // Actualizar el ancho anterior para la próxima comparación
    previousWidth = currentWidth;
  }

  // Aplicar ajuste al cargar la página (por si ya está en una pantalla grande)
  if (window.innerWidth > 900 && window.innerWidth <= 1000) {
    updateLoginBoxPositionOnResize();
  //  let currentTranslateX = 0;
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