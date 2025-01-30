import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const logos = [
  "https://sos-villages.gr/wp-content/uploads/2019/11/Emblem.jpg",
  "https://sos-villages.gr/wp-content/uploads/2019/11/Emblem.jpg",
  "https://sos-villages.gr/wp-content/uploads/2019/11/Emblem.jpg",
  "https://sos-villages.gr/wp-content/uploads/2019/11/Emblem.jpg",
  "https://sos-villages.gr/wp-content/uploads/2019/11/Emblem.jpg",
];

export default function LogoSlider() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % logos.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + logos.length) % logos.length);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto p-8 overflow-hidden">
      <div className="flex items-center justify-center">
        <div className="relative flex w-full max-w-4xl overflow-hidden">
          <motion.div
            className="flex gap-8"
            animate={{ x: `-${index * 25}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ width: "max-content" }}
          >
            {[...logos, ...logos].map((logo, i) => {
              const isActive = i % logos.length === index;
              return (
                <motion.div
                  key={i}
                  className="flex-shrink-0 w-1/4 flex justify-center"
                  animate={{
                    scale: isActive ? 1.2 : 1,
                    opacity: isActive ? 1 : 0.6,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={logo}
                    alt={`Service ${i % logos.length + 1}`}
                    className="w-full h-56 object-contain rounded-lg shadow-lg"
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-300"
        onClick={prevSlide}
      >
        <ChevronLeft size={32} />
      </button>

      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-300"
        onClick={nextSlide}
      >
        <ChevronRight size={32} />
      </button>
    </div>
  );
}
