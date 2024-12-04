"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/NavBar/Navbar";
import Footer from "@/components/Footer/Footer";
import AnimatedCirclesWithArrows from "@/components/AnimatedCirclesWithArrows/AnimatedCirclesWithArrows";
import { ChevronDown, ChevronRight } from "lucide-react";

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

function ServicesClient() {
  const titleRef = useRef(null);
  const { showTitle } = useInView(titleRef);

  return (
    <div className="font-playfair-display bg-gray-100 min-h-screen">
      <Navbar />

      <div className="relative min-h-screen flex flex-col">
        <div className="flex-grow relative">
          <img
            className="absolute w-full h-full object-cover"
            src="https://placehold.co/1920x1080"
            alt="Background Image"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 z-1"></div>
          <div
            ref={titleRef}
            className="relative z-10 flex justify-center items-center min-h-screen"
          >
            <h1
              className={`text-5xl font-bold text-neutral-800 text-center relative text-shadow shadow-black z-10 transition-all duration-1000 ease-out ${
                showTitle
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Υπηρεσίες
            </h1>
          </div>
        </div>

        <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 space-y-12">
          <AnimatedSection>
            <p className="text-lg text-gray-800 mb-6 leading-relaxed mx-4 sm:mx-12">
              <span className="font-semibold text-4xl">Μ</span> ε έμφαση στο{" "}
              <span className="text-lg text-gray-800 font-semibold transition-all duration-300 ease-in-out hover:text-3xl hover:scale-110 inline-block">
                impact
              </span>
              , την αυθεντικότητα, τη συνδιαμόρφωση και τη συνέπεια, βοηθάμε τον
              οργανισμό σας να επικοινωνήσει το όραμα και τις αξίες του με
              ουσιαστική απήχηση και μετρήσιμα αποτελέσματα.
              <br />
              Στοχευμένες στρατηγικές επικοινωνίας για το σύνολο του brand σας ή
              για συγκεκριμένα projects, ανάπτυξη και διαχείριση digital content
              και offline περιεχομένου, διαχείριση σχέσεων με τα ΜΜΕ, σχεδιασμός
              έργων εταιρικής κοινωνικής ευθύνης.
            </p>
          </AnimatedSection>

          <AnimatedSection className="bg-blue-100 rounded-lg pt-5 pb-[0.1rem] mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-[28rem]">
            <h2 className="text-3xl text-center font-semibold text-gray-900 mb-6">
              Πώς δουλεύουμε;
            </h2>
          </AnimatedSection>
          <AnimatedCirclesWithArrows
            circleText1="Ανάλυση και Έρευνα"
            arrowText1="Κατανοούμε εις βάθος τον οργανισμό σας, το περιβάλλον, το κοινό σας και τους στόχους σας, ώστε να δημιουργήσουμε μια στρατηγική που να ανταποκρίνεται μόνο στις δικές σας ανάγκες."
            circleText2="Στρατηγικός Σχεδιασμός"
            arrowText2="Σχεδιάζουμε προσμαρμοσμένες στρατηγικές επικοινωνίας με έμφαση στους στόχους σας και την αποτελεσματικότητα."
            circleText3="Αξιολόγηση, Βελτίωση και προσαρμογή"
            arrowText3="Παρακολοθούμε διαρκώς και αναλύουμε την απόδοση των στρατηγικών μας, προσαρμόζοντας τις τακτικές μας για τη μέγιστη δυνατή αποτελεσματικότητα."
          />

          <AnimatedSection className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Σχέσεις με ΜΜΕ
            </h3>
            <p className="text-gray-800 leading-relaxed mb-6">
              Οι σχέσεις με τα ΜΜΕ είναι πάνω και πέρα από όλα σχέσεις με
              ανθρώπους. Έτσι, όπως κάθε ανθρώπινη σχέση, βασίζονται στην
              εμπιστοσύνη, την αυθεντικότητα και τη συνέχεια.
            </p>
            <p className="text-gray-800 leading-relaxed">
              Με περισσότερα από 10 χρόνια διαχείρισης γραφείων τύπου και
              δημοσιογραφική εμπειρία σε κάθε είδους μέσο, το 4Impact
              Communications, δεν προσεγγίζει τις σχέσεις με τους δημοσιογράφους
              και τα ΜΜΕ ως public relations αλλά ως σχέσεις ουσίας.
            </p>
          </AnimatedSection>

          <AnimatedSection className="text-center">
            <button
              className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center mx-auto group"
              onClick={() => (window.location.href = "/contact")}
            >
              Ας συνεργαστούμε
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </AnimatedSection>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default ServicesClient;
