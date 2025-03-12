import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, X } from 'lucide-react';

const ServicesCards = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [visibleCards, setVisibleCards] = useState({});
  const cardsRef = useRef([]);
  
  const services = [
    {
      id: 1,
      title: "Στρατηγική επικοινωνίας με πραγματικό Αντίκτυπο",
      description: "Description",
      image: "/images/service3.jpg",
      altText: "Στρατηγική επικοινωνίας με πραγματικό Αντίκτυπο",
      details: [
        "Προσφέρουμε ολοκληρωμένες υπηρεσίες στρατηγικής επικοινωνίας, σχεδιασμένες για να κάνουν πραγματική διαφορά στον κόσμο. Κατανοούμε ότι κάθε επιχείρηση και οργανισμός έχει μοναδικές προκλήσεις και ευκαιρίες, και στόχος μας είναι να τις αξιοποιήσουμε στο έπακρο.",
        "Είτε είστε μια επιχείρηση που θέλει να εδραιώσει την παρουσία της στην αγορά, είτε μια μεγάλη οργάνωση που επιθυμεί να ανανεώσει τη στρατηγική της, είμαστε εδώ για να σας καθοδηγήσουμε. Εστιάζουμε στην ανάπτυξη και υλοποίηση στρατηγικών που όχι μόνο ενισχύουν την εικόνα και φήμη σας, αλλά δημιουργούν ουσιαστική σύνδεση με το κοινό σας.",
      ],
      process: [
        {
          step: 1,
          title: "Ανάλυση και Έρευνα",
          description: "Κατανοούμε εις βάθος τον οργανισμό σας, το περιβάλλον, το κοινό σας και τους στόχους σας, ώστε να δημιουργήσουμε μια στρατηγική που να ανταποκρίνεται μόνο στις δικές σας ανάγκες."
        },
        {
          step: 2,
          title: "Στρατηγικός Σχεδιασμός",
          description: "Σχεδιάζουμε προσμαρμοσμένες στρατηγικές επικοινωνίας με έμφαση στους στόχους σας και την αποτελεσματικότητα."
        },
        {
          step: 3,
          title: "Αξιολόγηση, Βελτίωση και προσαρμογή",
          description: "Παρακολοθούμε διαρκώς και αναλύουμε την απόδοση των στρατηγικών μας, προσαρμόζοντας τις τακτικές μας για τη μέγιστη δυνατή αποτελεσματικότητα."
        }
      ]
    },
    {
      id: 2,
      title: "Στρατηγικός σχεδιασμός και παραγωγή περιεχομένου",
      description: "Description",
      image: "/images/service2.jpg",
      altText: "User-centered design diagram with wireframes",
      details: [
        "Όσο κι αν ζούμε σε ένα ταχύτατα μεταβαλλόμενο επικοινωνιακό σύμπαν, με το AI να αλλάζει δραματικά τα δεδομένα, το αυθεντικό, ελκυστικό και ουσιωδώς ανθρώπινο περιεχόμενο συνεχίζει και θα συνεχίσει να είναι το Α και το Ω της αποτελεσματικής επικοινωνίας.",
        "Μαζί μπορούμε να σχεδιάσουμε στρατηγικά το περιεχόμενο που θα σας κάνει να ξεχωρίσετε και να δημιουργήσουμε για εσάς videos, key visuals και κείμενα για όλα τα μέσα που θα αφήσουν το δικό σας μοναδικό αποτύπωμα και θα σας φέρουν σε ουσιαστική επαφή και σύνδεση με τα κοινά σας.",
      ]
    },
    {
      id: 3,
      title: "Σχέσεις με ΜΜΕ",
      description: "Description",
      image: "/images/service7.jpg",
      altText: "Person arranging sticky notes on a brand positioning board",
      details: [
        "Οι σχέσεις με τα ΜΜΕ είναι πάνω και πέρα από όλα σχέσεις με ανθρώπους. Έτσι, όπως κάθε ανθρώπινη σχέση, βασίζονται στην εμπιστοσύνη, την αυθεντικότητα και τη συνέχεια. Με περισσότερα από 10 χρόνια διαχείρισης γραφείων τύπου και δημοσιογραφική εμπειρία, προσεγγίζουμε τις σχέσεις με τους δημοσιογράφους ως σχέσεις ουσίας.",
      ]
    },
    {
      id: 4,
      title: "Στήριξη επιχειρήσεων για ένα κοινωνικά υπεύθυνο μέλλον",
      description: "Description",
      image: "/images/service4.jpg",
      altText: "Content calendar and blog posts",
      details: [
        "Η επιχείρησή μας ειδικεύεται στη δημιουργία καινοτόμων projects εταιρικής κοινωνικής υπευθυνότητας (ΕΚΕ) και καμπανιών κοινωνικής ευαισθητοποίησης που προσφέρουν πραγματική αξία στην κοινωνία και ενισχύουν το κύρος της εταιρείας σας",
        "Αναλαμβάνουμε τη σχεδίαση και υλοποίηση προγραμμάτων ΕΚΕ, όπως δράσεις για το περιβάλλον, την εκπαίδευση ή την υγεία, που ενσωματώνονται άψογα στη στρατηγική της εταιρείας σας.",
        "Ελάτε να συν-δημιουργήσουμε ένα καλύτερο αύριο, μέσα από δράσεις που κάνουν τη διαφορά."
      ]
    },
    {
      id: 5,
      title: "Συμβουλευτική επικοινωνίας και διαχείρισης κρίσης",
      description: "Description",
      image: "/images/service6.jpg",
      altText: "Digital ad campaign analytics dashboard",
      details: [
        "Μέσα από τη μακρόχρονη εμπειρία μας στους τομείς της επικοινωνίας, του marketing και της ανάπτυξης οργανώσεων της Κοινωνίας των Πολιτών και όχι μόνο, έχουμε κατακτήσει το προνόμιο της «μεγάλης εικόνας» των πραγμάτων που τόσο απαραίτητη είναι σήμερα για την αποτελεσματική τοποθέτηση κάθε οργανισμού. ",
        "Μια «μεγάλη εικόνα» που μας επιτρέπει να μπορούμε να συμβουλέψουμε οποιονδήποτε συνεργάτη – είτε σε επίπεδο συγκεκριμένων projects είτε σε επίπεδο συνολικής επικοινωνιακής ανάπτυξης. Επιπλέον, σε συνδυασμό και με την άριστη γνώση του τοπίου των ΜΜΕ και των μηχανισμών τους, βρισκόμαστε στη διάθεσή σας για τη διαχείριση οποιασδήποτε μορφής κρίσης και την κατάρτιση ανάλογου πλάνου και στρατηγικής.",
      ]
    },
    {
      id: 6,
      title: "Εκπαιδευτικά πακέτα",
      description: "Description",
      image: "/images/service5.jpg",
      altText: "Market research data visualization",
      details: [
        "Προσφέρουμε εκπαιδεύσεις ειδικά σχεδιασμένες για τους ανθρώπους του οργανισμού σας. Σκοπός μας είναι να ενδυναμώσουμε άτομα και οργανισμούς, παρέχοντάς σας τις γνώσεις  και τις δεξιότητες που χρειάζονται για να αναπτύξετε στρατηγικές επικοινωνίας και  marketing που ξεχωρίζουν.",
        "Μέσα από διαδραστικά σεμινάρια και προγράμματα κατάρτισης, θα εξερευνήσουμε τις τελευταίες τάσεις και τεχνικές στον τομέα της επικοινωνίας και του marketing. Θα μάθετε πώς να δημιουργείτε περιεχόμενο που προσελκύει το κοινό σας, να αναπτύσσετε αποτελεσματικές στρατηγικές digital marketing και να χτίζετε ισχυρές σχέσεις με τους πελάτες σας.",
        "Είτε είστε επαγγελματίας που θέλει να εξελίξει τις δεξιότητές του, είτε ένας οργανισμός που επιθυμεί να ενισχύσει την παρουσία του στην αγορά, τα εκπαιδευτικά μας πακέτα είναι στη διάθεσή σας!"
      ]
    },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleCards(prev => ({
            ...prev,
            [entry.target.dataset.id]: true
          }));
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    cardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => {
      cardsRef.current.forEach(card => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  const openModal = (service) => {
    setSelectedService(service);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Function to render process steps if they exist
  const renderProcessSteps = (service) => {
    if (!service.process) return null;
    
    return (
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Πώς δουλεύουμε;</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {service.process.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                {step.step}
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h4>
              <p className="text-gray-600">{step.description}</p>
              
            
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div 
            key={service.id} 
            ref={el => cardsRef.current[index] = el}
            data-id={service.id}
            className="flex flex-col bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl h-full"
            style={{
              transform: hoveredId === service.id ? 'translateY(-8px)' : 'translateY(0)',
              opacity: visibleCards[service.id] ? 1 : 0,
              translateY: visibleCards[service.id] ? '0' : '30px',
              transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.8s ease, translate 0.8s ease',
              transitionDelay: `${index * 100}ms`
            }}
            onMouseEnter={() => setHoveredId(service.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="h-64 overflow-hidden relative">
              <img
                src={service.image}
                alt={service.altText}
                className="w-full h-full object-cover transition-transform duration-700"
                style={{
                  transform: hoveredId === service.id ? 'scale(1.07)' : 'scale(1)'
                }}
              />
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-opacity duration-500"
                style={{
                  opacity: hoveredId === service.id ? 0.7 : 0
                }}
              ></div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h2 
                className="text-2xl font-bold mb-3 transition-colors duration-300"
                style={{
                  color: hoveredId === service.id ? '#3182ce' : '#1a202c'
                }}
              >
                {service.title}
              </h2>
              {/* <p className="text-gray-600">{service.description}</p> */}
              <div className="mt-auto pt-6">
                <button 
                  className="flex items-center font-semibold transition-all duration-300"
                  style={{
                    color: '#3182ce',
                    transform: hoveredId === service.id ? 'translateX(4px)' : 'translateX(0)'
                  }}
                  onClick={() => openModal(service)}
                >
                  Learn More
                  <ArrowRight 
                    className="ml-2 h-4 w-4 transition-transform duration-300"
                    style={{
                      transform: hoveredId === service.id ? 'translateX(4px)' : 'translateX(0)'
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Modal */}
      {modalOpen && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div 
            className="bg-white rounded-xl max-w-3xl w-full max-h-90vh overflow-auto"
            onClick={e => e.stopPropagation()}
            style={{
              animation: 'modalFadeIn 0.3s ease forwards'
            }}
          >
            <div className="relative">
              <div className="h-48 overflow-hidden">
                <img
                  src={selectedService.image}
                  alt={selectedService.altText}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <button 
                className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md transition-all hover:bg-gray-100"
                onClick={closeModal}
              >
                <X size={16} />
              </button>
              <div className="absolute bottom-4 left-6">
                <h2 className="text-2xl font-bold text-white">{selectedService.title}</h2>
              </div>
            </div>
            <div className="p-6">
              {selectedService.details.map((paragraph, i) => (
                <p key={i} className="text-gray-700 mb-4">{paragraph}</p>
              ))}
              
              {/* Render process steps if they exist */}
              {renderProcessSteps(selectedService)}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ServicesCards;