/**
 * Sanitizes user input to prevent XSS attacks
 * @param {string} input - The input to sanitize
 * @returns {string} - The sanitized input
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return '';
  }
  
  // Replace HTML special characters with their entity equivalents
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
