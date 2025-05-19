
import { useState, useEffect, useContext } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { CartContext } from "@/context/CartContext";
import { CreditCard, Home, MapPin, User } from "lucide-react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

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

// Mock user data (would come from auth context in a real app)
const currentUser = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1234567890",
  company: "Acme Inc.",
  address: "123 Main St",
  city: "New York",
  postalCode: "10001",
  country: "USA",
};

const Checkout = () => {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cartItems, subtotal, clearCart } = useContext(CartContext);
  
  const selectedDate = searchParams.get("date") || "";
  const attendeesCount = parseInt(searchParams.get("attendees") || "1");
  
  const course = courseId ? coursesData.find(c => c.id === Number(courseId)) : null;
  
  const [leadBooker, setLeadBooker] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    phone: currentUser.phone,
    company: currentUser.company,
  });

  const [willBeDelegate, setWillBeDelegate] = useState(false);
  const [delegatesData, setDelegatesData] = useState<any[]>([]);
  const [billingAddress, setBillingAddress] = useState({
    addressLine1: currentUser.address,
    addressLine2: "",
    addressLine3: "",
    city: currentUser.city,
    postalCode: currentUser.postalCode,
    country: currentUser.country,
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // Tax calculation
  const tax = Math.round(subtotal * 0.2);
  const total = subtotal + tax;
  
  // Initialize delegates data based on attendees count
  useEffect(() => {
    if (courseId && course) {
      const count = attendeesCount;
      const initialDelegates = Array(count).fill(0).map((_, index) => ({
        id: index + 1,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        jobTitle: "",
      }));
      setDelegatesData(initialDelegates);
    } else if (cartItems.length > 0) {
      // Initialize delegates for all cart items
      const allDelegates: any[] = [];
      let delegateId = 1;
      
      cartItems.forEach(item => {
        for (let i = 0; i < item.attendees; i++) {
          allDelegates.push({
            id: delegateId++,
            courseId: item.courseId,
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            jobTitle: "",
          });
        }
      });
      
      setDelegatesData(allDelegates);
    }
  }, [courseId, course, attendeesCount, cartItems]);
  
  // Auto-fill first delegate with lead booker info when checkbox is checked
  useEffect(() => {
    if (willBeDelegate && delegatesData.length > 0) {
      const updatedDelegates = [...delegatesData];
      updatedDelegates[0] = {
        ...updatedDelegates[0],
        firstName: leadBooker.firstName,
        lastName: leadBooker.lastName,
        email: leadBooker.email,
        phone: leadBooker.phone,
      };
      setDelegatesData(updatedDelegates);
    }
  }, [willBeDelegate, leadBooker]);
  
  const handleLeadBookerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLeadBooker(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Update first delegate data if "will be delegate" is checked
    if (willBeDelegate && delegatesData.length > 0 && (name === "firstName" || name === "lastName" || name === "email" || name === "phone")) {
      const updatedDelegates = [...delegatesData];
      updatedDelegates[0] = {
        ...updatedDelegates[0],
        [name]: value
      };
      setDelegatesData(updatedDelegates);
    }
  };
  
  const handleDelegateChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedDelegates = [...delegatesData];
    updatedDelegates[index] = {
      ...updatedDelegates[index],
      [name]: value
    };
    setDelegatesData(updatedDelegates);
  };
  
  const handleBillingAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      toast({
        title: "Terms and conditions required",
        description: "Please accept the terms and conditions before proceeding.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Payment successful!",
      description: "Your course enrollment has been confirmed.",
    });
    
    // Clear cart and redirect
    clearCart();
    setTimeout(() => {
      navigate("/courses");
    }, 2000);
  };
  
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
      
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">YOUR CART</h1>
            
            <div className="mt-6 flex items-center justify-between max-w-3xl">
              <div className="flex items-center w-full">
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mb-2">
                    <span className="text-white">1</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Home</span>
                </div>
                <div className="h-1 flex-1 bg-gray-300"></div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mb-2">
                    <span className="text-white">2</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Results</span>
                </div>
                <div className="h-1 flex-1 bg-gray-300"></div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mb-2">
                    <span className="text-white">3</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Details</span>
                </div>
                <div className="h-1 flex-1 bg-blue-500"></div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mb-2">
                    <span className="text-white">4</span>
                  </div>
                  <span className="text-xs font-medium">Checkout</span>
                </div>
                <div className="h-1 flex-1 bg-gray-300"></div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mb-2">
                    <span className="text-white">5</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Thank you</span>
                </div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Lead Booker Details */}
              <Card>
                <CardHeader className="bg-blue-600 text-white py-3 px-6">
                  <CardTitle className="flex items-center text-lg">
                    <User className="h-5 w-5 mr-2" />
                    Lead booker details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-sm mb-4">
                    We need your contact details to improve your booking and checkout progress.
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                        First Name*
                      </label>
                      <Input 
                        id="firstName"
                        name="firstName"
                        value={leadBooker.firstName}
                        onChange={handleLeadBookerChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                        Last Name*
                      </label>
                      <Input 
                        id="lastName"
                        name="lastName"
                        value={leadBooker.lastName}
                        onChange={handleLeadBookerChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email*
                    </label>
                    <div className="relative">
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={leadBooker.email}
                        onChange={handleLeadBookerChange}
                        required
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center">
                        i
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">
                      Mobile Number*
                    </label>
                    <Input 
                      id="phone"
                      name="phone"
                      value={leadBooker.phone}
                      onChange={handleLeadBookerChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="company" className="block text-sm font-medium mb-1">
                      Company
                    </label>
                    <Input 
                      id="company"
                      name="company"
                      value={leadBooker.company}
                      onChange={handleLeadBookerChange}
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <Checkbox 
                      id="willBeDelegate"
                      checked={willBeDelegate}
                      onCheckedChange={(checked) => {
                        const isChecked = !!checked;
                        setWillBeDelegate(isChecked);
                        
                        // If unchecked, don't clear the first delegate
                        // The auto-fill effect will handle setting the data when checked
                      }}
                    />
                    <label 
                      htmlFor="willBeDelegate"
                      className="ml-2 text-sm"
                    >
                      I will be a delegate on this course
                    </label>
                  </div>
                </CardContent>
              </Card>
              
              {/* Delegate Details */}
              <Card>
                <CardHeader className="bg-blue-600 text-white py-3 px-6">
                  <CardTitle className="flex items-center text-lg">
                    <User className="h-5 w-5 mr-2" />
                    Delegate details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Accordion type="single" collapsible className="w-full" defaultValue="delegate-1">
                    {delegatesData.map((delegate, index) => (
                      <AccordionItem key={delegate.id} value={`delegate-${delegate.id}`}>
                        <AccordionTrigger className="px-6 py-4">
                          Delegate {delegate.id}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label htmlFor={`delegate-${delegate.id}-firstName`} className="block text-sm font-medium mb-1">
                                First Name*
                              </label>
                              <Input 
                                id={`delegate-${delegate.id}-firstName`}
                                name="firstName"
                                value={delegate.firstName}
                                onChange={(e) => handleDelegateChange(index, e)}
                                required
                              />
                            </div>
                            <div>
                              <label htmlFor={`delegate-${delegate.id}-lastName`} className="block text-sm font-medium mb-1">
                                Last Name*
                              </label>
                              <Input 
                                id={`delegate-${delegate.id}-lastName`}
                                name="lastName"
                                value={delegate.lastName}
                                onChange={(e) => handleDelegateChange(index, e)}
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <label htmlFor={`delegate-${delegate.id}-email`} className="block text-sm font-medium mb-1">
                              Email*
                            </label>
                            <div className="relative">
                              <Input 
                                id={`delegate-${delegate.id}-email`}
                                name="email"
                                type="email"
                                value={delegate.email}
                                onChange={(e) => handleDelegateChange(index, e)}
                                required
                              />
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center">
                                i
                              </div>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <label htmlFor={`delegate-${delegate.id}-phone`} className="block text-sm font-medium mb-1">
                              Mobile Number*
                            </label>
                            <Input 
                              id={`delegate-${delegate.id}-phone`}
                              name="phone"
                              value={delegate.phone}
                              onChange={(e) => handleDelegateChange(index, e)}
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor={`delegate-${delegate.id}-jobTitle`} className="block text-sm font-medium mb-1">
                              Job Title
                            </label>
                            <Input 
                              id={`delegate-${delegate.id}-jobTitle`}
                              name="jobTitle"
                              value={delegate.jobTitle}
                              onChange={(e) => handleDelegateChange(index, e)}
                            />
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
              
              {/* Payment Method */}
              <Card>
                <CardHeader className="bg-blue-600 text-white py-3 px-6">
                  <CardTitle className="flex items-center text-lg">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Pay with
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="card" className="block text-sm font-medium mb-1">
                        Card
                      </label>
                      <Input 
                        id="card"
                        placeholder="Card number"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">
                          MM / YY
                        </label>
                        <Input 
                          id="expiryDate"
                          placeholder="MM / YY"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="cvc" className="block text-sm font-medium mb-1">
                          CVC
                        </label>
                        <Input 
                          id="cvc"
                          placeholder="CVC"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Billing Address */}
              <Card>
                <CardHeader className="bg-blue-600 text-white py-3 px-6">
                  <CardTitle className="flex items-center text-lg">
                    <MapPin className="h-5 w-5 mr-2" />
                    Billing address
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="addressLine1" className="block text-sm font-medium mb-1">
                        Address line 1*
                      </label>
                      <Input 
                        id="addressLine1"
                        name="addressLine1"
                        value={billingAddress.addressLine1}
                        onChange={handleBillingAddressChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="addressLine2" className="block text-sm font-medium mb-1">
                        Address line 2
                      </label>
                      <Input 
                        id="addressLine2"
                        name="addressLine2"
                        value={billingAddress.addressLine2}
                        onChange={handleBillingAddressChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="addressLine3" className="block text-sm font-medium mb-1">
                        Address line 3
                      </label>
                      <Input 
                        id="addressLine3"
                        name="addressLine3"
                        value={billingAddress.addressLine3}
                        onChange={handleBillingAddressChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-1">
                        Town / City*
                      </label>
                      <Input 
                        id="city"
                        name="city"
                        value={billingAddress.city}
                        onChange={handleBillingAddressChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium mb-1">
                        Country*
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={billingAddress.country}
                        onChange={(e) => setBillingAddress(prev => ({...prev, country: e.target.value}))}
                        className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                        required
                      >
                        <option value="USA">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Ireland">Republic of Ireland</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium mb-1">
                        Postcode*
                      </label>
                      <Input 
                        id="postalCode"
                        name="postalCode"
                        value={billingAddress.postalCode}
                        onChange={handleBillingAddressChange}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Terms and Conditions */}
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(!!checked)}
                  required
                />
                <label htmlFor="terms" className="text-sm">
                  I accept the <span className="text-blue-600 hover:underline cursor-pointer">Terms and Conditions</span>
                </label>
              </div>
              
              <div className="flex justify-end gap-4 mt-8">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                  Back
                </Button>
                <Button type="submit" size="lg">
                  Complete Booking
                </Button>
              </div>
            </div>
            
            {/* Order summary */}
            <div>
              <div className="sticky top-24">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Booking</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {courseId && course ? (
                      <div className="flex items-center gap-4 pb-4 border-b">
                        <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={course.image} 
                            alt={course.title}
                            className="h-full w-full object-cover" 
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{course.title}</h3>
                          <p className="text-sm text-muted-foreground">{attendeesCount} delegates</p>
                          <p className="text-sm text-muted-foreground">Date: {formatDate(selectedDate)}</p>
                        </div>
                      </div>
                    ) : (
                      cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 pb-4 border-b">
                          <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.title}
                              className="h-full w-full object-cover" 
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.attendees} delegates</p>
                            <p className="text-sm text-muted-foreground">Date: {formatDate(item.date)}</p>
                          </div>
                        </div>
                      ))
                    )}
                    
                    <div className="pt-4">
                      <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>VAT</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex items-center mt-4 mb-2">
                        <Input 
                          placeholder="Coupon" 
                          className="flex-1 rounded-r-none"
                        />
                        <Button variant="secondary" className="rounded-l-none">
                          APPLY
                        </Button>
                      </div>
                      
                      <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      
                      <div className="mt-4 text-xs text-muted-foreground">
                        <p>I understand that from any non-refundable and/or non-transferable booking.</p>
                        <p className="my-1">My order is subject to the complete booking terms & conditions.</p>
                      </div>
                    </div>
                  </CardContent>
                  <div className="px-6 pb-6">
                    <Button className="w-full" type="submit">
                      COMPLETE BOOKING
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
