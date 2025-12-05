import React, { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

const ConfirmationModal = ({ message, onConfirm, onCancel, title = "Confirm Action" }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger entry animations on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCancel = () => {
     // Optional: Add exit animation logic here before calling onCancel
     onCancel();
  }

  return (
    // 1. Overlay Backdrop
    // Added backdrop-blur for depth focus and a smooth fade-in
    <div 
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-[4px] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleCancel} // Close on backdrop click for UX
    >
      
      {/* 2. The Modal Container (The "Astonishing" Part) */}
      <div 
        // Stop click propagation so clicking the modal doesn't close it
        onClick={(e) => e.stopPropagation()} 
        // Styles breakdown:
        // - Glassmorphism: bg-white/90 + backdrop-blur-xl + border-white/40
        // - Depth & Glow: shadow-2xl + shadow-glow-red (custom)
        // - Animation: animate-spring-in (custom elastic entrance)
        className={`relative w-11/12 max-w-md p-8 overflow-hidden bg-white/90 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl shadow-glow-red/30 ring-1 ring-red-500/10 ${isVisible ? 'animate-spring-in' : ''}`}
      >
        
        {/* Decorative background blob for extra flair */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          {/* Header Section with Glowing Icon */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left sm:flex-row gap-6 mb-6">
            {/* Icon Container */}
            <div className="flex-shrink-0 p-4 bg-red-50 rounded-2xl animate-pulse-slow ring-4 ring-red-100/50">
               <AlertTriangle className="w-8 h-8 text-red-600 drop-shadow-sm" />
            </div>

            <div>
               {/* Title with gradient text for pop */}
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-700 mb-2">
                {title}
              </h3>
              {/* Message text */}
              <p className="text-gray-600 leading-relaxed font-medium">
                {message}
              </p>
            </div>
          </div>


          {/* 3. Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8">
            
            {/* Cancel Button - Modern "Ghost" style */}
            {/* Interactivity: Hover border, hover text darken, active scale down */}
            <button 
              className="px-6 py-3 text-sm font-semibold text-gray-600 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:text-gray-800 hover:shadow-sm hover:bg-gray-50 active:scale-[0.97] transition-all duration-200 ease-in-out"
              onClick={handleCancel}
            >
              Cancel
            </button>
            
            {/* Confirm Button - The "Hero" button */}
            {/* Styles: Gradient background, colored glow shadow. */}
            {/* Interactivity: Scale up on hover, brighten gradient, increase shadow, scale down on click. */}
            <button 
              className="relative group px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-red-600 to-orange-600 rounded-xl shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02] hover:from-red-500 hover:to-orange-500 active:scale-[0.97] transition-all duration-200 ease-in-out overflow-hidden"
              onClick={onConfirm}
            >
              {/* Subtle shine effect passing over the button on hover */}
              <div className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></div>
              <span className="relative z-10 flex items-center gap-2">
                 Delete Forever
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;