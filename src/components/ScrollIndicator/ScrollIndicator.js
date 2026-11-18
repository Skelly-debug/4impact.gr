import React from "react";
import { ChevronRight } from "lucide-react";

function ScrollIndicator () {
    return (
        <div>
            {/* Hero Scroll Indicator */}
            <div 
              className="absolute bottom-8 left-0 right-0 flex justify-end px-6 md:px-12 animate-bounce cursor-pointer z-20"
              onClick={() => {
                  window.scrollTo({
                    top: window.innerHeight - 110,
                    behavior: 'smooth'
                  });
                }}
            >
              <div className="w-12 h-12 rounded-full border border-white/60 bg-ink/40 backdrop-blur-sm flex items-center justify-center hover:bg-brand hover:border-brand transition-colors">
                <ChevronRight className="text-white transform rotate-90" size={20} />
              </div>
            </div>
        </div>
    )

};

export default ScrollIndicator;