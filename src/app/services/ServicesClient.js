"use client";

import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/NavBar/Navbar";
import ServicesCards from "@/components/ServicesCards/ServicesCards";
import Footer from "@/components/Footer/Footer";
import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
import ScrollIndicator from "@/components/ScrollIndicator/ScrollIndicator";
import { AnimatedElement } from "@/components/Animations/Animations";
import Link from "next/link";

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
              Υπηρεσίες
            </h1>
          </div>
        </div>
      </div>
      <ScrollIndicator/>
      </div>


      {/* Main Content */}
      <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
            <ServicesCards />
        </div>
      </div>
            {/* Call to Action Section */}
            <AnimatedElement animation="fade-up" delay={300}>
        <div className="bg-gray-100 py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Έτοιμοι να κάνουμε τη διαφορά;</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Ανακαλύψτε πώς μπορούμε να συνεργαστούμε για να επιτύχετε τους στρατηγικούς σας στόχους
            </p>
            <Link
              className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-700 text-white text-xl font-semibold py-4 px-8 rounded-lg shadow-lg hover:from-cyan-600 hover:to-cyan-800 transition-all duration-300 transform hover:scale-105"
              href="/contact"
            >
              Ας συνεργαστούμε
            </Link>
          </div>
        </div>
      </AnimatedElement>

      

      <Footer />
    </div>
  );
}

export default ServicesClient;