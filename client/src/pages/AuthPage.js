import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';
import '../styles/auth.css';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const { login, register, authError, clearError } = useAuth();
  const navigate = useNavigate();

  const loginForm = useForm({ mobile: '', password: '' });
  const registerForm = useForm({ username: '', mobile: '', password: '' });

  const switchMode = (m) => {
    setMode(m);
    clearError();
    loginForm.reset();
    registerForm.reset();
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    const ok = await login(loginForm.values);
    
    if (ok) navigate('/chats');
  };

  const handleRegister = async(e) => {
    e.preventDefault();
    const ok =await register(registerForm.values);
    if (ok) navigate('/chats');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Brand */}
        <div className="auth-brand">
         
          <h1 className="auth-title">AI Chat Assistant
            
          </h1>
          <p className="auth-subtitle">Connect with me, instantly</p>
        </div>

        {/* Tab switcher */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => switchMode('login')}
          >
            Sign in
          </button>
          <button
            className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
            onClick={() => switchMode('register')}
          >
            Register
          </button>
        </div>

        {/* Forms */}
        {mode === 'login' ? (
          <LoginForm
            values={loginForm.values}
            onChange={loginForm.handleChange}
            onSubmit={handleLogin}
            error={authError}
          />
        ) : (
          <RegisterForm
            values={registerForm.values}
            onChange={registerForm.handleChange}
            onSubmit={handleRegister}
            error={authError}
          />
        )}

        {mode === 'login' && (
          <p className="auth-hint">
            New here?{' '}
            <button className="auth-link" onClick={() => switchMode('register')}>
              Create an account
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
