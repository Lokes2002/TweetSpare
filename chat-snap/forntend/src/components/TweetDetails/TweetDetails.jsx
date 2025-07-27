import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Divider } from '@mui/material';
import TweetCard from '../HomeSection/TweetCard';
import { useDispatch, useSelector } from 'react-redux';
import { findTwitsById, incrementTweetView } from '../../Store/Twit/Action';

const TweetDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { twit, loading, error } = useSelector((store) => store.twit);

  useEffect(() => {
    if (id) {
      dispatch(findTwitsById(id));
      dispatch(incrementTweetView(id)); // ✅ Track view count
    }
  }, [dispatch, id]);

  const handleBack = () => navigate(-1);

  const handleSuccessUpdate = () => {
    if (id) dispatch(findTwitsById(id)); // ✅ refresh tweet after reply/retweet
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!twit) return <div>No tweet found.</div>;

  return (
    <div>
      <section className="bg-white z-50 flex items-center sticky top-0 bg-opacity-95 p-4">
        <KeyboardBackspaceIcon className="cursor-pointer" onClick={handleBack} />
        <h1 className="text-xl font-bold opacity-90 ml-5">Tweet</h1>
      </section>

      {/* 🧵 Main Tweet */}
      <section>
        <TweetCard item={twit} onRetweet={handleSuccessUpdate} onReply={handleSuccessUpdate} />
        <Divider sx={{ margin: "2rem 0" }} />
      </section>

      {/* 💬 Replies */}
      <section>
        {twit.replyTwits?.length > 0 ? (
          twit.replyTwits.map((item) => (
            <TweetCard key={item.id} item={item} />
          ))
        ) : (
          <p className="text-center text-gray-500">No replies yet.</p>
        )}
      </section>
    </div>
  );
};

export default TweetDetails;
