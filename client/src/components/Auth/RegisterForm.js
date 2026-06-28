import React from 'react';
import FormField from '../Layout/FormField';

export default function RegisterForm({ values, onChange, onSubmit, error }) {
  return (
    <form className="auth-form" onSubmit={onSubmit} noValidate>
      <FormField
        label="Full name"
        name="username"
        type="text"
        placeholder="Your name"
        value={values.username}
        onChange={onChange}
        autoComplete="name"
      />
      {error.username && <p className="auth-error">{error.username}</p>}

      <FormField
        label="Mobile Number"
        name="mobile"
        type="string"
        placeholder="1234567890"
        value={values.mobile}
        onChange={onChange}
      />
      {error.password && <p className="auth-error">{error.password}</p>}

      <FormField
        label="Password"
        name="password"
        type="password"
        placeholder="Create a password"
        value={values.password}
        onChange={onChange}
        autoComplete="new-password"
      />

      {error.password && <p className="auth-error">{error.password}</p>}

      <button type="submit" className="btn btn-primary btn-full">
        Create account
      </button>
    </form>
  );
}
