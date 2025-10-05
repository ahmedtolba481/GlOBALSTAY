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

document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Check if passwords match
  if (password !== confirmPassword) {
    showMessage("danger", "❌ Passwords do not match!");
    return;
  }

  // Send signup to backend
  fetch(`${API_BASE}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName, email, password })
  })
    .then(async (res) => {
      if (res.status === 201) {
        showMessage("success", "✅ Signup successful! Redirecting to login...");
        setTimeout(() => { window.location.href = "login.html"; }, 1500);
      } else if (res.status === 409) {
        showMessage("warning", "⚠️ This email is already registered. Please <a href='login.html'>login</a> instead.");
      } else {
        const data = await res.json().catch(() => ({}));
        showMessage("danger", data.error || "❌ Signup failed. Please try again.");
      }
    })
    .catch(() => {
      showMessage("danger", "❌ Network error. Please try again.");
    });
});
