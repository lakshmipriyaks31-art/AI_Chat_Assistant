import React, { useState, useRef, useEffect } from 'react';
import '../../styles/modal.css';

export default function DeleteModal({ deleteChat, onClose }) {
  const [name, setName] = useState('');
  const inputRef = useRef(null);


  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="New conversation"
      >
        <div className="modal-header">
          <h4 className="modal-title">Are you sure to delete the conversation? </h4>
          <button className="btn-icon" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

      
      
          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={deleteChat}
            >
             Delete
            </button>
          </div>
        
      </div>
    </div>
  );
}
