"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/NavBar/Navbar";
import AnimatedOffsetCards from "@/components/HomeCards/AnimatedOffsetCards";
import Footer from "@/components/Footer/Footer";

function HomeClient() {
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-playfair-display bg-gray-100">
      <Navbar />
      <div className="relative h-screen">
        <div className="absolute w-full h-full">
          <img
            className="absolute w-full h-full object-cover"
            src="https://placehold.co/1920x1080"
            alt="Background Image"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-20 z-1"></div>
        <div className="flex justify-center items-center h-full">
          <h1
            className={`text-5xl font-bold text-neutral-800 text-center relative text-shadow shadow-black z-10 transition-all duration-1000 ease-out ${
              showTitle
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            4Impact
          </h1>
        </div>
      </div>
      <AnimatedOffsetCards />
      <h1 className="text-4xl text-center font-bold text-neutral-800 font-sans my-10 mt-16">
        Ελάτε να δημιουργήσουμε μαζί το impact που θα ξεχωρίσει το Brand σας!
      </h1>
      <Footer />
    </div>
  );
}

export default HomeClient;