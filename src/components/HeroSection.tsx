
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const locations = [
  "Online",
  "London",
  "Manchester",
  "Birmingham",
  "Leeds",
  "Glasgow",
  "Edinburgh",
  "Liverpool",
  "Bristol",
  "Sheffield"
];

const subjectsByLocation = {
  "Online": [
    "Web Development",
    "Data Analysis",
    "Digital Marketing",
    "Leadership Skills",
    "Project Management",
    "UX Design",
    "Business Analytics",
    "Python Programming",
    "Content Writing"
  ],
  "London": [
    "Web Development",
    "Management Training",
    "Digital Marketing",
    "Financial Analysis",
    "Business Strategy",
    "UI/UX Design"
  ],
  "Manchester": [
    "Digital Marketing",
    "Web Development",
    "Leadership Skills",
    "Sales Techniques",
    "Customer Service"
  ],
  "Birmingham": [
    "Project Management",
    "Business Analytics",
    "Leadership Skills",
    "Data Science",
    "Marketing Strategy"
  ],
  "Leeds": [
    "Digital Marketing",
    "Content Creation",
    "SEO Optimization",
    "Business Management"
  ],
  "Glasgow": [
    "Financial Planning",
    "Data Analysis",
    "Project Management",
    "Business Strategy"
  ],
  "Edinburgh": [
    "Data Analysis",
    "Digital Marketing",
    "Leadership Skills",
    "Business Strategy"
  ],
  "Liverpool": [
    "Web Development",
    "Digital Marketing",
    "Business Management",
    "Marketing Strategy"
  ],
  "Bristol": [
    "UX Design",
    "Web Development",
    "Digital Marketing",
    "Leadership Skills"
  ],
  "Sheffield": [
    "Project Management",
    "Data Analysis",
    "Business Strategy",
    "Marketing Strategy"
  ]
};

