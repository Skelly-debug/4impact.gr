"use client"
import React, { useState, useEffect } from "react";
import Navbar from "@/components/NavBar/Navbar";
import CompanyGrid from "@/components/CompanyGrid/CompanyGrid";
import Footer from "@/components/Footer/Footer";  

function PortfolioPage() {
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowTitle(true);
    }, 500); // Delay animation
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background Image */}
        <div className="absolute w-full h-full">
          <img
            className="absolute w-full h-full object-cover"
            src="/images/portfolio.jpg"
            alt="Our Team"
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
            Portfolio
          </h1>
        </div>
      </div>

      {/* Company Grid Section */}
      <CompanyGrid />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default PortfolioPage;