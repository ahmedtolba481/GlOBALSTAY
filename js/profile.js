(function initProfile() {
  let firstName = '';
  let lastName = '';
  let email = '';

  // Try to get user data from the new authentication system
  try {
    if (typeof AuthUtils !== 'undefined' && AuthUtils.getCurrentUserData) {
      const userData = AuthUtils.getCurrentUserData();
      if (userData) {
        firstName = userData.firstName || '';
        lastName = userData.lastName || '';
        email = userData.email || '';
      }
    }
  } catch (error) {
    console.log('AuthUtils not available, using fallback');
  }

  // Fallback to sessionStorage/localStorage
  if (!firstName) {
    firstName = sessionStorage.getItem("userFirstName") || localStorage.getItem("userFirstName") || '';
  }
  if (!lastName) {
    lastName = sessionStorage.getItem("userLastName") || localStorage.getItem("userLastName") || '';
  }
  if (!email) {
    email = sessionStorage.getItem("userEmail") || localStorage.getItem("userEmail") || '';
  }

  const nameEl = document.getElementById("profileName");
  const emailEl = document.getElementById("profileEmail");
  const pwdEl = document.getElementById("profilePassword");

  if (nameEl)
    nameEl.textContent = `${firstName || "-"} ${lastName || ""}`.trim();
  if (emailEl) emailEl.textContent = email || "-";

  if (pwdEl) {
    // Don't show actual password, just show placeholder
    pwdEl.textContent = "********";
  }
})();

