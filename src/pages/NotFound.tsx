
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="text-center max-w-md px-4">
          <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-6">404</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">Oops! We couldn't find the page you're looking for.</p>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The page you requested might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div className="space-y-4">
            <Button asChild size="lg">
              <Link to="/">Return to Home</Link>
            </Button>
            <div className="pt-2">
              <Link to="/courses" className="text-blue-600 dark:text-blue-400 hover:underline">
                Browse Our Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
