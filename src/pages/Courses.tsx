
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, Grid, List } from "lucide-react";

const coursesData = [
  {
    id: 1,
    title: "Management Training",
    category: "Business",
    location: "Online",
    duration: "2 days",
    price: 299,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Web Development",
    category: "Technology",
    location: "London",
    duration: "5 days",
    price: 799,
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Data Analysis",
    category: "Technology",
    location: "Online",
    duration: "3 days",
    price: 499,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Digital Marketing",
    category: "Marketing",
    location: "Manchester",
    duration: "2 days",
    price: 349,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Leadership Skills",
    category: "Business",
    location: "Online",
    duration: "1 day",
    price: 199,
    image: "https://images.unsplash.com/photo-1541844053589-346841d0b34c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Project Management",
    category: "Business",
    location: "Birmingham",
    duration: "4 days",
    price: 599,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
];

const locationOptions = ["Online", "London", "Manchester", "Birmingham"];
const categoryOptions = ["Business", "Technology", "Marketing", "Health & Safety"];

const Courses = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const handleLocationChange = (location: string) => {
    setSelectedLocations(prev => 
      prev.includes(location) 
        ? prev.filter(loc => loc !== location)
        : [...prev, location]
    );
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };
  
  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(course.location);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(course.category);
    return matchesSearch && matchesLocation && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero section */}
        <div className="bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 py-20">
          <div className="container mx-auto px-4 pt-20">
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
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Location</h3>
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
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Category</h3>
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
                  </div>
                </div>
              </div>
              
              {/* Courses grid */}
              <div className="lg:w-3/4">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <p className="text-muted-foreground">
                      Showing {filteredCourses.length} of {coursesData.length} courses
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
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
                
                {filteredCourses.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No courses matching your filters.</p>
                  </div>
                ) : view === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map(course => (
                      <Card key={course.id} className="overflow-hidden hover-scale">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={course.image} 
                            alt={course.title} 
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                          />
                        </div>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-xl">{course.title}</CardTitle>
                            <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-800 dark:text-blue-200">
                              {course.category}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-col text-sm text-muted-foreground">
                            <p>Location: {course.location}</p>
                            <p>Duration: {course.duration}</p>
                            <p className="font-medium text-foreground mt-2">${course.price}</p>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">View Course</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredCourses.map(course => (
                      <div 
                        key={course.id} 
                        className="flex flex-col md:flex-row gap-4 bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover-scale"
                      >
                        <div className="md:w-1/4 h-40 md:h-auto overflow-hidden rounded-md">
                          <img 
                            src={course.image} 
                            alt={course.title} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="md:w-3/4 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-xl font-bold">{course.title}</h3>
                              <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-800 dark:text-blue-200">
                                {course.category}
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground mb-4">
                              <p>Location: {course.location}</p>
                              <p>Duration: {course.duration}</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="font-medium">${course.price}</p>
                            <Button>View Course</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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
