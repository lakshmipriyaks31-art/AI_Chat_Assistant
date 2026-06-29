import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import '../../styles/chatwindow.css';
import { useChat } from '../../context/ChatContext';
import { DynamicGreeting } from '../../utils/DynamicGreeting';
import { useAuth } from '../../context/AuthContext';
import { shortId } from '../../utils/helpers';
import DeleteModal from './DeleteModel';

export default function ChatWindow({}) {
  const navigate = useNavigate();
  const bottomRef = useRef(null);
  const { chatId } = useParams(); 
  const [chat,setchat] = useState([])
  const [Errors,setError] = useState("")
  const [page,setpage] = useState(1)
  const [openModel,setopenModel] = useState(false)
  const {getchat,activeChat,sendMessage,chats,deleteChat,setActiveChat} = useChat()
  const {currentUser} = useAuth()
  
   const containerRef = useRef(null);
   
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSend = async(text) => {
    
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (activeChat){
       setchat(prev=>[...prev,{content:text,role:'user',updatedAt:new Date()}])
       let reply =await  sendMessage(activeChat?._id, text);
        if(!reply?.success){ 
        setError(JSON.parse(reply?.message)?.error?.message)
         setchat(
               
                [
                   ...chat,
                   {content:text,role:'user',updatedAt:new Date()},
                 {content:JSON.parse(reply?.message)?.error?.message,updatedAt:new Date(),role:'assistant'}
                ]
              )
        return false
       }

      setchat(prev=>[
        ...prev.slice(0,prev.length-1),
        {...prev[chat.length-1],...reply?.data?.usermsg},
        reply?.data?.latestMessage
      ])
    }
    
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  


  useEffect(()=>{
   if(chatId) {
    setActiveChat(chats.find(id=>id?._id===chatId))
     setError("")
    setpage(1)
    getChats(1,"initial")
  }
   
  },[chatId])

  const getChats = async(page,from) => {
      let result = await getchat({chatId,page})
       
      setchat(from==="initial"?result:prev=>[...result,...prev])
  }


    // Fetch older records on scroll up
  const loadMoreMessages = async () => {
    
    if (loading || !hasMore || chat.length === 0) return;
    setLoading(true);

    const oldestMessageId = chat[0]._id; // Topmost item in current array
    const container = containerRef.current;
    
    // Capture metrics before adding new items
    const previousScrollHeight = container.scrollHeight;

    try {
      const res = await getChats(page+1);
      
      if (res?.length === 0) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      setpage(page+1)
      setTimeout(() => {
        if (container) {
          const newScrollHeight = container.scrollHeight;
          // Maintain relative scroll position
          container.scrollTop = newScrollHeight - previousScrollHeight;
        }
      }, 0);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (!containerRef.current) return;
    
    // Check if user scrolled to the absolute top
    if (containerRef.current.scrollTop === 0) {
      loadMoreMessages(page);
    }
  };

  
  return (
    <div className="chat-window ">
      {/* Header */}
      <header className="chat-header">
        <button
          className="btn-icon chat-back"
          onClick={() => navigate('/chats')}
          aria-label="Back to chats"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>


        <div className="chat-header-info">
          <span className="chat-header-name">{activeChat?.topic}</span>
        </div>

        <div className="chat-header-actions">
         
          <button className="btn-icon" aria-label="More options" onClick={()=>setopenModel(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="40" viewBox="0 0 24 24">
<path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"></path>
</svg>
          </button>
        </div>
      </header>
   
      {/* Messages */}
      <div className="chat-messages" ref={containerRef}  onScroll={handleScroll}>
          {loading && <div style={{ textAlign: 'center' }}>Loading older history...</div>}
        {chat?.length ? 
      
      chat?.map((msg) => (
         <MessageBubble key={msg?._id||shortId} message={msg} Errors={Errors}/>
        )):
         
      
      (
          <div className="chat-empty">
            <span className="chat-empty-icon">👋</span>
            <h2>Hi {currentUser?.username}  {DynamicGreeting()}</h2>
          </div>
        
      )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      {!Errors&&<MessageInput onSend={handleSend} chatId={chatId}/>}
      {openModel && <DeleteModal deleteChat={()=>deleteChat(chatId)} onClose ={()=>setopenModel(false)}/>}
    </div>
  );
}
