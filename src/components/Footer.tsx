
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center">
                <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center">
                  <div className="bg-blue-500 rounded-full w-3 h-3"></div>
                </div>
              </div>
              <span className="text-lg font-bold">CourseHub</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              Providing high-quality training courses to help professionals advance their careers since 1993.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">Courses</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact Details</h3>
            <address className="not-italic text-muted-foreground">
              <p className="mb-2">CourseHub Training</p>
              <p className="mb-2">123 Training Street</p>
              <p className="mb-2">Education City, EC1 2AB</p>
              <p className="mb-2">Phone: +44 1234 567890</p>
              <p>Email: info@coursehub.com</p>
            </address>
          </div>

          <div>
            <h3 className="font-bold mb-4">Newsletter Signup</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter to receive updates on new courses and special offers.
            </p>
            <form className="space-y-2">
              <Input placeholder="Email Address" className="w-full" />
              <Button className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CourseHub Training. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
