// src/Pages/ChatPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../config/api';
import ChatBox from '../Features/ChatBox';

const ChatPage = () => {
  const { id } = useParams(); // selected user ID
  const [selectedUser, setSelectedUser] = useState(null);
  const currentUserId = parseInt(localStorage.getItem("userId") || "0", 10);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/api/users/${id}`);
        setSelectedUser(res.data);
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    if (id) fetchUser();
  }, [id]);

  if (!currentUserId || isNaN(currentUserId)) {
    return <div className="text-red-600 text-center mt-10">❌ Invalid current user ID</div>;
  }

  if (!selectedUser) {
    return <div className="h-screen flex items-center justify-center text-lg text-gray-500 dark:text-gray-300">Loading chat...</div>;
  }

  return (
    <div className="h-screen bg-white dark:bg-black text-black dark:text-white">
      <ChatBox currentUserId={currentUserId} selectedUser={selectedUser} />
    </div>
  );
};

export default ChatPage;
