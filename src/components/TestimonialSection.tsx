
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useRef } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Marketing Director",
    company: "TechGlobal Inc.",
    content: "The courses at CourseHub transformed my understanding of digital marketing. The instructors are knowledgeable and provide real-world examples that I've been able to implement immediately in my work.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Software Engineer",
    company: "InnovateTech",
    content: "I completed the Web Development course and was impressed by the curriculum's depth and how up-to-date it was with current industry practices. Within weeks of completing the course, I received three job offers.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "HR Manager",
    company: "Global Services Ltd.",
    content: "The Management Training course provided valuable insights into effective leadership strategies. The skills I gained have helped me build stronger teams and improve workplace communication significantly.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
  },
  {
    id: 4,
    name: "David Thompson",
    position: "Financial Analyst",
    company: "Capital Investments",
    content: "As someone transitioning into data analysis, the Data Analysis course gave me the perfect foundation. The practical exercises were challenging yet accessible, and the support from instructors was exceptional.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
  },
  {
    id: 5,
    name: "Sophia Lee",
    position: "Project Manager",
    company: "BuildRight Construction",
    content: "The project management certification from CourseHub has been instrumental in advancing my career. The course content was comprehensive and directly applicable to my daily work challenges.",
    avatar: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
  }
];

const TestimonialSection = () => {
  const carouselRef = useRef(null);
  
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Students Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover how our courses have helped professionals achieve their career goals
          </p>
        </div>
        
        <div className="relative">
          <Carousel
            setApi={(api) => { carouselRef.current = api; }}
            opts={{ loop: true }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <Card className="border bg-card h-full">
                    <CardContent className="pt-6 px-6 pb-6 flex flex-col h-full">
                      <div className="mb-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full overflow-hidden">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.position}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                      <blockquote className="text-muted-foreground flex-grow">
                        "{testimonial.content}"
                      </blockquote>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex justify-end gap-2 mt-6">
              <CarouselPrevious onClick={() => (carouselRef.current as any)?.scrollPrev()} className="static translate-y-0" />
              <CarouselNext onClick={() => (carouselRef.current as any)?.scrollNext()} className="static translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
