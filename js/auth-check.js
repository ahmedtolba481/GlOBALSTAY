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
  // Don't modify the navbar - let the existing profile dropdown handle user display
  // The profile dropdown is already in the HTML and will show the user icon
  return;
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