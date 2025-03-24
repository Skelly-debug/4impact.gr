"use client"

import React, { useState, useEffect, useRef } from "react";
import { Target } from "lucide-react";
import Navbar from "@/components/NavBar/Navbar";
import Footer from "@/components/Footer/Footer";
import ScrollIndicator from "@/components/ScrollIndicator/ScrollIndicator";
import ServiceGrid from "@/components/ServiceGrid/ServiceGrid";
import { AnimatedElement } from "@/components/Animations/Animations";
import Link from "next/link";

function Service1() {
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
              src="/images/service3.jpg"
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
                Στρατηγική επικοινωνίας που εστιάζει στο αποτέλεσμα και τις ουσιαστικές συνδέσεις
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
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Πώς δουλευούμε</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Εφαρμόζουμε μια δοκιμασμένη μεθοδολογία για να επιτύχουμε τους στόχους σας</p>
            </AnimatedSection>
            
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connecting line (visible on md screens and up) */}
              <div className="hidden md:block absolute top-24 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-blue-200"></div>
              
              <AnimatedSection className="relative" delay={100}>
                <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 text-center relative">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto -mt-16 pb-1 mb-6 shadow-md relative z-10">
                    <span className="text-white text-xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">Ανάλυση και Έρευνα</h3>
                  <p className="text-gray-600">Κατανοούμε εις βάθος τον οργανισμό σας, το περιβάλλον, το κοινό σας και τους στόχους σας, 
                    ώστε να δημιουργήσουμε μια στρατηγική που να ανταποκρίνεται μόνο στις δικές σας ανάγκες.</p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection className="relative" delay={300}>
                <div className="bg-white rounded-lg p-8 pb-[6.5rem] shadow-sm border border-gray-100 text-center relative">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto -mt-16 mb-6 pb-1 shadow-md relative z-10">
                    <span className="text-white text-xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">Στρατηγικός Σχεδιασμός</h3>
                  <p className="text-gray-600">Σχεδιάζουμε προσμαρμοσμένες στρατηγικές επικοινωνίας με έμφαση στους στόχους σας και την αποτελεσματικότητα.</p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection className="relative" delay={500}>
                <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 text-center relative">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto -mt-16 pb-1 mb-6 shadow-md relative z-10">
                    <span className="text-white text-xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">Αξιολόγηση, Βελτίωση και Προσαρμογή</h3>
                  <p className="text-gray-600">Παρακολουθούμε διαρκώς και αναλύουμε την απόδοση των στρατηγικών μας, 
                    προσαρμόζοντας τις τακτικές μας για τη μέγιστη δυνατή αποτελεσματικότητα.</p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>

        <ServiceGrid currentSlug="service1" />

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

export default Service1;