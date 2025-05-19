
import { useEffect, useState, useRef } from "react";

const stats = [
  { title: "Teachers", value: 20 },
  { title: "Rooms", value: 12 },
  { title: "Courses", value: 60 },
  { title: "Subjects", value: 16 },
  { title: "Years", value: 30 },
];

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const intervals = stats.map((stat, index) => {
      return setInterval(() => {
        setCounts(prevCounts => 
          prevCounts.map((count, i) => {
            if (i !== index) return count;
            const nextCount = count + 1;
            return nextCount >= stat.value ? stat.value : nextCount;
          })
        );
      }, 1500 / stat.value);
    });

    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [isVisible]);

  return (
    <div 
      ref={sectionRef}
      className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 py-16"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Book. Train. Learn.</h2>
          <p className="text-blue-200">Take your skills to the next level with our professional training programs</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {stats.map((stat, index) => (
            <div key={stat.title} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {counts[index]}
              </div>
              <div className="text-blue-100 font-medium">{stat.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
