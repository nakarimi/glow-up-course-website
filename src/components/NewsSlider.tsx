
import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { newsData } from "@/data/news";

const NewsSlider = () => {
  const navigate = useNavigate();
  const latestNews = newsData.slice(0, 5);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleViewNews = (slug: string) => {
    navigate(`/news/${slug}`);
  };

  return (
    <div className="w-full py-16 px-8 md:px-12 bg-white dark:bg-slate-900 my-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Latest News</h2>
          <Button variant="outline" size="sm" onClick={() => navigate("/news")}>
            View All News
          </Button>
        </div>
        
        <Carousel opts={{ align: "start" }}>
          <CarouselContent className="-ml-2 md:-ml-4">
            {latestNews.map((news) => (
              <CarouselItem key={news.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                <Card className="h-full flex flex-col hover-scale">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={news.image} 
                      alt={news.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                      onClick={() => handleViewNews(news.slug)}
                    />
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{formatDate(news.date)}</span>
                    </div>
                    <CardTitle className="text-lg cursor-pointer hover:text-primary" onClick={() => handleViewNews(news.slug)}>
                      {news.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-3">{news.excerpt}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button 
                      variant="link" 
                      className="p-0 h-auto font-medium" 
                      onClick={() => handleViewNews(news.slug)}
                    >
                      Read more
                    </Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:flex justify-end gap-2 mt-4">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default NewsSlider;
