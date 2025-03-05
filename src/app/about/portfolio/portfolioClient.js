"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/NavBar/Navbar";
import CompanyGrid, { CompanyProvider, useCompanies } from "@/components/CompanyGrid/CompanyGrid";
import Footer from "@/components/Footer/Footer";

function PortfolioClient() {
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowTitle(true);
    }, 500);
  }, []);

  return (
    <CompanyProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        {/* Hero Section */}
        <div className="relative h-screen">
          <div className="absolute w-full h-full">
            <img
              className="absolute w-full h-full object-cover"
              src="/images/portfolio.jpg"
              alt="Our Team"
            />
          </div>

        {/* Overlay with gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-black/50 z-1"></div>

          <div className="flex justify-center items-center h-full px-4">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
                          font-bold text-white text-center relative z-10 
                          drop-shadow-xl`}
            >
              Portfolio
            </motion.h1>
          </div>
        </div>

        <CompanyGrid />
        <Footer />
      </div>
    </CompanyProvider>
  );
}

export default PortfolioClient;