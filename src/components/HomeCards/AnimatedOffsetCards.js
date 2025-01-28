"use client";
import React, { useEffect, useRef } from "react";

const AnimatedOffsetCards = () => {
  const cardRefs = useRef([]);

  const cards = [
    {
      title: "4Impact Communications",
      content:
        "Στην 4Impact Communications, πιστεύουμε ότι ο σκοπός των Brands – είτε πρόκειται για οργανώσεις της κοινωνίας των πολιτών είτε για εταιρείες – είναι η πυξίδα μας στις στρατηγικές λύσεις Marketing, Επικοινωνίας και Branding που προτείνουμε. Με 20 χρόνια εμπειρίας στους τομείς της στρατηγικής επικοινωνίας, του Marketing, του Branding και της παραγωγής περιεχομένου κάθε μορφής, είμαστε έτοιμοι να σας βοηθήσουμε να ανοίξετε τον δρόμο για να πετύχετε τους στόχους σας.",
    },
    {
      content:
        "Για εμάς, η επικοινωνία δεν είναι απλώς μια διαδικασία – είναι ο πραγματικός αντίκτυπος που δημιουργούμε «εκεί έξω». Δεν επικοινωνούμε απλά για να κάνουμε «θόρυβο» αλλά για να πετύχουμε - μαζί με τους συνεργάτες που μας εμπιστεύονται – την πραγματική αλλαγή που επιθυμούν.",
    },
    {
      content: "",
    },
    {
      content: "",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target);
            if (index % 2 === 0) {
              entry.target.classList.add("animate-slide-in");
            } else {
              entry.target.classList.add("animate-slide-in-right");
            }
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen p-4 mt-[1rem]">
      <div className="relative w-full max-w-6xl space-y-8">
        {cards.map((card, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className={`w-full md:w-3/4 lg:w-2/3 bg-white rounded-xl shadow-lg p-12 opacity-0 hover:scale-115 transition-all duration-300 ${
              index % 2 === 0 ? "mr-auto" : "ml-auto translate-y-16"
            }`}
          >
            {card.title && (
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {card.title}
              </h2>
            )}
            <p className="text-gray-600 text-lg text-justify leading-relaxed">
              {card.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedOffsetCards;
