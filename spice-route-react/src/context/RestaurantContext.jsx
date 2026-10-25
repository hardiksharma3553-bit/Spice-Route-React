
import { createContext, useContext, useState } from 'react';
import { initialTables, statusCycle } from '../data/menuData';

const RestaurantContext = createContext();

export function RestaurantProvider({ children }) {
  const [tables, setTables] = useState(initialTables);
  const [showPopup, setShowPopup] = useState(false);

  const changeTableStatus = (id) => {
    setTables((previousTables) =>
      previousTables.map((table) => {
        if (table.id !== id) return table;

        const index = statusCycle.indexOf(table.status);

        return {
          ...table,
          status: statusCycle[(index + 1) % statusCycle.length],
        };
      })
    );
  };

  return (
    <RestaurantContext.Provider
      value={{
        tables,
        setTables,
        changeTableStatus,
        showPopup,
        setShowPopup,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  return useContext(RestaurantContext);
}
