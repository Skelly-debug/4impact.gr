import React from 'react';
import Link from 'next/link';

const ServicesSection = () => {
  return (
    <div className="w-full bg-cyan-700 p-16 md:p-24 flex flex-col md:flex-row justify-between items-center min-h-screen">
      <div className="md:w-1/2 mb-12 md:mb-0 md:pr-16">
        
        <h2 className="text-white text-4xl md:text-5xl font-bold mb-8 leading-tight">
          Μαζί πετυχαίνουμε το Impact που ονειρεύεστε!
        </h2>
        
        <p className="text-lg text-gray-200 leading-relaxed">
                <span className="font-semibold text-4xl text-cyan-400 leading-none mr-2 float-left mt-1">Μ</span>ε έμφαση στο{" "}
                <span className="font-semibold text-gray-200 transition-all duration-300 ease-in-out hover:text-cyan-600 inline-block">
                  impact
                  </span>
                , την{" "}
                <span className="font-semibold text-gray-200 transition-all duration-300 ease-in-out hover:text-cyan-600 inline-block">
                  αυθεντικότητα
                </span>
                , τη{" "}
                <span className="font-semibold text-gray-200 transition-all duration-300 ease-in-out hover:text-cyan-600 inline-block">
                  συνδιαμόρφωση
                </span>
                , και τη{" "}
                <span className="font-semibold text-gray-200 transition-all duration-300 ease-in-out hover:text-cyan-600 inline-block">
                  συνέπεια
                </span>
                , βοηθάμε τον οργανισμό σας να επικοινωνήσει το όραμα και τις
                αξίες του με ουσιαστική απήχηση και μετρήσιμα αποτελέσματα.
              </p>

              <p className="text-lg text-gray-200 leading-relaxed my-8">
                Στοχευμένες στρατηγικές επικοινωνίας για το σύνολο του brand σας ή για συγκεκριμένα projects, 
                ανάπτυξη και διαχείριση digital και offline περιεχομένου, διαχείριση σχέσεων με τα ΜΜΕ, 
                σχεδιασμός έργων εταιρικής κοινωνικής ευθύνης, συμβουλευτική επικοινωνίας και διαχείρισης κρίσης, 
                καθώς και εκπαιδευτικά πακέτα. Αυτές είναι οι βασικές υπηρεσίες που προσφέρουμε και ανυπομονούμε 
                να καλύψουμε και τις δικές σας ανάγκες με καινοτόμες ιδέες και προσήλωση στην επίτευξη των στόχων σας.
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