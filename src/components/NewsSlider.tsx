
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { BlogPost, getAllBlogPosts, fetchWithDelay } from "@/services/dataService";

const NewsSlider = () => {
  const navigate = useNavigate();
  const [latestNews, setLatestNews] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      try {
        // Get only the first 5 blog posts
        const allPosts = await fetchWithDelay(getAllBlogPosts());
        setLatestNews(allPosts.slice(0, 5));
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);
  
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
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-full flex flex-col">
                <Skeleton className="h-40 w-full" />
                <CardHeader className="p-4">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-6 w-full" />
                </CardHeader>
                <CardContent className="p-4 pt-0 flex-grow">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Skeleton className="h-5 w-20" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Carousel opts={{ align: "start" }}>
            <CarouselContent className="-ml-2 md:-ml-4">
              {latestNews.map((post) => (
                <CarouselItem key={post.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full flex flex-col hover-scale">
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                        onClick={() => handleViewNews(post.slug)}
                      />
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <CardTitle className="text-lg cursor-pointer hover:text-primary" onClick={() => handleViewNews(post.slug)}>
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex-grow">
                      <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button 
                        variant="link" 
                        className="p-0 h-auto font-medium" 
                        onClick={() => handleViewNews(post.slug)}
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
        )}
      </div>
    </div>
  );
};

export default NewsSlider;
