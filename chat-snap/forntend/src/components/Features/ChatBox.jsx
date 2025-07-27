// src/Features/ChatBox.jsx
import React, { useEffect, useState, useRef } from 'react';
import api from '../../config/api';
import { formatDistanceToNow } from 'date-fns';
import { Avatar } from '@mui/material';

const ChatBox = ({ currentUserId, selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef();

  useEffect(() => {
    if (selectedUser?.id && currentUserId) {
      fetchMessages();
    }
  }, [selectedUser]);

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/messages/history`, {
        params: {
          user1: currentUserId,
          user2: selectedUser.id,
        },
      });
      setMessages(res.data);
      scrollToBottom();
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const res = await api.post(`/messages/send`, {
        senderId: currentUserId,
        receiverId: selectedUser.id,
        content: newMessage,
      });

      setMessages((prev) => [...prev, res.data]);
      setNewMessage('');
      scrollToBottom();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      chatContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  let lastDate = null;

  return (
    <div className="flex flex-col h-screen w-full border rounded-lg shadow-lg bg-white dark:bg-black overflow-hidden">
      {/* Header */}
      <div className="flex items-center space-x-3 px-4 py-3 border-b bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
        <Avatar src={selectedUser.image || '/default-avatar.png'} />
        <span className="font-semibold text-lg text-black dark:text-white">
          {selectedUser.fullName}
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-white dark:bg-black">
        {messages.map((msg, idx) => {
          const msgDate = new Date(msg.timestamp || msg.createdAt);
          const formattedDate = msgDate.toDateString();
          const showDateSeparator = formattedDate !== lastDate;
          lastDate = formattedDate;

          const isMine = msg?.senderId === currentUserId;

          return (
            <React.Fragment key={msg.id || idx}>
              {showDateSeparator && (
                <div className="text-center text-gray-400 text-xs my-2">
                  ─ {msgDate.toLocaleDateString()} ─
                </div>
              )}

              <div className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`px-4 py-2 rounded-2xl max-w-xs text-sm shadow ${
                    isMine ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                  }`}
                >
                  <p>{msg.content}</p>

                  {/* Shared Tweet Preview */}
                  {msg.twitId && (
                    <div
                      className={`mt-2 p-2 rounded-md ${
                        isMine ? 'bg-white text-black' : 'bg-gray-100 text-black'
                      } hover:bg-gray-200 cursor-pointer transition`}
                      onClick={() =>
                        window.open(`http://localhost:3000/twit/${msg.twitId}`, '_blank')
                      }
                    >
                      <p className="text-blue-600 font-semibold text-sm">
                        🔗 View Shared Tweet
                      </p>
                    </div>
                  )}

                  <div className="text-xs text-right opacity-70 mt-1">
                    {formatDistanceToNow(msgDate, { addSuffix: true })}
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
        <div ref={chatContainerRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-white dark:bg-black flex items-center sticky bottom-0">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-full outline-none text-sm bg-gray-100 dark:bg-gray-800 dark:text-white"
        />
        <button
          onClick={handleSendMessage}
          className="ml-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
