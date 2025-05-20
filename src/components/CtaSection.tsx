
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CtaSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to enhance your skills?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Join thousands of professionals who have transformed their careers with our courses.
            Get started today and take the first step toward your professional goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate("/courses")}
            >
              Find a Course
            </Button>
            <Button 
              variant="outline" 
              size="lg"
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
