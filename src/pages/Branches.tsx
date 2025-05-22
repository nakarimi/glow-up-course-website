
import { useRef, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Building, MapPin, Phone, Mail } from "lucide-react";
import { Branch, getAllBranches, fetchWithDelay } from "@/services/dataService";

const Branches = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBranches = async () => {
      setLoading(true);
      try {
        const data = await fetchWithDelay(getAllBranches());
        setBranches(data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBranches();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

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
              Our Training Centers
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Discover our state-of-the-art training facilities across the country
            </motion.p>
          </div>
        </section>
        
        {/* Branches Tabs */}
        <section className="container mx-auto px-4 py-12">
          {loading ? (
            <div className="space-y-8">
              <div className="flex justify-center mb-8">
                <div className="flex space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-10 w-24 rounded-md" />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Skeleton className="h-[400px] w-full rounded-lg" />
                <Skeleton className="h-[400px] w-full rounded-lg" />
              </div>
            </div>
          ) : (
            <Tabs defaultValue={branches[0]?.id.toString()} className="w-full">
              <TabsList className="w-full flex flex-wrap justify-center mb-8">
                {branches.map(branch => (
                  <TabsTrigger 
                    key={branch.id} 
                    value={branch.id.toString()}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {branch.city}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {branches.map(branch => (
                <TabsContent key={branch.id} value={branch.id.toString()}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Branch Image */}
                    <div className="w-full overflow-hidden rounded-lg shadow-lg">
                      <img 
                        src={branch.image} 
                        alt={branch.name}
                        className="w-full h-[400px] object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                    
                    {/* Branch Details */}
                    <motion.div
                      className="glass-card p-8"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.h2 
                        className="text-2xl font-bold mb-6 flex items-center"
                        variants={itemVariants}
                      >
                        <Building className="mr-2" size={24} /> {branch.name}
                      </motion.h2>
                      
                      <motion.div variants={itemVariants} className="flex items-start mb-4">
                        <MapPin className="mr-3 text-primary mt-1 flex-shrink-0" size={18} />
                        <div>
                          <p className="text-foreground">{branch.address}</p>
                          <p className="text-foreground">{branch.city}, {branch.postalCode}</p>
                        </div>
                      </motion.div>
                      
                      <motion.div variants={itemVariants} className="flex items-center mb-4">
                        <Phone className="mr-3 text-primary flex-shrink-0" size={18} />
                        <p className="text-foreground">{branch.phone}</p>
                      </motion.div>
                      
                      <motion.div variants={itemVariants} className="flex items-center mb-6">
                        <Mail className="mr-3 text-primary flex-shrink-0" size={18} />
                        <p className="text-foreground">{branch.email}</p>
                      </motion.div>
                      
                      <motion.div variants={itemVariants} className="mb-6">
                        <h3 className="font-semibold mb-2">Working Hours</h3>
                        <p className="text-muted-foreground">{branch.workingHours}</p>
                      </motion.div>
                      
                      <motion.div variants={itemVariants}>
                        <h3 className="font-semibold mb-2">Features & Facilities</h3>
                        <div className="flex flex-wrap gap-2">
                          {branch.features.map((feature, index) => (
                            <span 
                              key={index} 
                              className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants} className="mt-6">
                        <Button 
                          variant="gradient" 
                          className="w-full sm:w-auto"
                          onClick={() => window.open(`https://maps.google.com/?q=${branch.coordinates.lat},${branch.coordinates.lng}`, '_blank')}
                        >
                          Get Directions
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Branches;
