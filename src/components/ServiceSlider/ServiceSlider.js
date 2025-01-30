import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


//edw vale onomata
const defaultLogos = [
  {
    src: "/api/placeholder/200/100",
    alt: "Discover",
    name: "DISCOVER"
  },
  {
    src: "/api/placeholder/200/100",
    alt: "iTunes",
    name: "iTunes"
  },
  {
    src: "/api/placeholder/200/100",
    alt: "Payoneer",
    name: "PAYONEER"
  },
  {
    src: "/api/placeholder/200/100",
    alt: "Qatar Airways",
    name: "QATAR AIRWAYS"
  },
  {
    src: "/api/placeholder/200/100",
    alt: "Suzuki",
    name: "SUZUKI"
  },
  {
    src: "/api/placeholder/200/100",
    alt: "Microsoft",
    name: "MICROSOFT"
  },
  {
    src: "/api/placeholder/200/100",
    alt: "Google",
    name: "GOOGLE"
  },
  {
    src: "/api/placeholder/200/100",
    alt: "Qatar Airways",
    name: "QATAR AIRWAYS"
  },
];

//edw tha oriseis apo pou tha arxisei
const LogoSlider = ({ logos = defaultLogos }) => {
  const [translateX, setTranslateX] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [isAnimating, setIsAnimating] = useState(false);
  
  const itemWidth = 272; 

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const nextIndex = (currentIndex + 1) % logos.length;
    const nextTranslate = nextIndex * itemWidth;
    

    //MHN PEIRAKSEIS TO -3 GT THA VGAZEI LEUKA KOUTAKIA META TO LAST
    if (nextIndex === logos.length - 3) {
      setTranslateX(0);
      setCurrentIndex(0);
    } else {
      setTranslateX(nextTranslate);
      setCurrentIndex(nextIndex);
    }
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const nextIndex = (currentIndex - 1 + logos.length) % logos.length;
    const nextTranslate = nextIndex * itemWidth;

    setTranslateX(nextTranslate);
    setCurrentIndex(nextIndex);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <h2 className="text-2xl font-semibold text-center mb-8 text-teal-800">
        
      </h2>
      <div className="relative">
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10 disabled:opacity-50"
          disabled={isAnimating}
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10 disabled:opacity-50"
          disabled={isAnimating}
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>

        <div className="overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${translateX}px)`
            }}
          >
            {logos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex-shrink-0 w-64 h-32 bg-white rounded-lg shadow-sm border border-black flex flex-col items-center justify-center p-4"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-w-full max-h-16 object-contain mb-2"
                  draggable="false"
                />
                <span className="text-sm font-semibold text-gray-600">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoSlider;



