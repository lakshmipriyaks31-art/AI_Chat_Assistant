import React, { useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChat } from '../context/ChatContext';
import Sidebar from '../components/Layout/Sidebar';
import ChatWindow from '../components/Chat/ChatWindow';
import '../styles/conversation.css';

export default function ConversationPage() {
  const { chatId } = useParams();
  const { chats, activeChat,  setActiveChat,selectChat, sendMessage, createChat } = useChat();
  const navigate = useNavigate();


  useEffect(()=>{
    
     setActiveChat(chats.find(id=>id?._id===chatId))
  },[!chatId,activeChat])

  const handleNewChat = useCallback(()=>async(name) => {
    const chat = await createChat(name);
    if (chat) navigate(`/chats/${chat}`);
  },[chats,activeChat]);


  
  return (
    <div className="conversation-page">
      <Sidebar onNewChat={handleNewChat} activeChatId={activeChat?._id} />

      <main className="conversation-main">
        {activeChat ? (
          <ChatWindow />
        ) : (
          <div className="conversation-loading">
            <span className="loading-dot" />
            <span className="loading-dot" />
            <span className="loading-dot" />
          </div>
        )}
      </main>
    </div>
  );
}
