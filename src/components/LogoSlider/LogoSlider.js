import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const defaultLogos = [
  {
    src: "https://sos-villages.gr/wp-content/uploads/2019/11/Emblem.jpg",
    alt: "Paidika Xwria SOS",
    name: "Παιδικά Χωριά SOS",
  },
  {
    src: "https://cdn.sender.net/email_images/301244/images/all/logo_ikkb_final_rgb_gr_logo.jpg",
    alt: "ΙΚΒΚΚ",
    name: "ΙΚΒΚΚ",
  },
];

const LogoSlider = ({ logos = defaultLogos }) => {
  const [translateX, setTranslateX] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobileSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobileSize();
    window.addEventListener("resize", checkMobileSize);
    return () => window.removeEventListener("resize", checkMobileSize);
  }, []);

  const itemWidth = isMobile ? 240 : 272; // Slightly smaller on mobile
  const visibleLogos = isMobile ? 1 : 4; // Show one logo at a time on mobile

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const nextIndex = (currentIndex + 1) % logos.length;
    const nextTranslate = nextIndex * itemWidth;

    if (nextIndex >= logos.length - visibleLogos + 1) {
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

  // Show navigation if there are more logos than visible slots AND not on mobile
  const showNavigation = !isMobile && logos.length > visibleLogos;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 my-12">
      <div className="relative">
        {showNavigation && (
          <>
            <button
              onClick={handlePrev}
              className="absolute -left-8 sm:-left-[3.5rem] top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10 disabled:opacity-50"
              disabled={isAnimating}
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </button>

            <button
              onClick={handleNext}
              className="absolute -right-8 sm:-right-[2.5rem] top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10 disabled:opacity-50"
              disabled={isAnimating}
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </button>
          </>
        )}

        <div
          className={`
            ${isMobile ? "overflow-x-auto" : "overflow-hidden"}
          `}
        >
          <div
            className={`
              flex gap-4 
              ${
                isMobile
                  ? "w-max"
                  : "transition-transform duration-500 ease-in-out " +
                    (logos.length < 4 ? "justify-center" : "")
              }
            `}
            style={{
              transform:
                !isMobile && showNavigation
                  ? `translateX(-${translateX}px)`
                  : "none",
            }}
          >
            {logos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="
                  flex-shrink-0 
                  w-60 sm:w-64 
                  h-32 
                  bg-white 
                  rounded-lg 
                  shadow-sm 
                  border 
                  border-black 
                  flex 
                  flex-col 
                  items-center 
                  justify-center 
                  p-4
                  min-w-[240px]
                "
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-w-full max-h-16 object-contain mb-2"
                  draggable="false"
                />
                <span className="text-sm font-semibold text-gray-600 text-center">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoSlider;
