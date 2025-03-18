// Simple in-memory rate limiter
// For production, consider using Redis or another persistent store

const WINDOW_MS = 60 * 60 * 1000; // 1 hour window
const MAX_REQUESTS_PER_WINDOW = 5; // 5 requests per hour

// Store IP addresses and their request counts
const ipRequests = new Map();

/**
 * Rate limits requests based on IP address
 * @param {string} ip - The IP address to rate limit
 * @returns {Promise<{success: boolean, remaining: number}>} - Whether the request is allowed and how many requests remain
 */
export async function rateLimit(ip) {
  const now = Date.now();
  
  // Clean up old entries every 100 requests
  if (Math.random() < 0.01) {
    for (const [storedIp, data] of ipRequests.entries()) {
      if (now - data.timestamp > WINDOW_MS) {
        ipRequests.delete(storedIp);
      }
    }
  }
  
  // Get or create entry for this IP
  const ipData = ipRequests.get(ip) || { 
    count: 0, 
    timestamp: now 
  };
  
  // Reset count if window has passed
  if (now - ipData.timestamp > WINDOW_MS) {
    ipData.count = 0;
    ipData.timestamp = now;
  }
  
  // Check if rate limit is exceeded
  if (ipData.count >= MAX_REQUESTS_PER_WINDOW) {
    return { 
      success: false, 
      remaining: 0 
    };
  }
  
  // Increment count and update timestamp
  ipData.count++;
  ipRequests.set(ip, ipData);
  
  return { 
    success: true, 
    remaining: MAX_REQUESTS_PER_WINDOW - ipData.count 
  };
}
