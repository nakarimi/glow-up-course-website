
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Menu, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetTrigger, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetClose 
} from "@/components/ui/sheet";
import ThemeToggle from "@/components/ThemeToggle";
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";
import ThemeSelector from "@/components/ThemeSelector";
import { useIsMobile } from "@/hooks/use-mobile";
import UserMenu from "@/components/UserMenu";

const Navbar = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const totalCartItems = cartItems.reduce((total, item) => total + (item.attendees || 1), 0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Courses", path: "/course-list" },
    { label: "Blog", path: "/blog" },
    { label: "Branches", path: "/branches" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];
  
  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 dark:bg-slate-900/90 shadow-md backdrop-blur-sm" 
          : "bg-white dark:bg-slate-900"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary mr-8">
              SkillForge
            </Link>
            
            {/* Desktop navigation */}
            {!isMobile && (
              <nav className="hidden md:flex items-center space-x-6">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <ThemeSelector />
            <ThemeToggle />
            
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground">
                    {totalCartItems}
                  </span>
                )}
                <span className="sr-only">Shopping cart</span>
              </Button>
            </Link>
            
            {/* User Menu replacing Auth buttons */}
            <UserMenu />
            
            {/* Mobile menu button */}
            {isMobile && (
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle className="text-left text-2xl font-bold">
                      SkillForge
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 flex flex-col space-y-4">
                    {menuItems.map((item) => (
                      <SheetClose asChild key={item.path}>
                        <Link
                          to={item.path}
                          className="text-lg font-medium text-foreground hover:text-primary"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}
                    <div className="pt-4 border-t flex flex-col space-y-2">
                      <UserMenu className="justify-start w-full h-auto p-2" />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
