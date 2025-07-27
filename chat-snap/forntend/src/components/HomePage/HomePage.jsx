import React from 'react';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import HomeSection from '../HomeSection/HomeSection';
import RightPart from '../RightPart/RightPart';
import Profile from '../Profile/Profile';
import TweetDetails from '../TweetDetails/TweetDetails';
import Lists from '../Features/Lists';
import NotFound from '../NotFound/NotFound';
import Explore from '../Explore/Explore';
import { useTheme } from '../../ThemeContext/ThemeContext';
import ChatPage from '../Features/ChatPage';
import MessageListPage from '../Features/MessageListPage';
import EmailVerification from '../Authentication/EmailVerification';
import NotificationPage from '../Features/NotificationPage';
import CommunityList from '../Features/CommunityList';
import SubscriptionModel from '../SubscriptionModel/SubscriptionModel';
import CreateCommunityPost from '../Features/CreateCommunityPost';
import CommunityDetail from '../Features/CommunityDetail';
import CreateCommunity from '../Features/CreateCommunity';

const HomePage = () => {
  const { darkMode } = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: darkMode ? 'black' : '#FFFFFF',
        color: darkMode ? '#FFFFFF' : '#000000',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* LEFT SIDEBAR */}
        <Box
          sx={{
            width: { xs: '0%', sm: '24%' },
            display: { xs: 'none', sm: 'block' },
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflowY: 'auto',
            flexShrink: 0,
            px: 1,
            borderRight: '1px solid #ccc',
          }}
        >
          <Navigation />
        </Box>

        {/* CENTER CONTENT */}
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            height: '100vh',
            overflowY: 'auto',
            px: { xs: 0, sm: 2 },
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            borderRight: '1px solid #ccc',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: '600px' }}>
            <Routes>
              <Route path="/" element={<HomeSection />} />
              <Route path="/home" element={<HomeSection />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/twit/:id" element={<TweetDetails />} />
              <Route path="/followers/:id" element={<Lists />} />
              <Route path="/following/:id" element={<Lists />} />
              <Route path="/lists/:id" element={<Lists />} />
              <Route path="/lists" element={<Lists />} />
              <Route path="/chat/:id" element={<ChatPage />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/messages" element={<MessageListPage />} />
              <Route path="*" element={<NotFound />} />
                           <Route path="/notifications" element={<NotificationPage />} />
              <Route path="/communities" element={<CommunityList />} />
              <Route path="/verified" element={<SubscriptionModel />} />
              <Route path="/communities" element={<CommunityList />} />
      <Route path="/communities/create" element={<CreateCommunity/>} />
     <Route path="/communities/:id" element={<CommunityDetail />} />
     <Route path="/verify-email" element={<EmailVerification />} />


              


            </Routes>
          </Box>
        </Box>

        {/* RIGHT SIDEBAR */}
        <Box
          sx={{
            width: { xs: '0%', sm: '30%' },
            display: { xs: 'none', sm: 'block' },
            height: '100vh',
            overflowY: 'auto',
            px: 2,
          }}
        >
          <RightPart />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
