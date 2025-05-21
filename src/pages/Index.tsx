
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

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HomeSlider />
      <HeroSection />
      <CategoryGrid />
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
