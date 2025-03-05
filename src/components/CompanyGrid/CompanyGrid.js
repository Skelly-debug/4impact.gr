"use client";
import React from "react";
import { motion } from "framer-motion";

function CompanyCard({ imgSrc, companyName, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Start hidden and slightly below
      whileInView={{ opacity: 1, y: 0 }} // Animate when it enters viewport
      transition={{ duration: 0.6, ease: "easeOut" }} // Smooth transition
      viewport={{ once: true }} // Animate only once
      className="flex flex-col sm:flex-row sm:items-center bg-white shadow-lg rounded-lg overflow-hidden border p-4 w-full"
    >
      {/* Image */}
      <div className="w-full sm:w-24 sm:h-24 mb-4 sm:mb-0 sm:mr-4">
        <img
          src={imgSrc}
          alt={companyName}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Text */}
      <div className="flex-grow mb-4 sm:mb-0">
        <h3 className="text-xl font-bold">{companyName}</h3>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Button */}
      <div className="sm:ml-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          Learn More
        </button>
      </div>
    </motion.div>
  );
}

function CompanyGrid() {
  const companies = [
    {
      imgSrc: "https://placehold.co/128",
      companyName: "Company Name 1",
      description: "Short description of the company",
    },
    {
      imgSrc: "https://placehold.co/128",
      companyName: "Company Name 2",
      description: "Short description of the company",
    },
    {
      imgSrc: "https://placehold.co/128",
      companyName: "Company Name 3",
      description: "Short description of the company",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-4">
        {companies.map((company, index) => (
          <CompanyCard
            key={index}
            imgSrc={company.imgSrc}
            companyName={company.companyName}
            description={company.description}
          />
        ))}
      </div>
    </div>
  );
}

export default CompanyGrid;
