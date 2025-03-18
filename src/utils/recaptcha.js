/**
 * Validates a reCAPTCHA token by sending it to Google's verification endpoint
 * @param {string} token - The reCAPTCHA token to validate
 * @returns {Promise<boolean>} - Whether the token is valid
 */
export async function validateRecaptcha(token) {
  try {
    // Make sure we have a token to validate
    if (!token) {
      console.error("No reCAPTCHA token provided");
      return false;
    }

    // Send the token to Google's verification endpoint
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: token,
        }),
      }
    );

    // Parse the response
    const data = await response.json();
    
    // Log the response for debugging
    console.log("reCAPTCHA verification response:", data);

    // Check if the verification was successful
    if (data.success) {
      // Optionally, you can also check the score for v3 reCAPTCHA
      // and determine a threshold (e.g., 0.5)
      if (data.score !== undefined && data.score < 0.5) {
        console.warn(`reCAPTCHA score too low: ${data.score}`);
        return false;
      }
      return true;
    } else {
      console.error("reCAPTCHA verification failed:", data["error-codes"]);
      return false;
    }
  } catch (error) {
    console.error("Error validating reCAPTCHA:", error);
    return false;
  }
}
