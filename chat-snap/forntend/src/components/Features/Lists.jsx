import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Tab } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getFollowers, getFollowing } from '../../Store/Auth/Action';
import { useNavigate, useParams } from 'react-router-dom';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import api from '../../config/api';

const Lists = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { auth } = useSelector((store) => store);
  const [tabValue, setTabValue] = useState('1');
  const [loadedTabs, setLoadedTabs] = useState({
    following: false,
    followers: false,
  });

  // Load data only when tab opens
  const loadTabData = (tab) => {
    if (tab === '1' && !loadedTabs.following) {
      dispatch(getFollowing(id));
      setLoadedTabs((prev) => ({ ...prev, following: true }));
    } else if (tab === '2' && !loadedTabs.followers) {
      dispatch(getFollowers(id));
      setLoadedTabs((prev) => ({ ...prev, followers: true }));
    }
  };

  // On mount, load initial tab data
  useEffect(() => {
    loadTabData(tabValue);
  }, [dispatch, id, tabValue]);

  const handleBack = () => navigate(-1);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    loadTabData(newValue);
  };

  const handleFollowToggle = async (userId) => {
    try {
      await api.put(`/api/users/${userId}/follow`);
      // Refresh both lists
      if (tabValue === "1") dispatch(getFollowing(id));
      if (tabValue === "2") dispatch(getFollowers(id));
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  const renderUserList = (users) => (
    <ul className="space-y-3">
      {users.map((user) => (
        <li key={user.id} className="flex items-center justify-between p-2 border-b">
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar src={user.image} />
            <span>{user.fullName}</span>
          </Box>
          <Button
            variant={user.followed ? "outlined" : "contained"}
            onClick={() => handleFollowToggle(user.id)}
          >
            {user.followed ? "Unfollow" : "Follow"}
          </Button>
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      {/* Header */}
      <section className="bg-white sticky top-0 z-50 bg-opacity-95 flex items-center shadow px-3">
        <Button onClick={handleBack}>Back</Button>
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">
          Followers & Following
        </h1>
      </section>

      {/* Tabs */}
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleTabChange}>
              <Tab label={`Following (${auth.following.length})`} value="1" />
              <Tab label={`Followers (${auth.followers.length})`} value="2" />
            </TabList>
          </Box>

          {/* Following Tab */}
          <TabPanel value="1">
            <h2 className="text-lg font-semibold mb-2">Following</h2>
            {renderUserList(auth.following)}
          </TabPanel>

          {/* Followers Tab */}
          <TabPanel value="2">
            <h2 className="text-lg font-semibold mb-2">Followers</h2>
            {renderUserList(auth.followers)}
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default Lists;
