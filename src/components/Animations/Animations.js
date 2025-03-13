import { useRef, useState, useEffect } from 'react';
import React from 'react';

/**
 * Enhanced useInView hook for detecting when elements enter the viewport
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Threshold value between 0 and 1 
 * @param {boolean} options.triggerOnce - Whether to trigger only once or every time element enters/exits viewport
 * @param {number} options.rootMargin - Margin around the root element
 * @returns {Object} Object containing ref to be attached and isInView state
 */
export const useInView = (options = {}) => {
  const { 
    threshold = 0.1, 
    triggerOnce = true,
    rootMargin = '0px'
  } = options;
  
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // If triggerOnce is true, unobserve after first intersection
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, triggerOnce, rootMargin]);

  return { ref, isInView };
};

/**
 * Reusable animated component that applies different animation effects when scrolled into view
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to animate
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.animation - Animation type: 'fade-up', 'fade-in', 'slide-in-right', 'slide-in-left', 'scale-up', etc.
 * @param {number} props.delay - Delay in milliseconds
 * @param {Object} props.options - Additional IntersectionObserver options
 */
export const AnimatedElement = ({ 
  children, 
  className = "", 
  animation = "fade-up", 
  delay = 0,
  duration = 1000,
  options = {}
}) => {
  const { ref, isInView } = useInView(options);
  
  // Calculate delay class based on the delay value
  const getDelayClass = () => {
    if (!delay) return '';
    
    // Convert millisecond delay to Tailwind classes (multiples of 150ms)
    const tailwindDelay = Math.round(delay / 150);
    return `delay-${tailwindDelay * 150}`;
  };
  
  // Calculate duration class based on the duration value
  const getDurationClass = () => {
    if (duration === 1000) return 'duration-1000';
    
    // Common duration classes
    const durationOptions = {
      300: 'duration-300',
      500: 'duration-500',
      700: 'duration-700',
      1000: 'duration-1000',
      1500: 'duration-1500',
      2000: 'duration-2000'
    };
    
    return durationOptions[duration] || 'duration-1000';
  };
  
  // Different animation types
  const getAnimationClass = () => {
    switch(animation) {
      case 'fade-up':
        return isInView 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-16";
      case 'fade-down':
        return isInView 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 -translate-y-16";
      case 'fade-in':
        return isInView 
          ? "opacity-100" 
          : "opacity-0";
      case 'slide-in-right':
        return isInView 
          ? "opacity-100 translate-x-0" 
          : "opacity-0 -translate-x-16";
      case 'slide-in-left':
        return isInView 
          ? "opacity-100 translate-x-0" 
          : "opacity-0 translate-x-16";
      case 'scale-up':
        return isInView 
          ? "opacity-100 scale-100" 
          : "opacity-0 scale-95";
      case 'scale-down':
        return isInView 
          ? "opacity-100 scale-100" 
          : "opacity-0 scale-105";
      case 'rotate-in':
        return isInView 
          ? "opacity-100 rotate-0" 
          : "opacity-0 rotate-12";
      default:
        return isInView 
          ? "opacity-100" 
          : "opacity-0";
    }
  };

  return (
    <div
      ref={ref}
      className={`transform transition-all ease-out ${getDurationClass()} ${getAnimationClass()} ${getDelayClass()} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : {}}
    >
      {children}
    </div>
  );
};

/**
 * Animation container that can animate a list of items sequentially
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to animate
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.animation - Animation type for children
 * @param {number} props.staggerDelay - Delay between each child animation
 * @param {number} props.initialDelay - Initial delay before first animation
 */
export const AnimatedContainer = ({
  children,
  className = "",
  animation = "fade-up",
  staggerDelay = 150,
  initialDelay = 0,
  duration = 1000,
  options = {}
}) => {
  const { ref, isInView } = useInView(options);
  
  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => (
        React.isValidElement(child) ? 
          React.cloneElement(child, {
            className: `${child.props.className || ''}`,
            style: {
              ...child.props.style,
              opacity: 0,
              transform: getInitialTransform(animation),
              transition: `all ${duration}ms ease-out`,
              transitionDelay: isInView ? `${initialDelay + (index * staggerDelay)}ms` : '0ms',
              ...(isInView && {
                opacity: 1,
                transform: 'translate3d(0, 0, 0) scale(1) rotate(0)'
              })
            }
          }) : child
      ))}
    </div>
  );
};

// Helper function to get initial transform based on animation type
const getInitialTransform = (animation) => {
  switch(animation) {
    case 'fade-up':
      return 'translate3d(0, 40px, 0)';
    case 'fade-down':
      return 'translate3d(0, -40px, 0)';
    case 'slide-in-right':
      return 'translate3d(-40px, 0, 0)';
    case 'slide-in-left':
      return 'translate3d(40px, 0, 0)';
    case 'scale-up':
      return 'scale(0.95)';
    case 'scale-down':
      return 'scale(1.05)';
    case 'rotate-in':
      return 'rotate(12deg)';
    default:
      return 'translate3d(0, 0, 0)';
  }
};