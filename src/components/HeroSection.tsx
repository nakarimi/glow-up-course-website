
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

const categoriesByLocation = {
  "Online": [
    "Technology",
    "Business",
    "Marketing",
    "Design",
    "Finance"
  ],
  "London": [
    "Technology",
    "Business",
    "Marketing",
    "Finance"
  ],
  "Manchester": [
    "Marketing",
    "Technology",
    "Business"
  ],
  "Birmingham": [
    "Business",
    "Technology",
    "Marketing"
  ],
  "Leeds": [
    "Marketing",
    "Business"
  ],
  "Glasgow": [
    "Finance",
    "Technology",
    "Business"
  ],
  "Edinburgh": [
    "Technology",
    "Marketing",
    "Business"
  ],
  "Liverpool": [
    "Technology",
    "Marketing",
    "Business"
  ],
  "Bristol": [
    "Design",
    "Technology",
    "Marketing",
    "Business"
  ],
  "Sheffield": [
    "Business",
    "Technology",
    "Marketing"
  ]
};

const allCategories = Array.from(
  new Set(
    Object.values(categoriesByLocation).flatMap(categories => categories)
  )
).sort();

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [categorySuggestions, setCategorySuggestions] = useState<string[]>([]);
  const [showLocationPopover, setShowLocationPopover] = useState(false);
  const [showCategoryPopover, setShowCategoryPopover] = useState(false);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const categoryInputRef = useRef<HTMLInputElement>(null);

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

  // Filter category suggestions based on selected location and input
  useEffect(() => {
    if (category) {
      let availableCategories = location 
        ? (categoriesByLocation as Record<string, string[]>)[location] || allCategories
        : allCategories;
        
      const filtered = availableCategories.filter(cat => 
        cat.toLowerCase().includes(category.toLowerCase())
      );
      setCategorySuggestions(filtered);
    } else {
      setCategorySuggestions([]);
    }
  }, [category, location]);

  const handleLocationSelect = (loc: string) => {
    setLocation(loc);
    setShowLocationPopover(false);
    // Auto-advance to next step
    setCurrentStep(2);
    setTimeout(() => {
      categoryInputRef.current?.focus();
    }, 100);
  };

  const handleCategorySelect = (cat: string) => {
    setCategory(cat);
    setShowCategoryPopover(false);
  };

  const handleNextStep = () => {
    if (currentStep === 1 && location) {
      setCurrentStep(2);
      setTimeout(() => {
        categoryInputRef.current?.focus();
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
    navigate(`/courses?location=${encodeURIComponent(location)}&category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-primary/15 dark:from-primary/20 dark:via-primary/10 dark:to-primary/25 -z-10"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-5 -z-20"></div>

      <div className="container mx-auto px-4 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-primary">
            FORGE | MASTER | EXCEL
          </h1>
          <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-12 max-w-3xl mx-auto">
            Transform your career with industry-leading training programs. Discover expert-crafted training designed to forge professional excellence and unlock your potential.
          </p>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-2xl mx-auto border border-white/20">
            <div className="mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  currentStep >= 1 ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-gray-200 text-gray-500'
                }`}>
                  1
                </div>
                <div className={`h-1 w-16 mx-2 transition-all duration-300 rounded-full ${
                  currentStep >= 2 ? 'bg-primary' : 'bg-gray-200'
                }`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  currentStep >= 2 ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-gray-200 text-gray-500'
                }`}>
                  2
                </div>
              </div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Step {currentStep} of 2: {currentStep === 1 ? 'Choose Your Location' : 'Select Your Category'}
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
                        className="w-full h-12 text-lg focus:ring-2 focus:ring-primary/30 border-primary/20" 
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
                            className="px-4 py-3 hover:bg-primary/10 cursor-pointer transition-colors"
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
                            className="px-4 py-3 hover:bg-primary/10 cursor-pointer transition-colors"
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
                    className="w-full mt-4 h-12 text-lg bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={handleNextStep}
                  >
                    Continue to Category Selection
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                )}
              </div>

              {/* Step 2: Category */}
              <div className={`transition-all duration-500 ${currentStep === 2 ? 'opacity-100 transform-none' : 'opacity-0 transform scale-95 pointer-events-none absolute'}`}>
                {/* Show selected location */}
                {location && (
                  <div className="mb-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-sm text-primary font-medium">
                      Training Location: <span className="font-semibold">{location}</span>
                    </p>
                  </div>
                )}
                
                <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  What category interests you?
                </label>
                <Popover open={showCategoryPopover} onOpenChange={setShowCategoryPopover}>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <Input 
                        id="category" 
                        ref={categoryInputRef}
                        placeholder="e.g. Technology, Business, Marketing..." 
                        className="w-full h-12 text-lg focus:ring-2 focus:ring-primary/30 border-primary/20" 
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                          if (e.target.value) {
                            setShowCategoryPopover(true);
                          }
                        }}
                        onFocus={() => {
                          if (category) {
                            setShowCategoryPopover(true);
                          }
                        }}
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 max-h-[200px] overflow-y-auto" align="start">
                    {categorySuggestions.length > 0 ? (
                      <ul className="py-2">
                        {categorySuggestions.map((cat) => (
                          <li 
                            key={cat} 
                            className="px-4 py-3 hover:bg-primary/10 cursor-pointer transition-colors"
                            onClick={() => handleCategorySelect(cat)}
                          >
                            {cat}
                          </li>
                        ))}
                      </ul>
                    ) : category ? (
                      <div className="p-4 text-sm text-muted-foreground">
                        No categories found
                      </div>
                    ) : location && (categoriesByLocation as Record<string, string[]>)[location] ? (
                      <ul className="py-2">
                        {(categoriesByLocation as Record<string, string[]>)[location].map((cat) => (
                          <li 
                            key={cat} 
                            className="px-4 py-3 hover:bg-primary/10 cursor-pointer transition-colors"
                            onClick={() => handleCategorySelect(cat)}
                          >
                            {cat}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul className="py-2">
                        {allCategories.slice(0, 10).map((cat) => (
                          <li 
                            key={cat} 
                            className="px-4 py-3 hover:bg-primary/10 cursor-pointer transition-colors"
                            onClick={() => handleCategorySelect(cat)}
                          >
                            {cat}
                          </li>
                        ))}
                      </ul>
                    )}
                  </PopoverContent>
                </Popover>
                
                <div className="flex gap-3 mt-4">
                  <Button 
                    variant="outline"
                    className="flex-1 h-12 text-lg border-primary/30 hover:bg-primary/5 text-primary"
                    onClick={handlePreviousStep}
                  >
                    Back
                  </Button>
                  <Button 
                    className="flex-1 h-12 text-lg bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={handleSearch}
                    disabled={!category}
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Find Training
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
