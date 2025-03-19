"use client"

import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, ArrowRight, Target } from "lucide-react";
import Navbar from "@/components/NavBar/Navbar";
import Footer from "@/components/Footer/Footer";
import ScrollIndicator from "@/components/ScrollIndicator/ScrollIndicator";
import ServiceGrid from "@/components/ServiceGrid/ServiceGrid";

function Service4() {
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
    
      return { isInView };
    }
    
    // Animated component that fades in when scrolled into view
    function AnimatedSection({ children, className = "", delay = 0 }) {
      const ref = useRef(null);
      const { isInView } = useInView(ref);
    
      return (
        <div
          ref={ref}
          className={`transform transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } ${className}`}
          style={{ transitionDelay: `${delay}ms` }}
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
              src="/images/service4.jpg"
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
                Στήριξη επιχειρήσεων για ένα κοινωνικά υπεύθυνο μέλλον
              </h1>
              <p className={`mt-6 text-lg text-gray-200 max-w-3xl mx-auto transition-all duration-1000 ease-out ${
                showTitle ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-8"
              }`}>
                Μαζί χτίζουμε το μέλλον που ονειρεύεστε!
              </p>
            </div>
          </div>
          <ScrollIndicator />
        </div>

        {/* Overview Section */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <AnimatedSection className="max-w-4xl mx-auto">
            {/* Featured content panel */}
            <div className="bg-white rounded-xl p-8 mb-12 shadow-sm border border-gray-100 relative overflow-hidden">
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
              
              <p className="mb-6 text-lg leading-relaxed text-gray-700 pl-6">
              Η επιχείρησή μας ειδικεύεται στη δημιουργία καινοτόμων projects εταιρικής κοινωνικής υπευθυνότητας (ΕΚΕ) και καμπανιών κοινωνικής ευαισθητοποίησης που προσφέρουν πραγματική αξία στην κοινωνία και ενισχύουν το κύρος της εταιρείας σας.
              </p>
              <p className="mb-6 text-lg leading-relaxed text-gray-700 pl-6">
              Αναλαμβάνουμε τη σχεδίαση και υλοποίηση προγραμμάτων ΕΚΕ, όπως δράσεις για το περιβάλλον, την εκπαίδευση ή την υγεία, που ενσωματώνονται άψογα στη στρατηγική της εταιρείας σας.
              </p>
              <p className="mb-6 text-lg leading-relaxed text-gray-700 pl-6">
              Ελάτε να συν-δημιουργήσουμε ένα καλύτερο αύριο, μέσα από δράσεις που κάνουν τη διαφορά.
              </p>
            </div>
          </AnimatedSection>
          
        </div>

        <ServiceGrid currentSlug="service4"/>

        {/* Call to Action Section */}
        <AnimatedSection className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl my-20 mx-8 md:mx-16 lg:mx-64 shadow-md">
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

export default Service4;