import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../config/api';
import { useSelector } from 'react-redux';
import { Avatar, Button } from '@mui/material';

const CommunityDetail = () => {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [joined, setJoined] = useState(false);
  const authUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchCommunity();
    fetchPosts();
  }, [id]);

  const fetchCommunity = async () => {
    try {
      const res = await api.get('/api/communities');
      const thisCommunity = res.data.find((c) => c.id === parseInt(id));
      if (thisCommunity) {
        setCommunity(thisCommunity);
        setJoined(thisCommunity.members?.some((m) => m.id === authUser?.id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await api.get(`/api/communities/${id}/posts`);
      setPosts(res.data.reverse()); // latest first
    } catch (err) {
      console.error(err);
    }
  };

  const handleJoin = async () => {
    try {
      await api.post(`/api/communities/${id}/join`, {}, {
        headers: { userId: authUser.id }
      });
      fetchCommunity();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLeave = async () => {
    try {
      await api.post(`/api/communities/${id}/leave`, {}, {
        headers: { userId: authUser.id }
      });
      fetchCommunity();
    } catch (err) {
      console.error(err);
    }
  };

  const handlePost = async () => {
    if (!content.trim()) return;
    try {
      await api.post(`/api/communities/${id}/posts`, { content }, {
        headers: { userId: authUser.id }
      });
      setContent('');
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  if (!community) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      {/* Background + Avatar */}
      <div className="relative">
        <img
          src={community.backgroundImage || '/default-bg.jpg'}
          alt="bg"
          className="w-full h-[180px] object-cover rounded"
        />
        <div className="absolute left-4 bottom-[-40px]">
          <Avatar
            src={community.image || '/default-avatar.png'}
            sx={{ width: 80, height: 80, border: '4px solid white' }}
          />
        </div>
      </div>

      {/* Info */}
      <div className="mt-14 px-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold">{community.name}</h2>
          {joined ? (
            <Button onClick={handleLeave} variant="outlined">Leave</Button>
          ) : (
            <Button onClick={handleJoin} variant="contained">Join</Button>
          )}
        </div>
        <p className="text-gray-600 mb-4">{community.description}</p>
      </div>

      {/* Post box */}
      {joined && (
        <div className="border rounded p-3 mb-4 mx-4">
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded resize-none"
            rows={3}
          />
          <div className="flex justify-end mt-2">
            <Button
              variant="contained"
              onClick={handlePost}
              disabled={!content.trim()}
            >
              Post
            </Button>
          </div>
        </div>
      )}

      {/* Posts */}
      <div className="px-4">
        <h3 className="text-xl font-semibold mb-3">Community Posts</h3>
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet in this community.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="border p-3 rounded mb-3 shadow-sm bg-white">
              <p className="text-gray-800">{post.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommunityDetail;
