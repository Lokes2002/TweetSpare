import React, { useState } from 'react';
import api from '../../config/api';
import { useSelector } from 'react-redux';

const CreateCommunityPost = ({ communityId, onPostSuccess }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const authUser = useSelector((state) => state.auth.user);

  const handlePost = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      await api.post(`/api/communities/${communityId}/posts`, 
        { content },
        { headers: { userId: authUser.id } }
      );
      setContent('');
      if (onPostSuccess) onPostSuccess();
    } catch (err) {
      console.error('Post failed', err);
    }
    setLoading(false);
  };

  return (
    <div className="mb-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write something in community..."
        className="w-full border px-3 py-2 rounded mb-2 resize-none"
      />
      <button
        onClick={handlePost}
        className="bg-green-500 text-white px-4 py-1 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Posting...' : 'Post'}
      </button>
    </div>
  );
};

export default CreateCommunityPost;
