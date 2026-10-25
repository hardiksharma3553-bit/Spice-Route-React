import {
  createContext,
  useContext,
  useState
} from 'react';

import { menuData } from '../data/menuData';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orderNotes, setOrderNotes] = useState('');
  const [lastOrder, setLastOrder] = useState(null);

  function addToCart(id) {
    setCart(current => {
      const found = current.find(item => item.id === id);

      if (found) {
        return current.map(item =>
          item.id === id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...current, { id, qty: 1 }];
    });
  }

  function changeQty(id, delta) {
    setCart(current =>
      current
        .map(item =>
          item.id === id
            ? { ...item, qty: item.qty + delta }
            : item
        )
        .filter(item => item.qty > 0)
    );
  }

  function removeFromCart(id) {
    setCart(current =>
      current.filter(item => item.id !== id)
    );
  }

  function clearCart() {
    setCart([]);
  }

  const cartItems = cart.map(cartItem => ({
    ...menuData.find(food => food.id === cartItem.id),
    qty: cartItem.qty
  }));

  const itemCount = cart.reduce(
    (sum, item) => sum + item.qty, 0
  );

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty, 0
  );

  const gst = subtotal * 0.05;
  const service = subtotal * 0.05;
  const total = subtotal + gst + service;

  return (
    <CartContext.Provider value={{
      cart,
      cartItems,
      itemCount,
      subtotal,
      gst,
      service,
      total,
      orderNotes,
      setOrderNotes,
      lastOrder,
      setLastOrder,
      addToCart,
      changeQty,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}