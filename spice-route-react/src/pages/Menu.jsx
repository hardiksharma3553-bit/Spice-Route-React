import { useMemo, useState } from 'react';

import {
  menuData,
  categories
} from '../data/menuData';

import { useCart } from '../context/CartContext';
import { useRestaurant } from '../context/RestaurantContext';
import FoodCard from '../components/FoodCard';

export default function Menu() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const { addToCart } = useCart();
  const { notify } = useRestaurant();

  const filteredMenu = useMemo(() => {
    return menuData.filter(item => {
      const matchesCategory =
        category === 'All' ||
        item.category === category;

      const matchesSearch =
        item.name.toLowerCase().includes(
          search.toLowerCase()
        );

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  function handleAdd(id) {
    addToCart(id);
    notify('Item added to cart!');
  }

  return (
    <section className="page active-page" id="menu">
      <h2 className="page-title">Our Menu</h2>

      <div className="menu-controls">
        <input
          type="text"
          placeholder="🔍 Search food items..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div className="category-filters">
          {categories.map(item => (
            <button
              key={item}
              className={
                `filter-btn ${
                  category === item ? 'active' : ''
                }`
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="menu-grid">
        {filteredMenu.length === 0 ? (
          <p>No dishes match your search.</p>
        ) : (
          filteredMenu.map(item => (
            <FoodCard
              key={item.id}
              item={item}
              onAdd={handleAdd}
            />
          ))
        )}
      </div>
    </section>
  );
}