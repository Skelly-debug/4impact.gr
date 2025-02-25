"use client";

import React, { useState, useRef } from "react";
import Navbar from "@/components/NavBar/Navbar";
import Footer from "@/components/Footer/Footer";
import AnimatedCirclesWithArrows from "@/components/AnimatedCirclesWithArrows/AnimatedCirclesWithArrows";
import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react";

function useInView(ref, options = { threshold: 0.1 }) {
  const [isInView, setIsInView] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
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

function ServiceAccordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6 overflow-hidden bg-white rounded-lg shadow-lg border border-gray-100 hover:border-blue-100 transition-all duration-300">
      <button
        className="w-full px-8 py-5 text-left bg-gradient-to-r from-white to-gray-50 hover:from-blue-50 hover:to-indigo-50 flex justify-between items-center transition-colors duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800">{title}</h3>
        {isOpen ? 
          <ChevronUp size={24} className="text-blue-600" /> : 
          <ChevronDown size={24} className="text-gray-500" />
        }
      </button>
      <div
        className={`px-8 transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen py-8" : "max-h-0 py-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function ServicesClient() {
  const titleRef = useRef(null);
  const { showTitle } = useInView(titleRef);

  return (
    <div className="font-playfair-display bg-gray-50 min-h-screen">
      <Navbar />

      <div className="relative min-h-screen flex flex-col">
        <div className="flex-grow relative">
          <img
            className="absolute w-full h-full object-cover"
            src="images/SERVICES.jpg"
            alt="Background Image"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/70 z-1"></div>
          <div
            ref={titleRef}
            className="relative z-10 flex justify-center items-center min-h-screen"
          >
            <div className="text-center px-4">
              <h1
                className={`text-6xl md:text-7xl font-bold text-white text-center relative text-shadow shadow-black z-10 transition-all duration-1000 ease-out ${
                  showTitle
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <span style={{ fontFamily: "Playwrite Netherland Guides" }}>
                  Υπηρεσίες
                </span>
              </h1>
            </div>
          </div>
          {/* <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent z-2 opacity-50"></div> */}
        </div>

        <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 space-y-16">
          <AnimatedSection>
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8 md:p-12 border-l-4 border-blue-500">
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                <span className="font-semibold text-5xl text-blue-600 leading-none mr-2">Μ</span>ε έμφαση στο{" "}
                <span className="text-lg text-gray-800 font-semibold transition-all duration-300 ease-in-out hover:text-2xl hover:text-blue-600 hover:scale-110 inline-block">
                  impact
                </span>
                , την{" "}
                <span className="text-lg text-gray-800 font-semibold transition-all duration-300 ease-in-out hover:text-2xl hover:text-blue-600 hover:scale-110 inline-block">
                  αυθεντικότητα
                </span>
                , τη{" "}
                <span className="text-lg text-gray-800 font-semibold transition-all duration-300 ease-in-out hover:text-2xl hover:text-blue-600 hover:scale-110 inline-block">
                  συνδιαμόρφωση
                </span>
                , και τη{" "}
                <span className="text-lg text-gray-800 font-semibold transition-all duration-300 ease-in-out hover:text-2xl hover:text-blue-600 hover:scale-110 inline-block">
                  συνέπεια
                </span>
                , βοηθάμε τον οργανισμό σας να επικοινωνήσει το όραμα και τις
                αξίες του με ουσιαστική απήχηση και μετρήσιμα αποτελέσματα.
              </p>
            </div>
          </AnimatedSection>

          <div className="max-w-6xl mx-auto">
            <AnimatedSection className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Οι υπηρεσίες μας</h2>
              <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Προσφέρουμε ολοκληρωμένες λύσεις επικοινωνίας προσαρμοσμένες στις ανάγκες σας
              </p>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 gap-4">
              <ServiceAccordion title="Στρατηγική επικοινωνίας με πραγματικό Αντίκτυπο">
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  Προσφέρουμε ολοκληρωμένες υπηρεσίες στρατηγικής επικοινωνίας,
                  σχεδιασμένες για να κάνουν πραγματική διαφορά στον κόσμο.
                  Κατανοούμε ότι κάθε επιχείρηση και οργανισμός έχει μοναδικές
                  προκλήσεις και ευκαιρίες, και στόχος μας είναι να τις
                  αξιοποιήσουμε στο έπακρο.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  Είτε είστε μια επιχείρηση που θέλει να εδραιώσει την παρουσία της
                  στην αγορά, είτε μια μεγάλη οργάνωση που επιθυμεί να ανανεώσει τη
                  στρατηγική της, είμαστε εδώ για να σας καθοδηγήσουμε. Εστιάζουμε
                  στην ανάπτυξη και υλοποίηση στρατηγικών που όχι μόνο ενισχύουν την
                  εικόνα και φήμη σας, αλλά δημιουργούν ουσιαστική σύνδεση με το
                  κοινό σας.
                </p>
                
                <h4 className="text-xl font-semibold text-gray-800 text-center mt-8 mb-6 bg-gray-100 px-4 py-2 rounded">Πώς δουλεύουμε;</h4>
                <AnimatedCirclesWithArrows
                  circleText1="Ανάλυση και Έρευνα"
                  arrowText1="Κατανοούμε εις βάθος τον οργανισμό σας, το περιβάλλον, το κοινό σας και τους στόχους σας, ώστε να δημιουργήσουμε μια στρατηγική που να ανταποκρίνεται μόνο στις δικές σας ανάγκες."
                  circleText2="Στρατηγικός Σχεδιασμός"
                  arrowText2="Σχεδιάζουμε προσμαρμοσμένες στρατηγικές επικοινωνίας με έμφαση στους στόχους σας και την αποτελεσματικότητα."
                  circleText3="Αξιολόγηση, Βελτίωση και προσαρμογή"
                  arrowText3="Παρακολοθούμε διαρκώς και αναλύουμε την απόδοση των στρατηγικών μας, προσαρμόζοντας τις τακτικές μας για τη μέγιστη δυνατή αποτελεσματικότητα."
                />
              </ServiceAccordion>

              <ServiceAccordion title="Στρατηγικός σχεδιασμός και παραγωγή περιεχομένου">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1">
                    <p className="text-lg text-gray-800 leading-relaxed mb-4">
                      Όσο κι αν ζούμε σε ένα ταχύτατα μεταβαλλόμενο επικοινωνιακό
                      σύμπαν, με το AI να αλλάζει δραματικά τα δεδομένα, το αυθεντικό,
                      ελκυστικό και ουσιωδώς ανθρώπινο περιεχόμενο συνεχίζει και θα
                      συνεχίσει να είναι το Α και το Ω της αποτελεσματικής επικοινωνίας.
                    </p>
                    <p className="text-lg text-gray-800 leading-relaxed">
                      Μαζί μπορούμε να σχεδιάσουμε στρατηγικά το περιεχόμενο που θα σας κάνει να
                      ξεχωρίσετε και να δημιουργήσουμε για εσάς videos, key visuals και
                      κείμενα για όλα τα μέσα που θα αφήσουν το δικό σας μοναδικό
                      αποτύπωμα και θα σας φέρουν σε ουσιαστική επαφή και σύνδεση με τα
                      κοινά σας.
                    </p>
                  </div>
                  <div className="md:w-1/3 rounded-xl overflow-hidden shadow-lg">
                    <img src="/api/placeholder/400/300" alt="Content Strategy" className="w-full h-full object-cover" />
                  </div>
                </div>
              </ServiceAccordion>

              <ServiceAccordion title="Σχέσεις με ΜΜΕ">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/3 rounded-xl overflow-hidden shadow-lg order-2 md:order-1">
                    <img src="/api/placeholder/400/300" alt="Media Relations" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 order-1 md:order-2">
                    <p className="text-lg text-gray-800 leading-relaxed">
                      Οι σχέσεις με τα ΜΜΕ είναι πάνω και πέρα από όλα σχέσεις με
                      ανθρώπους. Έτσι, όπως κάθε ανθρώπινη σχέση, βασίζονται στην
                      εμπιστοσύνη, την αυθεντικότητα και τη συνέχεια. Με περισσότερα από
                      10 χρόνια διαχείρισης γραφείων τύπου και δημοσιογραφική εμπειρία
                      σε κάθε είδους μέσο, το 4Impact Communications, δεν προσεγγίζει
                      τις σχέσεις με τους δημοσιογράφους και τα ΜΜΕ ως public relations
                      αλλά ως σχέσεις ουσίας. Για αυτό μπορεί να βοηθήσει τον οργανισμό
                      σας να αυξήσει σημαντικά την ορατότητά του στα ΜΜΕ και να διαχύσει
                      τα μηνύματά του.
                    </p>
                  </div>
                </div>
              </ServiceAccordion>

              <ServiceAccordion title="Στήριξη επιχειρήσεων για ένα κοινωνικά υπεύθυνο μέλλον">
                <p className="text-lg text-gray-800 leading-relaxed mb-4">
                  Η επιχείρησή μας ειδικεύεται στη δημιουργία καινοτόμων projects
                  εταιρικής κοινωνικής υπευθυνότητας (ΕΚΕ) και καμπανιών κοινωνικής
                  ευαισθητοποίησης που προσφέρουν πραγματική αξία στην κοινωνία και
                  ενισχύουν το κύρος της εταιρείας σας.
                </p>
                <p className="text-lg text-gray-800 leading-relaxed mb-4">
                  Αναλαμβάνουμε τη σχεδίαση και υλοποίηση προγραμμάτων ΕΚΕ, όπως
                  δράσεις για το περιβάλλον, την εκπαίδευση ή την υγεία, που
                  ενσωματώνονται άψογα στη στρατηγική της εταιρείας σας.
                </p>
                <p className="text-lg text-gray-800 leading-relaxed">
                  Ελάτε να συν-δημιουργήσουμε ένα καλύτερο αύριο, μέσα από δράσεις
                  που κάνουν τη διαφορά.
                </p>
              </ServiceAccordion>

              <ServiceAccordion title="Συμβουλευτική επικοινωνίας και διαχείρισης κρίσεων">
                <p className="text-lg text-gray-800 leading-relaxed mb-4">
                  Μέσα από τη μακρόχρονη εμπειρία μας στους τομείς της επικοινωνίας,
                  του marketing και της ανάπτυξης οργανώσεων της Κοινωνίας των
                  Πολιτών και όχι μόνο, έχουμε κατακτήσει το προνόμιο της «μεγάλης
                  εικόνας» των πραγμάτων.
                </p>
                <p className="text-lg text-gray-800 leading-relaxed">
                  Βρισκόμαστε στη διάθεσή σας για τη διαχείριση οποιασδήποτε μορφής 
                  κρίσης και την κατάρτιση ανάλογου πλάνου και στρατηγικής.
                </p>
              </ServiceAccordion>

              <ServiceAccordion title="Εκπαιδευτικά πακέτα">
                <p className="text-lg text-gray-800 leading-relaxed mb-4">
                  Προσφέρουμε εκπαιδεύσεις ειδικά σχεδιασμένες για τους ανθρώπους του
                  οργανισμού σας. Σκοπός μας είναι να ενδυναμώσουμε άτομα και
                  οργανισμούς, παρέχοντάς σας τις γνώσεις και τις δεξιότητες που
                  χρειάζονται για να αναπτύξετε στρατηγικές επικοινωνίας και marketing
                  που ξεχωρίζουν.
                </p>
                <p className="text-lg text-gray-800 leading-relaxed">
                  Μέσα από διαδραστικά σεμινάρια και προγράμματα κατάρτισης, θα
                  εξερευνήσουμε τις τελευταίες τάσεις και τεχνικές στον τομέα της
                  επικοινωνίας και του marketing.
                </p>
              </ServiceAccordion>
            </div>
          </div>

          <AnimatedSection className="py-16 bg-blue-50 rounded-3xl my-16">
            <div className="text-center max-w-4xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Έτοιμοι να κάνουμε τη διαφορά;</h2>
              <p className="text-xl text-gray-700 mb-8">
                Ανακαλύψτε πώς μπορούμε να συνεργαστούμε για να επιτύχετε τους στρατηγικούς σας στόχους
              </p>
              <button
                className="bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center mx-auto group"
                onClick={() => (window.location.href = "/contact")}
              >
                Ας συνεργαστούμε
                <ChevronRight className="ml-2 group-hover:translate-x-2 transition-transform" size={22} />
              </button>
            </div>
          </AnimatedSection>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default ServicesClient;