// Authentication Check and User Display
// Add this script to booking.html and any other pages that require login

(function() {
  // Check if user is logged in
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") || localStorage.getItem("isLoggedIn");
  const rememberMe = localStorage.getItem("rememberMe");

  if (!isLoggedIn) {
    // Not logged in, redirect to login page
    window.location.href = "login.html";
    return;
  }

  // If remember me was checked, restore session from localStorage
  if (rememberMe === "true" && !sessionStorage.getItem("isLoggedIn")) {
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("userFirstName", localStorage.getItem("userFirstName"));
    sessionStorage.setItem("userLastName", localStorage.getItem("userLastName"));
    sessionStorage.setItem("userEmail", localStorage.getItem("userEmail"));
  }

  // Get user info
  const firstName = sessionStorage.getItem("userFirstName");
  const lastName = sessionStorage.getItem("userLastName");

  // Update navbar to show user name
  updateNavbar(firstName, lastName);
})();

function updateNavbar(firstName, lastName) {
  const navbar = document.querySelector('.navbar-nav');
  if (!navbar) return;

  // Find the "Book Now" button
  const bookNowItem = navbar.querySelector('.ms-2');
  
  if (bookNowItem) {
    // Create user greeting element with "Welcome"
    const userGreeting = document.createElement('li');
    userGreeting.className = 'nav-item';
    userGreeting.innerHTML = `
      <span class="nav-link" style="color: var(--primary); font-weight: 600;">
        <i class="fas fa-user-circle me-1"></i>Welcome, ${firstName}
      </span>
    `;

    // Create logout button
    const logoutItem = document.createElement('li');
    logoutItem.className = 'nav-item ms-2';
    logoutItem.innerHTML = `
      <button class="btn btn-outline-secondary" onclick="logout()" style="padding: 0.7rem 1.8rem;">
        <i class="fas fa-sign-out-alt me-1"></i>Logout
      </button>
    `;

    // Replace Book Now button with user greeting and logout
    bookNowItem.replaceWith(userGreeting);
    navbar.appendChild(logoutItem);
  }
}

// Logout function
function logout() {
  // Clear session
  sessionStorage.clear();
  
  // If remember me is not checked, clear localStorage login data
  if (localStorage.getItem("rememberMe") !== "true") {
    localStorage.removeItem("isLoggedIn");
  }
  
  // Clear remember me flag
  localStorage.removeItem("rememberMe");
  
  // Redirect to home page
  window.location.href = "../index.html";
}

// Make logout function globally accessible
window.logout = logout;