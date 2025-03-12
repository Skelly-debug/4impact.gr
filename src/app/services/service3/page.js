"use client"

import React, { useState, useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import Navbar from "@/components/NavBar/Navbar";
import Footer from "@/components/Footer/Footer";


function Service3() {
    const [showTitle, setShowTitle] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowTitle(true);
      }, 300);
  
      return () => clearTimeout(timer);
    }, []);
  
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
    
    return (
      <div className="bg-gray-50 overflow-hidden">
        {/* Navbar */}
        <Navbar />
  
        {/* Hero Section */}
        <div className="relative h-screen">
          {/* Background Image */}
          <div className="absolute w-full h-full">
            <img
              className="absolute w-full h-full object-cover"
              src="/images/service7.jpg"
              alt="Background Image"
            />
          </div>
  
          {/* Overlay with gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-black/50 z-1"></div>
  
          {/* Hero Title */}
          <div className="flex justify-center items-center h-full px-4">
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white text-center relative z-10 transition-all duration-1000 ease-out ${
                showTitle
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              service1
            </h1>
          </div>
        </div>
        {/* Content Section */}
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
            <p>
              test
            </p>
      </div>

                {/* Call to Action Section */}
                <AnimatedSection className="py-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl my-12 mx-64 shadow-md">
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
        <Footer />
    </div>
)}

export default Service3;