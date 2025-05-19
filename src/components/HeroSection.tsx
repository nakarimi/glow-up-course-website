
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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
    setTimeout(() => {
      subjectInputRef.current?.focus();
    }, 100);
  };

  const handleSubjectSelect = (sub: string) => {
    setSubject(sub);
    setShowSubjectPopover(false);
  };

  const handleSearch = () => {
    navigate(`/courses?location=${encodeURIComponent(location)}&subject=${encodeURIComponent(subject)}`);
  };

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
                <Popover open={showLocationPopover} onOpenChange={setShowLocationPopover}>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <Input 
                        id="location" 
                        ref={locationInputRef}
                        placeholder="e.g. Online" 
                        className="w-full" 
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
                            className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
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
                            className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                            onClick={() => handleLocationSelect(loc)}
                          >
                            {loc}
                          </li>
                        ))}
                      </ul>
                    )}
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Subject
                </label>
                <Popover open={showSubjectPopover} onOpenChange={setShowSubjectPopover}>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <Input 
                        id="subject" 
                        ref={subjectInputRef}
                        placeholder="e.g. My Course/Training" 
                        className="w-full" 
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
                            className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
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
                            className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
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
                            className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                            onClick={() => handleSubjectSelect(sub)}
                          >
                            {sub}
                          </li>
                        ))}
                      </ul>
                    )}
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <Button 
              className="w-full md:w-auto"
              onClick={handleSearch}
            >
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
