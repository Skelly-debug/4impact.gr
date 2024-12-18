"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/NavBar/Navbar";
import Footer from "@/components/Footer/Footer";
import AnimatedCirclesWithArrows from "@/components/AnimatedCirclesWithArrows/AnimatedCirclesWithArrows";
import { ChevronDown, ChevronRight } from "lucide-react";

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

function ServicesClient() {
  const titleRef = useRef(null);
  const { showTitle } = useInView(titleRef);

  return (
    <div className="font-playfair-display bg-gray-100 min-h-screen">
      <Navbar />

      <div className="relative min-h-screen flex flex-col">
        <div className="flex-grow relative">
          <img
            className="absolute w-full h-full object-cover"
            src="https://placehold.co/1920x1080"
            alt="Background Image"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 z-1"></div>
          <div
            ref={titleRef}
            className="relative z-10 flex justify-center items-center min-h-screen"
          >
            <h1
              className={`text-5xl font-bold text-neutral-800 text-center relative text-shadow shadow-black z-10 transition-all duration-1000 ease-out ${
                showTitle
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Υπηρεσίες
            </h1>
          </div>
        </div>

        <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 space-y-12">
          <AnimatedSection>
            <p className="text-lg text-gray-800 mb-6 leading-relaxed mx-4 sm:mx-12">
              <span className="font-semibold text-4xl">Μ</span> ε έμφαση στο{" "}
              <span className="text-lg text-gray-800 font-semibold transition-all duration-300 ease-in-out hover:text-2xl hover:scale-110 inline-block">
                impact
              </span>
              , την {" "}
              <span className="text-lg text-gray-800 font-semibold transition-all duration-300 ease-in-out hover:text-2xl hover:scale-110 inline-block">
                αυθεντικότητα
              </span>, 
              τη {" "}
              <span className="text-lg text-gray-800 font-semibold transition-all duration-300 ease-in-out hover:text-2xl hover:scale-110 inline-block">
                συνδιαμόρφωση
              </span>,
              και τη {" "}
              <span className="text-lg text-gray-800 font-semibold transition-all duration-300 ease-in-out hover:text-2xl hover:scale-110 inline-block">
              συνέπεια
              </span>
              , βοηθάμε τον
              οργανισμό σας να επικοινωνήσει το όραμα και τις αξίες του με
              ουσιαστική απήχηση και μετρήσιμα αποτελέσματα.
              <br />
              Στοχευμένες στρατηγικές επικοινωνίας για το σύνολο του brand σας ή
              για συγκεκριμένα projects, ανάπτυξη και διαχείριση digital content
              και offline περιεχομένου, διαχείριση σχέσεων με τα ΜΜΕ, σχεδιασμός
              έργων εταιρικής κοινωνικής ευθύνης. {" "}
              <i>Αυτές</i> είναι οι βασικές υπηρεσίες που προσφέρουμε και ανυπομονούμε 
              να καλύψουμε και τις δικές σας ανάγκες με καινοτόμες ιδέες και 
              προσήλωση στην επίτευξη των στόχων σας.
            </p>
          </AnimatedSection>

          <AnimatedSection className="bg-blue-100 rounded-lg pt-5 pb-[0.1rem] mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-[28rem]">
            <h2 className="text-3xl text-center font-semibold text-gray-900 mb-6">
            Στρατηγική επικοινωνίας με πραγματικό Αντίκτυπο
            </h2>
          </AnimatedSection>
          <AnimatedSection className="bg-white rounded-lg py-12 shadow-xl mx-1 sm:mx-2 md:mx-4 lg:mx-8 xl:mx-16">
            <p className="text-lg text-gray-600 leading-relaxed mx-auto max-w-[90%] md:max-w-[80%] xl:max-w-[70%]">
              Προσφέρουμε ολοκληρωμένες υπηρεσίες στρατηγικής επικοινωνίας, σχεδιασμένες για να κάνουν πραγματική διαφορά στον κόσμο. Κατανοούμε ότι κάθε επιχείρηση και οργανισμός έχει μοναδικές προκλήσεις και ευκαιρίες, και στόχος μας είναι να τις αξιοποιήσουμε στο έπακρο.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mx-auto max-w-[90%] md:max-w-[80%] xl:max-w-[70%]">
              Είτε είστε μια επιχείρηση που θέλει να εδραιώσει την παρουσία της στην αγορά, είτε μια μεγάλη οργάνωση που επιθυμεί να ανανεώσει τη στρατηγική της, είμαστε εδώ για να σας καθοδηγήσουμε. Εστιάζουμε στην ανάπτυξη και υλοποίηση στρατηγικών που όχι μόνο ενισχύουν την εικόνα και φήμη σας, αλλά δημιουργούν ουσιαστική σύνδεση με το κοινό σας. Αναλαμβάνουμε τον επικοινωνιακό σχεδιασμό και την υλοποίηση συγκεκριμένων projects αλλά και ευρύτερες καμπάνιες ευαισθητοποίησης και brand awareness.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mx-auto max-w-[90%] md:max-w-[80%] xl:max-w-[70%]">
              Ας συνεργαστούμε για να δημιουργήσουμε μια ισχυρή στρατηγική επικοινωνίας που θα σας βοηθήσει να ξεχωρίσετε και να επιτύχετε τους στόχους σας. Ελάτε να χτίσουμε μαζί τον αντίκτυπο που ονειρεύεστε!
            </p>
          

          <AnimatedSection className="bg-gray-200 rounded-lg pt-5 mt-10 pb-[0.1rem] mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-[28rem]">
            <h2 className="text-3xl text-center font-semibold text-gray-900 mb-6">
              Πώς δουλεύουμε;
            </h2>
          </AnimatedSection>
          <AnimatedCirclesWithArrows
            circleText1="Ανάλυση και Έρευνα"
            arrowText1="Κατανοούμε εις βάθος τον οργανισμό σας, το περιβάλλον, το κοινό σας και τους στόχους σας, ώστε να δημιουργήσουμε μια στρατηγική που να ανταποκρίνεται μόνο στις δικές σας ανάγκες."
            circleText2="Στρατηγικός Σχεδιασμός"
            arrowText2="Σχεδιάζουμε προσμαρμοσμένες στρατηγικές επικοινωνίας με έμφαση στους στόχους σας και την αποτελεσματικότητα."
            circleText3="Αξιολόγηση, Βελτίωση και προσαρμογή"
            arrowText3="Παρακολοθούμε διαρκώς και αναλύουμε την απόδοση των στρατηγικών μας, προσαρμόζοντας τις τακτικές μας για τη μέγιστη δυνατή αποτελεσματικότητα."
          />
          </AnimatedSection>
          <AnimatedSection className="bg-blue-100 rounded-lg pt-5 mt-10 pb-[0.1rem] mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-[28rem]">
            <h2 className="text-3xl text-center font-semibold text-gray-900 mb-6">
            Στρατηγικός σχεδιασμός και παραγωγή περιεχομένου
            </h2>
          </AnimatedSection>
          <AnimatedSection className="bg-white shadow-xl rounded-lg p-8 mx-16">
            <p className="text-lg text-gray-800 leading-relaxed mx-4 sm:mx-12 mb-6">
            Όσο κι αν ζούμε σε ένα ταχύτατα μεταβαλλόμενο επικοινωνιακό σύμπαν, με το AI να αλλάζει δραματικά τα δεδομένα, το αυθεντικό, ελκυστικό και ουσιωδώς ανθρώπινο περιεχόμενο συνεχίζει και θα συνεχίσει να είναι το Α και το Ω της αποτελεσματικής επικοινωνίας. Σήμερα μάλιστα περισσότερο από ποτέ, οι άνθρωποι αναζητούν αυθεντικό περιεχόμενο και ιστορίες που αξίζει να ειπωθούν για να συνδεθούν με τους οργανισμούς και τα Brands.
          </p>
          <p className="text-lg text-gray-800 leading-relaxed mx-4 sm:mx-12 mb-6">
            Κάποτε ήταν η επανάσταση του Google Search και του περίφημου Search Engine Optimization για να ακολουθήσουν τα περίφημα social media με τους αλγόριθμους, την ακριβή στόχευση και τις άπειρες άλλες δυνατότητες που προσφέρουν. Σήμερα με το AI έχουμε περάσει σε μια νέα εποχή με το SEO να μετατρέπεται πχ σε Search Everywhere Optimization και την αλληλεπίδραση του κάθε χρήστη με το εκάστοτε περιβάλλον στο οποίο βρίσκεται να αλλάζει δραματικά.
          </p>
          <p className="text-lg text-gray-800 leading-relaxed mx-4 sm:mx-12 mb-6">
            Παρόλα αυτά, και μάλλον ακριβώς λόγω όλων αυτών των εξελίξεων, οι πραγματικά δυνατές ιστορίες στο κατάλληλο format που θα εμφανιστούν «τη σωστή στιγμή στο σωστό μέρος» είναι αυτές που μπορούν κάνουν τη διαφορά για το Brand σας. Μαζί μπορούμε να σχεδιάσουμε στρατηγικά το περιεχόμενο που θα σας κάνει να ξεχωρίσετε και να δημιουργήσουμε για εσάς videos, key visuals και κείμενα για όλα τα μέσα που θα αφήσουν το δικό σας μοναδικό αποτύπωμα και θα σας φέρουν σε ουσιαστική επαφή και σύνδεση με τα κοινά σας.
          </p>
          </AnimatedSection>
        
          <AnimatedSection className="bg-blue-100 rounded-lg pt-5 mt-10 pb-[0.1rem] mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-[28rem]">
            <h2 className="text-3xl text-center font-semibold text-gray-900 mb-6">
            Σχέσεις με ΜΜΕ
            </h2>
          </AnimatedSection>
          <AnimatedSection className="bg-white shadow-xl rounded-lg p-8 mx-16">
            <p className="text-lg text-gray-800 leading-relaxed mx-4 sm:mx-12">
            Οι σχέσεις με τα ΜΜΕ είναι πάνω και πέρα από όλα σχέσεις με ανθρώπους. Έτσι, όπως κάθε ανθρώπινη σχέση, βασίζονται στην εμπιστοσύνη, την αυθεντικότητα και τη συνέχεια. Με περισσότερα από 10 χρόνια διαχείρισης γραφείων τύπου και δημοσιογραφική εμπειρία σε κάθε είδους μέσο, το 4Impact Communications, δεν προσεγγίζει τις σχέσεις με τους δημοσιογράφους και τα ΜΜΕ ως public relations αλλά ως σχέσεις ουσίας. Για αυτό μπορεί να βοηθήσει τον οργανισμό σας να αυξήσει σημαντικά την ορατότητά του στα ΜΜΕ και να διαχύσει τα μηνύματά του.
            </p>
          </AnimatedSection>
          
          <AnimatedSection className="bg-blue-100 rounded-lg pt-5 mt-10 pb-[0.1rem] mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-[28rem]">
            <h2 className="text-3xl text-center font-semibold text-gray-900 mb-6">
            Στήριξη επιχειρήσεων για ένα κοινωνικά υπεύθυνο μέλλον
            </h2>
          </AnimatedSection>
          <AnimatedSection className="bg-white shadow-xl rounded-lg p-8 mx-16">
          <p className="text-lg text-gray-800 leading-relaxed mx-4 sm:mx-12 mb-6">
            Η επιχείρησή μας ειδικεύεται στη δημιουργία καινοτόμων projects εταιρικής κοινωνικής υπευθυνότητας (ΕΚΕ) και καμπανιών κοινωνικής ευαισθητοποίησης που προσφέρουν πραγματική αξία στην κοινωνία και ενισχύουν το κύρος της εταιρείας σας. Στόχος μας είναι να συνδυάσουμε τις αξίες της επιχείρησής σας με τις ανάγκες της κοινότητας, χτίζοντας ισχυρούς δεσμούς και προωθώντας τη βιωσιμότητα.
          </p>
          <p className="text-lg text-gray-800 leading-relaxed mx-4 sm:mx-12 mb-6">
            Αναλαμβάνουμε τη σχεδίαση και υλοποίηση προγραμμάτων ΕΚΕ, όπως δράσεις για το περιβάλλον, την εκπαίδευση ή την υγεία, που ενσωματώνονται άψογα στη στρατηγική της εταιρείας σας. Παράλληλα, σχεδιάζουμε στοχευμένες καμπάνιες κοινωνικής ευαισθητοποίησης, αξιοποιώντας τα πιο σύγχρονα εργαλεία επικοινωνίας και μάρκετινγκ για να εμπνεύσουμε και να κινητοποιήσουμε το κοινό σας.
          </p>
          <p className="text-lg text-gray-800 leading-relaxed mx-4 sm:mx-12 mb-6">
            Η διαδικασία μας περιλαμβάνει ανάλυση των αναγκών και των στόχων σας, δημιουργία εξατομικευμένων προτάσεων και διαχείριση κάθε φάσης του έργου, από την ιδέα μέχρι την υλοποίηση και την αξιολόγηση των αποτελεσμάτων. Με τη γνώση και την εμπειρία μας, βοηθάμε την επιχείρησή σας να ξεχωρίσει ως παράδειγμα κοινωνικής υπευθυνότητας, ενώ παράλληλα ενισχύουμε την εικόνα και τη φήμη σας.
          </p>

          <p className="text-lg text-gray-800 leading-relaxed mx-4 sm:mx-12 mb-6" >
            Ελάτε να συν-δημιουργήσουμε ένα καλύτερο αύριο, μέσα από δράσεις που κάνουν τη διαφορά.
          </p>
          </AnimatedSection>

          <AnimatedSection className="text-center">
            <button
              className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center mx-auto group"
              onClick={() => (window.location.href = "/contact")}
            >
              Ας συνεργαστούμε
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </AnimatedSection>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default ServicesClient;
