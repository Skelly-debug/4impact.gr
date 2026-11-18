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
      <div className="bg-paper text-ink overflow-hidden">
        {/* Navbar */}
        <Navbar />
  
        {/* Hero Section */}
        <div className="hero">
          {/* Background Image */}
          <div className="absolute w-full h-full">
            <img
              className="hero-media"
              src="/images/service3.jpg"
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
                Στρατηγική επικοινωνίας με πραγματικό Αντίκτυπο
              </h1>
              <p className={`hero-sub transition-all duration-1000 ease-out ${
                showTitle ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-8"
              }`}>
                Στρατηγική επικοινωνίας που εστιάζει στο αποτέλεσμα και τις ουσιαστικές συνδέσεις
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
                Προσφέρουμε ολοκληρωμένες υπηρεσίες στρατηγικής επικοινωνίας, σχεδιασμένες για να κάνουν πραγματική διαφορά στον κόσμο. Κατανοούμε ότι κάθε επιχείρηση και οργανισμός έχει μοναδικές προκλήσεις και ευκαιρίες, και στόχος μας είναι να τις αξιοποιήσουμε στο έπακρο.
              </p>
              
              <div className="w-full flex justify-center my-12">
                <div className="w-24 h-24 rounded-full bg-brand-tint flex items-center justify-center">
                  <Target className="text-brand-deep" size={40} />
                </div>
              </div>
              
              <p className="text-xl md:text-[1.35rem] leading-relaxed text-ink/80 pl-6 md:pl-8">
                Είτε είστε μια επιχείρηση που θέλει να εδραιώσει την παρουσία της στην αγορά, είτε μια μεγάλη οργάνωση που επιθυμεί να ανανεώσει τη στρατηγική της, είμαστε εδώ για να σας καθοδηγήσουμε. Εστιάζουμε στην ανάπτυξη και υλοποίηση στρατηγικών που όχι μόνο ενισχύουν την εικόνα και φήμη σας, αλλά δημιουργούν ουσιαστική σύνδεση με το κοινό σας.
              </p>
            </div>
          </AnimatedSection>
          
        </div>

        {/* Process Steps */}
        <div className="bg-ink text-white py-24 md:py-28">
          <div className="wrap">
            <AnimatedSection className="mb-20">
              <h2 className="section-title on-dark mb-6 text-[clamp(2rem,4vw,3.5rem)]">Πώς δουλευούμε</h2>
              <p className="text-white/65 max-w-2xl text-lg">Εφαρμόζουμε μια δοκιμασμένη μεθοδολογία για να επιτύχουμε τους στόχους σας</p>
            </AnimatedSection>
            
            <div className="max-w-none grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connecting line (visible on md screens and up) */}
              <div className="hidden md:block absolute top-24 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-brand/40"></div>
              
              <AnimatedSection className="relative" delay={100}>
                <div className="bg-ink-soft p-8 border border-white/10 text-center relative h-full">
                  <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center mx-auto -mt-16 pb-1 mb-6 ring-8 ring-ink relative z-10">
                    <span className="text-ink text-2xl font-black">1</span>
                  </div>
                  <h3 className="text-xl font-black tracking-tight mb-3 text-white">Ανάλυση και Έρευνα</h3>
                  <p className="text-white/65">Κατανοούμε εις βάθος τον οργανισμό σας, το περιβάλλον, το κοινό σας και τους στόχους σας, 
                    ώστε να δημιουργήσουμε μια στρατηγική που να ανταποκρίνεται μόνο στις δικές σας ανάγκες.</p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection className="relative" delay={300}>
                <div className="bg-ink-soft p-8 border border-white/10 text-center relative h-full">
                  <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center mx-auto -mt-16 mb-6 pb-1 ring-8 ring-ink relative z-10">
                    <span className="text-ink text-2xl font-black">2</span>
                  </div>
                  <h3 className="text-xl font-black tracking-tight mb-3 text-white">Στρατηγικός Σχεδιασμός</h3>
                  <p className="text-white/65">Σχεδιάζουμε προσμαρμοσμένες στρατηγικές επικοινωνίας με έμφαση στους στόχους σας και την αποτελεσματικότητα.</p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection className="relative" delay={500}>
                <div className="bg-ink-soft p-8 border border-white/10 text-center relative h-full">
                  <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center mx-auto -mt-16 pb-1 mb-6 ring-8 ring-ink relative z-10">
                    <span className="text-ink text-2xl font-black">3</span>
                  </div>
                  <h3 className="text-xl font-black tracking-tight mb-3 text-white">Αξιολόγηση, Βελτίωση και Προσαρμογή</h3>
                  <p className="text-white/65">Παρακολουθούμε διαρκώς και αναλύουμε την απόδοση των στρατηγικών μας, 
                    προσαρμόζοντας τις τακτικές μας για τη μέγιστη δυνατή αποτελεσματικότητα.</p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>

        <ServiceGrid currentSlug="service1" />

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

export default Service1;