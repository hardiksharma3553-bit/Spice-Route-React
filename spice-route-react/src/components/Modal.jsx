export default function Modal({
  title,
  children,
  onClose
}) {
  return (
    <div className="popup-overlay">
      <div
        className="popup-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="popup-icon">✅</div>

        <h3 id="modal-title">{title}</h3>

        <div>{children}</div>

        <button
          className="btn-primary"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}