"use client";

import React from "react";
import Navbar from "@/components/NavBar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useState, useEffect } from "react";

function AboutClient() {
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-playfair-display bg-gray-100 min-h-screen">
      <Navbar />
      <div className="relative h-screen">
        <img
          className="absolute w-full h-full object-cover"
          src="https://placehold.co/1920x1080"
          alt="Background Image"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 z-1"></div>
        <div className="flex justify-center items-center h-full">
          <h1
            className={`text-5xl font-bold text-neutral-800 text-center relative text-shadow shadow-black z-10 transition-all duration-1000 ease-out ${
              showTitle
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Σχετικά με εμάς
          </h1>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutClient;
