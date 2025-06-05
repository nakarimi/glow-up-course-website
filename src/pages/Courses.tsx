
import { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, Grid, List, Calendar, ArrowUpDown, CalendarIcon } from "lucide-react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Extended course data
const coursesData = [
  {
    id: 1,
    title: "Management Training",
    category: "Business",
    categoryColor: "#3b82f6", // blue-500
    location: "Online",
    duration: "2 days",
    price: 299,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    availableDates: ["2025-06-15", "2025-07-10", "2025-08-22"],
    description: "This comprehensive management training course will help you develop essential leadership skills to effectively manage teams and drive results. Perfect for new and aspiring managers.",
    accreditedBy: "CMI"
  },
  {
    id: 2,
    title: "Web Development",
    category: "Technology",
    categoryColor: "#10b981", // green-500
    location: "London",
    duration: "5 days",
    price: 799,
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    availableDates: ["2025-06-20", "2025-07-15", "2025-08-10"],
    description: "Learn modern web development techniques and frameworks in this hands-on course. Covers HTML, CSS, JavaScript, and popular frameworks like React.",
    accreditedBy: "BCS"
  },
  {
    id: 3,
    title: "Data Analysis",
    category: "Technology",
    categoryColor: "#10b981", // green-500
    location: "Online",
    duration: "3 days",
    price: 499,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    availableDates: ["2025-06-05", "2025-07-22", "2025-08-15"],
    description: "Master data analysis tools and techniques for business insights. Learn how to collect, process, and analyze data to make informed business decisions.",
    accreditedBy: "DataCert"
  },
  {
    id: 4,
    title: "Digital Marketing",
    category: "Marketing",
    categoryColor: "#f97316", // orange-500
    location: "Manchester",
    duration: "2 days",
    price: 349,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    availableDates: ["2025-06-12", "2025-07-18", "2025-08-25"],
    description: "Explore effective digital marketing strategies and tools. This course covers SEO, social media marketing, content creation, and analytics.",
    accreditedBy: "CIM"
  },
  {
    id: 5,
    title: "Leadership Skills",
    category: "Business",
    categoryColor: "#3b82f6", // blue-500
    location: "Online",
    duration: "1 day",
    price: 199,
    image: "https://images.unsplash.com/photo-1541844053589-346841d0b34c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    availableDates: ["2025-06-08", "2025-07-05", "2025-08-12"],
    description: "Develop essential leadership skills for motivating teams and driving performance. Ideal for team leaders and managers at all levels.",
    accreditedBy: "ILM"
  },
  {
    id: 6,
    title: "Project Management",
    category: "Business",
    categoryColor: "#3b82f6", // blue-500
    location: "Birmingham",
    duration: "4 days",
    price: 599,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    availableDates: ["2025-06-25", "2025-07-20", "2025-08-18"],
    description: "Master project management methodologies and best practices. Learn to plan, execute, and deliver successful projects on time and within budget.",
    accreditedBy: "PMI"
  },
  {
    id: 7,
    title: "UX Design Fundamentals",
    category: "Design",
    categoryColor: "#ec4899", // pink-500
    location: "Online",
    duration: "3 days",
    price: 450,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    availableDates: ["2025-06-10", "2025-07-08", "2025-08-05"],
    description: "Learn the principles of user experience design and apply them to create intuitive, user-friendly digital products and interfaces.",
    accreditedBy: "UXA"
  },
  {
    id: 8,
    title: "Financial Planning",
    category: "Finance",
    categoryColor: "#eab308", // yellow-500
    location: "London",
    duration: "2 days",
    price: 399,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    availableDates: ["2025-06-18", "2025-07-23", "2025-08-27"],
    description: "Develop a comprehensive understanding of financial planning principles and strategies for individuals and businesses.",
    accreditedBy: "CFA"
  },
  {
    id: 9,
    title: "Artificial Intelligence for Business",
    category: "Technology",
    categoryColor: "#10b981", // green-500
    location: "Online",
    duration: "4 days",
    price: 899,
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    availableDates: ["2025-06-22", "2025-07-27", "2025-08-24"],
    description: "Explore the business applications of artificial intelligence and machine learning. Learn how AI can transform operations and drive innovation.",
    accreditedBy: "AIC"
  },
  {
    id: 10,
    title: "Customer Service Excellence",
    category: "Business",
    categoryColor: "#3b82f6", // blue-500
    location: "Manchester",
    duration: "1 day",
    price: 249,
    image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    availableDates: ["2025-06-14", "2025-07-12", "2025-08-16"],
    description: "Enhance your customer service skills and learn strategies for delivering exceptional customer experiences that drive loyalty and growth.",
    accreditedBy: "CSA"
  },
  {
    id: 11,
    title: "Cybersecurity Fundamentals",
    category: "Technology",
    categoryColor: "#10b981", // green-500
    location: "London",
    duration: "3 days",
    price: 599,
    image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    availableDates: ["2025-06-17", "2025-07-09", "2025-08-20"],
    description: "Learn essential cybersecurity concepts and best practices to protect organizations from digital threats and data breaches.",
    accreditedBy: "ISC"
  },
  {
    id: 12,
    title: "Content Marketing",
    category: "Marketing",
    categoryColor: "#f97316", // orange-500
    location: "Online",
    duration: "2 days",
    price: 349,
    image: "https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    availableDates: ["2025-06-19", "2025-07-25", "2025-08-30"],
    description: "Master the art of content creation and strategy to engage audiences, build brand awareness, and drive conversions.",
    accreditedBy: "CIM"
  },
];

