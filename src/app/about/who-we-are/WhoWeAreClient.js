"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/NavBar/Navbar";
import Footer from "@/components/Footer/Footer";
import Bio from "@/components/CV/bio";
import Link from "next/link";

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
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white text-center relative z-10 transition-all duration-1000 ease-out ${
              showTitle
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Ποιοι Είμαστε
          </h1>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">Η Ιστορία μας</h2>
          <div className="bg-white rounded-lg shadow-xl p-8 md:p-10">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Η 4Impact Communications ιδρύθηκε το 2010 με ένα απλό όραμα: να δημιουργήσουμε επικοινωνιακές στρατηγικές που δεν απλά μιλούν, αλλά μεταμορφώνουν. Πιστεύουμε ότι η αποτελεσματική επικοινωνία έχει τη δύναμη να αλλάξει αντιλήψεις, να εμπνεύσει δράση και να δημιουργήσει ουσιαστικό αντίκτυπο.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Ξεκινήσαμε ως μια μικρή ομάδα παθιασμένων επαγγελματιών και εξελιχθήκαμε σε έναν πολύπλευρο οργανισμό που εξυπηρετεί πελάτες από διάφορους τομείς - από μη κερδοσκοπικούς οργανισμούς και κοινωνικές επιχειρήσεις μέχρι καθιερωμένες εταιρείες που επιθυμούν να επαναπροσδιορίσουν την παρουσία τους.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Αυτό που μας διαφοροποιεί είναι η προσέγγισή μας με γνώμονα τον σκοπό. Κάθε στρατηγική, κάθε καμπάνια, κάθε μήνυμα που δημιουργούμε έχει έναν ξεκάθαρο στόχο: να δημιουργήσει ουσιαστικό αντίκτυπο που ευθυγραμμίζεται με τις αξίες και τους στόχους των συνεργατών μας.
            </p>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-gradient-to-r from-cyan-500 to-cyan-700 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Οι Αξίες μας</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Άνθρωπος",
                description: "Description",
                icon: "👤"
              },
              {
                title: "Αντίκτυπος",
                description: "Description",
                icon: "💡"
              },
              {
                title: "Αλλαγή / εξέλιξη",
                description: "Description",
                icon: "🚀"
              },
              {
                title: "Συνέπεια",
                description: "Description",
                icon: "✨"
              },
              {
                title: "Συνδιαμόρφωση",
                description: "Description",
                icon: "🤝"
              },
              {
                title: "Συμπερίληψη",
                description: "Description",
                icon: "🌈"
              },
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center transform transition-transform duration-300 hover:scale-105">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Founder Bio Section */}
      <div className="container mx-auto px-4 py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">Ο Ιδρυτής μας</h2>
        <Bio />
      </div>

      {/* Our Team Section
      <div className="container mx-auto px-4 py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">Η Ομάδα μας</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="h-64 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-cyan-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* Call to Action Section */}
      <div className="bg-gray-100 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Έτοιμοι να Συνεργαστούμε;</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Ελάτε να μοιραστείτε το όραμά σας μαζί μας και να ανακαλύψουμε πώς μπορούμε να δημιουργήσουμε τον αντίκτυπο που θέλετε να έχετε.
          </p>
          <Link
            className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-700 text-white text-xl 
            font-semibold py-4 px-8 rounded-lg shadow-lg 
            hover:from-cyan-600 
            hover:to-cyan-800 transition-all duration-300 transform hover:scale-105"
            href="/contact"
          >
            Επικοινωνήστε μαζί μας
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}