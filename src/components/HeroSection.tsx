
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 -z-10"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10 -z-20"></div>

      <div className="container mx-auto px-4 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
            BOOK | TRAIN | LEARN
          </h1>
          <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Discover expert-led training courses designed to boost your skills and advance your career. Find the perfect learning opportunity today.
          </p>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-lg max-w-2xl mx-auto">
            <div className="text-left mb-4">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Find Your Course</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Location
                </label>
                <Input id="location" placeholder="e.g. Online" className="w-full" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Subject
                </label>
                <Input id="subject" placeholder="e.g. My Course/Training" className="w-full" />
              </div>
            </div>

            <Button className="w-full md:w-auto">
              <Search className="h-4 w-4 mr-2" />
              Find Courses
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
