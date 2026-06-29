import React from 'react';
import '../../styles/chatwindow.css';
import { formatTime } from '../../utils/helpers';

export default function MessageBubble({ message,Errors }) {
  
  const isMe = message?.role === 'user';
  

  return (
message?.content&&  
    <div className={`message-row ${isMe ? 'message-row--me' : 'message-row--them'}`}>
      <div className={`message-bubble ${isMe ? 'bubble--me' : 'bubble--them'}`}>
        {message?.content}
      </div>
      <span className={`message-time ${isMe ? 'time--me' : 'time--them'}`}>
        {formatTime(new Date(message?.updatedAt))}
        {isMe && (
          <svg className="message-tick" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
    </div>
  );
}
