import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../context/ChatContext';
import Sidebar from '../components/Layout/Sidebar';
import '../styles/chats.css';

export default function ChatsPage() {
  const { createChat } = useChat();
  const navigate = useNavigate();

  const handleNewChat = async(name) => {
        
    const chat = await createChat(name);
    
    if (chat) navigate(`/chats/${chat}`);
  };

  return (
    <div className="chats-page">
      <Sidebar onNewChat={handleNewChat} activeChatId={null} />

      <main className="chats-empty">
        <div className="chats-empty-inner">
          <span className="chats-empty-icon">💬</span>
          <h2>Your messages</h2>
          <p>Select a conversation to start chatting, or begin a new one.</p>
        </div>
      </main>
    </div>
  );
}
