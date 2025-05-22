
import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { Category, getAllCategories, fetchWithDelay } from "@/services/dataService";

const CourseCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        // Simulate API fetch
        const data = await fetchWithDelay(getAllCategories());
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Map category names to emojis
  const getCategoryIcon = (name: string): string => {
    const iconMap: Record<string, string> = {
      "Business Management": "📊",
      "Technology": "💻",
      "Marketing": "📱",
      "Health & Safety": "🛡️",
      "Professional Development": "🚀",
      "Compliance": "📑"
    };
    
    return iconMap[name] || "📚";
  };
  
  // Map category names to gradient colors
  const getCategoryColor = (name: string): string => {
    const colorMap: Record<string, string> = {
      "Business Management": "from-blue-500/20 to-blue-600/20",
      "Technology": "from-purple-500/20 to-purple-600/20",
      "Marketing": "from-green-500/20 to-green-600/20",
      "Health & Safety": "from-red-500/20 to-red-600/20",
      "Professional Development": "from-yellow-500/20 to-yellow-600/20",
      "Compliance": "from-sky-500/20 to-sky-600/20"
    };
    
    return colorMap[name] || "from-gray-500/20 to-gray-600/20";
  };
  
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-gradient text-3xl font-bold mb-2">Course Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our comprehensive range of training courses across various disciplines
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="p-6 rounded-lg">
                <div className="flex items-center">
                  <Skeleton className="w-16 h-16 rounded-full mr-4" />
                  <div>
                    <Skeleton className="h-6 w-40 mb-2" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <GlassCard 
                key={category.id} 
                className={`hover-scale flex items-center p-6 cursor-pointer group animate-fade-in bg-gradient-to-br ${getCategoryColor(category.name)}`}
                style={{ 
                  animationDelay: `${index * 150}ms`,
                }}
                onClick={() => navigate(`/courses?category=${category.slug}`)}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/70 dark:bg-slate-800/70 mr-4 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <span className="text-3xl group-hover:animate-bounce-subtle">
                    {getCategoryIcon(category.name)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{category.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <span className="inline-flex w-2 h-2 rounded-full bg-primary"></span>
                    {category.count} courses
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseCategories;
