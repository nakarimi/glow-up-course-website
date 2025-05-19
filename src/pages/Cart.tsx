
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CartContext } from "@/context/CartContext";
import { Trash2 } from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, subtotal, updateCartItemAttendees } = useContext(CartContext);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };
  
  const tax = Math.round(subtotal * 0.2);
  const total = subtotal + tax;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Your Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-6">Your cart is empty.</p>
              <Button onClick={() => navigate("/courses")}>Browse Courses</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart items */}
              <div className="lg:col-span-2">
                {cartItems.map(item => (
                  <Card key={item.id} className="mb-4">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="h-32 w-32 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="h-full w-full object-cover" 
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground mb-1">
                            Date: {formatDate(item.date)}
                          </p>
                          <div className="flex items-center gap-4 mt-3">
                            <label className="text-sm">
                              Attendees:
                              <select
                                className="ml-2 p-1 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                                value={item.attendees}
                                onChange={(e) => updateCartItemAttendees(item.id, Number(e.target.value))}
                              >
                                {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                                  <option key={num} value={num}>
                                    {num}
                                  </option>
                                ))}
                              </select>
                            </label>
                            <p className="text-lg font-medium ml-auto">
                              ${item.price * item.attendees}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-3 flex justify-between">
                      <p className="text-sm text-muted-foreground">
                        ${item.price} per attendee
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {/* Order summary */}
              <div>
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between mb-2">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Tax (20%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <input 
                          type="text" 
                          placeholder="Coupon code" 
                          className="flex-1 p-2 border rounded-l-md focus:outline-none dark:bg-slate-800 dark:border-slate-700"
                        />
                        <Button variant="secondary" className="rounded-l-none">
                          Apply
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full"
                      onClick={handleProceedToCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
