import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

// Custom hook for detecting when an element is in viewport
const useInView = (options = { threshold: 0.1, triggerOnce: true }) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (options.triggerOnce && ref.current) {
          observer.unobserve(ref.current);
        }
      } else if (!options.triggerOnce) {
        setIsInView(false);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.triggerOnce]);

  return { ref, isInView };
};

// Animated component that fades in when scrolled into view
const AnimatedElement = ({ children, className = "", animation = "fade-up", delay = 0 }) => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  const getAnimationClass = () => {
    switch(animation) {
      case 'fade-up':
        return isInView 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-16";
      case 'fade-in':
        return isInView 
          ? "opacity-100" 
          : "opacity-0";
      case 'slide-in-right':
        return isInView 
          ? "opacity-100 translate-x-0" 
          : "opacity-0 -translate-x-16";
      case 'slide-in-left':
        return isInView 
          ? "opacity-100 translate-x-0" 
          : "opacity-0 translate-x-16";
      case 'scale-up':
        return isInView 
          ? "opacity-100 scale-100" 
          : "opacity-0 scale-95";
      default:
        return isInView 
          ? "opacity-100" 
          : "opacity-0";
    }
  };

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-1000 ease-out ${getAnimationClass()} ${delay ? `delay-${delay}` : ''} ${className}`}
    >
      {children}
    </div>
  );
};

const ServicesSection = () => {
  return (
    <div className="w-full bg-cyan-700 p-16 md:p-24 flex flex-col md:flex-row justify-between items-center min-h-screen overflow-hidden">
      <div className="md:w-1/2 mb-12 md:mb-0 md:pr-16">
        <AnimatedElement animation="fade-up">
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Μαζί πετυχαίνουμε το Impact που ονειρεύεστε!
          </h2>
        </AnimatedElement>
        
        <AnimatedElement animation="fade-up" delay="300">
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
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay="600">
          <p className="text-lg text-gray-200 leading-relaxed my-8">
            Στοχευμένες στρατηγικές επικοινωνίας για το σύνολο του brand σας ή για συγκεκριμένα projects, 
            ανάπτυξη και διαχείριση digital και offline περιεχομένου, διαχείριση σχέσεων με τα ΜΜΕ, 
            σχεδιασμός έργων εταιρικής κοινωνικής ευθύνης, συμβουλευτική επικοινωνίας και διαχείρισης κρίσης, 
            καθώς και εκπαιδευτικά πακέτα. Αυτές είναι οι βασικές υπηρεσίες που προσφέρουμε και ανυπομονούμε 
            να καλύψουμε και τις δικές σας ανάγκες με καινοτόμες ιδέες και προσήλωση στην επίτευξη των στόχων σας.
          </p>
        </AnimatedElement>
        
        <AnimatedElement animation="scale-up" delay="900">
          <Link href="/services">
            <button className="bg-cyan-400 hover:bg-cyan-500 text-cyan-900 px-10 py-5 rounded-md font-medium text-lg transition duration-300 transform hover:scale-105">
              Δείτε πώς μπορούμε να σας βοηθήσουμε!
            </button>
          </Link>
        </AnimatedElement>
      </div>
      
      <AnimatedElement animation="slide-in-left" className="hidden md:block md:w-1/2 pl-0 md:pl-12">
        <div className="rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105">
          <img 
            src="/images/portfolio.jpg" 
            alt="Professional team collaborating on a project" 
            className="w-full h-auto"
          />
        </div>
      </AnimatedElement>
    </div>
  );
};

export default ServicesSection;