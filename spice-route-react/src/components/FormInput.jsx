export default function FormInput({
  label,
  error,
  id,
  ...props
}) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>

      <input
        id={id}
        {...props}
        aria-invalid={Boolean(error)}
      />

      {error && (
        <small className="field-error">
          {error}
        </small>
      )}
    </div>
  );
}