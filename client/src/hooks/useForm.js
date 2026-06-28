import { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const { setAuthError } = useAuth();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setAuthError({})
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const reset = useCallback(() => setValues(initialValues), [initialValues]);

  return { values, handleChange, reset, setValues };
}
