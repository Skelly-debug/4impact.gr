// src/utils/sanitize.js

/**
 * Sanitizes user input to prevent XSS and injection attacks
 * @param {string} input - The input to sanitize
 * @returns {string} - Sanitized input
 */
export function sanitizeInput(input) {
    if (typeof input !== 'string') {
      return '';
    }
    
    return input
      // Replace HTML special characters with their encoded equivalents
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      // Remove potentially dangerous patterns
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .replace(/data:/gi, '')
      // Trim whitespace
      .trim();
  }
  
  /**
   * Sanitizes an object's string properties
   * @param {Object} obj - The object with properties to sanitize
   * @returns {Object} - Object with sanitized properties
   */
  export function sanitizeObject(obj) {
    const sanitized = {};
    
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        sanitized[key] = sanitizeInput(value);
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = sanitizeObject(value);
      } else {
        sanitized[key] = value;
      }
    }
    
    return sanitized;
  }