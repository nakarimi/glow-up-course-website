
import { useState, useEffect } from "react";
import CountUp from "react-countup";
import { AlertCircle, Award, BookOpen, MapPin, ThumbsUp, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Stat, getAllStats, fetchWithDelay } from "@/services/dataService";

const StatsSection = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      try {
        const data = await fetchWithDelay(getAllStats());
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("stats-section");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, JSX.Element> = {
      BookOpen: <BookOpen className="h-8 w-8" />,
      Award: <Award className="h-8 w-8" />,
      MapPin: <MapPin className="h-8 w-8" />,
      ThumbsUp: <ThumbsUp className="h-8 w-8" />,
      Users: <Users className="h-8 w-8" />,
    };

    return iconMap[iconName] || <AlertCircle className="h-8 w-8" />;
  };

  return (
    <section id="stats-section" className="py-16 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 text-gradient">Our Impact</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The numbers speak for themselves
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <Skeleton className="h-10 w-10 mx-auto mb-4 rounded-full" />
                <Skeleton className="h-8 w-1/3 mx-auto mb-2" />
                <Skeleton className="h-4 w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
                  {getIconComponent(stat.icon)}
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-1">
                  {isVisible && (
                    <CountUp 
                      end={stat.value} 
                      duration={2.5}
                      suffix={stat.suffix} 
                    />
                  )}
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default StatsSection;
