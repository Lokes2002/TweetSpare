import React, { useEffect, useState } from 'react';
import api from '../../config/api';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';

const MessageListPage = () => {
  const [conversations, setConversations] = useState([]);
  const userId = parseInt(localStorage.getItem("userId"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await api.get(`/messages/all-conversations/${userId}`);
        setConversations(res.data);
      } catch (error) {
        console.error("❌ Failed to load messages:", error);
      }
    };

    if (userId) fetchConversations();
  }, [userId]);

  const openChat = (msg) => {
    const otherUserId = msg.senderId === userId ? msg.receiverId : msg.senderId;
    navigate(`/chat/${otherUserId}`);
  };

  return (
    <div className="h-screen bg-white dark:bg-black text-black dark:text-white p-4 overflow-y-auto">
      <h1 className="text-xl font-bold mb-4">Messages</h1>

      {conversations.length === 0 ? (
        <p className="text-center text-gray-400">No conversations yet.</p>
      ) : (
        conversations.map((msg) => {
          const isSender = msg.senderId === userId;
          const otherUserName = isSender ? msg.receiverName : msg.senderName;
          const otherUserImage = isSender ? msg.receiverImage : msg.senderImage;
          const otherUserId = isSender ? msg.receiverId : msg.senderId;

          return (
            <div
              key={msg.id}
              onClick={() => openChat(msg)}
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            >
              <Avatar
                src={otherUserImage || '/default-avatar.png'}
                alt={otherUserName}
                className="mr-3"
              />
              <div className="flex-1">
                <div className="font-semibold truncate">{otherUserName}</div>
                <div className="text-sm text-gray-500 truncate">
                  {msg.content || 'No message'}
                </div>
              </div>
              <div className="text-xs text-gray-400 ml-2 whitespace-nowrap">
                {msg.timestamp ? formatDistanceToNow(new Date(msg.timestamp), { addSuffix: true }) : ''}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MessageListPage;
