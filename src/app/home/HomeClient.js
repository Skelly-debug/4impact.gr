"use client";
import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import Navbar from "@/components/NavBar/Navbar";
import LogoSlider from "@/components/LogoSlider/LogoSlider";
import ServicesGrid from "@/components/ServicesSection/ServicesSection";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import { AnimatedElement } from "@/components/Animations/Animations";
export default function HomeClient() {
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

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
            src="images/AKOMA_KAI_FRONTPAGE.jpg"
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
              Στρατηγική επικοινωνία για πραγματική αλλαγή!
            </h1>
            <p className={`mt-6 text-lg text-gray-200 max-w-3xl mx-auto transition-all duration-1000 ease-out ${
              showTitle ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-8"
            }`}>
              Δημιουργούμε στρατηγικές που ξεπερνούν τις προσδοκίες και συνδέουν το κοινό σας με το όραμά σας
            </p>
          </div>
        </div>
      </div>

      {/* Hero Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce cursor-pointer"
          onClick={() => {
              window.scrollTo({
                top: window.innerHeight - 110,
                behavior: 'smooth'
              });
            }}
        >
          <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center">
            <ChevronRight className="text-white transform rotate-90" size={20} />
          </div>
        </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        {/* Paragraphs - Modified with full justification */}
        <div className="mx-auto max-w-[90%] md:max-w-2xl lg:max-w-[90%]">
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
              <p className="text-lg sm:text-xl md:text-2xl text-gray-800 text-justify my-8 md:my-12 leading-relaxed font-light">
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

      <div className="mt-12">
        <ServicesGrid />
      </div>

      <AnimatedElement animation="fade-up">
        <div className="py-16 md:py-20 lg:py-24">
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold text-gray-800 mb-8 md:mb-12">
            Συνεργασίες
          </h1>
          <LogoSlider />
        </div>
      </AnimatedElement>

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

      {/* Footer */}
      <Footer />
    </div>
  );
}