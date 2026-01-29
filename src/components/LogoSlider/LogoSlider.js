import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const defaultLogos = [
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
  {
    src: "https://mindworkslab.org/wp-content/uploads/2022/11/site-logo.jpg",
    alt: "Mindwroks Lab",
    name: "Mindworks Lab",
    url: "https://mindworkslab.org/",
  },
  {
    src: "https://sege.gr/wp-content/uploads/2023/05/logo-1.png",
    alt: "Σύνδεσμος Επιχειριματιών Γυναικών Ελλάδος",
    name: "ΣΕΓΕ",
    url: "https://sege.gr/",
  }
];

const LogoSlider = ({ logos = defaultLogos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [translateX, setTranslateX] = useState(0);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobileSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobileSize();
    window.addEventListener("resize", checkMobileSize);
    return () => window.removeEventListener("resize", checkMobileSize);
  }, []);

  const visibleLogos = isMobile ? 1 : 4;
  const itemWidth = 280; // Card width (256px) + gap (24px)

  // Create extended array for infinite loop effect
  const extendedLogos = [...logos, ...logos, ...logos];

  useEffect(() => {
    // Start at the middle set
    setCurrentIndex(logos.length);
    setTranslateX(logos.length * itemWidth);
  }, [logos.length, itemWidth]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    setTranslateX(nextIndex * itemWidth);
    
    // Reset to middle set after animation
    setTimeout(() => {
      if (nextIndex >= logos.length * 2) {
        setCurrentIndex(logos.length);
        setTranslateX(logos.length * itemWidth);
      }
      setIsAnimating(false);
    }, 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const nextIndex = currentIndex - 1;
    setCurrentIndex(nextIndex);
    setTranslateX(nextIndex * itemWidth);
    
    // Reset to middle set after animation
    setTimeout(() => {
      if (nextIndex < logos.length) {
        setCurrentIndex(logos.length * 2 - 1);
        setTranslateX((logos.length * 2 - 1) * itemWidth);
      }
      setIsAnimating(false);
    }, 500);
  };

  const showNavigation = logos.length > visibleLogos;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      <div className="relative">
        {/* Navigation Buttons - Desktop Only */}
        {showNavigation && !isMobile && (
          <>
            <button
              onClick={handlePrev}
              className="absolute -left-4 lg:-left-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all duration-300 z-10 disabled:opacity-50 group"
              disabled={isAnimating}
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>

            <button
              onClick={handleNext}
              className="absolute -right-4 lg:-right-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all duration-300 z-10 disabled:opacity-50 group"
              disabled={isAnimating}
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
          </>
        )}

        {/* Slider Container */}
        <div 
          className={`${isMobile ? 'overflow-x-auto' : 'overflow-hidden'} py-4`}
        >
          <div
            className={`
              flex gap-6 
              ${isMobile ? 'w-max' : logos.length < visibleLogos ? 'justify-center' : ''}
            `}
            style={{
              transform: !isMobile && showNavigation ? `translateX(-${translateX}px)` : 'none',
              transition: isAnimating ? 'transform 500ms ease-out' : 'none',
            }}
          >
            {(isMobile ? logos : extendedLogos).map((logo, index) => (
              <a
                key={`${logo.name}-${index}`}
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  flex-shrink-0 
                  ${isMobile ? 'w-60 sm:w-64' : 'w-64'} 
                  h-40
                  my-4
                  bg-gradient-to-br from-white to-gray-50
                  rounded-2xl 
                  shadow-md
                  hover:shadow-xl
                  border-2
                  border-gray-100
                  hover:border-blue-200
                  flex 
                  flex-col 
                  items-center 
                  justify-center 
                  p-6
                  ${isMobile ? 'min-w-[240px]' : ''}
                  transition-all 
                  duration-300
                  hover:scale-105
                  hover:-translate-y-1
                  cursor-pointer
                  group
                  relative
                  overflow-hidden
                `}
              >
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 rounded-2xl"></div>
                
                <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-w-full max-h-20 object-contain transition-transform duration-300 group-hover:scale-110"
                    draggable="false"
                  />
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            ))}
          </div>
        </div>

        {/* Desktop Indicators */}
        {!isMobile && showNavigation && (
          <div className="flex justify-center gap-2 mt-8">
            {logos.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    const targetIndex = logos.length + index;
                    setCurrentIndex(targetIndex);
                    setTranslateX(targetIndex * itemWidth);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`
                  h-2 rounded-full transition-all duration-300
                  ${
                    currentIndex % logos.length === index
                      ? 'w-8 bg-blue-500'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }
                `}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LogoSlider;