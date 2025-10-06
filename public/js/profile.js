(function initProfile() {
  const firstName =
    sessionStorage.getItem("userFirstName") ||
    localStorage.getItem("userFirstName");
  const lastName =
    sessionStorage.getItem("userLastName") ||
    localStorage.getItem("userLastName");
  const email =
    sessionStorage.getItem("userEmail") || localStorage.getItem("userEmail");
  const storedPassword = localStorage.getItem("userPassword") || "";

  const nameEl = document.getElementById("profileName");
  const emailEl = document.getElementById("profileEmail");
  const pwdEl = document.getElementById("profilePassword");

  if (nameEl)
    nameEl.textContent = `${firstName || "-"} ${lastName || ""}`.trim();
  if (emailEl) emailEl.textContent = email || "-";

  if (pwdEl) {
    const len = storedPassword.length;
    pwdEl.textContent = len ? "•".repeat(Math.min(len, 12)) : "********";
  }
})();

