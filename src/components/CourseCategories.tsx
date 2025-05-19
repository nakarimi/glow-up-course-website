
import { Card } from "@/components/ui/card";

const categories = [
  {
    id: 1,
    name: "Business Management",
    count: 12,
    icon: "📊"
  },
  {
    id: 2,
    name: "Technology",
    count: 18,
    icon: "💻"
  },
  {
    id: 3,
    name: "Marketing",
    count: 9,
    icon: "📱"
  },
  {
    id: 4,
    name: "Health & Safety",
    count: 7,
    icon: "🛡️"
  },
  {
    id: 5,
    name: "Professional Development",
    count: 15,
    icon: "🚀"
  },
  {
    id: 6,
    name: "Compliance",
    count: 6,
    icon: "📑"
  }
];

const CourseCategories = () => {
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Course Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our comprehensive range of training courses across various disciplines
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map(category => (
            <Card 
              key={category.id} 
              className="hover-scale flex items-center p-6 cursor-pointer group"
            >
              <span className="text-3xl mr-4 group-hover:scale-125 transition-transform">
                {category.icon}
              </span>
              <div>
                <h3 className="font-medium text-lg">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} courses</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseCategories;
