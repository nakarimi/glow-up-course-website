
import { Button } from "@/components/ui/button";
import { GlassCard, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

// Mock courses data
const courses = [
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
];

const FeaturedCourses = () => {
  const navigate = useNavigate();

  const handleViewCourse = (courseId: number) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <section id="featured-courses" className="py-16 px-4 bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold relative after:content-[''] after:block after:w-1/3 after:h-1 after:bg-primary after:rounded-full after:mt-2">
            Featured Courses
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <GlassCard 
              key={course.id} 
              className="h-full flex flex-col overflow-hidden hover:scale-[1.03] transition-all duration-300 group"
              style={{ 
                animationDelay: `${index * 100}ms`,
                transform: `translateY(${index % 2 === 0 ? '5px' : '-5px'})`
              }}
            >
              <div className="aspect-video overflow-hidden rounded-t-xl relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <Badge variant="outline" className="bg-white/20 backdrop-blur-sm text-white border-white/10">
                    {course.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="pt-6 flex-1">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                <div className="flex flex-col gap-1 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                    </span>
                    Location: {course.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                    </span>
                    Duration: {course.duration}
                  </div>
                  <div className="font-bold text-foreground text-lg mt-2">${course.price}</div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  variant="default" 
                  className="w-full rounded-md relative overflow-hidden group-hover:shadow-lg transition-all"
                  onClick={() => handleViewCourse(course.id)}
                >
                  <span className="relative z-10">View Course</span>
                  <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                </Button>
              </CardFooter>
            </GlassCard>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            onClick={() => navigate('/courses')}
          >
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
