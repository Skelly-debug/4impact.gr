import React from "react";
import Link from "next/link";

const ServicesGrid = () => {
  const images = [
    {
      src: "../images/service1.jpg",
      text: "Στρατηγική επικοινωνίας με πραγματικό Αντίκτυπο",
      url: "/services",
    },
    {
      src: "../images/service2.jpg",
      text: "Στρατηγικός σχεδιασμός και παραγωγή περιεχομένου",
      url: "/services",
    },
    {
      src: "../images/service3.jpg",
      text: "Σχέσεις με ΜΜΕ",
      url: "/services",
    },
    {
      src: "../images/service4.jpg",
      text: "Στήριξη επιχειρήσεων για ένα κοινωνικά υπεύθυνο μέλλον",
      url: "/services",
    },
    {
      src: "../images/service5.jpg",
      text: "Συμβουλευτική επικοινωνίας και διαχείρισης κρίσεων",
      url: "/services",
    },
    {
      src: "../images/service6.jpg",
      text: "Εκπαιδευτικά πακέτα",
      url: "/services",
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {images.map((image, index) => (
          <Link href={image.url} key={index} className="block">
            <div className="relative group cursor-pointer overflow-hidden rounded-lg">
              <img
                src={image.src}
                alt={image.text}
                className="w-full h-48 sm:h-56 lg:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Overlay with blur/shade effect - always visible on mobile, hover effect on desktop */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 sm:group-hover:opacity-40 max-sm:opacity-40 transition-opacity duration-300" />

              {/* Centered text - always visible on mobile, hover effect on desktop */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 sm:group-hover:opacity-100 max-sm:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-lg sm:text-xl font-bold z-10 text-center px-4 sm:px-6 max-w-[90%]">
                  {image.text}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServicesGrid;
