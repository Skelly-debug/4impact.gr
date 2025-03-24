"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/NavBar/Navbar";
import Footer from "@/components/Footer/Footer";
import Bio from "@/components/CV/bio";
import Link from "next/link";
import LogoSlider from "@/components/LogoSlider/LogoSlider";
// import { ChevronRight } from "lucide-react";
import { AnimatedElement, AnimatedContainer } from "@/components/Animations/Animations";
import ScrollIndicator from "@/components/ScrollIndicator/ScrollIndicator";

export default function WhoWeArePage() {
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Team members data (excluding the founder since we'll use the Bio component for him)
  const teamMembers = [
    // {
    //   name: "Αναστασία Δημητρίου",
    //   role: "Διευθύνουσα Σύμβουλος",
    //   bio: "Με πάνω από 15 χρόνια εμπειρίας στον χώρο της στρατηγικής επικοινωνίας, η Αναστασία ηγείται της ομάδας μας με πάθος για καινοτομία και αποτελέσματα.",
    //   image: "/images/team/team-1.jpg"
    // },
    // {
    //   name: "Γιώργος Παπαδόπουλος",
    //   role: "Διευθυντής Δημιουργικού",
    //   bio: "Ο Γιώργος συνδυάζει την καλλιτεχνική του ευαισθησία με στρατηγική σκέψη για να δημιουργήσει εντυπωσιακές καμπάνιες που αφήνουν το στίγμα τους.",
    //   image: "/images/team/team-2.jpg"
    // },
    // {
    //   name: "Μαρία Κωνσταντίνου",
    //   role: "Υπεύθυνη Ψηφιακού Μάρκετινγκ",
    //   bio: "Η Μαρία είναι ειδική στο να μετατρέπει πολύπλοκες ψηφιακές στρατηγικές σε απτά αποτελέσματα για τους πελάτες μας.",
    //   image: "/images/team/team-3.jpg"
    // },
  ];

  // Partners logos
  const partnerLogos = [
    {
      src: "https://i.ibb.co/wZw2rFQs/PXSOS.jpg",
      alt: "Paidika Xwria SOS",
      name: "Παιδικά Χωριά SOS",
      url: "https://sos-villages.gr/",
    },
    {
      src: "https://i.ibb.co/KYbBGHF/IKBKK-1.jpg",
      alt: "ΙΚΒΚΚ",
      name: "ΙΚΒΚΚ",
      url: "https://www.cvf.gr/",
    },
    {
      src: "https://i.ibb.co/h1Mxbccc/OTPM.jpg",
      alt: "Οδηγός της Πόλης μας",
      name: "Οδηγός της Πόλης μας",
      url: "https://www.facebook.com/odigostispolis",
    },
  ];

  return (
    <div className="bg-gray-50 overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background Image */}
        <div className="absolute w-full h-full">
          <img
            className="absolute w-full h-full object-cover"
            src="../../images/poioi-eimaste.jpg"
            alt="Our Team"
          />
        </div>

                {/* Overlay with gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-black/50 z-1"></div> 
          {/* Hero Title */}
            <div className="flex justify-center items-center h-full px-4">
              <div className="text-center max-w-4xl">
                <h1
                  className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white text-center relative z-10 transition-all duration-1000 ease-out ${
                    showTitle
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                Σχετικά με εμάς
                </h1>
              </div>
            </div>
          </div>
          <ScrollIndicator/>


      {/* Our Story Section */}
      <AnimatedElement animation="fade-in" delay={500}>
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">Η αποστολή μας</h2>
            <div className="bg-white rounded-lg shadow-xl p-8 md:p-10">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Η επικοινωνία που πετυχαίνει πραγματικό αντίκτυπο και αλλαγή. Η επικοινωνία που καταφέρνει να συγκινεί, να προκαλεί αλλαγές συμπεριφοράς, να συνδέει ουσιαστικά τους οργανισμούς με τα κοινά τους.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Η επικοινωνία που διαμορφώνει τάσεις και αντιλήψεις, με συναίσθηση της ευθύνης της απέναντι στον κόσμο μας. Αυτή η επικοινωνία είναι η δική μας αποστολή και κάθε μας συνεργασία έχει στον πυρήνα της την αλλαγή που θέλουμε να πετύχουμε «εκεί έξω», μαζί με όσους μας εμπιστεύονται.
              </p>
            </div>
          </div>
        </div>
      </AnimatedElement>

      {/* Our Values Section */}
      <div className="bg-gradient-to-r from-cyan-500 to-cyan-700 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Οι Αξίες μας</h2>
          <AnimatedContainer animation="slide-in-left" staggerDelay={200} initialDelay={300}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Άνθρωπος", icon: "👤" },
                { title: "Αντίκτυπος", icon: "💡" },
                { title: "Αποτελεσματικότητα", icon: "🚀" },
                { title: "Συνέπεια", icon: "✨" },
                { title: "Συνδιαμόρφωση", icon: "🤝" },
                { title: "Συμπερίληψη", icon: "🌈" },
              ].map((value, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center transform transition-transform duration-300 hover:scale-105">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">{value.title}</h3>
                </div>
              ))}
            </div>
          </AnimatedContainer>
        </div>
      </div>

      {/* Our Partners Section */}
      <AnimatedElement animation="slide-in-right" delay={300}>
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 mx-auto px-4 py-16 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">Συνεργασίες</h2>
          <p className="text-lg text-gray-700 mb-12 leading-relaxed max-w-4xl mx-auto text-center">
            Είμαστε περήφανοι για τις συνεργασίες που έχουμε αναπτύξει με οργανισμούς που μοιράζονται το όραμά μας για θετικό κοινωνικό αντίκτυπο.
          </p>
          <LogoSlider logos={partnerLogos} />
        </div>
      </AnimatedElement>
        {/* Additional Info
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Κοινός Σκοπός",
              icon: "🎯",
              description: "Συνεργαζόμαστε με οργανισμούς που μοιράζονται τις αξίες μας για θετικό κοινωνικό αντίκτυπο."
            },
            {
              title: "Μακροχρόνιες Σχέσεις",
              icon: "⏱️",
              description: "Χτίζουμε σχέσεις εμπιστοσύνης και συνεργασίες που αντέχουν στο χρόνο."
            },
            {
              title: "Αμοιβαία Ανάπτυξη",
              icon: "🌱",
              description: "Πιστεύουμε στην αμοιβαία ανάπτυξη μέσα από τις συνεργασίες μας."
            },
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center transform transition-transform duration-300 hover:scale-105">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div> */}
      
      {/* Bio Section */}
      <AnimatedElement animation="fade-in" delay={300}>
        <div className="container mx-auto px-4 py-16 md:py-20">
          <Bio />
        </div>
      </AnimatedElement>

      {/* Call to Action Section */}
      <AnimatedElement animation="fade-up" delay={300}>
        <div className="bg-gray-100 py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Έτοιμοι να συνεργαστούμε;</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Ελάτε να μοιραστείτε το όραμά σας μαζί μας και να ανακαλύψουμε πώς μπορούμε να δημιουργήσουμε τον αντίκτυπο που θέλετε να έχετε.
            </p>
            <Link
              className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-700 text-white text-xl font-semibold py-4 px-8 rounded-lg shadow-lg hover:from-cyan-600 hover:to-cyan-800 transition-all duration-300 transform hover:scale-105"
              href="/contact"
            >
              Επικοινωνήστε μαζί μας
            </Link>
          </div>
        </div>
      </AnimatedElement>

      {/* Footer */}
      <Footer />
    </div>
  );
}