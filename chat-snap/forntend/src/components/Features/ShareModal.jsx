import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Tab,
  Typography
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../config/api';
import { getFollowers } from '../../Store/Auth/Action';

const ShareModal = ({ authUserId, tweetId, onClose }) => {
  const dispatch = useDispatch();
  const followers = useSelector((state) => state.auth.followers || []);
  const [tabValue, setTabValue] = useState('conversations');
  const [loadedTabs, setLoadedTabs] = useState({ conversations: false, followers: false });
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load followers when tab open
  useEffect(() => {
    if (tabValue === 'followers' && !loadedTabs.followers) {
      dispatch(getFollowers(authUserId));
      setLoadedTabs((prev) => ({ ...prev, followers: true }));
    }
  }, [tabValue, loadedTabs.followers, dispatch, authUserId]);

  // Load conversations when tab open
  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/messages/all-conversations/${authUserId}`);
        setConversations(res.data);
        setLoadedTabs((prev) => ({ ...prev, conversations: true }));
      } catch (error) {
        console.error('Error loading conversations:', error);
      }
      setLoading(false);
    };

    if (tabValue === 'conversations' && !loadedTabs.conversations) {
      fetchConversations();
    }
  }, [tabValue, loadedTabs.conversations, authUserId]);

  const handleTabChange = (e, newValue) => setTabValue(newValue);

  const handleShare = async (receiverId) => {
    try {
      await api.post('/messages/share-tweet', {
        senderId: authUserId,
        receiverId,
        twitId: tweetId,
      });
      alert('Tweet shared successfully!');
      onClose();
    } catch (err) {
      alert('Failed to share tweet.');
      console.error(err);
    }
  };

  return (
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

        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleTabChange} aria-label="share tabs">
              <Tab label="Conversations" value="conversations" />
              <Tab label={`Followers (${followers.length})`} value="followers" />
            </TabList>
          </Box>

          <TabPanel value="conversations" sx={{ maxHeight: 300, overflowY: 'auto' }}>
            {loading ? (
              <Typography textAlign="center">Loading conversations...</Typography>
            ) : conversations.length === 0 ? (
              <Typography textAlign="center" color="text.secondary">
                No conversations found.
              </Typography>
            ) : (
              conversations.map((conv) => {
                const isSender = conv.senderId === authUserId;
                const userId = isSender ? conv.receiverId : conv.senderId;
                const userName = isSender ? conv.receiverName : conv.senderName;
                const userImage = isSender ? conv.receiverImage : conv.senderImage;

                return (
                  <Box
                    key={userId}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 1,
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'grey.100' },
                      borderRadius: 1,
                    }}
                    onClick={() => handleShare(userId)}
                  >
                    <Avatar src={userImage} />
                    <Typography ml={2}>{userName}</Typography>
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
              followers.map((follower) => (
                <Box
                  key={follower.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 1,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'grey.100' },
                    borderRadius: 1,
                  }}
                  onClick={() => handleShare(follower.id)}
                >
                  <Avatar src={follower.image} />
                  <Typography ml={2}>{follower.fullName}</Typography>
                </Box>
              ))
            )}
          </TabPanel>
        </TabContext>

        <Button
          fullWidth
          variant="outlined"
          color="error"
          sx={{ mt: 3 }}
          onClick={onClose}
        >
          Cancel
        </Button>
      </Box>
    </div>
  );
};

export default ShareModal;
