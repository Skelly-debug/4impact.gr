// src/app/api/contact/route.js

import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use secure connection
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

export async function POST(req) {
  try {
    // Log the raw request body for debugging
    const rawBody = await req.text();
    console.log('Raw Request Body:', rawBody);

    // Parse the JSON manually
    let body;
    try {
      body = JSON.parse(rawBody);
    } catch (parseError) {
      console.error('JSON Parsing Error:', parseError);
      return NextResponse.json(
        { message: "Invalid JSON format", error: parseError.toString() },
        { status: 400 }
      );
    }

    const { name, email, message } = body;

    // Existing validation...
    console.log('Parsed Body:', { name, email, message });

    if (!name || !email || !message) {
      return NextResponse.json(
        { 
          message: "All fields are required",
          receivedData: { name, email, message }
        },
        { status: 400 }
      );
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 }
      );
    }

    // More detailed error logging
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: process.env.RECEPIENT_EMAIL,
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      return NextResponse.json(
        { 
          message: "Προέκυψε ένα σφάλμα κατά την αποστολή email.", 
          error: emailError.toString() 
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Το μήνυμά σας στάλθηκε με επιτυχία!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { 
        message: "Προέκυψε ένα σφάλμα. Παρακαλώ δοκιμάστε ξανά.",
        error: error.toString() 
      },
      { status: 500 }
    );
  }
}