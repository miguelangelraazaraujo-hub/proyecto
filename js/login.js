document.addEventListener('DOMContentLoaded', function () {
  const Button = document.querySelector('.js-user-link');
  const Login_Box = document.querySelector('.login-box');

  // Reference to the menu
  const Mobile_Menu = document.querySelector('[data-click-menu-id="mobile-menu"]');

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
      if (getComputedStyle(Login_Box).display !== 'none') {
        // Check if the clic was done outside of the form 
        if (!Login_Box.contains(e.target) && !Button.contains(e.target)) {
          Login_Box.style.display = 'none';
        }
      }
    });
  }
});