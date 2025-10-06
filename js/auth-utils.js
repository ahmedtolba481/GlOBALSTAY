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
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

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

    // Store in localStorage (in a real app, this would be sent to a server)
    localStorage.setItem('userData', JSON.stringify(secureUserData));
    return secureUserData;
  }

  // Authenticate user
  static async authenticateUser(email, password) {
    const storedUserData = localStorage.getItem('userData');
    if (!storedUserData) {
      return { success: false, message: 'No account found with this email' };
    }

    try {
      const userData = JSON.parse(storedUserData);
      
      if (userData.email !== email) {
        return { success: false, message: 'No account found with this email' };
      }

      const isValidPassword = await this.verifyPasswordWithSalt(password, userData.passwordHash, userData.salt);
      
      if (isValidPassword) {
        // Update last login
        userData.lastLogin = new Date().toISOString();
        localStorage.setItem('userData', JSON.stringify(userData));
        
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
    const storedUserData = localStorage.getItem('userData');
    if (!storedUserData) return false;
    
    try {
      const userData = JSON.parse(storedUserData);
      return userData.email === email;
    } catch (error) {
      return false;
    }
  }

  // Get user data (without password)
  static getUserData() {
    const storedUserData = localStorage.getItem('userData');
    if (!storedUserData) return null;
    
    try {
      const userData = JSON.parse(storedUserData);
      const { passwordHash, salt, ...safeUserData } = userData;
      return safeUserData;
    } catch (error) {
      return null;
    }
  }

  // Clear user data
  static clearUserData() {
    localStorage.removeItem('userData');
    sessionStorage.clear();
  }
}

// Make AuthUtils available globally
window.AuthUtils = AuthUtils;
