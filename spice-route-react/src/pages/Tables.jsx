import { useRestaurant } from '../context/RestaurantContext';
import { tableStatuses } from '../data/menuData';

function titleCase(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function Tables() {
  const {
    tables,
    cycleTableStatus,
    notify
  } = useRestaurant();

  return (
    <section className="page active-page" id="tables">
      <h2 className="page-title">Table Status</h2>

      <p className="hint-text">
        Click a table to change its status.
      </p>

      <div className="tables-grid">
        {tables.map(table => (
          <button
            type="button"
            key={table.id}
            className={`table-card ${table.status}`}
            onClick={() => {
              cycleTableStatus(table.id);
              notify(`Table ${table.id} status updated`);
            }}
          >
            Table {table.id}

            <span className="table-status-text">
              {titleCase(table.status)}
            </span>
          </button>
        ))}
      </div>

      <div className="legend">
        {tableStatuses.map(status => (
          <span className="legend-item" key={status}>
            {titleCase(status)}
          </span>
        ))}
      </div>
    </section>
  );
}