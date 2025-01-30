"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/NavBar/Navbar";
import LogoSlider from "@/components/LogoSlider/LogoSlider";
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
    <div className="font-playfair-display bg-gray-100 overflow-hidden">
      <Navbar />
      <div className="relative h-screen">
        <div className="absolute w-full h-full">
          <img
            className="absolute w-full h-full object-cover"
            src="images/AKOMA_KAI_FRONTPAGE.jpg"
            alt="Background Image"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 z-1 font-serif"></div>
        <div className="flex justify-center items-center h-full">
          <h1
            className={`text-[4.3rem] font-bold text-white text-center relative text-shadow shadow-black z-10 transition-all duration-1000 ease-out ${
              showTitle
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span style={{ fontFamily: "Playwrite Netherland Guides" }}>
              Στρατηγική επικοινωνία για πραγματική αλλαγή!
            </span>
          </h1>
        </div>
      </div>
      <h1 className="text-xl text-gray-800 text-center m-12 mx-96">
        Για εμάς, η επικοινωνία δεν είναι απλώς μια διαδικασία – είναι ο
        πραγματικός αντίκτυπος που δημιουργούμε «εκεί έξω». Δεν επικοινωνούμε
        απλά για να κάνουμε «θόρυβο» αλλά για να πετύχουμε - μαζί με τους
        συνεργάτες που μας εμπιστεύονται – την πραγματική αλλαγή που επιθυμούν.
      </h1>
      <h1 className="text-xl text-gray-800 text-center m-12 mx-96">
        Στην 4Impact Communications, πιστεύουμε ότι ο σκοπός των Brands – είτε
        πρόκειται για οργανώσεις της κοινωνίας των πολιτών είτε για εταιρείες –
        είναι η πυξίδα μας στις στρατηγικές λύσεις Marketing, Επικοινωνίας και
        Branding που προτείνουμε. Με 20 χρόνια εμπειρίας στους τομείς της
        στρατηγικής επικοινωνίας, του Marketing, του Branding και της παραγωγής
        περιεχομένου κάθε μορφής, είμαστε έτοιμοι να σας βοηθήσουμε να ανοίξετε
        τον δρόμο για να πετύχετε τους στόχους σας.
      </h1>
      <h1 className="text-xl text-gray-800 text-center m-12 mx-96">
        Αν ψάχνετε έναν συνεργάτη που θα μοιραστεί το όραμά σας και θα σας
        καθοδηγήσει προς απτά αποτελέσματα μέσω στοχευμένων λύσεων και
        στρατηγικών επικοινωνίας, είμαστε εδώ για να κάνουμε τα σχέδιά σας
        πραγματικότητα.
      </h1>

      <center>
        <Link
          className="text-4xl font-bold text-neutral-800 font-sans m-2 hover:scale-105 transition ease-in-out duration-300"
          href="/services"
        >
          Ελάτε να δημιουργήσουμε μαζί το impact που θα ξεχωρίσει το Brand σας!
        </Link>
      </center>
      <h2 className="italic text-center font-bold text-neutral-500 my-24">
        Υπηρεσίες Εδώ
      </h2>
      <h1 className="text-4xl text-center font-bold text-neutral-500 font-sans m-2 mt-24">
        Συνεργασίες
      </h1>
      <LogoSlider />
      <Footer />
    </div>
  );
}
