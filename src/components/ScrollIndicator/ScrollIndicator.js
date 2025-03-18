import React from "react";
import { ChevronRight } from "lucide-react";

function ScrollIndicator () {
    return (
        <div>
            {/* Hero Scroll Indicator */}
            <div 
              className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce cursor-pointer"
              onClick={() => {
                  window.scrollTo({
                    top: window.innerHeight - 110,
                    behavior: 'smooth'
                  });
                }}
            >
              <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center">
                <ChevronRight className="text-white transform rotate-90" size={20} />
              </div>
            </div>
        </div>
    )

};

export default ScrollIndicator;