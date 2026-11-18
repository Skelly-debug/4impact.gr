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
      <div className="bg-paper text-ink overflow-hidden">
        {/* Navbar */}
        <Navbar />
  
        {/* Hero Section */}
        <div className="hero">
          {/* Background Image */}
          <div className="absolute w-full h-full">
            <img
              className="hero-media"
              src="/images/service2.jpg"
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
                Στρατηγικός σχεδιασμός και παραγωγή περιεχομένου
              </h1>
              <p className={`hero-sub transition-all duration-1000 ease-out ${
                showTitle ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-8"
              }`}>
                Στοχευμένο περιεχόμενο για ουσιαστική σύνδεση με τα κοινά σας
              </p>
            </div>
          </div>
          <ScrollIndicator/>
        </div>

        {/* Overview Section */}
        <div className="wrap py-20 md:py-28">
          <AnimatedSection className="max-w-5xl mx-auto">
            
            {/* Featured content panel */}
            <div className="bg-white p-8 md:p-14 mb-12 border border-ink/10 relative overflow-hidden">
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 w-3 h-full bg-brand"></div>
              
              <p className="mb-6 text-xl md:text-[1.35rem] leading-relaxed text-ink/80 pl-6 md:pl-8">
              Όσο κι αν ζούμε σε ένα ταχύτατα μεταβαλλόμενο επικοινωνιακό σύμπαν, με το AI να αλλάζει δραματικά τα δεδομένα, το αυθεντικό, ελκυστικό και ουσιωδώς ανθρώπινο περιεχόμενο συνεχίζει και θα συνεχίσει να είναι το Α και το Ω της αποτελεσματικής επικοινωνίας.
              </p>
              
              <p className="text-xl md:text-[1.35rem] leading-relaxed text-ink/80 pl-6 md:pl-8">
              Μαζί μπορούμε να σχεδιάσουμε στρατηγικά το περιεχόμενο που θα σας κάνει να ξεχωρίσετε και να δημιουργήσουμε για εσάς videos, key visuals και κείμενα για όλα τα μέσα που θα αφήσουν το δικό σας μοναδικό αποτύπωμα και θα σας φέρουν σε ουσιαστική επαφή και σύνδεση με τα κοινά σας.
              </p>
            </div>
          </AnimatedSection>
        </div>

        <ServiceGrid currentSlug="service2" />

            {/* Call to Action Section */}
            <AnimatedElement animation="fade-up" delay={300}>
        <div className="cta-band">
          <div className="cta-inner">
            <h2 className="cta-title">Έτοιμοι να κάνουμε τη διαφορά;</h2>
            <p className="cta-text">
            Ανακαλύψτε πώς μπορούμε να συνεργαστούμε για να επιτύχετε τους στρατηγικούς σας στόχους
            </p>
            <Link
              className="btn btn-ink"
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