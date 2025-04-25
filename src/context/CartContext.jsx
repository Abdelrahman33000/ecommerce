import React, { createContext, useState, useEffect, useContext } from 'react';
import { useUser } from './UserContext'; 

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useUser();
  const storageKey = user ? `cart_${user.id}` : 'cart';

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem(storageKey)) || [];
    setCart(savedCart);
  }, [user]);

  const syncCart = (updatedCart) => {
    localStorage.setItem(storageKey, JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      let updatedCart;

      if (existingProduct) {
        updatedCart = prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }

      syncCart(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(item => item.id !== productId);
      syncCart(updatedCart);
      return updatedCart;
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) => {
      const updatedCart = prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      syncCart(updatedCart);
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(storageKey);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
