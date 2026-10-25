import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { itemCount, total } = useCart();

  return (
    <section className="page active-page" id="home">
      <div className="banner">
        <h1>Welcome to Spice Route</h1>
        <p>Authentic flavours, served fresh at your table.</p>

        <Link className="btn-primary" to="/menu">
          Start Ordering
        </Link>
      </div>

      <div className="home-info-cards">
        <div className="info-card">
          <h3>📋 Digital Menu</h3>
          <p>Browse dishes, prices and descriptions.</p>
          <Link to="/menu">Explore menu →</Link>
        </div>

        <div className="info-card">
          <h3>🧾 Live Billing</h3>
          <p>Check subtotal, GST and your final total.</p>
          <Link to="/bill">View bill →</Link>
        </div>

        <div className="info-card">
          <h3>👨‍🍳 Kitchen Sync</h3>
          <p>Review items currently in your order.</p>
          <Link to="/kitchen">Kitchen view →</Link>
        </div>
      </div>

      <div className="info-card">
        <h2>Your cart</h2>
        <p>Items selected: {itemCount}</p>
        <p>Estimated total: ₹{total.toFixed(2)}</p>

        <Link to="/order" className="btn-primary">
          Review Order
        </Link>
      </div>
    </section>
  );
}