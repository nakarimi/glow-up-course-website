
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users } from "lucide-react";
import { Course, getFeaturedCourses, fetchWithDelay } from "@/services/dataService";

const FeaturedCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      try {
        // Simulate API fetch
        const data = await fetchWithDelay(getFeaturedCourses());
        setCourses(data);
      } catch (error) {
        console.error("Error fetching featured courses:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const handleCourseClick = (courseSlug: string) => {
    navigate(`/course/${courseSlug}`);
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gradient">Featured Courses</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our most popular professional development and training courses
          </p>
        </div>

        {loading ? (
          // Loading skeletons
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-7 w-3/4 mb-2" />
                  <Skeleton className="h-5 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full my-2" />
                  <Skeleton className="h-4 w-5/6 my-2" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Card 
                key={course.id} 
                className="overflow-hidden hover-scale cursor-pointer group"
                onClick={() => handleCourseClick(course.slug)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary/90 hover:bg-primary">{course.level}</Badge>
                  </div>
                </div>
                <CardHeader>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-4">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{course.reviews} reviews</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground line-clamp-2">{course.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center border-t pt-4">
                  <div>
                    {course.discount ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold">£{course.discount}</span>
                        <span className="text-sm line-through text-muted-foreground">£{course.price}</span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold">£{course.price}</span>
                    )}
                  </div>
                  <Button variant="gradient" size="sm">View Course</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" onClick={() => navigate('/courses')}>
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
