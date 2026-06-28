import React from 'react';
import FormField from '../Layout/FormField';

export default function LoginForm({ values, onChange, onSubmit, error }) {
  return (
    <form className="auth-form" onSubmit={onSubmit} noValidate>
      <FormField
        label="Mobile Number"
        name="mobile"
        type="string"
        placeholder="1234567890"
        value={values.mobile}
        onChange={onChange}
        autoComplete="mobile"
      />
      {error?.mobile && <p className="auth-error">{error?.mobile}</p>}

      <FormField
        label="Password"
        name="password"
        type="password"
        placeholder="••••••••"
        value={values.password}
        onChange={onChange}
        autoComplete="current-password"
      />

      {error?.password && <p className="auth-error">{error?.password}</p>}

      <button type="submit" className="btn btn-primary btn-full">
        Sign in
      </button>
    </form>
  );
}
