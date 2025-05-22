
import { GlassCard } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Business Management",
    count: 12,
    icon: "📊",
    color: "from-blue-500/20 to-blue-600/20"
  },
  {
    id: 2,
    name: "Technology",
    count: 18,
    icon: "💻",
    color: "from-purple-500/20 to-purple-600/20"
  },
  {
    id: 3,
    name: "Marketing",
    count: 9,
    icon: "📱",
    color: "from-green-500/20 to-green-600/20"
  },
  {
    id: 4,
    name: "Health & Safety",
    count: 7,
    icon: "🛡️",
    color: "from-red-500/20 to-red-600/20"
  },
  {
    id: 5,
    name: "Professional Development",
    count: 15,
    icon: "🚀",
    color: "from-yellow-500/20 to-yellow-600/20"
  },
  {
    id: 6,
    name: "Compliance",
    count: 6,
    icon: "📑",
    color: "from-sky-500/20 to-sky-600/20"
  }
];

const CourseCategories = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-gradient text-3xl font-bold mb-2">Course Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our comprehensive range of training courses across various disciplines
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <GlassCard 
              key={category.id} 
              className={`hover-scale flex items-center p-6 cursor-pointer group animate-fade-in bg-gradient-to-br ${category.color}`}
              style={{ 
                animationDelay: `${index * 150}ms`,
              }}
              onClick={() => navigate(`/courses?category=${category.name}`)}
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/70 dark:bg-slate-800/70 mr-4 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 shadow-md">
                <span className="text-3xl group-hover:animate-bounce-subtle">
                  {category.icon}
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
      </div>
    </section>
  );
};

export default CourseCategories;
