
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  readTime: string;
  category: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Top 10 Health and Safety Training Courses for 2025",
    excerpt: "Discover the most in-demand health and safety training courses that every professional should consider in 2025.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "Sarah Johnson",
    date: "May 15, 2025",
    image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    readTime: "8 min read",
    category: "Health & Safety",
    tags: ["training", "health", "safety", "professional development"]
  },
  {
    id: 2,
    title: "The Evolution of Professional Training in the Digital Age",
    excerpt: "How digital technology has transformed the landscape of professional training and development over the past decade.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "Michael Chen",
    date: "April 28, 2025",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    readTime: "5 min read",
    category: "Technology",
    tags: ["digital learning", "technology", "innovation"]
  },
  {
    id: 3,
    title: "Why Continuous Professional Development Matters More Than Ever",
    excerpt: "In a rapidly changing job market, continuous learning has become essential for career growth and job security.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "Emily Roberts",
    date: "April 10, 2025",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    readTime: "6 min read",
    category: "Career Development",
    tags: ["CPD", "career growth", "professional skills"]
  },
  {
    id: 4,
    title: "Implementing Effective Training Programs in the Workplace",
    excerpt: "A step-by-step guide to designing and implementing training programs that deliver measurable results.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "David Wilson",
    date: "March 22, 2025",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    readTime: "10 min read",
    category: "Workplace",
    tags: ["training programs", "workplace", "implementation"]
  },
  {
    id: 5,
    title: "The Future of VR in Training and Education",
    excerpt: "Virtual reality is revolutionizing how we learn and train, offering immersive experiences that enhance retention.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "Alicia Nguyen",
    date: "March 5, 2025",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e520?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    readTime: "7 min read",
    category: "Technology",
    tags: ["VR", "virtual reality", "immersive learning"]
  },
  {
    id: 6,
    title: "Certification vs. Experience: What Employers Value Most",
    excerpt: "Exploring the balance between professional certifications and practical experience in today's job market.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "James Peterson",
    date: "February 18, 2025",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    readTime: "9 min read",
    category: "Career Development",
    tags: ["certification", "experience", "hiring"]
  }
];

const categories = [
  "All",
  "Health & Safety",
  "Technology",
  "Career Development",
  "Workplace",
  "Leadership"
];

const Blog = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  
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
  }, [selectedCategory]);

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
          </div>
        </section>
        
        {/* Masonry Blog Grid */}
        <section className="container mx-auto px-4 py-12">
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
                    <span>{post.date}</span>
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
                      onClick={() => navigate(`/blog/${post.id}`)}
                    >
                      Read more
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
