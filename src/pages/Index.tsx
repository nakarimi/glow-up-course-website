
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
import { useEffect } from "react";

const Index = () => {
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
    </div>
  );
};

export default Index;
