import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

// Improved reCAPTCHA validation function
async function validateRecaptcha(token) {
  try {
    // For development/testing with bypass enabled
    if (process.env.BYPASS_RECAPTCHA === "true") {
      console.log("Bypassing reCAPTCHA validation (server-side)")
      return true
    }

    // Make sure we have a token and secret key
    if (!token) {
      console.error("No reCAPTCHA token provided")
      return false
    }

    // Handle dummy token for testing
    if (token === "dummy-token-for-testing") {
      console.log("Using dummy token for testing")
      return true
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY
    if (!secretKey) {
      console.error("RECAPTCHA_SECRET_KEY is not defined in environment variables")
      return false
    }

    // Use URLSearchParams for proper encoding
    const params = new URLSearchParams({
      secret: secretKey,
      response: token,
    })

    // Make the verification request to Google
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    })

    // Check if the request was successful
    if (!response.ok) {
      console.error("reCAPTCHA verification failed with status:", response.status)
      return false
    }

    // Parse the response
    const data = await response.json()
    console.log("reCAPTCHA verification response:", data)

    // Check if the verification was successful
    if (data.success) {
      // For reCAPTCHA v3, check the score
      if (data.score !== undefined) {
        console.log(`reCAPTCHA score: ${data.score}`)
        // You can adjust this threshold based on your needs
        if (data.score < 0.3) {
          console.warn(`reCAPTCHA score too low: ${data.score}`)
          return false
        }
      }
      return true
    } else {
      console.error("reCAPTCHA verification failed:", data["error-codes"])
      return false
    }
  } catch (error) {
    console.error("Error validating reCAPTCHA:", error)
    return false
  }
}

// Create a nodemailer transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_EMAIL_APP_PASSWORD
    }
  });
}

// Send email function
const sendEmail = async (name, email, message) => {
  const transporter = createTransporter();

  try {
    // Email to the company
    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
      replyTo: email
    });

    // Optional: Send confirmation email to the sender
    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: email,
      subject: 'We received your message',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thank you for contacting us!</h2>
          <p>We have received your message and will get back to you soon.</p>
          <p>Best regards,<br>4Impact Team</p>
        </div>
      `
    });

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// Rate limiting mechanism
const requestCache = new Map();

const isRateLimited = (ip) => {
  const now = Date.now();
  const requestInfo = requestCache.get(ip) || { count: 0, lastRequestTime: now };
  
  // Reset count if more than 1 hour has passed
  if (now - requestInfo.lastRequestTime > 3600000) {
    requestInfo.count = 0;
    requestInfo.lastRequestTime = now;
  }

  // Limit to 5 requests per hour
  if (requestInfo.count >= 5) {
    return true;
  }

  requestInfo.count += 1;
  requestInfo.lastRequestTime = now;
  requestCache.set(ip, requestInfo);

  return false;
}

export async function POST(request) {
  try {
    // Get client IP (works with Vercel)
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    // Check rate limiting
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { message: "Έχετε στείλει πολλά μηνύματα. Παρακαλώ δοκιμάστε αργότερα." }, 
        { status: 429 }
      );
    }

    // Parse the request body
    const body = await request.json()
    console.log("Received form submission:", {
      name: body.name,
      email: body.email,
      messageLength: body.message?.length,
      hasRecaptchaToken: !!body.recaptchaToken,
    })

    // Check for required fields
    if (!body.name || !body.email || !body.message) {
      console.error("Missing required fields:", {
        hasName: !!body.name,
        hasEmail: !!body.email,
        hasMessage: !!body.message,
      })
      return NextResponse.json({ message: "Όλα τα πεδία είναι υποχρεωτικά" }, { status: 400 })
    }

    // Validate reCAPTCHA token (if not bypassed)
    let recaptchaValid = true

    if (process.env.BYPASS_RECAPTCHA !== "true") {
      console.log("Validating reCAPTCHA token...")
      recaptchaValid = await validateRecaptcha(body.recaptchaToken)
    } else {
      console.log("Bypassing reCAPTCHA validation")
    }

    if (!recaptchaValid) {
      console.error("reCAPTCHA validation failed")
      return NextResponse.json(
        { message: "Αποτυχία επαλήθευσης. Παρακαλώ δοκιμάστε ξανά." },
        { status: 400 }
      );
    }

    // Send email
    const emailSent = await sendEmail(body.name, body.email, body.message);

    if (!emailSent) {
      return NextResponse.json(
        { message: "Προέκυψε σφάλμα κατά την αποστολή του μηνύματος." }, 
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Το μήνυμά σας στάλθηκε με επιτυχία!" }, { status: 200 })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ message: "Προέκυψε ένα σφάλμα. Παρακαλώ δοκιμάστε ξανά." }, { status: 500 })
  }
}