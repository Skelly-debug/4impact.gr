"use client";

import React from "react";
import Navbar from "@/components/NavBar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useState, useEffect, useRef } from "react";
import { Loader2, ChevronRight } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function ContactClient() {
  const [showTitle, setShowTitle] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [formErrors, setFormErrors] = useState({});

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
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = () => setRecaptchaLoaded(true);
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
      // Generate reCAPTCHA token
      if (!recaptchaLoaded || !window.grecaptcha) {
        throw new Error("reCAPTCHA not loaded");
      }
      
      const recaptchaToken = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action: "submit_contact" }
      );

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
      console.error("Error:", error);
      setSubmitStatus("Προέκυψε ένα σφάλμα. Παρακαλώ δοκιμάστε ξανά.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 selection:bg-blue-500 selection:text-white">
      <div className="bg-gray-100 overflow-hidden">
        <Navbar />
        <div className="relative h-[100vh] overflow-hidden">
          <div className="absolute w-full h-full">
            <img
              className="absolute w-full h-full object-cover"
              src="images/GIA_EPIKOINWNIA_MAYBE.jpg"
              alt="Background Image"
            />
          </div>
          {/* Overlay with gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-black/50 z-1"></div>
          {/* Hero Title */}
          <div className="flex justify-center items-center h-full px-4">
            <div className="text-center max-w-4xl">
              <h1
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white text-center relative z-10 transition-all duration-1000 ease-out ${
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
        {/* Hero Scroll Indicator */}
          <div 
            className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce cursor-pointer"
            onClick={() => {
                window.scrollTo({
                  top: window.innerHeight - 110,
                  behavior: 'smooth'
                });
              }}
          >
            <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center">
              <ChevronRight className="text-white transform rotate-90" size={20} />
            </div>
          </div>
      </div>

      <div className="flex-grow">
        <div className="container mx-auto px-4 py-16 lg:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Contact Info Column */}
            <motion.div
              ref={contactInfoRef}
              initial="hidden"
              animate={contactInfoControls}
              variants={cardVariants}
              className="bg-white shadow-lg rounded-xl p-8 h-full flex flex-col justify-center"
            >
              <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center">
                Τρόποι Επικοινωνίας
              </h2>
              <div className="space-y-4 text-center">
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-2">
                    EMAIL
                  </p>
                  <p className="text-xl text-gray-800 font-medium">
                    info@4impact.gr
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-2">
                    ΤΗΛΕΦΩΝΟ
                  </p>
                  <p className="text-xl text-gray-800 font-medium">
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
              className="bg-white shadow-lg rounded-xl p-8"
            >
              <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center">
                Επικοινωνία
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
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
                    className={`w-full px-4 py-3 border ${
                      formErrors.name ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
                    placeholder="Εισάγετε το όνομά σας"
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
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
                    className={`w-full px-4 py-3 border ${
                      formErrors.email ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
                    placeholder="Εισάγετε το email σας"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Μήνυμα
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    maxLength="5000"
                    rows="4"
                    className={`w-full px-4 py-3 border ${
                      formErrors.message ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
                    placeholder="Πληκτρολογήστε το μήνυμά σας"
                  ></textarea>
                  {formErrors.message && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Αυτή η σελίδα προστατεύεται από το reCAPTCHA για την αποφυγή spam.
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || !recaptchaLoaded}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 disabled:opacity-50"
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