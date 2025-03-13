"use client"

import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, ArrowRight, Target } from "lucide-react";
import Navbar from "@/components/NavBar/Navbar";
import Footer from "@/components/Footer/Footer";

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
                Στρατηγική επικοινωνίας με πραγματικό Αντίκτυπο
              </h1>
              <p className={`mt-6 text-lg text-gray-200 max-w-3xl mx-auto transition-all duration-1000 ease-out ${
                showTitle ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-8"
              }`}>
                Δημιουργούμε στρατηγικές που ξεπερνούν τις προσδοκίες και συνδέουν το κοινό σας με το όραμά σας
              </p>
            </div>
          </div>

          {/* Hero Scroll Indicator */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
            <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center">
              <ArrowRight className="text-white transform rotate-90" size={20} />
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <AnimatedSection className="max-w-4xl mx-auto">
            {/* Decorative element */}
            <div className="w-20 h-1 bg-blue-600 mb-10 mx-auto md:mx-0"></div>
            
            {/* Section title */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              Ολοκληρωμένες λύσεις επικοινωνίας
            </h2>
            
            {/* Featured content panel */}
            <div className="bg-white rounded-xl p-8 mb-12 shadow-sm border border-gray-100 relative overflow-hidden">
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
              
              <p className="mb-6 text-lg leading-relaxed text-gray-700 pl-6">
                Προσφέρουμε ολοκληρωμένες υπηρεσίες στρατηγικής επικοινωνίας, σχεδιασμένες για να κάνουν πραγματική διαφορά στον κόσμο. Κατανοούμε ότι κάθε επιχείρηση και οργανισμός έχει μοναδικές προκλήσεις και ευκαιρίες, και στόχος μας είναι να τις αξιοποιήσουμε στο έπακρο.
              </p>
              
              <div className="w-full flex justify-center my-12">
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center shadow-inner">
                  <Target className="text-blue-600" size={40} />
                </div>
              </div>
              
              <p className="text-lg leading-relaxed text-gray-700 pl-6">
                Είτε είστε μια επιχείρηση που θέλει να εδραιώσει την παρουσία της στην αγορά, είτε μια μεγάλη οργάνωση που επιθυμεί να ανανεώσει τη στρατηγική της, είμαστε εδώ για να σας καθοδηγήσουμε. Εστιάζουμε στην ανάπτυξη και υλοποίηση στρατηγικών που όχι μόνο ενισχύουν την εικόνα και φήμη σας, αλλά δημιουργούν ουσιαστική σύνδεση με το κοινό σας.
              </p>
            </div>
          </AnimatedSection>
          
        </div>

        {/* Process Steps */}
        <div className="bg-gray-100 py-16 mb-16">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Η διαδικασία μας</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Εφαρμόζουμε μια δοκιμασμένη μεθοδολογία για να επιτύχουμε τους στόχους σας</p>
            </AnimatedSection>
            
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connecting line (visible on md screens and up) */}
              <div className="hidden md:block absolute top-24 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-blue-200"></div>
              
              <AnimatedSection className="relative" delay={100}>
                <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 text-center relative">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto -mt-16 mb-6 shadow-md relative z-10">
                    <span className="text-white text-xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">Ανάλυση & Σχεδιασμός</h3>
                  <p className="text-gray-600">Κατανοούμε τις ανάγκες σας και σχεδιάζουμε μια στρατηγική επικοινωνίας προσαρμοσμένη στους στόχους σας.</p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection className="relative" delay={300}>
                <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 text-center relative">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto -mt-16 mb-6 shadow-md relative z-10">
                    <span className="text-white text-xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">Υλοποίηση</h3>
                  <p className="text-gray-600">Εφαρμόζουμε τη στρατηγική με συγκεκριμένες δράσεις και ενέργειες που στοχεύουν στο επιθυμητό αποτέλεσμα.</p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection className="relative" delay={500}>
                <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 text-center relative">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto -mt-16 mb-6 shadow-md relative z-10">
                    <span className="text-white text-xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">Αξιολόγηση & Βελτίωση</h3>
                  <p className="text-gray-600">Αναλύουμε τα αποτελέσματα και προσαρμόζουμε τη στρατηγική για συνεχή βελτίωση και μέγιστη απόδοση.</p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>

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