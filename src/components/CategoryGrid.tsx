
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: 1,
    title: "Business & Management",
    description: "Leadership, project management, and business strategy courses",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    count: 24,
    slug: "business-management"
  },
  {
    id: 2,
    title: "Technology",
    description: "Web development, data analysis, and IT security training",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    count: 16,
    slug: "technology"
  },
  {
    id: 3,
    title: "Health & Safety",
    description: "First aid, workplace safety, and compliance training",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    count: 12,
    slug: "health-safety"
  }
];

const CategoryGrid = () => {
  const navigate = useNavigate();
  
  const handleCategoryClick = (slug: string) => {
    navigate(`/courses?category=${slug}`);
  };
  
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-800/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Popular Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our most popular training categories to find the perfect course for your needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card key={category.id} className="overflow-hidden border-none shadow-lg hover-scale">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">{category.title}</h3>
                  <p className="text-sm text-white/80">{category.count} Courses</p>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleCategoryClick(category.slug)}
                >
                  Browse Courses
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
