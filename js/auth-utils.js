// Authentication Utilities
// This file provides secure password hashing and authentication functions

class AuthUtils {
  // Simple password hashing using Web Crypto API
  static async hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  // Verify password against stored hash
  static async verifyPassword(password, storedHash) {
    const hashedPassword = await this.hashPassword(password);
    return hashedPassword === storedHash;
  }

  // Password strength validation
  static validatePasswordStrength(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_-]/.test(password);

    const errors = [];
    
    if (password.length < minLength) {
      errors.push(`Password must be at least ${minLength} characters long`);
    }
    if (!hasUpperCase) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!hasLowerCase) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!hasNumbers) {
      errors.push('Password must contain at least one number');
    }
    if (!hasSpecialChar) {
      errors.push('Password must contain at least one special character');
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
      strength: this.calculatePasswordStrength(password, hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar)
    };
  }

  // Calculate password strength score
  static calculatePasswordStrength(password, hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar) {
    let score = 0;
    
    // Length bonus
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    
    // Character type bonuses
    if (hasUpperCase) score += 1;
    if (hasLowerCase) score += 1;
    if (hasNumbers) score += 1;
    if (hasSpecialChar) score += 1;
    
    // Determine strength level
    if (score <= 3) return 'Weak';
    if (score <= 5) return 'Medium';
    if (score <= 7) return 'Strong';
    return 'Very Strong';
  }

  // Email validation
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Generate a secure random salt
  static generateSalt() {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  // Enhanced password hashing with salt
  static async hashPasswordWithSalt(password, salt = null) {
    if (!salt) {
      salt = this.generateSalt();
    }
    const saltedPassword = password + salt;
    const hash = await this.hashPassword(saltedPassword);
    return { hash, salt };
  }

  // Verify password with salt
  static async verifyPasswordWithSalt(password, storedHash, salt) {
    const saltedPassword = password + salt;
    const hashedPassword = await this.hashPassword(saltedPassword);
    return hashedPassword === storedHash;
  }

  // Store user data securely
  static async storeUserData(userData) {
    const { password, ...userDataWithoutPassword } = userData;
    const { hash, salt } = await this.hashPasswordWithSalt(password);
    
    const secureUserData = {
      ...userDataWithoutPassword,
      passwordHash: hash,
      salt: salt,
      createdAt: new Date().toISOString(),
      lastLogin: null
    };

    // Get existing users or create new object
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    
    // Store user by email as key
    users[userData.email] = secureUserData;
    
    // Store all users back to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    return secureUserData;
  }

  // Authenticate user
  static async authenticateUser(email, password) {
    const storedUsers = localStorage.getItem('users');
    if (!storedUsers) {
      return { success: false, message: 'No account found with this email' };
    }

    try {
      const users = JSON.parse(storedUsers);
      const userData = users[email];
      
      if (!userData) {
        return { success: false, message: 'No account found with this email' };
      }

      const isValidPassword = await this.verifyPasswordWithSalt(password, userData.passwordHash, userData.salt);
      
      if (isValidPassword) {
        // Update last login
        userData.lastLogin = new Date().toISOString();
        users[email] = userData;
        localStorage.setItem('users', JSON.stringify(users));
        
        return { 
          success: true, 
          user: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            createdAt: userData.createdAt,
            lastLogin: userData.lastLogin
          }
        };
      } else {
        return { success: false, message: 'Incorrect password' };
      }
    } catch (error) {
      return { success: false, message: 'Authentication error' };
    }
  }

  // Check if user exists
  static userExists(email) {
    const storedUsers = localStorage.getItem('users');
    if (!storedUsers) return false;
    
    try {
      const users = JSON.parse(storedUsers);
      return !!users[email];
    } catch (error) {
      return false;
    }
  }

  // Get user data (without password)
  static getUserData(email) {
    const storedUsers = localStorage.getItem('users');
    if (!storedUsers) return null;
    
    try {
      const users = JSON.parse(storedUsers);
      const userData = users[email];
      if (!userData) return null;
      
      const { passwordHash, salt, ...safeUserData } = userData;
      return safeUserData;
    } catch (error) {
      return null;
    }
  }

  // Get current logged-in user data
  static getCurrentUserData() {
    const userEmail = sessionStorage.getItem('userEmail') || localStorage.getItem('userEmail');
    console.log('getCurrentUserData - userEmail:', userEmail);
    
    if (!userEmail) return null;
    
    // First try to get from the users object
    const userData = this.getUserData(userEmail);
    console.log('getCurrentUserData - userData from users object:', userData);
    
    if (userData) return userData;
    
    // Fallback: construct user data from individual sessionStorage/localStorage fields
    const firstName = sessionStorage.getItem('userFirstName') || localStorage.getItem('userFirstName');
    const lastName = sessionStorage.getItem('userLastName') || localStorage.getItem('userLastName');
    
    console.log('getCurrentUserData - firstName from storage:', firstName);
    console.log('getCurrentUserData - lastName from storage:', lastName);
    
    if (firstName || lastName) {
      const fallbackData = {
        email: userEmail,
        firstName: firstName || '',
        lastName: lastName || ''
      };
      console.log('getCurrentUserData - returning fallback data:', fallbackData);
      return fallbackData;
    }
    
    console.log('getCurrentUserData - returning null');
    return null;
  }

  // Clear user data
  static clearUserData() {
    // Don't clear 'users' data as it contains all registered accounts
    // Only clear session and login status
    sessionStorage.clear();
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('userFirstName');
    localStorage.removeItem('userLastName');
    localStorage.removeItem('userEmail');
  }
}

// Make AuthUtils available globally
window.AuthUtils = AuthUtils;
