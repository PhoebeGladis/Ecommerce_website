import { useAuth } from "./auth.js";

import { useState, useContext, createContext,useEffect } from "react";
const CartContext = createContext();

// const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   useEffect (()=>{
//     let existingCartItem=localStorage.getItem('cart')
//     if(existingCartItem) setCart(JSON.parse(existingCartItem))
//   },[])
//   return (
//     <CartContext.Provider value={[cart, setCart]}>
//       {children}
//     </CartContext.Provider>
//   );
// };
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [auth] = useAuth();

  // Helper function to get user-specific key
  const getCartKey = () =>
    auth?.user?._id ? `cart-${auth.user._id}` : "cart-guest";

  useEffect(() => {
    const existingCart = localStorage.getItem(getCartKey());
    if (existingCart) {
      setCart(JSON.parse(existingCart));
    } else {
      setCart([]);
    }
  }, [auth?.user?._id]);

  // Save cart to localStorage when it updates
  useEffect(() => {
    localStorage.setItem(getCartKey(), JSON.stringify(cart));
  }, [cart, auth?.user?._id]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);
export { useCart, CartProvider };
