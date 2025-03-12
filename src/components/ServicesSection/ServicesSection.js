import React from 'react';
import Link from 'next/link';

const ServicesSection = () => {
  return (
    <div className="w-full bg-cyan-700 p-16 md:p-24 flex flex-col md:flex-row justify-between items-center min-h-screen">
      <div className="md:w-1/2 mb-12 md:mb-0 md:pr-16">
        <div className="mb-8">
          <button className="bg-white text-cyan-600 px-6 py-3 rounded-md font-medium text-sm cursor-pointer">Υπηρεσίες</button>
        </div>
        
        <h2 className="text-white text-4xl md:text-5xl font-bold mb-8 leading-tight">
        Εξειδικευμένες Λύσεις για τις Επιχειρηματικές σας Προκλήσεις.
        </h2>
        
        <p className="text-cyan-50 mb-6 text-lg">
          Cras non dolor. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
          Curabitur suscipit suscipit tellus. Phasellus tempus. Aenean imperdiet.
        </p>
        
        <p className="text-cyan-50 mb-12 text-lg">
          Donec id justo. Pellentesque habitant morbi tristique senectus et netus et
          malesuada fames ac turpis egestas. Etiam vitae tortor. Donec interdum, metus et
          hendrerit aliquet, dolor diam sagittis ligula, eget egestas libero turpis vel mi.
        </p>
        
        <Link href="/services">
          <button className="bg-cyan-400 hover:bg-cyan-500 text-cyan-900 px-10 py-5 rounded-md font-medium text-lg transition duration-300">
            Δες πώς μπορούμε να σε βοηθήσουμε!
          </button>
        </Link>
      </div>
      
      <div className="hidden md:block md:w-1/2 pl-0 md:pl-12">
        <div className="rounded-xl overflow-hidden shadow-2xl">
          <img 
            src="/images/portfolio.jpg" 
            alt="Professional team collaborating on a project" 
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;