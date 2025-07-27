import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import api from '../../config/api';
import { useSelector } from 'react-redux';

const CommentSection = ({ twitId, onClose }) => {
  const authUser = useSelector((state) => state.auth.user);

  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [menuOpenId, setMenuOpenId] = useState(null);

  const fetchComments = async (pageNum = 0) => {
    setLoading(true);
    try {
      const res = await api.get(`/comments/${twitId}?page=${pageNum}&size=5`);
      const newData = res.data?.content || [];

      if (pageNum === 0) {
        setComments(newData);
      } else {
        // Avoid repeat comments
        const existingIds = new Set(comments.map(c => c.id));
        const filtered = newData.filter(c => !existingIds.has(c.id));
        setComments((prev) => [...prev, ...filtered]);
      }

      setHasMore(!res.data.last);
    } catch (err) {
      console.error("Failed to load comments", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    setPage(0);
    fetchComments(0);
  }, [twitId]);

  const handlePost = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await api.post(`/comments/${twitId}`, newComment, {
        headers: { 'Content-Type': 'text/plain' },
      });
      setComments((prev) => [res.data, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to post comment", err);
    }
  };

  const handleLike = async (commentId) => {
    try {
      await api.post(`/comments/like/${commentId}`);
      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId
            ? {
                ...c,
                likedBy: [...(c.likedBy || []), { id: authUser?.id || 'you' }]
              }
            : c
        )
      );
    } catch (err) {
      console.error("Failed to like comment", err);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await api.delete(`/comments/${commentId}`);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-3 rounded shadow relative">

      {/* ✅ Close Button at top-right of the comment box (Post level) */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          title="Close Comments"
        >
          <CloseIcon />
        </button>
      )}

      {/* 📝 Header */}
      <h3 className="text-md font-semibold mb-3">
        {comments.length} Comment{comments.length !== 1 && 's'}
      </h3>

      {/* ➕ Add New Comment */}
      <div className="flex gap-2 mb-4">
        <input
          className="border rounded px-3 py-1 w-full"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handlePost} className="bg-blue-500 text-white px-4 rounded">
          Post
        </button>
      </div>

      {/* 🧾 Comment List */}
      <div className="max-h-[300px] overflow-y-auto pr-1 space-y-3">
        {comments.map((c) => (
          <div key={c.id} className="flex items-start justify-between border-b pb-2">
            <div className="flex gap-2 w-full">
              <img
                src={
                  c.user?.image?.startsWith('http')
                    ? c.user.image
                    : c.user?.image
                    ? `http://localhost:5000/uploads/${c.user.image}`
                    : "https://via.placeholder.com/30"
                }
                alt="profile"
                className="w-9 h-9 rounded-full"
              />
              <div className="w-full">
                <div className="flex justify-between items-center w-full">
                  <div className="flex gap-2 items-center">
                    <span className="font-semibold text-sm">
                      {c.user?.fullName || "Unknown"}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {/* ❤️ Like */}
                    <button onClick={() => handleLike(c.id)} className="text-pink-600 text-xs">
                      <FavoriteIcon fontSize="small" className="mr-1" />
                      {c.likedBy?.length || 0}
                    </button>

                    {/* ⋮ Delete Menu */}
                    {c.user?.id === authUser?.id && (
                      <div className="relative">
                        <button onClick={() => setMenuOpenId(menuOpenId === c.id ? null : c.id)}>
                          <MoreVertIcon fontSize="small" />
                        </button>
                        {menuOpenId === c.id && (
                          <div className="absolute top-5 right-0 bg-white dark:bg-gray-800 text-sm border rounded shadow-md z-10">
                            <button
                              className="block px-3 py-1 hover:bg-gray-100 w-full text-left"
                              onClick={() => handleDelete(c.id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* 💬 Comment text */}
                <p className="text-sm mt-1">{c.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔻 Load More */}
      {hasMore && (
        <button
          onClick={() => {
            const nextPage = page + 1;
            fetchComments(nextPage);
            setPage(nextPage);
          }}
          className="text-blue-600 text-sm mt-3"
        >
          Load more
        </button>
      )}

      {loading && <p className="text-sm text-gray-400 mt-2">Loading...</p>}
    </div>
  );
};

export default CommentSection;
