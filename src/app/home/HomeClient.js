"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/NavBar/Navbar";
import LogoSlider from "@/components/LogoSlider/LogoSlider";
import ServicesGrid from "@/components/ServicesSection/ServicesSection";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";

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
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white text-center relative z-10 transition-all duration-1000 ease-out ${
              showTitle
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Στρατηγική επικοινωνία για πραγματική αλλαγή!
          </h1>
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
            <p
              key={index}
              className="text-lg sm:text-xl md:text-2xl text-gray-800 text-justify my-8 md:my-12 leading-relaxed font-light"
            >
              {text}
            </p>
          ))}
        </div>

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
      </div>

      <div className="mt-12">
        <ServicesGrid />
      </div>

      <div className="py-16 md:py-20 lg:py-24">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold text-gray-800 mb-8 md:mb-12">
          Συνεργασίες
        </h1>
        <LogoSlider />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}