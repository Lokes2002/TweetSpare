import React from 'react';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import HomeSection from '../HomeSection/HomeSection';
import RightPart from '../RightPart/RightPart';
import Profile from '../Profile/Profile';
import TweetDetails from '../TweetDetails/TweetDetails';
import Lists from '../Features/Lists';
import Chat from '../Features/Chat'; // Import the Chat component
import NotFound from '../NotFound/NotFound'; // Add a NotFound component for handling 404s
import { useTheme } from '../../ThemeContext/ThemeContext';
import ChatList from '../Features/ChatList';

const HomePage = () => {
    const { darkMode } = useTheme();

    return (
        <Box
            sx={{
                backgroundColor: darkMode ? 'black' : '#FFFFFF',
                minHeight: '100vh',
                color: darkMode ? '#FFFFFF' : '#000000',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically on small screens
            }}
        >
            <Box sx={{ flex: { xs: 'none', sm: 1.4 } }}>
                <Navigation />
            </Box>
            <Box sx={{ flex: { xs: 'none', sm: 2 } }}>
                <Routes>
                    <Route path="/" element={<HomeSection />} />
                    <Route path="/home" element={<HomeSection />} />
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route path="/twit/:id" element={<TweetDetails />} />
                    <Route path="/followers/:id" element={<Lists />} />
                    <Route path="/following/:id" element={<Lists />} />
                    <Route path="/lists" element={<Lists />} />
                    <Route path="/chat" element={<ChatList />} />
                    <Route path="/chat" element={<Chat />} /> 
                    <Route path="*" element={<NotFound />} /> 
                </Routes>
            </Box>
            <Box sx={{ flex: { xs: 'none', sm: 1 } }}>
                <RightPart />
            </Box>
        </Box>
    );
}

export default HomePage;
