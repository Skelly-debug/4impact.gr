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
    <div className="w-full bg-ink bg-[radial-gradient(ellipse_at_85%_15%,rgba(15,140,163,0.45),transparent_55%)] text-white px-6 py-24 md:px-12 md:py-32 lg:px-20 flex flex-col md:flex-row justify-between items-center min-h-screen overflow-hidden">
      <div className="md:w-1/2 mb-12 md:mb-0 md:pr-16">
        <AnimatedElement animation="fade-up">
          <h2 className="section-title on-dark mb-10 text-[clamp(2rem,3.8vw,3.6rem)]">
            Μαζί πετυχαίνουμε το Impact που ονειρεύεστε!
          </h2>
        </AnimatedElement>
        
        <AnimatedElement animation="fade-up" delay="300">
          <p className="text-lg md:text-xl text-white/75 leading-relaxed">
            <span className="font-black text-7xl text-brand leading-[0.8] mr-3 float-left mt-2">Μ</span>ε έμφαση στο{" "}
            <span className="font-bold text-white border-b-2 border-brand transition-all duration-300 ease-in-out hover:text-brand inline-block">
              impact
            </span>
            , την{" "}
            <span className="font-bold text-white border-b-2 border-brand transition-all duration-300 ease-in-out hover:text-brand inline-block">
              αυθεντικότητα
            </span>
            , τη{" "}
            <span className="font-bold text-white border-b-2 border-brand transition-all duration-300 ease-in-out hover:text-brand inline-block">
              συνδιαμόρφωση 
            </span>
            {" "}και τη{" "}
            <span className="font-bold text-white border-b-2 border-brand transition-all duration-300 ease-in-out hover:text-brand inline-block">
              συνέπεια
            </span>
            , βοηθάμε τον οργανισμό σας να επικοινωνήσει το όραμα και τις
            αξίες του με ουσιαστική απήχηση και μετρήσιμα αποτελέσματα.
          </p>
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay="600">
          <p className="text-lg md:text-xl text-white/60 leading-relaxed my-8">
            Στοχευμένες στρατηγικές επικοινωνίας για το σύνολο του Brand σας ή για συγκεκριμένα projects, 
            ανάπτυξη και διαχείριση digital και offline περιεχομένου, διαχείριση σχέσεων με τα ΜΜΕ, 
            σχεδιασμός έργων εταιρικής κοινωνικής ευθύνης, συμβουλευτική επικοινωνίας και διαχείρισης κρίσης, 
            καθώς και εκπαιδευτικά πακέτα. Αυτές είναι οι βασικές υπηρεσίες που προσφέρουμε και ανυπομονούμε 
            να καλύψουμε και τις δικές σας ανάγκες με καινοτόμες ιδέες και προσήλωση στην επίτευξη των στόχων σας.
          </p>
        </AnimatedElement>
        
        <AnimatedElement animation="scale-up" delay="900">
          <Link href="/services">
            <button className="btn">
              Δείτε πώς μπορούμε να σας βοηθήσουμε!
            </button>
          </Link>
        </AnimatedElement>
      </div>
      
      <AnimatedElement animation="slide-in-left" className="hidden md:block md:w-1/2 pl-0 md:pl-12">
        <div className="relative shadow-[22px_22px_0_0_#37C1DE] transform transition-all duration-500 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[28px_28px_0_0_#37C1DE]">
          <img 
            src="/images/portfolio.jpg" 
            alt="Professional team collaborating on a project" 
            className="w-full h-auto block grayscale hover:grayscale-0 transition duration-500"
          />
        </div>
      </AnimatedElement>
    </div>
  );
};

export default ServicesSection;