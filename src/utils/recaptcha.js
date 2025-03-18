// src/utils/recaptcha.js

/**
 * Validates a reCAPTCHA token with Google's API
 * @param {string} token - The reCAPTCHA token to validate
 * @returns {Promise<boolean>} - Whether the token is valid
 */
export async function validateRecaptcha(token) {
    if (!token) {
      return false;
    }
  
    try {
      // Google reCAPTCHA verification endpoint
      const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: token,
        }),
      });
  
      const data = await response.json();
      
      // Check if the verification was successful
      if (data.success && data.score >= 0.5) {
        // For v3 reCAPTCHA, we can use the score to determine if it's likely a bot
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('reCAPTCHA validation error:', error);
      return false;
    }
  }