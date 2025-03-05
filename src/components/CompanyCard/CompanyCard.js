"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";

const CompanyCard = ({ 
  imgSrc, 
  companyName, 
  description, 
  websiteUrl 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        ease: "easeInOut",
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true }}
      className="bg-white shadow-lg rounded-xl overflow-hidden border border-cyan-100 
                 transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]
                 flex flex-col sm:flex-row items-center p-6 space-x-0 sm:space-x-6 
                 space-y-4 sm:space-y-0 w-full"
    >
      {/* Image Container */}
      <div className="w-full sm:w-32 sm:h-28 flex-shrink-0">
        <img
          src={imgSrc}
          alt={companyName}
          className="w-full h-full object-cover rounded-lg 
                     border-2 transition-transform duration-300 
                     group-hover:scale-105"
        />
      </div>

      {/* Text Content */}
      <div className="flex-grow text-center sm:text-left">
        <h3 className="text-2xl font-bold text-cyan-800 mb-2 
                       transition-colors duration-300 
                       group-hover:text-cyan-600">
          {companyName}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Action Button */}
      <motion.a
        href={websiteUrl}
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center 
                   px-4 py-2 bg-cyan-500 text-white 
                   rounded-md hover:bg-cyan-600 
                   transition-colors duration-300 
                   group-hover:bg-cyan-600 
                   space-x-2"
      >
        <span>Learn More</span>
        <ArrowRightIcon className="w-5 h-5" />
      </motion.a>
    </motion.div>
  );
};

export default CompanyCard;