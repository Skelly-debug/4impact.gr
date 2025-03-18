// src/app/api/contact/route.js

import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { rateLimit } from "@/utils/rate-limiter"; // You'll need to create this utility
import { sanitizeInput } from "@/utils/sanitize"; // You'll need to create this utility
import { validateRecaptcha } from "@/utils/recaptcha"; // You'll need to create this utility

// Create a transporter outside the handler function to reuse connections
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_EMAIL_APP_PASSWORD, // Use app-specific password instead of account password
  },
});

// Maximum size for request body (in bytes)
const MAX_CONTENT_LENGTH = 10000;

export async function POST(req) {
  try {
    // Check request size to prevent DoS attacks
    const contentLength = parseInt(req.headers.get("content-length") || "0");
    if (contentLength > MAX_CONTENT_LENGTH) {
      return NextResponse.json(
        { message: "Request body too large" },
        { status: 413 }
      );
    }

    // Apply rate limiting based on IP address
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const rateLimitResult = await rateLimit(ip);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { message: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Read and parse request body
    const rawBody = await req.text();
    let body;
    try {
      body = JSON.parse(rawBody);
    } catch (parseError) {
      console.error("JSON Parsing Error:", parseError);
      return NextResponse.json(
        { message: "Invalid JSON format" },
        { status: 400 }
      );
    }

    // Validate required fields
    const { name, email, message, recaptchaToken } = body;
    if (!name || !email || !message || !recaptchaToken) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate reCAPTCHA token
    const recaptchaValid = await validateRecaptcha(recaptchaToken);
    if (!recaptchaValid) {
      return NextResponse.json(
        { message: "reCAPTCHA validation failed" },
        { status: 400 }
      );
    }

    // Sanitize inputs to prevent XSS/injection attacks
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedMessage = sanitizeInput(message);

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 }
      );
    }

    // Validate input lengths
    if (sanitizedName.length > 100 || sanitizedEmail.length > 100 || sanitizedMessage.length > 5000) {
      return NextResponse.json(
        { message: "Input exceeds maximum allowed length" },
        { status: 400 }
      );
    }

    // Build email content with sanitized data
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: process.env.RECIPIENT_EMAIL, // Fixed typo in env variable name
      subject: "New Contact Form Submission",
      text: `Name: ${sanitizedName}\nEmail: ${sanitizedEmail}\nMessage: ${sanitizedMessage}`,
      html: `<p><strong>Name:</strong> ${sanitizedName}</p>
             <p><strong>Email:</strong> ${sanitizedEmail}</p>
             <p><strong>Message:</strong> ${sanitizedMessage}</p>`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      
      // Don't expose internal error details to client
      return NextResponse.json(
        { message: "Προέκυψε ένα σφάλμα κατά την αποστολή email." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Το μήνυμά σας στάλθηκε με επιτυχία!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    
    // Don't expose internal error details to client
    return NextResponse.json(
      { message: "Προέκυψε ένα σφάλμα. Παρακαλώ δοκιμάστε ξανά." },
      { status: 500 }
    );
  }
}