document.getElementById("togglePassword").addEventListener("click", function () {
  const passwordField = document.getElementById("loginPassword");
  const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
  passwordField.setAttribute("type", type);
  this.textContent = type === "password" ? "show" : "hide";
});

const API_BASE = 'http://localhost:4000/api';

function showMessage(type, message) {
  const messageContainer = document.getElementById("messageContainer");
  messageContainer.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
}

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const rememberMe = document.getElementById("rememberMe").checked;

  fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        const token = data.token;
        const user = data.user;
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userFirstName', user.firstName);
        sessionStorage.setItem('userLastName', user.lastName);
        sessionStorage.setItem('userEmail', user.email);
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('token', token);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userFirstName', user.firstName);
          localStorage.setItem('userLastName', user.lastName);
          localStorage.setItem('userEmail', user.email);
        }
        showMessage('success', 'Login successful! Redirecting...');
        setTimeout(() => { window.location.href = 'booking.html'; }, 1000);
      } else {
        const data = await res.json().catch(() => ({}));
        showMessage('danger', data.error || 'Incorrect email or password.');
      }
    })
    .catch(() => showMessage('danger', 'Network error. Please try again.'));
});

document.getElementById("forgotPasswordLink").addEventListener("click", function(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;

  if (!email) {
    showMessage("warning", "Please enter your email before resetting password.");
    return;
  }
  const modal = new bootstrap.Modal(document.getElementById("forgotModal"));
  modal.show();
  document.querySelector("#forgotModal p").textContent = 
    `If an account exists for ${email}, a reset link will be sent.`;
});
