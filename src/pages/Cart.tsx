
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CartContext } from "@/context/CartContext";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateCartItemAttendees, subtotal, clearCart } = useContext(CartContext);

  const handleQuantityChange = (id: string, change: number, currentAttendees: number) => {
    const newAttendees = currentAttendees + change;
    if (newAttendees > 0) {
      updateCartItemAttendees(id, newAttendees);
    }
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCheckout = () => {
    // Navigate to the checkout page
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <ShoppingCart className="h-6 w-6 mr-3" />
            <h1 className="text-3xl font-bold">Your Cart</h1>
          </div>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex justify-center items-center w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900 mb-6">
                <ShoppingCart className="h-12 w-12 text-blue-500 dark:text-blue-300" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Looks like you haven't added any courses to your cart yet.</p>
              <Button onClick={() => navigate("/courses")}>
                Browse Courses
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Cart Items</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex flex-col md:flex-row border-b p-6 last:border-b-0">
                        <div className="md:w-1/4 h-32 mb-4 md:mb-0 overflow-hidden rounded-md">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="md:w-3/4 md:pl-6 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-xl font-medium">{item.title}</h3>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-red-500"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              Date: {formatDate(item.date)}
                            </p>
                            <p className="font-medium">${item.price} per attendee</p>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center">
                              <span className="mr-2">Attendees:</span>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleQuantityChange(item.id, -1, item.attendees)}
                                disabled={item.attendees <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-10 text-center">{item.attendees}</span>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleQuantityChange(item.id, 1, item.attendees)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <span className="font-bold">${(item.price * item.attendees).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="flex justify-between p-6">
                    <Button variant="outline" onClick={() => navigate("/courses")}>
                      Continue Shopping
                    </Button>
                    <Button variant="ghost" onClick={() => clearCart()}>
                      Clear Cart
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div>
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>VAT (20%)</span>
                      <span>${(subtotal * 0.2).toFixed(2)}</span>
                    </div>
                    
                    <div className="flex items-center mt-4">
                      <Input 
                        placeholder="Coupon code" 
                        className="flex-1 rounded-r-none"
                      />
                      <Button variant="secondary" className="rounded-l-none">
                        Apply
                      </Button>
                    </div>
                  </CardContent>
                  <Separator />
                  <CardFooter className="flex flex-col p-6">
                    <div className="flex justify-between w-full mb-4">
                      <span className="font-bold">Total</span>
                      <span className="font-bold">${(subtotal * 1.2).toFixed(2)}</span>
                    </div>
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
