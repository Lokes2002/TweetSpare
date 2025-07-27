import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  Box,
  Tab,
  Typography,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BarChartIcon from '@mui/icons-material/BarChart';
import IosShareIcon from '@mui/icons-material/IosShare';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import {
  likeTweet,
  deleteTweet,
  incrementTweetView,
  findTwitsById,
} from '../../Store/Twit/Action';
import CommentSection from './CommentSection';
import axios from 'axios';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { getFollowers } from '../../Store/Auth/Action';

const TweetCard = ({ item, onReply }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);
  const followers = useSelector((state) => state.auth.followers || []);

  const [anchorEl, setAnchorEl] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [tweetState, setTweetState] = useState(item);
  const [showShareModal, setShowShareModal] = useState(false);

  // Share modal tab state
  const [shareTab, setShareTab] = useState('conversations');
  const [loadedTabs, setLoadedTabs] = useState({ conversations: false, followers: false });
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    setTweetState(item);
  }, [item]);

  useEffect(() => {
    if (item?.id) dispatch(incrementTweetView(item.id));
  }, [item?.id, dispatch]);

  // Load data when share modal opens or tab changes
  useEffect(() => {
    if (!showShareModal) return;

    if (shareTab === 'conversations' && !loadedTabs.conversations) {
      axios
        .get(`http://localhost:5000/messages/all-conversations/${authUser.id}`)
        .then((res) => {
          setConversations(res.data);
          setLoadedTabs((prev) => ({ ...prev, conversations: true }));
        })
        .catch(console.error);
    }
    if (shareTab === 'followers' && !loadedTabs.followers) {
      dispatch(getFollowers(authUser.id));
      setLoadedTabs((prev) => ({ ...prev, followers: true }));
    }
  }, [showShareModal, shareTab, loadedTabs.conversations, loadedTabs.followers, authUser.id, dispatch]);

  const isRetweet = !!tweetState.originalTwit;
  const displayTweet = isRetweet ? tweetState.originalTwit : tweetState;
  const tweetOwner = displayTweet.user;

  const avatarUrl = tweetOwner?.image
    ? tweetOwner.image.startsWith('http')
      ? tweetOwner.image
      : `http://localhost:5000/uploads/${tweetOwner.image}`
    : '/default-avatar.png';

  const handleLike = async () => {
    await dispatch(likeTweet(displayTweet.id));
    setTweetState((prev) => ({
      ...prev,
      liked: !prev.liked,
      totalLikes: prev.liked ? prev.totalLikes - 1 : prev.totalLikes + 1,
    }));
  };

  const handleDelete = async () => {
    await dispatch(deleteTweet(displayTweet.id));
    setAnchorEl(null);
  };

  const handleReplyClick = () => {
    setShowComments((prev) => !prev);
  };

  const handleReplySuccess = async () => {
    await dispatch(findTwitsById(displayTweet.id));
    if (onReply) onReply();
  };

  const handleShareToUser = async (receiverId) => {
    try {
      await axios.post('http://localhost:5000/messages/share-tweet', {
        senderId: authUser.id,
        receiverId,
        twitId: displayTweet.id,
      });
      alert('Tweet shared successfully!');
      setShowShareModal(false);
    } catch (err) {
      console.error(err);
      alert('Failed to share tweet.');
    }
  };

  if (!displayTweet || !tweetOwner) return null;

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-2xl px-4 py-4 rounded-xl transition duration-200 border border-transparent hover:shadow-md hover:shadow-gray-300 dark:hover:shadow-gray-800">
          <div className="flex space-x-4">
            <Avatar
              src={avatarUrl}
              alt="avatar"
              onClick={() => navigate(`/profile/${tweetOwner.id}`)}
              className="cursor-pointer"
            />
            <div className="w-full">
              {isRetweet && tweetState.user && (
                <p className="text-sm text-gray-500 mb-1">
                  <span className="mr-1">🔁</span>
                  {tweetState.user.fullName} retweeted
                </p>
              )}

              <div className="flex justify-between items-center">
                <div
                  onClick={() => navigate(`/profile/${tweetOwner.id}`)}
                  className="cursor-pointer flex space-x-2 items-center"
                >
                  <span className="font-semibold">{tweetOwner.fullName}</span>
                  <span className="text-gray-500 text-sm">
                    @{tweetOwner.fullName?.toLowerCase().replace(/\s+/g, '_')} ·{' '}
                    {formatDistanceToNow(new Date(displayTweet.createdAt), { addSuffix: true })}
                  </span>
                </div>
                {authUser?.id === tweetOwner.id && (
                  <>
                    <Button onClick={(e) => setAnchorEl(e.currentTarget)}>
                      <MoreHorizIcon />
                    </Button>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                      <MenuItem onClick={handleDelete}>Delete</MenuItem>
                    </Menu>
                  </>
                )}
              </div>

              <div className="mt-2" onClick={() => navigate(`/twit/${displayTweet.id}`)}>
                <p className="mb-2">
                  {displayTweet.content?.length > 200 ? (
                    <>
                      {displayTweet.content.substring(0, 200)}...
                      <span className="text-blue-600 hover:underline ml-1">more</span>
                    </>
                  ) : (
                    displayTweet.content
                  )}
                </p>

                {displayTweet.image && (
                  <div className="media-container">
                    <img src={displayTweet.image} alt="tweet" className="media-content" />
                  </div>
                )}

                {displayTweet.video && (
                  <div className="media-container">
                    <video className="media-content auto-video" muted controls playsInline>
                      <source src={displayTweet.video} type="video/mp4" />
                    </video>
                  </div>
                )}
              </div>

              <div className="flex justify-between flex-wrap mt-3 text-gray-600 dark:text-gray-400">
                <div
                  className="flex items-center group cursor-pointer hover:text-blue-500"
                  onClick={handleReplyClick}
                >
                  <ChatBubbleOutlineIcon />
                  <span>{displayTweet.totalComments || 0}</span>
                </div>

                <div
                  className="flex items-center space-x-1 group cursor-pointer hover:text-blue-500"
                  onClick={() => setShowShareModal(true)}
                  title="Share"
                >
                  <IosShareIcon className="transition-transform duration-200 group-hover:scale-110" />
                  <span>{displayTweet.totalShares || 0}</span>
                </div>


                <div
                  className={`flex space-x-2 items-center group cursor-pointer hover:text-pink-500 ${tweetState.liked ? 'text-pink-600' : ''
                    }`}
                  onClick={handleLike}
                >
                  {tweetState.liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  <span>{displayTweet.totalLikes}</span>
                </div>

                <div className="flex space-x-2 items-center group cursor-pointer hover:text-purple-500">
                  <BarChartIcon />
                  <span>{displayTweet.views || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comment Section */}
      {showComments && (
        <div className="mt-4">
          <CommentSection twitId={displayTweet.id} onClose={handleReplyClick} />
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <Box
            sx={{
              bgcolor: 'background.paper',
              width: '100%',
              maxWidth: 500,
              borderRadius: 2,
              boxShadow: 24,
              p: 3,
            }}
          >
            <Typography variant="h6" mb={2} textAlign="center">
              Share Tweet
            </Typography>

            <TabContext value={shareTab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={(e, v) => setShareTab(v)} aria-label="share tabs">
                  <Tab label="Conversations" value="conversations" />
                  <Tab label={`Followers (${followers.length})`} value="followers" />
                </TabList>
              </Box>

              <TabPanel value="conversations" sx={{ maxHeight: 300, overflowY: 'auto' }}>
                {conversations.length === 0 ? (
                  <Typography textAlign="center" color="text.secondary">
                    No conversations found.
                  </Typography>
                ) : (
                  conversations.map((user) => {
                    const isSender = user.senderId === authUser.id;
                    const targetId = isSender ? user.receiverId : user.senderId;
                    const targetName = isSender ? user.receiverName : user.senderName;
                    const targetImage = isSender ? user.receiverImage : user.senderImage;

                    return (
                      <Box
                        key={targetId}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          p: 1,
                          cursor: 'pointer',
                          '&:hover': { bgcolor: 'grey.100' },
                          borderRadius: 1,
                        }}
                        onClick={() => handleShareToUser(targetId)}
                      >
                        <Avatar src={targetImage} />
                        <Typography ml={2}>{targetName}</Typography>
                      </Box>
                    );
                  })
                )}
              </TabPanel>

              <TabPanel value="followers" sx={{ maxHeight: 300, overflowY: 'auto' }}>
                {followers.length === 0 ? (
                  <Typography textAlign="center" color="text.secondary">
                    No followers found.
                  </Typography>
                ) : (
                  followers.map((user) => (
                    <Box
                      key={user.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 1,
                        cursor: 'pointer',
                        '&:hover': { bgcolor: 'grey.100' },
                        borderRadius: 1,
                      }}
                      onClick={() => handleShareToUser(user.id)}
                    >
                      <Avatar src={user.image || '/default-avatar.png'} />
                      <Typography ml={2}>{user.fullName}</Typography>
                    </Box>
                  ))
                )}
              </TabPanel>
            </TabContext>

            <Button
              fullWidth
              variant="outlined"
              color="error"
              sx={{ mt: 2 }}
              onClick={() => setShowShareModal(false)}
            >
              Cancel
            </Button>
          </Box>
        </div>
      )}

      <style>{`
        .media-container {
          width: 100%;
          max-height: 500px;
          display: flex;
          justify-content: center;
          margin-top: 10px;
          border-radius: 10px;
          overflow: hidden;
        }
        .media-content {
          max-height: 500px;
          width: 100%;
          object-fit: contain;
        }
      `}</style>
    </>
  );
};

export default TweetCard;
