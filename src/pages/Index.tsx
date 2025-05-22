
import { useEffect, useState } from "react";
import HomeSlider from "@/components/HomeSlider";
import FeaturedCourses from "@/components/FeaturedCourses";
import CategoryGrid from "@/components/CategoryGrid";
import StatsSection from "@/components/StatsSection";
import CtaSection from "@/components/CtaSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import NewsSlider from "@/components/NewsSlider";
import TestimonialSection from "@/components/TestimonialSection";
import CourseCategories from "@/components/CourseCategories";

// Add ReCAPTCHA script
const loadReCaptcha = () => {
  const script = document.createElement("script");
  script.src = "https://www.google.com/recaptcha/api.js?render=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
  
  return () => {
    document.head.removeChild(script);
  };
};

const Index = () => {
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);

  // Load ReCAPTCHA
  useEffect(() => {
    const cleanupRecaptcha = loadReCaptcha();
    setIsRecaptchaLoaded(true);
    
    return () => {
      cleanupRecaptcha();
    };
  }, []);
  
  // Add smooth scroll behavior on component mount
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
    
    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );
    
    // Observe all sections
    document.querySelectorAll("section").forEach((section) => {
      section.classList.add("opacity-0");
      observer.observe(section);
    });
    
    return () => {
      // Clean up observer
      document.querySelectorAll("section").forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HomeSlider />
      <HeroSection />
      <CourseCategories />
      <FeaturedCourses />
      <TestimonialSection />
      <StatsSection />
      <NewsSlider />
      <CtaSection />
      <Footer />

      {/* Hidden reCAPTCHA badge for test purposes */}
      {isRecaptchaLoaded && (
        <div 
          className="g-recaptcha" 
          data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" 
          data-size="invisible"
        ></div>
      )}
      
      {/* Add a visual indicator that reCAPTCHA is loaded */}
      <div className="fixed bottom-2 left-2 z-10 text-xs bg-white/80 dark:bg-gray-800/80 p-1 px-2 rounded-full text-muted-foreground">
        {isRecaptchaLoaded ? "reCAPTCHA loaded" : "Loading reCAPTCHA..."}
      </div>
    </div>
  );
};

export default Index;
