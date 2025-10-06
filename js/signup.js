// Toggle password visibility for signup password
document.getElementById("toggleSignupPassword").addEventListener("click", function () {
  const passwordField = document.getElementById("signupPassword");
  const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
  passwordField.setAttribute("type", type);
  
  // Toggle between eye and eye-slash icons
  if (type === "password") {
    this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/></svg>';
  } else {
    this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/><path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/><path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/></svg>';
  }
});

// Toggle password visibility for confirm password
document.getElementById("toggleConfirmPassword").addEventListener("click", function () {
  const passwordField = document.getElementById("confirmPassword");
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

// Password strength indicator with detailed tips
document.getElementById("signupPassword").addEventListener("input", function() {
  const password = this.value;
  const indicator = document.getElementById("passwordStrengthIndicator");
  const strengthBar = document.getElementById("passwordStrengthBar");
  const strengthText = document.getElementById("passwordStrengthText");
  const suggestions = document.getElementById("passwordSuggestions");
  const suggestionList = document.getElementById("suggestionList");
  
  if (password.length > 0) {
    indicator.style.display = "block";
    
    const validation = AuthUtils.validatePasswordStrength(password);
    const strength = validation.strength;
    
    // Check individual requirements
    const hasLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_-]/.test(password);
    
    // Update requirement checkmarks
    updateRequirement('req-length', hasLength);
    updateRequirement('req-uppercase', hasUpperCase);
    updateRequirement('req-lowercase', hasLowerCase);
    updateRequirement('req-number', hasNumbers);
    updateRequirement('req-special', hasSpecialChar);
    
    // Update progress bar
    let width = 0;
    let color = "bg-danger";
    
    switch (strength) {
      case "Weak":
        width = 25;
        color = "bg-danger";
        break;
      case "Medium":
        width = 50;
        color = "bg-warning";
        break;
      case "Strong":
        width = 75;
        color = "bg-info";
        break;
      case "Very Strong":
        width = 100;
        color = "bg-success";
        break;
    }
    
    strengthBar.style.width = width + "%";
    strengthBar.className = `progress-bar ${color}`;
    strengthText.textContent = `Password strength: ${strength}`;
    
    // Show/hide suggestions based on password strength
    const goodMessage = document.getElementById('passwordGoodMessage');
    
    if (strength === "Weak" || strength === "Medium") {
      suggestions.style.display = "block";
      if (goodMessage) goodMessage.style.display = "none";
      showPasswordSuggestions(password, hasLength, hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar);
    } else if (strength === "Strong" || strength === "Very Strong") {
      suggestions.style.display = "none";
      if (goodMessage) goodMessage.style.display = "block";
    } else {
      suggestions.style.display = "none";
      if (goodMessage) goodMessage.style.display = "none";
    }
  } else {
    indicator.style.display = "none";
  }
});

// Update individual requirement status
function updateRequirement(reqId, isValid) {
  const req = document.getElementById(reqId);
  const icon = req.querySelector('i');
  
  if (isValid) {
    icon.className = 'fas fa-check text-success me-1';
    req.className = 'text-success';
  } else {
    icon.className = 'fas fa-times text-danger me-1';
    req.className = 'text-muted';
  }
}

// Show password suggestions
function showPasswordSuggestions(password, hasLength, hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar) {
  const suggestionList = document.getElementById('suggestionList');
  const suggestions = [];
  
  if (!hasLength) {
    suggestions.push('• Make it longer (12+ characters recommended)');
  }
  
  if (!hasUpperCase) {
    suggestions.push('• Add uppercase letters (A, B, C...)');
  }
  
  if (!hasLowerCase) {
    suggestions.push('• Add lowercase letters (a, b, c...)');
  }
  
  if (!hasNumbers) {
    suggestions.push('• Include numbers (1, 2, 3...)');
  }
  
      if (!hasSpecialChar) {
        suggestions.push('• Add special characters (!, @, #, $, _, -...)');
      }
  
  // Additional tips for stronger passwords
  if (password.length < 12) {
    suggestions.push('• Use 12+ characters for better security');
  }
  
  if (password.length > 0 && password.length < 8) {
    suggestions.push('• Consider using a passphrase instead of a password');
  }
  
  if (password.length > 0 && !password.includes(' ') && password.length < 16) {
    suggestions.push('• Try using multiple words with spaces or special characters');
  }
  
  // Check for common patterns
  if (password.length > 0) {
    if (password === password.toLowerCase() || password === password.toUpperCase()) {
      suggestions.push('• Mix uppercase and lowercase letters throughout');
    }
    
    if (/123|abc|qwe|asd|zxc/i.test(password)) {
      suggestions.push('• Avoid common keyboard patterns (123, abc, qwe)');
    }
    
    if (password.length > 0 && password.length < 6) {
      suggestions.push('• Consider using a memorable phrase: "MyDog@2024!"');
    }
  }
  
  suggestionList.innerHTML = suggestions.map(suggestion => `<li>${suggestion}</li>`).join('');
}

// Handle password tips dropdown toggle
document.getElementById("passwordTipsToggle").addEventListener("click", function() {
  const tipsCollapse = document.getElementById('passwordTipsCollapse');
  const isExpanded = tipsCollapse.classList.contains('show');
  
  if (isExpanded) {
    this.innerHTML = '<i class="fas fa-lightbulb me-1"></i>Show Tips';
  } else {
    this.innerHTML = '<i class="fas fa-lightbulb me-1"></i>Hide Tips';
  }
});

document.getElementById("signupForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Validate required fields
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    showMessage("danger", "Please fill in all required fields.");
    return;
  }

  // Validate email format
  if (!AuthUtils.validateEmail(email)) {
    showMessage("danger", "Please enter a valid email address.");
    return;
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    showMessage("danger", "❌ Passwords do not match!");
    return;
  }

  // Validate password strength
  const passwordValidation = AuthUtils.validatePasswordStrength(password);
  if (!passwordValidation.isValid) {
    const errorList = passwordValidation.errors.map(error => `• ${error}`).join('<br>');
    showMessage("danger", `Password requirements not met:<br>${errorList}`);
    return;
  }

  // Check if email already exists
  if (AuthUtils.userExists(email)) {
    showMessage("warning", "⚠️ This email is already registered. Please <a href='login.html'>login</a> instead.");
    return;
  }

  try {
    // Show loading state
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Creating account...';
    submitBtn.disabled = true;

    // Create user with secure password hashing
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };

    await AuthUtils.storeUserData(userData);

    showMessage("success", `✅ Account created successfully! Password strength: ${passwordValidation.strength}. Redirecting to login...`);
  setTimeout(() => {
    window.location.href = "login.html";
    }, 2000);
  } catch (error) {
    console.error("Signup error:", error);
    showMessage("danger", "An error occurred during signup. Please try again.");
  } finally {
    // Reset button state
    const submitBtn = document.querySelector('button[type="submit"]');
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
});