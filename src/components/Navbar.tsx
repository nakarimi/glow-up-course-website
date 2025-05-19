
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 dark:bg-slate-900/90 shadow-md backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center">
            <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
              <div className="bg-blue-500 rounded-full w-4 h-4"></div>
            </div>
          </div>
          <span className="text-xl font-bold text-foreground">CourseHub</span>
        </Link>

        {!isMobile ? (
          <div className="flex items-center gap-6">
            <div className="flex gap-6">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/courses" className="text-foreground hover:text-primary transition-colors">
                Courses
              </Link>
              <Link to="/about" className="text-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>

            <div className="ml-4 flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <ThemeToggle />
              <Button variant="default" size="sm">Find Courses</Button>
              <Button variant="outline" size="sm">Log in</Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && mobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-background z-40 animate-fade-in flex flex-col">
          <div className="flex-1 flex flex-col p-6 gap-6">
            <Link 
              to="/" 
              className="text-lg font-medium border-b pb-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/courses" 
              className="text-lg font-medium border-b pb-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Courses
            </Link>
            <Link 
              to="/about" 
              className="text-lg font-medium border-b pb-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-lg font-medium border-b pb-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            <div className="mt-6 flex flex-col gap-3">
              <Button className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Search Courses
              </Button>
              <Button variant="outline" className="w-full">Log in</Button>
              <Button variant="default" className="w-full">Find Courses</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
