import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../config/api'; // ✅ correct path

import { useSelector } from 'react-redux';
import TweetCard from '../components/HomeSection/TweetCard';
import TweetForm from '../components/HomeSection/TweetForm';

const CommunityPage = () => {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);
  const [joined, setJoined] = useState(false);
  const [posts, setPosts] = useState([]);
  const authUser = useSelector((state) => state.auth.user);

  const fetchCommunity = async () => {
    try {
      const res = await api.get(`/api/communities`);
      const com = res.data.find((c) => c.id.toString() === id);
      setCommunity(com);
      setJoined(com.members?.some((u) => u.id === authUser.id));
    } catch (err) {
      console.error('Error loading community', err);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await api.get(`/community-posts/${id}`);
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  };

  const handleJoin = async () => {
    try {
      await api.post(`/communities/${id}/join`, null, {
        headers: { userId: authUser.id },
      });
      setJoined(true);
    } catch (err) {
      console.error("Join failed", err);
    }
  };

  const handleLeave = async () => {
    try {
      await api.post(`/communities/${id}/leave`, null, {
        headers: { userId: authUser.id },
      });
      setJoined(false);
    } catch (err) {
      console.error("Leave failed", err);
    }
  };

  const handlePostCreate = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  useEffect(() => {
    fetchCommunity();
    fetchPosts();
  }, [id]);

  if (!community) return <p>Loading community...</p>;

  return (
    <div className="p-4 flex flex-col gap-6 max-w-4xl mx-auto">
      {/* 💥 Banner & Info */}
      <div className="border p-4 rounded bg-white shadow-sm dark:bg-[#121212]">
        <h2 className="text-3xl font-bold mb-2">{community.name}</h2>
        <p className="text-gray-600">{community.description}</p>

        <div className="mt-3">
          {joined ? (
            <button onClick={handleLeave} className="bg-red-600 text-white px-4 py-1 rounded">
              Leave
            </button>
          ) : (
            <button onClick={handleJoin} className="bg-blue-600 text-white px-4 py-1 rounded">
              Join
            </button>
          )}
        </div>
      </div>

      {/* ✍️ Post form only if joined */}
      {joined && (
        <div className="border rounded p-4 bg-white dark:bg-[#121212]">
          <TweetForm
            isCommunity={true}
            communityId={community.id}
            onPostSuccess={handlePostCreate}
          />
        </div>
      )}

      {/* 📰 Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <TweetCard key={post.id} item={post} />
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
