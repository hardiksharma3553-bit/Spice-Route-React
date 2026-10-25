export default function FoodCard({ item, onAdd }) {
  const isImage =
    typeof item.image === 'string' &&
    item.image.startsWith('/');

  return (
    <article className="food-card">
      <div className="food-image">
        {isImage ? (
          <img src={item.image} alt={item.name} />
        ) : (
          item.image
        )}
      </div>

      <div className="food-card-body">
        <div className="food-header">
          <span className="food-name">{item.name}</span>
          <span className="food-price">₹{item.price}</span>
        </div>

        <p className="food-desc">{item.description}</p>

        <div className="food-footer">
          <span>
            {item.veg ? '🟢 VEG' : '🔴 NON-VEG'}
          </span>

          <button
            className="add-btn"
            onClick={() => onAdd(item.id)}
          >
            Add +
          </button>
        </div>
      </div>
    </article>
  );
}