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

  // Check if email already exists
  const existingEmail = localStorage.getItem("userEmail");
  if (existingEmail === email) {
    showMessage("warning", "⚠️ This email is already registered. Please <a href='login.html'>login</a> instead.");
    return;
  }

  // Store user data
  localStorage.setItem("userFirstName", firstName);
  localStorage.setItem("userLastName", lastName);
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPassword", password);

  showMessage("success", "✅ Signup successful! Redirecting to login...");
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
});
