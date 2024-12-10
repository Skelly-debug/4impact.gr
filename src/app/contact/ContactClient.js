"use client";

import React from "react";
import Navbar from "@/components/NavBar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useState, useEffect } from "react";

function ContactClient() {
  const [showTitle, setShowTitle] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset status and set loading
    setSubmitStatus({
      loading: true,
      success: false,
      error: false,
      message: "",
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Ensure we always parse the response, even if it's an error
      const responseData = await response
        .text()
        .then((text) =>
          text
            ? JSON.parse(text)
            : { success: false, message: "No response from server" }
        );

      if (responseData.success) {
        setSubmitStatus({
          loading: false,
          success: true,
          error: false,
          message: responseData.message || "Message sent successfully!",
        });

        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error(responseData.message || "Submission failed");
      }
    } catch (error) {
      setSubmitStatus({
        loading: false,
        success: false,
        error: true,
        message: error.message || "Something went wrong. Please try again.",
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-playfair-display bg-gray-100 min-h-screen">
      <Navbar />
      <div className="relative h-[60vh]">
        <img
          className="absolute w-full h-full object-cover"
          src="https://placehold.co/1920x1080"
          alt="Background Image"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 z-1"></div>
        <div className="flex justify-center items-center h-full">
          <h1
            className={`text-5xl font-bold text-neutral-800 text-center relative text-shadow shadow-black z-10 transition-all duration-1000 ease-out ${
              showTitle
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Επικοινωνία
          </h1>
        </div>
      </div>
      <div className="max-w-[98%] mx-auto p-8 text-gray-800">
        {submitStatus.message && (
          <div
            className={`
            mb-4 p-4 rounded 
            ${
              submitStatus.success
                ? "bg-green-100 text-green-700"
                : submitStatus.error
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }
          `}
          >
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Name"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your.email@example.com"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={submitStatus.loading}
            className={`
              w-full py-2 px-4 rounded-md 
              transition duration-300 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
              ${
                submitStatus.loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }
            `}
          >
            {submitStatus.loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default ContactClient;
