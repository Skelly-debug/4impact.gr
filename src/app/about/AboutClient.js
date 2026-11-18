"use client";

import React from "react";
import Navbar from "@/components/NavBar/Navbar";
import Bio from "@/components/CV/bio";
import Footer from "@/components/Footer/Footer";
import { useState, useEffect } from "react";

function AboutClient() {
  const [showTitle, setShowTitle] = useState(false);
  const [showCV, setShowCV] = useState(false);

  useEffect(() => {
    const titleTimer = setTimeout(() => {
      setShowTitle(true);
    }, 100);

    const cvTimer = setTimeout(() => {
      setShowCV(true);
    }, 600);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(cvTimer);
    };
  }, []);

  return (
    <div className="bg-paper text-ink min-h-screen flex flex-col">
      <Navbar />
      <div className="hero">
        <div className="absolute w-full h-full">
          <img
            className="hero-media"
            src="images/IMPACT.jpg"
            alt="Background Image"
          />
        </div>
        <div className="hero-shade"></div>
        <div className="hero-inner">
          <h1
            className={`hero-title transition-all duration-1000 ease-out ${
              showTitle
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span style={{ fontFamily: "inherit" }}>
              Σχετικά με εμάς
            </span>
          </h1>
        </div>
      </div>
      <div className="flex-grow py-12">
        <div
          className={`transition-all duration-1000 ease-out ${
            showCV ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Bio />
        </div>
        <div className="text-ink/75 text-xl md:text-2xl m-6 md:m-16 max-w-4xl leading-relaxed">
          Για την 4Impact Communications τα καλύτερα αποτελέσματα έρχονται μέσα
          από τη συνεργασία και την ομαδική δουλειά. Για αυτό, μέσα στα χρόνια
          είμαστε περήφανοι για το δίκτυο συνεργατών μας, με τις οποίες και τους
          οποίους εργαζόμαστε παρέα ανάλογα με την υφή και τα ζητούμενα του κάθε
          project.
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutClient;
