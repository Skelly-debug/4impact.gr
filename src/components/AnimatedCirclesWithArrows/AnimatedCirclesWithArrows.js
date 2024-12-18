import React, { useRef } from "react";
import { useInView } from "react-intersection-observer";

const AnimatedCirclesWithArrows = ({
  circleText1,
  circleText2,
  circleText3,
  arrowText1,
  arrowText2,
  arrowText3,
}) => {
  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: true,
  });

  const renderCircle = (circleText, arrowText, delay = 0) => (
    <div className="flex items-center space-x-4">
      <div
        className={`
          flex items-center justify-center 
          w-40 h-40 
          bg-blue-500 
          rounded-full 
          transition-all 
          duration-700 
          ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}
        `}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <div className="text-white font-bold text-center px-4">
          {circleText}
        </div>
      </div>
      <div className="w-64">
        <div className="flex items-center">
          <svg
            className="w-6 h-6 text-blue-500 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
          <span
            className={`
              text-blue-800 font-bold break-words 
              ${
                inView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }
              transition-all 
              duration-700 
            `}
            style={{ transitionDelay: `${delay + 50}ms` }}
          >
            {arrowText}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div ref={ref} className="flex justify-center my-20">
      <div className="flex flex-col items-center justify-center space-y-4 lg:flex-row lg:space-x-[10rem] lg:space-y-0">
        {renderCircle(circleText1, arrowText1)}
        {renderCircle(circleText2, arrowText2, 100)}
        {renderCircle(circleText3, arrowText3, 200)}
      </div>
    </div>
  );
};

export default AnimatedCirclesWithArrows;
