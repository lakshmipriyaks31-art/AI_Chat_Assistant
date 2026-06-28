import React, { useState, useRef, useEffect } from 'react';
import '../../styles/chatwindow.css';

export default function MessageInput({ chatId,onSend }) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);
  const[loading,setloading] = useState(false)
  useEffect(()=>{
    setloading(false)
    setText("")
    textareaRef.current?.focus();
  },[chatId])
  const handleSend = async() => {
    if (!text.trim()) return;
       setText('');
       textareaRef.current?.focus();
       setloading(true)
       await onSend(text.trim());
       setloading(false)
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
console.log("loading",loading)
  return (
    <div className="message-input-bar">
      {/* <button className="btn-icon" aria-label="Attach file">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66L9.41 17.41a2 2 0 01-2.83-2.83L15.17 6" />
        </svg>
      </button> */}

      <textarea
        ref={textareaRef}
        className="message-input"
        rows={1}
        placeholder="Type a message… (Enter to send)"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />

        
        {loading ?
         <div className="conversation-loading-flex-remove">
            <span className="loading-dot redcolor" />
            <span className="loading-dot redcolor" />
            <span className="loading-dot redcolor" />
          </div>
          :
           <button
        className={`btn-send ${text.trim() ? 'btn-send--active' : ''}`}
        onClick={handleSend}
        disabled={!text.trim()}
        aria-label="Send message"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>

}
    </div>
  );
}
