import { useCart } from '../context/CartContext';
import { useRestaurant } from '../context/RestaurantContext';

const courses = [
  'Starter',
  'Main Course',
  'Dessert',
  'Drinks'
];

export default function Kitchen() {
  const { cartItems } = useCart();
  const { orders } = useRestaurant();

  return (
    <section className="page active-page" id="kitchen">
      <h2 className="page-title">
        Kitchen View — Orders
      </h2>

      <h3>Current Cart</h3>

      <div className="kitchen-grid">
        {courses.map(course => {
          const items = cartItems.filter(
            item => item.course === course
          );

          return (
            <div className="kitchen-column" key={course}>
              <h3>{course}</h3>

              {items.length === 0 ? (
                <p>No pending items</p>
              ) : (
                items.map(item => (
                  <div className="kitchen-item" key={item.id}>
                    <span>
                      {item.image.startsWith('/')
                        ? '🍽️'
                        : item.image}{' '}
                      {item.name}
                    </span>

                    <strong>×{item.qty}</strong>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>

      <h3>Placed Orders</h3>

      {orders.length === 0 ? (
        <p>No placed orders yet.</p>
      ) : (
        orders.map(order => (
          <div className="info-card" key={order.id}>
            <h4>Order #{String(order.id).slice(-5)}</h4>
            <p>{order.createdAt}</p>

            {order.items.map(item => (
              <p key={item.id}>
                {item.name} × {item.qty}
              </p>
            ))}

            {order.notes && <p>Notes: {order.notes}</p>}
            <strong>₹{order.total.toFixed(2)}</strong>
          </div>
        ))
      )}
    </section>
  );
}