"use client";

import React from "react";
import Navbar from "@/components/NavBar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef } from "react";

export default function ContactClient() {
  const [showTitle, setShowTitle] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // console.log('Submitting Form Data:', formData);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const responseData = await response.json();
      console.log("Response:", response.status, responseData);

      if (response.ok) {
        setSubmitStatus("Το μήνυμά σας στάλθηκε με επιτυχία!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        // Log the error response
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
          <div className="flex justify-center items-center h-full">
            <h1
              className={`text-6xl font-bold text-white text-center relative text-shadow shadow-black z-10 transition-all duration-1000 ease-out ${
                showTitle
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <span>
                Επικοινωνία
              </span>
            </h1>
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
                {/* <div>
                  <p className="text-sm font-semibold text-gray-500 mb-2">
                    ΔΙΕΥΘΥΝΣΗ
                  </p>
                  <p className="text-lg text-gray-800">
                    Λεωφ. Συγγρού 123, Αθήνα
                  </p>
                </div> */}
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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    placeholder="Εισάγετε το όνομά σας"
                  />
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    placeholder="Εισάγετε το email σας"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Μήνυμα
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    placeholder="Πληκτρολογήστε το μήνυμά σας"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
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
                  <p
                    className={`text-center mt-4 font-medium ${
                      submitStatus.includes("επιτυχία")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {submitStatus}
                  </p>
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
