
import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Quote } from "lucide-react";
import { Testimonial, getAllTestimonials, fetchWithDelay } from "@/services/dataService";

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      setLoading(true);
      try {
        const data = await fetchWithDelay(getAllTestimonials());
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 text-gradient">What Our Students Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover how our courses have helped professionals advance their careers
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="w-full max-w-3xl">
              <Skeleton className="h-48 w-full rounded-lg" />
            </div>
          </div>
        ) : (
          <Carousel 
            opts={{ align: "center", loop: true }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((item) => (
                <CarouselItem key={item.id} className="sm:basis-full md:basis-2/3 lg:basis-1/2 pl-4">
                  <div className="p-1 h-full">
                    <Card className="glass-card relative p-6 md:p-8 h-full flex flex-col">
                      <div className="absolute top-4 right-4 text-primary/30">
                        <Quote size={40} className="rotate-180" />
                      </div>
                      <blockquote className="text-lg mb-6 relative z-10">
                        "{item.quote}"
                      </blockquote>
                      <div className="flex items-center mt-auto">
                        <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.title}, {item.company}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden sm:flex justify-end gap-2 mt-4">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default TestimonialSection;
