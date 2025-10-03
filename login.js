
document.getElementById("togglePassword").addEventListener("click", function () {
  const passwordField = document.getElementById("loginPassword");
  const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
  passwordField.setAttribute("type", type);

  this.textContent = type === "password" ? "show" : "hide";
});

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

  const storedEmail = localStorage.getItem("userEmail");
  const storedPassword = localStorage.getItem("userPassword");

  if (!storedEmail || !storedPassword) {
    showMessage("warning", " No account found. Please <a href='signup.html'>create one</a> first.");
    return;
  }

  if (email === storedEmail && password === storedPassword) {
    showMessage("success", " Login successful! Redirecting...");
    setTimeout(() => {
      window.location.href = "booking.html";
    }, 1500);
  } else {
    showMessage("danger", " Incorrect email or password.");
  }
});

document.getElementById("forgotPasswordLink").addEventListener("click", function(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;

  if (!email) {
    showMessage("warning", "Please enter your email before resetting password.");
    return;
  }

  const storedEmail = localStorage.getItem("userEmail");
  if (email === storedEmail) {
    const modal = new bootstrap.Modal(document.getElementById("forgotModal"));
    modal.show();
    document.querySelector("#forgotModal p").textContent = 
      `A password reset link has been sent to ${email}.`;
  } else {
    showMessage("danger", " No account found with this email. Please <a href='signup.html'>sign up</a>.");
  }
});
