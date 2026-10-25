import { NavLink, Outlet } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useRestaurant } from '../context/RestaurantContext';

export default function Layout() {
  const { itemCount } = useCart();
  const { toast } = useRestaurant();

  const links = [
    ['/', 'Home'],
    ['/menu', 'Menu'],
    ['/order', 'Order'],
    ['/bill', 'Bill'],
    ['/kitchen', 'Kitchen View'],
    ['/tables', 'Table Status'],
    ['/register', 'Register']
  ];

  return (
    <>
      <header className="navbar">
        <div className="logo">🍽️ Spice Route</div>

        <nav className="nav-links">
          {links.map(([path, label]) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) =>
                `nav-btn ${isActive ? 'active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <NavLink className="cart-indicator" to="/order">
          🛒 {itemCount}
        </NavLink>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        © 2026 Spice Route Restaurant
      </footer>

      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </>
  );
}