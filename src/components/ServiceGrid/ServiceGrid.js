// components/ServiceGrid.jsx
import Link from 'next/link';
import Image from 'next/image';

const services = [
  { 
    id: 1, 
    name: 'Στρατηγική επικοινωνίας με πραγματικό Αντίκτυπο', 
    description: 'Στρατηγική επικοινωνίας με πραγματικό Αντίκτυπο', 
    slug: 'service1',
    imageUrl: '/images/service3.jpg' // Replace with your actual image paths
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
    <div className="py-8">
      {/* <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Other Services</h2> */}
      <div className="w-full max-w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesToShow.map((service) => (
          <Link href={`/services/${service.slug}`} key={service.id} className="group relative block h-64 overflow-hidden rounded-lg shadow-md">
            {/* Image */}
            <div className="relative h-full w-full">
              <Image 
                src={service.imageUrl} 
                alt={service.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Mobile-only overlay - Always visible */}
              <div className="absolute inset-0 flex items-center justify-center bg-cyan-500 bg-opacity-70 text-white md:hidden">
                <div className="text-center p-4">
                  <h3 className="text-xl font-semibold">{service.name}</h3>
                  <p className="mt-2 text-sm">Click to learn more</p>
                </div>
              </div>
              
              {/* Desktop-only overlay - Visible on hover */}
              <div className="absolute inset-0 hidden md:flex items-center justify-center bg-cyan-500 bg-opacity-0 text-white group-hover:bg-opacity-70 transition-all duration-300">
                <div className="text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xl font-semibold">{service.name}</h3>
                  <p className="mt-2 text-sm">Click to learn more</p>
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