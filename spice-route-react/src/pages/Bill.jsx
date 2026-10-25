import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Bill() {
  const {
    cartItems,
    subtotal,
    gst,
    service,
    total,
    lastOrder
  } = useCart();

  const [splitCount, setSplitCount] = useState(1);

  const people = Math.max(1, Number(splitCount) || 1);

  const displayedItems =
    cartItems.length > 0
      ? cartItems
      : lastOrder?.items || [];

  const displayedSubtotal = displayedItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const billGst = displayedSubtotal * 0.05;
  const billService = displayedSubtotal * 0.05;
  const billTotal = displayedSubtotal + billGst + billService;

  return (
    <section className="page active-page" id="bill">
      <h2 className="page-title">Bill Summary</h2>

      <div className="bill-card">
        {displayedItems.length === 0 ? (
          <p>Your bill is empty. Add food from the menu.</p>
        ) : (
          displayedItems.map(item => (
            <div className="bill-row" key={item.id}>
              <span>
                {item.name} × {item.qty}
              </span>

              <span>
                ₹{(item.price * item.qty).toFixed(2)}
              </span>
            </div>
          ))
        )}

        <hr />

        <div className="bill-row">
          <span>Subtotal</span>
          <span>₹{displayedSubtotal.toFixed(2)}</span>
        </div>

        <div className="bill-row">
          <span>GST (5%)</span>
          <span>₹{billGst.toFixed(2)}</span>
        </div>

        <div className="bill-row">
          <span>Service Charge (5%)</span>
          <span>₹{billService.toFixed(2)}</span>
        </div>

        <hr />

        <h2>Grand Total: ₹{billTotal.toFixed(2)}</h2>

        <div className="split-bill">
          <label htmlFor="splitCount">
            Split bill between:
          </label>

          <input
            id="splitCount"
            type="number"
            min="1"
            value={splitCount}
            onChange={e => setSplitCount(e.target.value)}
          />

          <p>
            Each person pays:
            <strong>
              ₹{(billTotal / people).toFixed(2)}
            </strong>
          </p>
        </div>

        <Link to="/menu" className="btn-primary">
          Continue Ordering
        </Link>
      </div>
    </section>
  );
}