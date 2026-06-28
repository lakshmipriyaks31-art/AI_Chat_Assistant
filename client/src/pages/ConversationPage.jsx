import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChat } from '../context/ChatContext';
import Sidebar from '../components/Layout/Sidebar';
import ChatWindow from '../components/Chat/ChatWindow';
import '../styles/conversation.css';

export default function ConversationPage() {
  const { chatId } = useParams();
  const { chats, activeChat,  setActiveChat,selectChat, sendMessage, createChat } = useChat();
  const navigate = useNavigate();
console.log(chatId,"sasaa",chatId == "undefined")

  useEffect(()=>{
    console.log("come here")
    // if(chatId == "undefined") {
    //   return navigate('/chats',{replace:true})
    // }
     setActiveChat(chats.find(id=>id?._id===chatId))
  },[!chatId])

  const handleNewChat = async(name) => {
    const chat = await createChat(name);
    if (chat) navigate(`/chats/${chat}`);
  };


  console.log(activeChat,"__activeChat")
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
