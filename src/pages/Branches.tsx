
import { useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Building, MapPin, Phone, Mail } from "lucide-react";

interface Branch {
  id: number;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
  workingHours: string;
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  },
  features: string[];
}

const branches: Branch[] = [
  {
    id: 1,
    name: "London Training Center",
    address: "123 Oxford Street",
    city: "London",
    postalCode: "W1D 1DF",
    phone: "+44 20 1234 5678",
    email: "london@trainhub.com",
    workingHours: "Monday-Friday: 9:00 AM - 6:00 PM",
    image: "https://images.unsplash.com/photo-1520510520588-36fe9ea57a61?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    coordinates: {
      lat: 51.5156,
      lng: -0.1385
    },
    features: [
      "Computer Labs", 
      "Presentation Rooms", 
      "Practical Workshop Areas", 
      "Cafeteria",
      "Accessibility Features"
    ]
  },
  {
    id: 2,
    name: "Manchester Training Center",
    address: "45 Market Street",
    city: "Manchester",
    postalCode: "M1 1WR",
    phone: "+44 161 876 5432",
    email: "manchester@trainhub.com",
    workingHours: "Monday-Friday: 8:30 AM - 5:30 PM",
    image: "https://images.unsplash.com/photo-1581362716668-95f6ddbd5258?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    coordinates: {
      lat: 53.4839,
      lng: -2.2446
    },
    features: [
      "High-tech Training Rooms", 
      "Simulation Facilities", 
      "Breakout Areas", 
      "Library",
      "Free Parking"
    ]
  },
  {
    id: 3,
    name: "Birmingham Training Center",
    address: "78 New Street",
    city: "Birmingham",
    postalCode: "B2 4QA",
    phone: "+44 121 345 6789",
    email: "birmingham@trainhub.com",
    workingHours: "Monday-Friday: 9:00 AM - 5:00 PM",
    image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    coordinates: {
      lat: 52.4776,
      lng: -1.9000
    },
    features: [
      "Virtual Reality Lab", 
      "Conference Halls", 
      "Outdoor Training Area", 
      "Restaurant",
      "Child Care Facilities"
    ]
  },
  {
    id: 4,
    name: "Edinburgh Training Center",
    address: "15 Princes Street",
    city: "Edinburgh",
    postalCode: "EH2 2AN",
    phone: "+44 131 987 6543",
    email: "edinburgh@trainhub.com",
    workingHours: "Monday-Friday: 8:00 AM - 6:00 PM",
    image: "https://images.unsplash.com/photo-1585211969224-3e992986159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    coordinates: {
      lat: 55.9533,
      lng: -3.1883
    },
    features: [
      "Historic Building", 
      "Modern Facilities", 
      "Research Labs", 
      "Cafe",
      "Accommodation Availability"
    ]
  }
];

const Branches = () => {
  const mapRef = useRef<HTMLDivElement>(null);

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
          <Tabs defaultValue={branches[0].id.toString()} className="w-full">
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
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Branches;
