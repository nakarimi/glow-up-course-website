
import React, { createContext, useState, useEffect } from "react";

export type CartItem = {
  id: string;
  courseId: number;
  title: string;
  price: number;
  date: string;
  attendees: number;
  image: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateCartItemAttendees: (id: string, attendees: number) => void;
  clearCart: () => void;
  subtotal: number;
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItemAttendees: () => {},
  clearCart: () => {},
  subtotal: 0,
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
      }
    }
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    
    // Calculate subtotal
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.attendees), 0);
    setSubtotal(total);
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems(prev => [...prev, item]);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateCartItemAttendees = (id: string, attendees: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, attendees } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemAttendees,
        clearCart,
        subtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