const allSubjects = Array.from(
  new Set(
    Object.values(subjectsByLocation).flatMap(subjects => subjects)
  )
).sort();

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [location, setLocation] = useState("");
  const [subject, setSubject] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [subjectSuggestions, setSubjectSuggestions] = useState<string[]>([]);
  const [showLocationPopover, setShowLocationPopover] = useState(false);
  const [showSubjectPopover, setShowSubjectPopover] = useState(false);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const subjectInputRef = useRef<HTMLInputElement>(null);

  // Filter location suggestions based on input
  useEffect(() => {
    if (location) {
      const filtered = locations.filter(loc => 
        loc.toLowerCase().includes(location.toLowerCase())
      );
      setLocationSuggestions(filtered);
    } else {
      setLocationSuggestions([]);
    }
  }, [location]);

  // Filter subject suggestions based on selected location and input
  useEffect(() => {
    if (subject) {
      let availableSubjects = location 
        ? (subjectsByLocation as Record<string, string[]>)[location] || allSubjects
        : allSubjects;
        
      const filtered = availableSubjects.filter(sub => 
        sub.toLowerCase().includes(subject.toLowerCase())
      );
      setSubjectSuggestions(filtered);
    } else {
      setSubjectSuggestions([]);
    }
  }, [subject, location]);

  const handleLocationSelect = (loc: string) => {
    setLocation(loc);
    setShowLocationPopover(false);
  };

  const handleSubjectSelect = (sub: string) => {
    setSubject(sub);
    setShowSubjectPopover(false);
  };

  const handleNextStep = () => {
    if (currentStep === 1 && location) {
      setCurrentStep(2);
      setTimeout(() => {
        subjectInputRef.current?.focus();
      }, 100);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      setTimeout(() => {
        locationInputRef.current?.focus();
      }, 100);
    }
  };

  const handleSearch = () => {
    navigate(`/courses?location=${encodeURIComponent(location)}&subject=${encodeURIComponent(subject)}`);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-rose-50 to-blue-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-slate-800 -z-10"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-5 -z-20"></div>

      <div className="container mx-auto px-4 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-rose-500 to-blue-600 dark:from-purple-400 dark:via-rose-400 dark:to-blue-400">
            FORGE | MASTER | EXCEL
          </h1>
          <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-12 max-w-3xl mx-auto">
            Transform your career with industry-leading training programs. Discover expert-crafted courses designed to forge professional excellence and unlock your potential.
          </p>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-2xl mx-auto border border-white/20">
            <div className="mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  currentStep >= 1 ? 'bg-gradient-to-r from-purple-500 to-rose-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  1
                </div>
                <div className={`h-1 w-16 mx-2 transition-all duration-300 ${
                  currentStep >= 2 ? 'bg-gradient-to-r from-purple-500 to-rose-500' : 'bg-gray-200'
                }`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  currentStep >= 2 ? 'bg-gradient-to-r from-rose-500 to-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  2
                </div>
              </div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Step {currentStep} of 2: {currentStep === 1 ? 'Choose Your Location' : 'Select Your Subject'}
              </p>
            </div>
            
            <div className="space-y-6">
              {/* Step 1: Location */}
              <div className={`transition-all duration-500 ${currentStep === 1 ? 'opacity-100 transform-none' : 'opacity-0 transform scale-95 pointer-events-none absolute'}`}>
                <label htmlFor="location" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Where would you like to train?
                </label>
                <Popover open={showLocationPopover} onOpenChange={setShowLocationPopover}>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <Input 
                        id="location" 
                        ref={locationInputRef}
                        placeholder="e.g. Online, London, Manchester..." 
                        className="w-full h-12 text-lg" 
                        value={location}
                        onChange={(e) => {
                          setLocation(e.target.value);
                          if (e.target.value) {
                            setShowLocationPopover(true);
                          }
                        }}
                        onFocus={() => {
                          if (location) {
                            setShowLocationPopover(true);
                          }
                        }}
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 max-h-[200px] overflow-y-auto" align="start">
                    {locationSuggestions.length > 0 ? (
                      <ul className="py-2">
                        {locationSuggestions.map((loc) => (
                          <li 
                            key={loc} 
                            className="px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                            onClick={() => handleLocationSelect(loc)}
                          >
                            {loc}
                          </li>
                        ))}
                      </ul>
                    ) : location ? (
                      <div className="p-4 text-sm text-muted-foreground">
                        No locations found
                      </div>
                    ) : (
                      <ul className="py-2">
                        {locations.map((loc) => (
                          <li 
                            key={loc} 
                            className="px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                            onClick={() => handleLocationSelect(loc)}
                          >
                            {loc}
                          </li>
                        ))}
                      </ul>
                    )}
                  </PopoverContent>
                </Popover>
                {location && (
                  <Button 
                    className="w-full mt-4 h-12 text-lg bg-gradient-to-r from-purple-500 to-rose-500 hover:from-purple-600 hover:to-rose-600"
                    onClick={handleNextStep}
                  >
                    Continue to Subject Selection
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                )}
              </div>

              {/* Step 2: Subject */}
              <div className={`transition-all duration-500 ${currentStep === 2 ? 'opacity-100 transform-none' : 'opacity-0 transform scale-95 pointer-events-none absolute'}`}>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  What would you like to learn?
                </label>
                <Popover open={showSubjectPopover} onOpenChange={setShowSubjectPopover}>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <Input 
                        id="subject" 
                        ref={subjectInputRef}
                        placeholder="e.g. Web Development, Data Analysis..." 
                        className="w-full h-12 text-lg" 
                        value={subject}
                        onChange={(e) => {
                          setSubject(e.target.value);
                          if (e.target.value) {
                            setShowSubjectPopover(true);
                          }
                        }}
                        onFocus={() => {
                          if (subject) {
                            setShowSubjectPopover(true);
                          }
                        }}
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 max-h-[200px] overflow-y-auto" align="start">
                    {subjectSuggestions.length > 0 ? (
                      <ul className="py-2">
                        {subjectSuggestions.map((sub) => (
                          <li 
                            key={sub} 
                            className="px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                            onClick={() => handleSubjectSelect(sub)}
                          >
                            {sub}
                          </li>
                        ))}
                      </ul>
                    ) : subject ? (
                      <div className="p-4 text-sm text-muted-foreground">
                        No subjects found
                      </div>
                    ) : location && (subjectsByLocation as Record<string, string[]>)[location] ? (
                      <ul className="py-2">
                        {(subjectsByLocation as Record<string, string[]>)[location].map((sub) => (
                          <li 
                            key={sub} 
                            className="px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                            onClick={() => handleSubjectSelect(sub)}
                          >
                            {sub}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul className="py-2">
                        {allSubjects.slice(0, 10).map((sub) => (
                          <li 
                            key={sub} 
                            className="px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                            onClick={() => handleSubjectSelect(sub)}
                          >
                            {sub}
                          </li>
                        ))}
                      </ul>
                    )}
                  </PopoverContent>
                </Popover>
                
                <div className="flex gap-3 mt-4">
                  <Button 
                    variant="outline"
                    className="flex-1 h-12 text-lg"
                    onClick={handlePreviousStep}
                  >
                    Back
                  </Button>
                  <Button 
                    className="flex-1 h-12 text-lg bg-gradient-to-r from-rose-500 to-blue-500 hover:from-rose-600 hover:to-blue-600"
                    onClick={handleSearch}
                    disabled={!subject}
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Find Courses
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
