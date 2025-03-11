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
        "Omnichannel optimization ensures your customers experience a seamless journey across all touchpoints. We integrate your digital and physical channels for a cohesive brand experience.",
        "Our approach focuses on creating consistent messaging and design while leveraging the unique strengths of each platform, from social media to email, website, and in-store experiences.",
        "We implement tracking systems to measure performance across channels and continuously refine your strategy based on real customer interaction data."
      ]
    },
    {
      id: 3,
      title: "Σχέσεις με ΜΜΕ",
      description: "Description",
      image: "/images/service7.jpg",
      altText: "Person arranging sticky notes on a brand positioning board",
      details: [
        "Our brand positioning mapping helps you identify your unique place in the market. We analyze competitor positioning and find the perfect spot for your brand to stand out.",
        "Through workshops and market research, we help articulate your value proposition and develop messaging that resonates with your target audience while differentiating from competitors.",
        "The resulting brand positioning map becomes a strategic tool for marketing decisions, product development, and communication strategies."
      ]
    },
    {
      id: 4,
      title: "Στήριξη επιχειρήσεων για ένα κοινωνικά υπεύθυνο μέλλον",
      description: "Description",
      image: "/images/service4.jpg",
      altText: "Content calendar and blog posts",
      details: [
        "Our content marketing services help you tell your brand story effectively across multiple platforms. We develop strategic content plans aligned with your business objectives.",
        "From blog posts and social media content to videos and podcasts, we create engaging materials that attract, inform, and convert your target audience.",
        "We focus on creating valuable content that positions your brand as an authority in your industry while driving organic traffic and generating leads."
      ]
    },
    {
      id: 5,
      title: "Συμβουλευτική επικοινωνίας και διαχείρισης κρίσης",
      description: "Description",
      image: "/images/service6.jpg",
      altText: "Digital ad campaign analytics dashboard",
      details: [
        "Our digital advertising services maximize your online presence through strategic paid campaigns. We develop targeted ads that reach your ideal customers at the right time and place.",
        "Using advanced targeting techniques and continuous optimization, we ensure your advertising budget delivers the highest possible return on investment.",
        "From Google Ads and social media advertising to programmatic display campaigns, we manage the entire process from strategy to implementation and reporting."
      ]
    },
    {
      id: 6,
      title: "Εκπαιδευτικά πακέτα",
      description: "Description",
      image: "/images/service5.jpg",
      altText: "Market research data visualization",
      details: [
        "Our market research services provide the insights you need to make informed business decisions. We conduct comprehensive analyses of your industry, competitors, and target audience.",
        "Using a combination of qualitative and quantitative research methods, we identify market opportunities, consumer preferences, and emerging trends that impact your business.",
        "Our research findings translate into actionable recommendations that drive product development, marketing strategies, and overall business growth."
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
              
              {/* Add arrows between steps (except after the last one) */}
              {index < service.process.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
                  <ArrowRight className="w-6 h-6 text-blue-300" />
                </div>
              )}
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
              <p className="text-gray-600">{service.description}</p>
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