
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const slides = [
  {
    title: "Professional Development Solutions",
    subtitle: "Elevate your career with our industry-leading training programs",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    cta: "Browse Courses"
  },
  {
    title: "Corporate Training Programs",
    subtitle: "Tailored solutions to enhance your team's performance",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    cta: "Learn More"
  },
  {
    title: "Certified Courses",
    subtitle: "Industry-recognized certifications to advance your career",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    cta: "View Certifications"
  }
];

const HomeSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoplay) {
      interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoplay]);

  const handleNext = () => {
    setAutoplay(false);
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrevious = () => {
    setAutoplay(false);
    setActiveIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  return (
    <div className="w-full relative">
      <Carousel className="w-full">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[500px] overflow-hidden">
                <div className="absolute inset-0">
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50"></div>
                </div>
                <div className="relative h-full flex flex-col justify-center items-center text-center text-white p-8 max-w-3xl mx-auto">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{slide.title}</h1>
                  <p className="text-lg md:text-xl mb-8">{slide.subtitle}</p>
                  <Button variant="default" size="lg">
                    {slide.cta}
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-white/20 backdrop-blur-sm hover:bg-white/40"
            onClick={handlePrevious}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-white/20 backdrop-blur-sm hover:bg-white/40"
            onClick={handleNext}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Indicator dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === activeIndex ? "w-8 bg-white" : "w-2 bg-white/50"
              }`}
              onClick={() => {
                setAutoplay(false);
                setActiveIndex(index);
              }}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default HomeSlider;
