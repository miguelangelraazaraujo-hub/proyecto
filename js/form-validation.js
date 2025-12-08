document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector('.login-box-section');
  const signupForm = document.querySelector('.sign-up-box-section');

  // Exit if no forms
  if (!loginForm && !signupForm) return;

  // LOGIN FORM
  if (loginForm) {
    const loginUsername = loginForm.querySelector('input[name="username"]');
    const loginPassword = loginForm.querySelector('input[name="password"]');
    const loginBtn = loginForm.querySelector('.btn-ani-big');

    // Check if login fields are filled
    function isLoginValid() {
      return loginUsername.value.trim().length > 0 && loginPassword.value.length > 0;
    }

    // Update login button enabled state
    function updateLoginButton() {
      loginBtn.disabled = !isLoginValid();
    }

    // Listen for input changes
    loginUsername.addEventListener('input', updateLoginButton);
    loginPassword.addEventListener('input', updateLoginButton);

    // Prevent invalid submit
    loginForm.addEventListener('submit', function (e) {
      if (!isLoginValid()) {
        e.preventDefault();
        alert('Please fill in both username and password.');
      }
    });

    // Set initial button state
    updateLoginButton();
  }

  // SIGN-UP FORM
  if (signupForm) {
    const username = signupForm.querySelector('input[name="username"]');
    const password = signupForm.querySelector('input[name="password"]');
    const email = signupForm.querySelector('input[name="correo"]');
    const terms = signupForm.querySelector('input[name="terms"]');
    const signupBtn = signupForm.querySelector('.btn-ani-big');

    // Validate username: 3-20 chars, letters/numbers/_- only
    function validateUsername(value) {
      return /^[a-zA-Z0-9_-]{3,20}$/.test(value.trim());
    }

    // Validate password: at least 6 chars
    function validatePassword(value) {
      return value.length >= 6;
    }

    // Validate email using browser logic
    function validateEmail(value) {
      const input = document.createElement('input');
      input.type = 'email';
      input.value = value.trim();
      return input.validity.valid;
    }

    // Check if all sign-up fields are valid
    function isSignupValid() {
      return validateUsername(username.value) &&
             validatePassword(password.value) &&
             validateEmail(email.value) &&
             terms.checked;
    }

    // Update sign-up button enabled state
    function updateSignupButton() {
      signupBtn.disabled = !isSignupValid();
    }

    // Listen for input and checkbox changes
    username.addEventListener('input', updateSignupButton);
    password.addEventListener('input', updateSignupButton);
    email.addEventListener('input', updateSignupButton);
    terms.addEventListener('change', updateSignupButton);

    // Prevent invalid submit
    signupForm.addEventListener('submit', function (e) {
      if (!isSignupValid()) {
        e.preventDefault();
        alert('Please fill in all fields correctly and accept the terms.');
      }
    });

    // Set initial button state
    updateSignupButton();
  }
});