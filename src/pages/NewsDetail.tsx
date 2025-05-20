
import { useParams, Link } from "react-router-dom";
import { newsData } from "@/data/news";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const NewsDetail = () => {
  const { slug } = useParams();
  const news = newsData.find(item => item.slug === slug);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Find related news (same category, excluding current)
  const relatedNews = news 
    ? newsData
        .filter(item => item.category === news.category && item.id !== news.id)
        .slice(0, 3) 
    : [];

  if (!news) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">News article not found</h1>
            <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/news">Back to News</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link to="/news" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to News
              </Link>
            </Button>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{news.title}</h1>
            
            <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-6 gap-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{formatDate(news.date)}</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{news.author}</span>
              </div>
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                <Badge variant="outline">{news.category}</Badge>
              </div>
            </div>
          </div>
          
          <div className="mb-8 rounded-lg overflow-hidden">
            <img 
              src={news.image} 
              alt={news.title} 
              className="w-full h-80 object-cover" 
            />
          </div>
          
          <div 
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </div>
        
        {relatedNews.length > 0 && (
          <div className="max-w-4xl mx-auto mt-12 pt-8 border-t">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedNews.map((item) => (
                <div key={item.id} className="border rounded-lg overflow-hidden hover-scale">
                  <Link to={`/news/${item.slug}`} className="block">
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-2 line-clamp-2 hover:text-primary">{item.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(item.date)}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
      
      <Footer />
    </div>
  );
};

export default NewsDetail;
