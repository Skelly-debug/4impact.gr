"use client";

import React from "react";
import Navbar from "@/components/NavBar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useState, useEffect, useRef } from "react";
import { Loader2 } from 'lucide-react';
import { motion, useAnimation, useInView } from "framer-motion";
import ScrollIndicator from "@/components/ScrollIndicator/ScrollIndicator";

export default function ContactClient() {
  const [showTitle, setShowTitle] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const recaptchaRef = useRef(null);

  // Ref and animation controls for cards
  const contactInfoRef = useRef(null);
  const formRef = useRef(null);
  const contactInfoInView = useInView(contactInfoRef, { once: true });
  const formInView = useInView(formRef, { once: true });
  const contactInfoControls = useAnimation();
  const formControls = useAnimation();

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(true);
    }, 300);

    // Trigger animations when cards come into view
    if (contactInfoInView) {
      contactInfoControls.start("visible");
    }
    if (formInView) {
      formControls.start("visible");
    }

    // Load reCAPTCHA script
    const loadRecaptcha = () => {
      // Remove any existing reCAPTCHA scripts to avoid duplicates
      const existingScript = document.querySelector('script[src*="recaptcha"]');
      if (existingScript) {
        existingScript.remove();
      }

      // Create and add the script
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        console.log("reCAPTCHA script loaded successfully");
        if (window.grecaptcha) {
          window.grecaptcha.ready(() => {
            console.log("reCAPTCHA is ready");
            setRecaptchaLoaded(true);
          });
        } else {
          console.error("grecaptcha not available after script load");
        }
      };
      
      script.onerror = (error) => {
        console.error("Error loading reCAPTCHA script:", error);
      };
      
      document.head.appendChild(script);
    };

    loadRecaptcha();
    return () => clearTimeout(timer);
  }, [contactInfoInView, formInView, contactInfoControls, formControls]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    
    // Clear errors when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Validate name (not empty and reasonable length)
    if (!formData.name.trim()) {
      errors.name = "Το όνομα είναι υποχρεωτικό";
    } else if (formData.name.length > 100) {
      errors.name = "Το όνομα είναι πολύ μεγάλο";
    }
    
    // Validate email (proper format)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      errors.email = "Το email είναι υποχρεωτικό";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Μη έγκυρη μορφή email";
    } else if (formData.email.length > 100) {
      errors.email = "Το email είναι πολύ μεγάλο";
    }
    
    // Validate message (not empty and reasonable length)
    if (!formData.message.trim()) {
      errors.message = "Το μήνυμα είναι υποχρεωτικό";
    } else if (formData.message.length > 5000) {
      errors.message = "Το μήνυμα είναι πολύ μεγάλο";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // For development/testing, use a dummy token if needed
      let recaptchaToken = "dummy-token-for-testing";
      
      // Only try to get a real token if not in development mode with bypass
      if (process.env.NODE_ENV !== 'development' || process.env.NEXT_PUBLIC_BYPASS_RECAPTCHA !== 'true') {
        if (!recaptchaLoaded || !window.grecaptcha) {
          throw new Error("reCAPTCHA not loaded");
        }
        
        try {
          // Use a simpler approach to get the token
          recaptchaToken = await new Promise((resolve, reject) => {
            window.grecaptcha.ready(function() {
              window.grecaptcha.execute(
                process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, 
                {action: 'submit'}
              ).then(resolve).catch(reject);
            });
          });
          
          console.log("Generated reCAPTCHA token successfully");
        } catch (recaptchaError) {
          console.error("Error generating reCAPTCHA token:", recaptchaError);
          // Continue with the dummy token in case of error
        }
      } else {
        console.log("Using dummy token for development");
      }

      // Send form data with reCAPTCHA token
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          recaptchaToken: recaptchaToken,
        }),
      });

      const responseData = await response.json();
      console.log("Server response:", response.status, responseData);

      if (response.ok) {
        setSubmitStatus("Το μήνυμά σας στάλθηκε με επιτυχία!");
        setFormData({ name: "", email: "", message: "" });
      } else if (response.status === 429) {
        setSubmitStatus("Έχετε στείλει πολλά μηνύματα. Παρακαλώ δοκιμάστε αργότερα.");
      } else {
        setSubmitStatus(
          responseData.message || "Αποτυχία αποστολής. Παρακαλώ δοκιμάστε ξανά."
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("Προέκυψε ένα σφάλμα. Παρακαλώ δοκιμάστε ξανά.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-paper selection:bg-brand selection:text-ink">
      <div className="bg-paper overflow-hidden">
        <Navbar />
        <div className="hero">
          <div className="absolute w-full h-full">
            <img
              className="hero-media"
              src="images/GIA_EPIKOINWNIA_MAYBE.jpg"
              alt="Background Image"
            />
          </div>
          {/* Overlay with gradient effect */}
          <div className="hero-shade"></div>
          {/* Hero Title */}
          <div className="hero-inner">
            <div className="hero-copy">
              <h1
                className={`hero-title transition-all duration-1000 ease-out ${
                  showTitle
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                Επικοινωνία
              </h1>
            </div>
          </div>
        </div>
        <ScrollIndicator />
      </div>

      <div className="flex-grow">
        <div className="wrap py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-0 items-stretch">
            {/* Contact Info Column */}
            <motion.div
              ref={contactInfoRef}
              initial="hidden"
              animate={contactInfoControls}
              variants={cardVariants}
              className="bg-ink text-white p-10 md:p-14 h-full flex flex-col justify-center"
            >
              <h2 className="text-4xl font-black tracking-tight mb-10 text-brand text-left">
                Τρόποι Επικοινωνίας
              </h2>
              <div className="space-y-8 text-left">
                <div>
                  <p className="text-sm font-bold tracking-[0.2em] text-brand mb-2">
                    EMAIL
                  </p>
                  <p className="text-2xl md:text-3xl text-white font-black tracking-tight break-words">
                    info@4impact.gr
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold tracking-[0.2em] text-brand mb-2">
                    ΤΗΛΕΦΩΝΟ
                  </p>
                  <p className="text-2xl md:text-3xl text-white font-black tracking-tight break-words">
                    +30 697 185 9632
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Form Column */}
            <motion.div
              ref={formRef}
              initial="hidden"
              animate={formControls}
              variants={cardVariants}
              className="bg-white p-10 md:p-14 border border-ink/10"
            >
              <h2 className="text-4xl font-black tracking-tight mb-10 text-ink text-left">
                Επικοινωνία
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-bold text-ink mb-2"
                  >
                    Όνομα
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    maxLength="100"
                    className={`w-full px-4 py-4 border bg-paper/60 ${
                      formErrors.name ? "border-red-500" : "border-ink/25"
                    } rounded-none focus:outline-none focus:border-ink focus:ring-2 focus:ring-brand transition duration-300`}
                    placeholder="Εισάγετε το όνομά σας"
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold text-ink mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    maxLength="100"
                    className={`w-full px-4 py-4 border bg-paper/60 ${
                      formErrors.email ? "border-red-500" : "border-ink/25"
                    } rounded-none focus:outline-none focus:border-ink focus:ring-2 focus:ring-brand transition duration-300`}
                    placeholder="Εισάγετε το email σας"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-bold text-ink mb-2"
                  >
                    Μήνυμα
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    maxLength="2000"
                    rows="4"
                    className={`w-full px-4 py-4 border bg-paper/60 ${
                      formErrors.message ? "border-red-500" : "border-ink/25"
                    } rounded-none focus:outline-none focus:border-ink focus:ring-2 focus:ring-brand transition duration-300`}
                    placeholder="Πληκτρολογήστε το μήνυμά σας (μέχρι 2000 χαρακτήρες)"
                  ></textarea>
                  {formErrors.message && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
                  )}
                </div>
                <div className="text-xs text-ink/55 mt-2">
                  Αυτή η σελίδα προστατεύεται από το reCAPTCHA για την αποφυγή spam.
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-ink text-white py-4 rounded-full font-bold hover:bg-brand hover:text-ink focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 transition duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 inline animate-spin" />
                      Αποστολή...
                    </>
                  ) : (
                    "Αποστολή Μηνύματος"
                  )}
                </button>
                {submitStatus && (
                  <div
                    className={`text-center mt-4 font-medium p-3 rounded-lg ${
                      submitStatus.includes("επιτυχία")
                        ? "text-green-700 bg-green-100"
                        : "text-red-700 bg-red-100"
                    }`}
                  >
                    {submitStatus}
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
