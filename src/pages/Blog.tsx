
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { BlogPost, getAllBlogPosts, fetchWithDelay } from "@/services/dataService";

const Blog = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadBlogPosts = async () => {
      setLoading(true);
      try {
        const data = await fetchWithDelay(getAllBlogPosts());
        setBlogPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);
  
  useEffect(() => {
    // Apply staggered animation when component mounts
    document.querySelectorAll('.blog-card').forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate-fade-in');
      }, 100 * index);
    });
    
    // Filter posts based on selected category
    if (selectedCategory === "All") {
      setFilteredPosts(blogPosts);
    } else {
      setFilteredPosts(blogPosts.filter(post => post.category === selectedCategory));
    }
  }, [selectedCategory, blogPosts]);

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(blogPosts.map(post => post.category)))];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-transparent py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4 text-gradient"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our Blog
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Stay updated with the latest industry insights, training best practices, and professional development tips
            </motion.p>
            
            {/* Category Filter */}
            {loading ? (
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-9 w-24" />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="transition-all duration-300"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* Masonry Blog Grid */}
        <section className="container mx-auto px-4 py-12">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div 
                  key={i}
                  className={`glass-card overflow-hidden ${
                    i % 3 === 0 ? 'lg:col-span-1 row-span-1' : 
                    i % 5 === 0 ? 'lg:col-span-2 row-span-1' : 'col-span-1'
                  }`}
                >
                  <Skeleton className="h-48 lg:h-56 w-full" />
                  <div className="p-6">
                    <div className="flex justify-between mb-2">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-7 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <Skeleton className="h-9 w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
              {filteredPosts.map((post, index) => (
                <div 
                  key={post.id}
                  className={`blog-card opacity-0 glass-card overflow-hidden transition-all hover:shadow-xl ${
                    index % 3 === 0 ? 'lg:col-span-1 row-span-1' : 
                    index % 5 === 0 ? 'lg:col-span-2 row-span-1' : 'col-span-1'
                  }`}
                >
                  <div className="relative">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-48 lg:h-56 object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary/90 hover:bg-primary">{post.category}</Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                      <span>{formatDate(post.date)}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          {post.author.charAt(0)}
                        </div>
                        <span className="text-sm">{post.author}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/news/${post.slug}`)}
                      >
                        Read more
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

// Helper function to format date string
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default Blog;
