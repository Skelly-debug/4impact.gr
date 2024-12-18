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
    <div className="font-playfair-display bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="relative h-[100vh] overflow-hidden">
        <div className="absolute w-full h-full">
          <img
            className="absolute w-full h-full object-cover"
            src="images/WE.jpg"
            alt="Background Image"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 z-1"></div>
        <div className="flex justify-center items-center h-full">
          <h1
            className={`text-6xl font-bold text-white text-center relative text-shadow shadow-black z-10 transition-all duration-1000 ease-out ${
              showTitle
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span style={{ fontFamily: "Playwrite Netherland Guides" }}>
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
      </div>
      <Footer />
    </div>
  );
}

export default AboutClient;
