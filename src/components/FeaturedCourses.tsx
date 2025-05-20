
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Management Training",
    category: "Business",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Develop essential management skills for leading teams effectively."
  },
  {
    id: 2,
    title: "Web Development",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Learn modern web development techniques and frameworks."
  },
  {
    id: 3,
    title: "Data Analysis",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Master data analysis tools and techniques for business insights."
  },
  {
    id: 4,
    title: "Digital Marketing",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Explore effective digital marketing strategies and tools."
  }
];

const CourseCard = ({ course, onViewCourse }: { course: typeof courses[0], onViewCourse: (id: number) => void }) => (
  <Card className="hover-scale h-full flex flex-col">
    <div className="h-48 overflow-hidden rounded-t-md">
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
    <CardContent className="flex-grow">
      <p className="text-sm text-muted-foreground">{course.description}</p>
    </CardContent>
    <CardFooter>
      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => onViewCourse(course.id)}
      >
        View Course
      </Button>
    </CardFooter>
  </Card>
);

const FeaturedCourses = () => {
  const navigate = useNavigate();
  const [visibleCourses, setVisibleCourses] = useState(courses);

  const handleViewCourse = (courseId: number) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Courses</h2>
            <p className="text-muted-foreground">Explore our most popular training programs</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleCourses.map(course => (
            <CourseCard key={course.id} course={course} onViewCourse={handleViewCourse} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Button 
            variant="default"
            onClick={() => navigate("/courses")}
          >
            Browse All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
