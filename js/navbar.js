
// Shared Navbar Component
// This file creates a consistent navbar across all pages

class NavbarComponent {
  constructor() {
    this.currentPage = this.getCurrentPage();
    this.isLoggedIn = this.checkLoginState();
  }

  getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('Aboutus.html')) return 'about';
    if (path.includes('booking.html')) return 'booking';
    if (path.includes('profile.html')) return 'profile';
    if (path.includes('login.html')) return 'login';
    if (path.includes('signup.html')) return 'signup';
    return 'home';
  }

  checkLoginState() {
    return sessionStorage.getItem('isLoggedIn') === 'true' || 
           localStorage.getItem('isLoggedIn') === 'true';
  }

  generateNavbar() {
    const navbarHtml = `
      <nav class="navbar navbar-expand-xl navbar-light fixed-top">
        <div class="container">
          <a class="navbar-brand" href="${this.getHomeLink()}">
            <img
              src="${this.getImagePath()}assets/img/logo.jpg"
              alt="Globalstay"
            />
            <span>Globalstay</span>
          </a>

          <button
            title="toggle nav"
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              ${this.generateNavItems()}
              ${this.generateAuthItems()}
            </ul>
          </div>
        </div>
      </nav>
    `;
    return navbarHtml;
  }

  getHomeLink() {
    return this.currentPage === 'home' ? '#home' : this.getRelativePath() + 'index.html#home';
  }

  getImagePath() {
    return this.currentPage === 'home' ? '' : '../';
  }

  getRelativePath() {
    return this.currentPage === 'home' ? '' : '../';
  }

  generateNavItems() {
    const navItems = [
      { href: this.getHomeLink(), text: 'Home', active: this.currentPage === 'home' },
      { href: this.currentPage === 'home' ? '#why' : this.getRelativePath() + 'index.html#why', text: 'Why Us', active: false },
      { href: this.currentPage === 'home' ? '#hotels' : this.getRelativePath() + 'index.html#hotels', text: 'Hotels', active: false },
      { href: this.currentPage === 'home' ? '#testimonials' : this.getRelativePath() + 'index.html#testimonials', text: 'Testimonials', active: false },
      { href: this.currentPage === 'home' ? '#contact' : this.getRelativePath() + 'index.html#contact', text: 'Contact', active: false },
      { href: this.getRelativePath() + 'pages/Aboutus.html', text: 'About', active: this.currentPage === 'about' }
    ];

    return navItems.map(item => `
      <li class="nav-item">
        <a class="nav-link ${item.active ? 'active' : ''}" href="${item.href}">${item.text}</a>
      </li>
    `).join('');
  }

  generateAuthItems() {
    if (this.currentPage === 'login' || this.currentPage === 'signup') {
      return ''; // No auth items on login/signup pages
    }

    if (this.currentPage === 'profile') {
      return `
        <li class="nav-item ms-2 d-flex align-items-center">
          <div class="profile-icon-container me-3" id="navbarProfileIconContainer" style="width: 32px; height: 32px; border-radius: 50%; overflow: hidden; display: flex; align-items: center; justify-content: center; background-color: var(--primary);">
            <img id="navbarProfileIconImage" src="" alt="Profile" style="width: 100%; height: 100%; object-fit: cover; display: none;">
            <i id="navbarProfileIconFallback" class="fas fa-user" style="color: white; font-size: 16px;"></i>
          </div>
          <span class="text-dark me-3" id="profileUserName">Loading...</span>
          <button class="btn btn-outline-dark btn-sm" onclick="logout()">
            <i class="fas fa-sign-out-alt me-1"></i>Logout
          </button>
        </li>
      `;
    }

    return `
      <li class="nav-item ms-2">
        <a class="btn btn-book" href="${this.getRelativePath()}pages/booking.html">Book Now</a>
      </li>
      <!-- Sign In Button (shown when logged out) -->
      <li class="nav-item ms-2" id="signInItem" style="display: none;">
        <a class="btn btn-book" href="${this.getRelativePath()}pages/login.html">Sign In</a>
      </li>
      
      <!-- Profile Dropdown (shown when logged in) -->
      <li class="nav-item dropdown ms-2" id="profileItem" style="display: none;">
        <a class="nav-link dropdown-toggle" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <div class="profile-icon-container" id="profileIconContainer" style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden; display: flex; align-items: center; justify-content: center; background-color: var(--primary); position: relative;">
            <img id="profileIconImage" src="" alt="Profile" style="width: 18px; height: 18px; object-fit: cover; display: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); border-radius: 50%;">
            <i id="navbarProfileIconFallback" class="fas fa-user" style="color: white; font-size: 18px; line-height: 1; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;"></i>
          </div>
        </a>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
          <li><div class="dropdown-header" id="userNameDisplay">Loading...</div></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="${this.getRelativePath()}pages/profile.html"><i class="fas fa-user me-2"></i>View Profile</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="#" onclick="logout()"><i class="fas fa-sign-out-alt me-2"></i>Logout</a></li>
        </ul>
      </li>
    `;
  }

  // Load user name in dropdown
  loadUserName() {
    const userNameDisplay = document.getElementById('userNameDisplay') || document.getElementById('profileUserName');
    if (!userNameDisplay) return;

    let firstName = '';
    let lastName = '';

    // Try to get user data from the new authentication system
    try {
      if (typeof AuthUtils !== 'undefined' && AuthUtils.getCurrentUserData) {
        const userData = AuthUtils.getCurrentUserData();
        if (userData) {
          firstName = userData.firstName || '';
          lastName = userData.lastName || '';
        }
      }
    } catch (error) {
      console.log('AuthUtils not available, using fallback');
    }

    // Fallback to sessionStorage/localStorage
    if (!firstName) {
      firstName = sessionStorage.getItem('userFirstName') || localStorage.getItem('userFirstName') || '';
    }
    if (!lastName) {
      lastName = sessionStorage.getItem('userLastName') || localStorage.getItem('userLastName') || '';
    }

    // Display full name
    if (firstName && lastName) {
      userNameDisplay.textContent = `${firstName} ${lastName}`;
    } else if (firstName) {
      userNameDisplay.textContent = firstName;
    } else {
      userNameDisplay.textContent = 'User';
    }
  }

  // Load profile icon
  loadProfileIcon() {
    const profileIconImage = document.getElementById('profileIconImage') || document.getElementById('navbarProfileIconImage');
    const profileIconFallback = document.getElementById('profileIconFallback') || document.getElementById('navbarProfileIconFallback');
    
    if (!profileIconImage || !profileIconFallback) return;

    // Check for saved profile picture
    const savedPicture = localStorage.getItem('profilePicture');
    const savedIcon = localStorage.getItem('profilePictureIcon');
    
    if (savedPicture) {
      // Show uploaded image
      profileIconImage.src = savedPicture;
      profileIconImage.style.display = 'block';
      profileIconFallback.style.display = 'none';
    } else if (savedIcon) {
      // Show preset icon - create a new icon element
      const newIcon = document.createElement('i');
      newIcon.className = savedIcon;
      newIcon.style.color = 'white';
      newIcon.style.fontSize = profileIconFallback.style.fontSize || '20px';
      
      // Replace the fallback icon
      profileIconFallback.parentNode.replaceChild(newIcon, profileIconFallback);
      newIcon.id = profileIconFallback.id;
    } else {
      // Show default user icon
      profileIconImage.style.display = 'none';
      profileIconFallback.style.display = 'block';
    }
  }

  // Check login state and update navbar
  updateNavbarState() {
    this.isLoggedIn = this.checkLoginState();
    
    if (this.currentPage === 'login' || this.currentPage === 'signup' || this.currentPage === 'profile') {
      return; // These pages handle their own navbar
    }

    const signInItem = document.getElementById('signInItem');
    const profileItem = document.getElementById('profileItem');

    if (this.isLoggedIn) {
      // User is logged in - show profile dropdown
      if (signInItem) signInItem.style.display = 'none';
      if (profileItem) profileItem.style.display = 'block';
      this.loadUserName();
      this.loadProfileIcon();
    } else {
      // User is not logged in - show sign in button
      if (signInItem) signInItem.style.display = 'block';
      if (profileItem) profileItem.style.display = 'none';
    }
  }

  // Logout function
  logout() {
    // Use AuthUtils to properly clear user data
    if (typeof AuthUtils !== 'undefined') {
      AuthUtils.clearUserData();
    } else {
      // Fallback to manual clearing
      sessionStorage.clear();
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('userData');
    }
    window.location.href = this.getRelativePath() + 'index.html';
  }

  // Initialize navbar
  init() {
    // Insert navbar into container
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
      navbarContainer.innerHTML = this.generateNavbar();
      // Hide fallback navbar
      const fallbackNav = document.getElementById('fallback-navbar');
      if (fallbackNav) {
        fallbackNav.style.display = 'none';
      }
    } else {
      // Fallback: replace existing navbar if container doesn't exist
      const existingNav = document.querySelector('nav');
      if (existingNav) {
        existingNav.outerHTML = this.generateNavbar();
      }
    }

    // Add logout function to global scope
    window.logout = () => this.logout();

    // Update navbar state
    setTimeout(() => {
      this.updateNavbarState();
      this.initScrollSpy();
    }, 100);
  }

  // Initialize scroll spy for section highlighting
  initScrollSpy() {
    // Only run on home page
    if (this.currentPage !== 'home') return;

    // Wait for DOM to be fully loaded
    setTimeout(() => {
      const sections = ['home', 'hotels', 'why', 'testimonials', 'contact'];
      const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

      // Function to update active nav link
      const updateActiveNavLink = () => {
        let current = '';
        const scrollPos = window.scrollY;
        
        sections.forEach(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + window.scrollY;
            const elementBottom = elementTop + rect.height;
            
            // Check if section is in viewport
            const isInView = scrollPos >= elementTop - 200 && scrollPos < elementBottom - 200;
            
            if (isInView) {
              current = section;
            }
          }
        });

        // Update nav links
        navLinks.forEach(link => {
          link.classList.remove('active');
          const href = link.getAttribute('href');
          
          if (href && current) {
            // Check if href contains the current section
            if (href.includes('#' + current)) {
              link.classList.add('active');
            }
          }
        });
      };

      // Add scroll event listener
      window.addEventListener('scroll', updateActiveNavLink);
      
      // Initial call
      updateActiveNavLink();
    }, 500);
  }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing navbar...');
  
  try {
    const navbar = new NavbarComponent();
    console.log('Navbar component created successfully');
    navbar.init();
    console.log('Navbar initialized successfully');
  } catch (error) {
    console.error('Error initializing navbar:', error);
    // Fallback: show a simple navbar if the component fails
    const navbarContainer = document.getElementById('navbar-container');
    console.log('Navbar container found:', !!navbarContainer);
    
    if (navbarContainer) {
      navbarContainer.innerHTML = `
        <nav class="navbar navbar-expand-xl navbar-light fixed-top">
          <div class="container">
            <a class="navbar-brand" href="index.html">
              <span>Globalstay</span>
            </a>
            <div class="navbar-nav ms-auto">
              <a class="nav-link" href="index.html">Home</a>
              <a class="nav-link" href="pages/Aboutus.html">About</a>
            </div>
          </div>
        </nav>
      `;
      console.log('Fallback navbar inserted');
    } else {
      console.error('Navbar container not found!');
    }
  }
});

// Also try to initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
  console.log('DOM still loading, waiting for DOMContentLoaded');
} else {
  console.log('DOM already loaded, initializing navbar immediately');
  try {
    const navbar = new NavbarComponent();
    navbar.init();
  } catch (error) {
    console.error('Error initializing navbar immediately:', error);
  }
}
