
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { Category, getAllCategories, fetchWithDelay } from "@/services/dataService";

const CategoryGrid = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        // Get only the first 3 categories for this component
        const allCategories = await fetchWithDelay(getAllCategories());
        setCategories(allCategories.slice(0, 3));
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);
  
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
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md h-full">
                <Skeleton className="h-48 w-full" />
                <div className="p-6">
                  <Skeleton className="h-7 w-1/3 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex items-center justify-between mt-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-9 w-32" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
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
                      alt={category.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>
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
        )}
        
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
