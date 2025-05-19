
import HeroSection from "@/components/HeroSection";
import FeaturedCourses from "@/components/FeaturedCourses";
import CourseCategories from "@/components/CourseCategories";
import StatsSection from "@/components/StatsSection";
import CtaSection from "@/components/CtaSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <FeaturedCourses />
      <CourseCategories />
      <StatsSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;
