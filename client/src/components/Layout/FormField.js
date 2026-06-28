import React from 'react';
import '../../styles/components.css';

export default function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  autoComplete,
}) {
  return (
    <div className="form-field">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className="form-input"
      />
    </div>
  );
}
