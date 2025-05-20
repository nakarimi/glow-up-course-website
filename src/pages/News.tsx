
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { newsData } from "@/data/news";
import { Calendar, Search } from "lucide-react";

const ITEMS_PER_PAGE = 6;

const News = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNews, setFilteredNews] = useState(newsData);
  
  useEffect(() => {
    const filtered = newsData.filter(news => 
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNews(filtered);
    setCurrentPage(1);
  }, [searchTerm]);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentNews = filteredNews.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  
  const handleViewNews = (slug: string) => {
    navigate(`/news/${slug}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Banner */}
        <div className="bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">News & Updates</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Stay informed about the latest developments in our training programs,
                industry trends, and company announcements
              </p>
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search news..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* News grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {currentNews.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No news articles matching your search.</p>
                <Button variant="outline" onClick={() => setSearchTerm("")}>Clear search</Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentNews.map(news => (
                    <Card key={news.id} className="flex flex-col hover-scale">
                      <div className="h-48 overflow-hidden cursor-pointer" onClick={() => handleViewNews(news.slug)}>
                        <img 
                          src={news.image} 
                          alt={news.title} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                        />
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{formatDate(news.date)}</span>
                          </div>
                          <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-800 dark:text-blue-200">
                            {news.category}
                          </span>
                        </div>
                        <CardTitle className="text-xl cursor-pointer hover:text-primary" onClick={() => handleViewNews(news.slug)}>
                          {news.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground line-clamp-3">{news.excerpt}</p>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          variant="link" 
                          className="p-0 h-auto font-medium" 
                          onClick={() => handleViewNews(news.slug)}
                        >
                          Read more
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <Pagination className="mt-12">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <PaginationItem key={page}>
                          <PaginationLink 
                            isActive={currentPage === page}
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default News;
