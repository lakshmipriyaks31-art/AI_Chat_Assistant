import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { useAuth } from './AuthContext';
import { getChats, saveChats } from '../utils/storage';
import { defaultChats } from '../utils/defaultData';
import { getInitials, randomColor, formatTime } from '../utils/helpers';
import { createchatroom,getmessages ,getchatservice,newmessageservice, deletchatservice} from '../services/chat.services';
import { useNavigate } from 'react-router-dom';

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const { currentUser } = useAuth();
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const navigate = useNavigate()
  /* Load chats when user logs in */
  useEffect(() => {
    getallchat()
  }, [currentUser]);

  const getallchat = useCallback(async()=>{
      let chat = await getchatservice()

      if(!chat?.success){
        setChats([])
      }
      setChats(chat?.data)
      setActiveChat(null)
  },[])


  const selectChat = useCallback(
    (chatId) => {
      const found = chats.find((c) => c.id === chatId);
      if (!found) return;
         setActiveChat(found);
    },
    [chats]
  );

  const sendMessage = useCallback(
    async(chatId, text) => {
      console.log("chatId, text",chatId, text)
      if (!text.trim()) return;
      const chat = await newmessageservice(
        {
          chatid:chatId,
          content:text,
          userid:currentUser?._id
        }
      )
      return chat
      
    },
    [chats,]
  );

  const createChat = useCallback(
    async (topic) => {

      if (!topic.trim()) return null;
      const chat = await createchatroom({topic})
      setActiveChat(chat?.data);
      console.log("chat?.data",chat?.data)
      setChats([chat?.data,...chats])
      return chat?.data?._id;
    },
    [chats]
  );

  const deleteChat = useCallback(
    async (chatId) => {
      const chat = await deletchatservice(chatId)
      setActiveChat(null);
      const indexToRemove = chats.findIndex(item => item._id === chatId);
      setChats([
          ...chats.slice(0, indexToRemove),     // Everything before the index
          ...chats.slice(indexToRemove + 1) 
      ])
      navigate('/chats',{replace:true})
    },
    [chats, activeChat]
  );

  const getchat = useCallback(
    async ({chatId,page}) => {
      const chat = await getmessages({chatId,page})
      // setActiveChat(chatid);
      return chat?.data;
    },
    [chats]
  );


  const value = {
    chats,
    activeChat,
    selectChat,
    sendMessage,
    createChat,
    deleteChat,
    setActiveChat,
    getchat
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
}