// Get all available dates from courses
const getAllAvailableDates = () => {
  const dates = coursesData.flatMap(course => course.availableDates);
  return [...new Set(dates)].sort();
};

const locationOptions = ["Online", "London", "Manchester", "Birmingham"];
const categoryOptions = ["Business", "Technology", "Marketing", "Design", "Finance"];
const accreditedByOptions = ["CMI", "BCS", "CIM", "ILM", "PMI", "UXA", "CFA", "AIC", "CSA", "ISC", "DataCert"];
const availableDatesOptions = getAllAvailableDates();

// Items per page for pagination
const ITEMS_PER_PAGE = 6;

const Courses = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAccreditations, setSelectedAccreditations] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedCourseDates, setSelectedCourseDates] = useState<{[key: number]: string}>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  
  // Collapsible state
  const [locationOpen, setLocationOpen] = useState(true);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [accreditationOpen, setAccreditationOpen] = useState(true);
  const [dateOpen, setDateOpen] = useState(true);
  
  // Initialize filters from URL params
  useEffect(() => {
    const locationParam = searchParams.get("location");
    const categoryParam = searchParams.get("category");
    const subjectParam = searchParams.get("subject");
    const dateParam = searchParams.get("date");
    
    if (locationParam) {
      setSelectedLocations([locationParam]);
    }
    
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
    
    if (subjectParam) {
      setSearchTerm(subjectParam);
    }
    
    if (dateParam) {
      setSelectedDate(dateParam);
    }
  }, [searchParams]);
  
  const handleLocationChange = (location: string) => {
    setSelectedLocations(prev => 
      prev.includes(location) 
        ? prev.filter(loc => loc !== location)
        : [...prev, location]
    );
    setCurrentPage(1);
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };
  
  const handleAccreditationChange = (accreditation: string) => {
    setSelectedAccreditations(prev => 
      prev.includes(accreditation) 
        ? prev.filter(acc => acc !== accreditation)
        : [...prev, accreditation]
    );
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Sort and filter courses
  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(course.location);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(course.category);
    const matchesAccreditation = selectedAccreditations.length === 0 || selectedAccreditations.includes(course.accreditedBy);
    const matchesDate = !selectedDate || course.availableDates.includes(selectedDate);
    return matchesSearch && matchesLocation && matchesCategory && matchesAccreditation && matchesDate;
  }).sort((a, b) => {
    // Sort by title
    if (sortOrder === "asc") {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const currentCourses = filteredCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDateChange = (courseId: number, date: string) => {
    setSelectedCourseDates(prev => ({
      ...prev,
      [courseId]: date
    }));
  };
  
  const handleViewCourse = (courseId: number) => {
    const selectedDateForCourse = selectedCourseDates[courseId] || "";
    navigate(`/course/${courseId}${selectedDateForCourse ? `?date=${selectedDateForCourse}` : ''}`);
  };
  
  const handleCardClick = (courseId: number) => {
    navigate(`/course/${courseId}`);
  };
  
  const handleSortToggle = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Banner image */}
        <div className="h-64 md:h-80 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
            alt="Training Courses Banner" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Page title */}
        <div className="bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Courses</h1>
              <p className="text-muted-foreground text-lg">
                Browse our extensive selection of professional training courses
              </p>
            </div>
          </div>
        </div>
        
        {/* Courses listing */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters sidebar */}
              <div className="lg:w-1/4">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 sticky top-24">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                  </h2>
                  
                  <div className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search courses..." 
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setCurrentPage(1);
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Available Dates Filter */}
                    <Collapsible open={dateOpen} onOpenChange={setDateOpen}>
                      <div className="border-b pb-2">
                        <CollapsibleTrigger className="flex w-full justify-between items-center">
                          <h3 className="font-medium">Available Dates</h3>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <span className="sr-only">Toggle</span>
                            <CalendarIcon className="h-4 w-4" />
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent className="pt-2">
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <select 
                            className="w-full pl-10 p-2 border rounded-md bg-background dark:bg-slate-800 dark:border-slate-700"
                            value={selectedDate}
                            onChange={(e) => {
                              setSelectedDate(e.target.value);
                              setCurrentPage(1);
                            }}
                          >
                            <option value="">All Dates</option>
                            {availableDatesOptions.map(date => (
                              <option key={date} value={date}>
                                {formatDate(date)}
                              </option>
                            ))}
                          </select>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                    
                    {/* Location Filter */}
                    <Collapsible open={locationOpen} onOpenChange={setLocationOpen}>
                      <div className="border-b pb-2">
                        <CollapsibleTrigger className="flex w-full justify-between items-center">
                          <h3 className="font-medium">Location</h3>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <span className="sr-only">Toggle</span>
                            {locationOpen ? "-" : "+"}
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent className="pt-2">
                        <div className="space-y-2">
                          {locationOptions.map(location => (
                            <div key={location} className="flex items-center">
                              <Checkbox 
                                id={`location-${location}`} 
                                checked={selectedLocations.includes(location)}
                                onCheckedChange={() => handleLocationChange(location)}
                              />
                              <label 
                                htmlFor={`location-${location}`}
                                className="ml-2 text-sm cursor-pointer"
                              >
                                {location}
                              </label>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                    
                    {/* Category Filter */}
                    <Collapsible open={categoryOpen} onOpenChange={setCategoryOpen}>
                      <div className="border-b pb-2">
                        <CollapsibleTrigger className="flex w-full justify-between items-center">
                          <h3 className="font-medium">Category</h3>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <span className="sr-only">Toggle</span>
                            {categoryOpen ? "-" : "+"}
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent className="pt-2">
                        <div className="space-y-2">
                          {categoryOptions.map(category => (
                            <div key={category} className="flex items-center">
                              <Checkbox 
                                id={`category-${category}`} 
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={() => handleCategoryChange(category)}
                              />
                              <label 
                                htmlFor={`category-${category}`}
                                className="ml-2 text-sm cursor-pointer"
                              >
                                {category}
                              </label>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                    
                    {/* Accredited By Filter */}
                    <Collapsible open={accreditationOpen} onOpenChange={setAccreditationOpen}>
                      <div className="border-b pb-2">
                        <CollapsibleTrigger className="flex w-full justify-between items-center">
                          <h3 className="font-medium">Accredited By</h3>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <span className="sr-only">Toggle</span>
                            {accreditationOpen ? "-" : "+"}
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent className="pt-2">
                        <div className="space-y-2">
                          {accreditedByOptions.map(accreditation => (
                            <div key={accreditation} className="flex items-center">
                              <Checkbox 
                                id={`accreditation-${accreditation}`} 
                                checked={selectedAccreditations.includes(accreditation)}
                                onCheckedChange={() => handleAccreditationChange(accreditation)}
                              />
                              <label 
                                htmlFor={`accreditation-${accreditation}`}
                                className="ml-2 text-sm cursor-pointer"
                              >
                                {accreditation}
                              </label>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </div>
              </div>
              
              {/* Courses grid */}
              <div className="lg:w-3/4">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <p className="text-muted-foreground">
                      Showing {filteredCourses.length > 0 ? 
                        `${(currentPage - 1) * ITEMS_PER_PAGE + 1}-${Math.min(currentPage * ITEMS_PER_PAGE, filteredCourses.length)} of ${filteredCourses.length}`
                        : "0"} courses
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSortToggle}
                      className="flex items-center gap-1"
                    >
                      Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
                      <ArrowUpDown className={`h-4 w-4 ${sortOrder === "desc" ? "rotate-180" : ""} transition-transform`} />
                    </Button>
                    <div className="flex items-center ml-4">
                      <span className="text-sm text-muted-foreground mr-2">View:</span>
                      <Button 
                        variant={view === "grid" ? "default" : "outline"} 
                        size="icon"
                        onClick={() => setView("grid")}
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant={view === "list" ? "default" : "outline"} 
                        size="icon"
                        onClick={() => setView("list")}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {currentCourses.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No courses matching your filters.</p>
                  </div>
                ) : view === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentCourses.map(course => (
                      <Card 
                        key={course.id} 
                        className="overflow-hidden hover-scale border-l-4"
                        style={{ borderLeftColor: course.categoryColor }}
                      >
                        <div className="h-48 overflow-hidden cursor-pointer" onClick={() => handleCardClick(course.id)}>
                          <img 
                            src={course.image} 
                            alt={course.title} 
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                          />
                        </div>
                        <div className="p-4 flex flex-col h-[calc(100%-12rem)]">
                          <div className="flex justify-end mb-2">
                            <div className="relative w-full">
                              <select
                                className="w-full p-2 text-sm border rounded-md dark:bg-slate-800 dark:border-slate-700"
                                value={selectedCourseDates[course.id] || ""}
                                onChange={(e) => handleDateChange(course.id, e.target.value)}
                              >
                                <option value="">Choose a date</option>
                                {course.availableDates.map(date => (
                                  <option key={date} value={date}>
                                    {formatDate(date)}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          
                          <div className="mb-2">
                            <div className="flex items-center justify-between">
                              <h3 
                                className="text-xl font-bold cursor-pointer hover:text-primary"
                                onClick={() => handleCardClick(course.id)}
                              >
                                {course.title}
                              </h3>
                              <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-800 dark:text-blue-200">
                                {course.category}
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              <p>Next date: {formatDate(course.availableDates[0])}</p>
                              <p>Location: {course.location} • Duration: {course.duration}</p>
                            </div>
                          </div>
                          
                          <div className="mt-2 flex-grow">
                            <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                          </div>
                          
                          <div className="mt-4">
                            <Button 
                              className="w-full"
                              onClick={() => handleViewCourse(course.id)}
                            >
                              View Course
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentCourses.map(course => (
                      <div 
                        key={course.id} 
                        className="flex flex-col md:flex-row gap-4 bg-white dark:bg-slate-900 p-0 rounded-lg border border-slate-200 dark:border-slate-800 hover-scale overflow-hidden border-l-4"
                        style={{ borderLeftColor: course.categoryColor }}
                      >
                        <div 
                          className="md:w-1/4 h-40 md:h-auto overflow-hidden cursor-pointer"
                          onClick={() => handleCardClick(course.id)}
                        >
                          <img 
                            src={course.image} 
                            alt={course.title} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="md:w-3/4 flex flex-col justify-between p-4">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 
                                  className="text-xl font-bold cursor-pointer hover:text-primary"
                                  onClick={() => handleCardClick(course.id)}
                                >
                                  {course.title}
                                </h3>
                                <div className="text-sm text-muted-foreground mt-1">
                                  <p>Next date: {formatDate(course.availableDates[0])}</p>
                                  <p>Location: {course.location} • Duration: {course.duration}</p>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-800 dark:text-blue-200">
                                  {course.category}
                                </span>
                                <div className="w-48">
                                  <select
                                    className="w-full p-2 text-sm border rounded-md dark:bg-slate-800 dark:border-slate-700"
                                    value={selectedCourseDates[course.id] || ""}
                                    onChange={(e) => handleDateChange(course.id, e.target.value)}
                                  >
                                    <option value="">Choose a date</option>
                                    {course.availableDates.map(date => (
                                      <option key={date} value={date}>
                                        {formatDate(date)}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                            
                            <div className="my-2">
                              <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-end w-full mt-4">
                            <Button onClick={() => handleViewCourse(course.id)}>
                              View Course
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination className="mt-8">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                        // Show first page, last page, and pages around current page
                        if (
                          page === 1 || 
                          page === totalPages || 
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationLink 
                                isActive={currentPage === page}
                                onClick={() => setCurrentPage(page)}
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }
                        
                        // Show ellipsis
                        if (page === currentPage - 2 || page === currentPage + 2) {
                          return <PaginationEllipsis key={`ellipsis-${page}`} />;
                        }
                        
                        return null;
                      })}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
