// src/utils/rate-limiter.js

// Simple in-memory store for rate limiting
// In production, consider using Redis or another persistent store
const ipRequestMap = new Map();

/**
 * Rate limits requests based on IP address
 * @param {string} ip - The IP address to check
 * @param {number} limit - Maximum number of requests allowed in the window
 * @param {number} windowMs - Time window in milliseconds
 * @returns {Object} - Result of the rate limit check
 */
export async function rateLimit(ip, limit = 5, windowMs = 60000) {
  const now = Date.now();
  
  // Get or create record for this IP
  if (!ipRequestMap.has(ip)) {
    ipRequestMap.set(ip, []);
  }
  
  // Get request timestamps for this IP
  const requests = ipRequestMap.get(ip);
  
  // Filter out requests outside the current time window
  const recentRequests = requests.filter(timestamp => now - timestamp < windowMs);
  
  // Check if rate limit is exceeded
  if (recentRequests.length >= limit) {
    return {
      success: false,
      remaining: 0,
      resetTime: Math.min(...recentRequests) + windowMs
    };
  }
  
  // Add current request timestamp
  recentRequests.push(now);
  ipRequestMap.set(ip, recentRequests);
  
  // Clean up old entries periodically
  if (Math.random() < 0.01) { // 1% chance to clean up on each request
    cleanupOldEntries(windowMs);
  }
  
  return {
    success: true,
    remaining: limit - recentRequests.length,
    resetTime: now + windowMs
  };
}

/**
 * Cleans up old entries from the rate limiter
 * @param {number} windowMs - Time window in milliseconds
 */
function cleanupOldEntries(windowMs) {
  const now = Date.now();
  
  for (const [ip, timestamps] of ipRequestMap.entries()) {
    const validTimestamps = timestamps.filter(time => now - time < windowMs);
    
    if (validTimestamps.length === 0) {
      ipRequestMap.delete(ip);
    } else if (validTimestamps.length !== timestamps.length) {
      ipRequestMap.set(ip, validTimestamps);
    }
  }
}