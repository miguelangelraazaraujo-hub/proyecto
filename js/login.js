document.addEventListener('DOMContentLoaded', function () {
  const Button = document.querySelector('.js-user-link');
  const Login_Box = document.querySelector('.login-box');

  if (Button && Login_Box) {
    Button.addEventListener('click', function () {
      if (Login_Box.style.display === 'none') {
        Login_Box.style.display = 'block';
      } else {
        Login_Box.style.display = 'none';
      }
    });
  }
});