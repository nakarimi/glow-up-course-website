
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: 1,
    title: "Business",
    description: "Leadership, Management, and Business Skills",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    slug: "business",
    count: 15
  },
  {
    id: 2,
    title: "Technology",
    description: "Development, IT and Digital Skills",
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    slug: "technology",
    count: 12
  },
  {
    id: 3,
    title: "Marketing",
    description: "Digital Marketing, SEO and Social Media",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    slug: "marketing",
    count: 8
  }
];

const CategoryGrid = () => {
  const navigate = useNavigate();
  
  const handleCategoryClick = (categorySlug: string) => {
    navigate(`/courses?category=${categorySlug}`);
  };
  
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Find Your Course by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of professional courses grouped by category to find the perfect training for your needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="group block cursor-pointer"
              onClick={() => handleCategoryClick(category.slug)}
            >
              <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-lg h-full flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">{category.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm text-muted-foreground">{category.count} courses</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="group-hover:text-primary group-hover:translate-x-1 transition-all gap-1"
                    >
                      Browse courses
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link to="/courses">View All Courses</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
