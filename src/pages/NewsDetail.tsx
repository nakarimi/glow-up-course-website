
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { newsData } from "@/data/news";

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const news = newsData.find(n => n.slug === slug);
  
  useEffect(() => {
    if (!news) {
      navigate("/news");
    }
    
    window.scrollTo(0, 0);
  }, [news, navigate]);
  
  if (!news) {
    return null;
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <Button 
            variant="outline" 
            className="mb-8" 
            onClick={() => navigate("/news")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{news.title}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(news.date)}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {news.author}
                  </div>
                  <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-800 dark:text-blue-200">
                    {news.category}
                  </div>
                </div>
              </div>
              
              <div className="mb-8 aspect-video overflow-hidden rounded-lg">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <div className="prose prose-lg max-w-none dark:prose-invert" 
                dangerouslySetInnerHTML={{ __html: news.content }} 
              />
            </div>
            
            <div className="lg:col-span-1">
              <Card className="p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">Recent Articles</h3>
                <div className="space-y-4">
                  {newsData
                    .filter(n => n.id !== news.id)
                    .slice(0, 5)
                    .map(recentNews => (
                      <div key={recentNews.id} className="group">
                        <h4 
                          className="font-medium group-hover:text-primary cursor-pointer"
                          onClick={() => navigate(`/news/${recentNews.slug}`)}
                        >
                          {recentNews.title}
                        </h4>
                        <div className="text-sm text-muted-foreground flex items-center mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(recentNews.date)}
                        </div>
                      </div>
                    ))}
                </div>
              </Card>
              
              <Card className="p-6 bg-blue-50 dark:bg-blue-900/20">
                <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
                <p className="text-muted-foreground mb-4">
                  Subscribe to our newsletter to get the latest updates and news.
                </p>
                <Button className="w-full">Subscribe</Button>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewsDetail;
