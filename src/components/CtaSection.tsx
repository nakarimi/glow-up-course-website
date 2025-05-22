
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CtaSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent z-0"></div>
      
      {/* Abstract shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-primary/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="glass-card max-w-3xl mx-auto text-center p-10 backdrop-blur-lg animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
            Ready to enhance your skills?
          </h2>
          <p className="text-muted-foreground mb-10 text-lg">
            Join thousands of professionals who have transformed their careers with our courses.
            Get started today and take the first step toward your professional goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="gradient" 
              size="lg"
              className="font-semibold text-base"
              onClick={() => navigate("/courses")}
            >
              Find a Course
            </Button>
            <Button 
              variant="glass" 
              size="lg"
              className="font-semibold text-base"
              onClick={() => navigate("/contact")}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
