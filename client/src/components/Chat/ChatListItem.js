import React from 'react';
import Avatar from '../Layout/Avatar';
import '../../styles/components.css';
import { formatDate } from '../../utils/helpers';

export default function ChatListItem({ chat, isActive, onClick }) {
  return (
    <div
      className={`chat-list-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
    
      <div className="chat-list-info">
       
        <div className="chat-list-row">
          <span className="chat-list-preview">{chat.topic}</span>
            <span className="chat-list-badge">{formatDate(chat.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
}
