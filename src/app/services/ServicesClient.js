"use client";

import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/NavBar/Navbar";
import ServicesCards from "@/components/ServicesCards/ServicesCards";
import Footer from "@/components/Footer/Footer";
import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react";

// Custom hook for detecting when an element is in viewport
function useInView(ref, options = { threshold: 0.1 }) {
  const [isInView, setIsInView] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return { isInView, showTitle };
}

// Animated component that fades in when scrolled into view
function AnimatedSection({ children, className = "" }) {
  const ref = useRef(null);
  const { isInView } = useInView(ref);

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Service accordion component
function ServiceAccordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6 overflow-hidden bg-white rounded-lg shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
      <button
        className="w-full px-6 py-4 text-left bg-gradient-to-r from-white to-gray-50 hover:from-blue-50 hover:to-indigo-50 flex justify-between items-center transition-colors duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg md:text-xl font-semibold text-gray-800">{title}</h3>
        {isOpen ? 
          <ChevronUp size={20} className="text-blue-600 flex-shrink-0" /> : 
          <ChevronDown size={20} className="text-gray-500 flex-shrink-0" />
        }
      </button>
      <div
        className={`px-6 transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[2000px] py-6" : "max-h-0 py-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

// Process step component for the workflow
function ProcessStep({ number, title, description }) {
  return (
    <div className="relative flex flex-col items-center mb-8 md:mb-0">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white text-2xl font-bold mb-4 shadow-md">
        <span className="relative top-[-3px]">{number}</span>
      </div>
      <h4 className="text-lg font-semibold text-gray-800 text-center mb-2">{title}</h4>
      <p className="text-gray-600 text-center max-w-xs">{description}</p>
      
      {/* Arrow connecting to next step (hidden on last item and on mobile) */}
      {number < 3 && (
        <>
          <div className="hidden md:block absolute top-8 left-full w-8 h-0.5 bg-blue-300"></div>
          <div className="hidden md:block absolute top-[1.8rem] left-[calc(100%+32px)] w-0 h-0 border-t-4 border-b-4 border-l-8 border-t-transparent border-b-transparent border-l-blue-300"></div>
        </>
      )}
    </div>
  );
}

function ServicesClient() {
  const titleRef = useRef(null);
  const { showTitle } = useInView(titleRef);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-screen flex flex-col">
        <div className="flex-grow relative">
          <img
            className="absolute w-full h-full object-cover"
            src="images/SERVICES.jpg"
            alt="Background Image"
          />
          {/* Overlay with gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-black/50"></div>
          <div
            ref={titleRef}
            className="relative z-10 flex justify-center items-center h-full"
          >
            <div className="text-center px-4">
              <h1
                className={`text-5xl md:text-6xl lg:text-7xl font-semibold text-white text-center relative text-shadow-lg shadow-black z-10 transition-all duration-1000 ease-out ${
                  showTitle
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                Υπηρεσίες
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
            <ServicesCards />

          {/* Call to Action Section */}
          <AnimatedSection className="py-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl my-12 shadow-md">
            <div className="text-center max-w-3xl mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Έτοιμοι να κάνουμε τη διαφορά;</h2>
              <p className="text-lg text-gray-700 mb-8">
                Ανακαλύψτε πώς μπορούμε να συνεργαστούμε για να επιτύχετε τους στρατηγικούς σας στόχους
              </p>
              <button
                className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 flex items-center mx-auto group"
                onClick={() => (window.location.href = "/contact")}
              >
                Ας συνεργαστούμε
                <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ServicesClient;