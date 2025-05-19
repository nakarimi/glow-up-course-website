
import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

// Mock course data
const coursesData = [
  {
    id: 1,
    title: "Management Training",
    category: "Business",
    location: "Online",
    duration: "2 days",
    price: 299,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Web Development",
    category: "Technology",
    location: "London",
    duration: "5 days",
    price: 799,
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Data Analysis",
    category: "Technology",
    location: "Online",
    duration: "3 days",
    price: 499,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Digital Marketing",
    category: "Marketing",
    location: "Manchester",
    duration: "2 days",
    price: 349,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Leadership Skills",
    category: "Business",
    location: "Online",
    duration: "1 day",
    price: 199,
    image: "https://images.unsplash.com/photo-1541844053589-346841d0b34c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Project Management",
    category: "Business",
    location: "Birmingham",
    duration: "4 days",
    price: 599,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
];

const Checkout = () => {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const selectedDate = searchParams.get("date");
  const course = coursesData.find(c => c.id === Number(courseId));
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    agreeToTerms: false,
  });

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Course not found</h2>
            <p className="mb-6">The course you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/courses")}>View All Courses</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      agreeToTerms: checked
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      toast({
        title: "Terms and conditions",
        description: "Please agree to the terms and conditions to proceed.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real application, you would process payment here
    toast({
      title: "Payment successful!",
      description: "Your course enrollment has been confirmed.",
    });
    
    // Redirect to a confirmation page or back to courses
    setTimeout(() => {
      navigate("/courses");
    }, 2000);
  };

  const formattedDate = selectedDate ? 
    new Date(selectedDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : "No date selected";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Your Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                          First Name
                        </label>
                        <Input 
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                          Last Name
                        </label>
                        <Input 
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email Address
                        </label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-1">
                          Phone Number
                        </label>
                        <Input 
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-1">
                        Company (Optional)
                      </label>
                      <Input 
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium mb-1">
                        Address
                      </label>
                      <Input 
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium mb-1">
                          City
                        </label>
                        <Input 
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium mb-1">
                          Postal Code
                        </label>
                        <Input 
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium mb-1">
                          Country
                        </label>
                        <Input 
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Checkbox 
                        id="terms" 
                        checked={formData.agreeToTerms}
                        onCheckedChange={handleCheckboxChange}
                      />
                      <label 
                        htmlFor="terms"
                        className="ml-2 text-sm cursor-pointer"
                      >
                        I agree to the terms and conditions and the privacy policy
                      </label>
                    </div>
                    
                    <div className="mt-8">
                      <Button type="submit" className="w-full" size="lg">
                        Complete Purchase
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            {/* Order summary */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="h-full w-full object-cover" 
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">{course.location} • {course.duration}</p>
                      <p className="text-sm text-muted-foreground">Date: {formattedDate}</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span>Course Fee</span>
                      <span>${course.price}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Tax</span>
                      <span>${Math.round(course.price * 0.2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                      <span>Total</span>
                      <span>${Math.round(course.price * 1.2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <p className="text-sm text-muted-foreground mb-4">
                    Your payment details are securely processed. We do not store your credit card information.
                  </p>
                  <div className="flex justify-between w-full">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate(`/course/${courseId}`)}
                    >
                      Back
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
