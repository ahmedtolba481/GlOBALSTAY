document.getElementById("togglePassword").addEventListener("click", function () {
  const passwordField = document.getElementById("loginPassword");
  const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
  passwordField.setAttribute("type", type);
  
  // Toggle between eye and eye-slash icons
  if (type === "password") {
    this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/></svg>';
  } else {
    this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/><path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/><path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/></svg>';
  }
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

document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const rememberMe = document.getElementById("rememberMe").checked;

  // Validate email format
  if (!AuthUtils.validateEmail(email)) {
    showMessage("danger", "Please enter a valid email address.");
    return;
  }

  // Validate password
  if (!password || password.length < 1) {
    showMessage("danger", "Please enter your password.");
    return;
  }

  try {
    // Show loading state
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Signing in...';
    submitBtn.disabled = true;

    // Authenticate user with proper password hashing
    const authResult = await AuthUtils.authenticateUser(email, password);

    if (authResult.success) {
      // Set login session
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("userFirstName", authResult.user.firstName);
      sessionStorage.setItem("userLastName", authResult.user.lastName);
      sessionStorage.setItem("userEmail", authResult.user.email);
      
      // If remember me is checked, also store in localStorage
      if (rememberMe) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("rememberMe", "true");
      }

      showMessage("success", "Login successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "booking.html";
      }, 1500);
    } else {
      showMessage("danger", authResult.message);
    }
  } catch (error) {
    console.error("Login error:", error);
    showMessage("danger", "An error occurred during login. Please try again.");
  } finally {
    // Reset button state
    const submitBtn = document.querySelector('button[type="submit"]');
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
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
    showMessage("danger", "No account found with this email. Please <a href='signup.html'>sign up</a>.");
  }
});