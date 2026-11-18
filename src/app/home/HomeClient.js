"use client";
import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import Navbar from "@/components/NavBar/Navbar";
import LogoSlider from "@/components/LogoSlider/LogoSlider";
import ServicesGrid from "@/components/ServicesSection/ServicesSection";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import { AnimatedElement } from "@/components/Animations/Animations";
import HiddenAdminButton from "@/components/HiddenAdminButton/HiddenAdminButton";


export default function HomeClient() {
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-paper text-ink overflow-hidden">
      <HiddenAdminButton />
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="hero">
        {/* Background Image */}
        <div className="absolute w-full h-full">
          <img
            className="hero-media"
            src="images/AKOMA_KAI_FRONTPAGE.jpg"
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
              Στρατηγική επικοινωνία για πραγματική αλλαγή!
            </h1>
            <p className={`hero-sub transition-all duration-1000 ease-out ${
              showTitle ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-8"
            }`}>
              Δημιουργούμε στρατηγικές που ξεπερνούν τις προσδοκίες και συνδέουν το κοινό σας με το όραμά σας
            </p>
          </div>
        </div>
      </div>

      {/* Hero Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-0 right-0 flex justify-end px-6 md:px-12 animate-bounce cursor-pointer z-20"
          onClick={() => {
              window.scrollTo({
                top: window.innerHeight - 110,
                behavior: 'smooth'
              });
            }}
        >
          <div className="w-12 h-12 rounded-full border border-white/60 bg-ink/40 backdrop-blur-sm flex items-center justify-center hover:bg-brand hover:border-brand transition-colors">
            <ChevronRight className="text-white transform rotate-90" size={20} />
          </div>
        </div>

      {/* Content Section */}
      <div className="wrap py-20 md:py-28">
        {/* Paragraphs - Modified with full justification */}
        <div className="intro-copy">
          {[
            "Για εμάς, η επικοινωνία δεν είναι απλώς μια διαδικασία – είναι ο πραγματικός αντίκτυπος που δημιουργούμε «εκεί έξω». Δεν επικοινωνούμε απλά για να κάνουμε «θόρυβο» αλλά για να πετύχουμε - μαζί με τους συνεργάτες που μας εμπιστεύονται – την πραγματική αλλαγή που επιθυμούν.",
            "Στην 4Impact Communications, πιστεύουμε ότι ο σκοπός των Brands – είτε πρόκειται για οργανώσεις της Κοινωνίας των Πολιτών είτε για εταιρείες – είναι η πυξίδα μας στις στρατηγικές λύσεις Marketing, Επικοινωνίας και Branding που προτείνουμε. Με 20 χρόνια εμπειρίας στους τομείς της στρατηγικής επικοινωνίας, του Marketing, του Branding και της παραγωγής περιεχομένου κάθε μορφής, είμαστε έτοιμοι να σας βοηθήσουμε να ανοίξετε τον δρόμο για να πετύχετε τους στόχους σας.",
            "Αν ψάχνετε έναν συνεργάτη που θα αγκαλιάσει το όραμά σας και θα σας καθοδηγήσει προς απτά αποτελέσματα μέσω στοχευμένων λύσεων και στρατηγικών επικοινωνίας, είμαστε εδώ για να κάνουμε τα σχέδιά σας πραγματικότητα.",
          ].map((text, index) => (
            <AnimatedElement 
              key={index} 
              animation="fade-up" 
              delay={index * 300}
            >
              <p className="intro-p">
                {text}
              </p>
            </AnimatedElement>
          ))}
        </div>

        {/* <AnimatedElement animation="scale-up" delay={900}>
          <div className="text-center my-6 md:my-6">
            <Link
              className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-700 text-white text-xl 
              sm:text-2xl 
              md:text-3xl font-semibold py-4 px-8 rounded-lg shadow-lg 
              hover:from-cyan-700 
              hover:to-cyan-800 trasition-colors duration-300
              hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              href="/services"
            >
              Ελάτε να δημιουργήσουμε μαζί το impact που θα ξεχωρίσει το Brand σας!
            </Link>
          </div>
        </AnimatedElement> */}
      </div>

      <div className="mt-0">
        <ServicesGrid />
      </div>

      <AnimatedElement animation="fade-up">
        <div className="py-20 md:py-28 bg-paper">
          <h1 className="section-title wrap">
            Συνεργασίες
          </h1>
          <LogoSlider />
        </div>
      </AnimatedElement>

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

      {/* Footer */}
      <Footer />
    </div>
  );
}