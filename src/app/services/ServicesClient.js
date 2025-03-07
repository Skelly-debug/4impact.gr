"use client";

import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/NavBar/Navbar";
import Footer from "@/components/Footer/Footer";
import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react";

// Custom hook for detecting when an element is in viewport
function useInView(ref, options = { threshold: 0.1 }) {
  const [isInView, setIsInView] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return { isInView, showTitle };
}

// Animated component that fades in when scrolled into view
function AnimatedSection({ children, className = "" }) {
  const ref = useRef(null);
  const { isInView } = useInView(ref);

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Service accordion component
function ServiceAccordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6 overflow-hidden bg-white rounded-lg shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
      <button
        className="w-full px-6 py-4 text-left bg-gradient-to-r from-white to-gray-50 hover:from-blue-50 hover:to-indigo-50 flex justify-between items-center transition-colors duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg md:text-xl font-semibold text-gray-800">{title}</h3>
        {isOpen ? 
          <ChevronUp size={20} className="text-blue-600 flex-shrink-0" /> : 
          <ChevronDown size={20} className="text-gray-500 flex-shrink-0" />
        }
      </button>
      <div
        className={`px-6 transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[2000px] py-6" : "max-h-0 py-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

// Process step component for the workflow
function ProcessStep({ number, title, description }) {
  return (
    <div className="relative flex flex-col items-center mb-8 md:mb-0">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white text-2xl font-bold mb-4 shadow-md">
        <span className="relative top-[-3px]">{number}</span>
      </div>
      <h4 className="text-lg font-semibold text-gray-800 text-center mb-2">{title}</h4>
      <p className="text-gray-600 text-center max-w-xs">{description}</p>
      
      {/* Arrow connecting to next step (hidden on last item and on mobile) */}
      {number < 3 && (
        <>
          <div className="hidden md:block absolute top-8 left-full w-8 h-0.5 bg-blue-300"></div>
          <div className="hidden md:block absolute top-[1.8rem] left-[calc(100%+32px)] w-0 h-0 border-t-4 border-b-4 border-l-8 border-t-transparent border-b-transparent border-l-blue-300"></div>
        </>
      )}
    </div>
  );
}

function ServicesClient() {
  const titleRef = useRef(null);
  const { showTitle } = useInView(titleRef);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-screen flex flex-col">
        <div className="flex-grow relative">
          <img
            className="absolute w-full h-full object-cover"
            src="images/SERVICES.jpg"
            alt="Background Image"
          />
          {/* Overlay with gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-black/50"></div>
          <div
            ref={titleRef}
            className="relative z-10 flex justify-center items-center h-full"
          >
            <div className="text-center px-4">
              <h1
                className={`text-5xl md:text-6xl lg:text-7xl font-semibold text-white text-center relative text-shadow-lg shadow-black z-10 transition-all duration-1000 ease-out ${
                  showTitle
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                Υπηρεσίες
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Two Column Layout */}
          <div className="flex flex-col lg:flex-row gap-12 mb-20">
            {/* Left Column - Introduction */}
            <AnimatedSection className="lg:w-2/5">
              <div className="bg-white rounded-2xl shadow-md p-8 border-l-4 border-blue-500 h-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <p className="text-lg text-gray-800 leading-relaxed">
                <span className="font-semibold text-4xl text-blue-600 leading-none mr-2 float-left mt-1">Μ</span>ε έμφαση στο{" "}
                <span className="font-semibold text-gray-800 transition-all duration-300 ease-in-out hover:text-blue-600 inline-block">
                  impact
                  </span>
                , την{" "}
                <span className="font-semibold text-gray-800 transition-all duration-300 ease-in-out hover:text-blue-600 inline-block">
                  αυθεντικότητα
                </span>
                , τη{" "}
                <span className="font-semibold text-gray-800 transition-all duration-300 ease-in-out hover:text-blue-600 inline-block">
                  συνδιαμόρφωση
                </span>
                , και τη{" "}
                <span className="font-semibold text-gray-800 transition-all duration-300 ease-in-out hover:text-blue-600 inline-block">
                  συνέπεια
                </span>
                , βοηθάμε τον οργανισμό σας να επικοινωνήσει το όραμα και τις
                αξίες του με ουσιαστική απήχηση και μετρήσιμα αποτελέσματα.
              </p>

              <p className="text-lg text-gray-800 leading-relaxed mt-4">
                Στοχευμένες στρατηγικές επικοινωνίας για το σύνολο του brand σας ή για συγκεκριμένα projects, 
                ανάπτυξη και διαχείριση digital και offline περιεχομένου, διαχείριση σχέσεων με τα ΜΜΕ, 
                σχεδιασμός έργων εταιρικής κοινωνικής ευθύνης, συμβουλευτική επικοινωνίας και διαχείρισης κρίσης, 
                καθώς και εκπαιδευτικά πακέτα. Αυτές είναι οι βασικές υπηρεσίες που προσφέρουμε και ανυπομονούμε 
                να καλύψουμε και τις δικές σας ανάγκες με καινοτόμες ιδέες και προσήλωση στην επίτευξη των στόχων σας.
              </p>
              </div>
            </AnimatedSection>

            {/* Right Column - Services Accordion */}
            <AnimatedSection className="lg:w-3/5">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Οι υπηρεσίες μας</h2>
              <div className="w-16 h-1 bg-blue-500 mb-6"></div>
              
              <ServiceAccordion title="Στρατηγική επικοινωνίας με πραγματικό Αντίκτυπο">
                <p className="text-gray-700 leading-relaxed mb-4">
                Προσφέρουμε ολοκληρωμένες υπηρεσίες στρατηγικής επικοινωνίας, σχεδιασμένες για να κάνουν πραγματική διαφορά στον κόσμο. Κατανοούμε ότι κάθε επιχείρηση και οργανισμός έχει μοναδικές προκλήσεις και ευκαιρίες, και στόχος μας είναι να τις αξιοποιήσουμε στο έπακρο.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                Είτε είστε μια επιχείρηση που θέλει να εδραιώσει την παρουσία της στην αγορά, είτε μια μεγάλη οργάνωση που επιθυμεί να ανανεώσει τη στρατηγική της, είμαστε εδώ για να σας καθοδηγήσουμε. Εστιάζουμε στην ανάπτυξη και υλοποίηση στρατηγικών που όχι μόνο ενισχύουν την εικόνα και φήμη σας, αλλά δημιουργούν ουσιαστική σύνδεση με το κοινό σας.
                </p>
                
                <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-4">Πώς δουλεύουμε;</h4>
                <div className="flex flex-col md:flex-row justify-between gap-4 mt-6">
                  <ProcessStep 
                    number={1} 
                    title="Ανάλυση και Έρευνα" 
                    description="Κατανοούμε εις βάθος τον οργανισμό σας, το περιβάλλον, το κοινό σας και τους στόχους σας, ώστε να δημιουργήσουμε μια στρατηγική που να ανταποκρίνεται μόνο στις δικές σας ανάγκες."
                  />
                  <ProcessStep 
                    number={2} 
                    title="Στρατηγικός Σχεδιασμός" 
                    description="Σχεδιάζουμε προσμαρμοσμένες στρατηγικές επικοινωνίας με έμφαση στους στόχους σας και την αποτελεσματικότητα."
                  />
                  <ProcessStep 
                    number={3} 
                    title="Αξιολόγηση, Βελτίωση και προσαρμογή" 
                    description="Παρακολοθούμε διαρκώς και αναλύουμε την απόδοση των στρατηγικών μας, προσαρμόζοντας τις τακτικές μας για τη μέγιστη δυνατή αποτελεσματικότητα."
                  />
                </div>
              </ServiceAccordion>

              <ServiceAccordion title="Στρατηγικός σχεδιασμός και παραγωγή περιεχομένου">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-1">
                    <p className="text-gray-700 leading-relaxed mb-4">
                    Όσο κι αν ζούμε σε ένα ταχύτατα μεταβαλλόμενο επικοινωνιακό σύμπαν, με το AI να αλλάζει δραματικά τα δεδομένα, το αυθεντικό, ελκυστικό και ουσιωδώς ανθρώπινο περιεχόμενο συνεχίζει και θα συνεχίσει να είναι το Α και το Ω της αποτελεσματικής επικοινωνίας.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                    Μαζί μπορούμε να σχεδιάσουμε στρατηγικά το περιεχόμενο που θα σας κάνει να ξεχωρίσετε και να δημιουργήσουμε για εσάς videos, key visuals και κείμενα για όλα τα μέσα που θα αφήσουν το δικό σας μοναδικό αποτύπωμα και θα σας φέρουν σε ουσιαστική επαφή και σύνδεση με τα κοινά σας.
                    </p>
                  </div>
                  <div className="md:w-1/3 rounded-lg overflow-hidden shadow-md">
                    <img src="/api/placeholder/400/300" alt="Content Strategy" className="w-full h-full object-cover" />
                  </div>
                </div>
              </ServiceAccordion>

              <ServiceAccordion title="Σχέσεις με ΜΜΕ">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="md:w-1/3 rounded-lg overflow-hidden shadow-md order-2 md:order-1">
                    <img src="/api/placeholder/400/300" alt="Media Relations" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 order-1 md:order-2">
                    <p className="text-gray-700 leading-relaxed">
                    Οι σχέσεις με τα ΜΜΕ είναι πάνω και πέρα από όλα σχέσεις με ανθρώπους. Έτσι, όπως κάθε ανθρώπινη σχέση, βασίζονται στην εμπιστοσύνη, την αυθεντικότητα και τη συνέχεια. Με περισσότερα από 10 χρόνια διαχείρισης γραφείων τύπου και δημοσιογραφική εμπειρία, προσεγγίζουμε τις σχέσεις με τους δημοσιογράφους ως σχέσεις ουσίας.
                    </p>
                  </div>
                </div>
              </ServiceAccordion>

              <ServiceAccordion title="Στήριξη επιχειρήσεων για ένα κοινωνικά υπεύθυνο μέλλον">
                <p className="text-gray-700 leading-relaxed mb-4">
                Η επιχείρησή μας ειδικεύεται στη δημιουργία καινοτόμων projects εταιρικής 
                κοινωνικής υπευθυνότητας (ΕΚΕ) και καμπανιών κοινωνικής ευαισθητοποίησης που 
                προσφέρουν πραγματική αξία στην κοινωνία και ενισχύουν το κύρος της εταιρείας σας
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                Αναλαμβάνουμε τη σχεδίαση και υλοποίηση προγραμμάτων ΕΚΕ, όπως δράσεις για το περιβάλλον, 
                την εκπαίδευση ή την υγεία, που ενσωματώνονται άψογα στη στρατηγική της εταιρείας σας.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                Ελάτε να συν-δημιουργήσουμε ένα καλύτερο αύριο, μέσα από δράσεις που κάνουν τη διαφορά.
                </p>
              </ServiceAccordion>

              <ServiceAccordion title="Συμβουλευτική επικοινωνίας και διαχείρισης κρίσης">
                <p className="text-gray-700 leading-relaxed mb-4">
                Μέσα από τη μακρόχρονη εμπειρία μας στους τομείς της επικοινωνίας, 
                του marketing και της ανάπτυξης οργανώσεων της Κοινωνίας των Πολιτών 
                και όχι μόνο, έχουμε κατακτήσει το προνόμιο της «μεγάλης εικόνας» των
                 πραγμάτων που τόσο απαραίτητη είναι σήμερα για την αποτελεσματική 
                 τοποθέτηση κάθε οργανισμού. 
                 </p>
                 <p className="text-gray-700 leading-relaxed mb-4">
                 Μια «μεγάλη εικόνα» που μας επιτρέπει να 
                 μπορούμε να συμβουλέψουμε οποιονδήποτε συνεργάτη – είτε σε επίπεδο 
                 συγκεκριμένων projects είτε σε επίπεδο συνολικής επικοινωνιακής ανάπτυξης. 
                 Επιπλέον, σε συνδυασμό και με την άριστη γνώση του τοπίου των ΜΜΕ και 
                 των μηχανισμών τους, βρισκόμαστε στη διάθεσή σας για τη διαχείριση 
                 οποιασδήποτε μορφής κρίσης και την κατάρτιση ανάλογου πλάνου και στρατηγικής.
                </p>
              </ServiceAccordion>

              <ServiceAccordion title="Εκπαιδευτικά πακέτα">
                <p className="text-gray-700 leading-relaxed mb-4">
                Προσφέρουμε εκπαιδεύσεις ειδικά σχεδιασμένες για τους ανθρώπους του οργανισμού σας.
                Σκοπός μας είναι να ενδυναμώσουμε άτομα και οργανισμούς, παρέχοντάς σας τις γνώσεις 
                και τις δεξιότητες που χρειάζονται για να αναπτύξετε στρατηγικές επικοινωνίας και 
                marketing που ξεχωρίζουν.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                Μέσα από διαδραστικά σεμινάρια και προγράμματα κατάρτισης, 
                θα εξερευνήσουμε τις τελευταίες τάσεις και τεχνικές στον τομέα της 
                επικοινωνίας και του marketing. Θα μάθετε πώς να δημιουργείτε 
                περιεχόμενο που προσελκύει το κοινό σας, να αναπτύσσετε 
                αποτελεσματικές στρατηγικές digital marketing και να χτίζετε 
                ισχυρές σχέσεις με τους πελάτες σας.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                Είτε είστε επαγγελματίας που θέλει να εξελίξει τις δεξιότητές του, 
                είτε ένας οργανισμός που επιθυμεί να ενισχύσει την παρουσία του στην 
                αγορά, τα εκπαιδευτικά μας πακέτα είναι στη διάθεσή σας!
                </p>
              </ServiceAccordion>
            </AnimatedSection>
          </div>

          {/* Call to Action Section */}
          <AnimatedSection className="py-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl my-12 shadow-md">
            <div className="text-center max-w-3xl mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Έτοιμοι να κάνουμε τη διαφορά;</h2>
              <p className="text-lg text-gray-700 mb-8">
                Ανακαλύψτε πώς μπορούμε να συνεργαστούμε για να επιτύχετε τους στρατηγικούς σας στόχους
              </p>
              <button
                className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 flex items-center mx-auto group"
                onClick={() => (window.location.href = "/contact")}
              >
                Ας συνεργαστούμε
                <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ServicesClient;