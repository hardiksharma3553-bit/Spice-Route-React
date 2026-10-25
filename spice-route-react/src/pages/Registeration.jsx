import { useState } from 'react';
import FormInput from '../components/FormInput';
import Modal from '../components/Modal';

export default function Registeration() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm(current => ({
      ...current,
      [name]: value
    }));

    setErrors(current => ({
      ...current,
      [name]: ''
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = 'Name is required.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email.';
    }

    if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = 'Enter a 10-digit phone number.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    }
  }

  return (
    <section className="page active-page">
      <h2 className="page-title">
        Customer Registration
      </h2>

      <form
        className="registration-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <FormInput
          id="name"
          name="name"
          label="Full Name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />

        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />

        <FormInput
          id="phone"
          name="phone"
          label="Phone Number"
          placeholder="10-digit mobile number"
          maxLength="10"
          value={form.phone}
          onChange={handleChange}
          error={errors.phone}
        />

        <button type="submit" className="btn-primary">
          Register
        </button>
      </form>

      {submitted && (
        <Modal
          title="Registration Successful!"
          onClose={() => setSubmitted(false)}
        >
          <p>Welcome, {form.name}!</p>
          <p>Your form passed validation.</p>
        </Modal>
      )}
    </section>
  );
}