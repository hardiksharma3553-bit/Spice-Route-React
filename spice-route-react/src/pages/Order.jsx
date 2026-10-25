import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../context/CartContext';
import { useRestaurant } from '../context/RestaurantContext';
import Modal from '../components/Modal';

export default function Order() {
  const {
    cartItems,
    changeQty,
    removeFromCart,
    subtotal,
    gst,
    service,
    total,
    orderNotes,
    setOrderNotes,
    clearCart,
    setLastOrder
  } = useCart();

  const { notify, orders, setOrders } = useRestaurant();
  const [showPopup, setShowPopup] = useState(false);

  function placeOrder() {
    if (cartItems.length === 0) {
      notify('Please add items first.');
      return;
    }

    const order = {
      id: Date.now(),
      createdAt: new Date().toLocaleString(),
      items: cartItems,
      notes: orderNotes,
      total
    };

    setLastOrder(order);
    setOrders(current => [...current, order]);
    clearCart();
    setOrderNotes('');
    setShowPopup(true);
  }

  return (
    <section className="page active-page" id="order">
      <h2 className="page-title">Your Order</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h3>🛒 Your cart is empty</h3>
          <Link to="/menu" className="btn-primary">
            Browse Menu
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-container">
            {cartItems.map(item => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-info">
                  <span className="cart-item-emoji">
                    {item.image.startsWith('/')
                      ? '🍽️'
                      : item.image}
                  </span>

                  <div>
                    <div className="cart-item-name">
                      {item.name}
                    </div>
                    <div>₹{item.price} each</div>
                  </div>
                </div>

                <div className="qty-controls">
                  <button
                    className="qty-btn"
                    onClick={() => changeQty(item.id, -1)}
                  >
                    −
                  </button>

                  <span>{item.qty}</span>

                  <button
                    className="qty-btn"
                    onClick={() => changeQty(item.id, 1)}
                  >
                    +
                  </button>
                </div>

                <strong>
                  ₹{(item.price * item.qty).toFixed(2)}
                </strong>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          <div className="notes-section">
            <label htmlFor="orderNotes">
              Special instructions
            </label>

            <textarea
              id="orderNotes"
              rows="3"
              value={orderNotes}
              onChange={e => setOrderNotes(e.target.value)}
              placeholder="Less spicy, no onions..."
            />
          </div>

          <div className="bill-card">
            <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
            <p>GST (5%): ₹{gst.toFixed(2)}</p>
            <p>Service charge (5%): ₹{service.toFixed(2)}</p>
            <h3>Total: ₹{total.toFixed(2)}</h3>

            <button
              className="btn-primary"
              onClick={placeOrder}
            >
              Place Order
            </button>

            <Link to="/bill" className="btn-secondary">
              View Bill
            </Link>
          </div>
        </>
      )}

      {showPopup && (
        <Modal
          title="Order placed successfully!"
          onClose={() => setShowPopup(false)}
        >
          <p>Your order has been added to Kitchen View.</p>
        </Modal>
      )}
    </section>
  );
}