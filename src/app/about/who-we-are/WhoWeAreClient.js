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

  return (
    <div className="bg-paper text-ink overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="hero">
        {/* Background Image */}
        <div className="absolute w-full h-full">
          <img
            className="hero-media"
            src="../../images/poioi-eimaste.jpg"
            alt="Our Team"
          />
        </div>
          {/* Overlay with gradient effect */}
          <div className="hero-shade"></div> 
          {/* Hero Title */}
            <div className="hero-inner">
              <div className="hero-copy">
                <h1
                  className={`hero-title transition-all duration-1000 ease-out ${
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
        <div className="wrap py-20 md:py-28">
          <div className="max-w-none">
            <h2 className="section-title mb-12">Η αποστολή μας</h2>
            <div className="border-l-8 border-brand pl-6 md:pl-12 py-2">
              <p className="text-xl md:text-[1.7rem] text-ink/85 mb-6 leading-snug max-w-4xl">
                Η επικοινωνία που πετυχαίνει πραγματικό αντίκτυπο και αλλαγή. Η επικοινωνία που καταφέρνει να συγκινεί, να προκαλεί αλλαγές συμπεριφοράς, να συνδέει ουσιαστικά τους οργανισμούς με τα κοινά τους.
              </p>
              <p className="text-xl md:text-[1.7rem] text-ink/85 mb-6 leading-snug max-w-4xl">
                Η επικοινωνία που διαμορφώνει τάσεις και αντιλήψεις, με συναίσθηση της ευθύνης της απέναντι στον κόσμο μας. Αυτή η επικοινωνία είναι η δική μας αποστολή και κάθε μας συνεργασία έχει στον πυρήνα της την αλλαγή που θέλουμε να πετύχουμε «εκεί έξω», μαζί με όσους μας εμπιστεύονται.
              </p>
            </div>
          </div>
        </div>
      </AnimatedElement>

{/* Our Values Section */}
<div className="relative bg-ink py-24 md:py-32 overflow-hidden">
  {/* Subtle background pattern */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute inset-0" style={{
      backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
      backgroundSize: '32px 32px'
    }}></div>
  </div>
  
  <div className="wrap relative z-10">
    <div className="mb-16">
      <h2 className="section-title on-dark mb-4">
        Οι Αξίες μας
      </h2>
      <div className="hidden"></div>
    </div>
    
    <AnimatedContainer animation="slide-in-left" staggerDelay={50} initialDelay={100}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-none">
        {[
          { title: "Άνθρωπος", icon: "👤", gradient: "from-ink-soft to-ink-soft group-hover:from-brand group-hover:to-brand-deep" },
          { title: "Αντίκτυπος", icon: "💡", gradient: "from-ink-soft to-ink-soft group-hover:from-brand group-hover:to-brand-deep" },
          { title: "Αποτελεσματικότητα", icon: "🚀", gradient: "from-ink-soft to-ink-soft group-hover:from-brand group-hover:to-brand-deep" },
          { title: "Συνέπεια", icon: "✨", gradient: "from-ink-soft to-ink-soft group-hover:from-brand group-hover:to-brand-deep" },
          { title: "Συνδιαμόρφωση", icon: "🤝", gradient: "from-ink-soft to-ink-soft group-hover:from-brand group-hover:to-brand-deep" },
          { title: "Συμπερίληψη", icon: "🌈", gradient: "from-ink-soft to-ink-soft group-hover:from-brand group-hover:to-brand-deep" },
        ].map((value, index) => (
          <div 
            key={index} 
            className={`group relative bg-gradient-to-br ${value.gradient} rounded-none p-8 md:p-10 text-left transform transition-all duration-300 hover:-translate-y-1 border border-white/15`}
          >
            {/* Subtle shine effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10">
              <div className="text-5xl mb-5 transform group-hover:scale-110 transition-transform duration-300 inline-block">
                {value.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white group-hover:text-ink transition-colors leading-tight">
                {value.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </AnimatedContainer>
  </div>
</div>

      {/* Our Partners Section */}
      <AnimatedElement animation="slide-in-right" delay={300}>
        <div className="bg-paper-deep py-20 md:py-28">
          <h2 className="section-title wrap mb-8">Συνεργασίες</h2>
          <p className="wrap md:pr-[30%] text-xl text-ink/75 mb-12 leading-relaxed">
            Είμαστε περήφανοι για τις συνεργασίες που έχουμε αναπτύξει με οργανισμούς που μοιράζονται το όραμά μας για θετικό κοινωνικό αντίκτυπο.
          </p>
          <LogoSlider />
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
        <div className="wrap py-20 md:py-28">
          <Bio />
        </div>
      </AnimatedElement>

      {/* Call to Action Section */}
      <AnimatedElement animation="fade-up" delay={300}>
        <div className="cta-band">
          <div className="cta-inner">
            <h2 className="cta-title">Έτοιμοι να συνεργαστούμε;</h2>
            <p className="cta-text">
              Ελάτε να μοιραστείτε το όραμά σας μαζί μας και να ανακαλύψουμε πώς μπορούμε να δημιουργήσουμε τον αντίκτυπο που θέλετε να έχετε.
            </p>
            <Link
              className="btn btn-ink"
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