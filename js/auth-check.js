// Authentication Check and User Display
// Add this script to booking.html and any other pages that require login

const API_BASE = 'http://localhost:4000/api';

(function() {
  const token = sessionStorage.getItem('token') || localStorage.getItem('token');
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  fetch(`${API_BASE}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
    .then(async (res) => {
      if (!res.ok) throw new Error('unauthorized');
      const { user } = await res.json();
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userFirstName', user.firstName);
      sessionStorage.setItem('userLastName', user.lastName);
      sessionStorage.setItem('userEmail', user.email);
      updateNavbar(user.firstName, user.lastName);
    })
    .catch(() => {
      sessionStorage.clear();
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      window.location.href = "login.html";
    });
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
  sessionStorage.clear();
  localStorage.removeItem('token');
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('rememberMe');
  window.location.href = "../index.html";
}

// Make logout function globally accessible
window.logout = logout;