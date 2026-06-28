import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/notfound.css';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="notfound-page">
      <span className="notfound-icon">🔍</span>
      <h1>404</h1>
      <p>Page not found</p>
      <button onClick={() => navigate('/chats')}>Back to chats</button>
    </div>
  );
}
