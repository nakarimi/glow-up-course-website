
// Replace the CarouselRoot issue by fixing the carousel import:
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    title: "Unlock Your Potential",
    description: "Expert-led training courses to boost your career",
    buttonText: "Explore Courses",
    buttonLink: "/courses",
  },
  {
    image: "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    title: "Business Leadership",
    description: "Develop essential management skills for the modern workplace",
    buttonText: "View Courses",
    buttonLink: "/courses",
  },
  {
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    title: "Professional Development",
    description: "Stay ahead with the latest industry knowledge and skills",
    buttonText: "Browse Courses",
    buttonLink: "/courses",
  },
];

const HomeSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleIndicatorClick = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    
    // Resume auto-playing after user interaction
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 5000);
  };

  return (
    <div className="relative h-[70vh] bg-muted overflow-hidden">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
            
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="max-w-xl">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
                  {slide.title}
                </h1>
                <p className="text-xl text-white mb-8">{slide.description}</p>
                <a
                  href={slide.buttonLink}
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
                >
                  {slide.buttonText}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleIndicatorClick(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-primary" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeSlider;
