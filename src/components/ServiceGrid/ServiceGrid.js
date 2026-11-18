// components/ServiceGrid.jsx
import Link from 'next/link';
import Image from 'next/image';

const services = [
  { 
    id: 1, 
    name: 'Στρατηγική επικοινωνίας με πραγματικό Αντίκτυπο', 
    description: 'Στρατηγική επικοινωνίας με πραγματικό Αντίκτυπο', 
    slug: 'service1',
    imageUrl: '/images/service3.jpg'
  },
  { 
    id: 2, 
    name: 'Στρατηγικός σχεδιασμός και παραγωγή περιεχομένου', 
    description: 'Στρατηγικός σχεδιασμός και παραγωγή περιεχομένου', 
    slug: 'service2',
    imageUrl: '/images/service2.jpg'
  },
  { 
    id: 3, 
    name: 'Σχέσεις με ΜΜΕ',
    description: 'Σχέσεις με ΜΜΕ', 
    slug: 'service3',
    imageUrl: '/images/service7.jpg'
  },
  { 
    id: 4, 
    name: 'Στήριξη επιχειρήσεων για ένα κοινωνικά υπεύθυνο μέλλον', 
    description: 'Στήριξη επιχειρήσεων για ένα κοινωνικά υπεύθυνο μέλλον', 
    slug: 'service4',
    imageUrl: '/images/service4.jpg'
  },
  { 
    id: 5, 
    name: 'Συμβουλευτική επικοινωνίας και διαχείρισης κρίσης', 
    description: 'Συμβουλευτική επικοινωνίας και διαχείρισης κρίσης', 
    slug: 'service5',
    imageUrl: '/images/service6.jpg'
  },
  { 
    id: 6, 
    name: 'Εκπαιδευτικά πακέτα', 
    description: 'Εκπαιδευτικά πακέτα', 
    slug: 'service6',
    imageUrl: '/images/service5.jpg'
  },
];

const ServiceGrid = ({ currentSlug }) => {
  // Filter out the current service to show only other services
  const otherServices = services.filter(service => service.slug !== currentSlug);
  
  // Take only the first 5 other services if there are more than 5
  const servicesToShow = otherServices.slice(0, 5);

  return (
    <div className="py-20 md:py-28">
      <h2 className="section-title w-full max-w-[80%] mx-auto mb-16 text-[clamp(1.8rem,3.6vw,3rem)]">Δείτε τις υπόλoιπες υπηρεσίες μας</h2>
      <div className="w-full max-w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesToShow.map((service) => (
          <Link href={`/services/${service.slug}`} key={service.id} className="group relative block h-72 overflow-hidden rounded-none">
            {/* Image */}
            <div className="relative h-full w-full">
              <Image 
                src={service.imageUrl} 
                alt={service.name}
                layout="fill"
                objectFit="cover"
                className="grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
              />
              
              {/* Overlay - Always visible on both mobile and desktop */}
              <div className="absolute inset-0 flex items-end justify-start bg-gradient-to-t from-ink/90 via-ink/45 to-ink/10 text-white transition-all duration-300 group-hover:from-brand-dark/95 group-hover:via-brand-dark/55">
                <div className="text-left p-6 transition-all duration-300">
                  <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight">{service.name}</h3>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServiceGrid;