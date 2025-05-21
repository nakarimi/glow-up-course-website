
import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, User, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";

// Mock course data
const coursesData = [
  {
    id: 1,
    title: "Management Training",
    category: "Business",
    location: "Online",
    duration: "2 days",
    price: 299,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "A comprehensive training program designed to help managers develop essential leadership skills for effectively guiding their teams. Learn modern management techniques, communication strategies, and performance optimization methods.",
    availableDates: ["2025-06-15", "2025-07-10", "2025-08-22"],
    instructor: "Dr. Sarah Johnson",
    maxAttendees: 20,
    topics: ["Leadership fundamentals", "Team building", "Performance management", "Conflict resolution", "Effective communication"],
  },
  {
    id: 2,
    title: "Web Development",
    category: "Technology",
    location: "London",
    duration: "5 days",
    price: 799,
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Master modern web development techniques with this intensive course covering frontend and backend development. Learn to build responsive websites using the latest frameworks and libraries.",
    availableDates: ["2025-06-20", "2025-07-15", "2025-08-10"],
    instructor: "Michael Chen",
    maxAttendees: 15,
    topics: ["HTML/CSS fundamentals", "JavaScript", "React.js", "Node.js", "RESTful APIs", "Database integration"],
  },
  {
    id: 3,
    title: "Data Analysis",
    category: "Technology",
    location: "Online",
    duration: "3 days",
    price: 499,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Learn how to analyze and visualize data using industry-standard tools and techniques. This course provides a foundation in data analysis methods essential for business intelligence.",
    availableDates: ["2025-06-05", "2025-07-22", "2025-08-15"],
    instructor: "Dr. Lisa Park",
    maxAttendees: 25,
    topics: ["Data cleaning", "Statistical analysis", "Data visualization", "Reporting", "Decision making with data"],
  },
  {
    id: 4,
    title: "Digital Marketing",
    category: "Marketing",
    location: "Manchester",
    duration: "2 days",
    price: 349,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Discover the latest digital marketing strategies to grow your online presence. This course covers social media marketing, SEO, content marketing, and paid advertising techniques.",
    availableDates: ["2025-06-12", "2025-07-18", "2025-08-25"],
    instructor: "James Wilson",
    maxAttendees: 20,
    topics: ["Social media strategy", "Search engine optimization", "Content marketing", "Email campaigns", "Analytics and metrics"],
  },
  {
    id: 5,
    title: "Leadership Skills",
    category: "Business",
    location: "Online",
    duration: "1 day",
    price: 199,
    image: "https://images.unsplash.com/photo-1541844053589-346841d0b34c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Develop essential leadership skills to inspire and motivate teams. This focused one-day workshop addresses key leadership competencies for professionals at all levels.",
    availableDates: ["2025-06-08", "2025-07-05", "2025-08-12"],
    instructor: "Emily Rodriguez",
    maxAttendees: 30,
    topics: ["Personal leadership", "Emotional intelligence", "Decision making", "Delegation skills", "Leading through change"],
  },
  {
    id: 6,
    title: "Project Management",
    category: "Business",
    location: "Birmingham",
    duration: "4 days",
    price: 599,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Learn effective project management methodologies to deliver projects on time and within budget. This comprehensive course covers all aspects of the project lifecycle.",
    availableDates: ["2025-06-25", "2025-07-20", "2025-08-18"],
    instructor: "Robert Taylor",
    maxAttendees: 18,
    topics: ["Project planning", "Resource management", "Risk assessment", "Agile methodologies", "Project documentation"],
  },
  {
    id: 7,
    title: "UX Design Fundamentals",
    category: "Design",
    location: "Online",
    duration: "3 days",
    price: 450,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Learn the principles of user experience design and apply them to create intuitive, user-friendly digital products and interfaces.",
    availableDates: ["2025-06-10", "2025-07-08", "2025-08-05"],
    instructor: "Sophie Chen",
    maxAttendees: 20,
    topics: ["User research", "Information architecture", "Wireframing", "Prototyping", "Usability testing"],
  },
  {
    id: 8,
    title: "Financial Planning",
    category: "Finance",
    location: "London",
    duration: "2 days",
    price: 399,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Develop a comprehensive understanding of financial planning principles and strategies for individuals and businesses.",
    availableDates: ["2025-06-18", "2025-07-23", "2025-08-27"],
    instructor: "David Morgan",
    maxAttendees: 15,
    topics: ["Investment strategies", "Retirement planning", "Tax optimization", "Estate planning", "Risk management"],
  },
  {
    id: 9,
    title: "Artificial Intelligence for Business",
    category: "Technology",
    location: "Online",
    duration: "4 days",
    price: 899,
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Explore the business applications of artificial intelligence and machine learning. Learn how AI can transform operations and drive innovation.",
    availableDates: ["2025-06-22", "2025-07-27", "2025-08-24"],
    instructor: "Dr. Alan Zhang",
    maxAttendees: 18,
    topics: ["Machine learning basics", "Data-driven decision making", "AI implementation", "Ethical considerations", "Future trends"],
  },
  {
    id: 10,
    title: "Customer Service Excellence",
    category: "Business",
    location: "Manchester",
    duration: "1 day",
    price: 249,
    image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Enhance your customer service skills and learn strategies for delivering exceptional customer experiences that drive loyalty and growth.",
    availableDates: ["2025-06-14", "2025-07-12", "2025-08-16"],
    instructor: "Laura Phillips",
    maxAttendees: 25,
    topics: ["Customer psychology", "Conflict resolution", "Active listening", "Service recovery", "Digital customer service"],
  },
  {
    id: 11,
    title: "Cybersecurity Fundamentals",
    category: "Technology",
    location: "London",
    duration: "3 days",
    price: 599,
    image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Learn essential cybersecurity concepts and best practices to protect organizations from digital threats and data breaches.",
    availableDates: ["2025-06-17", "2025-07-09", "2025-08-20"],
    instructor: "Mark Stevens",
    maxAttendees: 20,
    topics: ["Threat assessment", "Network security", "Data protection", "Incident response", "Security policies"],
  },
  {
    id: 12,
    title: "Content Marketing",
    category: "Marketing",
    location: "Online",
    duration: "2 days",
    price: 349,
    image: "https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Master the art of content creation and strategy to engage audiences, build brand awareness, and drive conversions.",
    availableDates: ["2025-06-19", "2025-07-25", "2025-08-30"],
    instructor: "Nicole Anderson",
    maxAttendees: 22,
    topics: ["Content strategy", "SEO writing", "Video content", "Social media content", "Content analytics"],
  },
];

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { addToCart } = useContext(CartContext);
  
  const preselectedDate = searchParams.get("date") || "";
  const [selectedDate, setSelectedDate] = useState<string>(preselectedDate);
  const [attendeesCount, setAttendeesCount] = useState<number>(1);
  
  // Find the course by ID from our mock data
  const course = coursesData.find(c => c.id === Number(courseId));
  
  useEffect(() => {
    if (preselectedDate) {
      setSelectedDate(preselectedDate);
    }
  }, [preselectedDate]);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Course not found</h2>
            <p className="mb-6">The course you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/courses")}>View All Courses</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleEnroll = () => {
    if (!selectedDate) {
      toast({
        title: "Please select a date",
        description: "Select a date before proceeding",
        variant: "destructive",
      });
      return;
    }
    
    navigate(`/checkout/${courseId}?date=${selectedDate}&attendees=${attendeesCount}`);
  };
  
  const handleAddToCart = () => {
    if (!selectedDate) {
      toast({
        title: "Please select a date",
        description: "Select a date before adding to cart",
        variant: "destructive",
      });
      return;
    }
    
    addToCart({
      id: Date.now().toString(),
      courseId: course.id,
      title: course.title,
      price: course.price,
      date: selectedDate,
      attendees: attendeesCount,
      image: course.image
    });
    
    toast({
      title: "Added to cart",
      description: `${course.title} has been added to your cart`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/course-list")}
            className="mb-8"
          >
            ← Back to Courses
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course image and details */}
            <div className="lg:col-span-2">
              <div className="rounded-xl overflow-hidden mb-6 h-[300px] md:h-[400px]">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  {course.category}
                </Badge>
                <Badge variant="outline" className="text-sm px-3 py-1">
                  {course.duration}
                </Badge>
              </div>
              
              <div className="prose max-w-none dark:prose-invert mb-8">
                <p className="text-lg">{course.description}</p>
                
                <h3 className="text-xl font-bold mt-8 mb-4">What You'll Learn</h3>
                <ul className="space-y-2">
                  {course.topics.map((topic, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 mt-1 text-green-500">✓</span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Enrollment card */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold mb-6">${course.price}</div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>{course.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>Instructor: {course.instructor}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>Max attendees: {course.maxAttendees}</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                      Select a date:
                    </label>
                    <select 
                      className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      required
                    >
                      <option value="">Choose a date</option>
                      {course.availableDates.map(date => (
                        <option key={date} value={date}>
                          {new Date(date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                      Number of attendees:
                    </label>
                    <select 
                      className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                      value={attendeesCount}
                      onChange={(e) => setAttendeesCount(Number(e.target.value))}
                      required
                    >
                      {Array.from({ length: course.maxAttendees }, (_, i) => i + 1).map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'attendee' : 'attendees'}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={handleEnroll}
                    >
                      Enroll Now
                    </Button>
                    
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="text-center text-sm text-muted-foreground">
                  Secure checkout • Money back guarantee
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;
