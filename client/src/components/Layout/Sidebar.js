import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';
import { useLocalSearch } from '../../hooks/useLocalSearch';
import { getInitials } from '../../utils/helpers';
import Avatar from './Avatar';
import ChatListItem from '../Chat/ChatListItem';
import NewChatModal from '../Chat/NewChatModal';
import '../../styles/sidebar.css';

export default function Sidebar({ activeChatId, onNewChat }) {
  const { currentUser, logout } = useAuth();
  const { chats } = useChat();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  console.log(chats,"chatschatschats")
  const { query, setQuery, filtered } = useLocalSearch(chats, 'name');
 console.log("filtered",filtered)
  const handleLogout = async() => {
    await logout();
    navigate('/login');
  };

  const handleNewChat = async(name) => {
    setShowModal(false);
    onNewChat(name);
  };

  const userInitials = getInitials(currentUser?.username || '');

  return (
    <>
      <aside className="sidebar">
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-user">
            <Avatar initials={userInitials} color="#6366f1" size={38} />
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">{currentUser?.username}</span>
              <span className="sidebar-user-status">● Active</span>
            </div>
          </div>
          <button
            className="btn-icon"
            onClick={handleLogout}
            title="Sign out"
            aria-label="Sign out"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>

        {/* New Chat Button */}
        <div className="sidebar-actions">
          <button
            className="btn btn-primary btn-full"
            onClick={() => setShowModal(true)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New chat
          </button>
        </div>

        {/* Search */}
        <div className="sidebar-search">
          <svg className="sidebar-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className="sidebar-search-input"
            type="text"
            placeholder="Search conversations…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className="sidebar-search-clear" onClick={() => setQuery('')} aria-label="Clear search">×</button>
          )}
        </div>

        <p className="sidebar-section-label">Messages</p>

        {/* Chat list */}
        <div className="sidebar-list">
          {filtered?.length === 0 && (
            <div className="sidebar-empty">No conversations found</div>
          )}
          {(filtered||[])?.map((chat) => (
            <ChatListItem
              key={chat?._id}
              chat={chat}
              isActive={String(chat?._id) === String(activeChatId)}
              onClick={() => navigate(`/chats/${chat?._id}`)}
            />
          ))}
        </div>
      </aside>

      {showModal && (
        <NewChatModal
          onConfirm={handleNewChat}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
