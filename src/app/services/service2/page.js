"use client"

import React, { useState, useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import Navbar from "@/components/NavBar/Navbar";
import Footer from "@/components/Footer/Footer";
import ScrollIndicator from "@/components/ScrollIndicator/ScrollIndicator";
import ServiceGrid from "@/components/ServiceGrid/ServiceGrid";
import { AnimatedElement } from "@/components/Animations/Animations";
import Link from "next/link";

function Service2() {
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
              src="/images/service2.jpg"
              alt="Background Image"
            />
          </div>
  
          {/* Overlay with gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-black/50 z-1"></div>
  
          {/* Hero Title */}
          <div className="flex justify-center items-center h-full px-4">
            <div className="text-center max-w-5xl">
              <h1
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white text-center relative z-10 transition-all duration-1000 ease-out ${
                  showTitle
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                Στρατηγικός σχεδιασμός και παραγωγή περιεχομένου
              </h1>
              <p className={`mt-6 text-lg text-gray-200 max-w-3xl mx-auto transition-all duration-1000 ease-out ${
                showTitle ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-8"
              }`}>
                Στοχευμένο περιεχόμενο για ουσιαστική σύνδεση με τα κοινά σας
              </p>
            </div>
          </div>
          <ScrollIndicator/>
        </div>

        {/* Overview Section */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <AnimatedSection className="max-w-4xl mx-auto">
            
            {/* Featured content panel */}
            <div className="bg-white rounded-xl p-8 mb-12 shadow-sm border border-gray-100 relative overflow-hidden">
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
              
              <p className="mb-6 text-lg leading-relaxed text-gray-700 pl-6">
              Όσο κι αν ζούμε σε ένα ταχύτατα μεταβαλλόμενο επικοινωνιακό σύμπαν, με το AI να αλλάζει δραματικά τα δεδομένα, το αυθεντικό, ελκυστικό και ουσιωδώς ανθρώπινο περιεχόμενο συνεχίζει και θα συνεχίσει να είναι το Α και το Ω της αποτελεσματικής επικοινωνίας.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-700 pl-6">
              Μαζί μπορούμε να σχεδιάσουμε στρατηγικά το περιεχόμενο που θα σας κάνει να ξεχωρίσετε και να δημιουργήσουμε για εσάς videos, key visuals και κείμενα για όλα τα μέσα που θα αφήσουν το δικό σας μοναδικό αποτύπωμα και θα σας φέρουν σε ουσιαστική επαφή και σύνδεση με τα κοινά σας.
              </p>
            </div>
          </AnimatedSection>
        </div>

        <ServiceGrid currentSlug="service2" />

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
)}

export default Service2;